import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Flame, Shield, Zap, Gauge, Coins, MapPin, Building2, Download, ArrowRight, CheckCircle2, Sparkles, Scale, Wallet, FileCheck, Landmark, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import heroImg from "@/assets/hero-token.jpg";
import gaseroImg from "@/assets/gasero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOKEN GAS MX — Carga seguro, exacto, rápido y a buen precio" },
      { name: "description", content: "Ecosistema Web 3.0 para el Gas LP en México. Únete como gasero y accede a miles de restaurantes, edificios y zonas habitacionales de la Zona Metropolitana." },
      { property: "og:title", content: "TOKEN GAS MX — Web 3.0 del Gas LP" },
      { property: "og:description", content: "Carga seguro, exacto, rápido y a buen precio. Token utilitario que conecta gaseros con miles de clientes." },
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
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent glow-flame">
            <Flame className="h-4 w-4 text-primary-foreground" />
          </span>
          <span>
            <span className="text-mexico-green">TOKEN</span>{" "}
            <span className="text-mexico-white">GAS</span>{" "}
            <span className="text-mexico-red">MX</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#beneficios" className="hover:text-foreground transition">Beneficios</a>
          <a href="#gaseros" className="hover:text-foreground transition">Gaseros</a>
          <a href="#como-funciona" className="hover:text-foreground transition">Cómo funciona</a>
        </nav>
        <a href={APP_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="default" size="sm" className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold hover:opacity-90">
            <Download className="mr-1.5 h-4 w-4" /> Descargar App
          </Button>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-6">
      <div className="absolute inset-0 -z-10 opacity-50">
        <img src={heroImg} alt="" width={1920} height={1080} className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>

      <div className="mx-auto max-w-6xl text-center animate-float-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Ecosistema Web 3.0 del Gas LP en México
        </div>

        <h1 className="mt-8 font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
          Carga <span className="text-gradient-flame animate-flicker">seguro</span>,<br />
          exacto, rápido<br />
          y a buen precio.
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed">
          TOKEN GAS MX es el primer token utilitario que conecta a usuarios y gaseros en una red descentralizada,
          transparente y justa para el consumo de Gas LP.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-14 px-8 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-flame hover:scale-[1.02] transition">
              <Download className="mr-2 h-5 w-5" />
              Si eres usuario de gas, descarga la App
            </Button>
          </a>
          <a href="#gaseros">
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-primary/40 bg-background/40 backdrop-blur hover:bg-primary/10">
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
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient-flame">{s.value}</div>
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
          Todos los precios de Gas LP dentro de TOKEN GAS MX se ajustan a la regulación vigente del mercado,
          conforme a los lineamientos oficiales de la <strong className="text-foreground">CNE</strong> y la <strong className="text-foreground">SENER</strong>.
          Sin intermediarios ocultos, sin sobreprecios: pagas lo que marca el litro oficial.
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
    { icon: Shield, title: "Seguro y verificable", desc: "Cada carga queda registrada en blockchain. Cero adulteración, cero fraude." },
    { icon: Gauge, title: "Litros exactos", desc: "Medición certificada y trazable. Lo que pagas es lo que recibes, sin pérdidas." },
    { icon: Zap, title: "Carga rápida", desc: "Solicita gas desde la app y recibe a tu gasero más cercano en minutos." },
    { icon: Coins, title: "Mejor precio", desc: "Sin intermediarios. El token reduce comisiones y devuelve valor a la comunidad." },
    { icon: MapPin, title: "Geolocalización", desc: "Encuentra al gasero más cercano con rutas en tiempo real." },
    { icon: Wallet, title: "Bonos en USDC con Kompensa", desc: "Por cada carga, TOKEN GAS MX te entrega bonos en USDC que puedes gastar en los negocios registrados dentro de la App Kompensa." },
  ];
  return (
    <section id="beneficios" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest">Beneficios del token</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            Una nueva forma de <span className="text-gradient-flame">consumir gas</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Tecnología Web 3.0 al servicio de un mercado que necesita transparencia, eficiencia y confianza.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group glass-card rounded-2xl p-7 hover:border-primary/50 transition">
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
    { icon: Zap, title: "Pagos instantáneos", desc: "Entre gaseros y clientes sin intermediarios. Transferencias directas en segundos." },
    { icon: Coins, title: "Programa de lealtad", desc: "Gana recompensas por cada compra y canjéalos por descuentos o staking." },
    { icon: Landmark, title: "Governance democrática", desc: "Vota propuestas y decide el rumbo del ecosistema. Un token, un voz." },
    { icon: Wallet, title: "Integración con wallets populares", desc: "Conecta tu MetaMask, Trust Wallet o cualquier wallet compatible con EVM." },
    { icon: Eye, title: "Auditoría on-chain", desc: "Cada entrega queda registrada en blockchain. Rastreable, verificable e inmutable." },
  ];
  return (
    <section id="token" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest">El token</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">
            El token que <span className="text-gradient-flame">mueve al sector</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            TOKEN GAS MX es un token de utilidad construido sobre blockchain, diseñado específicamente para la industria del Gas LP en México. Transparencia total, economía circular y valor real para toda la cadena.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group glass-card rounded-2xl p-7 hover:border-primary/50 transition">
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
          <img src={gaseroImg} alt="Pipa de gas en la Ciudad de México" loading="lazy" width={1024} height={1024} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Zona Metropolitana del Valle de México</span>
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold text-accent uppercase tracking-widest">Para gaseros</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold leading-tight">
            ¿Tienes <span className="text-gradient-flame">pipa o cilindros</span>?<br />Sé parte de la red.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Al darte de alta en nuestra aplicación como gasero</strong> tienes acceso
            a más de <strong className="text-primary">mil restaurantes</strong>, zonas habitacionales y edificios
            de la Zona Metropolitana.
          </p>

          <ul className="mt-6 space-y-3">
            {["Clientes verificados y recurrentes", "Paga con pesos, USDC y diversas monedas digitales verificables por TOKEN MX", "Rutas optimizadas, menos tiempo muerto", "Reputación on-chain que te respalda", "Acceso exclusivo a clientes de alto volumen: al recibir altas recomendaciones en la App, desbloqueas pedidos premium de restaurantes, edificios y zonas habitacionales que consumen grandes volúmenes de Gas LP."].map((t) => (
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
                <Input id="nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Juan Pérez" className="mt-1.5 bg-background/50" />
              </div>
              <div>
                <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
                <Input id="telefono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="55 1234 5678" className="mt-1.5 bg-background/50" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tipo">¿Qué operas?</Label>
                <select id="tipo" value={form.tipo} onChange={(e) => setForm({ ...form, tipo: e.target.value })} className="mt-1.5 w-full h-10 rounded-md border border-input bg-background/50 px-3 text-sm">
                  <option value="pipa">Pipa de gas</option>
                  <option value="cilindros">Cilindros</option>
                  <option value="ambos">Ambos</option>
                </select>
              </div>
              <div>
                <Label htmlFor="zona">Zona principal</Label>
                <Input id="zona" value={form.zona} onChange={(e) => setForm({ ...form, zona: e.target.value })} placeholder="Iztapalapa, Tlalnepantla..." className="mt-1.5 bg-background/50" />
              </div>
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full h-12 bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-flame">
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
    { n: "01", t: "Descarga la app", d: "Disponible para usuarios y gaseros, vinculada a tu wallet Web 3.0." },
    { n: "02", t: "Solicita o atiende", d: "Pide tu carga o recibe solicitudes verificadas en tu zona." },
    { n: "03", t: "Carga registrada en blockchain", d: "Litros, precio y ubicación quedan inmutables. Confianza real." },
    { n: "04", t: "Desbloquea más rutas y gana", d: "Mientras más abasteces como gasero, más zonas y pedidos exclusivos desbloqueas." },
    { n: "05", t: "Bonos inmediatos", d: "Como usuario, recibe bonos inmediatos en cada compra dentro del ecosistema." },
  ];
  return (
    <section id="como-funciona" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-sm font-semibold text-primary uppercase tracking-widest">Cómo funciona</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold">Del cilindro al <span className="text-gradient-flame">blockchain</span></h2>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {steps.map((s) => (
            <div key={s.n} className="glass-card rounded-2xl p-6 relative">
              <div className="font-display text-5xl font-bold text-gradient-flame opacity-80">{s.n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
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
            <Button size="lg" className="h-14 px-10 text-base bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold glow-flame">
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
          <span>© {new Date().getFullYear()} <span className="text-mexico-green">TOKEN</span>{" "}<span className="text-mexico-white">GAS</span>{" "}<span className="text-mexico-red">MX</span>. Ecosistema Web 3.0.</span>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-foreground">Whitepaper</a>
          <a href="#" className="hover:text-foreground">Términos</a>
          <a href="#" className="hover:text-foreground">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
