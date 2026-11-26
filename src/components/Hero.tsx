import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroNetwork from "@/components/hero-network/HeroNetwork";

const englishNetworkLabels = ["Websites", "Online stores", "CRM systems", "Card payments", "AI solutions"];

export default function Hero() {
  const { t, i18n } = useTranslation();
  return <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24 bg-background">
    {/* Decorative layers stay behind the content and cannot intercept clicks. */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-dark)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-mesh)]" />
    <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute top-1/4 -left-32 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[160px]" />
    <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent/[0.08] rounded-full blur-[150px]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]" />
    {/* Match the selected-projects section's card background at the boundary. */}
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
    <div className="container mx-auto px-4 relative z-10 grid min-[900px]:grid-cols-[5fr_6fr] items-center gap-12 lg:gap-16">
      <div className="min-w-0 motion-safe:animate-fade-in-up motion-safe:[animation-fill-mode:both]"><p className="text-primary font-medium mb-5">PrimeLink · Zagreb</p>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.12] mb-6">{t('approved.headline')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t('approved.intro')}</p>
        <Button asChild size="lg" className="h-auto whitespace-normal text-center py-4"><Link to="/ponuda/forma">{t('approved.cta')}</Link></Button>
        <p className="text-sm text-muted-foreground leading-relaxed mt-5 max-w-lg">{t('approved.demo')}</p>
      </div>
      <HeroNetwork
        labels={i18n.resolvedLanguage?.startsWith("en") ? englishNetworkLabels : undefined}
        className="min-w-0 w-full max-w-[560px] mx-auto min-[900px]:max-w-none"
      />
    </div>
  </section>;
}
