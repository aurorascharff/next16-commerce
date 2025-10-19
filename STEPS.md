# DEMO STEPS

## Setup and problem

- This is a e commerce demo app. The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, Tailwind CSS.
- Demo app. Ecommerce mimic. Everything here looks pretty decent. Home page, browse page, login page, about page, profile page.
- I have all my pages here. I'm using feature slicing to keep the app router folder clean and easy to read. Could also use the underscore components. Services and queries talking to my db.
- Purposefully added slowness to my data fetching.
- (Also using typed routes to get these page props and type safe links).
- This is a regular next.js codebase, nothing fancy, however, keep in mind we have a good mix of static and dynamic content.
- Let's say the team here has reported issues with architecture and prop drilling, excessive client side JS, and need help utilizing static generation and caching.
- The goal here is to improve this regular Next.js codebase and enhance it with modern patterns, regarding architecture, composition, and caching capabilities, to make it faster, more scalable, and easier to maintain.
- (Improvements based on my exp building with server comp also and other codebases I have seen, and what devs commonly do wrong or struggle to find solutions for).

## Excessive prop drilling -> component level fetching and authProvider: app/page.tsx

- The first reported issue was with architecture and excessive prop drilling, making it hard to maintain and refactor features. Let's check out the home page.
- I'm noticing some issues. Fetching auth state top level, passing down to components and using it for conditional rendering. This is a common problem, making our components less reusable and composable, and the code hard to read.
- We don't need to fetch top level with server components. Maybe we tried to be smart and share this to make the page faster, but that's not necessary. We can fetch inside components, and then utilize react cache() to avoid duplicate calls.
- Lot's of login deps. Refactor to fetch inside components, improve structure: PersonalizedSection suspend, MembershipTile suspend general.
- If using fetch it's auto deduped.
- What about client WelcomeBanner, WelcomeBanner? Always need this dep when using WelcomeBanner, forcing the parent to handle this dep, cant move this freely. This is a dep we will encounter forever into the future of our apps life. Passing it multiple levels down.
- Let's utilize a smart pattern. Add authprovider. Let's not await this and block the root page, instead pass it as a promise down, keep it as a promise in the provider.
- Welcomebanner: Rather read it with use() inside components, can even go two levels deeper here. Now we need to suspend Personalbanner with GeneralBanner, ensuring we have a proper fallback and avoiding CLS, while promise resolves with use(). WelcomeBanner is now composable again.
- Same problem in our user profile, getting the logged in state of a user on the server and passing it to the client. Do the same refactor here, login button composable and easily reused somewhere else in the future.
- Let's see another example of prop drilling, this all products page.
- Here, tried to be smart to avoid duplicate calls for my responsive view. But now, getCategories are tied to this page, and the loading state responsibility is on the page with loading.tsx.
- Big skeleton code, reusable skeletons but still, no content shown. Plus, categoryFilters has a redundant dependency, less composable.
- Call getCategories inside the CategoryFilters component, uses react cache() deduping, not a problem.
- Delete loading.tsx since no await here anymore. Refactor the /all page to use individual skeletons inside page.tsx for the categoryFilters.
- Notice blocking in the network tab. The entire page is blocked on something. It's really hard to know where the blocking is coming from. This is a common problem. Turns out, its the ProductList data fetch, suspend this also.
- See the streaming in network tab and improved perceived performance as well as actual performance. Also our search is now accessible. We fixed it, but it's really hard to know where the blocking was coming from. Let's see later how we can improve this.
- Through that refactor we can now maintain good component architecture, reusable and composable by fetching inside components.
- Since our welcomebanner is composable again, let's add it here.

## Excessive client JS -> Client/Server composition: WelcomeBanner

