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
  Snowflake,
  ThermometerSnowflake,
  Package,
  SprayCan,
  Sparkles,
  Warehouse,
  Route,
  MessageSquare,
  Award,
  Truck,
  Trophy,
  Heart,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════
   INTERSECTION OBSERVER HOOK
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

/* ═══════════════════════════════════════════════════════
   NAVBAR — replica menu completo del sito originale
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg transition-all duration-300 ${scrolled ? "bg-brand" : "bg-white/20 backdrop-blur-sm border border-white/30"}`}>E</div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-tight leading-none transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>EmilCar</span>
              <span className={`text-[10px] tracking-widest uppercase transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>Ardenno — Valtellina</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-0.5">
            {mainLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-white/10 ${scrolled ? "text-foreground hover:bg-primary/5" : "text-white/90 hover:text-white"}`}>
                {l.label}
              </button>
            ))}
            <Button onClick={() => scrollTo("#contatti")} className="ml-2 bg-brand hover:bg-brand-dark text-white rounded-lg" size="sm">
              <Phone className="w-4 h-4 mr-2" />Contattaci
            </Button>
          </div>

          <button className="lg:hidden p-2 rounded-lg" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className={scrolled ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-border animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {mainLinks.map((l) => (
              <button key={l.href} onClick={() => scrollTo(l.href)} className="block w-full text-left px-4 py-3 rounded-lg text-foreground font-medium hover:bg-primary/5 transition-colors">{l.label}</button>
            ))}
            <Button onClick={() => scrollTo("#contatti")} className="w-full mt-2 bg-brand hover:bg-brand-dark text-white rounded-lg">
              <Phone className="w-4 h-4 mr-2" />Contattaci
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════
   HERO — "Acquistiamo le vostre vetture" + Garanzia
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src="/hero-car.jpg" alt="Showroom EmilCar Ardenno" className="w-full h-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-2xl">
          <Badge className="mb-6 bg-white/15 text-white border-white/20 backdrop-blur-sm animate-fade-in-up px-4 py-1.5 text-sm">
            <Star className="w-3.5 h-3.5 mr-1.5 text-warm" />Oltre 30 anni di esperienza
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fade-in-up delay-200">
            Acquistiamo<br />le Vostre <span className="text-warm">Vetture</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl animate-fade-in-up delay-400">
            Con la possibilità di effettuare una valutazione personalizzata e direttamente a domicilio, con pagamento e passaggio di proprietà immediato.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
            <Button onClick={() => document.querySelector("#vetture")?.scrollIntoView({ behavior: "smooth" })} size="lg" className="bg-brand hover:bg-brand-dark text-white rounded-xl px-8 py-6 text-lg font-semibold shadow-lg shadow-brand/25 transition-all duration-300 hover:shadow-xl hover:shadow-brand/30 hover:-translate-y-0.5">
              Le Nostre Vetture<ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button onClick={() => document.querySelector("#officina")?.scrollIntoView({ behavior: "smooth" })} variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-xl px-8 py-6 text-lg font-semibold backdrop-blur-sm">
              Officina
            </Button>
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-6 text-white/70 text-sm animate-fade-in-up delay-800">
            <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-warm" /><span>Garanzia Auto Moove</span></div>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-warm" /><span>Valutazione a domicilio</span></div>
            <div className="w-px h-4 bg-white/30 hidden sm:block" />
            <div className="flex items-center gap-2"><HomeIcon className="w-5 h-5 text-warm" /><span>Pagamento immediato</span></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce"><ChevronDown className="w-6 h-6 text-white/50" /></div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LE NOSTRE VETTURE — tutte 8+2 categorie dal sito
   ═══════════════════════════════════════════════════════ */
