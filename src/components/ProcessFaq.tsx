import { useTranslation } from "react-i18next";
export function Process() {
 const { t } = useTranslation();
 return <section id="process" className="py-20"><div className="container mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold mb-10">{t('approved.process')}</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{[0,1,2,3].map(i=><div key={i} className="border-t border-primary/50 pt-6"><span className="text-primary text-sm">0{i+1}</span><h3 className="text-xl font-semibold my-4">{t(`approved.steps.${i}`)}</h3><p className="text-muted-foreground leading-relaxed">{t(`approved.stepText.${i}`)}</p></div>)}</div></div></section>;
}
export function Faq() {
 const { t } = useTranslation();
 return <section id="faq" className="py-20 bg-card border-y border-border"><div className="max-w-3xl mx-auto px-4"><h2 className="text-3xl md:text-4xl font-bold mb-8">{t('approved.faq')}</h2>{[0,1,2,3,4].map(i=><details key={i} className="border-b border-border py-5"><summary className="cursor-pointer font-semibold text-lg">{t(`approved.questions.${i}`)}</summary><p className="pt-4 text-muted-foreground leading-relaxed">{t(`approved.answers.${i}`)}</p></details>)}</div></section>;
}
