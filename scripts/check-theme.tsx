// Offline DOM checks. Like check-portfolio-dom.tsx, accepts an external JSDOM_MODULE.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createInstance } from "i18next";

const { JSDOM } = await import(process.env.JSDOM_MODULE || "jsdom");
const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const bootstrap = html.match(/<script>\s*([\s\S]*?)<\/script>/)?.[1];
assert(bootstrap);
assert(html.indexOf(bootstrap) < html.indexOf('/brand/fonts.css'));
assert(html.indexOf('/brand/fonts.css') < html.indexOf('/brand/tokens.css'));
const key = "primelink-site-theme";

function page(pref: string | null, dark = true, blocked = false) {
  const dom = new JSDOM(html, { url: "https://primelink.test", runScripts: "outside-only", pretendToBeVisual: true });
  const { window } = dom;
  const mq = new window.EventTarget();
  Object.assign(mq, { matches: dark });
  window.matchMedia = () => mq;
  if (pref !== null) window.localStorage.setItem(key, pref);
  if (blocked) Object.defineProperty(window, "localStorage", { get() { throw new Error("Storage blocked"); } });
  window.eval(bootstrap);
  return {
    dom, window,
    theme: () => window.document.documentElement.getAttribute("data-theme"),
    device(value: boolean) {
      Object.assign(mq, { matches: value });
      mq.dispatchEvent(new window.Event("change"));
    },
  };
}

for (const [pref, dark, expected] of [
  [null, true, "light"], [null, false, "light"], ["invalid", true, "light"],
  ["light", true, "light"], ["dark", false, "dark"],
  ["system", true, "dark"], ["system", false, "light"],
] as const) {
  const p = page(pref, dark);
  assert.equal(p.theme(), expected);
  p.device(!dark);
  assert.equal(p.theme(), pref === "system" ? (dark ? "light" : "dark") : expected);
  p.window.close();
}
const blocked = page(null, true, true);
assert.equal(blocked.theme(), "light");
blocked.window.close();

const p = page(null);
const { window } = p;
Object.assign(globalThis, {
  window, document: window.document, HTMLElement: window.HTMLElement, Element: window.Element,
  Node: window.Node, DocumentFragment: window.DocumentFragment, CustomEvent: window.CustomEvent,
  MutationObserver: window.MutationObserver, getComputedStyle: window.getComputedStyle,
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window), IS_REACT_ACT_ENVIRONMENT: true,
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
  const trigger = () => document.querySelector<HTMLButtonElement>('button[aria-haspopup="menu"]')!;
  assert.match(trigger().getAttribute("aria-label")!, /Svijetla/);
  await act(async () => trigger().dispatchEvent(new window.KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
  const choices = Array.from(document.querySelectorAll<HTMLElement>('[role="menuitemradio"]'));
  assert.deepEqual(choices.map((choice) => choice.textContent), ["Prema uređaju", "Svijetla", "Tamna"]);
  await act(async () => choices[2].click());
  assert.equal(p.theme(), "dark");
  assert.equal(getPref(), "dark");
  assert.equal(window.localStorage.getItem(key), "dark");
  assert.match(trigger().getAttribute("aria-label")!, /Tamna/);
  const reload = page(window.localStorage.getItem(key), false);
  assert.equal(reload.theme(), "dark");
  reload.window.close();

  await act(async () => setPref("system"));
  assert.equal(window.localStorage.getItem(key), "system");
  await act(async () => p.device(false));
  assert.equal(p.theme(), "light");
  await act(async () => p.device(true));
  assert.equal(p.theme(), "dark");
  assert.match(trigger().getAttribute("aria-label")!, /Prema uređaju/);
  await act(async () => setPref("light"));
  await act(async () => p.device(true));
  assert.equal(p.theme(), "light");
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) assert.equal(meta.getAttribute("content"), "#fdfefe");

  // Browser storage events arrive after another tab has changed the shared storage.
  for (const pref of ["dark", "system", null]) {
    await act(async () => {
      if (pref === null) window.localStorage.clear();
      else window.localStorage.setItem(key, pref);
      window.dispatchEvent(new window.StorageEvent("storage", { key: pref === null ? null : key }));
    });
    assert.equal(p.theme(), pref === null ? "light" : "dark");
    assert.equal(getPref(), pref ?? "light");
  }
  await act(async () => i18n.changeLanguage("en"));
  assert.equal(trigger().getAttribute("aria-label"), "Site theme: Light");
  console.log("PASS: pre-CSS light default, saved/invalid/blocked storage, dark/system/device changes, persistence, cross-tab sync, theme-color and accessible HR/EN control");
} finally {
  await act(async () => root.unmount());
  window.close();
}
