import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import PortfolioHighlights from "@/components/PortfolioHighlights";
import Credibility from "@/components/Credibility";
import HomeLeadForm from "@/components/HomeLeadForm";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

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
      <CapabilitiesStrip />
      <Services />
      <Solutions />
      <PortfolioHighlights />
      <Credibility />
      <HomeLeadForm />
      <Pricing />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
