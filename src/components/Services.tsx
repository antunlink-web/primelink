import { Globe, RefreshCw, Users, Layers, CreditCard, Rocket, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    { slug: "izrada-web-stranica", icon: Globe, title: "Izrada web stranica", description: "Profesionalne, brze i SEO optimizirane web stranice. Custom dizajn, jasna poruka i tehnička podloga koja konvertira posjetitelje u upite." },
    { slug: "redizajn-web-stranica", icon: RefreshCw, title: "Redizajn web stranica", description: "Modernizacija postojeće stranice bez gubitka SEO pozicija. Bolji dizajn, brže učitavanje i jasnija struktura sadržaja." },
    { slug: "crm-sustavi", icon: Users, title: "Izrada CRM sustava", description: "Custom CRM prilagođen vašim prodajnim i operativnim procesima. Bez licenci po korisniku i bez nepotrebnih modula." },
    { slug: "web-aplikacije", icon: Layers, title: "Izrada web aplikacija", description: "Interni alati, klijentski portali i poslovne aplikacije koje zamjenjuju Excel, papir i nepovezane sustave." },
    { slug: "stripe-integracije", icon: CreditCard, title: "Stripe integracije", description: "Implementacija Stripe plaćanja, pretplata i Connect platformi. Sigurno, brzo i u skladu s PCI standardima." },
    { slug: "saas-razvoj", icon: Rocket, title: "SaaS razvoj", description: "Razvoj SaaS proizvoda od ideje do produkcije. MVP, skalabilna arhitektura, pretplate i onboarding korisnika." },
  ];

  return (
    <section id="services" className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t('services.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('services.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              to={`/usluge/${service.slug}`}
              className="block group"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Card className="h-full relative overflow-hidden border border-border group-hover:border-primary/40 transition-all duration-300 group-hover:shadow-[var(--shadow-hover)] group-hover:-translate-y-1 bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground mb-4">
                    {service.description}
                  </CardDescription>
                  <span className="text-sm text-primary inline-flex items-center gap-1 font-medium">
                    Pogledajte uslugu <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
