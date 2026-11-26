import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { pageSeo } from "@/data/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
export default function Page() {
 const { t } = useTranslation();
 return <><Seo metadata={pageSeo["/ponuda"]}/><Header/><main className="pt-36 pb-24 container mx-auto px-4 max-w-3xl"><h1 className="text-4xl md:text-5xl font-bold mb-8">{t('approved.offer')}</h1><div className="space-y-5 text-lg text-muted-foreground leading-relaxed"><p>{t('approved.price')}</p><p>{t('approved.demo')}</p><p>{t('approved.reply')}</p><p>{t('approved.timing')}</p><p>{t('approved.terms')}</p></div><Button asChild size="lg" className="mt-8 h-auto whitespace-normal py-4"><Link to="/ponuda/forma">{t('approved.cta')}</Link></Button></main><Footer/></>;
}
