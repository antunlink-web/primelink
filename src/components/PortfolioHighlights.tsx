import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import trazilicaImg from "@/assets/projects/trazilica-new.webp";
import flowsmsImg from "@/assets/projects/flowsms.webp";
import careflowImg from "@/assets/projects/careflow.webp";

const cases = [
  {
    image: trazilicaImg,
    name: "Trazilica.hr",
    url: "https://trazilica.hr",
    type: "SaaS · Tražilica poslovnih subjekata",
    problem:
      "Podaci o 340.000+ hrvatskih tvrtki bili su razbacani po službenim registrima — pretraživanje je bilo sporo i fragmentirano.",
    solution:
      "Razvili smo unificiranu tražilicu s ElasticSearch indeksom, čistim React sučeljem i naprednim filterima nad svim registrima.",
    result:
      "Korisnici u nekoliko sekundi pronalaze podatke koje su prije tražili po više različitih izvora.",
  },
  {
    image: flowsmsImg,
    name: "FlowSMS.eu",
    url: "https://flowsms.eu",
    type: "SaaS · SMS platforma",
    problem:
      "SMS API-ji poput Twilija naplaćuju po poruci, što kampanje velikog volumena čini skupima i nepredvidivima.",
    solution:
      "Izgradili smo platformu koja koristi prave Android uređaje kao gatewaye — bez naknada po poruci i s automatskom raspodjelom prometa.",
    result:
      "Stopa isporuke 98,2%, kampanje se izvršavaju 3× brže, a trošak po poruci pada na nulu.",
  },
  {
    image: careflowImg,
    name: "CareFlow.hr",
    url: "https://careflow.hr",
    type: "Web aplikacija · Upravljanje udrugama",
    problem:
      "Udruge su koristile Excel, papir i razdvojene alate za članove, donatore i komunikaciju — sve je trošilo vrijeme i bilo podložno greškama.",
    solution:
      "Razvili smo digitalnu platformu koja centralizira članstvo, donacije, komunikaciju i aktivnosti u jednom sučelju.",
    result:
      "Administrativno opterećenje smanjeno, podaci o članovima i donatorima na jednom mjestu i dostupni odmah.",
  },
];

const PortfolioHighlights = () => {
  return (
    <section className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 max-w-5xl">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              Reference
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
              Odabrane studije slučaja
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Pravi projekti, pravi problemi i pravi rezultati — bez generičkih screenshotova.
            </p>
          </div>
          <Link
            to="/portfolio"
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1 whitespace-nowrap"
          >
            Sve reference <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c) => (
            <article
              key={c.name}
              className="group rounded-2xl border border-border bg-background overflow-hidden hover:border-primary/40 hover:shadow-[var(--shadow-hover)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-secondary border-b border-border">
                <img
                  src={c.image}
                  alt={`${c.name} — ${c.type}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-2">
                  {c.type}
                </p>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  {c.name}
                </h3>
                <dl className="space-y-3 text-sm mb-6 flex-1">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Problem
                    </dt>
                    <dd className="text-foreground/85 leading-relaxed">{c.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Rješenje
                    </dt>
                    <dd className="text-foreground/85 leading-relaxed">{c.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                      Rezultat
                    </dt>
                    <dd className="text-foreground/85 leading-relaxed">{c.result}</dd>
                  </div>
                </dl>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    Pogledajte projekt
                    <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHighlights;