import { Linkedin, Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, Link } from "react-router-dom";
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
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            <address className="not-italic space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>PrimeLink d.o.o.<br />Zagreb, Hrvatska</span>
              </div>
              <a href="mailto:primelink@primelink.hr" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                primelink@primelink.hr
              </a>
              <a href="tel:+385915122888" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                +385 91 512 2888
              </a>
            </address>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Usluge</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/izrada-web-stranica" className="hover:text-foreground transition-colors">Izrada web stranica</Link></li>
              <li><Link to="/redizajn-web-stranice" className="hover:text-foreground transition-colors">Redizajn web stranica</Link></li>
              <li><Link to="/izrada-web-aplikacija" className="hover:text-foreground transition-colors">Web aplikacije</Link></li>
              <li><Link to="/izrada-crm-sustava" className="hover:text-foreground transition-colors">CRM sustavi</Link></li>
              <li><Link to="/stripe-integracije" className="hover:text-foreground transition-colors">Stripe integracije</Link></li>
              <li><Link to="/saas-razvoj" className="hover:text-foreground transition-colors">SaaS razvoj</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mb-4">Rješenja</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><Link to="/izrada-crm-sustava" className="hover:text-foreground transition-colors">PrimeCRM</Link></li>
              <li><Link to="/stripe-integracije" className="hover:text-foreground transition-colors">PrimePay</Link></li>
              <li><Link to="/besplatna-seo-analiza" className="hover:text-foreground transition-colors">PrimeAudit</Link></li>
              <li><Link to="/redizajn-web-stranice" className="hover:text-foreground transition-colors">PrimeDemo</Link></li>
            </ul>

            <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground mt-8 mb-4">Korisni linkovi</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }} className="hover:text-foreground transition-colors cursor-pointer">Portfolio</a></li>
              <li><Link to="/besplatna-seo-analiza" className="hover:text-foreground transition-colors">Besplatna SEO analiza</Link></li>
              <li><a href="/ponuda/forma" onClick={(e) => { e.preventDefault(); navigate('/ponuda/forma'); }} className="hover:text-foreground transition-colors cursor-pointer">Zatražite ponudu</a></li>
              <li><a href="/#contact" onClick={(e) => { e.preventDefault(); goToSection('contact'); }} className="hover:text-foreground transition-colors cursor-pointer">Kontakt</a></li>
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
