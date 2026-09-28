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
    "description": "PrimeLink izrađuje web stranice, web aplikacije, CRM sustave i Stripe integracije za tvrtke u Hrvatskoj. Brza izrada i jasan proces.",
    "canonical": "https://primelink.hr/",
    "ogTitle": "Izrada web stranica i aplikacija | PrimeLink Zagreb",
    "ogDescription": "Moderne web stranice, web aplikacije, CRM sustavi, SaaS proizvodi i Stripe integracije za tvrtke u Hrvatskoj.",
    "ogUrl": "https://primelink.hr/",
    "ogType": "website"
  },
  "/ponuda": {
    "title": "Ponuda — Web stranice, web shop i automatizacija | PrimeLink",
    "description": "Paketi za izradu web stranica, web shopova i automatizacije. Transparentne cijene, fiksni rokovi i podrška nakon lansiranja.",
    "canonical": "https://primelink.hr/ponuda",
    "ogTitle": "Ponuda — Web stranice i automatizacija | PrimeLink",
    "ogDescription": "Paketi za izradu web stranica, web shopova i automatizacije. Transparentne cijene i fiksni rokovi.",
    "ogUrl": "https://primelink.hr/ponuda",
    "ogType": "website"
  },
  "/ponuda/forma": {
    "title": "Zatražite ponudu — PrimeLink",
    "description": "Ispunite kratki upitnik i recite nam o svom projektu. Javljamo se s personaliziranom ponudom unutar 24 sata.",
    "canonical": "https://primelink.hr/ponuda/forma",
    "ogTitle": "Zatražite ponudu — PrimeLink",
    "ogDescription": "Ispunite kratki upitnik i recite nam o svom projektu. Javljamo se s personaliziranom ponudom unutar 24 sata.",
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
    "title": "Besplatna SEO analiza web stranice | PrimeLink",
    "description": "Besplatna SEO analiza web stranice — provjerite SEO, brzinu i tehničke probleme svoje stranice u nekoliko sekundi. PrimeLink d.o.o. Zagreb.",
    "canonical": "https://primelink.hr/besplatna-seo-analiza",
    "ogTitle": "Besplatna SEO analiza web stranice | PrimeLink",
    "ogDescription": "Provjerite osnovne SEO, brzinske i tehničke probleme svoje web stranice u nekoliko sekundi.",
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
