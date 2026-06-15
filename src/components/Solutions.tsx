import { Users, CreditCard, Search, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const solutionDefs = [
  { key: "primecrm", icon: Users, href: "/izrada-crm-sustava" },
  { key: "primepay", icon: CreditCard, href: "/stripe-integracije" },
  { key: "primeaudit", icon: Search, href: "/besplatna-seo-analiza" },
  { key: "primedemo", icon: Sparkles, href: "/redizajn-web-stranice" },
] as const;

const Solutions = () => {
  const { t } = useTranslation();
  return (
    <section id="rjesenja" className="py-24 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            {t('solutionsSection.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('solutionsSection.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('solutionsSection.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {solutionDefs.map((s) => (
            <Link
              key={s.key}
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
                      {t(`solutionsSection.items.${s.key}.name`)}
                    </h3>
                    <span className="text-xs text-muted-foreground">{t(`solutionsSection.items.${s.key}.tagline`)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {t(`solutionsSection.items.${s.key}.description`)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                    {t('common.learnMore')}
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