- The next reported issue was excessive client side JS.
- Check out this client-side Pagination. Client side due to nav status with a transition.Preventing default. This one is simple.
- Remove loading spinner and transitions, replace with LinkStatus. A rather new nextjs feature, useLinkStatus. Like useFormStatus, avoid lack of feedback on stale navigation while waiting for the search param. Remove use client and excess code, see local pending state.
- Revisit the WelcomeBanner. It's dismissing this with a useState(), and it has a motion.div animation. Switched to client side fetching with useSWR to make this interactive, multiple ways to fetch now with API layer, no types.
- Also, we break separation of concerns by involving UI logic with data. Instead, let's extract a client component wrapper, and use whats referred to as the donut pattern. Cut all except top line of comp. New file bannerContainer: use client here, rename, children, wrapper. We won't covert the content of this to client because it's a prop, could be any prop. It's a reference to server-rendered content.
- PersonalBanner switch to server fetching getDiscountData, isAuth and return general, and Delete API layer, no longer needed. Export WelcomeBanner with suspense.
- Still have an error. For the motion.div, this simple animation might still be forcing the entire banner to be client. Let's move this to a MotionWrapper component, that can be reused for other animations. Could also switch to a react view transition!
- By the way, using this client wrapper pattern with a boundary provider. Turn on hydration mode, marking my components. Mark the boundary in Welcomebanner so we can mark this as client. Mark Container client, see the donut pattern visual. Notice other boundaries, like client side search, and these server side categories.
- I want to hide the excess categories if theres many. Let's do some RSC gymnastics. Use ShowMore client wrapper and React.Children to maintain our separation of concerns, and reusability of the Categories component. Notice the boundaries client and server.
- The compositional power of server components, Categories is passed into this ShowMore, handles its own data. Can be used all over the app. Not tied to only the ShowMore version.
- Donut pattern can be used for anything like this, i.e Carousels and more. Also using it for the modal, showcase modal boundary donut pattern again.
- Turn off hydration mode, see our app normally again.
- Now we have a pretty good architecture and best practice RSC.

## Discuss dynamic issues

- The last reported issue was a lack of static rendering strategies leading to additional server costs and degraded performance.
- I clearly see the problem. The entire app is entirely dynamic. Showcase build output.
- This is preventing us from caching anything or using ISR, even though so much of the app is static.
- Wasting server resources constantly, quickly gets expensive. Crawlers will wait for this, and the QWV is not terrible, but it's slower than it needs to be and redundant. Why is this happening?
- The main culprit is actually this auth check in my layout. My header is hiding my user profile, which is using cookies, which is forcing dynamic rendering. Auth check in layout. Classic. Everything I do is now dynamically being run on the server.
- Even my non-user personalized content on my home screen like the featured product, I need to suspend too to avoid blocking the page, and even my about page which doesn't even have a dynamic API dep! Because remember, my pages are either be static OR dynamic.
- This is a common issue and something that's been solved before. Let's briefly see which solutions people might resort to do in previous versions of Next.

### Static/dynamic split

- Open new vs code branch and web browser deployed branch.
- Could make a route group. Move all static pages out, simple auth layout. Create AppLayout and pass it data from the auth layout.
- Show cache HIT about page. Good for apps with very clear static/dynamic page boundaries.
- Now we have additional layouts and deps to remember, and more complexity.
- And still, the home page is dynamic because of the recommendations and banner, and product page due to this save feature and dynamic reviews. These are important pages. What else can we try?

### Request context

- Open next vs code branch and web browser deployed branch. Here, I created a request context hidden URL param, that is being set in middleware, now called proxy. Encoded request context in the URL.
- We can generateStaticParams the different variants of loggedIn/nonLoggedIn state.
- Call this function instead of isAuthenticated now. Avoiding doing auth check in the components themselves.
- This is actually a common pattern, and is also recommended by the vercel flags sdk using a precompute function. And used by i18n libraries.
- Client side fetch with useSWR the user specific stuff on the product page, and the reviews because we want them fresh, cache HIT.
- Passing lot's of props now from the server side params, losing compositional benefits.
- But, hassle API Endpoints. Pages routes flashbacks.
- And it's even more complex and we're even breaking the sweet new feature typed routes! Need this as Route everywhere. And what about the home page, do we need to client side fetch everything here too?
- I'm not smart enough for this. But still, viable pattern. Useful for things like feature flags and more regardless etc, but let's say we are not interested in rewriting our app.

