import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/primelink-logo.png";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCaseStudiesClick = () => {
    navigate('/case-studies');
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src={logo} 
            alt="PrimeLink Logo" 
            className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">PrimeLink</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#services" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('services');
            }}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {t('nav.services')}
          </a>
          <a 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('about');
            }}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {t('nav.about')}
          </a>
          <a 
            href="/case-studies" 
            onClick={(e) => {
              e.preventDefault();
              handleCaseStudiesClick();
            }}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {t('nav.caseStudies')}
          </a>
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {t('nav.contact')}
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <Button 
            className="hidden md:inline-flex"
            onClick={() => handleNavClick('contact')}
          >
            {t('hero.getStarted')}
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
