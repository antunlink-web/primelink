import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { selectedProjects } from "@/data/selected-projects";
export default function Hero() {
  const { t } = useTranslation();
  return <section className="relative isolate overflow-hidden pt-32 pb-16 md:pt-44 md:pb-24 bg-background">
    {/* Decorative layers stay behind the content and cannot intercept clicks. */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-dark)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-mesh)]" />
    <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute top-1/4 -left-32 w-[520px] h-[520px] bg-primary/10 rounded-full blur-[160px]" />
    <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute bottom-0 right-0 w-[420px] h-[420px] bg-accent/[0.08] rounded-full blur-[150px]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:48px_48px]" />
    {/* Match the selected-projects section's card background at the boundary. */}
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
    <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
      <div className="min-w-0 motion-safe:animate-fade-in-up motion-safe:[animation-fill-mode:both]"><p className="text-primary font-medium mb-5">PrimeLink · Zagreb</p>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.12] mb-6">{t('approved.headline')}</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t('approved.intro')}</p>
        <Button asChild size="lg" className="h-auto whitespace-normal text-center py-4"><Link to="/ponuda/forma">{t('approved.cta')}</Link></Button>
        <p className="text-sm text-muted-foreground leading-relaxed mt-5 max-w-lg">{t('approved.demo')}</p>
      </div>
      <div className="space-y-5 min-w-0 motion-safe:animate-fade-in-up motion-safe:[animation-delay:120ms] motion-safe:[animation-fill-mode:both]">{selectedProjects.slice(0,2).map((p,i)=><figure key={p.name} className={`overflow-hidden rounded-xl border border-border bg-card shadow-xl ${i ? 'ml-8 md:ml-16' : 'mr-4'}`}>
        <img src={p.image} alt={p.name} width="1440" height="900" fetchPriority={i===0?'high':undefined} className="w-full aspect-[16/8] object-cover object-top" />
        <figcaption className="px-4 py-3 text-sm">{p.name} <span className="text-muted-foreground">· {t(`approved.projectTypes.${i}`)}</span></figcaption>
      </figure>)}</div>
    </div>
  </section>;
}