## Mark dynamic/static components

- What if we could avoid all of these tactics? Go back to real vscode.
- First', let's review the state of our app. Let's go back to our banner on the Home page.
-Mixing static and dynamic rendering here, nice pattern to avoid CLS. Mark them both. Toggle the rendering boundary, see the dynamic static.
- What about these last ones? Hero, FeaturedCategories, FeaturedProducts.
- Hero.tsx is async, but doesn't depend on dynamic APIs. In a dynamic route, its slow. In a static, its fast. Mark hybrid, also mark FeaturedCategories, FeaturedProducts.

## Excessive dynamic rendering -> Composable caching with 'use cache'

### Home page

- Now, everything here that's marked as hybrid can be cached. It's async and fetching something, but it does not depend on dynamic APIs, so we can share it across multiple users. Notice how right now its loading on every request.
- Enable cacheComponents. This will opt all our async calls into request time calls, and also give us errors whenever a dynamic API does not have a suspense boundary above it. You can also use just useCache, but cacheComponents will help us make good decisions regarding loading states and caching.
- Add "use cache" to the Hero to cache this. Now it's non longer running on the server. Add cacheTag for reval. Mark it as "cached". We can remove this suspense boundary and skeleton. Worry less about millions of skeletons. See it's no longer loading.
- One cache key linked to components, no hassle revalidating many different pages.
- We are no longer bound to page level static/dynamic rendering.
- Do the same for the FeaturedProducts and FeaturedCategories: use cache and mark, remove suspense. Now they're all cached, no longer loading on every request. Only thing that loads is the personalized content.
- That's why my pattern in the home page is good for both composition and PPR. I already refactored it alot, and it's making it alot easier for me, letting me cache bigger chunks here.
- And every cached segment will included in the statically generated shell from Partial Prerendering, cached on the CDN. PPR goes down as far as the cache goes, until it meets a dynamic API.

### All page

- See the rest of the boundaries pre-marked on other pages: all products.
- Error in all page from nextjs, search params resolving too high: don't, or use client comps like in the filters! Refactor to resolve deeper down. Now I have a bigger static shell, because the searchparams dont prevent this content from being statically generated anymore. Error gone, suspended by the product list.
- Keep my Products hybrid, because I want them fresh.
- Also, we are getting help identifying blocking calls.
- Add use cache to the Categories, remove suspense, mark cached.
- Can only use cache async functions, but since we already use the donut here it’s not a problem for the ShowMore, allowing us to cache more content as well as getting compositional benefits.

### Product page TODO

- Try add use cache to the product page. It fails, exposing our dynamic API. Why? We have a dynamic dep. A pretty cool optimistic save product button. This is also useful for debugging btw. Instead of importing the dynamic dep, slot as children, and interleave it. We can still cache the productDetails itself! Children reference can change without affecting the cache entry. Donut pattern, but for caching. Cache gymnastics.
- This is whats happening all over our app with pages and layouts. We could also cache the data, but this is a showcase.
- And also use "use cache" to Product, mark cached, remove suspense.
- Error on the dynamic SavedProducts, add the suspense there with Bookmark! Small chunk of dynamic content only, pushed the loading state all the way down.
- Add use cache to the Reviews, with cacheLife seconds. Keep the suspense. Mark cached.
- We will still see this params resolve in the deployment, it's inside params, so it can't be static. In build, we won't be able to cache it inside dynamic APIs. But, we can still use generateStaticParams. Add an example generateStaticParams. Now it will be cached.
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
