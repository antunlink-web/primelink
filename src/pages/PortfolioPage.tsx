import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import trazilicaImg from "@/assets/projects/trazilica.png";
import poslovniregistarImg from "@/assets/projects/poslovniregistar.png";
import careflowImg from "@/assets/projects/careflow.png";
import flowcallImg from "@/assets/projects/flowcall.png";
import lajtImg from "@/assets/projects/lajt.png";
import flowsmsImg from "@/assets/projects/flowsms.png";
import textroImg from "@/assets/projects/textro.png";

type FilterCategory = "all" | "saas" | "automation" | "web" | "integrations";

const projectsData = [
  {
    id: "trazilica",
    name: "Tražilica.hr",
    url: "https://trazilica.hr",
    descKey: "portfolio.trazilica.description",
    industryKey: "portfolio.trazilica.industry",
    tags: ["React", "Node.js", "PostgreSQL", "ElasticSearch"],
    image: trazilicaImg,
    category: ["web", "saas"] as FilterCategory[],
  },
  {
    id: "poslovniregistar",
    name: "PoslovniRegistar.hr",
    url: "https://poslovniregistar.hr",
    descKey: "portfolio.poslovniregistar.description",
    industryKey: "portfolio.poslovniregistar.industry",
    tags: ["React", "Python", "PostgreSQL", "REST API"],
    image: poslovniregistarImg,
    category: ["saas", "web"] as FilterCategory[],
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
];

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
    ? projectsData
    : projectsData.filter((p) => p.category.includes(activeFilter));

  const handleNavClick = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
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

          <p className="text-base text-muted-foreground/70 max-w-xl leading-relaxed">
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
                    alt={project.name}
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
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
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
            {projectsData.map((project) => (
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
