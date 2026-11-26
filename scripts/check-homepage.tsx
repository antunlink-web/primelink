// Offline rendered content checks: never submit an enquiry or send an email.
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import Index from "../src/pages/Index";
import OfferPage from "../src/pages/OfferPage";
import SeoAuditPage from "../src/pages/SeoAuditPage";
import QuoteFormPage from "../src/pages/QuoteFormPage";
import ServicePage from "../src/pages/ServicePage";
import { services, getService } from "../src/data/services";
import { pageSeo } from "../src/data/seo";
import hr from "../src/i18n/locales/hr.json";
import en from "../src/i18n/locales/en.json";
for (const language of ["hr", "en"] as const) {
 const i18n = createInstance();
 await i18n.init({ lng: language, resources: { hr: { translation: hr }, en: { translation: en } } });
 const render = (page: React.ReactNode) => renderToStaticMarkup(<HelmetProvider><MemoryRouter><I18nextProvider i18n={i18n}>{page}</I18nextProvider></MemoryRouter></HelmetProvider>);
 const locale = language === "hr" ? hr : en;
 const home = render(<Index/>);
 let last = -1;
 for (const marker of [locale.approved.headline, 'id="selected-projects"', 'id="services"', 'id="demo-biblioteka"', 'id="rjesenja"', 'id="process"', 'id="faq"', 'id="contact"']) {
  const at = home.indexOf(marker); assert(at > last, `Homepage order: ${marker}`); last = at;
 }
 for (const name of ["ALPHA-MEDICAL", "Luxury Second Hand", "Tražilica.hr", "PrimeCRM", "PrimePay", "PrimeAudit", "PrimeDemo"]) assert(home.includes(name));
 for (const path of ["/sport/fitness-trener", "/automobili/parking", "/restorani/fastfood", "/"]) assert(home.includes(`href="https://demo.primelink.com.hr${path}" target="_blank" rel="noopener noreferrer"`));
 assert.equal((home.match(/<details/g) || []).length, 6); // Five FAQs plus optional enquiry details.
 assert(!home.includes('required="" maxLength="1500"'));
 for (const key of ['name','email','website','message','budget','deadline','send','reply'] as const) assert(home.includes(locale.approved[key]));
 const pages = [home, render(<OfferPage/>), render(<SeoAuditPage/>), render(<QuoteFormPage/>), ...services.map(s => render(<ServicePage fixedSlug={s.slug}/>))];
 for (const html of pages) {
  assert(!/(?:\d+[.,]?\d*\s*€|\b24 (?:sata|hours)|\b48 (?:sati|hours)|99\.9%|Besplatna SEO|Free SEO|besplatnu SEO|free SEO)/i.test(html), 'Outdated commercial claim');
  for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) assert(pageSeo[match[1]], `Unknown internal route ${match[1]}`);
  if (language==='en') assert(!/Zatražite|Što trebate|Na vaš upit|Usluge<|Rješenja</.test(html), 'Untranslated visible content');
 }
 for (const s of services) assert(getService(s.slug, language)?.hero);
 console.log(`PASS ${language}: homepage order, projects, demo links, FAQ, optional form fields, service pages, commercial terms and internal links`);
}
