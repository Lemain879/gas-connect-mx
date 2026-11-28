import { type ReactNode } from "react";
import { Download } from "lucide-react";
import { GasTransaction } from "./gas-transaction";

const APP_URL = "https://tokengasmx.app";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center">
        <div className="flex items-center justify-start">
          <a href="#" className="flex items-center">
            <img
              src="/src/assets/token-gas-logo.png"
              alt="TokenGas MX logo"
              className="h-auto w-full max-w-lg sm:max-w-xl object-contain"
            />
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
