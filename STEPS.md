# DEMO STEPS

## Setup and problem

- This is a e commerce demo app. The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, Tailwind CSS.
- Demo app. Ecommerce mimic. Everything here looks pretty decent. Home page, browse page, login page, about page, profile page.
- I have all my pages here. I'm using feature slicing to keep the app router folder clean and easy to read. Could also use the underscore components. Services and queries talking to my db.
- Purposefully added slowness to my data fetching.
- Also using typed routes to get these page props and type safe links.
- This is a regular next.js codebase, nothing fancy, however, keep in mind we have a good mix of static and dynamic content.
- Let's say the team here has reported issues with architecture and prop drilling, excessive client side JS, and need help utilizing static generation and caching.
- The goal here is to improve this regular Next.js codebase and enhance it with modern patterns, regarding architecture, composition, and caching capabilities, to make it faster, more scalable, and easier to maintain.
- (Improvements based on my exp building with server comp also and other codebases I have seen, and what devs commonly do wrong or struggle to find solutions for).

## Excessive prop drilling -> component level fetching and authProvider: app/page.tsx

- The first reported issue was with architecture and excessive prop drilling, making it hard to maintain and refactor features. Let's check out the home page.
- I'm noticing some issues. Fetching auth state top level, passing down to multiple components, conditional rendering. This is a common problem, making our components less reusable and composable.
- We don't need to fetch top level with server components. Maybe we tried to be smart and share this to make the page faster. We can fetch inside components,and then utilize react cache() to avoid duplicate calls. Refactor to fetch inside components, improve structure. If using fetch it's auto deduped.
- Lot's of login deps. Extract this to components handling their own responsibilities: PersonalizedSection, ProductsHeader, MembershipTile.
- What about client WelcomeBanner, WelcomeBanner? Always need this dep when using WelcomeBanner, forcing the parent to handle this. This is a dep we will encounter forever into the future of our apps life. Passing it multiple levels down.
- Add authprovider. Let's pass it as a promise down, keep it as a promise in the provider. Let's not await this and block the root page.
- Welcomebanner: Rather read it with use() inside components, can even go two levels deeper here. Suspend Personalbanner with GeneralBanner, while promise resolves with use(). As long as it's suspended, no issue! Like params.  WelcomeBanner is now composable again.
- In our user profile, getting the logged in state of a user on the server and passing it to the client. Do the same refactor here.
- Let's see another example of prop drilling, this all products page. Here, tried to be smart to avoid duplicate calls for my responsive view. But now, getCategories are tied to this page, and the loading state responsibility is on the page.
- Big skeleton code, reusable skeletons but still, no content shown. CategoryFilters has a redundant dependency, less composable.
- Call getCategories inside the CategoryFilters component, add react cache() deduping, not a problem.
- Delete loading.tsx. Refactor the /all page to use individual skeletons inside page.tsx for the categoryFilters.
- Notice blocking in the network tab. The entire page is blocked on something. It's really hard to know where the blocking is coming from. This is a common problem. Turns out, its the ProductList data fetch, suspend this also.
- See the streaming in network tab and improved perceived performance as well as actual performance. Also our search is now accessible. We fixed it, but it's really hard to know where the blocking was coming from. Let's see later how we can improve this.
- Through that refactor we can now maintain good component architecture, reusable and composable by fetching inside components.

## Excessive client JS -> Client/Server composition: WelcomeBanner

