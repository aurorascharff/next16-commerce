# DEMO STEPS

## Setup and problem

- This is a simple app mimicking e commerce platform.
- Show app. Home page user dep, browse page, product about page, login page, page user dep page. We have a good mix of static and dynamic content because of our user dependent features. (Everything here looks pretty decent, but there's certainly too many loading states for an ecommerce app.)
- Let's see the code.
- App router, I have all my pages here. I'm using feature slicing to keep the app router folder clean and easy to read. Services and queries talking to my db which is using Prisma ORM. Purposefully added slowness to my data fetching.
- App actually has commonly seen issues with prop drilling making it hard to maintain and refactor features, excessive client side JS, and lack of static rendering strategies leading to additional server costs and degraded performance.
- The goal here is to improve this regular Next.js codebase and enhance it with examples of modern patterns regarding architecture, composition, and caching capabilities, to make it faster, more scalable, and easier to maintain.
- (Improvements based on my exp building with server comp also and other codebases I have seen, and what devs commonly do wrong or struggle to find solutions for).

## Excessive prop drilling -> component level fetching and authProvider: app/page.tsx

- Let's start simple, the first issue is with architecture and deep prop drilling.
- I'm noticing some issues. Fetching auth state top level, passing to components multiple levels down. This is a common problem, making our components less reusable and composable, and the code hard to read.
- But we are blocking the initial load, might be hard to know. We don't need to fetch top level with server components. Best practice is to push promises to resolve deeper down. We will see later how we can get help with this though. Co-locate data fetching with UI.
- Refactor to add reach cache to deduplicate multiple calls to this per page load. If using fetch it's auto deduped. Fetch inside components, improve structure: PersonalizedSection suspend.
- (MembershipTile, suspend the personalized for the general, ensuring we have a proper fallback and avoiding CLS).
- What about client WelcomeBanner, WelcomeBanner? Cant use my await isAuth. Always need this dep when using WelcomeBanner, passing it multiple levels down, forcing the parent to handle this dep, cant move this freely. This loggedIn a dep we will encounter forever into the future of our apps life.
- Let's utilize a smart pattern. Add authprovider. Let's not await this and block the root page, instead pass it as a promise down, keep it as a promise in the client provider.
- Welcomebanner: Remove prop all the way down, rather read it with use() inside PersonalBanner. Now we need to suspend Personalbanner with GeneralBanner, same pattern as before to avoid CLS and provide something useful, while promise resolves with use(). WelcomeBanner is now composable again.
- Any time we need the logged in variable, with is a lot, we can fetch it locally either with async functions or this auth provider, avoiding a lot of future prop drilling.
- (Same problem in our user profile, getting the logged in state of a user on the server and passing it to the client. Do the same refactor here, login button composable and easily reused somewhere else in the future.)
- Since our welcomebanner is composable again, we can add it to the all page easily.
- Through those patterns, by fetching inside components and utilizing cache() and use() we can now maintain good component architecture. Reusable and composable.

## Excessive client JS -> Client/Server composition: WelcomeBanner

- The next issue is excessive client side JS, and large components with multiple responsibilities.
- (Check out this client-side Pagination using search params. Client side due to nav status with a transition. Preventing default. There are some new tools we can use to handle this very common use case better. Remove all client side code here and isPending. Lost interactivity).
- (Replace with LinkStatus. A rather new nextjs feature, useLinkStatus. Like useFormStatus, avoid lack of feedback on stale navigation while waiting for the search param. See local pending state, using this also on the category links in the bottom here and the sort. Very small amount of client JS added, only what is needed for interactivity).
- Revisit the WelcomeBanner. It's dismissing this with a useState(). Switched to client side fetching with useSWR just to make this dismissable, multiple ways to fetch now with API layer, no types.
- Also, we break separation of concerns by involving UI logic with data. Instead, let's extract a client component wrapper, and use whats referred to as the donut pattern. Cut all except top line of comp. New file bannerContainer: use client here, rename, children, wrapper. We won't covert the content of this to client because it's a prop, could be any prop. It's a reference to server-rendered content.
- PersonalBanner remove use client and switch to server fetching getDiscountData, isAuth and return general, and delete API layer, no longer needed. Export WelcomeBanner client wrapper with suspense. Type safe also.
- Still have an error. For the motion.div, this simple animation might still be forcing the entire banner to be client. Let's move this to a MotionWrapper component, that can be reused for other animations. Could also switch to a react view transition! Back to server components now. Delete API layer.
- I have a boundary UI helper here. Turn on hydration mode, marking my components. See the donut pattern visual. Notice other boundaries, like client side search, and these server side categories.
- Since we learned the donut pattern, let's use it for something else as well. I want to hide the some categories if theres many. Notice the individual server components here. We again want to avoid excessive client side JS, so avoid creating API endpoints and converting everything. Replace div with ShowMore client wrapper and React.Children to maintain our separation of concerns. Now, we have this reusable and interactive ShowMore wrapper, and reusable categories. Notice the boundaries client and server, donut pattern again.
- The compositional power of server components, Categories is passed into this ShowMore, handles its own data. Both can be used freely all over the app.
- Donut pattern can be used for anything, like carousels and modals more. Actually using it for this quick preview modal, showcase modal boundary donut pattern again. Remember this next time you want to add interactivity to a server component.
- Learned donut pattern, how to utilize composition, we avoided client side js, which means we can move further to the last issue. Remove boundary UI.

## Discuss dynamic issues

- The last issue is a lack of static rendering strategies.
- See build output: The entire app is entirely dynamic, problem is clear. Every page has a dynamic API dependency.
- This is preventing us from using static rendering benefits and for example using ISR, even though so much of the app is static.
- Demo all pages: wasting server resources constantly, slowing down our app. Why is this happening?
- (Crawlers will wait for content and it can be indexed, and the QWV is not terrible, but it's slower than it needs to be).
- The main culprit is actually this auth check in my layout. My header is hiding my user profile, which is using cookies, which is forcing dynamic rendering. Auth check in layout, which I definitely need. Classic mistake. Everything I do is now dynamically being run on the server. Because remember, my pages are either be static OR dynamic.
- (Even my non-user personalized content on my home screen like the featured product, I need to suspend too to avoid blocking the page, and even my about page which doesn't even have a dynamic API dep!)
- This is a common issue and something that's been solved before. Let's briefly see which solutions people might resort to in previous versions of Next.

### Static/dynamic split

- Open new vs code branch and web browser deployed branch.
- Could make a route group. Move all static pages out, simple auth layout. Create AppLayout and pass it data from the auth layout.
- Show build output about page. Good for apps with very clear static/dynamic page boundaries.
- Now we have additional layouts and deps to remember, and more complexity.
- And still, the home page is dynamic because of the recommendations and banner loggedIn, and product page due to this save feature and dynamic reviews. Route groups is not a good solution for this app. These are important pages. What else can we try?

### Request context

- Open next vs code branch and web browser deployed branch. Here, I created a request context URL param, that is being set in middleware, now called proxy. Encoded request context in the URL.
- We can generateStaticParams the different variants of loggedIn/nonLoggedIn state.
- Call this function instead of isAuthenticated now. Avoiding doing auth check in the components themselves.
- This is actually a common pattern, and is also recommended by the vercel flags sdk using a precompute function. And used by i18n libraries.
- But to be able to cache this product page, I need to client side fetch with useSWR the user specific stuff on the product page, and the reviews because we want them fresh. All to get this cache HIT!
- (Passing lot's of props now from the server side params, losing compositional benefits.)
- It's even more complex, hassle API endpoints, multiple data fetching strategies again. Pages routes flashbacks.
- (And we're even breaking the sweet new feature typed routes! Need this as Route everywhere.)
- And what about the home page, do we need to client side fetch everything user specific here too?
- This is a viable pattern, and useful for many regardless etc, but let's say we are actually not interested in rewriting our app.
- What if we could avoid all of these smart workarounds? What if there was a simpler way?
- Go back to real vscode.

## Excessive dynamic rendering -> Composable caching with 'use cache'

### Home page

- There is a simpler way: Enable  next 16 cacheComponents. This will opt all our async calls into dynamic, and also give us errors whenever an async call does not have a suspense boundary above it, and allow us to use the new 'use cache' directive to mark components, functions, or pages as cachable.
- First', let's review the rendering strategy of our apps home page. Let's go back to our banner on the Home page.
- Toggle the rendering boundary, see the dynamic WelcomeBanner, user profile dynamic too.
- What about these other ones? For example Hero.
- Hero.tsx is async, but doesn't depend on dynamic APIs. In this dynamic route, its slow. In a static, would be fast. Marked hybrid, also notice mark on FeaturedCategories, FeaturedProducts, not depending on dynamic APIs either.
- Now, everything here that's marked as hybrid can be cached. It's async and fetching something, but it does not depend on request time information like cookies, so we can share it across multiple users. Notice how right now its loading on every request.
- (Try "use cache" Home page, see the error. Dynamic components imported here.)
- Add "use cache" to the Hero to cache this. Add cacheApis snippet: cacheTag for fine grained revalidation with revalidateTag, cacheLife revalidation period. Mark it as "cached". We can remove this suspense boundary and skeleton. See it's no longer loading.
- (One cache key linked to components, no hassle revalidating many different pages).
- And every cached segment will included in the statically generated shell from Partial Prerendering, cached on the CDN. PPR goes down as far as the cache goes, until it meets a dynamic API, like the WelcomeBanner or the PersonalizedSection. Our Hero can be included in the static shell.
- Do the same for the FeaturedCategories and FeaturedProducts: use cache and mark, remove suspense. Less stress with skeletons and CLS.
- Now they're all cached, no longer loading on every request. Only thing that loads is the personalized content. We are no longer bound to page level static/dynamic rendering.
- If I had this auth dep here, PPR would not be able to include anything in the static shell. That's why my pattern of resolving promises deeper is good for both composition and caching.

### All page

- See the rest of the boundaries pre-marked on other pages: all products. Categories and products. Reload -> we can cache this too.
- We have an error from nextjs though, categories doesn't have a suspense above it. Blocking route. Ah, my page actually blocked, slow loading.
- CacheComponents helping identifying blocking calls, a is common problem, avoiding performance issues. Next.js tells us we should either cache or suspend this. Make a choice: I can either a loading.tsx, or cache the data fetch.
- Simple solution, add huge loading.tsx skeleton code. That works, not useful loading UI though, cant interact with anything.
- So, with cacheComponents, dynamic is like a scale, and it's up to us to decide how much static we want. Let's shift the page more towards static, and create a bigger static shell here. Delete loading.tsx.
- Use pattern we learned in the beginning, resolve getCategories deeper down, inside the CategoryFilters component twice for my responsive view, add react cache() deduping, not a problem for my responsive view. Add use cache to this, and mark it as cached, dont need to suspend.
- Still error on searchparams, dynamic API, cant cache this. Refactor to resolve deeper down. Now I have a bigger static shell. Error gone, suspended by the product list.
- Loading state, search is now accessible from the start, and I can see my welcome banner and close this already. Great UX improvement.
- As you can see, CacheComponents making sure we follow best practices for RSC, and actually helping us think about where we resolve our promises, improving component architecture.
- Keep my Products hybrid, because I want them fresh.
- Footer -> Categories: Can only use cache async functions, but since we already use the donut here it’s not a problem for the ShowMore, allowing us to cache more content as well as getting compositional benefits. It's all connected. Remove suspense.
- See initial load, big static shell, only product list loads.

### Product page

- Let's finally tackle the product page, also pre-marked with boundaries.
- Add "use cache" to Product, mark cached, remove suspense, it's no longer loading on every request.
- Try add use cache to the product details. It fails, exposing our dynamic API. Why? We have a dynamic dep. A pretty cool optimistic save product button, showing the saved state of that product for the user. Instead of importing the dynamic dep, slot as children, and interleave it. Composable caching! Children reference can change without affecting the cache entry. Donut pattern, but for caching. Now, we can cache the ProductDetails, mark cached.
- Remove details suspense, add the suspense there with Bookmark! Interactive user specific content still works.
- Keep the Reviews hybrid, want them fresh.
- No longer loading on every request. Small chunk of dynamic content only, pushed the loading state all the way down.
- Error in product page, no cache above params. We will still see this params resolve in the deployment, it's inside params, so it can't be static. Either we add a loading.tsx, or we can use generateStaticParams. Add an example generateStaticParams for a few products. Now it will ready for those, then cached as it's generated by users. The error is gone. Pick what is best for your use case and data set.
- (For incrementally adopting cacheComponents, we would need to start high up with a dep, then build down and refactor out our dynamic APIs).
- Done with the codebase refactor. Head over to a deployed version.

## Final demo

- Remember i have purposefully added a lot of slows to this app.
- New tab: see the initial page loads. Almost my entire home page is already available. Only the personalized section and banner load. Navigate to the all products page, then the product page.
- See the boundary: again, every cached segment will be a part of the statically generated shell from Partial Prerendering, and in prod, improved prefetching new client side router from next 16, shell is prefetched for even faster navigations.
- (Params are already known for all links on the page. Clicking categories within the app already resolved search params, so the shell is already there. Only on reload can we see it resolve here).
- (With just a few code changes and smart patterns, we improved components architecture, removed redundant client js and allowed for more component reuse, and by caching more content we increased performance drastically and reduce server costs.)
- To summarize, with cacheComponents, there is no static OR dynamic pages. We don't need to be avoiding dynamic APIs anymore, or compromise dynamic content. Skip creating complex hacks or workarounds or add multiple data fetching strategies, and make the developer experience worse, just for that cache HIT.
- In modern Next.js, dynamic vs static is a scale, and we decide how much static we want in our apps. By following certain patterns, we can use this one mental model, performant, composable and salable by default.
