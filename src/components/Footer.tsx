import { Linkedin, Twitter, Facebook, Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/primelink-logo.png";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="PrimeLink Logo" className="h-9 w-9" />
              <span className="text-lg font-bold text-foreground">PrimeLink</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.cloudSolutions')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.cybersecurity')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.infrastructure')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.aiAutomation')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.about')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.careers')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.blog')}</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">{t('footer.follow')}</h4>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Facebook, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 border border-border flex items-center justify-center transition-all hover:border-primary/30">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 PrimeLink d.o.o. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
