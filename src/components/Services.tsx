import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { getService } from "@/data/services";
const groups = [["izrada-web-stranica", "redizajn-web-stranice", "izrada-web-trgovina"], ["izrada-crm-sustava", "izrada-web-aplikacija", "saas-razvoj"], ["integracije-karticnog-placanja", "besplatna-seo-analiza", "hosting-odrzavanje"]];
export default function Services() {
 const { t, i18n } = useTranslation();
 return (
  <section id="services" className="py-20 bg-background relative overflow-hidden">
   <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-50" />
   <div className="container mx-auto px-4 relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold mb-10 motion-safe:animate-fade-in">{t('approved.services')}</h2>
    <div className="grid md:grid-cols-3 gap-6">
     {groups.map((slugs,i)=><div key={i} className="rounded-2xl border border-border bg-card p-7"><h3 className="text-2xl font-semibold mb-6">{t(`approved.groups.${i}`)}</h3><ul className="space-y-5">{slugs.map(slug=><li key={slug}><Link to={`/${slug}`} className="text-foreground hover:text-primary underline underline-offset-4">{getService(slug,i18n.language)?.navTitle || t('approved.audit')} →</Link></li>)}</ul>{i===2 && <p className="text-sm text-muted-foreground mt-6">{t('servicesGrid.items.integracije-karticnog-placanja.description')}</p>}</div>)}
    </div>
   </div>
  </section>
 );
}
