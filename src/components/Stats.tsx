import { useTranslation } from "react-i18next";

const stats = [
  { value: "120+", labelKey: "stats.clients" },
  { value: "99.9%", labelKey: "stats.uptime" },
  { value: "48h", labelKey: "stats.support" },
  { value: "10+", labelKey: "stats.experience" },
];

const Stats = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
