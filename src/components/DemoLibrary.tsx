import { Button } from "@/components/ui/button";
import { ArrowUpRight, Globe } from "lucide-react";

const chips = [
  "Web stranice",
  "Udruge",
  "Turizam",
  "Restorani",
  "CRM",
  "Webshop",
];

const DEMO_URL = "https://demo.primelink.com.hr";

const DemoLibrary = () => {
  return (
    <section id="demo-biblioteka" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary/40 text-xs text-muted-foreground mb-5">
              <Globe className="h-3.5 w-3.5" />
              demo.primelink.com.hr
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Pogledajte demo biblioteku
            </h2>
            <p className="text-lg text-muted-foreground mb-5">
              Pregledajte primjere modernih web stranica i digitalnih rješenja za različite djelatnosti.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Pripremili smo demo primjere koji vam mogu pomoći lakše zamisliti kako bi vaša nova web stranica, CRM sustav ili digitalni alat mogao izgledati. Demo biblioteka uključuje primjere za uslužne tvrtke, udruge, turizam, restorane, trgovine, poslovne sustave i druge djelatnosti.
            </p>
            <Button asChild size="lg">
              <a href={DEMO_URL} rel="noopener">
                Otvori demo biblioteku
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Right: browser-style preview card */}
          <a
            href={DEMO_URL}
            rel="noopener"
            className="group block rounded-2xl border border-border bg-card shadow-[var(--shadow-xl)] overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
            aria-label="Otvori demo biblioteku"
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <div className="ml-3 flex-1 truncate rounded-md bg-background/60 border border-border px-3 py-1 text-xs text-muted-foreground">
                demo.primelink.com.hr
              </div>
            </div>

            {/* Preview body */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-background to-secondary/30">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground/70 font-semibold mb-3">
                Demo biblioteka
              </div>
              <div className="text-xl md:text-2xl font-semibold text-foreground mb-6 leading-snug">
                Primjeri za različite djelatnosti
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {chips.map((c) => (
                  <span
                    key={c}
                    className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-background/60 text-muted-foreground group-hover:border-primary/30 group-hover:text-foreground transition-colors"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-[4/3] rounded-lg border border-border bg-secondary/40" />
                <div className="aspect-[4/3] rounded-lg border border-border bg-secondary/60" />
                <div className="aspect-[4/3] rounded-lg border border-border bg-secondary/40" />
              </div>
              <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                <span>Pregledajte primjere</span>
                <span className="inline-flex items-center gap-1 text-foreground font-medium group-hover:text-primary transition-colors">
                  Otvori <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DemoLibrary;