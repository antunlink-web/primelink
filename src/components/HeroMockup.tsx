import { Activity, Users, CreditCard, TrendingUp, Search, Check } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Premium dashboard mockup used as the right-side hero visual.
 * Pure HTML/SVG — no images, no JS work, mobile-light.
 */
const HeroMockup = () => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto select-none">
      {/* Soft blue glow behind the mockup */}
      <div
        aria-hidden
        className="absolute -inset-10 bg-[radial-gradient(circle_at_60%_40%,hsl(var(--primary)/0.35),transparent_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-16 -right-10 w-72 h-72 rounded-full bg-accent/20 blur-[100px]"
      />

      {/* Window frame */}
      <div className="relative rounded-2xl border border-border bg-card/90 backdrop-blur-sm shadow-[var(--shadow-xl)] overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-background/60">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
          <div className="ml-3 flex-1 h-5 rounded-md bg-secondary/70 flex items-center px-2 text-[10px] text-muted-foreground">
            app.primelink.hr / crm / dashboard
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-12 gap-3 p-4">
          {/* Sidebar */}
          <aside className="col-span-3 rounded-lg border border-border bg-background/60 p-2.5 space-y-1.5">
            {[
              { i: Activity, label: t('mockup.nav.overview'), active: true },
              { i: Users, label: t('mockup.nav.clients') },
              { i: CreditCard, label: t('mockup.nav.payments') },
              { i: Search, label: t('mockup.nav.seo') },
              { i: TrendingUp, label: t('mockup.nav.reports') },
            ].map(({ i: Icon, label, active }) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-[10px] ${
                  active
                    ? "bg-primary/15 text-foreground border border-primary/30"
                    : "text-muted-foreground"
                }`}
              >
                <Icon className="h-3 w-3 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </aside>

          {/* Main */}
          <main className="col-span-9 space-y-3">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { v: "+38%", l: t('mockup.kpis.conversion') },
                { v: "12.4k", l: t('mockup.kpis.visits') },
                { v: "€18.6k", l: t('mockup.kpis.revenue') },
              ].map((k) => (
                <div
                  key={k.l}
                  className="rounded-lg border border-border bg-background/70 p-2.5"
                >
                  <div className="text-[10px] text-muted-foreground">{k.l}</div>
                  <div className="text-sm font-bold text-foreground mt-0.5">
                    {k.v}
                  </div>
                </div>
              ))}
            </div>

            {/* Chart card */}
            <div className="rounded-lg border border-border bg-background/70 p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="text-[10px] text-muted-foreground">
                  {t('mockup.chartTitle')}
                </div>
                <div className="text-[10px] text-accent font-medium">▲ 24.3%</div>
              </div>
              <svg viewBox="0 0 200 60" className="w-full h-14">
                <defs>
                  <linearGradient id="hm-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 L20,40 L40,42 L60,30 L80,32 L100,22 L120,25 L140,15 L160,18 L180,8 L200,12 L200,60 L0,60 Z"
                  fill="url(#hm-area)"
                />
                <path
                  d="M0,45 L20,40 L40,42 L60,30 L80,32 L100,22 L120,25 L140,15 L160,18 L180,8 L200,12"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="1.5"
                />
              </svg>
            </div>

            {/* Task list */}
            <div className="rounded-lg border border-border bg-background/70 p-3 space-y-1.5">
              {[
                t('mockup.tasks.t1'),
                t('mockup.tasks.t2'),
                t('mockup.tasks.t3'),
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-[10px] text-foreground/85">
                  <span className="w-4 h-4 rounded-md bg-accent/20 border border-accent/40 flex items-center justify-center flex-shrink-0">
                    <Check className="h-2.5 w-2.5 text-accent" />
                  </span>
                  {t}
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Floating badge */}
      <div className="hidden md:flex absolute -bottom-5 -left-5 items-center gap-2 px-3 py-2 rounded-xl border border-border bg-card/95 shadow-[var(--shadow-xl)]">
        <span className="inline-flex h-2 w-2 rounded-full bg-accent" />
        <span className="text-[11px] text-foreground font-medium">{t('mockup.live')}</span>
      </div>
    </div>
  );
};

export default HeroMockup;