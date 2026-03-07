import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, Shield, Zap, Smartphone, Wrench, Rocket, ShoppingCart, CalendarCheck, Code, Send, FileText, Globe2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OfferPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleContact = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('offer.heroTitle2')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('offer.heroSubtitle2')}
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {[
              { icon: Zap, text: t('offer.trustFast') },
              { icon: Smartphone, text: t('offer.trustMobile') },
              { icon: Shield, text: t('offer.trustSecure') },
              { icon: Wrench, text: t('offer.trustSupport') },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-secondary/50 border border-border rounded-full px-4 py-2 text-sm text-muted-foreground">
                <item.icon className="h-4 w-4 text-primary" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-6 h-auto" onClick={handleContact}>
              {t('offer.ctaStart')}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-primary/30 hover:bg-primary/10" onClick={scrollToPackages}>
              {t('offer.ctaPackages')}
            </Button>
          </div>

          {/* Credibility line */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" /> {t('offer.cred1')}</span>
            <span className="flex items-center gap-1.5"><Rocket className="h-4 w-4 text-primary" /> {t('offer.cred2')}</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> {t('offer.cred3')}</span>
          </div>
        </div>
      </section>

      {/* 2. PRICING PACKAGES */}
      <section id="packages" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('offer.packagesTitle')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('offer.packagesDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <Card className="bg-card border-border hover:border-primary/20 transition-all hover:shadow-[var(--shadow-hover)] flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">Starter</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">149€</span>
                  <span className="text-muted-foreground ml-1">{t('offer.pricePerYear')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('offer.plusVat')}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {(['starterF1','starterF2','starterF3','starterF4','starterF5','starterF6'] as const).map((key) => (
                    <li key={key} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{t(`offer.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={handleContact}>{t('offer.selectPackage')}</Button>
              </CardContent>
            </Card>

            {/* Business - highlighted */}
            <Card className="relative bg-card border-primary/40 shadow-[var(--shadow-glow-strong)] hover:shadow-[var(--shadow-glow-strong)] flex flex-col scale-[1.02]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold text-foreground">Business</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30">{t('offer.popular')}</Badge>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">299€</span>
                  <span className="text-muted-foreground ml-1">{t('offer.pricePerYear')}</span>
                  <p className="text-xs text-muted-foreground mt-1">{t('offer.plusVat')}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {(['businessF1','businessF2','businessF3','businessF4','businessF5','businessF6'] as const).map((key) => (
                    <li key={key} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span>{t(`offer.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={handleContact}>{t('offer.selectPackage')}</Button>
              </CardContent>
            </Card>

            {/* Custom */}
            <Card className="bg-card border-border hover:border-accent/20 transition-all hover:shadow-[var(--shadow-hover)] flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">Custom</h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{t('offer.customPrice')}</span>
                  <p className="text-xs text-muted-foreground mt-1">&nbsp;</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {(['customF1','customF2','customF3','customF4','customF5'] as const).map((key) => (
                    <li key={key} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-accent flex-shrink-0" />
                      <span>{t(`offer.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-accent/30 hover:bg-accent/10" onClick={handleContact}>{t('offer.contactUs')}</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('offer.howTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Send, step: "1", title: t('offer.step1Title'), desc: t('offer.step1Desc') },
              { icon: Code, step: "2", title: t('offer.step2Title'), desc: t('offer.step2Desc') },
              { icon: Globe2, step: "3", title: t('offer.step3Title'), desc: t('offer.step3Desc') },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE PRIMELINK */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('offer.whyTitle')} <span className="text-primary">PrimeLink</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('offer.whySubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: t('offer.speedTitle'), desc: t('offer.speedDesc') },
              { icon: Smartphone, title: t('offer.mobileTitle'), desc: t('offer.mobileDesc') },
              { icon: Wrench, title: t('offer.noWorryTitle'), desc: t('offer.noWorryDesc') },
              { icon: Rocket, title: t('offer.turnkeyTitle'), desc: t('offer.turnkeyDesc') },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-[var(--shadow-hover)]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPANDED SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('offer.moreTitle')}
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            {t('offer.moreDesc')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: ShoppingCart, title: t('offer.webShops'), desc: t('offer.webShopsDesc') },
              { icon: CalendarCheck, title: t('offer.bookingSystems'), desc: t('offer.bookingDesc') },
              { icon: Code, title: t('offer.customApps'), desc: t('offer.customAppsDesc') },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border hover:border-accent/30 transition-all hover:shadow-[var(--shadow-hover)]">
                <CardContent className="p-8 flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t('offer.faqTitle')}
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {[1,2,3,4].map((i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-lg bg-card px-4">
                <AccordionTrigger className="text-foreground hover:no-underline">
                  {t(`offer.faq${i}Q`)}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(`offer.faq${i}A`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t('offer.finalCtaTitle')}
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-10 py-6 h-auto" onClick={handleContact}>
              {t('offer.ctaStart')}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 h-auto border-primary/30 hover:bg-primary/10" onClick={handleContact}>
              {t('offer.contactUs')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OfferPage;
