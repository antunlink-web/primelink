import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { selectedProjects } from "@/data/selected-projects";
export default function PortfolioHighlights() {
 const { t } = useTranslation();
 return <section id="selected-projects" className="homepage-section-wash py-20"><div className="container mx-auto px-4">
 <div className="flex flex-wrap items-center justify-between gap-5 mb-9"><h2 className="text-3xl md:text-4xl font-bold">{t('approved.projects')}</h2><Link to="/portfolio" className="text-primary underline underline-offset-4">{t('approved.portfolio')} →</Link></div>
 <div className="grid md:grid-cols-3 gap-6">{selectedProjects.map((p,i)=><a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-border overflow-hidden bg-background hover:border-primary transition-colors">
 <img src={p.image} alt={p.name} width="1440" height="900" loading="lazy" className="w-full aspect-[8/5] object-cover object-top"/><div className="p-6"><h3 className="text-xl font-semibold mb-2">{p.name} ↗</h3><p className="text-muted-foreground text-sm">{t(`approved.projectTypes.${i}`)}</p></div></a>)}</div></div></section>;
}
