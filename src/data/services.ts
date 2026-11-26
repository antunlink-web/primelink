import { paymentServices } from "./payment-services";
export type ServiceDetail = {
  slug: string;
  navTitle: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  hero: string;
  icon: "globe" | "refresh" | "users" | "layers" | "credit-card" | "rocket";
  forWhom: string[];
  includes: string[];
  useCases: string[];
  process: { title: string; description: string }[];
  body: string[];
  related: string[];
  cta: string;
};


const standardServices: Record<string, ServiceDetail[]> = {
  "hr": [
    {
      "slug": "izrada-web-stranica",
      "icon": "globe",
      "navTitle": "Izrada web stranica",
      "h1": "Izrada web stranica",
      "seoTitle": "Izrada web stranica | PrimeLink",
      "seoDescription": "Poslovne web stranice prilagođene vašem sadržaju, brendu i ciljevima.",
      "hero": "Poslovne web stranice prilagođene vašem sadržaju, brendu i ciljevima.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Struktura sadržaja i dizajn",
        "Prilagodba mobitelima i tehničke SEO postavke",
        "Kontakt i dogovorene integracije"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Dobijte ponudu i personalizirani demo",
          "description": "Dogovaramo opseg, cijenu i rokove. Za web stranice i web trgovine pripremamo besplatan prijedlog početne stranice."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Poslovne web stranice prilagođene vašem sadržaju, brendu i ciljevima.",
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Za web stranice i web trgovine pripremamo besplatan personalizirani prijedlog početne stranice, bez obveze.",
        "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi."
      ],
      "related": [
        "redizajn-web-stranice",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu i besplatni demo"
    },
    {
      "slug": "redizajn-web-stranice",
      "icon": "refresh",
      "navTitle": "Redizajn web stranica",
      "h1": "Redizajn web stranica",
      "seoTitle": "Redizajn web stranica | PrimeLink",
      "seoDescription": "Obnavljamo dizajn, sadržaj i tehničku osnovu postojeće stranice. Migraciju i preusmjeravanja planiramo pažljivo, bez jamstva pozicija na tražilicama.",
      "hero": "Obnavljamo dizajn, sadržaj i tehničku osnovu postojeće stranice. Migraciju i preusmjeravanja planiramo pažljivo, bez jamstva pozicija na tražilicama.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Pregled postojeće strukture",
        "Novi dizajn i organizacija sadržaja",
        "Plan migracije i potrebna preusmjeravanja"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Dobijte ponudu i personalizirani demo",
          "description": "Dogovaramo opseg, cijenu i rokove. Za web stranice i web trgovine pripremamo besplatan prijedlog početne stranice."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Obnavljamo dizajn, sadržaj i tehničku osnovu postojeće stranice. Migraciju i preusmjeravanja planiramo pažljivo, bez jamstva pozicija na tražilicama.",
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Za web stranice i web trgovine pripremamo besplatan personalizirani prijedlog početne stranice, bez obveze.",
        "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu i besplatni demo"
    },
    {
      "slug": "izrada-web-trgovina",
      "icon": "globe",
      "navTitle": "Izrada web trgovina",
      "h1": "Izrada web trgovina",
      "seoTitle": "Izrada web trgovina | PrimeLink",
      "seoDescription": "Razvijamo web trgovine prema vašem katalogu, načinu prodaje i potrebnim integracijama.",
      "hero": "Razvijamo web trgovine prema vašem katalogu, načinu prodaje i potrebnim integracijama.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Katalog proizvoda i košarica",
        "Proces narudžbe i opcije dostave prema dogovoru",
        "Integracije plaćanja: Stripe, Corvus ili Monri prema zahtjevima"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Dobijte ponudu i personalizirani demo",
          "description": "Dogovaramo opseg, cijenu i rokove. Za web stranice i web trgovine pripremamo besplatan prijedlog početne stranice."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Razvijamo web trgovine prema vašem katalogu, načinu prodaje i potrebnim integracijama.",
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Za web stranice i web trgovine pripremamo besplatan personalizirani prijedlog početne stranice, bez obveze.",
        "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu i besplatni demo"
    },
    {
      "slug": "izrada-crm-sustava",
      "icon": "users",
      "navTitle": "CRM sustavi po mjeri",
      "h1": "CRM sustavi po mjeri",
      "seoTitle": "CRM sustavi po mjeri | PrimeLink",
      "seoDescription": "Povežite podatke o klijentima, zadatke i prodajne procese u sustavu prilagođenom vašem timu.",
      "hero": "Povežite podatke o klijentima, zadatke i prodajne procese u sustavu prilagođenom vašem timu.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Model podataka i korisničke uloge",
        "Pregled klijenata i zadataka",
        "Izvještaji i integracije prema dogovoru"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Zatražite ponudu",
          "description": "Cijena na upit, prema dogovorenom opsegu projekta. Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Povežite podatke o klijentima, zadatke i prodajne procese u sustavu prilagođenom vašem timu.",
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno.",
        "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu"
    },
    {
      "slug": "izrada-web-aplikacija",
      "icon": "layers",
      "navTitle": "Web aplikacije i interni alati",
      "h1": "Web aplikacije i interni alati",
      "seoTitle": "Web aplikacije i interni alati | PrimeLink",
      "seoDescription": "Izrađujemo aplikacije za vaše poslovne procese, od internih alata do korisničkih portala.",
      "hero": "Izrađujemo aplikacije za vaše poslovne procese, od internih alata do korisničkih portala.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Razrada procesa i funkcionalnosti",
        "Korisnička sučelja i prava pristupa",
        "Povezivanje s postojećim sustavima prema opsegu"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Zatražite ponudu",
          "description": "Cijena na upit, prema dogovorenom opsegu projekta. Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Izrađujemo aplikacije za vaše poslovne procese, od internih alata do korisničkih portala.",
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno.",
        "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu"
    },
    {
      "slug": "saas-razvoj",
      "icon": "rocket",
      "navTitle": "SaaS razvoj",
      "h1": "SaaS razvoj",
      "seoTitle": "SaaS razvoj | PrimeLink",
      "seoDescription": "Razvijamo SaaS proizvode od dogovorenog početnog opsega do daljnjih nadogradnji.",
      "hero": "Razvijamo SaaS proizvode od dogovorenog početnog opsega do daljnjih nadogradnji.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Definicija početne verzije proizvoda",
        "Korisnički računi i poslovna logika",
        "Pretplate i integracije prema odabranom pružatelju"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Zatražite ponudu",
          "description": "Cijena na upit, prema dogovorenom opsegu projekta. Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Razvijamo SaaS proizvode od dogovorenog početnog opsega do daljnjih nadogradnji.",
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno.",
        "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu"
    },
    {
      "slug": "hosting-odrzavanje",
      "icon": "layers",
      "navTitle": "Hosting i održavanje",
      "h1": "Hosting i održavanje",
      "seoTitle": "Hosting i održavanje | PrimeLink",
      "seoDescription": "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi.",
      "hero": "Hosting i održavanje uključeni su 12 mjeseci od objave. Opseg podrške i uvjeti obnove definiraju se u svakoj ponudi.",
      "forWhom": [
        "Tvrtke i timovi koji trebaju rješenje prilagođeno svojim procesima."
      ],
      "includes": [
        "Postavljanje hostinga prema projektu",
        "Održavanje i podrška u dogovorenom opsegu",
        "Uvjeti obnove unaprijed definirani ponudom"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Pošaljite upit",
          "description": "Recite nam što trebate. Na upit odgovaramo u roku od dva radna dana."
        },
        {
          "title": "Zatražite ponudu",
          "description": "Cijena na upit, prema dogovorenom opsegu projekta. Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno."
        },
        {
          "title": "Izrada prema dogovorenom opsegu",
          "description": "Izrađujemo rješenje prema prihvaćenoj ponudi, uz izravnu komunikaciju i dogovorene provjere."
        },
        {
          "title": "Objava i podrška",
          "description": "Objavljujemo rješenje i pružamo podršku prema uvjetima ponude. Hosting i održavanje uključeni su 12 mjeseci od objave."
        }
      ],
      "body": [
        "Cijena na upit, prema dogovorenom opsegu projekta.",
        "Rokove izrade projekta i personaliziranog demo prijedloga dogovaramo pojedinačno."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Zatražite ponudu"
    }
  ],
  "en": [
    {
      "slug": "izrada-web-stranica",
      "icon": "globe",
      "navTitle": "Website development",
      "h1": "Website development",
      "seoTitle": "Website development | PrimeLink",
      "seoDescription": "Business websites tailored to your content, brand and goals.",
      "hero": "Business websites tailored to your content, brand and goals.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Content structure and design",
        "Mobile layouts and technical SEO setup",
        "Contact options and agreed integrations"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Receive a quote and personalised demo",
          "description": "We agree scope, price and delivery times. For websites and webshops, we prepare a free homepage concept."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "Business websites tailored to your content, brand and goals.",
        "Pricing on enquiry, based on the agreed project scope.",
        "For websites and webshops, we prepare a free personalised homepage concept, with no obligation.",
        "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal."
      ],
      "related": [
        "redizajn-web-stranice",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote and free demo"
    },
    {
      "slug": "redizajn-web-stranice",
      "icon": "refresh",
      "navTitle": "Website redesign",
      "h1": "Website redesign",
      "seoTitle": "Website redesign | PrimeLink",
      "seoDescription": "We refresh the design, content and technical foundations of your website. We plan migrations and redirects carefully; search rankings are not guaranteed.",
      "hero": "We refresh the design, content and technical foundations of your website. We plan migrations and redirects carefully; search rankings are not guaranteed.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Review of the existing structure",
        "New design and content organisation",
        "Migration plan and necessary redirects"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Receive a quote and personalised demo",
          "description": "We agree scope, price and delivery times. For websites and webshops, we prepare a free homepage concept."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "We refresh the design, content and technical foundations of your website. We plan migrations and redirects carefully; search rankings are not guaranteed.",
        "Pricing on enquiry, based on the agreed project scope.",
        "For websites and webshops, we prepare a free personalised homepage concept, with no obligation.",
        "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote and free demo"
    },
    {
      "slug": "izrada-web-trgovina",
      "icon": "globe",
      "navTitle": "Webshop development",
      "h1": "Webshop development",
      "seoTitle": "Webshop development | PrimeLink",
      "seoDescription": "We develop webshops around your catalogue, sales process and required integrations.",
      "hero": "We develop webshops around your catalogue, sales process and required integrations.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Product catalogue and shopping cart",
        "Order flow and delivery options as agreed",
        "Payment integrations: Stripe, Corvus or Monri according to requirements"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Receive a quote and personalised demo",
          "description": "We agree scope, price and delivery times. For websites and webshops, we prepare a free homepage concept."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "We develop webshops around your catalogue, sales process and required integrations.",
        "Pricing on enquiry, based on the agreed project scope.",
        "For websites and webshops, we prepare a free personalised homepage concept, with no obligation.",
        "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote and free demo"
    },
    {
      "slug": "izrada-crm-sustava",
      "icon": "users",
      "navTitle": "Custom CRM systems",
      "h1": "Custom CRM systems",
      "seoTitle": "Custom CRM systems | PrimeLink",
      "seoDescription": "Connect customer data, tasks and sales processes in a system tailored to your team.",
      "hero": "Connect customer data, tasks and sales processes in a system tailored to your team.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Data model and user roles",
        "Customer and task management",
        "Reports and integrations as agreed"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Request a quote",
          "description": "Pricing on enquiry, based on the agreed project scope. Project and personalised demo delivery times are agreed individually."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "Connect customer data, tasks and sales processes in a system tailored to your team.",
        "Pricing on enquiry, based on the agreed project scope.",
        "Project and personalised demo delivery times are agreed individually.",
        "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote"
    },
    {
      "slug": "izrada-web-aplikacija",
      "icon": "layers",
      "navTitle": "Web applications and internal tools",
      "h1": "Web applications and internal tools",
      "seoTitle": "Web applications and internal tools | PrimeLink",
      "seoDescription": "We build applications for your business processes, from internal tools to customer portals.",
      "hero": "We build applications for your business processes, from internal tools to customer portals.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Process and feature planning",
        "User interfaces and access permissions",
        "Connections to existing systems within the agreed scope"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Request a quote",
          "description": "Pricing on enquiry, based on the agreed project scope. Project and personalised demo delivery times are agreed individually."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "We build applications for your business processes, from internal tools to customer portals.",
        "Pricing on enquiry, based on the agreed project scope.",
        "Project and personalised demo delivery times are agreed individually.",
        "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote"
    },
    {
      "slug": "saas-razvoj",
      "icon": "rocket",
      "navTitle": "SaaS development",
      "h1": "SaaS development",
      "seoTitle": "SaaS development | PrimeLink",
      "seoDescription": "We develop SaaS products from an agreed initial scope through subsequent improvements.",
      "hero": "We develop SaaS products from an agreed initial scope through subsequent improvements.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Initial product scope",
        "User accounts and business logic",
        "Subscriptions and integrations supported by the selected provider"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Request a quote",
          "description": "Pricing on enquiry, based on the agreed project scope. Project and personalised demo delivery times are agreed individually."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "We develop SaaS products from an agreed initial scope through subsequent improvements.",
        "Pricing on enquiry, based on the agreed project scope.",
        "Project and personalised demo delivery times are agreed individually.",
        "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote"
    },
    {
      "slug": "hosting-odrzavanje",
      "icon": "layers",
      "navTitle": "Hosting and maintenance",
      "h1": "Hosting and maintenance",
      "seoTitle": "Hosting and maintenance | PrimeLink",
      "seoDescription": "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal.",
      "hero": "Hosting and maintenance are included for 12 months from launch. Support scope and renewal terms are defined in each proposal.",
      "forWhom": [
        "Businesses and teams that need a solution tailored to their processes."
      ],
      "includes": [
        "Hosting setup for the project",
        "Maintenance and support within the agreed scope",
        "Renewal terms defined in the proposal"
      ],
      "useCases": [],
      "process": [
        {
          "title": "Send an enquiry",
          "description": "Tell us what you need. We respond within two business days."
        },
        {
          "title": "Request a quote",
          "description": "Pricing on enquiry, based on the agreed project scope. Project and personalised demo delivery times are agreed individually."
        },
        {
          "title": "Development to the agreed scope",
          "description": "We build according to the accepted proposal, with direct communication and agreed reviews."
        },
        {
          "title": "Launch and support",
          "description": "We launch your solution and provide support under the proposal terms. Hosting and maintenance are included for 12 months from launch."
        }
      ],
      "body": [
        "Pricing on enquiry, based on the agreed project scope.",
        "Project and personalised demo delivery times are agreed individually."
      ],
      "related": [
        "izrada-web-stranica",
        "izrada-web-trgovina",
        "integracije-karticnog-placanja"
      ],
      "cta": "Request a quote"
    }
  ]
};
export const services: ServiceDetail[] = [...standardServices.hr, ...paymentServices.hr];
export const getService = (slug: string, language = "hr") => {
 const lang = language.startsWith("en") ? "en" : "hr";
 return [...standardServices[lang], ...paymentServices[lang]].find(s => s.slug === slug);
};
