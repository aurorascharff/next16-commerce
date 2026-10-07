# instant-nav rig: Next16 Commerce

- BUILD: `DATABASE_URL=<seeded PostgreSQL URL> NEXT_TESTING_API=1 pnpm build`
- EXPOSE: `NEXT_TESTING_API=1` enables `experimental.exposeTestingApiInProductionBuild` during the test build only.
- RUN: `DATABASE_URL=<same URL> pnpm test:e2e`; Playwright starts `next start` on `http://127.0.0.1:3100`.
- TEST USER: public for most routes; `/user` uses the seeded Jane Smith account cookie. State: the default `prisma/seed.ts` product, category, and account data.
- DRIFT: none known.
- CONTRACTS: each public route has a focused click-driven test. `/`, `/about`, `/all`, `/product/4`, and `/cart` assert the UI expected before the click completes. `/sign-in` and authenticated `/user` assert their static layout before request-specific content. Query-state contracts separately cover `/all` Next → `/all?page=2`, page 2 Previous → `/all`, and Audio hover → `/all?category=Audio`. Pagination prefetches in the viewport; categories prefetch on hover or focus.
- LOOP: seed PostgreSQL → `pnpm test:e2e` → edit → repeat. Agent limits: a seeded `DATABASE_URL` must be available.
- LIVENESS: n/a; local production build and start.
- WALLS: The app has no database fallback. Point `DATABASE_URL` at an isolated seeded PostgreSQL database before building or running tests.
