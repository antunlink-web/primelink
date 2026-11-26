import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import ts from "typescript";
import sharp from "sharp";
import { legacyRoutePattern, legacyRoutes, notFoundSeo, pageSeo, type SeoMetadata } from "../src/data/seo";
import { sortPortfolioProjects } from "../src/data/portfolio-sort";

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
for (const language of ["hr", "en"]) {
  const locale = JSON.parse(await read(`src/i18n/locales/${language}.json`));
  for (const key of ["nameError", "emailError", "error", "failed", "reply", "serviceError"]) {
    assert(locale.approved[key], `Missing ${language} form message ${key}`);
    assert(homeNodes.some(node => ts.isStringLiteralLike(node) && node.text === `approved.${key}`), `Form must use translated ${key}`);
  }
}
const auditSource = await read("src/pages/SeoAuditPage.tsx");
assert(!auditSource.includes("SAMPLE_RESULT") && !auditSource.includes("/api/seo-audit"), "PrimeAudit must not return a simulated free audit");
assert(auditSource.includes("approved.auditText"), "PrimeAudit must display paid enquiry terms");

// Read portfolio entries as syntax, then use the same sorter that renders the page.
const portfolioSource = await sourceFile("src/pages/PortfolioPage.tsx");
const declarations = nodes(portfolioSource).filter(ts.isVariableDeclaration);
const portfolioData = declarations.find((node) => ts.isIdentifier(node.name) && node.name.text === "projectsData");
assert(portfolioData?.initializer && ts.isArrayLiteralExpression(portfolioData.initializer), "PortfolioPage: projectsData must be an array");
const sortedData = declarations.find((node) => ts.isIdentifier(node.name) && node.name.text === "sortedProjects");
const sorter = importedName(portfolioSource, "/data/portfolio-sort", "sortPortfolioProjects");
assert(sortedData?.initializer && ts.isCallExpression(sortedData.initializer) &&
  ts.isIdentifier(sortedData.initializer.expression) && sortedData.initializer.expression.text === sorter &&
  sortedData.initializer.arguments.length === 1 && ts.isIdentifier(sortedData.initializer.arguments[0]) &&
  sortedData.initializer.arguments[0].text === "projectsData", "PortfolioPage: render projects with the shared production sorter");
function projectField(project: ts.ObjectLiteralExpression, key: string) {
  const field = project.properties.find((property) => ts.isPropertyAssignment(property) &&
    (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) && property.name.text === key);
  return field && ts.isPropertyAssignment(field) ? field.initializer : undefined;
}
function stringField(project: ts.ObjectLiteralExpression, key: string) {
  const value = projectField(project, key);
  assert(value && ts.isStringLiteral(value), `PortfolioPage: ${key} must be a string literal`);
  return value.text;
}
function numberField(value: ts.Expression | undefined) {
  if (!value) return undefined;
  if (ts.isNumericLiteral(value)) return Number(value.text);
  assert(ts.isPrefixUnaryExpression(value) && value.operator === ts.SyntaxKind.MinusToken && ts.isNumericLiteral(value.operand), "PortfolioPage: sortOrder must be numeric");
  return -Number(value.operand.text);
}
const portfolioProjects = portfolioData.initializer.elements.map((element) => {
  assert(ts.isObjectLiteralExpression(element), "PortfolioPage: project must be an object");
  const pinned = projectField(element, "pinned");
  assert(!pinned || pinned.kind === ts.SyntaxKind.TrueKeyword || pinned.kind === ts.SyntaxKind.FalseKeyword, "PortfolioPage: pinned must be boolean");
  const completedAt = projectField(element, "completedAt");
  assert(!completedAt || ts.isStringLiteral(completedAt), "PortfolioPage: completedAt must be a string");
  const publishedAt = projectField(element, "publishedAt");
  assert(!publishedAt || ts.isStringLiteral(publishedAt), "PortfolioPage: publishedAt must be a string");
  return {
    id: stringField(element, "id"),
    name: stringField(element, "name"),
    url: stringField(element, "url"),
    image: projectField(element, "image"),
    descKey: stringField(element, "descKey"),
    industryKey: stringField(element, "industryKey"),
    pinned: pinned?.kind === ts.SyntaxKind.TrueKeyword,
    publishedAt: publishedAt?.text,
    completedAt: completedAt?.text,
    sortOrder: numberField(projectField(element, "sortOrder")),
  };
});
const luxuryProjects = portfolioProjects.filter((project) => new URL(project.url).hostname === "luxurysecondhand.hr");
assert.equal(luxuryProjects.length, 1, "Luxury Second Hand domain must appear exactly once in portfolio data");
assert.equal(luxuryProjects[0].id, "luxurysecondhand");
const luxuryImage = luxuryProjects[0].image;
assert(luxuryImage && ts.isIdentifier(luxuryImage), "Luxury Second Hand must use its imported screenshot");
assert(portfolioSource.statements.some((node) => ts.isImportDeclaration(node) &&
  node.importClause?.name?.text === luxuryImage.text && ts.isStringLiteral(node.moduleSpecifier) &&
  node.moduleSpecifier.text.endsWith("/assets/projects/luxurysecondhand-portfolio.webp")), "Luxury Second Hand screenshot import changed");
