import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import { Helmet } from "react-helmet-async";

const QuoteFormPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Zatražite ponudu — PrimeLink</title>
        <meta name="description" content="Ispunite kratki upitnik i recite nam o svom projektu. Javljamo se s personaliziranom ponudom unutar 24 sata." />
        <link rel="canonical" href="https://primelink.hr/ponuda/forma" />
        <meta property="og:title" content="Zatražite ponudu — PrimeLink" />
        <meta property="og:description" content="Ispunite kratki upitnik i recite nam o svom projektu. Javljamo se s personaliziranom ponudom unutar 24 sata." />
        <meta property="og:url" content="https://primelink.hr/ponuda/forma" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-8">Zatražite ponudu</h1>
          <QuoteForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuoteFormPage;
