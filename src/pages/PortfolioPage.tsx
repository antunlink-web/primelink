import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import trazilicaImg from "@/assets/projects/trazilica.png";
import poslovniregistarImg from "@/assets/projects/poslovniregistar.png";
import careflowImg from "@/assets/projects/careflow.png";
import flowcallImg from "@/assets/projects/flowcall.png";

const projects = [
  {
    name: "Tražilica.hr",
    url: "https://trazilica.hr",
    description: "Platforma za pronalaženje pouzdanih majstora s preko 5.000+ registriranih stručnjaka i 50.000+ recenzija.",
    tags: ["Marketplace", "Search Platform", "Reviews"],
    image: trazilicaImg,
  },
  {
    name: "PoslovniRegistar.hr",
    url: "https://poslovniregistar.hr",
    description: "Svi podaci o hrvatskim tvrtkama na jednom mjestu — pretražujte 340.000+ subjekata iz službenih registara.",
    tags: ["Business Data", "Search Engine", "SaaS"],
    image: poslovniregistarImg,
  },
  {
    name: "CareFlow.hr",
    url: "https://careflow.hr",
    description: "Medicinski workflow management sustav za zdravstvene ustanove — digitalizacija procesa i upravljanje pacijentima.",
    tags: ["Healthcare", "SaaS", "Workflow"],
    image: careflowImg,
  },
  {
    name: "FlowCall.eu",
    url: "https://flowcall.eu",
    description: "Moderni CRM za high-volume pozive — power dialing, upravljanje leadovima i real-time analitika za prodajne timove.",
    tags: ["CRM", "SaaS", "Sales"],
    image: flowcallImg,
  },
];

const PortfolioPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index: number) => {
    setCurrentIndex((index + projects.length) % projects.length);
  };

  const project = projects[currentIndex];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1.5 text-sm">
            Portfolio
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Naši <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Projekti</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pogledajte neke od projekata koje smo razvili i koji su aktivni u produkciji.
          </p>
        </div>
      </section>

      {/* Carousel */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="overflow-hidden border-primary/20 bg-card shadow-[var(--shadow-card)]">
            {/* Screenshot */}
            <div className="relative group">
              <div className="aspect-video overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
              <p className="text-muted-foreground mb-5">{project.description}</p>
              <Button asChild variant="outline" className="border-primary/30 hover:bg-primary/10">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  Posjeti stranicu <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {projects.map((_, i) => (
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
            {projects.map((p, i) => (
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
