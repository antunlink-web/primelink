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
      <Footer />
    </div>
  );
};

export default Index;
