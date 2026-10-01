import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";
import { legacyRoutePattern, legacyRoutes, notFoundSeo, pageSeo, type SeoMetadata } from "../src/data/seo";

const root = resolve(import.meta.dir, "..");
const read = (file: string) => readFile(resolve(root, file), "utf8");
// Parse source so comments, quote style, whitespace and import aliases do not
// determine whether a performance/toast contract passes.
function nodes(source: ts.SourceFile): ts.Node[] {
  const result: ts.Node[] = [];
  function visit(node: ts.Node) {
    result.push(node);
    ts.forEachChild(node, visit);
  }
  visit(source);
  return result;
}
const sourceFile = async (file: string) => ts.createSourceFile(file, await read(file), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function importedName(source: ts.SourceFile, moduleSuffix: string, exported: string) {
  for (const node of source.statements) {
    if (!ts.isImportDeclaration(node) || !ts.isStringLiteral(node.moduleSpecifier) || !node.moduleSpecifier.text.endsWith(moduleSuffix)) continue;
    const bindings = node.importClause?.namedBindings;
    if (bindings && ts.isNamedImports(bindings)) {
      const binding = bindings.elements.find((element) => (element.propertyName ?? element.name).text === exported);
      if (binding) return binding.name.text;
    }
  }
}
function mounted(source: ts.SourceFile, name: string | undefined) {
  return !!name && nodes(source).some((node) =>
    (ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(source) === name);
}
const app = await sourceFile("src/App.tsx");
for (const node of nodes(app)) {
  if (ts.isIdentifier(node)) {
    assert(!["QueryClient", "QueryClientProvider", "TooltipProvider"].includes(node.text), `App.tsx: unused global ${node.text} must not return`);
  }
  if (ts.isStringLiteralLike(node)) {
    assert(!/@tanstack\/react-query|(?:^|\/)ui\/(?:tooltip|toaster)$|@radix-ui\/react-(?:toast|tooltip)/.test(node.text), "App.tsx: React Query, global TooltipProvider and global Radix Toaster must remain absent");
  }
}
assert(mounted(app, importedName(app, "/ui/sonner", "Toaster")), "App.tsx: global Sonner toaster must remain imported and mounted");

const home = await sourceFile("src/components/HomeLeadForm.tsx");
const homeNodes = nodes(home);
assert(!homeNodes.some((node) => ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier) && /^zod(?:\/|$)/.test(node.moduleSpecifier.text)), "HomeLeadForm: Zod must not be statically imported");
assert(homeNodes.some((node) => ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword && node.arguments.some((arg) => ts.isStringLiteral(arg) && arg.text === "zod")), "HomeLeadForm: retain dynamic import of Zod");
for (const message of ["Unesite ime i prezime", "Neispravna e-mail adresa", "Provjerite unesene podatke."]) {
  assert(homeNodes.some((node) => ts.isStringLiteralLike(node) && node.text === message), `HomeLeadForm: preserve validation/error string "${message}"`);
}
const seoAudit = await sourceFile("src/pages/SeoAuditPage.tsx");
const useToast = importedName(seoAudit, "/use-toast", "useToast");
assert(useToast && nodes(seoAudit).some((node) => ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === useToast), "SeoAuditPage: retain the imported useToast hook and its call");
assert(mounted(seoAudit, importedName(seoAudit, "/ui/toaster", "Toaster")), "SeoAuditPage: Radix Toaster must remain imported and mounted for useToast");

const brokenLinkedIn = "linkedin.com/company/primelink-hr";
for (const directory of ["src", "public"]) {
  for (const file of await readdir(resolve(root, directory), { recursive: true, withFileTypes: true })) {
    if (!file.isFile()) continue;
    const path = resolve(file.parentPath, file.name);
    assert(!(await readFile(path, "utf8")).toLowerCase().includes(brokenLinkedIn), `${path}: invalid PrimeLink LinkedIn company URL must not return`);
  }
}
assert(!(await read("index.html")).toLowerCase().includes(brokenLinkedIn), "index.html: invalid PrimeLink LinkedIn company URL must not return");
assert(!(await readdir(root)).includes("bun.lockb"), "bun.lock must remain the sole authoritative Bun lockfile");
// Deployment contracts run during both build and test:static without Docker.
const dockerfile = await read("Dockerfile");
assert.match(dockerfile, /^FROM oven\/bun:1\.4\.2 AS build$/m);
assert.match(dockerfile, /^COPY package\.json bun\.lock \.\/$/m);
assert.match(dockerfile, /^RUN bun install --frozen-lockfile --registry=https:\/\/registry\.npmjs\.org$/m);
assert(dockerfile.indexOf("COPY package.json bun.lock ./") < dockerfile.indexOf("COPY . ."));
assert.match(dockerfile, /^RUN bun run build$/m);
assert.match(dockerfile, /^FROM nginx:alpine$/m);
assert.match(dockerfile, /^ARG BUILD_COMMIT$/m);
assert.match(dockerfile, /org\.opencontainers\.image\.title="primelink\.hr"/);
assert.match(dockerfile, /org\.opencontainers\.image\.revision="\$\{BUILD_COMMIT\}"/);
assert.match(dockerfile, /^COPY nginx\.conf \/etc\/nginx\/conf\.d\/default\.conf$/m);
assert.match(dockerfile, /^COPY --from=build \/app\/dist \/usr\/share\/nginx\/html$/m);
assert.match(dockerfile, /^COPY --from=build \/app\/dist\/static-routes\.map \/etc\/nginx\/primelink-static-routes\.map$/m);
assert.match(dockerfile, /^EXPOSE 3000$/m);
assert.match(dockerfile, /HEALTHCHECK[\s\S]*http:\/\/127\.0\.0\.1:3000\//);
assert(!/bun\.lockb|\.\.\/|deploy\/selfcontained/.test(dockerfile), "Docker must use only repository inputs");

const nginx = (await read("nginx.conf")).replace(/#.*$/gm, "");
assert.match(nginx, /map \$uri \$primelink_entrypoint\s*\{\s*default \/__primelink_no_static_route__;\s*include \/etc\/nginx\/primelink-static-routes\.map;\s*\}/);
assert(nginx.indexOf("map ") < nginx.indexOf("server {"), "Map belongs at HTTP scope");
assert.match(nginx, /listen 3000;/);
assert.match(nginx, /error_page 404 \/404\.html;/);
assert.match(nginx, /location = \/404\.html\s*\{\s*internal;\s*add_header Cache-Control "no-cache" always;\s*\}/);
assert.match(nginx, /location \/\s*\{\s*try_files \$primelink_entrypoint \$uri =404;\s*\}/);
assert(!/\/index\.html|rewrite\s|error_page\s+404\s+=/.test(nginx), "No blanket SPA fallback or successful error status");
for (const directive of nginx.matchAll(/try_files\s+([^;]+);/g)) {
  assert(["$uri =404", "$primelink_entrypoint $uri =404"].includes(directive[1]), "Only file checks ending in 404 are allowed");
}
assert.match(nginx, /location \^~ \/assets\/\s*\{\s*try_files \$uri =404;\s*add_header Cache-Control "public, max-age=31536000, immutable";\s*\}/);
assert.match(nginx, /location \/vendor\/fonts\/\s*\{\s*try_files \$uri =404;\s*\}/);
assert(nginx.includes('location ~ "^/vendor/fonts/inter-[a-f0-9]{12}\\.ttf$" {\n        try_files $uri =404;\n        add_header Cache-Control "public, max-age=31536000, immutable";'), "Only content-hashed fonts may use immutable caching");
assert.match(nginx, /add_header Cache-Control "no-cache" always;/);
const redirect = nginx.match(/location ~\* (\^\/usluge\/[^\s]+)\s*\{\s*return 302 \/\$1;\s*\}/);
assert(redirect, "Single-slug HTTP legacy redirect required");
const legacyRegex = new RegExp(redirect[1], "i");
for (const path of ["/usluge/portfolio", "/USLUGE/PORTFOLIO/", "/usluge/nonexistent"]) assert(legacyRegex.test(path));
for (const path of ["/usluge/", "/usluge/ponuda/forma"]) assert(!legacyRegex.test(path));

const ignore = (await read(".dockerignore")).trim().split(/\r?\n/).filter((line) => line && !line.startsWith("#"));
function ignored(path: string) {
  let result = false;
  for (const rule of ignore) {
    const negate = rule.startsWith("!");
    const pattern = negate ? rule.slice(1) : rule;
    if (new Bun.Glob(pattern).match(path) || path.split("/").some((part) => new Bun.Glob(pattern).match(part))) result = !negate;
  }
  return result;
}
for (const path of [".git/config", "node_modules/vite/index.js", "dist/index.html", ".env", ".env.local", "debug.log", ".DS_Store"]) assert(ignored(path), `Build context must exclude ${path}`);
for (const path of ["public/sitemap.xml", "public/vendor/fonts/inter.css", "public/vendor/fonts/inter-a699af1dea30.ttf", "scripts/generate-static.tsx", "scripts/check-static.ts", "src/data/seo.ts", "bun.lock", "package.json", "index.html", "Dockerfile", "nginx.conf"]) assert(!ignored(path), `Build context must include ${path}`);

const manifest = JSON.parse(await read("dist/static-routes.json"));
const sitemap = [...(await read("public/sitemap.xml")).matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => new URL(match[1]).pathname).sort();
assert.equal(sitemap.length, 12, "Preserve all 12 public sitemap routes");
assert.equal(legacyRoutes.length, 10, "Preserve all 10 compatibility entries");
assert.deepEqual(Object.keys(pageSeo).sort(), sitemap, "SEO routes must exactly match the sitemap");
assert.deepEqual(manifest.routes.map((route: { path: string }) => route.path), sitemap);

// Read the actual router declarations so a new route cannot silently miss generation.
const appRoutes: string[] = [];
function visit(node: ts.Node) {
  if (ts.isJsxAttribute(node) && node.name.getText(app) === "path" && node.initializer && ts.isStringLiteral(node.initializer)) {
    appRoutes.push(node.initializer.text);
  }
  ts.forEachChild(node, visit);
}
visit(app);
assert.deepEqual(appRoutes.sort(), [...sitemap, legacyRoutePattern, "*"].sort(), "App routes changed; update static generation");
assert.deepEqual(manifest.compatibilityRoutes.map(({ path, target }: { path: string; target: string }) => ({ path, target })), legacyRoutes);
assert.equal(manifest.compatibilityPatterns[0].path, legacyRoutePattern);

type Parsed = { values: Record<string, string[]>; assets: string[]; managed: number };
async function parse(file: string): Promise<Parsed> {
  const result: Parsed = { values: {}, assets: [], managed: 0 };
  const add = (key: string, value: string) => (result.values[key] ??= []).push(value);
  let title = "";
  await new HTMLRewriter()
    .on("head title", {
      element() { add("title", ""); title = ""; },
      text(chunk) {
        title += chunk.text;
        result.values.title[result.values.title.length - 1] = title;
      },
    })
    .on("head meta", { element(element) {
      const key = element.getAttribute("name") ?? element.getAttribute("property");
      if (key) add(key, element.getAttribute("content") ?? "");
    } })
    .on('head link[rel="canonical"]', { element(element) { add("canonical", element.getAttribute("href") ?? ""); } })
    .on("head [data-rh]", { element() { result.managed++; } })
    .on("script[src], link[href]", { element(element) {
      const url = element.getAttribute("src") ?? element.getAttribute("href");
      if (url?.startsWith("/")) result.assets.push(url);
    } })
    .transform(new Response(await read(`dist/${file}`))).text();
  return result;
}

const fields = {
  title: "title", description: "description", canonical: "canonical",
  ogTitle: "og:title", ogDescription: "og:description", ogUrl: "og:url", ogType: "og:type", robots: "robots",
} as const;
async function check(file: string, expected: SeoMetadata) {
  const parsed = await parse(file);
  for (const [field, tag] of Object.entries(fields)) {
    const value = expected[field as keyof SeoMetadata];
    assert.deepEqual(parsed.values[tag] ?? [], value ? [value] : [], `${file}: ${tag} (including duplicate/stale tags)`);
  }
  assert.equal(parsed.managed, Object.values(expected).filter(Boolean).length, `${file}: Helmet must own all route tags`);
  assert(parsed.assets.includes("/vendor/fonts/inter.css"), `${file}: missing local Inter stylesheet`);
  for (const asset of parsed.assets) {
    assert((await readFile(resolve(root, `dist${asset}`))).length > 0, `${file}: missing asset ${asset}`);
  }
  return parsed;
}
const titles = new Set<string>();
const descriptions = new Set<string>();
for (const { path, file } of manifest.routes) {
  const { values } = await check(file, pageSeo[path]);
  titles.add(values.title[0]);
  descriptions.add(values.description[0]);
}
assert.equal(titles.size, sitemap.length, "Every public title must be distinct");
assert.equal(descriptions.size, sitemap.length, "Every public description must be distinct");
for (const { target, file } of manifest.compatibilityRoutes) await check(file, pageSeo[target]);
await check("404.html", notFoundSeo);
assert.equal((await parse("404.html")).values.robots[0].replace(/\s/g, ""), "noindex,nofollow");
assert.equal((await parse("404.html")).values.canonical, undefined);
assert.match(await read("dist/404.html"), /Oops! Page not found/);
assert.match(await read("dist/404.html"), /Return to Home/);

const nginxMap = await read("dist/static-routes.map");
for (const { path, file } of [...manifest.routes, ...manifest.compatibilityRoutes]) {
  for (const variant of [path, path.toUpperCase(), `${path}/`]) {
    const mapping = nginxMap.trim().split("\n").find((line) => new RegExp(line.split(" ")[0].slice(2), "i").test(variant));
    assert.equal(mapping?.split(" ")[1], `/${file};`, `nginx route mapping: ${variant}`);
  }
}
for (const unknown of ["/nonexistent-audit-test", "/portfolio/unknown", "/ponuda/no-such-form"]) {
  assert(!nginxMap.trim().split("\n").some((line) => new RegExp(line.split(" ")[0].slice(2), "i").test(unknown)));
}

// Verify image bytes survive the build, including every existing portfolio image.
const hash = (data: Buffer) => createHash("sha256").update(data).digest("hex");
const assets = await readdir(resolve(root, "dist/assets"));
const assetHashes = new Set(await Promise.all(assets.map(async (file) => hash(await readFile(resolve(root, "dist/assets", file))))));
const portfolio = await readdir(resolve(root, "src/assets/projects"));
for (const file of portfolio) {
  assert(assetHashes.has(hash(await readFile(resolve(root, "src/assets/projects", file)))), `Missing/changed portfolio image: ${file}`);
}
for (const file of await readdir(resolve(root, "public"), { recursive: true, withFileTypes: true })) {
  if (!file.isFile()) continue;
  const source = resolve(file.parentPath, file.name);
  const target = source.replace(resolve(root, "public"), resolve(root, "dist"));
  assert.deepEqual(await readFile(target), await readFile(source), `Public asset changed: ${file.name}`);
}
assert(!/lovable|pkg\.dev/i.test(await read("bun.lock")), "Private cache infrastructure in lockfile");

// Match infrastructure identifiers, not visible portfolio/service copy such as "Supabase".
// api.web3forms.com is intentionally allowed.
const forbiddenReferences = [
  "fonts.googleapis.com", "fonts.gstatic.com", "cdn.jsdelivr.net", "lovable",
  "lovable-core-prod", "pkg.dev", "supabase.co", "supabase.com", "VITE_SUPABASE", "@supabase/",
];
for (const file of ["Dockerfile", "nginx.conf", "index.html", "bun.lock", "package.json", "public/vendor/fonts/inter.css"]) {
  const contents = (await read(file)).toLowerCase();
  for (const reference of forbiddenReferences) assert(!contents.includes(reference.toLowerCase()), `${file}: forbidden infrastructure reference ${reference}`);
}
for (const file of await readdir(resolve(root, "dist"), { recursive: true, withFileTypes: true })) {
  if (!file.isFile()) continue;
  const path = resolve(file.parentPath, file.name);
  const contents = (await readFile(path)).toString("utf8").toLowerCase();
  assert(!contents.includes(brokenLinkedIn), `${path}: invalid PrimeLink LinkedIn company URL must not return`);
  for (const reference of forbiddenReferences) {
    assert(!contents.includes(reference.toLowerCase()), `${path}: forbidden infrastructure reference ${reference}`);
  }
}

const fontCss = await read("public/vendor/fonts/inter.css");
const fontFiles = ["inter-a699af1dea30.ttf", "inter-e45972c7e9f2.ttf", "inter-6f49e1b28bce.ttf"];
assert.deepEqual([...fontCss.matchAll(/url\(([^)]+)\)/g)].map((match) => match[1]),
  fontFiles.map((file) => `/vendor/fonts/${file}`), "Inter must use only the local font files");
const fontFaces = [...fontCss.matchAll(/@font-face\s*\{([^}]+)\}/g)].map((match) => match[1]);
assert.equal(fontFaces.length, 3);
for (const [index, weight] of [400, 500, 700].entries()) {
  assert.match(fontFaces[index], /font-family:\s*'Inter'\s*;/);
  assert.match(fontFaces[index], new RegExp(`font-weight:\\s*${weight}\\s*;`));
  assert(fontFaces[index].includes(`/vendor/fonts/${fontFiles[index]}`));
}
for (const file of ["inter.css", ...fontFiles]) {
  const source = await readFile(resolve(root, "public/vendor/fonts", file));
  assert(source.length > 0, `Empty font asset: ${file}`);
  assert.deepEqual(await readFile(resolve(root, "dist/vendor/fonts", file)), source, `Font asset changed: ${file}`);
}
console.log(`PASS: ${sitemap.length} public routes, ${legacyRoutes.length} compatibility entries, raw metadata, 404, route maps, ${portfolio.length} portfolio images, all public assets, local Inter 400/500/700 and zero forbidden infrastructure references`);
console.log("PASS: repository Docker inputs, nginx routing/cache contracts, legacy redirects and Docker context exclusions (static checks; not a live nginx test)");
console.log("PASS: broken LinkedIn URL absent, lean App shell with Sonner, deferred homepage Zod and validation strings, SeoAudit useToast with mounted Radix Toaster");
