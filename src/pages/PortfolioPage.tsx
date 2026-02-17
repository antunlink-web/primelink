import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import trazilicaImg from "@/assets/projects/trazilica.png";
import poslovniregistarImg from "@/assets/projects/poslovniregistar.png";
import careflowImg from "@/assets/projects/careflow.png";
import flowcallImg from "@/assets/projects/flowcall.png";

const projectsData = [
  {
    name: "Tražilica.hr",
    url: "https://trazilica.hr",
    descKey: "portfolio.trazilica.description",
    tags: ["Marketplace", "Search Platform", "Reviews"],
    image: trazilicaImg,
  },
  {
    name: "PoslovniRegistar.hr",
    url: "https://poslovniregistar.hr",
    descKey: "portfolio.poslovniregistar.description",
    tags: ["Business Data", "Search Engine", "SaaS"],
    image: poslovniregistarImg,
  },
  {
    name: "CareFlow.hr",
    url: "https://careflow.hr",
    descKey: "portfolio.careflow.description",
    tags: ["Healthcare", "SaaS", "Workflow"],
    image: careflowImg,
  },
  {
    name: "FlowCall.eu",
    url: "https://flowcall.eu",
    descKey: "portfolio.flowcall.description",
    tags: ["CRM", "SaaS", "Sales"],
    image: flowcallImg,
  },
];

const PortfolioPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t } = useTranslation();

  const goTo = useCallback((index: number) => {
    setCurrentIndex((index + projectsData.length) % projectsData.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      goTo(currentIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, paused, goTo]);

  const project = projectsData[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1.5 text-sm">
            {t('portfolio.badge')}
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {t('portfolio.title')} <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('portfolio.titleHighlight')}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </div>
      </section>

      {/* Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="overflow-hidden border-primary/20 bg-card shadow-[var(--shadow-card)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {/* Screenshot */}
            <div className="relative group">
              <div className="aspect-[16/9] max-h-[400px] overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => goTo(currentIndex - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                onClick={() => goTo(currentIndex + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>

            <CardContent className="p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{project.name}</h2>
              <p className="text-muted-foreground mb-5">{t(project.descKey)}</p>
              <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {t('portfolio.visitSite')} <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projectsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === currentIndex ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {projectsData.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setCurrentIndex(i)}
                className={`rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentIndex
                    ? "border-primary shadow-[var(--shadow-card)]"
                    : "border-border opacity-60 hover:opacity-100"
                }`}
              >
                <img src={p.image} alt={p.name} className="w-full aspect-video object-cover object-top" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
