#![no_std]

use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Bytes,
    BytesN, Env,
};
use soroban_sdk::xdr::ToXdr;

// On Soroban, persistent storage expires unless its TTL is extended. Keep active
// orders and the instance alive for a long interval, and expose touch_order for
// a keeper to extend TTL for long-running or disputed orders.
const TTL_THRESHOLD: u32 = 100_000;
const TTL_BUMP: u32 = 4_000_000;
const MAX_ORDER_WINDOW_SECONDS: u64 = 30 * 24 * 60 * 60;
const BUYER_REVIEW_SECONDS: u64 = 7 * 24 * 60 * 60;

#[contract]
pub struct GasEscrow;

#[contracterror]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    InvalidAmount = 3,
    InvalidParties = 4,
    InvalidDeadline = 5,
    OrderNotFound = 6,
    InvalidStatus = 7,
    UnauthorizedParty = 8,
    NoDeliveryKey = 9,
    InvalidArgument = 10,
    IdOverflow = 11,
    TooEarly = 12,
}

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum OrderStatus {
    Funded,
    Delivered,
    Disputed,
    Released,
    Refunded,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Order {
    pub id: u64,
    pub buyer: Address,
    pub seller: Address,
    /// Amount in the token's smallest unit (for 7-decimal USDC, 1 USDC = 10^7).
    pub amount: i128,
    /// SHA-256 commitment to the off-chain order terms. Do not put personal data on-chain.
    pub terms_hash: BytesN<32>,
    pub delivery_deadline: u64,
    pub delivered_at: u64,
    pub status: OrderStatus,
    /// Hash of the delivery evidence once the seller has signed it.
    pub delivery_proof_hash: BytesN<32>,
}

#[contracttype]
enum DataKey {
    Admin,
    Token,
    NextId,
    Order(u64),
    SellerDeliveryKey(Address),
}

#[contractimpl]
impl GasEscrow {
    /// One-time initialization. `admin` is the fixed dispute arbitrator;
    /// `token_address` is the SEP-41 token contract held in escrow.
    pub fn initialize(env: Env, admin: Address, token_address: Address) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::AlreadyInitialized);
        }
        admin.require_auth();

        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(&DataKey::Token, &token_address);
        env.storage().instance().set(&DataKey::NextId, &0_u64);
        Self::extend_instance_ttl(&env);
        Ok(())
    }

    /// A seller registers the public key corresponding to their delivery signer.
    /// The seller's Soroban address must authorize this association.
    pub fn set_delivery_key(
        env: Env,
        seller: Address,
        public_key: BytesN<32>,
    ) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        seller.require_auth();
        let key = DataKey::SellerDeliveryKey(seller);
        env.storage().persistent().set(&key, &public_key);
        Self::extend_persistent_ttl(&env, &key);
        Self::extend_instance_ttl(&env);
        Ok(())
    }

    /// Buyer deposits `amount` of the configured SEP-41 token and creates an order.
    /// `terms_hash` should be SHA-256 of canonical, off-chain order terms.
    pub fn create_order(
        env: Env,
        buyer: Address,
        seller: Address,
        amount: i128,
        terms_hash: BytesN<32>,
        delivery_deadline: u64,
    ) -> Result<u64, Error> {
        Self::ensure_initialized(&env)?;
        buyer.require_auth();

        if buyer == seller {
            return Err(Error::InvalidParties);
        }
        if amount <= 0 {
            return Err(Error::InvalidAmount);
        }
        let now = env.ledger().timestamp();
        if delivery_deadline <= now
            || delivery_deadline > now.saturating_add(MAX_ORDER_WINDOW_SECONDS)
        {
            return Err(Error::InvalidDeadline);
        }

        let next_id: u64 = env
            .storage()
            .instance()
            .get(&DataKey::NextId)
            .ok_or(Error::NotInitialized)?;
        let id = next_id.checked_add(1).ok_or(Error::IdOverflow)?;

        // The buyer's Soroban authorization also authorizes this nested token transfer.
        let token_address: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .ok_or(Error::NotInitialized)?;
        let escrow_address = env.current_contract_address();
        token::Client::new(&env, &token_address).transfer(&buyer, &escrow_address, &amount);

        let order = Order {
            id,
            buyer: buyer.clone(),
            seller: seller.clone(),
            amount,
            terms_hash: terms_hash.clone(),
            delivery_deadline,
            delivered_at: 0,
            status: OrderStatus::Funded,
            delivery_proof_hash: BytesN::from_array(&env, &[0; 32]),
        };
        Self::save_order(&env, &order);
        env.storage().instance().set(&DataKey::NextId, &id);
        Self::extend_instance_ttl(&env);

        env.events().publish(
            (symbol_short!("created"), id),
            (buyer, seller, amount, terms_hash, delivery_deadline),
        );
        Ok(id)
    }

    /// Returns the 32-byte SHA-256 digest the seller must sign for delivery.
    /// The digest binds the proof to this contract, order id, terms and evidence hash.
    pub fn delivery_payload(
        env: Env,
        order_id: u64,
        proof_hash: BytesN<32>,
    ) -> Result<BytesN<32>, Error> {
        Self::ensure_initialized(&env)?;
        let order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Funded {
            return Err(Error::InvalidStatus);
        }
        let preimage = (
            symbol_short!("gasdeliv"),
            env.current_contract_address(),
            order_id,
            order.terms_hash,
            proof_hash,
        )
            .to_xdr(&env);
        let digest = env.crypto().sha256(&preimage);
        Self::extend_instance_ttl(&env);
        Ok(BytesN::from_array(&env, &digest.to_array()))
    }

    /// Verifies the seller's Ed25519 signature over delivery_payload and marks
    /// the order delivered. `signature` is exactly 64 bytes.
    pub fn mark_delivered(
        env: Env,
        order_id: u64,
        proof_hash: BytesN<32>,
        signature: BytesN<64>,
    ) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let mut order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Funded {
            return Err(Error::InvalidStatus);
        }
        if env.ledger().timestamp() > order.delivery_deadline {
            return Err(Error::InvalidDeadline);
        }

        let public_key: BytesN<32> = env
            .storage()
            .persistent()
            .get(&DataKey::SellerDeliveryKey(order.seller.clone()))
            .ok_or(Error::NoDeliveryKey)?;
        Self::extend_persistent_ttl(&env, &DataKey::SellerDeliveryKey(order.seller.clone()));

        let payload = Self::delivery_payload(env.clone(), order_id, proof_hash.clone())?;
        let message = Bytes::from_array(&env, &payload.to_array());
        // As in the provided Stellar SDK example: verify the 64-byte Ed25519
        // signature against the 32-byte SHA-256 digest and the registered key.
        env.crypto().ed25519_verify(&public_key, &message, &signature);

        order.status = OrderStatus::Delivered;
        order.delivered_at = env.ledger().timestamp();
        order.delivery_proof_hash = proof_hash.clone();
        Self::save_order(&env, &order);
        Self::extend_instance_ttl(&env);
        env.events()
            .publish((symbol_short!("deliver"), order_id), proof_hash);
        Ok(())
    }

    /// Buyer accepts delivery and releases escrow to the seller immediately.
    pub fn release(env: Env, order_id: u64) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Delivered {
            return Err(Error::InvalidStatus);
        }
        order.buyer.require_auth();
        Self::payout(&env, &order, true)?;
        Ok(())
    }

    /// Seller may collect after the 7-day buyer review window if no dispute was raised.
    pub fn claim_after_review(env: Env, order_id: u64) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Delivered {
            return Err(Error::InvalidStatus);
        }
        order.seller.require_auth();
        let review_ends = order.delivered_at.saturating_add(BUYER_REVIEW_SECONDS);
        if env.ledger().timestamp() < review_ends {
            return Err(Error::TooEarly);
        }
        Self::payout(&env, &order, true)?;
        Ok(())
    }

    /// Buyer or seller can freeze an unresolved order as disputed.
    pub fn raise_dispute(env: Env, order_id: u64, caller: Address) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let mut order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Funded && order.status != OrderStatus::Delivered {
            return Err(Error::InvalidStatus);
        }
        if caller != order.buyer && caller != order.seller {
            return Err(Error::UnauthorizedParty);
        }
        caller.require_auth();

        let now = env.ledger().timestamp();
        let dispute_window_open = match order.status {
            OrderStatus::Funded => now <= order.delivery_deadline,
            OrderStatus::Delivered => {
                now <= order.delivered_at.saturating_add(BUYER_REVIEW_SECONDS)
            }
            _ => false,
        };
        if !dispute_window_open {
            return Err(Error::InvalidDeadline);
        }

        order.status = OrderStatus::Disputed;
        Self::save_order(&env, &order);
        Self::extend_instance_ttl(&env);
        env.events()
            .publish((symbol_short!("dispute"), order_id), caller);
        Ok(())
    }

    /// Fixed arbitrator resolves a disputed order: pay seller or refund buyer.
    pub fn resolve_dispute(
        env: Env,
        order_id: u64,
        release_to_seller: bool,
    ) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Disputed {
            return Err(Error::InvalidStatus);
        }
        let admin: Address = env
            .storage()
            .instance()
            .get(&DataKey::Admin)
            .ok_or(Error::NotInitialized)?;
        admin.require_auth();
        Self::payout(&env, &order, release_to_seller)?;
        Ok(())
    }

    /// Permissionless refund when the seller did not mark delivery by the deadline.
    pub fn refund_after_deadline(env: Env, order_id: u64) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let order = Self::load_order(&env, order_id)?;
        if order.status != OrderStatus::Funded {
            return Err(Error::InvalidStatus);
        }
        if env.ledger().timestamp() <= order.delivery_deadline {
            return Err(Error::TooEarly);
        }
        Self::payout(&env, &order, false)?;
        Ok(())
    }

    /// Extends order and contract storage TTL; callable by a public keeper.
    pub fn touch_order(env: Env, order_id: u64) -> Result<(), Error> {
        Self::ensure_initialized(&env)?;
        let key = DataKey::Order(order_id);
        if !env.storage().persistent().has(&key) {
            return Err(Error::OrderNotFound);
        }
        Self::extend_persistent_ttl(&env, &key);
        Self::extend_instance_ttl(&env);
        Ok(())
    }

    pub fn get_order(env: Env, order_id: u64) -> Result<Order, Error> {
        Self::ensure_initialized(&env)?;
        let order = Self::load_order(&env, order_id)?;
        Self::extend_instance_ttl(&env);
        Ok(order)
    }

    fn payout(env: &Env, order: &Order, to_seller: bool) -> Result<(), Error> {
        let token_address: Address = env
            .storage()
            .instance()
            .get(&DataKey::Token)
            .ok_or(Error::NotInitialized)?;
        let escrow_address = env.current_contract_address();
        let recipient = if to_seller {
            order.seller.clone()
        } else {
            order.buyer.clone()
        };
        // Soroban considers direct invocations made by the current contract
        // authorized for that contract address; token transfer still validates
        // the configured token contract's rules.
        token::Client::new(env, &token_address).transfer(&escrow_address, &recipient, &order.amount);

        let mut settled = order.clone();
        settled.status = if to_seller {
            OrderStatus::Released
        } else {
            OrderStatus::Refunded
        };
        Self::save_order(env, &settled);
        Self::extend_instance_ttl(env);
        env.events().publish(
            (if to_seller { symbol_short!("release") } else { symbol_short!("refund") }, order.id),
            (recipient, order.amount),
        );
        Ok(())
    }

    fn load_order(env: &Env, order_id: u64) -> Result<Order, Error> {
        let key = DataKey::Order(order_id);
        let order = env
            .storage()
            .persistent()
            .get(&key)
            .ok_or(Error::OrderNotFound)?;
        Self::extend_persistent_ttl(env, &key);
        Ok(order)
    }

    fn save_order(env: &Env, order: &Order) {
        let key = DataKey::Order(order.id);
        env.storage().persistent().set(&key, order);
        Self::extend_persistent_ttl(env, &key);
    }

    fn ensure_initialized(env: &Env) -> Result<(), Error> {
        if !env.storage().instance().has(&DataKey::Admin)
            || !env.storage().instance().has(&DataKey::Token)
        {
            return Err(Error::NotInitialized);
        }
        Ok(())
    }

    fn extend_persistent_ttl(env: &Env, key: &DataKey) {
        env.storage()
            .persistent()
            .extend_ttl(key, TTL_THRESHOLD, TTL_BUMP);
    }

    fn extend_instance_ttl(env: &Env) {
        env.storage()
            .instance()
            .extend_ttl(TTL_THRESHOLD, TTL_BUMP);
    }
}
