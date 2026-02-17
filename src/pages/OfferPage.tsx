import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Shield, Zap, Smartphone, Wrench, Rocket, ShoppingCart, CalendarCheck, Code, Globe, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OfferPage = () => {
  const navigate = useNavigate();

  const handleContact = () => {
    navigate('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary px-4 py-1.5 text-sm">
            PrimeLink Web Rješenja
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Prvi dojam je <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ključan</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Većina klijenata traži usluge putem interneta, a spora ili nepostojeća web stranica može značiti izgubljen posao.
          </p>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            <strong className="text-foreground">PrimeLink nudi rješenje:</strong> mi brinemo o tehnologiji, dizajnu i hostingu, dok se vi bavite svojim poslovanjem.
          </p>
        </div>
      </section>

      {/* Bestseller - 99€ */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="relative overflow-hidden border-primary/30 bg-card shadow-[var(--shadow-glow-strong)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-base px-4 py-1">
                  🔥 Bestseller Ponuda
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  Landing Page Paket
                </h2>
                <p className="text-muted-foreground text-lg">
                  Sve što je potrebno za profesionalni start.
                </p>
              </div>

              {/* Price */}
              <div className="text-center my-10">
                <div className="inline-flex items-baseline gap-1 bg-secondary/50 rounded-2xl px-8 py-6 border border-primary/20 animate-pulse-glow">
                  <span className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    99€
                  </span>
                  <span className="text-xl text-muted-foreground ml-2">/ godišnje</span>
                </div>
                <p className="text-sm text-muted-foreground mt-3">+ PDV</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10">
                {[
                  { icon: Check, text: "Dizajn uključen" },
                  { icon: Check, text: "Hosting uključen" },
                  { icon: Shield, text: "SSL Sigurnost" },
                  { icon: Wrench, text: "Tehnička podrška" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-secondary/30 rounded-lg p-3 border border-border">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button size="lg" className="text-lg px-10 py-6 h-auto" onClick={handleContact}>
                  👉 Zatražite ponudu
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Why PrimeLink */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              🛡️ Zašto odabrati <span className="text-primary">PrimeLink</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Mi nismo samo agencija — mi smo vaš IT partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Zap, title: "Munjevita brzina", desc: "Optimizirani serveri osiguravaju brzo učitavanje." },
              { icon: Smartphone, title: "Mobile First", desc: "Izgleda savršeno na svakom mobitelu i tabletu." },
              { icon: Wrench, title: "Bez brige", desc: "Mi rješavamo ažuriranja i tehničke probleme." },
              { icon: Rocket, title: "Ključ u ruke", desc: "Samo nam pošaljite domenu — mi radimo ostalo." },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-all hover:shadow-[var(--shadow-hover)]">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Need More */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            💼 Trebate više od Landing stranice?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Vaše poslovanje raste i treba specifične funkcionalnosti?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              { icon: ShoppingCart, title: "Web Shopovi" },
              { icon: CalendarCheck, title: "Rezervacijski sustavi" },
              { icon: Code, title: "Custom Aplikacije" },
            ].map((item, i) => (
              <Card key={i} className="bg-card border-border hover:border-accent/30 transition-all hover:shadow-[var(--shadow-hover)]">
                <CardContent className="p-8 flex flex-col items-center gap-3">
                  <div className="h-14 w-14 rounded-xl bg-accent/10 flex items-center justify-center">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-primary/30 hover:bg-primary/10" onClick={handleContact}>
            Kontaktirajte nas za custom projekt
          </Button>
        </div>
      </section>

      {/* Footer info */}
      <section className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-1"><Globe className="h-4 w-4" /> www.primelink.hr</span>
            <span className="flex items-center gap-1"><Mail className="h-4 w-4" /> primelink@primelink.hr</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OfferPage;
