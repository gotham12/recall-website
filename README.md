# Recall — Marketing Website

Premium landing page for [Recall](https://almightytamer.github.io/recall/) — AI-native cognitive care.

**Live site:** [https://gotham12.github.io/recall-website/](https://gotham12.github.io/recall-website/)

## UI components

All interactive UI is installed from premium shadcn registries:

- [React Bits](https://reactbits.dev/) — text, scroll, and card animations
- [Vengeance UI](https://www.vengenceui.com/) — navbar, hero rays, bento grids, buttons, footer
- [Skiper UI](https://skiper-ui.com/) — registry configured (premium CLI components)
- [Animmaster Lib](https://animmasterlib.dev/) — referenced in footer (paid bundle, no public registry)

Install more components:

```bash
npx shadcn@latest add @react-bits/BlurText-TS-TW
npx shadcn@latest add @vengeanceui/spotlight-navbar
```

## Develop

```bash
npm install
npm run dev
```

Local dev uses the `/recall-website` base path to match GitHub Pages.

## Deploy (GitHub Pages)

Pushes to `main` deploy automatically via [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).

One-time setup in the GitHub repo:

1. **Settings → Pages**
2. **Build and deployment → Source:** GitHub Actions

Manual deploy: push to `main`, or run the **Deploy to GitHub Pages** workflow from the Actions tab.

## Screenshots

Place app screenshots in `public/screenshots/`:

- `patient-today.png`, `patient-clara.png`, `patient-meds.png`, `patient-people.png`, `patient-routine.png`
- `supervisor-overview.png`, `supervisor-recall-ai.png`, `supervisor-insights.png`
