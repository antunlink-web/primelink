import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Globe, RefreshCw, Users, Layers, CreditCard, Rocket, ArrowRight, Check, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getService, services } from "@/data/services";

const iconMap = {
  globe: Globe,
  refresh: RefreshCw,
  users: Users,
  layers: Layers,
  "credit-card": CreditCard,
  rocket: Rocket,
};

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? getService(slug) : undefined;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Usluga nije pronađena</h1>
          <Button onClick={() => navigate("/")}>Povratak na početnu</Button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon];
  const url = `https://primelink.hr/usluge/${service.slug}`;
  const related = service.related.map((s) => getService(s)).filter(Boolean) as typeof services;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.navTitle,
    description: service.seoDescription,
    provider: {
      "@type": "Organization",
      name: "PrimeLink d.o.o.",
      url: "https://primelink.hr",
    },
    areaServed: "HR",
    url,
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{service.seoTitle}</title>
        <meta name="description" content={service.seoDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={service.seoTitle} />
        <meta property="og:description" content={service.seoDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(serviceJsonLd)}</script>
      </Helmet>

      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
              <Icon className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5 tracking-tight">
              {service.h1}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {service.hero}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate("/ponuda/forma")}>
                Zatražite ponudu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+385915122888">
                  <Phone className="mr-2 h-4 w-4" />
                  Dogovorite kratki poziv
                </a>
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Za koga je ova usluga</h2>
              <ul className="space-y-3">
                {service.forWhom.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Što je uključeno</h2>
              <ul className="space-y-3">
                {service.includes.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Body */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="prose prose-invert max-w-none space-y-5">
              {service.body.map((p, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed text-[1.05rem]">{p}</p>
              ))}
            </div>
          </div>

          {/* Use cases */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Tipični primjeri</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.useCases.map((u) => (
                <div key={u} className="rounded-xl border border-border bg-card p-5 text-sm text-foreground/90">
                  {u}
                </div>
              ))}
            </div>
          </div>

          {/* Process */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Kako izgleda proces</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.process.map((step, i) => (
                <div key={step.title} className="rounded-xl border border-border bg-card p-5">
                  <div className="text-xs text-primary font-semibold mb-2">Korak {i + 1}</div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Povezane usluge</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to={`/usluge/${r.slug}`}
                    className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 transition-all hover:shadow-[var(--shadow-hover)] group"
                  >
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                      {r.navTitle}
                    </h3>
                    <span className="text-sm text-primary inline-flex items-center gap-1">
                      Pogledajte uslugu <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="max-w-3xl mx-auto rounded-2xl border border-primary/30 bg-card p-10 text-center shadow-[var(--shadow-glow)]">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{service.cta}</h2>
            <p className="text-muted-foreground mb-6">
              U 48 sati šaljemo konkretnu ponudu, jasne rokove i točan opis onoga što dobivate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" onClick={() => navigate("/ponuda/forma")}>
                Zatražite ponudu
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:primelink@primelink.hr">primelink@primelink.hr</a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;