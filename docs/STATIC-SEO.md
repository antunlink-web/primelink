# Static metadata and 404 handoff

Run with Bun (verified with 1.3.14):

```sh
bun install --frozen-lockfile --registry=https://registry.npmjs.org
bun run build
bun run test:static
```

The build runs Vite, generates static entrypoints, then validates the output with
Bun's HTML parser. No browser, prerender service, new dependency, or SSR server is
required. `build:dev` uses the same generator and checks.

`src/data/seo.ts` contains the existing page Helmet values. Service metadata still
comes from `src/data/services.ts`. Both client Helmet and the build render the
same `Seo` component. Generated tags carry Helmet's ownership attributes so
client navigation can replace them, including removing 404 noindex tags when
navigating to a valid page. Page-specific JSON-LD remains in its existing Helmet.
The homepage title and description are unchanged; its OG description uses the
existing **Index.tsx Helmet** value, which differed from the old HTML template.
The stale homepage-only Twitter title/description were removed from the template;
Twitter can use each route's OG metadata. The Twitter card type is unchanged.

The public page bodies still mount with React and require JavaScript. The 404 body
is also rendered statically from the same component used by React, so its existing
message and home link work without JavaScript. There is no canonical or OG URL on
the 404 document.

## Build artifacts

- `dist/index.html` and `<route>/index.html`: the 12 sitemap routes.
- `dist/usluge/<slug>/index.html`: 10 known compatibility aliases, with destination
  metadata and the unchanged client redirect.
- `dist/404.html`: NotFound markup and `noindex, nofollow`.
- `dist/static-routes.json`: deterministic paths, files, legacy targets, dynamic
  compatibility pattern, router matching behavior, and required error status.
- `dist/static-routes.map`: nginx map entries preserving case-insensitive routes
  and trailing slashes. This file is inert until explicitly included by nginx.

Public routes:

```text
/
/izrada-web-stranica
/redizajn-web-stranice
/izrada-crm-sustava
/izrada-web-aplikacija
/stripe-integracije
/saas-razvoj
/ponuda
/ponuda/forma
/portfolio
/kontakt
/besplatna-seo-analiza
```

Compatibility entrypoints:

```text
/usluge/besplatna-seo-analiza
/usluge/izrada-crm-sustava
/usluge/izrada-web-aplikacija
/usluge/izrada-web-stranica
/usluge/kontakt
/usluge/ponuda
/usluge/portfolio
/usluge/redizajn-web-stranice
/usluge/saas-razvoj
/usluge/stripe-integracije
```

`App.tsx` also matches **any** `/usluge/:slug`, including unknown slugs; it replaces
the browser location with `/:slug`. This pattern cannot be exhaustively listed as
static files. Preserve it at the server using the redirect below. For example,
`/usluge/portfolio` reaches `/portfolio`, and `/usluge/missing` redirects to
`/missing`, which returns 404. `/usluge/ponuda/forma` does not match this pattern
and was never a valid route.

## Repository-owned Docker/nginx deployment

The root `Dockerfile`, `.dockerignore`, and `nginx.conf` are the complete build
inputs. No deployment overlays or external files are needed. The build stage
uses `oven/bun:1.4.2`, installs the repository `bun.lock` with frozen public npm
resolution, and runs the static build and validation. The `nginx:alpine` runtime
copies the resulting site and route map, listens on port 3000, and checks
`http://localhost:3000/` every 30 seconds (3-second timeout, 5-second start period,
3 retries). The image title and revision come from the Dockerfile labels and
`BUILD_COMMIT` argument. Runtime does not need environment variables or secrets.

For a future separately authorized deployment, run from this repository after
reviewing and committing the changes so the revision label identifies the inputs:

```sh
docker build --build-arg BUILD_COMMIT="$(git rev-parse HEAD)" -t primelink-hr:"$(git rev-parse --short HEAD)" .
docker run --rm --entrypoint nginx primelink-hr:"$(git rev-parse --short HEAD)" -t
docker run -d --name primelink-hr --restart unless-stopped -p 127.0.0.1:3000:3000 primelink-hr:"$(git rev-parse --short HEAD)"
```

