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

## Later nginx change — not applied by this work

Use the deployed build directory as the existing nginx `root`. Include the map at
**http** scope (replace `/PATH/TO/BUILT_SITE` with that actual directory):

```nginx
map $uri $primelink_entrypoint {
    default "";
    include /PATH/TO/BUILT_SITE/static-routes.map;
}
```

Within the existing site `server`, replace the blanket `/index.html` SPA fallback:

```nginx
error_page 404 /404.html;

# Preserve the full legacy pattern, including non-service and unknown slugs.
# A temporary server redirect retains its destination behavior without caching
# a new permanent redirect policy. Navigate currently drops query/hash data.
location ~* ^/usluge/([^/]+)/*$ {
    return 302 /$1;
}

location / {
    try_files $primelink_entrypoint $uri =404;
}

location = /404.html {
    internal;
}
```

The map resolves valid routes directly to their HTML files without directory
redirects. Existing files (assets, robots.txt, sitemap.xml, etc.) are then served
normally. Unknown paths reach `=404`, and `error_page` serves the error document
while keeping HTTP 404. Do not use `=200` or restore `/index.html` as the fallback.
Existing asset-specific locations must also keep file misses as 404. Place the
legacy regex before any competing regex location. Reload nginx whenever the
generated route map changes.

The legacy redirect moves from JavaScript replace-navigation to an HTTP 302 in
this future configuration; App.tsx itself is unchanged. The generic pattern
needs this server rule even though known aliases have generated files.

These directives follow nginx's [try_files/error_page documentation](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files)
and [map documentation](https://nginx.org/en/docs/http/ngx_http_map_module.html).
The existing deployment configuration was not inspected or changed. Validate the
integrated configuration with `nginx -t` during the separately authorized
deployment task, then check a public route, a static asset, a missing asset, an
unknown page, a known legacy alias, and an unknown legacy alias. Vite's dev/preview
server is not proof of production HTTP status behavior.

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
Deployment configuration itself is outside this task and must be changed
separately.

The lockfile changes replace 35 cache URLs with public npm URLs and remove the
duplicate postcss workspace key. Package versions and integrity hashes are
unchanged. The obsolete binary `bun.lockb` was removed because it still contained
private cache references; `bun.lock` is the sole authoritative lockfile.

No route, form behavior, visible page content, image, or style was changed. Inter
keeps the same family and weights while loading from local files. Bundle
size and outdated Browserslist data warnings remain. No production HTTP behavior
changes until the separately authorized deployment/server configuration work.
