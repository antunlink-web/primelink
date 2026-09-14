import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import careflowImg from "@/assets/projects/careflow-portfolio.webp";
import trazilicaImg from "@/assets/projects/trazilica-portfolio.webp";
import flowcallImg from "@/assets/projects/flowcall-portfolio.webp";
import lajtImg from "@/assets/projects/lajt-portfolio.webp";
import flowsmsImg from "@/assets/projects/flowsms-portfolio.webp";
import textroImg from "@/assets/projects/textro-portfolio.webp";
import mojakartaImg from "@/assets/projects/mojakarta-portfolio.webp";
import perksImg from "@/assets/projects/perks-portfolio.webp";
import lumibabyImg from "@/assets/projects/lumibaby-portfolio.webp";
import aurumgradnjaImg from "@/assets/projects/aurumgradnja-portfolio.webp";
import tijelokaodioprirodeImg from "@/assets/projects/tijelokaodioprirode-portfolio.webp";
import evaciglarImg from "@/assets/projects/evaciglar-portfolio.webp";
import airwoltImg from "@/assets/projects/airwolt-portfolio.webp";
import infinityservicesImg from "@/assets/projects/infinityservices-portfolio.webp";
import konzaltingprimelinkImg from "@/assets/projects/konzaltingprimelink-portfolio.webp";
import prikaImg from "@/assets/projects/prika-portfolio.webp";
import protekstImg from "@/assets/projects/protekst-portfolio.webp";
import udrugalumenImg from "@/assets/projects/udrugalumen-portfolio.webp";
import voltappImg from "@/assets/projects/voltapp-portfolio.webp";
import yogawithnikaImg from "@/assets/projects/yogawithnika-portfolio.webp";
import dadathlonImg from "@/assets/projects/dadathlon-portfolio.webp";
import daddyhoodImg from "@/assets/projects/daddyhood-portfolio.webp";
import donaticeImg from "@/assets/projects/donatice-portfolio.webp";
import controlmasterImg from "@/assets/projects/controlmaster-portfolio.webp";
import arksImg from "@/assets/projects/arks-portfolio.webp";
import euroratanImg from "@/assets/projects/euroratan-portfolio.webp";
import xiiiGimnazijaImg from "@/assets/projects/xiii-gimnazija-portfolio.webp";
import chairsImg from "@/assets/projects/chairs-portfolio.webp";
import hpcspgImg from "@/assets/projects/hpcspg-portfolio.webp";
import pingvinsportImg from "@/assets/projects/pingvinsport-portfolio.webp";

type FilterCategory = "all" | "saas" | "automation" | "web" | "integrations";

type Project = {
  id: string;
  name: string;
  url: string;
  descKey: string;
  industryKey: string;
  tags: string[];
  image: string;
  category: FilterCategory[];
  /** Pinned projects always sort first. */
  pinned?: boolean;
  /** ISO date (YYYY-MM-DD) of completion/publication. Undefined = date unknown, needs review. */
  completedAt?: string;
  /** Manual tie-breaker only; lower shows first. */
  sortOrder?: number;
};

