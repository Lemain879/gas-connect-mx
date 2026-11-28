import { useEffect, useState } from "react";
import { type ElementType } from "react";
import { CheckCircle2, ShieldCheck, Banknote, Send, Zap, Loader2 } from "lucide-react";

interface FlowStep {
  id: number;
  title: string;
  desc: string;
  icon: ElementType;
  gradient: string;
}

const STEPS: FlowStep[] = [
  {
    id: 0,
    title: "Solicitud de pago",
    desc: "El cliente introduce la cantidad de litros, el gasero y firma la operación desde su wallet.",
    icon: Send,
    gradient: "from-primary to-accent",
  },
  {
    id: 1,
    title: "Escrow en Soroban",
    desc: "La cantidad se deposita y queda bloqueada en el contrato Soroban de la red Stellar hasta la entrega.",
    icon: Banknote,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    id: 2,
    title: "Entrega y firma",
    desc: "El gasero confirma la entrega y firma el payload; la firma se verifica con su clave pública.",
    icon: ShieldCheck,
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 3,
    title: "Aprobación y pago",
    desc: "El cliente aprueba la entrega, el token se libera al gasero y se emite el bono de recompensa.",
    icon: CheckCircle2,
    gradient: "from-sky-400 to-blue-500",
  },
];

export function GasTransaction() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const step = STEPS[phase];
  const isComplete = phase === 3;

  useEffect(() => {
    const id = window.setTimeout(() => setPhase(1), 700);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (phase !== 1) return;
    const id = window.setTimeout(() => setPhase(2), 800);
    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase !== 2) return;
    const id = window.setTimeout(() => setPhase(3), 800);
    return () => window.clearTimeout(id);
  }, [phase]);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur">
            <Zap className="h-3.5 w-3.5" />
            Red Stellar · contrato Soroban
          </div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Transacción <span className="text-gradient-flame">Stellar</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            Todo el flujo se ejecuta en la red Stellar mediante contratos Soroban y un escrow
            inmutable. Sin intermediarios, sin apalancamiento.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => {
            const active = i === phase;
            const done = i < phase;
            return (
              <div
                key={s.id}
                className={`relative rounded-2xl border p-5 transition-all duration-300 ${
                  active
                    ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/40 bg-background/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      done
                        ? "bg-emerald-500/15 text-emerald-400"
                        : active
                          ? "bg-primary/15 text-primary"
                          : "bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-5 w-5" /> : <s.icon className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-sm font-semibold text-foreground">
                      <span className="sr-only">
                        Paso {i + 1} de {STEPS.length}:{" "}
                      </span>
                      {s.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="mx-auto mt-8 h-2 w-full max-w-md overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={isComplete ? 100 : phase * 25}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
            style={{ width: isComplete ? "100%" : `${phase * 25}%` }}
          />
        </div>

        <div
          className={`mx-auto mt-8 max-w-lg rounded-3xl border p-8 text-center backdrop-blur ${
            isComplete ? "border-primary/30 bg-primary/5" : "border-border/40 bg-background/40"
          }`}
        >
          {isComplete ? (
            <>
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h3 className="mt-4 font-display text-2xl font-bold text-foreground">
                Transacción completada
              </h3>
              <p className="mt-2 text-muted-foreground">
                La cantidad se liberó al gasero, la fecha de entrega quedó registrada en blockchain
                y el bono de recompensa está en tu wallet.
              </p>
              <button
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                onClick={() => {
                  setPhase(0);
                }}
              >
                <Send className="h-4 w-4" />
                Nueva transacción
              </button>
            </>
          ) : (
            <>
              <Loader2 className="mx-auto h-5 w-5 animate-spin text-primary" />
              <p className="mt-2 text-sm text-muted-foreground">
                Preparando la transacción en la red Stellar...
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
