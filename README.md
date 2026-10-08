<div align="center">

# Next.js 16 Commerce

A commerce demo for exploring Cache Components, Partial Prefetching, and static guarantees in Next.js.

[**Live demo →**](https://next16-commerce.vercel.app/)

</div>

---

This repository started as the demo for my talk, [Composition, Caching, and Architecture in Modern Next.js](https://www.youtube.com/watch?v=iRGc8KQDyQ8). Since then, the current app has moved to the latest Next.js canary and follows the architecture from the [Next.js App Architecture](https://github.com/aurorascharff/nextjs-app-architecture-skill) skill and [Component Architecture for React Server Components](https://aurorascharff.no/posts/component-architecture-for-react-server-components/).

## Features

- **[Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents)** mix static, cached, and request-time content in the same route. Shared product data uses `'use cache'`, while cookie-backed cart and saved state use [`'use cache: private'`](https://nextjs.org/docs/app/api-reference/directives/use-cache-private).
- **[Partial Prefetching](https://nextjs.org/docs/app/guides/adopting-partial-prefetching)** prefetches the shared route shell. Product links use `prefetch={true}` so cached product details are available before navigation, while personalized state waits for the visit.
- **[`ensureStatic`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/ensureStatic)** guarantees static output at the stage a route needs it. The store layout guarantees its shell, product routes guarantee each prefetch, and the About page guarantees a full navigation.
- **[Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data)** update the cart, saved products, account details, and featured products on the server, then invalidate only the cache tags they change with [`updateTag`](https://nextjs.org/docs/app/api-reference/functions/updateTag).
- **[React Compiler](https://react.dev/learn/react-compiler)** memoizes components and hooks automatically, so the code needs no manual `useMemo` or `useCallback`.
- **[View Transitions](https://nextjs.org/docs/app/guides/view-transitions)** animate personalized content as it streams in from Suspense.
- **[Async React](https://github.com/rickhanlonii/async-react)** keeps the interface responsive during server work with `Suspense`, `useOptimistic`, `useTransition`, and `use`.

## Original talk branches

- [`starter`](https://github.com/aurorascharff/next16-commerce/tree/starter) is the intentionally unoptimized starting point used during the talk.
- [`route-group`](https://github.com/aurorascharff/next16-commerce/tree/route-group) separates static and personalized routes with route groups.
- [`request-context`](https://github.com/aurorascharff/next16-commerce/tree/request-context) encodes request context in the route instead.
- [`legacy-talk-demo`](https://github.com/aurorascharff/next16-commerce/tree/legacy-talk-demo) preserves the demo before the later cart and Next.js 16.4 work.

The `main` branch is the current version and continues to evolve with Next.js.

## Getting started

The app runs on Postgres. Copy `.env.sample` to `.env.local`, set `DATABASE_URL`, then:

```bash
pnpm install
pnpm run prisma.push
pnpm run prisma.seed
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You can inspect the database with `pnpm run prisma.studio`.

## Testing

The end-to-end tests use [`@next/playwright`](https://nextjs.org/docs/app/guides/testing/playwright) with the [`instant()`](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/instant) API to verify the static shell, product prefetches, and personalized state across navigations.

```bash
pnpm test:e2e
```

Static checks:

```bash
pnpm lint
pnpm exec tsc --noEmit
```

## Stack

- **[Next.js](https://nextjs.org/)** canary: App Router, Cache Components, Partial Prefetching, `ensureStatic`, and Server Functions
- **[React](https://react.dev/)** with React Compiler: Suspense, View Transitions, `useOptimistic`, and `use`
- **[TypeScript](https://www.typescriptlang.org/)** and **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[Prisma](https://www.prisma.io/)** on PostgreSQL
- **[Ariakit](https://ariakit.org/)** for accessible dialogs and popovers
- **[Playwright](https://playwright.dev/)** with `@next/playwright` for end-to-end tests

## License

[MIT](LICENSE)
