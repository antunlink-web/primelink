import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Kontakt | PrimeLink d.o.o. Zagreb</title>
        <meta name="description" content="Kontaktirajte PrimeLink za izradu web stranica, web aplikacija, CRM sustava i SaaS proizvoda. Email: primelink@primelink.hr, Tel: +385 91 512 2888." />
        <link rel="canonical" href="https://primelink.hr/kontakt" />
        <meta property="og:title" content="Kontakt | PrimeLink d.o.o. Zagreb" />
        <meta property="og:description" content="Kontaktirajte PrimeLink za izradu web stranica, web aplikacija, CRM sustava i SaaS proizvoda." />
        <meta property="og:url" content="https://primelink.hr/kontakt" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Header />
      <main className="pt-32">
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