const portfolioDomains = sortPortfolioProjects(portfolioProjects).map((project) => new URL(project.url).hostname.toLowerCase());
const previousDomains = `luxurysecondhand.hr trazilica.hr chairs.hr hpc-spg.hr pingvinsport.com careflow.hr flowcall.eu lajt.hr flowsms.eu textro.eu mojakarta.hr perks.hr lumibaby.hr aurumgradnja.com tijelokaodioprirode.eu evaciglar.eu infinityservices.hr prika.hr protekst.eu udrugalumen.hr yogawithnika.eu dadathlon.eu daddyhood.eu donatice.eu controlmaster.hr arks.hr euroratan.com xiiigimnazija.hr`.split(" ");
assert.equal(portfolioDomains.length, 34, "34 public project cards including Alpha Medical, Iskra Svjetlosti, Jedra, Livia, Maratea and U Procesu");
assert.equal(new Set(portfolioDomains).size, portfolioDomains.length, "Portfolio domains must be unique");
assert.equal(new Set(portfolioProjects.map((project) => project.id)).size, portfolioProjects.length, "Portfolio card IDs must be unique");
assert.deepEqual(portfolioDomains.slice(0, 8), ["luxurysecondhand.hr", "trazilica.hr", "chairs.hr", "alpha-medical.hr", "iskrasvjetlosti.hr", "jedra.hr", "livia.hr", "maratea.hr"], "Preserve the first eight positions");
assert.deepEqual(portfolioDomains.filter((domain) => !["alpha-medical.hr", "iskrasvjetlosti.hr", "jedra.hr", "livia.hr", "maratea.hr", "uprocesu.com"].includes(domain)), previousDomains, "Preserve every retained portfolio domain and its relative order");
assert(!portfolioDomains.includes("airwolthvacelectric.hr"), "Airwolt must be absent from the public portfolio");
for (const domain of ["konzalting.primelink.hr", "voltapp.hr"]) {
  assert(!portfolioDomains.includes(domain), `${domain} must be absent from the public portfolio`);
}
assert(!portfolioProjects.some((project) => /motokaj/i.test(`${project.id} ${project.name} ${project.url}`)), "Motokaj must remain absent from the public portfolio");

// A future addition cannot overtake the reserved projects even with a pin,
// newer dates, an earlier declaration or a lower manual sort order.
const futureProject = { id: "future-project", pinned: true, publishedAt: "2099-01-01", sortOrder: -100 };
const adversarialProjects = [futureProject, ...portfolioProjects.slice().reverse().map((project) => ({
  ...project,
  completedAt: project.id === "chairs" ? "2099-12-31" : project.completedAt,
}))];
const inputSnapshot = adversarialProjects.map((project) => ({ ...project }));
assert.deepEqual(sortPortfolioProjects(adversarialProjects).slice(0, 3).map((project) => project.id),
  ["luxurysecondhand", "trazilica", "chairs"], "Dates, pins and declaration order cannot displace the reserved three");
