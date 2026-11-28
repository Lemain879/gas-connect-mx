import { type ReactNode } from "react";
import { ArrowRight, CheckCircle2, Download, Flame, MapPin, Shield, Zap } from "lucide-react";
import { GasTransaction } from "./gas-transaction";

const APP_URL = "https://tokengasmx.app";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 font-display font-bold text-lg transition hover:opacity-80"
        >
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-mexico-green to-mexico-red">
            <Flame className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="flex items-center gap-2">
            <img
              src="/src/assets/token-gas-logo.png"
              alt="TokenGas MX logo"
              className="h-7 w-7 object-contain hidden sm:block"
            />
            <span className="hidden sm:inline font-mexico mx-1">MX</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
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
