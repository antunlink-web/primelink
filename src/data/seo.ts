import { services } from "./services";

export type SeoMetadata = {
  title: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogType?: string;
  robots?: string;
};

// Existing page Helmet values, shared by the browser and static entrypoint build.
export const pageSeo: Record<string, SeoMetadata> = {
  "/": {
    "title": "Izrada web stranica i aplikacija | PrimeLink Zagreb",
    "description": "PrimeLink izrađuje web stranice, web trgovine, web aplikacije, CRM sustave i integracije kartičnog plaćanja (Stripe, Corvus i Monri) za tvrtke u Hrvatskoj. Cijena na upit.",
    "canonical": "https://primelink.hr/",
    "ogTitle": "Izrada web stranica i aplikacija | PrimeLink Zagreb",
    "ogDescription": "Moderne web stranice, web trgovine, web aplikacije, CRM sustavi, SaaS proizvodi i integracije kartičnog plaćanja (Stripe, Corvus i Monri) za tvrtke u Hrvatskoj.",
    "ogUrl": "https://primelink.hr/",
    "ogType": "website"
  },
  "/ponuda": {
    "title": "Ponuda — Web stranice, web shop i automatizacija | PrimeLink",
    "description": "Izrada web stranica i web trgovina. Cijena na upit, besplatan personalizirani prijedlog početne stranice bez obveze.",
    "canonical": "https://primelink.hr/ponuda",
    "ogTitle": "Ponuda — Web stranice i automatizacija | PrimeLink",
    "ogDescription": "Cijene i rokovi prema dogovorenom opsegu. Hosting i održavanje 12 mjeseci od objave.",
    "ogUrl": "https://primelink.hr/ponuda",
    "ogType": "website"
  },
  "/ponuda/forma": {
    "title": "Zatražite ponudu — PrimeLink",
    "description": "Ispunite kratki upitnik i recite nam o svom projektu. Na vaš upit odgovaramo u roku od dva radna dana.",
    "canonical": "https://primelink.hr/ponuda/forma",
    "ogTitle": "Zatražite ponudu — PrimeLink",
    "ogDescription": "Ispunite kratki upitnik i recite nam o svom projektu. Na vaš upit odgovaramo u roku od dva radna dana.",
    "ogUrl": "https://primelink.hr/ponuda/forma",
    "ogType": "website"
  },
  "/portfolio": {
    "title": "Portfolio — Naši projekti i klijenti | PrimeLink",
    "description": "Pregledajte odabrane projekte koje smo razvili — web stranice, web shopovi, SaaS i automatizacije za hrvatske i strane klijente.",
    "canonical": "https://primelink.hr/portfolio",
    "ogTitle": "Portfolio — Naši projekti | PrimeLink",
    "ogDescription": "Odabrani projekti — web stranice, web shopovi, SaaS i automatizacije.",
    "ogUrl": "https://primelink.hr/portfolio",
    "ogType": "website"
  },
  "/kontakt": {
    "title": "Kontakt | PrimeLink d.o.o. Zagreb",
    "description": "Kontaktirajte PrimeLink za izradu web stranica, web aplikacija, CRM sustava i SaaS proizvoda. Email: primelink@primelink.hr, Tel: +385 91 512 2888.",
    "canonical": "https://primelink.hr/kontakt",
    "ogTitle": "Kontakt | PrimeLink d.o.o. Zagreb",
    "ogDescription": "Kontaktirajte PrimeLink za izradu web stranica, web aplikacija, CRM sustava i SaaS proizvoda.",
    "ogUrl": "https://primelink.hr/kontakt",
    "ogType": "website"
  },
  "/besplatna-seo-analiza": {
    "title": "PrimeAudit — SEO i tehnička analiza | PrimeLink",
    "description": "PrimeAudit: plaćena SEO i tehnička analiza na upit. Opseg i rokovi definiraju se ponudom.",
    "canonical": "https://primelink.hr/besplatna-seo-analiza",
    "ogTitle": "PrimeAudit — SEO i tehnička analiza | PrimeLink",
    "ogDescription": "SEO i tehnička analiza prema dogovorenom opsegu. Cijena na upit.",
    "ogUrl": "https://primelink.hr/besplatna-seo-analiza",
    "ogType": "website"
  }
};

for (const service of services) {
  const url = `https://primelink.hr/${service.slug}`;
  pageSeo[`/${service.slug}`] = {
    title: service.seoTitle,
    description: service.seoDescription,
    canonical: url,
    ogTitle: service.seoTitle,
    ogDescription: service.seoDescription,
    ogUrl: url,
    ogType: "website",
  };
}

export const notFoundSeo: SeoMetadata = {
  title: "404 — Page not found | PrimeLink",
  robots: "noindex, nofollow",
};

// App.tsx redirects ANY single slug, including non-service pages.
export const legacyRoutePattern = "/usluge/:slug";
export const legacyRoutes = Object.keys(pageSeo)
  .filter((route) => /^\/[^/]+$/.test(route))
  .sort()
  .map((target) => ({ path: `/usluge${target}`, target }));

export const englishPageSeo: Record<string, { title: string; description: string }> = {
 "/": { title: "Websites, webshops and applications | PrimeLink", description: "Custom websites, webshops, CRM systems and card payment integrations: Stripe, Corvus and Monri. Pricing on enquiry." },
 "/ponuda": { title: "Your project proposal | PrimeLink", description: "Pricing on enquiry. Free personalised homepage concept for websites and webshops, with no obligation." },
 "/ponuda/forma": { title: "Request a quote | PrimeLink", description: "Tell us about your project. We respond within two business days." },
 "/kontakt": { title: "Contact | PrimeLink", description: "Contact PrimeLink about your website, webshop or application. We respond within two business days." },
 "/portfolio": { title: "Project portfolio | PrimeLink", description: "Explore our websites, webshops and applications." },
 "/besplatna-seo-analiza": { title: "PrimeAudit — SEO and technical analysis | PrimeLink", description: "Paid SEO and technical analysis, priced on enquiry. Scope and delivery times defined in the proposal." },
};