assert.deepEqual(adversarialProjects, inputSnapshot, "Sorting must not mutate project data");
assert.deepEqual(sortPortfolioProjects([
  { id: "published", publishedAt: "2026-10-17", completedAt: "2020-01-01" },
  { id: "legacy", completedAt: "2026-09-01" },
  { id: "unknown" },
]).map((project) => project.id), ["published", "legacy", "unknown"], "Publication date takes precedence over legacy completion date");
assert.deepEqual(sortPortfolioProjects([
  { id: "first", publishedAt: "2026-10-17" },
  { id: "second", publishedAt: "2026-10-17" },
]).map((project) => project.id), ["first", "second"], "Equal publication dates preserve declaration order");

const alphaMedicalProjects = portfolioProjects.filter((project) => project.id === "alphamedical");
assert.equal(alphaMedicalProjects.length, 1, "Publish Alpha Medical exactly once");
const alphaMedical = alphaMedicalProjects[0];
assert.equal(alphaMedical.url, "https://alpha-medical.hr/");
assert.equal(alphaMedical.name, "ALPHA-MEDICAL d.o.o.");
assert.equal(alphaMedical.descKey, "portfolio.alphamedical.description");
assert.equal(alphaMedical.industryKey, "portfolio.alphamedical.industry");
assert.equal(alphaMedical.completedAt, undefined, "Alpha Medical project completion date is unknown");
assert.equal(alphaMedical.publishedAt, "2026-10-17", "Date Alpha Medical was added to this local portfolio");
assert(!alphaMedical.pinned && alphaMedical.sortOrder === undefined, "Use chronology, not a manual Alpha Medical pin or order");
assert.equal(portfolioDomains.indexOf("alpha-medical.hr"), 3, "Alpha Medical follows the reserved three at #4");
const iskraProjects = portfolioProjects.filter((project) => project.id === "iskrasvjetlosti");
assert.equal(iskraProjects.length, 1, "Publish Iskra Svjetlosti exactly once");
const iskra = iskraProjects[0];
assert.equal(iskra.url, "https://iskrasvjetlosti.hr/");
assert.equal(iskra.name, "Udruga Iskra Svjetlosti");
assert.equal(iskra.descKey, "portfolio.iskrasvjetlosti.description");
assert.equal(iskra.industryKey, "portfolio.iskrasvjetlosti.industry");
assert.equal(iskra.completedAt, undefined, "Iskra website completion date is unknown");
assert.equal(iskra.publishedAt, "2026-10-17", "Iskra portfolio publication date");
assert(!iskra.pinned && iskra.sortOrder === undefined, "Use stable publication ordering without a manual Iskra pin or order");
assert.equal(portfolioDomains.indexOf("iskrasvjetlosti.hr"), 4, "Iskra follows Alpha Medical at #5 for the same publication date");
const jedraProjects = portfolioProjects.filter((project) => project.id === "jedra");
assert.equal(jedraProjects.length, 1, "Publish Jedra exactly once");
const jedra = jedraProjects[0];
assert.equal(jedra.url, "https://jedra.hr/");
assert.equal(jedra.name, "Jedra.hr");
assert.equal(jedra.descKey, "portfolio.jedra.description");
assert.equal(jedra.industryKey, "portfolio.jedra.industry");
assert.equal(jedra.completedAt, undefined, "Jedra website completion date is unknown");
assert.equal(jedra.publishedAt, "2026-10-17", "Jedra portfolio publication date");
assert(!jedra.pinned && jedra.sortOrder === undefined, "Use stable publication ordering without a manual Jedra pin or order");
assert.equal(portfolioDomains.indexOf("jedra.hr"), 5, "Jedra follows Iskra Svjetlosti at #6 for the same publication date");
const liviaProjects = portfolioProjects.filter((project) => project.id === "livia");
assert.equal(liviaProjects.length, 1, "Publish Livia exactly once");
const livia = liviaProjects[0];
assert.equal(livia.url, "https://livia.hr/");
assert.equal(livia.name, "Livia.hr");
assert.equal(livia.descKey, "portfolio.livia.description");
assert.equal(livia.industryKey, "portfolio.livia.industry");
assert.equal(livia.completedAt, undefined, "Livia website completion date is unknown");
assert.equal(livia.publishedAt, "2026-10-17", "Livia portfolio publication date");
assert(!livia.pinned && livia.sortOrder === undefined, "Use stable publication ordering without a manual Livia pin or order");
assert.equal(portfolioDomains.indexOf("livia.hr"), 6, "Livia follows Jedra at #7 for the same publication date");
const marateaProjects = portfolioProjects.filter((project) => project.id === "maratea");
assert.equal(marateaProjects.length, 1, "Publish Maratea exactly once");
const maratea = marateaProjects[0];
assert.equal(maratea.url, "https://maratea.hr/");
assert.equal(maratea.name, "Maratea.hr");
assert.equal(maratea.descKey, "portfolio.maratea.description");
assert.equal(maratea.industryKey, "portfolio.maratea.industry");
assert.equal(maratea.completedAt, undefined, "Maratea website completion date is unknown");
assert.equal(maratea.publishedAt, "2026-10-17", "Maratea portfolio publication date");
assert(!maratea.pinned && maratea.sortOrder === undefined, "Use stable publication ordering without a manual Maratea pin or order");
assert.equal(portfolioDomains.indexOf("maratea.hr"), 7, "Maratea follows Livia at #8 for the same publication date");
const uprocesuProjects = portfolioProjects.filter((project) => project.id === "uprocesu");
assert.equal(uprocesuProjects.length, 1, "Publish U Procesu exactly once");
const uprocesu = uprocesuProjects[0];
assert.equal(uprocesu.url, "https://uprocesu.com/");
assert.equal(uprocesu.name, "U Procesu");
assert.equal(uprocesu.descKey, "portfolio.uprocesu.description");
assert.equal(uprocesu.industryKey, "portfolio.uprocesu.industry");
assert.equal(uprocesu.completedAt, undefined, "U Procesu website completion date is unknown");
assert.equal(uprocesu.publishedAt, "2026-10-17", "U Procesu portfolio publication date");
assert(!uprocesu.pinned && uprocesu.sortOrder === undefined, "Use stable publication ordering without a manual U Procesu pin or order");
assert.equal(portfolioDomains.indexOf("uprocesu.com"), 8, "U Procesu follows Maratea at #9 for the same publication date");
const chronologicalProjects = sortPortfolioProjects(portfolioProjects).filter((project) =>
  !["luxurysecondhand", "trazilica", "chairs"].includes(project.id));
