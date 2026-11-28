import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Wallet,
  Shield,
  Zap,
  Gauge,
  Coins,
  MapPin,
  Building2,
  Download,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Scale,
  Wallet as WalletIcon,
  Store,
  Hotel,
  GraduationCap,
  Sparkles as SparklesIcon,
  FileCheck,
  Landmark,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { GasTransaction } from "@/components/gas-transaction";
import { Nav } from "@/components/nav";
import heroImg from "@/assets/hero-token.jpg";
import gaseroImg from "@/assets/gasero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOKEN GAS MX — Carga seguro, exacto, rápido y a buen precio" },
      {
        name: "description",
        content:
          "Ecosistema Web 3.0 para el Gas LP en México. Únete como gasero y accede a miles de restaurantes, edificios y zonas habitacionales de la Zona Metropolitana.",
      },
      { property: "og:title", content: "TOKEN GAS MX — Web 3.0 del Gas LP" },
      {
        property: "og:description",
        content:
          "Carga seguro, exacto, rápido y a buen precio. Token utilitario que conecta gaseros con miles de clientes.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const APP_URL = "https://tokengasmx.app";

function Index() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Toaster theme="dark" position="top-center" />
      <Nav />
      <Hero />
      <Stats />
      <PriceTransparency />
      <Benefits />
      <GaseroSection />
      <TokenSection />
      <WalletSection />
      <HowItWorks />
      <GasTransaction />
      <CTA />
      <Footer />
    </div>
  );
}

const appUrl = "https://tokengasmx.app";