const vehicleCategories = [
  {
    icon: Car, title: "AutoScout 24", badge: "Piattaforma",
    desc: "I nostri annunci su AutoScout24, il portale di riferimento per la compravendita di veicoli d'occasione in Italia. Annunci aggiornati con foto dettagliate e descrizioni complete.",
    link: "https://www.autoscout24.it/annunci/emilcar-ardenno",
    external: true,
  },
  {
    icon: Award, title: "Neopatentati", badge: "Popolari",
    desc: "Da Fiat Panda ad Alfa Mito, da Volkswagen Polo ad Audi A1. Veicoli tagliandati, revisionati, igienizzati, lucidati e garantiti. Chiamaci per richiedere il tuo primo veicolo dei sogni!",
    link: "tel:+393358299511",
    external: false,
  },
  {
    icon: Trophy, title: "Super Car", badge: "Premium",
    desc: "EmilCar passione Audi e non solo. Veicoli premium selezionati con la possibilità di finanziamento. Tagliandati, lucidati e garantiti per chi cerca il massimo.",
    link: "#vetture",
    external: false,
  },
  {
    icon: Truck, title: "Fuoristrada & 4x4", badge: "4x4",
    desc: "Hyundai Galloper 2.5 TDI 4x4 con ridotte e gancio traino, Suzuki Ignis 1.5 unico proprietario, Toyota RAV4 2.2 Crossover con sistema 4x4. Robustezza e affidabilità per ogni terreno.",
    link: "#vetture",
    external: false,
  },
  {
    icon: Truck, title: "Autocarri", badge: "Lavoro",
    desc: "Veicoli commerciali e autocarri per ogni esigenza professionale. Come il Fiat Strada 1.9 JTD Pick-Up, ideale per il lavoro in montagna e le esigenze agricole della Valtellina.",
    link: "#vetture",
    external: false,
  },
  {
    icon: Car, title: "Super Economiche", badge: "Offerta",
    desc: "Auto affidabili a prezzi accessibili, la soluzione perfetta per chi cerca qualità e risparmio. Veicoli controllati e garantiti a tariffe imbattibili.",
    link: "#vetture",
    external: false,
  },
  {
    icon: Heart, title: "Storiche", badge: "Collezione",
    desc: "Veicoli d'epoca e storici, come la Volkswagen Golf 155 Cabriolet. Per gli appassionati che cercano l'emozione della guida classica con il supporto di esperti qualificati.",
    link: "#vetture",
    external: false,
  },
  {
    icon: Cog, title: "Veicoli Speciali", badge: "Speciali",
    desc: "Una selezione unica di veicoli particolari: dal Trattore Goldoni ai veicoli più insoliti. Per esigenze specifiche che non trovi da nessun'altra parte.",
    link: "#vetture",
    external: false,
  },
];

function VehiclesSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="vetture" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Le Nostre Vettture</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">Nuovi Arrivi<span className="text-brand">.</span></h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Seguici su <a href="https://www.facebook.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="text-brand font-medium hover:underline">Facebook @emilcarardenno</a> per non perderti le migliori offerte!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicleCategories.map((v, i) => (
            <Card key={v.title} className={`group overflow-hidden border-border/50 hover:border-brand/20 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 hover:-translate-y-1 bg-card cursor-pointer ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-11 h-11 rounded-xl bg-brand-light/60 flex items-center justify-center group-hover:bg-brand transition-all duration-300">
                    <v.icon className="w-5 h-5 text-brand group-hover:text-white transition-colors duration-300" />
                  </div>
                  <Badge variant="secondary" className="bg-brand-light/50 text-brand-dark border-brand/10 text-xs">{v.badge}</Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow text-sm">{v.desc}</p>
                <div className="mt-4 flex items-center text-brand font-medium text-sm group-hover:gap-2 transition-all duration-300">
                  {v.external ? "Vedi su AutoScout24" : "Scopri di più"}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Autosupermarket banner */}
        <div className={`mt-12 rounded-2xl overflow-hidden bg-gradient-to-r from-brand-dark to-brand p-8 md:p-12 text-white ${isVisible ? "animate-fade-in-up delay-700" : "opacity-0"}`}>
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="flex-grow">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Autosupermarket</h3>
              <p className="text-white/80 leading-relaxed text-sm md:text-base">
                Nuova collaborazione con Autosupermarket. Il nostro parco auto è pronto a soddisfare ogni vostra esigenza: multimarca, da piccole utilitarie a station wagon, da veicoli d&apos;epoca ad altri di tendenza, da autocarri a furgoni, e molto altro.
              </p>
            </div>
            <Button asChild size="lg" className="bg-white text-brand-dark hover:bg-white/90 rounded-xl px-8 py-5 font-semibold shadow-lg whitespace-nowrap">
              <a href="https://autosupermarket.it/concessionari/lombardia/sondrio/emilcar-s-r-l" target="_blank" rel="noopener noreferrer">
                Vedi su Autosupermarket<ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   CHI SIAMO — Emilio + 30 anni
   ═══════════════════════════════════════════════════════ */
function AboutSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="chi-siamo" className="py-20 md:py-28 bg-background">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`relative ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand/10">
              <img src="/valtellina.jpg" alt="Ardenno Valtellina - Sede EmilCar" className="w-full h-[400px] md:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-4 md:right-6 bg-white rounded-xl shadow-xl p-5 border border-border/50 max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center"><Star className="w-5 h-5 text-brand" /></div>
                <div>
                  <p className="text-2xl font-bold text-foreground">30+</p>
                  <p className="text-xs text-muted-foreground">Anni di esperienza</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Di Tutto un Po&rsquo;...</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-6">La Serietà al Servizio del Cliente<span className="text-brand">.</span></h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>La serietà della nostra azienda si basa sull&apos;esperienza ultra trentennale del titolare Emilio. Azienda Valtellinese, qualità e globalità dei servizi sono il nostro codice base.</p>
              <p>Situati nel cuore della Valtellina, ad Ardenno in provincia di Sondrio, offriamo un servizio completo che va dalla vendita di veicoli d&apos;occasione all&apos;officina meccanica, dal gommista alla diagnosi computerizzata, fino alla riparazione di cambi automatici e all&apos;installazione di ganci traino.</p>
              <p>Ogni veicolo in vendita viene accuratamente selezionato e controllato. Offriamo la Garanzia Auto Moove su tutti i veicoli venduti, per la massima tranquillità del cliente.</p>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "30+", label: "Anni" },
                { value: "8", label: "Categorie Veicoli" },
                { value: "6+", label: "Servizi" },
              ].map((s) => (
                <div key={s.label} className="text-center p-4 rounded-xl bg-secondary/50">
                  <p className="text-2xl md:text-3xl font-bold text-brand">{s.value}</p>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   OFFICINA — "Affidati ad una lunga esperienza"
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
    <section id="officina" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`order-2 lg:order-1 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Officina</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Affidati ad una Lunga Esperienza<span className="text-brand">.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-2 text-lg font-medium">
              Mani competenti ed attrezzature di ultima generazione.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Il nostro centro officina è dotato di strumentazione moderna e tecnici costantemente aggiornati. Gestiamo ogni intervento con professionalità e trasparenza, dalla manutenzione ordinaria alle riparazioni più complesse.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {services.map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl bg-card hover:bg-brand-light/30 transition-colors duration-300 border border-border/30">
                  <s.icon className="w-5 h-5 text-brand flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Button onClick={() => document.querySelector("#contatti")?.scrollIntoView({ behavior: "smooth" })} className="bg-brand hover:bg-brand-dark text-white rounded-xl px-6 py-5 font-semibold shadow-lg shadow-brand/20">
                Prenota un Intervento<ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className={`order-1 lg:order-2 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand/10">
              <img src="/mechanic.jpg" alt="Officina meccanica EmilCar Ardenno" className="w-full h-[400px] md:h-[520px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   OFFERTE POST VENDITA — gomme, deposito, kit invernale
   ═══════════════════════════════════════════════════════ */
function PostVenditaSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="post-vendita" className="py-20 md:py-28 bg-background">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Offerte Post Vendita</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Offertissima Gomme<span className="text-brand">.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Grazie alla pluridecennale collaborazione con eccellenti fornitori e sulla base dei nostri severi test, possiamo tranquillamente affermare a ragione di saperne qualcosa su ruote e pneumatici.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gomme & Pneumatici */}
          <Card className={`border-border/50 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 ${isVisible ? "animate-fade-in-up delay-100" : "opacity-0"}`}>
            <CardContent className="p-6 md:p-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-light/60 flex items-center justify-center mb-5">
                <Car className="w-7 h-7 text-brand" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Pneumatici & Gomme</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                Passiamo molto tempo a testare pneumatici con i nostri fornitori, per cui apprendiamo tutto il possibile sulle nozioni scientifiche in merito. Per quale motivo? Perché non dobbiate farlo voi!
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                Se siete alla ricerca delle ruote e dei pneumatici giusti per la vostra auto, recatevi presso la nostra officina e spiegateci come, dove e quando guidate. Vi procureremo subito i pneumatici più adatti.
              </p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-brand/5 border border-brand/10">
                <Snowflake className="w-5 h-5 text-brand flex-shrink-0" />
                <span className="text-sm font-medium text-foreground">Cambio pneumatici invernali</span>
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                Quando la temperatura scende sotto i 7°C è importante cambiare i pneumatici. Passate a trovarci! Sostituiremo i vostri pneumatici con facilità e rapidità.
              </p>
            </CardContent>
          </Card>

          {/* Albergo degli Pneumatici */}
          <Card className={`border-border/50 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 ${isVisible ? "animate-fade-in-up delay-300" : "opacity-0"}`}>
            <CardContent className="p-6 md:p-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-light/60 flex items-center justify-center mb-5">
                <Warehouse className="w-7 h-7 text-brand" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Albergo degli Pneumatici</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                Quando fate montare i pneumatici invernali, forse non sapete dove conservare quelli estivi. Lasciateli tranquillamente nel nostro magazzino che si occuperà di tutto.
              </p>
              <div className="space-y-2 mb-6">
                {["Cambio delle ruote / dei pneumatici", "Controllo pneumatici", "Deposito sicuro in magazzino"].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-gradient-to-r from-brand to-brand-dark p-5 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Prezzo Offerta</p>
                <p className="text-3xl font-bold">40&euro;</p>
                <p className="text-sm opacity-90 mt-1">Cambio pneumatici 2 volte all&apos;anno con deposito presso la nostra azienda</p>
              </div>
            </CardContent>
          </Card>

          {/* Kit Invernale */}
          <Card className={`border-border/50 hover:shadow-lg hover:shadow-brand/5 transition-all duration-500 ${isVisible ? "animate-fade-in-up delay-500" : "opacity-0"}`}>
            <CardContent className="p-6 md:p-8">
              <div className="w-14 h-14 rounded-2xl bg-brand-light/60 flex items-center justify-center mb-5">
                <Snowflake className="w-7 h-7 text-brand" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Kit Invernale</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                L&apos;inverno è alle porte e noi lo scongeliamo! Kit completo per affrontare il freddo con la tua auto.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  { icon: SprayCan, label: "Scongelante parabrezza" },
                  { icon: ThermometerSnowflake, label: "Liquido deghiacciante serrature" },
                  { icon: Package, label: "Panno antiappannamento" },
                  { icon: Snowflake, label: "Raschetto per vetri" },
                  { icon: ThermometerSnowflake, label: "Liquido antigelo artico -70°" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-brand flex-shrink-0" />
                    <span className="text-sm text-foreground">{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-gradient-to-r from-brand to-brand-dark p-5 text-white">
                <p className="text-xs uppercase tracking-wider opacity-80 mb-1">Solo</p>
                <p className="text-3xl font-bold">15&euro;</p>
                <p className="text-sm opacity-90 mt-1">Kit invernale completo per la tua auto</p>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                Solo il meglio per la tua auto. Per la pulizia ed igiene della tua vettura saremo a consigliarti i migliori prodotti da noi utilizzati a prezzi molto interessanti.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   LA VOSTRA OPINIONE — recensioni
   ═══════════════════════════════════════════════════════ */
const reviews = [
  { name: "Marco B.", text: "Personale gentile e professionale. Ho comprato la mia prima auto qui e sono molto soddisfatto. Veicolo come descritto, prezzi onesti.", rating: 5 },
  { name: "Laura T.", text: "Officina eccellente! Intervento rapido e preciso sulla mia auto. Consigliatissimi per chi cerca serietà in Valtellina.", rating: 5 },
  { name: "Giuseppe R.", text: "Valutazione a domicilio comodissima. Mi hanno fatto un&apos;offerta giusta e il passaggio di proprietà è stato gestito tutto da loro.", rating: 4 },
  { name: "Anna M.", text: "Gomme e servizio gommista impeccabile. Prezzi migliori rispetto alla concorrenza e deposito gomme a soli 40 euro all&apos;anno.", rating: 5 },
];

function OpinioniSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="opinioni" className="py-20 md:py-28 bg-secondary/50">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">La Vostra Opinione</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Grazie per Averci Scelto<span className="text-brand">.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">Lascia anche tu la tua opinione! La tua esperienza è importante per noi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <Card key={r.name} className={`border-border/50 hover:shadow-md transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: `${i * 120}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`w-4 h-4 ${j < r.rating ? "text-warm fill-warm" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand">{r.name.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{r.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild variant="outline" className="rounded-xl border-border hover:bg-brand/5">
            <a href="https://www.facebook.com/emilcarardenno/reviews" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-4 h-4 mr-2" />Lascia una recensione su Facebook
            </a>
          </Button>
          <Button asChild variant="outline" className="rounded-xl border-border hover:bg-brand/5">
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
   CONTATTI & DOVE SIAMO — orari, PEC, indicazioni
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  const { ref, isVisible } = useInView();
  return (
    <section id="contatti" className="py-20 md:py-28 bg-background">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 bg-brand-light/50 text-brand-dark border-brand/10">Contatti & Dove Siamo</Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Vieni a <span className="text-brand">Trovarci</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">Scopri come raggiungere la nostra sede operativa. Consulta la mappa per visualizzare direttamente il percorso interattivo.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info cards */}
          <div className={`lg:col-span-2 space-y-5 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <Card className="border-border/50 bg-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-brand" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Indirizzo</h3>
                  <p className="text-muted-foreground text-sm">Via Empio, 30<br />23011 Ardenno (SO)<br />Valchiavenna, Valtellina</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-brand" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Telefono</h3>
                  <a href="tel:+393358299511" className="text-muted-foreground hover:text-brand text-sm transition-colors block">+39 335 829 9511</a>
                  <a href="tel:+390342670937" className="text-muted-foreground hover:text-brand text-sm transition-colors block">0342 670937</a>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-brand" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email & PEC</h3>
                  <a href="mailto:info@emilcarsrl.com" className="text-muted-foreground hover:text-brand text-sm transition-colors block">info@emilcarsrl.com</a>
                  <p className="text-muted-foreground text-sm">PEC: emilcar.srl@pec.it</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-light/60 flex items-center justify-center flex-shrink-0"><Clock className="w-5 h-5 text-brand" /></div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Orari d&apos;Apertura</h3>
                  <div className="text-muted-foreground text-sm space-y-1">
                    <div className="flex justify-between gap-4"><span>Lun - Ven</span><span className="font-medium text-foreground">08:00-12:00 / 14:00-19:00</span></div>
                    <div className="flex justify-between gap-4"><span>Sabato</span><span className="font-medium text-foreground">08:00-12:00</span></div>
                    <div className="flex justify-between gap-4"><span>Domenica</span><span className="font-medium text-foreground">Chiuso</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* Social */}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.facebook.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300" aria-label="Facebook"><Facebook className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.emilcarsrl.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-xl bg-card border border-border/50 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white text-muted-foreground transition-all duration-300" aria-label="Sito Web"><ExternalLink className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Form + Directions */}
          <div className={`lg:col-span-3 space-y-6 ${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <Card className="border-border/50 bg-card shadow-lg shadow-brand/5">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Inviaci un Messaggio</h3>
                <p className="text-muted-foreground text-sm mb-6">Compila il modulo e ti risponderemo il prima possibile.</p>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Nome</label><Input placeholder="Il tuo nome" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Cognome</label><Input placeholder="Il tuo cognome" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20" /></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Email</label><Input type="email" placeholder="la-tua@email.it" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20" /></div>
                    <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Telefono</label><Input type="tel" placeholder="+39 xxx xxx xxxx" className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20" /></div>
                  </div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Oggetto</label><Input placeholder="Es: Informazioni veicolo, prenotazione officina..." className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20" /></div>
                  <div className="space-y-1.5"><label className="text-sm font-medium text-foreground">Messaggio</label><Textarea placeholder="Scrivi il tuo messaggio..." rows={4} className="rounded-xl border-border/70 focus:border-brand focus:ring-brand/20 resize-none" /></div>
                  <Button type="submit" className="w-full bg-brand hover:bg-brand-dark text-white rounded-xl py-5 text-base font-semibold shadow-lg shadow-brand/20">
                    Invia Messaggio<Mail className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Indicazioni stradali dal sito originale */}
            <Card className="border-border/50 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-light/60 flex items-center justify-center"><Route className="w-5 h-5 text-brand" /></div>
                  <h3 className="text-lg font-semibold text-foreground">Come Raggiungerci</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-brand">M</span></div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Arrivando da Milano</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">Superstrada 36 direzione Lecco, proseguire in direzione Sondrio. Sul rettilineo di Ardenno all&apos;altezza del km 25, svoltare a sinistra dopo il distributore Agip in Via Empio.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-brand">S</span></div>
                    <div>
                      <p className="font-medium text-foreground text-sm">Arrivando da Sondrio</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">All&apos;altezza del cartello ARDENNO, svoltare a destra al primo incrocio in Via Empio.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mappa */}
        <div className="mt-10 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
          <iframe title="Mappa EmilCar Ardenno" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.8!2d9.5189!3d46.1855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sVia+Empio+30%2C+23011+Ardenno+SO!5e0!3m2!1sit!2sit!4v1" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full" />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   FOOTER — completo con tutti i link
   ═══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-foreground text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-lg">E</div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">EmilCar</span>
                <span className="text-[10px] tracking-widest uppercase text-white/50">Ardenno — Valtellina</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-3">Concessionario veicoli d&apos;occasione e officina multiservice. Qualità, serietà e passione al tuo servizio da oltre 30 anni.</p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://www.facebook.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand transition-colors" aria-label="Facebook"><Facebook className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/emilcarardenno" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-brand transition-colors" aria-label="Instagram"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Le Nostre Vetture</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>AutoScout 24</li>
              <li>Neopatentati</li>
              <li>Super Car</li>
              <li>Fuoristrada & 4x4</li>
              <li>Autocarri</li>
              <li>Super Economiche</li>
              <li>Storiche</li>
              <li>Veicoli Speciali</li>
              <li><a href="https://autosupermarket.it/concessionari/lombardia/sondrio/emilcar-s-r-l" target="_blank" rel="noopener noreferrer" className="hover:text-brand transition-colors inline-flex items-center gap-1">Autosupermarket<ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Servizi</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Officina Meccanica</li>
              <li>Gommista</li>
              <li>Diagnosi Computerizzata</li>
              <li>Cambi Automatici</li>
              <li>Ganci Traino</li>
              <li>Garanzia Auto Moove</li>
              <li>Valutazione a Domicilio</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Offerte Post Vendita</h4>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>Pneumatici & Gomme</li>
              <li>Albergo degli Pneumatici</li>
              <li>Cambio Gomme Invernali</li>
              <li>Kit Invernale Completo</li>
              <li>Prodotti per Igiene Auto</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contatti</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand" /><span>Via Empio, 30<br />23011 Ardenno (SO)</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0 text-brand" /><a href="tel:+393358299511" className="hover:text-brand transition-colors">+39 335 829 9511</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0 text-brand" /><a href="mailto:info@emilcarsrl.com" className="hover:text-brand transition-colors">info@emilcarsrl.com</a></li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0 text-brand" /><span>PEC: emilcar.srl@pec.it</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} EmilCar S.r.l. — P.Iva 08945610965 — Tutti i diritti riservati.</p>
          <div className="flex items-center gap-4">
            <a href="https://www.emilcarsrl.com/j/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Privacy</a>
            <span>·</span>
            <a href="https://www.emilcarsrl.com/about/" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Informazioni Legali</a>
            <span>·</span>
            <a href="https://www.emilcarsrl.com/j/withdrawal" target="_blank" rel="noopener noreferrer" className="hover:text-white/60 transition-colors">Recedere dal Contratto</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════
   WHATSAPP BUTTON
   ═══════════════════════════════════════════════════════ */
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 2000); return () => clearTimeout(t); }, []);
  if (!visible) return null;
  return (
    <a href="https://wa.me/393358299511?text=Ciao! Vorrei informazioni sui vostri veicoli." target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110 animate-fade-in" aria-label="Contattaci su WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
    </a>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN PAGE
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