const projectsData: Project[] = [
  {
    id: "trazilica",
    name: "Trazilica.hr",
    url: "https://trazilica.hr",
    descKey: "portfolio.trazilica.description",
    industryKey: "portfolio.trazilica.industry",
    tags: ["React", "Node.js", "PostgreSQL", "ElasticSearch"],
    image: trazilicaImg,
    category: ["saas", "web"] as FilterCategory[],
    pinned: true,
  },

  {
    id: "chairs",
    name: "chairs.hr",
    url: "https://chairs.hr/",
    descKey: "portfolio.chairs.description",
    industryKey: "portfolio.chairs.industry",
    tags: ["Web stranica", "Web katalog", "B2B", "Višejezično"],
    image: chairsImg,
    category: ["web"] as FilterCategory[],
    completedAt: "2026-09-01",
  },
  {
    id: "hpcspg",
    name: "HPC-SPG",
    url: "https://hpc-spg.hr/",
    descKey: "portfolio.hpcspg.description",
    industryKey: "portfolio.hpcspg.industry",
    tags: ["Web stranica", "Redizajn", "CMS", "B2B"],
    image: hpcspgImg,
    category: ["web"] as FilterCategory[],
    completedAt: "2026-09-01",
  },
  {
    id: "pingvinsport",
    name: "Pingvin Sport & Ski",
    url: "https://pingvinsport.com/",
    descKey: "portfolio.pingvinsport.description",
    industryKey: "portfolio.pingvinsport.industry",
    tags: ["Web stranica", "Online prijave", "Sport"],
    image: pingvinsportImg,
    category: ["web"] as FilterCategory[],
  },


  {
    id: "careflow",
    name: "CareFlow.hr",
    url: "https://careflow.hr",
    descKey: "portfolio.careflow.description",
    industryKey: "portfolio.careflow.industry",
    tags: ["React", "Supabase", "Tailwind", "TypeScript"],
    image: careflowImg,
    category: ["saas", "automation"] as FilterCategory[],
  },
  {
    id: "flowcall",
    name: "FlowCall.eu",
    url: "https://flowcall.eu",
    descKey: "portfolio.flowcall.description",
    industryKey: "portfolio.flowcall.industry",
    tags: ["React", "WebRTC", "Node.js", "PostgreSQL"],
    image: flowcallImg,
    category: ["saas", "integrations"] as FilterCategory[],
  },
  {
    id: "lajt",
    name: "Lajt.hr",
    url: "https://lajt.hr",
    descKey: "portfolio.lajt.description",
    industryKey: "portfolio.lajt.industry",
    tags: ["React", "i18n", "Tailwind", "Vite"],
    image: lajtImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "flowsms",
    name: "FlowSMS.eu",
    url: "https://flowsms.eu",
    descKey: "portfolio.flowsms.description",
    industryKey: "portfolio.flowsms.industry",
    tags: ["React", "Android SDK", "Node.js", "PostgreSQL"],
    image: flowsmsImg,
    category: ["saas", "integrations"] as FilterCategory[],
  },
  {
    id: "textro",
    name: "Textro.eu",
    url: "https://textro.eu",
    descKey: "portfolio.textro.description",
    industryKey: "portfolio.textro.industry",
    tags: ["React", "REST API", "Supabase", "Webhooks"],
    image: textroImg,
    category: ["saas", "integrations"] as FilterCategory[],
  },
  {
    id: "mojakarta",
    name: "Mojakarta.hr",
    url: "https://mojakarta.hr",
    descKey: "portfolio.mojakarta.description",
    industryKey: "portfolio.mojakarta.industry",
    tags: ["React", "Stripe", "Supabase", "QR"],
    image: mojakartaImg,
    category: ["saas", "web"] as FilterCategory[],
  },
  {
    id: "perks",
    name: "Perks.hr",
    url: "https://perks.hr",
    descKey: "portfolio.perks.description",
    industryKey: "portfolio.perks.industry",
    tags: ["React", "Node.js", "PostgreSQL", "i18n"],
    image: perksImg,
    category: ["saas", "web"] as FilterCategory[],
  },
  {
    id: "lumibaby",
    name: "Lumibaby.hr",
    url: "https://lumibaby.hr",
    descKey: "portfolio.lumibaby.description",
    industryKey: "portfolio.lumibaby.industry",
    tags: ["E-commerce", "Webshop", "Stripe", "React"],
    image: lumibabyImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "aurumgradnja",
    name: "Aurumgradnja.com",
    url: "https://aurumgradnja.com",
    descKey: "portfolio.aurumgradnja.description",
    industryKey: "portfolio.aurumgradnja.industry",
    tags: ["Web", "Branding", "React", "SEO"],
    image: aurumgradnjaImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "tijelokaodioprirode",
    name: "Tijelokaodioprirode.eu",
    url: "https://tijelokaodioprirode.eu",
    descKey: "portfolio.tijelokaodioprirode.description",
    industryKey: "portfolio.tijelokaodioprirode.industry",
    tags: ["Web", "Landing", "React", "Forms"],
    image: tijelokaodioprirodeImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "evaciglar",
    name: "Evaciglar.eu",
    url: "https://evaciglar.eu",
    descKey: "portfolio.evaciglar.description",
    industryKey: "portfolio.evaciglar.industry",
    tags: ["Web", "i18n", "React", "SEO"],
    image: evaciglarImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "airwolt",
    name: "Airwolthvacelectric.hr",
    url: "https://airwolthvacelectric.hr",
    descKey: "portfolio.airwolt.description",
    industryKey: "portfolio.airwolt.industry",
    tags: ["Web", "Branding", "React", "SEO"],
    image: airwoltImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "infinityservices",
    name: "Infinityservices.hr",
    url: "https://infinityservices.hr",
    descKey: "portfolio.infinityservices.description",
    industryKey: "portfolio.infinityservices.industry",
    tags: ["Web", "Forms", "React", "SEO"],
    image: infinityservicesImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "konzaltingprimelink",
    name: "Konzalting.primelink.hr",
    url: "https://konzalting.primelink.hr",
    descKey: "portfolio.konzaltingprimelink.description",
    industryKey: "portfolio.konzaltingprimelink.industry",
    tags: ["Web", "i18n", "React", "Landing"],
    image: konzaltingprimelinkImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "prika",
    name: "Prika.hr",
    url: "https://prika.hr",
    descKey: "portfolio.prika.description",
    industryKey: "portfolio.prika.industry",
    tags: ["Web", "Branding", "React", "SEO"],
    image: prikaImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "protekst",
    name: "Protekst.eu",
    url: "https://protekst.eu",
    descKey: "portfolio.protekst.description",
    industryKey: "portfolio.protekst.industry",
    tags: ["Web", "B2B", "React", "Catalog"],
    image: protekstImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "udrugalumen",
    name: "Udrugalumen.hr",
    url: "https://udrugalumen.hr",
    descKey: "portfolio.udrugalumen.description",
    industryKey: "portfolio.udrugalumen.industry",
    tags: ["Web", "Edukacija", "React", "Forms"],
    image: udrugalumenImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "voltapp",
    name: "Voltapp.hr",
    url: "https://voltapp.hr",
    descKey: "portfolio.voltapp.description",
    industryKey: "portfolio.voltapp.industry",
    tags: ["Web", "SaaS", "React", "Landing"],
    image: voltappImg,
    category: ["saas", "web"] as FilterCategory[],
  },
  {
    id: "yogawithnika",
    name: "Yogawithnika.eu",
    url: "https://yogawithnika.eu",
    descKey: "portfolio.yogawithnika.description",
    industryKey: "portfolio.yogawithnika.industry",
    tags: ["Web", "Booking", "React", "SEO"],
    image: yogawithnikaImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "dadathlon",
    name: "Dadathlon.eu",
    url: "https://dadathlon.eu",
    descKey: "portfolio.dadathlon.description",
    industryKey: "portfolio.dadathlon.industry",
    tags: ["Web", "Event", "React", "Forms"],
    image: dadathlonImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "daddyhood",
    name: "Daddyhood.eu",
    url: "https://daddyhood.eu",
    descKey: "portfolio.daddyhood.description",
    industryKey: "portfolio.daddyhood.industry",
    tags: ["Web", "Blog", "React", "Newsletter"],
    image: daddyhoodImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "donatice",
    name: "Donatice.eu",
    url: "https://donatice.eu",
    descKey: "portfolio.donatice.description",
    industryKey: "portfolio.donatice.industry",
    tags: ["Web", "Ugostiteljstvo", "React", "SEO"],
    image: donaticeImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "controlmaster",
    name: "Controlmaster.hr",
    url: "https://controlmaster.hr",
    descKey: "portfolio.controlmaster.description",
    industryKey: "portfolio.controlmaster.industry",
    tags: ["Web", "B2B", "React", "SEO"],
    image: controlmasterImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "arks",
    name: "ARKS.hr",
    url: "https://arks.hr/",
    descKey: "portfolio.arks.description",
    industryKey: "portfolio.arks.industry",
    tags: ["Web", "Redizajn", "React", "SEO"],
    image: arksImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "euroratan",
    name: "Euroratan.com",
    url: "https://euroratan.com/",
    descKey: "portfolio.euroratan.description",
    industryKey: "portfolio.euroratan.industry",
    tags: ["Web", "Katalog", "React", "SEO"],
    image: euroratanImg,
    category: ["web"] as FilterCategory[],
  },
  {
    id: "xiiigimnazija",
    name: "XIII. gimnazija",
    url: "https://xiiigimnazija.hr/",
    descKey: "portfolio.xiiigimnazija.description",
    industryKey: "portfolio.xiiigimnazija.industry",
    tags: ["Web", "CMS", "React", "Pristupačnost"],
    image: xiiiGimnazijaImg,
    category: ["web"] as FilterCategory[],
  },
];