function WalletSection() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState("");
  const [sending, setSending] = useState(false);

  const connect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wallet.trim()) {
      toast.error("Escribe la dirección de tu wallet");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setConnected(true);
      toast.success("Wallet conectado correctamente a la red Stellar");
    }, 800);
  };

  const disconnect = () => {
    setConnected(false);
    setWallet("");
    toast.info("Wallet desconectado");
  };

  return (
    <section id="wallet" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur">
            <SparklesIcon className="h-3.5 w-3.5" />
            Red Stellar
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Compatible con <span className="text-gradient-flame">Stellar</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            TOKEN GAS MX corre sobre la red <strong className="text-foreground">Stellar</strong>.
            Todo, desde la wallet hasta el contrato que gestiona las transacciones, usa
            <strong className="text-foreground">protocolos de Stellar:</strong> como la red de pagos{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">PST</code> para que
            el token viaje a la velocidad de la luz, y{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">SEP-31</code> para la
            liquidación de carga.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: WalletIcon,
              title: "Wallet compatible",
              desc: "Conecta MetaMask, XLM Wallet o cualquier wallet de red Stellar. La clave privada nunca sale de tu dispositivo.",
              color: "from-primary/20 to-accent/20",
            },
            {
              icon: Banknote,
              title: "Pagos en Stellar",
              desc: "Transferencias de TOKEN GAS MX y tokens anclados (USDC, XLM) en segundos, con confirmación en 3-5 segundos.",
              color: "from-sky-500/20 to-blue-500/20",
            },
            {
              icon: Shield,
              title: "Seguridad en Soroban",
              desc: "El contrato que gestiona cada carga es inmutable, verificable y auditable en tiempo real directamente en Stellar.",
              color: "from-emerald-500/20 to-teal-500/20",
            },
            {
              icon: Zap,
              title: "Bajo costo",
              desc: "Comisiones de red en fraction de centavo. Mientras más volumen, menor el costo unitario por carga.",
              color: "from-amber-500/20 to-orange-500/20",
            },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className={`glass-card rounded-2xl p-6 border border-border/40 bg-gradient-to-br ${color}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/30">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 glass-card rounded-2xl p-6 md:p-8">
          <h3 className="font-display text-2xl font-bold">
            <span className="text-gradient-flame">Conecta tu wallet</span>
          </h3>
          <p className="mt-2 text-muted-foreground">
            La conexión es segura y directa a la red Stellar. No necesitas intermediarios: tu wallet
            firma la operación y el contrato de Solana lo ejecuta.
          </p>
          <form onSubmit={connect} className="mt-6 grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label htmlFor="wallet">Dirección de wallet (XLM/SOR)</Label>
              <Input
                id="wallet"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                placeholder="GC... o GB... o Soroban address"
                className="mt-1.5"
                disabled={connected}
              />
            </div>
            <Button
              type="submit"
              disabled={!wallet.trim() || sending || connected}
              className="w-full sm:w-auto"
            >
              {connected ? "Conectado ✓" : sending ? "Conectando..." : "Conectar wallet"}
            </Button>
          </form>
          {connected && (
            <button
              onClick={disconnect}
              className="mt-4 text-sm text-primary underline-offset-2 hover:text-primary/80"
            >
              Desconectar wallet
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6">
      <div className="absolute inset-0 -z-10 opacity-50">
        <img
          src={heroImg}
          alt=""
          width={1920}
          height={1080}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="mx-auto max-w-6xl text-center animate-float-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Ecosistema Web 3.0 del Gas LP en México
        </div>

        <h1 className="mt-8 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
          Carga <span className="text-gradient-flame animate-flicker">seguro</span>,<br />
          exacto, rápido
          <br />y a buen precio.
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          TOKEN GAS MX es el primer token utilitario que conecta a usuarios y gaseros en una red
          descentralizada, transparente y justa para el consumo de Gas LP.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="h-14 px-8 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-flame hover:scale-[1.02] transition"
            >
              <Download className="mr-2 h-5 w-5" />
              Si eres usuario de gas, descarga la App
            </Button>
          </a>
          <a href="#gaseros">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base border-primary/40 bg-background/40 backdrop-blur hover:bg-primary/10"
            >
              Soy gasero, quiero unirme <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "+1,000", label: "Restaurantes en la red" },
    { value: "+500", label: "Edificios y condominios" },
    { value: "24/7", label: "Cobertura ZMVM" },
    { value: "100%", label: "Transparente en blockchain" },
  ];
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-6 text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient-flame">
              {s.value}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PriceTransparency() {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-4xl glass-card rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur">
          <Scale className="h-3.5 w-3.5" />
          Transparencia de precios
        </div>
        <h3 className="mt-5 font-display text-2xl md:text-3xl font-bold">
          Precios justos y reales del mercado
        </h3>
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Todos los precios de Gas LP dentro de TOKEN GAS MX se ajustan a la regulación vigente del
          mercado, conforme a los lineamientos oficiales de la{" "}
          <strong className="text-foreground">CNE</strong> y la{" "}
          <strong className="text-foreground">SENER</strong>. Sin intermediarios ocultos, sin
          sobreprecios: pagas lo que marca el litro oficial.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Shield className="h-3.5 w-3.5" /> Regulación CNE
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <CheckCircle2 className="h-3.5 w-3.5" /> Precio por litro oficial
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Flame className="h-3.5 w-3.5" /> Sin sobreprecios
          </span>
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const items = [
    {
      icon: Shield,
      title: "Seguro y verificable",
      desc: "Cada carga queda registrada en blockchain. Cero adulteración, cero fraude.",
    },
    {
      icon: Gauge,
      title: "Litros exactos",
      desc: "Medición certificada y trazable. Lo que pagas es lo que recibes, sin pérdidas.",
    },
    {
      icon: Zap,
      title: "Carga rápida",
      desc: "Solicita gas desde la app y recibe a tu gasero más cercano en minutos.",
    },
    {
      icon: Coins,
      title: "Mejor precio",
      desc: "Sin intermediarios. El token reduce comisiones y devuelve valor a la comunidad.",
    },
    {
      icon: MapPin,
      title: "Geolocalización",
      desc: "Encuentra al gasero más cercano con rutas en tiempo real.",
    },
  ];
  return (
    <section id="beneficios" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest">
            Beneficios del token
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Una nueva forma de <span className="text-gradient-flame">consumir gas</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tecnología Web 3.0 al servicio de un mercado que necesita transparencia, eficiencia y
            confianza.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group glass-card rounded-2xl p-7 hover:border-primary/50 transition"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:glow-flame transition">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TokenSection() {
  const features = [
    {
      icon: Zap,
      title: "Pagos instantáneos",
      desc: "Entre gaseros y clientes sin intermediarios. Transferencias directas en segundos.",
    },
    {
      icon: Coins,
      title: "Programa de lealtad",
      desc: "Gana recompensas por cada compra y canjéalos por descuentos o staking.",
    },
    {
      icon: Landmark,
      title: "Governance democrática",
      desc: "Vota propuestas y decide el rumbo del ecosistema. Un token, un voz.",
    },
    {
      icon: Wallet,
      title: "Integración con wallets populares",
      desc: "Conecta tu MetaMask, Trust Wallet o cualquier wallet compatible con EVM.",
    },
    {
      icon: Eye,
      title: "Auditoría on-chain",
      desc: "Cada entrega queda registrada en blockchain. Rastreable, verificable e inmutable.",
    },
  ];
  return (
    <section id="token" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest">
            El token
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            El token que <span className="text-gradient-flame">mueve al sector</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            TOKEN GAS MX es un token de utilidad construido sobre blockchain, diseñado
            específicamente para la industria del Gas LP en México. Transparencia total, economía
            circular y valor real para toda la cadena.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group glass-card rounded-2xl p-7 hover:border-primary/50 transition"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 group-hover:glow-flame transition">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GaseroSection() {
  const [form, setForm] = useState({ nombre: "", telefono: "", tipo: "pipa", zona: "" });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono) {
      toast.error("Completa nombre y teléfono");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("¡Registro recibido! Te contactaremos en menos de 24 hrs.");
      setForm({ nombre: "", telefono: "", tipo: "pipa", zona: "" });
    }, 800);
  };

  return (
    <section id="gaseros" className="px-6 py-24 relative">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden glass-card">
          <img
            src={gaseroImg}
            alt="Pipa de gas en la Ciudad de México"
            loading="lazy"
            width={1024}
            height={1024}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Zona Metropolitana del Valle de México</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-accent uppercase tracking-widest">
            Para gaseros
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">
            ¿Tienes <span className="text-gradient-flame">pipa o cilindros</span>?<br />
            Sé parte de la red.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">
              Al darte de alta en nuestra aplicación como gasero
            </strong>{" "}
            tienes acceso a más de <strong className="text-primary">mil restaurantes</strong>, zonas
            habitacionales y edificios de la Zona Metropolitana.
          </p>

          <ul className="mt-6 space-y-3">
            {[
              "Clientes verificados y recurrentes",
              "Paga con pesos, USDC y diversas monedas digitales verificables por TOKEN MX",
              "Rutas optimizadas, menos tiempo muerto",
              "Reputación on-chain que te respalda",
              "Acceso exclusivo a clientes de alto volumen: al recibir altas recomendaciones en la App, desbloqueas pedidos premium de restaurantes, edificios y zonas habitacionales que consumen grandes volúmenes de Gas LP.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-muted-foreground">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <form onSubmit={submit} className="mt-8 glass-card rounded-2xl p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre completo</Label>
                <Input
                  id="nombre"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  placeholder="Juan Pérez"
                  className="mt-1.5 bg-background/50"
                />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
                <Input
                  id="telefono"
                  value={form.telefono}
                  onChange={(e) => setForm({ ...form, telefono: e.target.value })}
                  placeholder="55 1234 5678"
                  className="mt-1.5 bg-background/50"
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">¿Qué operas?</Label>
                <select
                  id="tipo"
                  value={form.tipo}
                  onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                  className="mt-1.5 w-full h-10 rounded-md border border-input bg-background/50 px-3 text-sm"
                >
                  <option value="pipa">Pipa de gas</option>
                  <option value="cilindros">Cilindros</option>
                  <option value="ambos">Ambos</option>
                </select>
              </div>
              <div>
                <Label htmlFor="zona">Zona principal</Label>
                <Input
                  id="zona"
                  value={form.zona}
                  onChange={(e) => setForm({ ...form, zona: e.target.value })}
                  placeholder="Iztapalapa, Tlalnepantla..."
                  className="mt-1.5 bg-background/50"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              size="lg"
              className="w-full h-12 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-flame"
            >
              {loading ? "Enviando..." : "Quiero registrarme como gasero"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Nadie expulsa a nadie del plan",
      d: "El gas libre de intermediarios llega a ti sin costo extra: la compra es directa, inequívoca y a un precio que marca la red y no un intermediario.",
    },
    {
      n: "02",
      t: "Tu gasto está en cadena",
      d: "Cada litro que combustes queda verificable y trazable. Sabes exactamente a quién pagas, cuánto y cuándo, sin comisiones ocultas.",
    },
    {
      n: "03",
      t: "Desde Hoteles y Restaurantes",
      d: "Todo lo que consumes es registrado con transparencia total. Los establecimientos verificados y sus clientes disfrutan del mismo precio que marca el mercado.",
    },
    {
      n: "04",
      t: "Escuelas y comunidades inclusivas",
      d: "Aprendices, personal docente, familias y colectivos sociales acceden al mismo servicio: gas en precio justo y medición certificada.",
    },
    {
      n: "05",
      t: "Smart contract que gestiona cada pago",
      d: "La cantidad se deposita en un contrato Soroban en Stellar, se verifica la entrega y, al confirmarse, se libera al gastador. Sin intermediarios, sin fugas.",
    },
  ];
  return (
    <section id="como-funciona" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest">
            Cómo funciona
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Del cilindro al <span className="text-gradient-flame">smart contract</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            De la compra del gas al bloque de Stellar: cinco pasos, todos verificables, sin
            intermediarios y con tu dinero en tu control.
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((s, i) => (
            <div key={s.n} className="glass-card rounded-2xl p-6 relative">
              <div className="font-display text-5xl font-bold text-gradient-flame opacity-80">
                {s.n}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              {i === 4 && (
                <div className="mt-4 rounded-xl bg-primary/5 p-4 border border-primary/20">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <Zap className="h-3.5 w-3.5" />
                    Smart contract Soroban en Stellar
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    El contrato valida cada pago y cada entrega. Sin control de una sola entidad.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-40">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/30 blur-3xl" />
        </div>
        <Flame className="h-12 w-12 mx-auto text-primary animate-flicker" />
        <h2 className="mt-6 font-display text-4xl md:text-5xl font-bold">
          El Gas LP entra en la <span className="text-gradient-flame">era Web 3.0</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Descarga la app, únete a la red y empieza a cargar seguro, exacto, rápido y a buen precio.
        </p>
        <div className="mt-8">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="h-14 px-10 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-flame"
            >
              <Download className="mr-2 h-5 w-5" /> Descargar TOKEN GAS MX
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-border/40">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-primary" />
          <span>
            © {new Date().getFullYear()} <span className="text-mexico-green">TOKEN</span>{" "}
            <span className="text-mexico-white">GAS</span>{" "}
            <span className="text-mexico-red">MX</span>. Ecosistema Web 3.0.
          </span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">
            Whitepaper
          </a>
          <a href="#" className="hover:text-foreground">
            Términos
          </a>
          <a href="#" className="hover:text-foreground">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
