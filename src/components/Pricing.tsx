import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section id="cijene" className="py-28 bg-card border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-3">
            Početne cijene
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Jasno postavljene cijene, bez skrivenih troškova
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Svaki projekt započinje kratkom analizom i fiksnom ponudom. Plaćate ono što je
            dogovoreno — bez naknadnih iznenađenja.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-background p-8 hover:border-primary/30 transition-all hover:shadow-[var(--shadow-hover)]">
            <div className="text-sm font-medium text-muted-foreground mb-2">Web stranice</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-foreground">od 499€</span>
              <span className="text-sm text-muted-foreground">+ PDV</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Profesionalna prezentacijska web stranica spremna za klijente.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Custom dizajn prilagođen brendu",
                "Mobile-first i optimizirana brzina",
                "Osnovna SEO optimizacija",
                "Hosting, SSL i tehnička podrška",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/izrada-web-stranica")}
            >
              Saznajte više
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-2xl border-2 border-primary/40 bg-background p-8 relative shadow-[var(--shadow-glow)]">
            <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Po projektu
            </div>
            <div className="text-sm font-medium text-muted-foreground mb-2">
              CRM sustavi i web aplikacije
            </div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-foreground">Cijena po projektu</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Cijena ovisi o opsegu, integracijama i broju korisnika. Ponuda u 48h.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "CRM sustavi prilagođeni vašim procesima",
                "Web aplikacije i interni alati",
                "Stripe i druge integracije plaćanja",
                "SaaS proizvodi — od MVP-a do produkcije",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                  <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full" onClick={() => navigate("/ponuda/forma")}>
              Zatražite ponudu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;