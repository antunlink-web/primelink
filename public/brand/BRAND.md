# Primelink AI — brand kit (tokens v3)

One brand for two products: the **chat app** and the **marketing site** (ai.primelink.hr).
Both keep an identical copy of this `brand/` folder. Change values here first, then copy the
folder into the other project, so they never drift.

## Files
| File | Use |
|---|---|
| `fonts.css` | `@font-face` for Inter (variable 100–900), local files only |
| `tokens.css` | All colours, type, radii, shadows, motion; light + dark |
| `fonts/` | Inter woff2 (latin + latin-ext → Croatian č ć đ š ž) and its OFL licence |
| `logo/primelink-logo.webp` | The actual Primelink logo. Do not redraw or recolour it |

Load order: `fonts.css`, `tokens.css`, then the project's own CSS.

## Rules
- **Font:** Inter only, from `fonts/`. No Google Fonts or other CDNs.
  Weights: 400 body, 500 UI labels/buttons, 600 headings, 700 sparingly.
- **Colour:** use `var(--pl-…)` tokens. Don't hard-code hex values in components.
  - Text: `--pl-text` body, `--pl-muted` secondary, `--pl-link` links/blue text,
    `--pl-danger-text` / `--pl-warning-text` / `--pl-success-text`
    for status text (on `--pl-warning-soft` / `--pl-success-soft` or any surface).
  - Buttons: primary = `--pl-primary` background, `--pl-primary-hover` on hover, `--pl-on-primary`
    text. Destructive = `--pl-danger` background with `--pl-on-primary` text. Primary buttons are
    **blue** in both products and both themes.
  - **Blue only. No teal or green** anywhere (decided by Antun, 2026-11-25). `--pl-teal` and
    `--pl-accent-text` still exist as names but resolve to blue; don't use them in new work.
  - Raw `--pl-blue` is for icons, lines, dots and illustrations only — never for body-size text.
  - `--pl-gradient` (blue to lighter blue) is only used where a screen already had it (the app's
    "Bok, Antune"). Don't add it to new headings without Antun's approval.
  - Every text token passes WCAG AA (4.5:1) on all five surfaces in its theme; `--pl-focus` is ≥ 3:1.
    If something new needs a colour that isn't here, add it to `tokens.css` (with a contrast
    check) rather than defining it locally in one project.
- **Themes:** light, dark, and "follow the device" (both products offer all three).
  **Default for a first visit is light** in both products, not "follow the device". Dark is enabled with `data-theme="dark"`
  (site) or `data-bs-theme="dark"` (app) on `<html>`. Every screen must be checked in both.
  Text contrast must meet WCAG AA in both themes.
- **Shape:** soft and rounded. Cards 12–20px, composer/large panels 20–23px, pills 999px.
- **Motion:** calm and short (180–340 ms, `--pl-ease`). Decorative only. Motion never pretends
  the AI is working. Under `prefers-reduced-motion`, large or fast motion is removed (rotation,
  travelling pulses, slides, parallax). Gentle motion stays: the brain's points twinkle softly and
  the business labels fade in and out one at a time (Antun's decision). The app's own "Smanjene
  animacije" setting still removes all motion inside the app.
- **Voice:** calm, precise, premium. Croatian interface text; short sentences; no hype.
- **Honesty:** features that aren't connected say so clearly ("Uskoro", "U sljedećoj fazi").
- **Hero animation:** the brain/knowledge-network animation may use a deeper charcoal stage
  (`#080a0c`) inside dark theme; it follows the page theme for light/dark.
