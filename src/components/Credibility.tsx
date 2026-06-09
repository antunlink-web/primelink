import {
  RefreshCw,
  Eye,
  Users,
  CreditCard,
  Search,
  ServerCog,
} from "lucide-react";

const items = [
  {
    icon: RefreshCw,
    title: "Modernizacija zastarjelih web stranica",
    description:
      "Zamjena starih WordPress predložaka modernim, brzim i SEO čistim stranicama — bez gubitka pozicija.",
  },
  {
    icon: Eye,
    title: "Demo prijedlozi prije odluke",
    description:
      "Pokazujemo kako bi vaša nova stranica mogla izgledati prije nego išta plaćate ili potpisujete.",
  },
  {
    icon: Users,
    title: "CRM sustavi i interne aplikacije",
    description:
      "Custom CRM i interni alati koji prate vaše procese — bez licenci po korisniku i bez nepotrebnih modula.",
  },
  {
    icon: CreditCard,
    title: "Stripe naplate i pretplate",
    description:
      "Postavljanje plaćanja, pretplata i donacijskih sustava preko Stripea — sigurno i u skladu s PCI standardima.",
  },
  {
    icon: Search,
    title: "SEO i tehnička optimizacija",
    description:
      "Tehnički SEO, brzina učitavanja, Core Web Vitals i čista struktura — temelj za dugoročan organski rast.",
  },
  {
    icon: ServerCog,
    title: "Hosting, održavanje i podrška",
    description:
      "Pouzdan hosting, sigurnosne nadogradnje i kontinuirana podrška — bez 'isporučili i zaboravili'.",
  },
];

const Credibility = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
            Što radimo konkretno
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Što PrimeLink radi konkretno
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nismo agencija koja prodaje paušalna obećanja. Radimo konkretne stvari koje tvrtkama donose stvarnu vrijednost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-card p-7 hover:bg-secondary/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Credibility;