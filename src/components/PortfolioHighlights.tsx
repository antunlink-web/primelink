import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

import trazilicaImg from "@/assets/projects/trazilica-new.webp";
import flowsmsImg from "@/assets/projects/flowsms.webp";
import careflowImg from "@/assets/projects/careflow.webp";

const cases = [
  { key: "trazilica", image: trazilicaImg, name: "Trazilica.hr", url: "https://trazilica.hr" },
  { key: "flowsms", image: flowsmsImg, name: "FlowSMS.eu", url: "https://flowsms.eu" },
  { key: "careflow", image: careflowImg, name: "CareFlow.hr", url: "https://careflow.hr" },
] as const;

const PortfolioHighlights = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 max-w-5xl">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              {t('caseHighlights.badge')}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              {t('caseHighlights.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              {t('caseHighlights.subtitle')}
            </p>
          </div>
          <Link
            to="/portfolio"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 whitespace-nowrap"
          >
            {t('common.allReferences')} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => {
            const type = t(`caseHighlights.items.${c.key}.type`);
            return (
            <article
              key={c.key}
              className="group rounded-2xl border border-border bg-background overflow-hidden hover:border-primary/40 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary border-b border-border">
                <img
                  src={c.image}
                  alt={`${c.name} — ${type}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
                  {type}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {c.name}
                </h3>
                <dl className="space-y-3 text-sm mb-6 flex-1">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {t('caseHighlights.problem')}
                    </dt>
                    <dd className="text-foreground/85 leading-relaxed">{t(`caseHighlights.items.${c.key}.problem`)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {t('caseHighlights.solution')}
                    </dt>
                    <dd className="text-foreground/85 leading-relaxed">{t(`caseHighlights.items.${c.key}.solution`)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      {t('caseHighlights.result')}
                    </dt>
                    <dd className="text-foreground/85 leading-relaxed">{t(`caseHighlights.items.${c.key}.result`)}</dd>
                  </div>
                </dl>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    {t('common.viewProject')}
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHighlights;