# instant-nav rig: Next16 Commerce

- BUILD: `DATABASE_URL=<seeded PostgreSQL URL> NEXT_TESTING_API=1 pnpm build`
- EXPOSE: `NEXT_TESTING_API=1` enables `experimental.exposeTestingApiInProductionBuild` during the test build only.
- RUN: `DATABASE_URL=<same URL> pnpm test:e2e`; Playwright starts `next start` on `http://127.0.0.1:3100`.
- TEST USER: public; no authentication. State: the default `prisma/seed.ts` product and category data.
- DRIFT: none known.
- CONTRACTS: `/all` Next → `/all?page=2`, page 2 Previous → `/all`, and `/all` Audio hover → `/all?category=Audio`. The destination product list is ready before the click completes. Pagination prefetches in the viewport; categories prefetch on hover or focus.
- LOOP: seed PostgreSQL → `pnpm test:e2e` → edit → repeat. Agent limits: a seeded `DATABASE_URL` must be available.
- LIVENESS: n/a; local production build and start.
- WALLS: The app has no database fallback. Point `DATABASE_URL` at an isolated seeded PostgreSQL database before building or running tests.
