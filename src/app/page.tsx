"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  Car,
  Gauge,
  Cog,
  ArrowRight,
  ChevronDown,
  Star,
  Shield,
  Home as HomeIcon,
  Facebook,
  Instagram,
  ExternalLink,
  CheckCircle2,
  Menu,
  X,
  Snowflake,
  ThermometerSnowflake,
  Package,
  SprayCan,
  Sparkles,
  Warehouse,
  Route,
  Award,
  Truck,
  Trophy,
  Heart,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setIsVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isVisible };
}

/* 3D Tilt Hook */
function use3DTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  }, []);
  return { ref, handleMouseMove, handleMouseLeave };
}

/* Parallax scroll hook */
function useParallax(speed = 0.3) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fn = () => {
      const y = window.scrollY;
      el.style.transform = `translateY(${y * speed}px)`;
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return ref;
}

/* ═══════════════════════════════════════════════════════
   3D TILT CARD WRAPPER
   ═══════════════════════════════════════════════════════ */
function TiltCard({ children, className = "", delay = 0, visible = false }: { children: React.ReactNode; className?: string; delay?: number; visible: boolean }) {
  const { ref, handleMouseMove, handleMouseLeave } = use3DTilt();
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-500 ease-out ${visible ? "animate-fade-in-up" : "opacity-0"} ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FLOATING 3D SHAPES (decorative)
   ═══════════════════════════════════════════════════════ */
function FloatingShape({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute rounded-2xl opacity-20 pointer-events-none ${className}`}
      style={{
        animation: "float-3d 8s ease-in-out infinite",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const mainLinks = [
    { label: "Le Nostre Vetture", href: "#vetture" },
    { label: "Officina", href: "#officina" },
    { label: "Offerte Post Vendita", href: "#post-vendita" },
    { label: "Contatti", href: "#contatti" },
    { label: "La Vostra Opinione", href: "#opinioni" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-b border-white/20"
        : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2.5 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-lg transition-all duration-500 ${
              scrolled
                ? "bg-brand shadow-lg shadow-brand/30"
                : "bg-white/15 backdrop-blur-md border border-white/25"
            }`}>E</div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight leading-none transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`}>EmilCar</span>
              <span className={`text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 ${scrolled ? "text-muted-foreground" : "text-white/60"}`}>Ardenno — Valtellina</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {mainLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                scrolled
                  ? "text-foreground/70 hover:text-foreground hover:bg-brand/5"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}>{l.label}</button>
            ))}
            <Button onClick={() => scrollTo("#contatti")} className="ml-3 bg-brand hover:bg-brand-dark text-white rounded-xl shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 hover:-translate-y-0.5" size="sm">
              <Phone className="w-4 h-4 mr-2" />Contattaci
            </Button>
          </div>

          <button className="lg:hidden p-2 rounded-xl" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen
              ? <X className={scrolled ? "text-foreground" : "text-white"} />
              : <Menu className={scrolled ? "text-foreground" : "text-white"} />
            }
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/90 backdrop-blur-xl border-b border-white/20 animate-fade-in shadow-xl">
          <div className="px-4 py-4 space-y-1">
            {mainLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="block w-full text-left px-4 py-3 rounded-xl text-foreground font-medium hover:bg-brand/5 transition-colors">{l.label}</button>
            ))}
            <Button onClick={() => scrollTo("#contatti")} className="w-full mt-2 bg-brand hover:bg-brand-dark text-white rounded-xl shadow-lg shadow-brand/20">
              <Phone className="w-4 h-4 mr-2" />Contattaci
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  const parallaxRef = useParallax(0.15);
  const parallaxRef2 = useParallax(0.08);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img src="/hero-car.jpg" alt="Showroom EmilCar Ardenno" className="w-full h-full object-cover scale-105" />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Floating 3D decorative elements */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[10%] w-72 h-72 rounded-full bg-brand/10 blur-3xl" style={{ animation: "float-3d 12s ease-in-out infinite" }} />
        <div className="absolute bottom-1/4 right-[25%] w-48 h-48 rounded-full bg-warm/10 blur-2xl" style={{ animation: "float-3d 10s ease-in-out infinite 2s" }} />
      </div>
      <div ref={parallaxRef2} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-3 h-3 rounded-full bg-warm/40" style={{ animation: "float-3d 6s ease-in-out infinite 1s" }} />
        <div className="absolute top-[40%] right-[15%] w-2 h-2 rounded-full bg-white/30" style={{ animation: "float-3d 8s ease-in-out infinite 3s" }} />
        <div className="absolute bottom-[30%] right-[8%] w-4 h-4 rounded-lg bg-brand/20 rotate-45" style={{ animation: "float-3d 9s ease-in-out infinite" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-2xl" style={{ transformStyle: "preserve-3d" }}>
          <Badge className="mb-6 glass text-white px-4 py-1.5 text-sm animate-fade-in-up">
            <Star className="w-3.5 h-3.5 mr-1.5 text-warm" />Oltre 30 anni di esperienza
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up delay-200" style={{ transformStyle: "preserve-3d" }}>
            Acquistiamo<br />
            <span className="relative inline-block">
              le Vostre <span className="text-warm">Vetture</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-warm/80 to-transparent rounded-full" />
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/75 leading-relaxed max-w-xl animate-fade-in-up delay-400">
            Valutazione personalizzata direttamente a domicilio, con pagamento e passaggio di proprietà immediato.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
            <Button
              onClick={() => document.querySelector("#vetture")?.scrollIntoView({ behavior: "smooth" })}
              size="lg"
              className="bg-brand hover:bg-brand-dark text-white rounded-2xl px-8 py-6 text-lg font-semibold shadow-[0_8px_30px_rgba(180,80,20,0.35)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(180,80,20,0.45)] hover:-translate-y-1 active:translate-y-0"
            >
              Le Nostre Vetture<ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            {/* FIXED: glass button instead of outline */}
            <button
              onClick={() => document.querySelector("#officina")?.scrollIntoView({ behavior: "smooth" })}
              className="glass rounded-2xl px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/20 hover:-translate-y-1 active:translate-y-0 backdrop-blur-md border border-white/25 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              Officina
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-14 flex flex-wrap items-center gap-5 text-white/65 text-sm animate-fade-in-up delay-800">
            {[
              { icon: Shield, label: "Garanzia Auto Moove" },
              { icon: CheckCircle2, label: "Valutazione a domicilio" },
              { icon: HomeIcon, label: "Pagamento immediato" },
            ].map((item, i) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-warm" />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scorri</span>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LE NOSTRE VETTURE
   ═══════════════════════════════════════════════════════ */
const vehicleCategories = [
  { icon: Car, title: "AutoScout 24", badge: "Piattaforma", desc: "I nostri annunci su AutoScout24, il portale di riferimento per la compravendita di veicoli d'occasione in Italia. Annunci aggiornati con foto e descrizioni complete.", link: "https://www.autoscout24.it/annunci/emilcar-ardenno", external: true },
  { icon: Award, title: "Neopatentati", badge: "Popolari", desc: "Da Fiat Panda ad Alfa Mito, da Volkswagen Polo ad Audi A1. Veicoli tagliandati, revisionati, igienizzati, lucidati e garantiti. Chiamaci per il tuo primo veicolo!", link: "tel:+393358299511", external: false },
  { icon: Trophy, title: "Super Car", badge: "Premium", desc: "Passione Audi e non solo. Veicoli premium selezionati con possibilità di finanziamento. Tagliandati, lucidati e garantiti per chi cerca il massimo.", link: "#vetture", external: false },
  { icon: Truck, title: "Fuoristrada & 4x4", badge: "4x4", desc: "Hyundai Galloper 2.5 TDI con ridotte e gancio traino, Suzuki Ignis 1.5, Toyota RAV4 2.2 Crossover. Robustezza per ogni terreno.", link: "#vetture", external: false },
  { icon: Truck, title: "Autocarri", badge: "Lavoro", desc: "Veicoli commerciali e autocarri per ogni esigenza professionale. Come il Fiat Strada 1.9 JTD Pick-Up, ideale per il lavoro in montagna.", link: "#vetture", external: false },
  { icon: Car, title: "Super Economiche", badge: "Offerta", desc: "Auto affidabili a prezzi accessibili. Veicoli controllati e garantiti a tariffe imbattibili per chi cerca qualità e risparmio.", link: "#vetture", external: false },
  { icon: Heart, title: "Storiche", badge: "Collezione", desc: "Veicoli d'epoca come la Volkswagen Golf 155 Cabriolet. Per gli appassionati che cercano l'emozione della guida classica.", link: "#vetture", external: false },
  { icon: Cog, title: "Veicoli Speciali", badge: "Speciali", desc: "Una selezione unica: dal Trattore Goldoni ai veicoli più insoliti. Per esigenze specifiche che non trovi da nessun'altra parte.", link: "#vetture", external: false },
];

function VehiclesSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="vetture" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle BG pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, oklch(0.8 0.02 60 / 0.3) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Le Nostre Vetture</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Nuovi Arrivi<span className="text-brand">.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Seguici su <a href="https://www.facebook.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="text-brand font-medium hover:underline">@emilcarardenno</a> per non perderti le migliori offerte!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicleCategories.map((v, i) => (
            <TiltCard key={v.title} delay={i * 80} visible={isVisible}>
              <Card className="h-full border-border/40 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(180,80,20,0.12)] transition-shadow duration-500 overflow-hidden group cursor-pointer">
                {/* Top accent line */}
                <div className="h-1 bg-gradient-to-r from-brand/0 via-brand to-brand/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center shadow-md shadow-brand/10 group-hover:shadow-lg group-hover:shadow-brand/20 transition-all duration-500 group-hover:scale-110">
                      <v.icon className="w-5 h-5 text-brand transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <Badge variant="secondary" className="bg-brand-light/40 text-brand-dark border-brand/10 text-[11px]">{v.badge}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-brand transition-colors duration-300">{v.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow text-[13px]">{v.desc}</p>
                  <div className="mt-4 flex items-center text-brand font-medium text-sm">
                    {v.external ? "Vedi su AutoScout24" : "Scopri di più"}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>

        {/* Autosupermarket banner */}
        <TiltCard delay={700} visible={isVisible} className="mt-12">
          <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-warm/80 p-8 md:p-12 text-white relative shadow-[0_20px_60px_rgba(180,80,20,0.25)]">
            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/5" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold mb-3">Autosupermarket</h3>
                <p className="text-white/80 leading-relaxed text-sm md:text-base">
                  Nuova collaborazione con Autosupermarket. Il nostro parco auto è pronto a soddisfare ogni vostra esigenza: multimarca, da piccole utilitarie a station wagon, da veicoli d&apos;epoca ad altri di tendenza, da autocarri a furgoni.
                </p>
              </div>
              <Button asChild size="lg" className="bg-white text-brand-dark hover:bg-white/90 rounded-2xl px-8 py-5 font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.2)] whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5">
                <a href="https://autosupermarket.it/concessionari/lombardia/sondrio/emilcar-s-r-l" target="_blank" rel="noopener noreferrer">
                  Vedi su Autosupermarket<ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CHI SIAMO
   ═══════════════════════════════════════════════════════ */
function AboutSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="chi-siamo" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand/15 group">
              <img src="/valtellina.jpg" alt="Ardenno Valtellina" className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
              {/* 3D floating stat card */}
              <div className="absolute -bottom-4 -right-4 md:right-8 bg-white rounded-2xl shadow-xl shadow-black/10 p-5 border border-border/30" style={{ transform: "perspective(500px) rotateY(-5deg) rotateX(3deg)", transformStyle: "preserve-3d" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-warm flex items-center justify-center shadow-lg shadow-brand/30">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground leading-none">30+</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Anni di esperienza</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Di Tutto un Po&rsquo;...</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">
              La Serietà al Servizio del Cliente<span className="text-brand">.</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>La serietà della nostra azienda si basa sull&apos;esperienza ultra trentennale del titolare Emilio. Azienda Valtellinese, qualità e globalità dei servizi sono il nostro codice base.</p>
              <p>Situati nel cuore della Valtellina, ad Ardenno in provincia di Sondrio, offriamo un servizio completo che va dalla vendita di veicoli d&apos;occasione all&apos;officina meccanica, dal gommista alla diagnosi computerizzata.</p>
              <p>Ogni veicolo viene accuratamente selezionato e controllato. Offriamo la <strong className="text-foreground">Garanzia Auto Moove</strong> su tutti i veicoli venduti.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "30+", label: "Anni" },
                { value: "8", label: "Categorie Veicoli" },
                { value: "6+", label: "Servizi" },
              ].map((s, i) => (
                <TiltCard key={s.label} delay={i * 100} visible={isVisible}>
                  <div className="text-center p-4 rounded-2xl bg-white border border-border/30 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
                    <p className="text-2xl md:text-3xl font-bold text-brand">{s.value}</p>
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   OFFICINA
   ═══════════════════════════════════════════════════════ */
function WorkshopSection() {
  const { ref, isVisible } = useInView();
  const services = [
    { icon: Wrench, label: "Meccanica generale" },
    { icon: Gauge, label: "Diagnosi computerizzata" },
    { icon: Cog, label: "Cambi automatici" },
    { icon: Car, label: "Gommista specializzato" },
    { icon: Shield, label: "Ganci traino" },
    { icon: CheckCircle2, label: "Igiene e lucidatura" },
    { icon: Sparkles, label: "Tagliando completo" },
    { icon: CheckCircle2, label: "Revisione veicoli" },
  ];

  return (
    <section id="officina" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`order-2 lg:order-1 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Officina</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Affidati ad una Lunga Esperienza<span className="text-brand">.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2 text-lg font-medium text-foreground/80">
              Mani competenti ed attrezzature di ultima generazione.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Il nostro centro officina è dotato di strumentazione moderna e tecnici costantemente aggiornati. Gestiamo ogni intervento con professionalità e trasparenza.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {services.map((s, i) => (
                <TiltCard key={s.label} delay={i * 60} visible={isVisible}>
                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-border/30 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(180,80,20,0.1)] transition-shadow duration-300">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-light to-brand/10 flex items-center justify-center flex-shrink-0">
                      <s.icon className="w-4 h-4 text-brand" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{s.label}</span>
                  </div>
                </TiltCard>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={() => document.querySelector("#contatti")?.scrollIntoView({ behavior: "smooth" })} className="bg-brand hover:bg-brand-dark text-white rounded-2xl px-6 py-5 font-semibold shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5">
                Prenota un Intervento<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          <div className={`order-1 lg:order-2 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand/15 group">
              <img src="/mechanic.jpg" alt="Officina meccanica EmilCar" className="w-full h-[400px] md:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
              {/* Floating badge */}
              <div className="absolute top-6 right-6 glass rounded-2xl px-4 py-3 text-white" style={{ transform: "perspective(500px) rotateY(5deg)" }}>
                <p className="text-xs opacity-80">Specializzati in</p>
                <p className="font-bold text-sm">Cambi Automatici</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   OFFERTE POST VENDITA
   ═══════════════════════════════════════════════════════ */
function PostVenditaSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="post-vendita" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand/3 blur-3xl pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Offerte Post Vendita</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">Offertissima Gomme<span className="text-brand">.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Grazie alla pluridecennale collaborazione con eccellenti fornitori e sulla base dei nostri severi test, sappiamo qualcosa su ruote e pneumatici.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pneumatici */}
          <TiltCard delay={100} visible={isVisible}>
            <Card className="h-full border-border/40 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(180,80,20,0.1)] transition-shadow duration-500">
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center mb-5 shadow-md shadow-brand/10">
                  <Car className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Pneumatici & Gomme</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  Passiamo molto tempo a testare pneumatici con i nostri fornitori. Per quale motivo? Perché non dobbiate farlo voi! Vi procureremo i pneumatici più adatti alle vostre esigenze.
                </p>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200/50">
                  <Snowflake className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">Cambio pneumatici invernali</span>
                </div>
                <p className="text-muted-foreground text-sm mt-3">Quando la temperatura scende sotto i 7°C è importante cambiare. Passate a trovarci!</p>
              </CardContent>
            </Card>
          </TiltCard>

          {/* Albergo Pneumatici */}
          <TiltCard delay={300} visible={isVisible}>
            <Card className="h-full border-border/40 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(180,80,20,0.1)] transition-shadow duration-500">
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center mb-5 shadow-md shadow-brand/10">
                  <Warehouse className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Albergo degli Pneumatici</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                  Dove conservare i pneumatici estivi? Lasciateli nel nostro magazzino che si occuperà di tutto.
                </p>
                <div className="space-y-2 mb-5">
                  {["Cambio ruote / pneumatici", "Controllo pneumatici", "Deposito sicuro"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-dark p-5 text-white relative overflow-hidden shadow-lg shadow-brand/20">
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                  <p className="text-xs uppercase tracking-wider opacity-80 mb-1 relative">Prezzo Offerta</p>
                  <p className="text-4xl font-bold relative">40&euro;</p>
                  <p className="text-sm opacity-90 mt-1 relative">Cambio 2 volte/anno + deposito</p>
                </div>
              </CardContent>
            </Card>
          </TiltCard>

          {/* Kit Invernale */}
          <TiltCard delay={500} visible={isVisible}>
            <Card className="h-full border-border/40 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(180,80,20,0.1)] transition-shadow duration-500">
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center mb-5 shadow-md shadow-brand/10">
                  <Snowflake className="w-7 h-7 text-brand" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Kit Invernale</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-4">L&apos;inverno è alle porte e noi lo scongeliamo!</p>
                <div className="space-y-2.5 mb-5">
                  {[
                    { icon: SprayCan, label: "Scongelante parabrezza" },
                    { icon: ThermometerSnowflake, label: "Liquido deghiacciante" },
                    { icon: Package, label: "Panno antiappannamento" },
                    { icon: Snowflake, label: "Raschetto per vetri" },
                    { icon: ThermometerSnowflake, label: "Antigelo artico -70°" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-brand flex-shrink-0" />
                      <span className="text-sm text-foreground">{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-brand to-warm p-5 text-white relative overflow-hidden shadow-lg shadow-brand/20">
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                  <p className="text-xs uppercase tracking-wider opacity-80 mb-1 relative">Solo</p>
                  <p className="text-4xl font-bold relative">15&euro;</p>
                  <p className="text-sm opacity-90 mt-1 relative">Kit invernale completo</p>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   OPINIONI
   ═══════════════════════════════════════════════════════ */
const reviews = [
  { name: "Marco B.", text: "Personale gentile e professionale. Ho comprato la mia prima auto qui, veicolo come descritto e prezzi onesti.", rating: 5 },
  { name: "Laura T.", text: "Officina eccellente! Intervento rapido e preciso. Consigliatissimi per chi cerca serietà in Valtellina.", rating: 5 },
  { name: "Giuseppe R.", text: "Valutazione a domicilio comodissima. Offerta giusta e passaggio di proprietà gestito tutto da loro.", rating: 4 },
  { name: "Anna M.", text: "Gomme e servizio gommista impeccabile. Prezzi migliori della concorrenza e deposito a soli 40 euro.", rating: 5 },
];

function OpinioniSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="opinioni" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">La Vostra Opinione</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Grazie per Averci Scelto<span className="text-brand">.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Lascia anche tu la tua opinione!</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((r, i) => (
            <TiltCard key={r.name} delay={i * 120} visible={isVisible}>
              <Card className="h-full border-border/40 bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(180,80,20,0.1)] transition-shadow duration-500">
                <CardContent className="p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < r.rating ? "text-warm fill-warm" : "text-muted/30"}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                  <div className="flex items-center gap-2.5 pt-2 border-t border-border/30">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-brand">{r.name.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium text-foreground">{r.name}</span>
                  </div>
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" className="rounded-2xl border-border/60 hover:bg-brand/5 hover:border-brand/20 transition-all duration-300">
            <a href="https://www.facebook.com/emilcarardenno/reviews" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4 mr-2" />Recensione su Facebook
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-2xl border-border/60 hover:bg-brand/5 hover:border-brand/20 transition-all duration-300">
            <a href="https://www.google.com/maps/place/EmilCar+S.r.l./" target="_blank" rel="noopener noreferrer">
              <Star className="w-4 h-4 mr-2" />Recensisci su Google
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CONTATTI
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="contatti" className="py-24 md:py-32 bg-secondary/30 relative overflow-hidden">
      <div className="absolute top-20 -right-40 w-80 h-80 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Contatti & Dove Siamo</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Vieni a <span className="text-brand">Trovarci</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">Scopri come raggiungere la nostra sede operativa.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Info cards */}
          <div className={`lg:col-span-2 space-y-4 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            {[
              { icon: MapPin, title: "Indirizzo", lines: ["Via Empio, 30", "23011 Ardenno (SO)", "Valchiavenna, Valtellina"] },
              { icon: Phone, title: "Telefono", links: [{ label: "+39 335 829 9511", href: "tel:+393358299511" }, { label: "0342 670937", href: "tel:+390342670937" }] },
              { icon: Mail, title: "Email & PEC", links: [{ label: "info@emilcarsrl.com", href: "mailto:info@emilcarsrl.com" }], extra: "PEC: emilcar.srl@pec.it" },
              { icon: Clock, title: "Orari d'Apertura", hours: [{ day: "Lun - Ven", time: "08:00-12:00 / 14:00-19:00" }, { day: "Sabato", time: "08:00-12:00" }, { day: "Domenica", time: "Chiuso" }] },
            ].map((card) => (
              <Card key={card.title} className="border-border/40 bg-white shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center flex-shrink-0 shadow-md shadow-brand/10">
                    <card.icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                    {"lines" in card && card.lines.map((l) => <p key={l} className="text-muted-foreground text-sm">{l}</p>)}
                    {"links" in card && card.links.map((l) => <a key={l.label} href={l.href} className="text-muted-foreground hover:text-brand text-sm transition-colors block">{l.label}</a>)}
                    {"extra" in card && <p className="text-muted-foreground text-sm mt-1">{card.extra}</p>}
                    {"hours" in card && card.hours.map((h) => (
                      <div key={h.day} className="flex justify-between gap-4 text-sm text-muted-foreground">
                        <span>{h.day}</span><span className="font-medium text-foreground">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { icon: Facebook, href: "https://www.facebook.com/emilcarardenno", label: "Facebook" },
                { icon: Instagram, href: "https://www.instagram.com/emilcarardenno", label: "Instagram" },
                { icon: ExternalLink, href: "https://www.emilcarsrl.com", label: "Sito Web" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-2xl bg-white border border-border/40 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/20" aria-label={s.label}>
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Form + Directions */}
          <div className={`lg:col-span-3 space-y-5 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <Card className="border-border/40 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Inviaci un Messaggio</h3>
                <p className="text-muted-foreground text-sm mb-6">Ti risponderemo il prima possibile.</p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Nome</label><Input placeholder="Il tuo nome" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 bg-secondary/20" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Cognome</label><Input placeholder="Il tuo cognome" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 bg-secondary/20" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Email</label><Input type="email" placeholder="la-tua@email.it" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 bg-secondary/20" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Telefono</label><Input type="tel" placeholder="+39 xxx xxx xxxx" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 bg-secondary/20" /></div>
                  </div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Oggetto</label><Input placeholder="Es: Informazioni veicolo, prenotazione officina..." className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 bg-secondary/20" /></div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Messaggio</label><Textarea placeholder="Scrivi il tuo messaggio..." rows={4} className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 resize-none bg-secondary/20" /></div>
                  <Button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white rounded-2xl py-5 text-base font-semibold shadow-lg shadow-brand/20 transition-all duration-300 hover:-translate-y-0.5">
                    Invia Messaggio<Mail className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Directions */}
            <Card className="border-border/40 bg-white shadow-[0_4px_30px_rgba(0,0,0,0.06)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-light to-brand/20 flex items-center justify-center shadow-md shadow-brand/10">
                    <Route className="w-5 h-5 text-brand" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Come Raggiungerci</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { letter: "M", from: "Milano", text: "Superstrada 36 direzione Lecco, proseguire per Sondrio. Sul rettilineo di Ardenno al km 25, svoltare a sinistra dopo il distributore Agip in Via Empio." },
                    { letter: "S", from: "Sondrio", text: "All'altezza del cartello ARDENNO, svoltare a destra al primo incrocio in Via Empio." },
                  ].map((d) => (
                    <div key={d.letter} className="flex gap-3">
                      <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand to-warm flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-brand/20">
                        <span className="text-xs font-bold text-white">{d.letter}</span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Da {d.from}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed">{d.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mappa */}
        <div className="mt-10 rounded-3xl overflow-hidden border border-border/40 shadow-xl shadow-black/5">
          <iframe title="Mappa EmilCar Ardenno" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.8!2d9.5189!3d46.1855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Empio+30%2C+23011+Ardenno+SO!5e0!3m2!1sit!2sit!4v1" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-11 h-11 rounded-2xl bg-brand flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-brand/30">E</div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">EmilCar</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Ardenno — Valtellina</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mt-3">Concessionario veicoli d&apos;occasione e officina multiservice. Qualità e serietà da oltre 30 anni.</p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand transition-all duration-300" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand transition-all duration-300" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Le Nostre Vetture</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {["AutoScout 24", "Neopatentati", "Super Car", "Fuoristrada & 4x4", "Autocarri", "Super Economiche", "Storiche", "Veicoli Speciali"].map((l) => <li key={l}>{l}</li>)}
              <li><a href="https://autosupermarket.it/concessionari/lombardia/sondrio/emilcar-s-r-l" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors inline-flex items-center gap-1">Autosupermarket<ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Servizi</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {["Officina Meccanica", "Gommista", "Diagnosi Computerizzata", "Cambi Automatici", "Ganci Traino", "Garanzia Auto Moove", "Valutazione a Domicilio"].map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Post Vendita</h4>
            <ul className="space-y-2 text-sm text-white/50">
              {["Pneumatici & Gomme", "Albergo Pneumatici", "Cambio Gomme Invernali", "Kit Invernale 15€", "Deposito Gomme 40€", "Prodotti Igiene Auto"].map((l) => <li key={l}>{l}</li>)}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Contatti</h4>
            <ul className="space-y-3 text-sm text-white/50">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand" /><span>Via Empio, 30<br />23011 Ardenno (SO)</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0 text-brand" /><a href="tel:+393358299511" className="hover:text-brand transition-colors">+39 335 829 9511</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0 text-brand" /><a href="mailto:info@emilcarsrl.com" className="hover:text-brand transition-colors">info@emilcarsrl.com</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0 text-brand" /><span className="text-xs">PEC: emilcar.srl@pec.it</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} EmilCar S.r.l. — P.Iva 08945610965</p>
          <div className="flex items-center gap-3">
            <a href="https://www.emilcarsrl.com/j/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Privacy</a>
            <span>·</span>
            <a href="https://www.emilcarsrl.com/about/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Informazioni Legali</a>
            <span>·</span>
            <a href="https://www.emilcarsrl.com/j/withdrawal" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Recesso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   WHATSAPP
   ═══════════════════════════════════════════════════════ */
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 2000); return () => clearTimeout(t); }, []);
  if (!visible) return null;
  return (
    <a href="https://wa.me/393358299511?text=Ciao! Vorrei informazioni sui vostri veicoli." target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.35)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 animate-fade-in" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <VehiclesSection />
        <AboutSection />
        <WorkshopSection />
        <PostVenditaSection />
        <OpinioniSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}