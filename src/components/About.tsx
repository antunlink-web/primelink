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
    <section id="about" className="py-24 bg-gradient-to-b from-secondary/50 via-background to-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(var(--accent)/0.15)_0%,transparent_50%)]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px] animate-pulse-glow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 glow-text">
              {t('about.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('about.description')}
            </p>
            
            <div className="space-y-4 mb-8">
              {benefitKeys.map((key, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.8)] transition-all" />
                  <span className="text-foreground group-hover:text-primary transition-colors">{t(key)}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-glow)] transition-all hover:scale-105 glow-border"
            >
              {t('about.learnMore')}
            </Button>
          </div>

          <div className="relative animate-scale-in group">
            {/* Glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse-glow"></div>
            
            {/* Image container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-[var(--glass-border)] shadow-[var(--shadow-xl)] group-hover:shadow-[var(--shadow-glow-strong)] transition-all">
              <img 
                src={workspaceImg} 
                alt="Modern IT workspace" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 group-hover:opacity-0 transition-opacity"></div>
              
              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-[var(--glass-bg)] backdrop-blur-xl border-t border-[var(--glass-border)] p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent glow-text">
                      15+
                    </div>
                    <div className="text-sm text-muted-foreground">{t('about.years')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent glow-text">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground">{t('about.clients')}</div>
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