- The next reported issue was excessive client side JS.
- Check out this Pagination. Client side due to link status. This one is simple, let's switch to new LinkStatus API.
- Using a rather new nextjs feature, useLinkStatus. Like useFormStatus, avoid lack of feedback on stale navigation while waiting for the search param. Remove use client and excess code.
- Move to this Banner. It's dismissing this with a useState(), and it has a motion.div animation. Switched to client side fetching with useSWR to make this interactive.
- However, we break separation of concerns by involving UI logic with data. Instead, let's utilize the donut pattern to make a client component wrapper, BannerContainer.
- Switch to server fetching, call isAuth and Delete API layer, no longer needed. Export WelcomeBanner with suspense.
- Still have an error. For the motion.div, this simple animation might still be forcing the entire banner to be client. Let's move this to a MotionWrapper component, that can be reused for other animations.
- Remove suspense home page, compositional power, WelcomeBanner can be added anywhere. Add to /all page.
- By the way, using this donut pattern with a boundary provider. Wrap a boundary here so we can mark this as client. Toggle "hydration". See the links as well client. Mark as server and client, see the donut pattern visual. Notice other boundaries, i.e the search is extracted to a small client comp with a spinner.
- I want to hide the excess categories if theres many. Let's do some RSC gymnastics. Use ShowMore client wrapper and React.Children to maintain our separation of concerns, and reusability of the Categories component. Mark the boundaries client and server.
- The compositional power of server components, Categories is passed into this ShowMore, handles its own data. Can be used all over the app. Not tied to only the ShowMore version.
- Showcase all boundaries again. Donut pattern can be used for anything like this, i.e Carousels and more. Also using it for the modal, showcase modal boundary donut pattern again.

## Discuss dynamic issues

- Now we have a pretty good architecture and best practice RSC.
- However, I have a problem. My entire app is entirely dynamic. Showcase build output.
- Why? This is preventing me from caching anything or using ISR, even though so much of my app is static.
- Wasting server resources constantly, quickly gets expensive. Crawlers will wait for this, and the QWV is not terrible, but it's slow and redundant.
- The culprit is actually this auth check in my layout. My header is hiding my user profile, which is using cookies, which is forcing dynamic rendering. Auth check in layout. Classic. Everything I do is now dynamically being run on the server.
- Even my non-user personalized content, which I need to suspend this too now to avoid blocking the page, and even my about page which doesn't even have a dynamic API dep! Because remember, pages could either be static OR dynamic.
- Even if i add client side caching with staletimes, it wont help a lot. Even though im doing everything right with Server Components.
- This is a common issue and something that's been solved before. Let's briefly see what we would do in previous versions of Next.

### Static/dynamic split

- Open new vs code branch and web browser deployed branch. - About page is fully static, could make a route group. Move all static pages out, simple auth layout. Create AppLayout and pass it data from the auth layout. Now we have additional layouts and deps to remember, and more complexity.
- Show cache HIT about page. Good for apps with very clear static/dynamic page boundaries.
- And still, my product and home page is dynamic because of the recommendations. These are important pages. What else can we try.

### Request context

- Open next vs code branch and web browser deployed branch. Here, I created a request context hidden URL param, that is being set in middleware, now called proxy. Encoded request context in the URL. Avoiding doing auth check in the components themselves.
- Call this function instead of isAuthenticated now.
- We can generateStaticParams the different variants of loggedIn/nonLoggedIn state.
- This is actually a common pattern, and is also recommended by the vercel flags sdk using a precompute function. And used by i18n libraries.
- Client side fetch with useSWR the user specific stuff on the product page, and the reviews because we want them fresh, cache HIT.
- Passing lot's of props now from the server side params, losing compositional benefits.
- But, hassle API Endpoints. Pages routes flashbacks.
- But it's even more complex and we're even breaking the sweet new feature typed routes! Need this as Route everywhere. And what about the home page, do we need to client side fetch everything here too?
- My brain is already breaking. But still, viable pattern. Useful for flags etc, but let's say we are not interested in rewriting our app.

## Mark dynamic/static components

- What if we could avoid all of these tactics? Go back to real vscode.
- First', let's review the state of our app. Let's go back to our banner on the Home page.
- Weaving static and dynamic rendering here, nice pattern to avoid CLS. Mark them both, toggle the rendering boundary.
- Categories.tsx is a hybrid component without use cache. In a dynamic route, its slow. In a static, its fast. Mark hybrid.
- Notice the pattern in our main page, already pushing dynamic data down.
- Components using the toast pattern to avoid CLS. Mark the segments as dynamic.
- See the rest of the boundaries pre-marked on other pages.

