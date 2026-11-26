import { Seo } from "@/components/Seo";
import { pageSeo } from "@/data/seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Solutions from "@/components/Solutions";
import DemoLibrary from "@/components/DemoLibrary";
import PortfolioHighlights from "@/components/PortfolioHighlights";
import HomeLeadForm from "@/components/HomeLeadForm";
import { Process, Faq } from "@/components/ProcessFaq";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="homepage min-h-screen">
      <Seo metadata={pageSeo["/"]} />
      <Header />
      <Hero />
      <PortfolioHighlights />
      <Services />
      <DemoLibrary />
      <Solutions />
      <Process />
      <Faq />
      <HomeLeadForm />
      <Footer />
    </div>
  );
};

export default Index;
