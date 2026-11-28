import { type ReactNode } from "react";
import { Download, Flame } from "lucide-react";
import { GasTransaction } from "./gas-transaction";

const APP_URL = "https://tokengasmx.app";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <div className="relative flex items-center">
          {/* Logo TokenGas MX discreto, elegante y futurista (detrás de la llama) */}
          <img
            src="/src/assets/token-gas-logo.png"
            alt="TokenGas MX logo"
            className="absolute left-0 right-0 mx-auto max-w-[80px] w-auto opacity-[0.08] sm:opacity-[0.15] [filter:blur(6px)] [transform:scale(1.15)]"
          />
          <a href="#" className="relative flex items-center">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mexico-green to-mexico-red">
              <Flame className="h-5 w-5 text-primary-foreground" />
            </span>
          </a>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground flex-1">
          <a href="#beneficios" className="hover:text-foreground transition">
            Beneficios
          </a>
          <a href="#gaseros" className="hover:text-foreground transition">
            Gaseros
          </a>
          <a href="#como-funciona" className="hover:text-foreground transition">
            Cómo funciona
          </a>
        </nav>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer">
          <button className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-mexico-green to-mexico-red px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            <Download className="h-4 w-4" />
            Descargar App
          </button>
        </a>
      </div>
    </header>
  );
}