## Excessive dynamic rendering -> Composable caching with 'use cache'

- Now, everything here that's marked as hybrid can be cached. It's async and fetching something, but it does not depend on dynamic APIs.
- Enable cache components. This will opt all our async calls into request time calls, and also give us errors whenever a dynamic API does not have a suspense boundary.
- Add "use cache" and cacheTag to the categories. Now it's fast on both about and home, we can remove this suspense boundary and skeleton. Worry less about millions of skeletons. Mark it as "cached".
- One cache key linked to components, no hassle revalidating many different pages.
- No longer page level static/dynamic.
- And every cached segment will included in the statically generated shell from Partial Prerendering, cached on the CDN. PPR goes down as far as the cache goes, until it meets a dynamic API.
- Add "use cache" to the category filters, and mark as hybrid and cached. Error, search params resolving too high: don't, or use client comps! Refactor to resolve deeper down. Now I have a bigger static shell, because the searchparams dont prevent this content from being statically generated anymore.
- Also, we are getting help identifying blocking calls.
- Add "use cache" and mark cache on all hybrid components inside the home page: Hero, FeaturedProducts, FeaturedCategories. Now they're all fast. Remove suspense.
- That's why my pattern in the home page is good for both composition and PPR. I already refactored it alot, and it's making it alot easier for me, letting me cache bigger chunks here.
- Add use cache to the Reviews, with cacheLife seconds. Keep the suspense. Mark cached.
- For the Product, it's inside params, so it can't be static. But, we can still use generateStaticParams. Add an example generateStaticParams.
- And also use "use cache: remote" to cache it between requests to avoid some server load. Inside dynamic API, we still need to add suspense. Mark cached.
- Can only use cache async functions, but since we already use the donut here it’s not a problem for the modal, allowing us to cache more content as well as getting compositional benefits.
- (We can also "use cache" the layout to build up our cache here and avoid this params resolving. By the way, you wouldn't see this locally, only deployed).
- Try add use cache to the ProductDetails. It fails, exposing our dynamic API. Why? We have a dynamic dep. A pretty cool optimistic save product button. This is also useful for debugging btw. Since the dynamic dep is slotted, we can still cache the productDetails itself! Donut pattern, but for caching. Cache gymnastics.
- There is no suspense here, add suspense for better UX around the dynamic content. This is whats happening all over our app with pages and layouts. We could also cache the data, but this is a showcase.
- Our authProvider does not make it dynamic as long as the components using it are suspended, just like searchParams!
- For incrementally adopting, we would need to start high up with a dep, then build down and refactor out our dynamic APIs. Or use the plain useCache, but for future proofing, consider cache components.
- Done with the codebase refactor. My route tree is primarily the same. Just following RSC best practices and adding caching. And doing some RSC if I want to optimize, but thats totally voluntary, and depends on your use cases.
- We could continue this across the whole app, not changing anything in our component tree and structure.

## Final demo

- Go to deployed version. I added cache here to all components cachable.
- See the initial page loads. Almost my entire page is already available. So fast.
- See all boundaries, cached stuff.
- Again, every cached segment will be a part of the statically generated shell from Partial Prerendering.
- On client side navs, it can also be prefetched for even faster navigations. Only in deployed that prefetching is enabled. Params are already known for the entire page. It's so fast!
- Remember i have purposefully added slows, and i didn't optimize my db. Very simple nextjs app.
- We don't see the params of the product on client side navs, because they're already known. We see them only on the initial load here, after that the remote cache handles it.
- Show revalidation working with cacheTag.
- Follow best practices and it should all just work out the box, giving you max performance.
- There is no reason to be avoiding dynamic APIs anymore. There is not static and dynamic pages. No weird hacks or workarounds or multiple data fetching strategies.
- Every data fetch is server components! One paradigm, one mental model, performant and composable by default.
