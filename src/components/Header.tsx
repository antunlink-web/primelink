import { getService } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeControl from "./ThemeControl";
import logo from "@/assets/primelink-logo.webp";

const usluge = [
  { to: "/izrada-web-trgovina" },
  { to: "/hosting-odrzavanje" },
  { to: "/izrada-web-stranica" },
  { to: "/redizajn-web-stranice" },
  { to: "/izrada-web-aplikacija" },
  { to: "/izrada-crm-sustava" },
  { to: "/integracije-karticnog-placanja" },
  { to: "/saas-razvoj" },
];

const rjesenja = [
  { label: "PrimeCRM", to: "/izrada-crm-sustava" },
  { label: "PrimePay", to: "/integracije-karticnog-placanja" },
  { label: "PrimeDemo", to: "/redizajn-web-stranice" },
];

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
const desktopLink = `rounded-full px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary ${focusRing}`;
const mobileLink = `rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary ${focusRing}`;

const Header = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const language = i18n.language.startsWith("en") ? "en" : "hr";
  const quoteOnly = ["/izrada-crm-sustava", "/izrada-web-aplikacija", "/saas-razvoj", "/integracije-karticnog-placanja", "/stripe-integracije", "/hosting-odrzavanje"].includes(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [mobileOpen]);

  const handleNavClick = (sectionId: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePageNav = (path: string) => {
    setMobileOpen(false);
    navigate(path);
  };

  const goHome = () => {
    setMobileOpen(false);
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-3 rounded-[var(--pl-radius-lg)] border border-border bg-card px-3 shadow-[var(--pl-shadow)] sm:px-4">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
          aria-label={language === "en" ? "PrimeLink home" : "PrimeLink početna"}
          className={`flex shrink-0 items-center gap-3 rounded-lg ${focusRing}`}
        >
          <img
            src={logo}
            alt=""
            width="36"
            height="36"
            decoding="async"
            className="h-9 w-9 rounded-md object-contain dark:bg-foreground dark:ring-4 dark:ring-foreground"
          />
          <span className="hidden text-lg font-semibold tracking-[-0.02em] text-foreground sm:inline">PrimeLink</span>
        </a>

        <nav aria-label={language === "en" ? "Main navigation" : "Glavna navigacija"} className="hidden items-center gap-0.5 xl:flex">
          <div className="group relative">
            <button type="button" aria-haspopup="true" className={`${desktopLink} flex items-center gap-1`}>
              {t("approved.services")}
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:rotate-180 group-focus-within:rotate-180" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-72 rounded-[var(--pl-radius-lg)] border border-border bg-card p-2 shadow-[var(--pl-shadow)]">
                {usluge.map((service) => (
                  <a
                    key={service.to}
                    href={service.to}
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageNav(service.to);
                    }}
                    className={`block rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${focusRing}`}
                  >
                    {getService(service.to.slice(1), i18n.language)?.navTitle}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button type="button" aria-haspopup="true" className={`${desktopLink} flex items-center gap-1`}>
              {t("approved.solutions")}
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:rotate-180 group-focus-within:rotate-180" strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="w-72 rounded-[var(--pl-radius-lg)] border border-border bg-card p-2 shadow-[var(--pl-shadow)]">
                {rjesenja.map((solution) => (
                  <a
                    key={solution.label}
                    href={solution.to}
                    onClick={(event) => {
                      event.preventDefault();
                      handlePageNav(solution.to);
                    }}
                    className={`block rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary ${focusRing}`}
                  >
                    <span className="block text-sm font-medium text-foreground">{solution.label}</span>
                    <span className="block text-xs leading-relaxed text-muted-foreground">{t(`solutionsSection.items.${solution.label.toLowerCase()}.tagline`)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <a href="/portfolio" onClick={(event) => { event.preventDefault(); handlePageNav("/portfolio"); }} className={desktopLink}>Portfolio</a>
          <a href="https://demo.primelink.com.hr/" target="_blank" rel="noopener noreferrer" className={desktopLink}>{t("approved.navExamples")}</a>
          <a href="/#contact" onClick={(event) => { event.preventDefault(); handleNavClick("contact"); }} className={desktopLink}>{t("approved.contact")}</a>
        </nav>

        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <ThemeControl />
          <Button
            size="sm"
            className="hidden h-10 rounded-full bg-primary px-4 shadow-[var(--pl-shadow-lift)] hover:bg-[var(--pl-primary-hover)] xl:inline-flex"
            onClick={() => navigate("/ponuda/forma")}
          >
            {t(quoteOnly ? "approved.quote" : "approved.cta")}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 shrink-0 rounded-full text-foreground hover:bg-secondary hover:text-foreground xl:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? (language === "en" ? "Close menu" : "Zatvori izbornik") : (language === "en" ? "Open menu" : "Otvori izbornik")}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" /> : <Menu className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-navigation" className="mx-auto mt-2 max-h-[calc(100dvh-6.5rem)] max-w-[1240px] overflow-y-auto rounded-[var(--pl-radius-lg)] border border-border bg-card p-3 shadow-[var(--pl-shadow)] xl:hidden">
          <nav aria-label={language === "en" ? "Mobile navigation" : "Mobilna navigacija"} className="flex flex-col">
            <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[var(--pl-eyebrow-tracking)] text-muted-foreground">{t("approved.services")}</p>
            {usluge.map((service) => (
              <a key={service.to} href={service.to} onClick={(event) => { event.preventDefault(); handlePageNav(service.to); }} className={mobileLink}>
                {getService(service.to.slice(1), i18n.language)?.navTitle}
              </a>
            ))}
            <p className="px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-[var(--pl-eyebrow-tracking)] text-muted-foreground">{t("approved.solutions")}</p>
            {rjesenja.map((solution) => (
              <a key={solution.label} href={solution.to} onClick={(event) => { event.preventDefault(); handlePageNav(solution.to); }} className={mobileLink}>
                {solution.label}
                <span className="block text-xs font-normal text-muted-foreground">{t(`solutionsSection.items.${solution.label.toLowerCase()}.tagline`)}</span>
              </a>
            ))}
            <div className="my-3 h-px bg-border" />
            <a href="/portfolio" onClick={(event) => { event.preventDefault(); handlePageNav("/portfolio"); }} className={mobileLink}>Portfolio</a>
            <a href="https://demo.primelink.com.hr/" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)} className={mobileLink}>{t("approved.navExamples")}</a>
            <a href="/#contact" onClick={(event) => { event.preventDefault(); handleNavClick("contact"); }} className={mobileLink}>{t("approved.contact")}</a>
            <Button className="mt-3 h-11 w-full rounded-full bg-primary shadow-[var(--pl-shadow-lift)] hover:bg-[var(--pl-primary-hover)]" onClick={() => { setMobileOpen(false); navigate("/ponuda/forma"); }}>
              {t(quoteOnly ? "approved.quote" : "approved.cta")}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
