import {
  RefreshCw,
  Eye,
  Users,
  CreditCard,
  Search,
  ServerCog,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const items = [
  { key: "modernize", icon: RefreshCw },
  { key: "demo", icon: Eye },
  { key: "crm", icon: Users },
  { key: "stripe", icon: CreditCard },
  { key: "seo", icon: Search },
  { key: "hosting", icon: ServerCog },
] as const;

const Credibility = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            {t('credibility.badge')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('credibility.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('credibility.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {items.map((item) => (
            <div
              key={item.key}
              className="bg-card p-7 hover:bg-secondary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {t(`credibility.items.${item.key}.title`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`credibility.items.${item.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credibility;