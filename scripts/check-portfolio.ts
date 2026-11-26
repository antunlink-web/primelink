// Run after `bun run build`. Uses an externally installed Playwright so the
// application needs no new dependency. Set PLAYWRIGHT_MODULE to its module path
// and CHROMIUM_PATH to a browser executable when they are not on default paths.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInstance } from "i18next";
import hr from "../src/i18n/locales/hr.json";
import en from "../src/i18n/locales/en.json";

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const dist = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const domains = `luxurysecondhand.hr trazilica.hr chairs.hr klikcjenik.hr alpha-medical.hr iskrasvjetlosti.hr jedra.hr livia.hr maratea.hr uprocesu.com hpc-spg.hr pingvinsport.com careflow.hr flowcall.eu lajt.hr flowsms.eu textro.eu mojakarta.hr perks.hr tijelokaodioprirode.eu evaciglar.eu infinityservices.hr prika.hr protekst.eu udrugalumen.hr yogawithnika.eu dadathlon.eu daddyhood.eu donatice.eu controlmaster.hr arks.hr euroratan.com xiiigimnazija.hr`.split(" ");
const categoryDomains = {
  all: domains,
  web: domains.filter((domain) => !["careflow.hr", "flowcall.eu", "flowsms.eu", "textro.eu"].includes(domain)),
  saas: domains.filter((domain) => ["trazilica.hr", "klikcjenik.hr", "careflow.hr", "flowcall.eu", "flowsms.eu", "textro.eu", "mojakarta.hr", "perks.hr"].includes(domain)),
  automation: ["careflow.hr"],
  integrations: ["flowcall.eu", "flowsms.eu", "textro.eu"],
};
const filterKeys = {
  all: "filterAll", web: "filterWeb", saas: "filterSaas",
  automation: "filterAutomation", integrations: "filterIntegrations",
} as const;
const contentTypes = {
  ".html": "text/html", ".js": "application/javascript", ".css": "text/css",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".ttf": "font/ttf",
  ".png": "image/png", ".ico": "image/x-icon",
};
const i18n = createInstance();
await i18n.init({ resources: { hr: { translation: hr }, en: { translation: en } }, fallbackLng: "hr" });
// Exercise singular and Croatian few/other forms as well as partial batches.
for (const [count, noun] of [[1, "projekt"], [2, "projekta"], [3, "projekta"], [4, "projekta"], [5, "projekata"], [7, "projekata"], [9, "projekata"], [11, "projekata"], [21, "projekt"]] as const) {
  assert.equal(i18n.t("portfolio.loadMore", { lng: "hr", count }), `Prikaži još ${count} ${noun}`);
  assert.equal(i18n.t("portfolio.loadMore", { lng: "en", count }), `Show ${count} more project${count === 1 ? "" : "s"}`);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--no-zygote", "--single-process", "--disable-crash-reporter", "--disable-breakpad"],
});
try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    for (const language of ["hr", "en"] as const) {
      const context = await browser.newContext({ viewport });
      try {
        // Serve the production files inside the browser harness, without opening
        // a server port or making requests to live sites or external services.
        await context.route("**/*", async (route) => {
          const url = new URL(route.request().url());
          assert.equal(url.origin, "http://portfolio.test");
          const pathname = decodeURIComponent(url.pathname);
          const file = resolve(dist, `.${pathname}${extname(pathname) ? "" : "/index.html"}`);
          assert(file.startsWith(`${dist}/`));
          await route.fulfill({ body: await readFile(file), contentType: contentTypes[extname(file)] || "application/octet-stream" });
        });
        const page = await context.newPage();
        const errors: string[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto("http://portfolio.test/portfolio");
        await page.getByRole("button", { name: language.toUpperCase(), exact: true }).click();
        const t = (key: string, values = {}) => i18n.t(`portfolio.${key}`, { lng: language, ...values });
        const grid = page.getByRole("region", { name: t("projectsLabel"), exact: true });
        const cards = grid.locator(":scope > a");
        const more = () => page.getByRole("button", { name: language === "hr" ? /^Prikaži još / : /^Show \d+ more/ });
        const less = () => page.getByRole("button", { name: t("showLess"), exact: true });
        const status = page.getByRole("status");
        const checkCards = async (category: keyof typeof categoryDomains, count: number) => {
          await page.waitForFunction((expected) => document.querySelectorAll("#portfolio-projects > a").length === expected, count);
          const urls = await cards.evaluateAll((links) => links.map((link: HTMLAnchorElement) => new URL(link.href).hostname));
          assert.deepEqual(urls, categoryDomains[category].slice(0, count));
          assert.equal(await status.textContent(), t("showingProjects", { shown: count, total: categoryDomains[category].length }));
        };
        const focused = async (locator) => {
          await page.waitForFunction((element) => document.activeElement === element, await locator.elementHandle());
        };
        const expand = async (category: keyof typeof categoryDomains, before: number, key = "Enter") => {
          const batch = Math.min(9, categoryDomains[category].length - before);
          const button = more();
          assert.equal(await button.textContent(), t("loadMore", { count: batch }));
          assert.equal(await button.getAttribute("type"), "button");
          assert.equal(await button.getAttribute("aria-controls"), await grid.getAttribute("id"));
          await button.focus();
          await page.keyboard.press("Tab");
          await page.keyboard.press("Shift+Tab");
          await focused(button);
          assert.notEqual(await button.evaluate((element) => getComputedStyle(element).boxShadow), "none", "Keyboard focus must have a visible ring");
          await page.keyboard.press(key);
          await checkCards(category, before + batch);
          await focused(cards.nth(before));
          assert.equal(await less().count(), 1);
        };
        const collapse = async (category: keyof typeof categoryDomains) => {
          await less().focus();
          await page.keyboard.press("Enter");
          await checkCards(category, 9);
          await focused(more());
          assert.equal(await less().count(), 0);
        };
        const filter = async (category: keyof typeof categoryDomains) => {
          const button = page.getByRole("button", { name: t(filterKeys[category]), exact: true });
          await button.focus();
          await page.keyboard.press("Enter");
          await checkCards(category, Math.min(9, categoryDomains[category].length));
          await focused(button);
          assert.equal(await button.getAttribute("aria-pressed"), "true");
          assert.equal(await page.locator('button[aria-pressed="true"]').count(), 1);
          assert.equal(await less().count(), 0);
        };

        await checkCards("all", 9);
        assert.equal(await less().count(), 0);
        assert.equal(await status.getAttribute("aria-live"), "polite");
        assert.equal(await status.getAttribute("aria-atomic"), "true");
        const metadata = await page.locator('head title, head meta[name="description"], head link[rel="canonical"]').evaluateAll((elements) => elements.map((element) => element.outerHTML));
        const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
        assert.deepEqual(JSON.parse(schema.find((value) => JSON.parse(value)["@type"] === "CollectionPage")).hasPart.map((project) => new URL(project.url).hostname), domains);
        const trustLinks = page.locator("section").filter({ hasText: t("trustTitle") }).locator("a");
        assert.equal(await trustLinks.count(), 33);
        assert.deepEqual(await trustLinks.evaluateAll((links) => links.map((link: HTMLAnchorElement) => new URL(link.href).hostname)), domains);
        for (const domain of ["lumibaby.hr", "aurumgradnja.com", "airwolthvacelectric.hr", "konzalting.primelink.hr", "voltapp.hr"]) {
          assert(!schema.some((value) => value.includes(domain)), `${domain} must be absent from structured data`);
          assert.equal(await page.locator(`a[href*="${domain}"]`).count(), 0, `${domain} must be absent from cards and trust links`);
        }

        await expand("all", 9);
        // Selecting the already active category must not discard expansion.
        await page.getByRole("button", { name: t("filterAll"), exact: true }).click();
        await checkCards("all", 18);
        await expand("all", 18, "Space");
        await expand("all", 27);
        assert.equal(await more().count(), 0);
        await collapse("all");
        await expand("all", 9);
        await collapse("all");

        // Web has 29 projects: 9, 18, 27, then a partial batch of 2.
        await filter("web");
        await expand("web", 9);
        await expand("web", 18);
        await expand("web", 27);
        assert.equal(await more().count(), 0);
        // Switching directly from an expanded filter resets the next category.
        for (const category of ["saas", "automation", "integrations"] as const) {
          await filter(category);
          assert.equal(await more().count(), 0);
        }
        await filter("web");
        await expand("web", 9);
        await collapse("web");
        await filter("all");
        await expand("all", 9);
        // Changing language retains expansion and updates both button labels.
        const otherLanguage = language === "hr" ? "en" : "hr";
        await page.getByRole("button", { name: otherLanguage.toUpperCase(), exact: true }).click();
        assert.equal(await page.getByRole("button", { name: i18n.t("portfolio.loadMore", { lng: otherLanguage, count: 9 }), exact: true }).count(), 1);
        assert.equal(await page.getByRole("button", { name: i18n.t("portfolio.showLess", { lng: otherLanguage }), exact: true }).count(), 1);
        assert.equal(await page.locator("#portfolio-projects > a").count(), 18);
        assert.deepEqual(await page.locator('head title, head meta[name="description"], head link[rel="canonical"]').evaluateAll((elements) => elements.map((element) => element.outerHTML)), metadata);
        assert.deepEqual(await page.locator('script[type="application/ld+json"]').allTextContents(), schema);
        assert.equal(await page.locator("section").filter({ hasText: i18n.t("portfolio.trustTitle", { lng: otherLanguage }) }).locator("a").count(), 33);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "No horizontal overflow");
        assert.deepEqual(errors, [], "No browser errors");
        console.log(`PASS: ${language}, ${viewport.width}px — batches/order, collapse, category resets, partial counts, translations, keyboard/focus, live status, SEO and trust links`);
      } finally {
        await context.close();
      }
    }
  }
  console.log("PASS: Croatian and English singular/plural labels, including partial batches");
} finally {
  await browser.close();
}
