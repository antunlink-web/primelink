import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import workspaceImg from "@/assets/workspace.jpg";

const About = () => {
  const { t } = useTranslation();
  
  const benefitKeys = [
    "about.benefit1",
    "about.benefit2",
    "about.benefit3",
    "about.benefit4",
    "about.benefit5",
    "about.benefit6",
  ];

  return (
    <section id="about" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('about.description')}
            </p>
            
            <div className="space-y-4 mb-8">
              {benefitKeys.map((key, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90 group-hover:text-foreground transition-colors">{t(key)}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] transition-all"
            >
              {t('about.learnMore')}
            </Button>
          </div>

          <div className="relative animate-scale-in group">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-xl)]">
              <img 
                src={workspaceImg} 
                alt="Modern IT workspace" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border">
                    <div className="text-2xl font-bold text-primary">15+</div>
                    <div className="text-xs text-muted-foreground">{t('about.years')}</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-card/80 backdrop-blur-sm border border-border">
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-xs text-muted-foreground">{t('about.clients')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
