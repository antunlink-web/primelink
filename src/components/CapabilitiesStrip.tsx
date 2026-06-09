import { Globe, Users, CreditCard, Search, Rocket, ServerCog } from "lucide-react";

const capabilities = [
  { icon: Globe, label: "Web stranice" },
  { icon: Users, label: "CRM sustavi" },
  { icon: CreditCard, label: "Stripe integracije" },
  { icon: Search, label: "SEO optimizacija" },
  { icon: Rocket, label: "SaaS razvoj" },
  { icon: ServerCog, label: "Održavanje" },
];

const CapabilitiesStrip = () => {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground/80 mb-7">
          Što radimo
        </p>
        <ul className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 md:gap-x-14">
          {capabilities.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 text-foreground/80 hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4 text-primary" strokeWidth={1.75} />
              <span className="text-sm font-medium tracking-tight">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CapabilitiesStrip;