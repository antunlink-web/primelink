import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/primelink-logo.png";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
            if (location.pathname !== '/') navigate('/');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img src={logo} alt="PrimeLink Logo" className="h-9 w-9" />
          <span className="text-xl font-bold text-foreground">PrimeLink</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{t('nav.services')}</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{t('nav.about')}</a>
          <a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{t('nav.portfolio')}</a>
          <a href="/case-studies" onClick={(e) => { e.preventDefault(); navigate('/case-studies'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{t('nav.caseStudies')}</a>
          <a href="/ponuda" onClick={(e) => { e.preventDefault(); navigate('/ponuda'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{t('nav.offer')}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <Button size="sm" className="hidden md:inline-flex" onClick={() => handleNavClick('contact')}>{t('hero.getStarted')}</Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary">{t('nav.services')}</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary">{t('nav.about')}</a>
            <a href="/portfolio" onClick={(e) => { e.preventDefault(); handlePageNav('/portfolio'); }} className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary">{t('nav.portfolio')}</a>
            <a href="/case-studies" onClick={(e) => { e.preventDefault(); handlePageNav('/case-studies'); }} className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary">{t('nav.caseStudies')}</a>
            <a href="/ponuda" onClick={(e) => { e.preventDefault(); handlePageNav('/ponuda'); }} className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary">{t('nav.offer')}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-muted-foreground hover:text-foreground transition-colors py-3 px-2 rounded-lg hover:bg-secondary">{t('nav.contact')}</a>
            <Button className="w-full mt-3" onClick={() => handleNavClick('contact')}>{t('hero.getStarted')}</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
