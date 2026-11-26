// Run with `bun scripts/check-payments.tsx`; no network or form submissions.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { createInstance } from "i18next";
import { I18nextProvider } from "react-i18next";
import ServicePage from "../src/pages/ServicePage";
import Services from "../src/components/Services";
import Solutions from "../src/components/Solutions";
import HomeLeadForm from "../src/components/HomeLeadForm";
import { paymentServices } from "../src/data/payment-services";
import { pageSeo } from "../src/data/seo";
import hr from "../src/i18n/locales/hr.json";
import en from "../src/i18n/locales/en.json";

const broad = "integracije-karticnog-placanja";
const stripe = "stripe-integracije";
for (const language of ["hr", "en"] as const) {
  const i18n = createInstance();
  await i18n.init({ lng: language, resources: { hr: { translation: hr }, en: { translation: en } } });
  const locale = language === "hr" ? hr : en;
  for (const service of paymentServices[language]) {
    const context = {} as { helmet: HelmetServerState };
    const html = renderToStaticMarkup(
      <HelmetProvider context={context}><MemoryRouter><I18nextProvider i18n={i18n}>
        <ServicePage fixedSlug={service.slug} />
      </I18nextProvider></MemoryRouter></HelmetProvider>,
    );
    assert(html.includes(service.h1));
    assert(html.includes(service.hero));
    assert(html.includes(locale.paymentServiceUi.process));
    for (const step of service.process) assert(html.includes(step.description));
    assert.equal(service.process.length, 4);
    const other = service.slug === broad ? stripe : broad;
    assert(service.related.includes(other));
    assert(html.includes(`href="/${other}"`));
    for (const match of html.matchAll(/href="(\/[^"#]*)"/g)) {
      assert(pageSeo[match[1]], `Unregistered internal link: ${match[1]}`);
    }
    assert(context.helmet.title.toString().includes(service.seoTitle));
    assert(context.helmet.meta.toString().includes(service.seoDescription));
    assert(context.helmet.link.toString().includes(`https://primelink.hr/${service.slug}`));
    assert(context.helmet.script.toString().includes(service.navTitle));
    assert(!/PCI|niža naknada|PCI-compliant/.test(html));
  }
  const html = renderToStaticMarkup(
    <HelmetProvider><MemoryRouter><I18nextProvider i18n={i18n}>
      <Services /><Solutions /><HomeLeadForm />
    </I18nextProvider></MemoryRouter></HelmetProvider>,
  );
  const label = locale.leadForm.needs.stripe;
  assert(html.includes(label));
  assert(html.includes(locale.solutionsSection.items.primepay.tagline));
  assert.equal([...html.matchAll(new RegExp(`href="/${broad}"`, "g"))].length, 2);
  assert(!html.includes(`href="/${stripe}"`), "General service cards should link to the broader page");
  assert(html.includes(locale.servicesGrid.items[broad].description));
  console.log(`PASS ${language}: payment pages, four process steps, metadata, structured data, reciprocal links, homepage cards and enquiry label`);
}
assert.deepEqual(paymentServices.hr.map(s => s.slug), paymentServices.en.map(s => s.slug));
assert.deepEqual(Object.keys(hr.paymentServiceUi), Object.keys(en.paymentServiceUi));
// Changing a visible label must not change the existing submitted service value.
const form = await readFile(new URL("../src/components/HomeLeadForm.tsx", import.meta.url), "utf8");
assert(form.includes('"Stripe integracija", // Legacy submitted value'));
assert(form.includes('needs.join(", ")'));
assert(form.includes('onCheckedChange={() => toggleNeed(item)}'));
assert(form.includes('item === "Stripe integracija" ? t("leadForm.needs.stripe")'));
console.log("PASS: HR/EN route parity and unchanged enquiry selection/submission contract (source check)");
