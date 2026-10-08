# Next.js 16 Commerce

A commerce demo for exploring React Server Components, component architecture, caching, and navigation in the Next.js App Router.

This repository was originally built for my Next.js Conf 2025 talk, [Composition, Caching, and Architecture in Modern Next.js](https://www.youtube.com/watch?v=iRGc8KQDyQ8). The talk uses the app to refactor a typical commerce codebase toward feature-owned data fetching, smaller client boundaries, streaming, and Cache Components.

Since then, `main` has moved forward with the latest Next.js canary. It now follows the same feature-owned Server Component architecture while testing newer rendering and navigation APIs, including Cache Components, Partial Prefetching, `ensureStatic`, private caches for personalized state, and agent feedback.

## Branches

- [`legacy-talk-demo`](https://github.com/aurorascharff/next16-commerce/tree/legacy-talk-demo) preserves the original pre-cart talk demo.
- [`starter`](https://github.com/aurorascharff/next16-commerce/tree/starter) is the intentionally unoptimized starting point used during the talk.
- [`route-group`](https://github.com/aurorascharff/next16-commerce/tree/route-group) separates static and personalized routes with route groups.
- [`request-context`](https://github.com/aurorascharff/next16-commerce/tree/request-context) explores encoding request context in the route instead.
- `main` is the current version of the demo and continues to evolve with the framework.

The original walkthrough is documented in [`STEPS.md`](./STEPS.md). The current app uses:

- synchronous pages that compose feature-owned Server Components
- Suspense boundaries at the route level
- Cache Components for shared and private data
- cache tags shared by reads and mutations
- Partial Prefetching and static guarantees at different navigation stages

## Getting Started

First, install the dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prisma Setup

Choose between Prisma with local SQLite or a database such as PostgreSQL or SQL Server, then configure the provider in `prisma/schema.prisma`.

Consider adding a `.env` file to the root of the project and use the environment variables inside `schema.prisma` with `env("DATABASE_URL")`, refer to `.env.sample`.

When using sqlite, initialize the database with:

```bash
pnpm prisma.push
```

Seed prisma/seed.ts for initial data:

```sh
pnpm prisma.seed
```

To view your data in the database, you can run:

```bash
pnpm prisma.studio
```

When using a real database with for example postgresql or sqlserver, you need to migrate the database schema with:

```bash
pnpm prisma.migrate
```

## Related documentation

- [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- [Keeping pages static](https://nextjs.org/docs/app/guides/keeping-pages-static)
- [Optimizing prefetching](https://nextjs.org/docs/app/guides/optimizing-prefetching)
- [Next.js 16.4](https://nextjs.org/blog/next-16-4)
