import { Linkedin, Instagram, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "@/assets/primelink-logo.png";

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname !== "/") navigate("/");
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center space-x-3 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img src={logo} alt="PrimeLink Logo" className="h-9 w-auto object-contain" />
              <span className="text-lg font-bold text-foreground">PrimeLink</span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">{t('footer.services')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="/#services" onClick={(e) => { e.preventDefault(); goToSection('services'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.cloudSolutions')}</a></li>
              <li><a href="/#services" onClick={(e) => { e.preventDefault(); goToSection('services'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.cybersecurity')}</a></li>
              <li><a href="/#services" onClick={(e) => { e.preventDefault(); goToSection('services'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.infrastructure')}</a></li>
              <li><a href="/#services" onClick={(e) => { e.preventDefault(); goToSection('services'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.aiAutomation')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">{t('footer.company')}</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="/#about" onClick={(e) => { e.preventDefault(); goToSection('about'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.about')}</a></li>
              <li><a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.portfolio')}</a></li>
              <li><a href="/ponuda" onClick={(e) => { e.preventDefault(); navigate('/ponuda'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.offer')}</a></li>
              <li><a href="/#contact" onClick={(e) => { e.preventDefault(); goToSection('contact'); }} className="hover:text-foreground transition-colors cursor-pointer">{t('footer.contact')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">{t('footer.follow')}</h4>
            <div className="flex gap-3 mb-5">
              <a href="https://www.linkedin.com/company/primelink-hr" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 border border-border flex items-center justify-center transition-all hover:border-primary/30">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
              </a>
              <a href="https://www.facebook.com/primelinkdoo" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 border border-border flex items-center justify-center transition-all hover:border-primary/30">
                <Facebook className="h-4 w-4 text-muted-foreground" />
              </a>
              <a href="https://www.instagram.com/primelink.hr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-secondary hover:bg-primary/10 border border-border flex items-center justify-center transition-all hover:border-primary/30">
                <Instagram className="h-4 w-4 text-muted-foreground" />
              </a>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:primelink@primelink.hr" className="block hover:text-foreground transition-colors">primelink@primelink.hr</a>
              <a href="tel:+385915122888" className="block hover:text-foreground transition-colors">+385 91 512 2888</a>
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
