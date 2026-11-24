@~/Studio/ai-skills/templates/studio-web.md

## This project
- **What:** unofficial redesign concept of the Steam store, a portfolio case study. Not affiliated with Valve.
- **Stage:** home is built as layout A (sidebar, one lead game at a time (image left; badge on the image's top left; right: name, reviews, three landscape photos and the trailer in two columns, then "Next game" with image, title and a filling line, 5s, pausable; two columns in a padded card; left column is two rows: rounded image, then price on the right; no View game button, image and name are the links), player panels, tabs) with one pinned announcement banner (event art, pin icon; closing it leaves a megaphone in the top bar) on top, search at the top left and Steam's other sections as names in the top bar, sidebar and footer. Other screens are stubs (`[...slug]`). Swatches live at `/base`. Agree idea, content and layout as rough sketches the user can see before building any screen.
- **Dev server:** port **3300** (`pnpm dev`). 3000, 3001, 3100 and 3200 belong to other projects. Only one server for this folder.
- **Package manager:** pnpm. Checks: `pnpm lint`, `pnpm typecheck`.

## Must keep
- (Hidden for now at the user's request while building: RESTORE `<ConceptNotice />` in the layout before anything is published.) Visible "unofficial concept, not affiliated with Valve" notice on every page (`src/components/concept-notice.tsx`, text in `src/lib/legal.ts`) plus Valve's trademark line in the footer.
- `noindex` (layout metadata and `X-Robots-Tag` header). No lookalike domain.
- No working login or checkout, no forms that collect data.
- Neutral tone about the original store.
- Logo: official Valve artwork only, unmodified, with the ®, standing alone and small (Valve's rules forbid it as a primary or prominent feature). Rules: https://partner.steamgames.com/doc/marketing/branding
- Motiva Sans (Steam's font) is not bundled. Typeface: Red Hat Text (confirmed). `/settings` lets a visitor switch to Onest or Sofia Sans (`src/lib/font-setting.ts`, saved in localStorage).
- No decoration: no stickers, tape, dividers, selective colour or tinting.

## Where code goes
- `src/app/globals.css`: tokens read from the live store on 2026-11-24, each with where it is used. No raw hex in components.
- `src/data/palette.ts`: swatch labels for the starter page; keep in step with `globals.css`. `src/sections/base/`: the swatch page.
- `src/sections/home/`: home. `src/lib/catalog.ts`: the only game data source (Zod-checked `src/data/games.json`, a snapshot from `node scripts/fetch-games.mjs`; images load from Steam's CDN). `src/lib/announcement.ts`: the pinned strip.
- Logo: `public/brand/`, vector paths copied 1:1 from Valve's `steam_brandAssets.eps` (white version). Symbol in the closed sidebar and on phone, full logo with ® (50px high) when open.
- Nav: `src/components/site-nav/`, items in `src/lib/navigation.ts`. Sidebar opens and closes on desktop (names as tooltips when closed); phones get the bottom bar. The group lines in the sidebar are the user's choice.
- Icons: @tabler/icons-react, filled.
