"use client";

import { useEffect, useRef, useState } from "react";
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
} from "lucide-react";

/* ─── Intersection Observer Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ─── Navigation ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Servizi", href: "#servizi" },
    { label: "Chi Siamo", href: "#chi-siamo" },
    { label: "Veicoli", href: "#veicoli" },
    { label: "Contatti", href: "#contatti" },
  ];

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${
                scrolled
                  ? "bg-brand"
                  : "bg-white/20 backdrop-blur-sm border border-white/30"
              }`}
            >
              E
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${
                  scrolled ? "text-foreground" : "text-white"
                }`}
              >
                EmilCar
              </span>
              <span
                className={`text-xs tracking-wider uppercase transition-colors duration-300 ${
                  scrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Ardenno
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 ${
                  scrolled
                    ? "text-foreground hover:bg-primary/5"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => handleNav("#contatti")}
              className="ml-3 bg-brand hover:bg-brand-dark text-white rounded-lg"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contattaci
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X
                className={
                  scrolled ? "text-foreground" : "text-white"
                }
              />
            ) : (
              <Menu
                className={
                  scrolled ? "text-foreground" : "text-white"
                }
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="block w-full text-left px-4 py-3 rounded-lg text-foreground font-medium hover:bg-primary/5 transition-colors"
              >
                {l.label}
              </button>
            ))}
            <Button
              onClick={() => handleNav("#contatti")}
              className="w-full mt-2 bg-brand hover:bg-brand-dark text-white rounded-lg"
            >
              <Phone className="w-4 h-4 mr-2" />
              Contattaci
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-car.jpg"
          alt="Showroom EmilCar Ardenno"
          className="w-full h-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-white/15 text-white border-white/20 backdrop-blur-sm animate-fade-in-up px-4 py-1.5 text-sm">
            <Star className="w-3.5 h-3.5 mr-1.5 text-warm" />
            Oltre 30 anni di esperienza
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up delay-200">
            La Tua Auto
            <br />
            <span className="text-warm">Merita il Meglio</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl animate-fade-in-up delay-400">
            Concessionario veicoli d&apos;occasione e officina multiservice in
            Valtellina. Serietà, qualità e passione al tuo servizio dal 1990.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
            <Button
              onClick={() =>
                document
                  .querySelector("#veicoli")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              size="lg"
              className="bg-brand hover:bg-brand-dark text-white rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5"
            >
              Scopri i Veicoli
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() =>
                document
                  .querySelector("#servizi")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
            >
              I Nostri Servizi
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-14 flex flex-wrap items-center gap-6 text-white/70 text-sm animate-fade-in-up delay-800">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-warm" />
              <span>Garanzia Auto Moove</span>
            </div>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-warm" />
              <span>Valutazione a domicilio</span>
            </div>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-warm" />
              <span>86% recensioni positive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}

/* ─── Services Section ─── */
const services = [
  {
    icon: Car,
    title: "Vendita Veicoli",
    desc: "Concessionario di veicoli d'occasione selezionati e controllati. City car, fuoristrada, veicoli speciali e super economiche per ogni esigenza. Pagamento e passaggio di proprietà immediato.",
  },
  {
    icon: Wrench,
    title: "Officina Meccanica",
    desc: "Officina meccanica completa con tecnici qualificati. Manutenzione ordinaria e straordinaria, riparazioni di ogni tipo su tutte le marche e modelli.",
  },
  {
    icon: Gauge,
    title: "Diagnosi Computerizzata",
    desc: "Strumentazione diagnostica all'avanguardia per individuare con precisione ogni anomalia elettronica e meccanica del tuo veicolo.",
  },
  {
    icon: Cog,
    title: "Cambi Automatici",
    desc: "Specialisti nella revisione e riparazione di cambi automatici e robotizzati. Interventi precisi e garantiti per prolungare la vita della tua trasmissione.",
  },
  {
    icon: Car,
    title: "Gommista",
    desc: "Servizio gommista completo: montaggio, bilanciatura, convergenza e vendita pneumatici di tutte le marche ai prezzi più competitivi del mercato.",
  },
  {
    icon: HomeIcon,
    title: "Valutazione a Domicilio",
    desc: "Valutiamo la tua usata direttamente a casa tua, con proposta di acquisto immediata e passaggio di proprietà gestito da noi. Zero pensieri.",
  },
];

function ServicesSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="servizi" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10"
          >
            I Nostri Servizi
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Tutto per la Tua Auto,{" "}
            <span className="text-brand">in un Solo Posto</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Dalla vendita di veicoli all&apos;officina meccanica, dal gommista
            alla diagnosi computerizzata. Un centro multiservice completo al
            servizio dei clienti valtellinesi.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Card
              key={s.title}
              className={`group border-border/50 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 hover:-translate-y-1 bg-card ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6 md:p-8">
                <div className="w-14 h-14 rounded-2xl bg-brand-light/60 flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                  <s.icon className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {s.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {s.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="chi-siamo" className="py-20 md:py-28 bg-background">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <div
            className={`relative ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand/10">
              <img
                src="/valtellina.jpg"
                alt="Ardenno Valtellina - Sede EmilCar"
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-xl shadow-xl p-5 border border-border/50 max-w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">30+</p>
                  <p className="text-xs text-muted-foreground">
                    Anni di esperienza
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div
            className={`${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <Badge
              variant="secondary"
              className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10"
            >
              Chi Siamo
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">
              Passione e Serietà{" "}
              <span className="text-brand">dal 1990</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                La serietà della nostra azienda si basa sull&apos;esperienza
                ultra trentennale del titolare Emilio. EmilCar è un&apos;azienda
                valtellinese che ha fatto della qualità e della globalità dei
                servizi il proprio codice base, crescendo costantemente negli
                anni grazie alla fiducia dei clienti.
              </p>
              <p>
                Situati nel cuore della Valtellina, ad Ardenno in provincia di
                Sondrio, offriamo un servizio completo che va dalla vendita di
                veicoli d&apos;occasione all&apos;officina meccanica, dal
                gommista alla diagnosi computerizzata, fino alla riparazione di
                cambi automatici e all&apos;installazione di ganci traino.
              </p>
              <p>
                Ogni veicolo in vendita viene accuratamente selezionato e
                controllato, e offriamo la possibilità di effettuare una
                valutazione personalizzata e direttamente a domicilio, con
                pagamento e passaggio di proprietà immediato. La tranquillità
                del cliente è la nostra priorità: per questo offriamo la
                Garanzia Auto Moove su tutti i veicoli venduti.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "30+", label: "Anni di Esperienza" },
                { value: "86%", label: "Recensioni Positive" },
                { value: "6", label: "Servizi Offerti" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-secondary/50"
                >
                  <p className="text-2xl md:text-3xl font-bold text-brand">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Vehicles Section ─── */
const vehicleCategories = [
  {
    title: "City Car & Berline",
    desc: "Veicoli compatti e versatili, ideali per la città e i tragitti quotidiani in Valtellina.",
    badge: "Popolari",
  },
  {
    title: "Fuoristrada & 4x4",
    desc: "Veicoli robusti e affidabili per affrontare le strade montane della provincia di Sondrio.",
    badge: "4x4",
  },
  {
    title: "Super Economiche",
    desc: "Auto affidabili a prezzi accessibili, la soluzione perfetta per chi cerca qualità a un giusto prezzo.",
    badge: "Offerta",
  },
  {
    title: "Veicoli Speciali",
    desc: "Una selezione di veicoli particolari per esigenze specifiche: commerciali, fuoristrada estremi e molto altro.",
    badge: "Speciali",
  },
];

function VehiclesSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="veicoli" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10"
          >
            Le Nostre Vetture
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Trova l&apos;Auto <span className="text-brand">Ideale per Te</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Sfoglia la nostra selezione di veicoli d&apos;occasione
            accuratamente controllati. City car, fuoristrada, veicoli speciali
            e super economiche: c&apos;è l&apos;auto giusta per ogni
            necessità.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {vehicleCategories.map((v, i) => (
            <Card
              key={v.title}
              className={`group overflow-hidden border-border/50 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 hover:-translate-y-1 bg-card cursor-pointer ${
                isVisible
                  ? "animate-fade-in-up"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <CardContent className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-light/60 flex items-center justify-center">
                    <Car className="w-6 h-6 text-brand" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-brand-light/50 text-brand-dark border-brand/10 text-xs"
                  >
                    {v.badge}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow text-[15px]">
                  {v.desc}
                </p>
                <div className="mt-6 flex items-center text-brand font-medium text-sm group-hover:gap-2 transition-all duration-300">
                  Scopri di più
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand hover:bg-brand-dark text-white rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand/25"
          >
            <a
              href="https://www.emilcarsrl.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Vedi Tutti i Veicoli su Autosupermarket
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ─── Workshop Section ─── */
function WorkshopSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className="py-20 md:py-28 bg-background">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <div
            className={`order-2 lg:order-1 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <Badge
              variant="secondary"
              className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10"
            >
              Officina & Assistenza
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">
              Officina Multiservice{" "}
              <span className="text-brand">a 360°</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Il nostro centro officina è dotato di attrezzature moderne e
              tecnici costantemente aggiornati sulle ultime tecnologie
              automobilistiche. Dalla manutenzione ordinaria alle riparazioni
              complesse, gestiamo ogni intervento con professionalità e
              trasparenza.
            </p>

            {/* Service list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Wrench, label: "Meccanica generale" },
                { icon: Gauge, label: "Diagnosi computerizzata" },
                { icon: Cog, label: "Cambi automatici" },
                { icon: Car, label: "Gommista" },
                { icon: Shield, label: "Ganci traino" },
                { icon: CheckCircle2, label: "Garanzia Auto Moove" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-brand-light/30 transition-colors duration-300"
                >
                  <item.icon className="w-5 h-5 text-brand flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button
                onClick={() =>
                  document
                    .querySelector("#contatti")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-brand hover:bg-brand-dark text-white rounded-xl px-6 py-5 font-semibold shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand/25"
              >
                Prenota un Intervento
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Image side */}
          <div
            className={`order-1 lg:order-2 ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand/10">
              <img
                src="/mechanic.jpg"
                alt="Officina meccanica EmilCar"
                className="w-full h-[400px] md:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Contact Section ─── */
function ContactSection() {
  const { ref, isVisible } = useInView();

  return (
    <section id="contatti" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="secondary"
            className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10"
          >
            Contatti
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Vieni a <span className="text-brand">Trovarci</span>
          </h2>
          <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
            Siamo a tua disposizione per qualsiasi informazione. Contattaci
            telefonicamente, via email o vieni direttamente in sede.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact info */}
          <div
            className={`lg:col-span-2 space-y-6 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            {/* Info cards */}
            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Indirizzo
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Via Empio, 30
                    <br />
                    23011 Ardenno (SO)
                    <br />
                    Valchiavenna, Valtellina
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Telefono
                  </h3>
                  <a
                    href="tel:+393358299511"
                    className="text-muted-foreground hover:text-brand text-sm transition-colors"
                  >
                    +39 335 829 9511
                  </a>
                  <br />
                  <a
                    href="tel:+390342670937"
                    className="text-muted-foreground hover:text-brand text-sm transition-colors"
                  >
                    0342 670937
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:info@emilcarsrl.com"
                    className="text-muted-foreground hover:text-brand text-sm transition-colors"
                  >
                    info@emilcarsrl.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Orari di Apertura
                  </h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <div className="flex justify-between gap-6">
                      <span>Lun - Ven</span>
                      <span className="font-medium text-foreground">
                        08:00 - 12:00 / 14:00 - 19:00
                      </span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Sabato</span>
                      <span className="font-medium text-foreground">
                        08:00 - 12:00
                      </span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Domenica</span>
                      <span className="font-medium text-foreground">
                        Chiuso
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/emilcarardenno"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/emilcarardenno"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.emilcarsrl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300"
                aria-label="Sito Web"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`lg:col-span-3 ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <Card className="border-border/50 bg-card shadow-lg shadow-brand/5">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Inviaci un Messaggio
                </h3>
                <p className="text-muted-foreground text-sm mb-8">
                  Compila il modulo e ti risponderemo il prima possibile.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Nome
                      </label>
                      <Input
                        placeholder="Il tuo nome"
                        className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Cognome
                      </label>
                      <Input
                        placeholder="Il tuo cognome"
                        className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="la-tua@email.it"
                        className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Telefono
                      </label>
                      <Input
                        type="tel"
                        placeholder="+39 xxx xxx xxxx"
                        className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Oggetto
                    </label>
                    <Input
                      placeholder="Es: Informazioni veicolo, prenotazione officina..."
                      className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Messaggio
                    </label>
                    <Textarea
                      placeholder="Scrivi il tuo messaggio..."
                      rows={5}
                      className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-brand hover:bg-brand-dark text-white rounded-xl py-6 text-base font-semibold shadow-lg shadow-brand/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand/25"
                  >
                    Invia Messaggio
                    <Mail className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map placeholder */}
        <div className="mt-12 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
          <iframe
            title="Mappa EmilCar Ardenno"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.8!2d9.5189!3d46.1855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Empio+30%2C+23011+Ardenno+SO!5e0!3m2!1sit!2sit!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-lg">
                E
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">
                  EmilCar
                </span>
                <span className="text-xs tracking-wider uppercase text-white/50">
                  Ardenno
                </span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-3">
              Concessionario veicoli d&apos;occasione e officina multiservice
              in Valtellina. Qualità, serietà e passione al tuo servizio da
              oltre 30 anni.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://www.facebook.com/emilcarardenno"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/emilcarardenno"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Servizi */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Vendita Veicoli</li>
              <li>Officina Meccanica</li>
              <li>Gommista</li>
              <li>Diagnosi Computerizzata</li>
              <li>Cambi Automatici</li>
              <li>Ganci Traino</li>
            </ul>
          </div>

          {/* Veicoli */}
          <div>
            <h4 className="text-white font-semibold mb-4">Veicoli</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>City Car & Berline</li>
              <li>Fuoristrada & 4x4</li>
              <li>Super Economiche</li>
              <li>Veicoli Speciali</li>
              <li>
                <a
                  href="https://www.emilcarsrl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors inline-flex items-center gap-1"
                >
                  Autosupermarket
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand" />
                <span>
                  Via Empio, 30
                  <br />
                  23011 Ardenno (SO)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-brand" />
                <a
                  href="tel:+393358299511"
                  className="hover:text-brand transition-colors"
                >
                  +39 335 829 9511
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-brand" />
                <a
                  href="mailto:info@emilcarsrl.com"
                  className="hover:text-brand transition-colors"
                >
                  info@emilcarsrl.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>
            &copy; {new Date().getFullYear()} EmilCar S.r.l. — P.Iva
            08945610965 — Tutti i diritti riservati.
          </p>
          <p>Via Empio, 30 — 23011 Ardenno (SO) — Valtellina</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── WhatsApp Floating Button ─── */
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/393358299511?text=Ciao! Vorrei informazioni sui vostri veicoli."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 animate-fade-in"
      aria-label="Contattaci su WhatsApp"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-7 h-7"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <WorkshopSection />
        <VehiclesSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}