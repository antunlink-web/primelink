import { Seo } from "@/components/Seo";
import { pageSeo } from "@/data/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo metadata={pageSeo["/kontakt"]} />
      <Header />
      <main className="pt-32">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
