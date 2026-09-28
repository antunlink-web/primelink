import { Seo } from "@/components/Seo";
import { pageSeo } from "@/data/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CapabilitiesStrip from "@/components/CapabilitiesStrip";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import DemoLibrary from "@/components/DemoLibrary";
import PortfolioHighlights from "@/components/PortfolioHighlights";
import Credibility from "@/components/Credibility";
import HomeLeadForm from "@/components/HomeLeadForm";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Seo metadata={pageSeo["/"]} />
      <Header />
      <Hero />
      <CapabilitiesStrip />
      <Services />
      <Solutions />
      <DemoLibrary />
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
