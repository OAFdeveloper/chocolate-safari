# Chocolate Safari

A Next.js tasting catalogue for discovering chocolates — dark cocoa UI, brass accents, AI Sommelier stub, and Git-based JSON content.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- shadcn/ui primitives
- Zod-validated JSON content in `/content` (no hosted CMS keys)

## Develop

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43127](http://127.0.0.1:43127).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server on port **43127** |
| `npm run build` | Production build |
| `npm run start` | Start production server (port 43127) |
| `npm run lint` | ESLint |

## Content editing

Catalogue and landing copy live in `/content`:

- `content/site-settings.json` — hero, stats, nav, sommelier, footer
- `content/chocolates/*.json` — chocolate catalogue

See [`content/README.md`](content/README.md).

## Routes

| Path | Notes |
| --- | --- |
| `/` | Landing page (design sections) |
| `/explore` | Search / tag / country / sort |
| `/chocolates/[slug]` | Detail pages |
| `/sommelier` | Full sommelier chat stub |
| `/reviews`, `/collections`, `/guides`, `/community` | Coming-soon stubs |
| `/api/newsletter`, `/api/sommelier` | Stub APIs |

## Out of scope (MVP)

Real LLM recommendations, auth/synced tasting logs, reviews CRUD, rankings, commerce.
