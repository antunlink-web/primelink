import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";

const QuoteFormPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <QuoteForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default QuoteFormPage;
