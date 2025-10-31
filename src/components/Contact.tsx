import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)]"></div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 glow-text">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('contact.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:shadow-[var(--shadow-glow)] hover:glow-border transition-all hover:-translate-y-1 animate-scale-in">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:shadow-[var(--shadow-glow)] transition-all">
              <Mail className="h-6 w-6 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.email')}</h3>
            <p className="text-muted-foreground">contact@primelink.com</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:shadow-[var(--shadow-glow)] hover:glow-border transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "100ms" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.call')}</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>

          <div className="text-center p-6 rounded-lg bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] hover:shadow-[var(--shadow-glow)] hover:glow-border transition-all hover:-translate-y-1 animate-scale-in" style={{ animationDelay: "200ms" }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{t('contact.visit')}</h3>
            <p className="text-muted-foreground">123 Tech Street, San Francisco</p>
          </div>
        </div>

        <div className="text-center animate-fade-in-up">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white text-lg px-8 py-6 shadow-[var(--shadow-glow-strong)] hover:shadow-[var(--shadow-xl)] transition-all hover:scale-105 glow-border animate-pulse-glow"
          >
            {t('contact.schedule')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
