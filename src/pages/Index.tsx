import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustLogos from "@/components/TrustLogos";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Izrada web stranica i web aplikacija za tvrtke | PrimeLink</title>
        <meta name="description" content="PrimeLink d.o.o. — moderna IT rješenja, cloud infrastruktura, kibernetička sigurnost i razvoj web stranica za poduzeća u Hrvatskoj." />
        <link rel="canonical" href="https://primelink.hr/" />
        <meta property="og:title" content="Izrada web stranica i web aplikacija za tvrtke | PrimeLink" />
        <meta property="og:description" content="Moderna IT rješenja, cloud infrastruktura i kibernetička sigurnost za poduzeća u Hrvatskoj." />
        <meta property="og:url" content="https://primelink.hr/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <Hero />
      <TrustLogos />
      <Services />
      <Stats />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
