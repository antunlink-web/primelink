import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/primelink-logo.png";

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [workOpen, setWorkOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (workRef.current && !workRef.current.contains(e.target as Node)) {
        setWorkOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    setMobileWorkOpen(false);
    navigate(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setMobileOpen(false);
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
          <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} className="text-foreground hover:text-primary transition-colors cursor-pointer">{t('nav.services')}</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="text-foreground hover:text-primary transition-colors cursor-pointer">{t('nav.about')}</a>
          <div className="relative" ref={workRef}>
            <button onClick={() => setWorkOpen(!workOpen)} className="flex items-center gap-1 text-foreground hover:text-primary transition-colors cursor-pointer">
              {t('nav.work')}
              <ChevronDown className={`h-4 w-4 transition-transform ${workOpen ? 'rotate-180' : ''}`} />
            </button>
            {workOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50 py-1">
                <a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); setWorkOpen(false); }} className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary transition-colors">{t('nav.portfolio')}</a>
                <a href="/case-studies" onClick={(e) => { e.preventDefault(); navigate('/case-studies'); setWorkOpen(false); }} className="block px-4 py-2.5 text-foreground hover:bg-primary/10 hover:text-primary transition-colors">{t('nav.caseStudies')}</a>
              </div>
            )}
          </div>
          <a href="/ponuda" onClick={(e) => { e.preventDefault(); navigate('/ponuda'); }} className="text-foreground hover:text-primary transition-colors cursor-pointer">{t('nav.offer')}</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-foreground hover:text-primary transition-colors cursor-pointer">{t('nav.contact')}</a>
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <Button className="hidden md:inline-flex" onClick={() => handleNavClick('contact')}>{t('hero.getStarted')}</Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick('services'); }} className="text-foreground hover:text-primary transition-colors py-2">{t('nav.services')}</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="text-foreground hover:text-primary transition-colors py-2">{t('nav.about')}</a>
            <div>
              <button onClick={() => setMobileWorkOpen(!mobileWorkOpen)} className="flex items-center gap-1 text-foreground hover:text-primary transition-colors py-2 w-full">
                {t('nav.work')}
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileWorkOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileWorkOpen && (
                <div className="pl-4 flex flex-col space-y-2 mt-1">
                  <a href="/portfolio" onClick={(e) => { e.preventDefault(); handlePageNav('/portfolio'); }} className="text-muted-foreground hover:text-primary transition-colors py-1.5">{t('nav.portfolio')}</a>
                  <a href="/case-studies" onClick={(e) => { e.preventDefault(); handlePageNav('/case-studies'); }} className="text-muted-foreground hover:text-primary transition-colors py-1.5">{t('nav.caseStudies')}</a>
                </div>
              )}
            </div>
            <a href="/ponuda" onClick={(e) => { e.preventDefault(); handlePageNav('/ponuda'); }} className="text-foreground hover:text-primary transition-colors py-2">{t('nav.offer')}</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-foreground hover:text-primary transition-colors py-2">{t('nav.contact')}</a>
            <Button className="w-full mt-2" onClick={() => handleNavClick('contact')}>{t('hero.getStarted')}</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
