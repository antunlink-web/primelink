import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import QuoteForm from "./QuoteForm";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-28 bg-card relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('contact.description')}
          </p>
        </div>

        <div className="mb-16">
          <QuoteForm />
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{t('contact.email')}</h3>
            <a href="mailto:primelink@primelink.hr" className="text-sm text-muted-foreground hover:text-primary transition-colors">primelink@primelink.hr</a>
          </div>
          <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{t('contact.call')}</h3>
            <a href="tel:+385915122888" className="text-sm text-muted-foreground hover:text-primary transition-colors">+385 91 512 2888</a>
          </div>
          <div className="text-center p-6 rounded-xl bg-background border border-border hover:border-primary/30 transition-all">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground mb-1">{t('contact.visit')}</h3>
            <p className="text-sm text-muted-foreground">Zagreb, Hrvatska</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
