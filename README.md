# Path to Self

An interactive anatomy of consciousness — explore the seven chakras through a
clickable human figure, with in-depth content on the psychology, physiology,
practices, stones, and relationships of each center.

Built with Vite, React, and TypeScript. Deploys to GitHub Pages on push to `main`.

## Features

- Standing line-art figure with the seven centers on the spine; click any center
  (or use the arrow keys) to explore it
- Eleven sections per chakra: psychological themes, developmental stage, shadow,
  somatics, nervous-system links, practices, yoga poses, mantras, crystals,
  related centers, and contemplation questions
- Icons follow the traditional symbols (petal counts and inner geometry)
- Journal — private per-chakra notes saved in the browser (localStorage)
- Library — a curated further-reading shelf
- About overlay with context and a gentle disclaimer

## Run locally

```sh
npm install
npm run dev
```

All content lives in `src/data/chakras.ts`.
