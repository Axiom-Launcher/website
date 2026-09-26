# Axiom Website

The public-facing product website for Axiom, a modern Minecraft launcher and game ecosystem. The site introduces the launcher, content discovery, server browsing, community programs, Premium, privacy principles, and legal resources.

This repository is private and contains frontend source code only. Authentication, payments, reward calculations, and other sensitive business logic must remain in a trusted backend.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Local setup

```bash
git clone https://github.com/Axiom-Launcher/website.git
cd website
npm ci
cp .env.example .env.local
npm run dev
```

Vite prints the local development URL after startup.

## Commands

```bash
npm run dev       # Start the development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
npm run lint      # Run Oxlint
npm run check     # Run lint and a production build
```

## Environment variables

Only variables prefixed with `VITE_` are exposed to browser code. They must never contain secrets.

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Future public API base URL |
| `VITE_RELEASES_URL` | Future launcher release endpoint |
| `VITE_STATUS_URL` | Future service status URL |

Copy `.env.example` to `.env.local` for local development. Real `.env` files are ignored by Git.

## Project structure

```text
src/
├── components/   # Shared UI primitives
├── config/       # Validated public runtime configuration
├── data/         # Replaceable catalog, server, and program fixtures
├── services/     # Future API integration boundary
├── App.jsx       # Page composition and application shell
├── App.css       # Responsive component styles
├── index.css     # Global design tokens and resets
└── main.jsx      # React application entry point
```

Catalog and server content currently use mock data separated from rendering logic. Replace those sources with functions from `src/services/api.js` when backend endpoints are available.

## Security notes

- Never commit secrets, credentials, access tokens, or real `.env` files.
- Treat every `VITE_*` value as public because Vite embeds it in the browser bundle.
- Keep authentication secrets, payment credentials, fraud controls, and private program logic on the backend.
- Final privacy and legal language requires appropriate review before public launch.

## Deployment

`npm run build` produces a static site in `dist/`. It can be deployed to any static host with SPA fallback configured to serve `index.html`. Store deployment credentials in the platform's encrypted secret manager, not this repository.

GitHub Actions runs linting and a production build for every pull request and push to `main`. Deployment is intentionally not enabled until a hosting platform and its private credentials are selected.
