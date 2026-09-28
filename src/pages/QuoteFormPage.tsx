import { Seo } from "@/components/Seo";
import { pageSeo } from "@/data/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

const QuoteFormPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo metadata={pageSeo["/ponuda/forma"]} />
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
