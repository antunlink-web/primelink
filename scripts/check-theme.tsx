// Offline DOM checks. Like check-portfolio-dom.tsx, accepts an external JSDOM_MODULE.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createInstance } from "i18next";

const { JSDOM } = await import(process.env.JSDOM_MODULE || "jsdom");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const bootstrap = html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert(bootstrap);
assert(html.indexOf(bootstrap) < html.indexOf("/brand/fonts.css"));
assert(html.indexOf("/brand/fonts.css") < html.indexOf("/brand/tokens.css"));
assert.equal((html.match(/<meta name="theme-color"/g) || []).length, 1);
const key = "primelink-site-theme";

function page(pref: string | null, blocked = false) {
  const dom = new JSDOM(html, { url: "https://primelink.test", runScripts: "outside-only", pretendToBeVisual: true });
  const { window } = dom;
  if (pref !== null) window.localStorage.setItem(key, pref);
  if (blocked) Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  window.eval(bootstrap);
  return {
    dom,
    window,
    theme: () => window.document.documentElement.getAttribute("data-theme"),
    themeColor: () => window.document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.content,
  };
}

for (const [pref, expected, color] of [
  [null, "light", "#fdfefe"],
  ["invalid", "light", "#fdfefe"],
  ["light", "light", "#fdfefe"],
  ["dark", "dark", "#0f131b"],
] as const) {
  const p = page(pref);
  assert.equal(p.theme(), expected);
  assert.equal(p.themeColor(), color);
  if (pref === "invalid") assert.equal(p.window.localStorage.getItem(key), null);
  p.window.close();
}

const blocked = page(null, true);
assert.equal(blocked.theme(), "light");
blocked.window.close();

const p = page(null);
const { window } = p;
Object.assign(globalThis, {
  window,
  document: window.document,
  HTMLElement: window.HTMLElement,
  HTMLInputElement: window.HTMLInputElement,
  Element: window.Element,
  Node: window.Node,
  DocumentFragment: window.DocumentFragment,
  CustomEvent: window.CustomEvent,
  MutationObserver: window.MutationObserver,
  getComputedStyle: window.getComputedStyle,
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
  IS_REACT_ACT_ENVIRONMENT: true,
});
Object.defineProperty(globalThis, "navigator", { configurable: true, value: window.navigator });
const { act } = await import("react");
const { createRoot } = await import("react-dom/client");
const { I18nextProvider } = await import("react-i18next");
const { default: ThemeControl } = await import("../src/components/ThemeControl");
const { getPref, setPref } = await import("../src/theme");
const i18n = createInstance();
await i18n.init({ lng: "hr", resources: {} });
const root = createRoot(document.getElementById("root")!);

try {
  await act(async () => root.render(<I18nextProvider i18n={i18n}><ThemeControl /></I18nextProvider>));
  const choices = () => Array.from(document.querySelectorAll<HTMLInputElement>('input[name="site-theme"]'));
  assert.deepEqual(choices().map((choice) => choice.value), ["light", "dark"]);
  assert.deepEqual(choices().map((choice) => choice.parentElement?.textContent?.trim()), ["Svijetla", "Tamna"]);
  assert.equal(choices()[0].checked, true);

  await act(async () => choices()[1].click());
  assert.equal(p.theme(), "dark");
  assert.equal(getPref(), "dark");
  assert.equal(window.localStorage.getItem(key), "dark");
  assert.equal(choices()[1].checked, true);
  const darkReload = page(window.localStorage.getItem(key));
  assert.equal(darkReload.theme(), "dark");
  darkReload.window.close();

  await act(async () => choices()[0].click());
  assert.equal(p.theme(), "light");
  assert.equal(getPref(), "light");
  assert.equal(window.localStorage.getItem(key), "light");
  assert.equal(choices()[0].checked, true);
  const lightReload = page(window.localStorage.getItem(key));
  assert.equal(lightReload.theme(), "light");
  lightReload.window.close();

  for (const pref of ["dark", "light", null] as const) {
    await act(async () => {
      if (pref === null) window.localStorage.clear();
      else window.localStorage.setItem(key, pref);
      window.dispatchEvent(new window.StorageEvent("storage", { key: pref === null ? null : key }));
    });
    assert.equal(p.theme(), pref ?? "light");
    assert.equal(getPref(), pref ?? "light");
  }

  await act(async () => setPref("dark"));
  assert.equal(document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.content, "#0f131b");
  await act(async () => i18n.changeLanguage("en"));
  assert.deepEqual(choices().map((choice) => choice.parentElement?.textContent?.trim()), ["Light", "Dark"]);
  console.log("PASS: pre-CSS light default, saved/invalid/blocked storage, explicit light/dark persistence, cross-tab sync, theme-color and accessible HR/EN control");
} finally {
  await act(async () => root.unmount());
  window.close();
}
