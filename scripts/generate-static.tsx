import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { Seo } from "../src/components/Seo";
import { NotFoundContent } from "../src/components/NotFoundContent";
import { legacyRoutePattern, legacyRoutes, notFoundSeo, pageSeo, type SeoMetadata } from "../src/data/seo";

const dist = resolve(import.meta.dir, "../dist");
const template = await readFile(resolve(dist, "index.html"), "utf8");
const slot = /<!-- route-seo:start -->[\s\S]*?<!-- route-seo:end -->/g;
if ([...template.matchAll(slot)].length !== 1) {
  throw new Error("Expected exactly one route-seo slot in the Vite HTML output");
}

function htmlFor(metadata: SeoMetadata) {
  const context = {} as { helmet: HelmetServerState };
  renderToStaticMarkup(<HelmetProvider context={context}><Seo metadata={metadata} /></HelmetProvider>);
  const { title, meta, link } = context.helmet;
  // Helmet's data-rh attributes let client navigation replace/remove these tags.
  const head = [title, meta, link].map((tag) => tag.toString()).join("\n    ");
  return template.replace(slot, () => `<!-- route-seo:start -->\n    ${head}\n    <!-- route-seo:end -->`);
}

function entrypoint(route: string) {
  if (!/^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/.test(route)) {
    throw new Error(`Unsafe static route: ${route}`);
  }
  return route === "/" ? "index.html" : `${route.slice(1)}/index.html`;
}

async function writeEntry(file: string, html: string) {
  const destination = resolve(dist, file);
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html);
}

const routes = Object.keys(pageSeo).sort().map((path) => ({ path, file: entrypoint(path) }));
for (const route of routes) {
  await writeEntry(route.file, htmlFor(pageSeo[route.path]));
}
const compatibilityRoutes = legacyRoutes.map((route) => ({ ...route, file: entrypoint(route.path) }));
for (const route of compatibilityRoutes) {
  // Keep App.tsx's Navigate behavior; canonical metadata describes the destination.
  await writeEntry(route.file, htmlFor(pageSeo[route.target]));
}
const notFound = htmlFor(notFoundSeo).replace(
  '<div id="root"></div>',
  () => `<div id="root">${renderToStaticMarkup(<NotFoundContent />)}</div>`,
);
await writeEntry("404.html", notFound);
await writeEntry("static-routes.json", JSON.stringify({
  version: 1,
  routes,
  compatibilityRoutes,
  compatibilityPatterns: [{
    path: legacyRoutePattern,
    target: "/:slug",
    behavior: "Client replace-navigation; preserve arbitrary single-slug redirects in the web server when removing SPA fallback.",
  }],
  routerMatching: "React Router is case-insensitive and accepts trailing slashes; preserve these aliases in the web server.",
  notFound: { file: "404.html", status: 404 },
}, null, 2) + "\n");
// Include these entries inside an nginx http-level map; this is only a build artifact.
await writeEntry("static-routes.map", [...routes, ...compatibilityRoutes].map(({ path, file }) =>
  `~*^${path === "/" ? "/+" : `${path}/*`}$ /${file};`,
).join("\n") + "\n");
console.log(`Generated ${routes.length} public routes, ${compatibilityRoutes.length} compatibility entrypoints, 404.html and route manifests`);
