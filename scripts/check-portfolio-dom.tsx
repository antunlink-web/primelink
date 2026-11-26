// Component behavior and accessibility contracts without a browser. Requires
// jsdom; set JSDOM_MODULE to an external installation's entry point if needed.
// The production browser suite is available as `bun run test:portfolio:browser`.
import assert from "node:assert/strict";
import { createInstance } from "i18next";
import hr from "../src/i18n/locales/hr.json";
import en from "../src/i18n/locales/en.json";

const { JSDOM } = await import(process.env.JSDOM_MODULE || "jsdom");
const dom = new JSDOM("<!doctype html><html><head></head><body><div id='root'></div></body></html>", { url: "http://localhost/portfolio", pretendToBeVisual: true });
Object.assign(globalThis, {
  window: dom.window,
  document: dom.window.document,
  HTMLElement: dom.window.HTMLElement,
  requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window),
  cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window),
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(globalThis, "navigator", { configurable: true, value: dom.window.navigator });
// Import DOM-sensitive modules after the document exists.
const { act } = await import("react");
const { createRoot } = await import("react-dom/client");
const { MemoryRouter } = await import("react-router-dom");
const { HelmetProvider } = await import("react-helmet-async");
const { I18nextProvider } = await import("react-i18next");
const { default: PortfolioPage } = await import("../src/pages/PortfolioPage");
const root = createRoot(document.getElementById("root"));

try {
  for (const language of ["hr", "en"]) {
    const i18n = createInstance();
    await i18n.init({ lng: language, resources: { hr: { translation: hr }, en: { translation: en } } });
    const t = (key: string, values = {}) => i18n.t(`portfolio.${key}`, values);
    await act(async () => root.render(
      <HelmetProvider><MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><I18nextProvider i18n={i18n}>
        <PortfolioPage key={language} />
      </I18nextProvider></MemoryRouter></HelmetProvider>,
    ));
    await new Promise<void>((done) => dom.window.requestAnimationFrame(() => done()));
    const grid = () => document.getElementById("portfolio-projects");
    const cards = () => Array.from(grid().querySelectorAll<HTMLAnchorElement>(":scope > a"));
    const button = (label: string) => Array.from(document.querySelectorAll("button")).find((element) => element.textContent === label);
    const more = (count = 9) => button(t("loadMore", { count }));
    const less = () => button(t("showLess"));
    const check = (shown: number, total: number) => {
      assert.equal(cards().length, shown);
      const status = document.querySelector('[role="status"]');
      assert.equal(status.textContent, t("showingProjects", { shown, total }));
      assert.equal(status.getAttribute("aria-live"), "polite");
      assert.equal(status.getAttribute("aria-atomic"), "true");
    };
    const click = async (element: HTMLButtonElement) => {
      assert(element, "Expected an accessible action button");
      element.focus();
      await act(async () => element.click());
    };
    const expand = async (before: number, total: number) => {
      const batch = Math.min(9, total - before);
      assert.equal(more(batch).getAttribute("aria-controls"), grid().id);
      assert.equal(more(batch).type, "button");
      await click(more(batch));
      check(before + batch, total);
      assert.equal(document.activeElement, cards()[before], "Focus the first newly revealed card");
      assert(less(), "Collapse is available after every expansion");
    };
    const collapse = async (total: number) => {
      await click(less());
      check(9, total);
      assert.equal(document.activeElement, more(), "Return focus to Load More after collapse");
      assert.equal(less(), undefined);
    };
    const filter = async (key: string, total: number) => {
      const element = button(t(key));
      await click(element);
      check(Math.min(9, total), total);
      assert.equal(document.activeElement, element, "Keep focus on the selected category");
      assert.equal(element.getAttribute("aria-pressed"), "true");
      assert.equal(document.querySelectorAll('button[aria-pressed="true"]').length, 1);
      assert.equal(less(), undefined);
    };

    check(9, 34);
    assert.equal(grid().getAttribute("role"), "region");
    assert.equal(grid().getAttribute("aria-label"), t("projectsLabel"));
    assert.deepEqual(cards().slice(0, 3).map((card) => new URL(card.href).hostname), ["luxurysecondhand.hr", "trazilica.hr", "chairs.hr"]);
    const initialCards = cards().map((card) => card.outerHTML);
    const schema = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent);
    assert.equal(schema.hasPart.length, 34);
    const domains = schema.hasPart.map((project) => new URL(project.url).hostname);
    for (const domain of ["konzalting.primelink.hr", "voltapp.hr"]) {
      assert(!domains.includes(domain), `${domain} must be absent from structured data`);
      assert(!Array.from(document.querySelectorAll<HTMLAnchorElement>("a")).some((link) => new URL(link.href).hostname === domain), `${domain} must be absent from cards and trust links`);
    }
    const trustSection = Array.from(document.querySelectorAll("section")).find((section) => section.textContent.includes(t("trustTitle")));
    assert.deepEqual(Array.from(trustSection.querySelectorAll<HTMLAnchorElement>("a")).map((link) => new URL(link.href).hostname), domains, "Trust links preserve all 34 projects in order");
    assert.equal(less(), undefined);
    await expand(9, 34);
    await click(button(t("filterAll")));
    check(18, 34);
    await expand(18, 34);
    assert.equal(more(7).textContent, language === "hr" ? "Prikaži još 7 projekata" : "Show 7 more projects");
    await expand(27, 34);
    assert.equal(more(), undefined);
    assert.deepEqual(cards().map((card) => card.href), schema.hasPart.map((project) => new URL(project.url).href), "Keep the complete project ordering");
    await collapse(34);
    assert.deepEqual(cards().map((card) => card.outerHTML), initialCards, "Collapse preserves the original cards");
    await expand(9, 34);
    await collapse(34);

    await filter("filterWeb", 30);
    await expand(9, 30);
    await expand(18, 30);
    assert.equal(more(3).textContent, language === "hr" ? "Prikaži još 3 projekta" : "Show 3 more projects");
    await expand(27, 30);
    assert.equal(more(), undefined);
    await filter("filterSaas", 7);
    assert.equal(more(), undefined);
    await filter("filterAutomation", 1);
    assert.equal(more(), undefined);
    await filter("filterIntegrations", 3);
    assert.equal(more(), undefined);
    await filter("filterWeb", 30);
    await expand(9, 30);
    await collapse(30);
    await filter("filterAll", 34);
    await expand(9, 34);
    await act(async () => { await i18n.changeLanguage(language === "hr" ? "en" : "hr"); });
    check(18, 34);
    assert(more());
    assert(less());
    assert.deepEqual(JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent), schema, "Pagination and language changes preserve structured data");
    for (const [count, noun] of [[1, "projekt"], [2, "projekta"], [3, "projekta"], [4, "projekta"], [5, "projekata"], [7, "projekata"], [9, "projekata"], [11, "projekata"], [21, "projekt"]] as const) {
      assert.equal(i18n.t("portfolio.loadMore", { lng: "hr", count }), `Prikaži još ${count} ${noun}`);
      assert.equal(i18n.t("portfolio.loadMore", { lng: "en", count }), `Show ${count} more project${count === 1 ? "" : "s"}`);
    }
    console.log(`PASS: ${language} — 9/18/27/34 cards, partial batch, collapse, category resets, ordering, translations, accessible names, pressed state, live status and focus`);
  }
} finally {
  await act(async () => root.unmount());
  dom.window.close();
}
