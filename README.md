# Steam store redesign (unofficial concept)

A portfolio case study that rethinks the Steam store. This project is not affiliated with or endorsed by Valve. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation.

## What's inside

- **Home:** featured games with trailer previews, discounts and events, discovery queue banner, categories, community recommendations and developers
- **Browse:** filters and sorting, with your choices saved in the link
- **Game pages:** trailer, screenshots, price, review totals, friends and similar games
- **Search:** opens with Ctrl/Cmd + K
- **Settings:** three sidebar styles and a choice of fonts
- **Responsive layouts** for phones and larger screens

## Built with

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Zod, Embla Carousel and OverlayScrollbars.

## Data

A saved snapshot of public Steam store data, with euro prices: 150 games, plus a separate list of upcoming games. Images and videos load from Steam's servers. Friends, player quotes, followed developers and deal labels are made up.

## Concept limits

There is no sign-in, cart or checkout. The wishlist resets on reload. The discovery queue and several other pages are not built yet.

## Run locally

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3300.
