import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "@/assets/primelink-logo.webp";

const usluge = [
  { label: "Izrada web stranica", to: "/izrada-web-stranica" },
  { label: "Redizajn web stranica", to: "/redizajn-web-stranice" },
  { label: "Web aplikacije", to: "/izrada-web-aplikacija" },
  { label: "CRM sustavi", to: "/izrada-crm-sustava" },
  { label: "Stripe integracije", to: "/stripe-integracije" },
  { label: "SaaS razvoj", to: "/saas-razvoj" },
  { label: "SEO optimizacija", to: "/besplatna-seo-analiza" },
];

const rjesenja = [
  { label: "PrimeCRM", desc: "CRM sustavi", to: "/izrada-crm-sustava" },
  { label: "PrimePay", desc: "Stripe & naplate", to: "/stripe-integracije" },
  { label: "PrimeAudit", desc: "SEO analiza", to: "/besplatna-seo-analiza" },
  { label: "PrimeDemo", desc: "Demo redizajni", to: "/redizajn-web-stranice" },
];

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
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
          <img src={logo} alt="PrimeLink Logo" width="36" height="36" decoding="async" fetchPriority="high" className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold text-foreground">PrimeLink</span>
        </a>

        <nav className="hidden lg:flex items-center space-x-7">
          {/* Usluge dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Usluge <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="w-64 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-[var(--shadow-xl)] p-2">
                {usluge.map((s) => (
                  <a
                    key={s.to}
                    href={s.to}
                    onClick={(e) => { e.preventDefault(); handlePageNav(s.to); }}
                    className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Rješenja dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors py-2">
              Rješenja <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="w-72 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-[var(--shadow-xl)] p-2">
                {rjesenja.map((s) => (
                  <a
                    key={s.label}
                    href={s.to}
                    onClick={(e) => { e.preventDefault(); handlePageNav(s.to); }}
                    className="block px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <div className="text-sm font-medium text-foreground">{s.label}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/portfolio" onClick={(e) => { e.preventDefault(); navigate('/portfolio'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Portfolio</a>
          <a href="https://demo.primelink.com.hr" rel="noopener" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Primjeri</a>
          <a href="/besplatna-seo-analiza" onClick={(e) => { e.preventDefault(); navigate('/besplatna-seo-analiza'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Besplatna SEO analiza</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</a>
        </nav>

        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <Button size="sm" className="hidden lg:inline-flex" onClick={() => navigate('/ponuda/forma')}>Zatražite ponudu</Button>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            <div className="px-2 pt-3 pb-1 text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold">Usluge</div>
            {usluge.map((s) => (
              <a key={s.to} href={s.to} onClick={(e) => { e.preventDefault(); handlePageNav(s.to); }} className="text-muted-foreground hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-secondary text-sm">{s.label}</a>
            ))}
            <div className="px-2 pt-4 pb-1 text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold">Rješenja</div>
            {rjesenja.map((s) => (
              <a key={s.label} href={s.to} onClick={(e) => { e.preventDefault(); handlePageNav(s.to); }} className="text-muted-foreground hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-secondary text-sm">{s.label}</a>
            ))}
            <div className="h-px bg-border my-3" />
            <a href="/portfolio" onClick={(e) => { e.preventDefault(); handlePageNav('/portfolio'); }} className="text-muted-foreground hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-secondary">Portfolio</a>
            <a href="https://demo.primelink.com.hr" rel="noopener" onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-secondary">Primjeri</a>
            <a href="/besplatna-seo-analiza" onClick={(e) => { e.preventDefault(); handlePageNav('/besplatna-seo-analiza'); }} className="text-muted-foreground hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-secondary">Besplatna SEO analiza</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="text-muted-foreground hover:text-foreground transition-colors py-2.5 px-2 rounded-lg hover:bg-secondary">Kontakt</a>
            <Button className="w-full mt-3" onClick={() => { setMobileOpen(false); navigate('/ponuda/forma'); }}>Zatražite ponudu</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
