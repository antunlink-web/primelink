import { Users, CreditCard, Search, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const solutions = [
  {
    icon: Users,
    name: "PrimeCRM",
    tagline: "CRM platforma za prodaju i operativu",
    description:
      "CRM sustavi za prodaju, donacije, evidenciju klijenata i interne procese. Bez licenci po korisniku i bez nepotrebnih modula.",
    href: "/izrada-crm-sustava",
  },
  {
    icon: CreditCard,
    name: "PrimePay",
    tagline: "Stripe naplate, pretplate i donacije",
    description:
      "Stripe integracije, pretplate, online plaćanja i donacijski sustavi — sigurno, brzo i u skladu s PCI standardima.",
    href: "/stripe-integracije",
  },
  {
    icon: Search,
    name: "PrimeAudit",
    tagline: "SEO i tehnička analiza web stranica",
    description:
      "Besplatna analiza SEO, brzine i tehničkih problema vaše web stranice s konkretnim prijedlozima poboljšanja.",
    href: "/besplatna-seo-analiza",
  },
  {
    icon: Sparkles,
    name: "PrimeDemo",
    tagline: "Brzi prijedlozi redizajna",
    description:
      "Demo prijedlog kako bi vaša postojeća web stranica mogla izgledati nakon redizajna — prije nego donesete odluku.",
    href: "/redizajn-web-stranice",
  },
];

const Solutions = () => {
  return (
    <section id="rjesenja" className="py-24 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Rješenja
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Gotovi proizvodi PrimeLinka
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ne gradimo samo web stranice. Razvijamo poslovne sustave koji rješavaju konkretne probleme — od CRM-a i naplata do SEO i redizajna.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutions.map((s) => (
            <Link
              key={s.name}
              to={s.href}
              className="group relative rounded-2xl border border-border bg-background p-7 hover:border-primary/40 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {s.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">{s.tagline}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {s.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Saznajte više
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;