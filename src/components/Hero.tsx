import { Button } from "@/components/ui/button";
import { ArrowRight, Code2, ShieldCheck, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeroMockup from "./HeroMockup";

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--gradient-dark)]" />
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]" />
      <div className="hidden md:block absolute top-1/4 -left-32 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[160px]" />
      <div className="hidden md:block absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent/8 rounded-full blur-[150px]" />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]"
      />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Left: copy */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border bg-secondary/50 text-muted-foreground text-xs sm:text-sm mb-7">
              <Code2 className="h-3.5 w-3.5 text-primary" />
              <span>{t('hero.badge')}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.05] tracking-tight">
              {t('hero.title')}
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t('hero.titleHighlight')}
              </span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
              <Button
                size="lg"
                onClick={() => navigate('/ponuda/forma')}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-7 py-6 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] transition-all hover:scale-[1.02]"
              >
                {t('hero.scheduleConsultation')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/besplatna-seo-analiza')}
                className="border border-border bg-secondary/30 text-foreground hover:bg-secondary/60 text-base px-7 py-6 transition-all"
              >
                {t('hero.viewSolutions')}
              </Button>
            </div>

            {/* Quick value bullets */}
            <ul className="flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2 text-xs sm:text-sm text-muted-foreground">
              <li className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> Fiksne ponude
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-accent" /> Brza isporuka
              </li>
              <li className="inline-flex items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-accent" /> React · Stripe · Postgres
              </li>
            </ul>
          </div>

          {/* Right: dashboard mockup */}
          <div className="hidden lg:block animate-fade-in-up [animation-delay:120ms]">
            <HeroMockup />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