for (let index = 1; index < chronologicalProjects.length; index++) {
  const previousDate = chronologicalProjects[index - 1].publishedAt ?? chronologicalProjects[index - 1].completedAt;
  const currentDate = chronologicalProjects[index].publishedAt ?? chronologicalProjects[index].completedAt;
  assert(!currentDate || (previousDate && previousDate >= currentDate), "Remaining projects must be newest first, then undated entries");
}

// Validate both locales without i18next's fallback masking missing keys.
for (const locale of ["hr", "en"]) {
  const translations = JSON.parse(await read(`src/i18n/locales/${locale}.json`));
  for (const project of portfolioProjects) {
    for (const key of [project.descKey, project.industryKey]) {
      const value = key.split(".").reduce((entry, part) => entry?.[part], translations);
      assert(typeof value === "string" && value.trim(), `${locale}: missing translation ${key}`);
    }
  }
  assert(!("airwolt" in translations.portfolio), `${locale}: remove unused Airwolt portfolio copy`);
  for (const id of ["konzaltingprimelink", "voltapp"]) {
    assert(!(id in translations.portfolio), `${locale}: remove unused ${id} portfolio copy`);
  }
}
for (const project of portfolioProjects) {
  const image = project.image;
  assert(image && ts.isIdentifier(image), `${project.id}: use an imported screenshot`);
  const declaration = portfolioSource.statements.find((node) => ts.isImportDeclaration(node) && node.importClause?.name?.text === image.text);
  assert(declaration && ts.isImportDeclaration(declaration) && ts.isStringLiteral(declaration.moduleSpecifier), `${project.id}: screenshot import missing`);
  const imagePath = resolve(root, declaration.moduleSpecifier.text.replace(/^@\//, "src/"));
  const metadata = await sharp(imagePath).metadata();
  assert.equal(metadata.format, "webp", `${project.id}: screenshot must be WebP`);
  assert.equal(metadata.width, 1440, `${project.id}: screenshot width`);
  assert.equal(metadata.height, 900, `${project.id}: screenshot height`);
  // Decode the pixels as well as the header to reject truncated/corrupt WebPs.
  await sharp(imagePath).raw().toBuffer();
  if (project.id === "alphamedical") {
    assert(declaration.moduleSpecifier.text.endsWith("/assets/projects/alpha-medical-portfolio.webp"), "Alpha Medical must use its authentic screenshot asset");
    assert((await readFile(imagePath)).length < 200_000, "Keep the Alpha Medical screenshot optimized below 200 kB");
  }
  if (project.id === "iskrasvjetlosti") {
    assert(declaration.moduleSpecifier.text.endsWith("/assets/projects/iskra-svjetlosti-portfolio.webp"), "Iskra must use its authentic screenshot asset");
    assert((await readFile(imagePath)).length < 200_000, "Keep the Iskra screenshot optimized below 200 kB");
  }
  if (project.id === "jedra") {
    assert(declaration.moduleSpecifier.text.endsWith("/assets/projects/jedra-portfolio.webp"), "Jedra must use its authentic screenshot asset");
    assert((await readFile(imagePath)).length < 200_000, "Keep the Jedra screenshot optimized below 200 kB");
  }
  if (project.id === "livia") {
    assert(declaration.moduleSpecifier.text.endsWith("/assets/projects/livia-portfolio.webp"), "Livia must use its authentic screenshot asset");
    assert((await readFile(imagePath)).length < 200_000, "Keep the Livia screenshot optimized below 200 kB");
  }
  if (project.id === "maratea") {
    assert(declaration.moduleSpecifier.text.endsWith("/assets/projects/maratea-portfolio.webp"), "Maratea must use its authentic screenshot asset");
    assert((await readFile(imagePath)).length < 200_000, "Keep the Maratea screenshot optimized below 200 kB");
  }
  if (project.id === "uprocesu") {
    assert(declaration.moduleSpecifier.text.endsWith("/assets/projects/uprocesu-portfolio.webp"), "U Procesu must use its authentic screenshot asset");
    assert((await readFile(imagePath)).length < 200_000, "Keep the U Procesu screenshot optimized below 200 kB");
  }
}

const portfolioSuccess = "PASS: 34 unique portfolio cards and domains; Luxury Second Hand #1, Trazilica #2, chairs #3, Alpha Medical #4, Iskra Svjetlosti #5, Jedra #6, Livia #7, Maratea #8, U Procesu #9; stable publication ordering; Airwolt and Motokaj absent; retained order, URLs and HR/EN keys preserved; all 1440x900 WebPs decoded";
// Source-only checks allow portfolio updates to be verified without rebuilding dist.
if (process.argv.includes("--portfolio-only")) {
  console.log(portfolioSuccess);
  process.exit(0);
}

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
assert.equal(sitemap.length, 15, "Preserve existing routes and add webshop/hosting routes");
assert.equal(legacyRoutes.length, 13, "Preserve compatibility entries including new service routes");
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
console.log("PASS: broken LinkedIn URL absent, lean App shell with Sonner, deferred homepage Zod, translated validation messages and paid PrimeAudit enquiry");
console.log(portfolioSuccess);