/**
 * Order: pinned first, then completedAt descending (unknown dates last,
 * preserving their declaration order), then sortOrder / declaration order.
 */
const sortedProjects = projectsData
  .map((p, index) => ({ ...p, sortOrder: p.sortOrder ?? index }))
  .sort((a, b) => {
    if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
    if (a.completedAt && b.completedAt && a.completedAt !== b.completedAt) {
      return a.completedAt < b.completedAt ? 1 : -1;
    }
    if (!!a.completedAt !== !!b.completedAt) return a.completedAt ? -1 : 1;
    return a.sortOrder - b.sortOrder;
  });

const filters: { key: FilterCategory; labelKey: string }[] = [
  { key: "all", labelKey: "portfolio.filterAll" },
  { key: "saas", labelKey: "portfolio.filterSaas" },
  { key: "automation", labelKey: "portfolio.filterAutomation" },
  { key: "web", labelKey: "portfolio.filterWeb" },
  { key: "integrations", labelKey: "portfolio.filterIntegrations" },
];

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const filtered = activeFilter === "all"
    ? sortedProjects
    : sortedProjects.filter((p) => p.category.includes(activeFilter));


  const handleNavClick = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Portfolio — Naši projekti i klijenti | PrimeLink</title>
        <meta name="description" content="Pregledajte odabrane projekte koje smo razvili — web stranice, web shopovi, SaaS i automatizacije za hrvatske i strane klijente." />
        <link rel="canonical" href="https://primelink.hr/portfolio" />
        <meta property="og:title" content="Portfolio — Naši projekti | PrimeLink" />
        <meta property="og:description" content="Odabrani projekti — web stranice, web shopovi, SaaS i automatizacije." />
        <meta property="og:url" content="https://primelink.hr/portfolio" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "PrimeLink Portfolio",
          url: "https://primelink.hr/portfolio",
          hasPart: sortedProjects.map((p) => ({
            "@type": "CreativeWork",
            name: p.name,
            url: p.url
          }))
        })}</script>
      </Helmet>
      <Header />

      {/* HERO */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-20" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-[60px] bg-primary/50" />
            <span className="text-sm font-medium tracking-widest uppercase text-primary">
              {t('portfolio.badge')}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-[1.1] mb-6">
            {t('portfolio.heroTitle')}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-4">
            {t('portfolio.heroSubtitle')}
          </p>

          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            {t('portfolio.heroIntro')}
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === f.key
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-glow)]"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-border"
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[var(--shadow-hover)] hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Screenshot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
                  <img
                    src={project.image}
                    alt={`Naslovna stranica web stranice ${project.name} — ${t(project.industryKey)} projekt`}
                    loading="lazy"
                    decoding="async"
                    width={1440}
                    height={900}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="h-3.5 w-3.5 text-foreground" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">
                    {t(project.industryKey)}
                  </p>
                  <h2 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {t(project.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TRUST */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-10">
            {t('portfolio.trustTitle')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {sortedProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 rounded-lg bg-secondary/50 border border-border/30 flex items-center justify-center px-4 opacity-60 hover:opacity-100 hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                  {project.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-15" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
            {t('portfolio.ctaTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
            {t('portfolio.ctaDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-base px-8 shadow-[var(--shadow-glow)]"
              onClick={() => handleNavClick('contact')}
            >
              {t('portfolio.ctaStart')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-border hover:bg-secondary"
              onClick={() => handleNavClick('contact')}
            >
              {t('portfolio.ctaConsult')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
