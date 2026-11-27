import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { getService } from "@/data/services";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/primelink-logo.webp";

const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-secondary";
const footerLink = `rounded-md text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground ${focusRing}`;

const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const language = i18n.language.startsWith("en") ? "en" : "hr";

  const goToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goHome = () => {
    if (location.pathname !== "/") navigate("/");
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container mx-auto px-4 py-12 sm:py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-8">
            <a
              href="/"
              onClick={(event) => {
                event.preventDefault();
                goHome();
              }}
              aria-label={language === "en" ? "PrimeLink home" : "PrimeLink početna"}
              className={`mb-5 inline-flex items-center gap-3 rounded-lg ${focusRing}`}
            >
              <img src={logo} alt="" width="36" height="36" loading="lazy" className="h-9 w-9 rounded-md object-contain dark:bg-foreground dark:ring-4 dark:ring-foreground" />
              <span className="text-lg font-semibold tracking-[-0.02em] text-foreground">PrimeLink</span>
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("footer.description")}</p>

            <address className="mt-6 space-y-3 not-italic text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                <span>PrimeLink d.o.o.<br />Zagreb, {t("approved.country")}</span>
              </div>
              <a href="mailto:primelink@primelink.hr" className={`flex w-fit items-center gap-3 ${footerLink}`}>
                <Mail className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                primelink@primelink.hr
              </a>
              <a href="tel:+385915122888" className={`flex w-fit items-center gap-3 ${footerLink}`}>
                <Phone className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.8} aria-hidden="true" />
                +385 91 512 2888
              </a>
            </address>

            <div className="mt-6 flex gap-2">
              <a href="https://www.facebook.com/primelinkdoo" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={`grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground ${focusRing}`}>
                <Facebook className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/primelink.hr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground ${focusRing}`}>
                <Instagram className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label={t("approved.services")} className="lg:col-span-3">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[var(--pl-eyebrow-tracking)] text-foreground">{t("approved.services")}</h2>
            <ul className="space-y-2.5">
              <li><Link to="/izrada-web-stranica" className={footerLink}>{getService("izrada-web-stranica", i18n.language)?.navTitle}</Link></li>
              <li><Link to="/izrada-web-trgovina" className={footerLink}>{getService("izrada-web-trgovina", i18n.language)?.navTitle}</Link></li>
              <li><Link to="/redizajn-web-stranice" className={footerLink}>{getService("redizajn-web-stranice", i18n.language)?.navTitle}</Link></li>
              <li><Link to="/izrada-web-aplikacija" className={footerLink}>{getService("izrada-web-aplikacija", i18n.language)?.navTitle}</Link></li>
              <li><Link to="/izrada-crm-sustava" className={footerLink}>{getService("izrada-crm-sustava", i18n.language)?.navTitle}</Link></li>
              <li><Link to="/integracije-karticnog-placanja" className={footerLink}>{t("headerNav.services_items.stripe")}</Link></li>
              <li><Link to="/saas-razvoj" className={footerLink}>{getService("saas-razvoj", i18n.language)?.navTitle}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t("approved.solutions")} className="lg:col-span-2">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[var(--pl-eyebrow-tracking)] text-foreground">{t("approved.solutions")}</h2>
            <ul className="space-y-2.5">
              <li><Link to="/izrada-crm-sustava" className={footerLink}>PrimeCRM</Link></li>
              <li><Link to="/integracije-karticnog-placanja" className={footerLink}>PrimePay</Link></li>
              <li><Link to="/izrada-web-trgovina" className={footerLink}>{getService("izrada-web-trgovina", i18n.language)?.navTitle}</Link></li>
              <li><Link to="/redizajn-web-stranice" className={footerLink}>PrimeDemo</Link></li>
            </ul>
          </nav>

          <nav aria-label={t("approved.links")} className="lg:col-span-3">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[var(--pl-eyebrow-tracking)] text-foreground">{t("approved.links")}</h2>
            <ul className="space-y-2.5">
              <li><Link to="/portfolio" className={footerLink}>Portfolio</Link></li>
              <li><Link to="/ponuda/forma" className={footerLink}>{t("approved.quote")}</Link></li>
              <li><a href="/#contact" onClick={(event) => { event.preventDefault(); goToSection("contact"); }} className={footerLink}>{t("approved.contact")}</a></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>&copy; 2026 PrimeLink d.o.o. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
