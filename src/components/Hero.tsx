import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Shield, Cloud, Headphones } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[var(--gradient-dark)]"></div>
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[150px]"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-secondary/50 text-muted-foreground text-sm mb-8">
            <Shield className="h-4 w-4 text-primary" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
            {t('hero.title')}
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t('hero.titleHighlight')}
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 shadow-[var(--shadow-glow)] hover:shadow-[var(--shadow-glow-strong)] transition-all hover:scale-[1.02]"
            >
              <CalendarCheck className="mr-2 h-5 w-5" />
              {t('hero.scheduleConsultation')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-border bg-secondary/30 text-foreground hover:bg-secondary/60 text-base px-8 py-6 transition-all"
            >
              {t('hero.viewSolutions')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Value props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border">
              <Cloud className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">{t('hero.cloudInfrastructure')}</span>
              <span className="text-xs text-muted-foreground text-center">{t('hero.cloudBenefit')}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">{t('hero.enterpriseSecurity')}</span>
              <span className="text-xs text-muted-foreground text-center">{t('hero.securityBenefit')}</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-secondary/30 border border-border">
              <Headphones className="h-6 w-6 text-primary" />
              <span className="text-sm font-medium text-foreground">{t('hero.support247')}</span>
              <span className="text-xs text-muted-foreground text-center">{t('hero.supportBenefit')}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
