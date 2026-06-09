import { useTranslation } from "react-i18next";
import { useCountUp } from "@/hooks/useCountUp";

type StatItem = {
  end: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  labelKey: string;
};

const stats: StatItem[] = [
  { end: 120, suffix: "+", labelKey: "stats.clients" },
  { end: 99.9, suffix: "%", decimals: 1, labelKey: "stats.uptime" },
  { end: 48, suffix: "h", labelKey: "stats.support" },
  { end: 10, suffix: "+", labelKey: "stats.experience" },
];

const formatValue = (v: number, decimals = 0) =>
  decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();

const StatTile = ({ item }: { item: StatItem }) => {
  const { ref, value } = useCountUp(item.end);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent tabular-nums">
        {item.prefix ?? ""}
        {formatValue(value, item.decimals)}
        {item.suffix ?? ""}
      </div>
      <div className="text-sm md:text-base text-muted-foreground font-medium">
        {/* label rendered below */}
      </div>
    </div>
  );
};

const Stats = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-card border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => {
            return (
              <div key={stat.labelKey} className="text-center">
                <StatTile item={stat} />
                <div className="text-sm md:text-base text-muted-foreground font-medium -mt-2">
                  {t(stat.labelKey)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
