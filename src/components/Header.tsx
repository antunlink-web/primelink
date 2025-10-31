import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/primelink-logo.png";

const Header = () => {
  const { t } = useTranslation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--glass-bg)] backdrop-blur-xl border-b border-[var(--glass-border)] shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="PrimeLink Logo" 
            className="h-10 w-10 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
          />
          <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">PrimeLink</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-foreground hover:text-primary transition-colors">
            {t('nav.services')}
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            {t('nav.about')}
          </a>
          <a href="#solutions" className="text-foreground hover:text-primary transition-colors">
            {t('nav.solutions')}
          </a>
          <a href="#contact" className="text-foreground hover:text-primary transition-colors">
            {t('nav.contact')}
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher />
          <Button className="hidden md:inline-flex">{t('hero.getStarted')}</Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
