import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SeoAuditCTA = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-secondary/30 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 mb-6">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Niste sigurni koliko je vaša web stranica optimizirana?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
            Provjerite osnovne SEO, brzinske i tehničke probleme svoje web stranice kroz besplatnu analizu.
          </p>
          <Button size="lg" onClick={() => navigate('/besplatna-seo-analiza')}>
            Pokreni besplatnu SEO analizu
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Izrada web stranica i aplikacija | PrimeLink Zagreb</title>
        <meta name="description" content="PrimeLink izrađuje web stranice, web aplikacije, CRM sustave i Stripe integracije za tvrtke u Hrvatskoj. Brza izrada i jasan proces." />
        <link rel="canonical" href="https://primelink.hr/" />
        <meta property="og:title" content="Izrada web stranica i aplikacija | PrimeLink Zagreb" />
        <meta property="og:description" content="Moderne web stranice, web aplikacije, CRM sustavi, SaaS proizvodi i Stripe integracije za tvrtke u Hrvatskoj." />
        <meta property="og:url" content="https://primelink.hr/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <Hero />
      <TrustLogos />
      <Services />
      <Pricing />
      <Stats />
      <About />
      <Contact />
      <SeoAuditCTA />
      <Footer />
    </div>
  );
};

export default Index;