These are examples for a free name/port, not commands to run against an existing
production container. Production replacement, proxy/network wiring, and rollback
remain a separate deployment task. Do not mount an old HTML overlay, nginx config,
route map, or site directory over the image. Rebuild/recreate the image when routes
change so HTML and the nginx map always come from the same build.

The config is included at HTTP scope by the stock nginx image. Its map uses a
nonempty missing-file sentinel. `try_files` checks mapped HTML first, then an
actual requested file, then returns 404. There is no directory check (`$uri/`)
or blanket SPA fallback. Thus `/portfolio`, `/portfolio/`, and `/PORTFOLIO` serve
the same generated HTML directly with status 200. Existing files such as
`robots.txt` and `sitemap.xml` remain accessible.

The case-insensitive legacy regex accepts exactly one slug, including trailing
slashes. `/usluge/portfolio` returns 302 to `/portfolio`;
`/usluge/nonexistent` returns 302 to `/nonexistent`, then 404. Redirects are
relative to avoid exposing port 3000 behind a proxy, and drop query strings as
the existing client Navigate does. Multiple-segment legacy paths return 404.

Unknown URLs and missing assets/fonts use internal `/404.html`, preserving HTTP
404 and `Cache-Control: no-cache`. Direct requests to `/404.html` also return 404.
Routes/HTML and the unhashed local Inter stylesheet use `no-cache`. Successful
`/assets/` and hashed Inter TTF responses use
`public, max-age=31536000, immutable`; misses do not inherit that policy. Gzip is
enabled for HTML, text, CSS, JavaScript, JSON, XML, and SVG with level 6 and a
1024-byte minimum. Exact parity with old production gzip/healthcheck settings was
not verified because external deployment files are outside the permitted scope.

`bun run build` and `bun run test:static` also check Docker inputs, exclusions,
nginx map/error/redirect/cache contracts, forbidden infrastructure identifiers,
and the generated 404 metadata. These lightweight static assertions do not replace
`nginx -t` and HTTP smoke tests of the eventual image. No nginx executable was
available in the local standard locations during this change; no Docker image
was built and production was not changed.

Local validation used Bun 1.3.14. Frozen installation, TypeScript checks,
changed-file lint, and static checks of the existing `dist` passed. A fresh
`bun run build` stalled before Vite output; a standalone asynchronous esbuild
transform also timed out. Fresh-build verification therefore remains outstanding,
as does validation with the Dockerfile's requested Bun 1.4.2 runtime.

The file-only routing and preserved error status follow nginx's
[try_files/error_page documentation](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
and [map documentation](https://nginx.org/en/docs/http/ngx_http_map_module.html).

## Scope and limitations

Source now self-hosts Inter (weights 400/500/700) through
`/vendor/fonts/inter.css`. The stylesheet and three font files in
`public/vendor/fonts/` were copied byte-for-byte from the verified local deployment
fonts. Static verification requires the local stylesheet on every generated page,
checks font bytes in `dist/vendor/fonts/`, and scans every generated file for
`fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net`, `lovable`,
`lovable-core-prod`, `pkg.dev`, `supabase.co`, `supabase.com`, `VITE_SUPABASE`, and
`@supabase/`. Visible "Supabase" portfolio/service copy is allowed, as is the
intentional `api.web3forms.com` form endpoint.

The old deployment-only index/font overlay must NOT override the repository
`index.html` on future builds. Deployment should build directly from the
repository's `index.html` and `bun.lock`, using the repository's local fonts.
The repository now owns the image configuration; applying it to production
remains a separate task.

The lockfile changes replace 35 cache URLs with public npm URLs and remove the
duplicate postcss workspace key. Package versions and integrity hashes are
unchanged. The obsolete binary `bun.lockb` was removed because it still contained
private cache references; `bun.lock` is the sole authoritative lockfile.

No route, form behavior, visible page content, image, or style was changed. Inter
keeps the same family and weights while loading from local files. Bundle
size and outdated Browserslist data warnings remain. No production HTTP behavior
changes until the separately authorized deployment/server configuration work.
