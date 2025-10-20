# DEMO STEPS

## Setup and problem

- This is a simple app mimicking e commerce platform.
- Show app. Home page user dep, browse page, product page user dep, about page, login page, profile page. We have a good mix of static and dynamic content because of our user dependent features. Everything here looks pretty decent, but there's certainly too many loading states for an ecommerce app.
- Let's see the code.
- App router, I have all my pages here. I'm using feature slicing to keep the app router folder clean and easy to read. Services and queries talking to my db which is using Prisma ORM. Purposefully added slowness to my data fetching.
- Let's again say the team here has reported issues with architecture and prop drilling, excessive client side JS, and lack of static rendering strategies leading to additional server costs and degraded performance.
- The goal here is to improve this regular Next.js codebase and enhance it with modern patterns on architecture, composition, and caching capabilities, to make it faster, more scalable, and easier to maintain.
- (Improvements based on my exp building with server comp also and other codebases I have seen, and what devs commonly do wrong or struggle to find solutions for).

## Excessive prop drilling -> component level fetching and authProvider: app/page.tsx

- The first reported issue was with architecture and excessive prop drilling, making it hard to maintain and refactor features. Let's check out the home page.
- I'm noticing some issues. Fetching auth state top level, passing down to components and using it for conditional rendering, multiple levels down. This is a common problem, making our components less reusable and composable, and the code hard to read.
- We don't need to fetch top level with server components. Maybe we tried to improve performance and share this to make the page faster, but that's not necessary, and we are blocking the initial load too. Utilize react cache() to avoid duplicate calls. Then fetch inside components. Best practice is to push promises to resolve deeper down, for many reasons.
- Refactor to add reach cache to deduplicate multiple calls to this per page load. If using fetch it's auto deduped. Fetch inside components, improve structure: PersonalizedSection suspend.
- MembershipTile, suspend the personalized for the general, ensuring we have a proper fallback and avoiding CLS.
- What about client WelcomeBanner, WelcomeBanner? Cant use my await isAuth. Always need this dep when using WelcomeBanner, forcing the parent to handle this dep, cant move this freely. This is a dep we will encounter forever into the future of our apps life. Passing it multiple levels down.
- We could pass it down as a promise, but probably this loggedIn dep will be encountered often. Let's instead utilize a smart pattern. Add authprovider. Let's not await this and block the root page, instead pass it as a promise down, keep it as a promise in the client provider.
- Welcomebanner: Remove prop all the way down, rather read it with use() inside PersonalBanner. Now we need to suspend Personalbanner with GeneralBanner, same pattern as before to avoid CLS and provide something useful, while promise resolves with use(). WelcomeBanner is now composable again.
- Same problem in our user profile, getting the logged in state of a user on the server and passing it to the client. Do the same refactor here, login button composable and easily reused somewhere else in the future.
- Let's see another example of problematic prop drilling, this all products page.
- Here, tried to be efficient to avoid duplicate calls for my responsive view. But now, getCategories are tied to this page, and the loading state responsibility is on the page with loading.tsx.
- Big skeleton code, reusable skeletons but still, no content shown. Plus, categoryFilters has a redundant dependency, less composable.
- Call getCategories inside the CategoryFilters component, add react cache() deduping, not a problem.
- Delete loading.tsx since no data fetch here anymore. Refactor the /all page to use individual skeletons inside page.tsx for the categoryFilters, reveal the search from the start.
- Notice blocking in the network tab. The entire page is blocked on something. It's really hard to know where the blocking is coming from. This is a common problem. Turns out, its the ProductList data fetch, suspend this also.
- (See the streaming in network tab and improved perceived performance as well as actual performance). Also our search is now accessible. We fixed it, but it's really hard to know where the blocking was coming from. Let's see later how we can get help with this.
- Since our welcomebanner is composable again, let's add it here.
- Through that refactor, by fetching inside components and utilizing cache() and use() we can now maintain good component architecture. Reusable and composable.

## Excessive client JS -> Client/Server composition: WelcomeBanner

- The next reported issue was excessive client side JS.
- Check out this client-side Pagination using search params. Client side due to nav status with a transition. Preventing default. There are some new tools we can use to handle this very common use case better. Remove all client side code here and isPending. Lost interactivity.
- Replace with LinkStatus. A rather new nextjs feature, useLinkStatus. Like useFormStatus, avoid lack of feedback on stale navigation while waiting for the search param. See local pending state, using this also on the category links in the bottom here and the sort. Very small amount of client JS added, only what is needed for interactivity.
- Revisit the WelcomeBanner. It's dismissing this with a useState(). Switched to client side fetching with useSWR just to make this dismissable and animated, multiple ways to fetch now with API layer, no types.
- Also, we break separation of concerns by involving UI logic with data. Instead, let's extract a client component wrapper, and use whats referred to as the donut pattern. Cut all except top line of comp. New file bannerContainer: use client here, rename, children, wrapper. We won't covert the content of this to client because it's a prop, could be any prop. It's a reference to server-rendered content.
- PersonalBanner remove use client and switch to server fetching getDiscountData, isAuth and return general, and delete API layer, no longer needed. Export WelcomeBanner client wrapper with suspense. Type safe also.
- Still have an error. For the motion.div, this simple animation might still be forcing the entire banner to be client. Let's move this to a MotionWrapper component, that can be reused for other animations. Could also switch to a react view transition! Back to server components now. Delete API layer.
- Mark the boundary in Welcomebanner so we can mark this as client. Mark Container client, see the donut pattern visual. Using this client wrapper pattern with a boundary UI helper. Turn on hydration mode, marking my components. Notice other boundaries, like client side search, and these server side categories.
- Since we learned the donut pattern, let's use it for something else as well. I want to hide the some categories if theres many. Notice the individual server components here. We again want to avoid excessive client side JS, so avoid creating API endpoints and converting everything. Replace div with ShowMore client wrapper and React.Children to maintain our separation of concerns. Now, we have this reusable and interactive ShowMore wrapper, and reusable categories. Notice the boundaries client and server, donut pattern again.
- The compositional power of server components, Categories is passed into this ShowMore, handles its own data. Both can be used freely all over the app.
- Donut pattern can be used for anything, like carousels and modals more. Actually using it for the modal, showcase modal boundary donut pattern again.
- Now we have a pretty good architecture and best practice RSC patterns, which means we can move further to the last issue, the most fun part.

## Discuss dynamic issues

- The last reported issue was a lack of static rendering strategies leading to additional server costs and degraded performance. Demo again the problems.
- See build output: The entire app is entirely dynamic, problem is clear. Every page has a dynamic API dependency.
- This is preventing us from using static rendering and for example ISR, even though so much of the app is static.
- Wasting server resources constantly, quickly gets expensive. Crawlers will wait for content and it can be indexed, and the QWV is not terrible, but it's slower than it needs to be and redundant. Why is this happening?
- The main culprit is actually this auth check in my layout. My header is hiding my user profile, which is using cookies, which is forcing dynamic rendering. Auth check in layout, which I definitely need. Classic mistake. Everything I do is now dynamically being run on the server.
- Even my non-user personalized content on my home screen like the featured product, I need to suspend too to avoid blocking the page, and even my about page which doesn't even have a dynamic API dep! Because remember, my pages are either be static OR dynamic.
- This is a common issue and something that's been solved before. Let's briefly see which solutions people might resort to in previous versions of Next.

### Static/dynamic split

- Open new vs code branch and web browser deployed branch.
- Could make a route group. Move all static pages out, simple auth layout. Create AppLayout and pass it data from the auth layout.
- Show cache HIT about page. Good for apps with very clear static/dynamic page boundaries.
- Now we have additional layouts and deps to remember, and more complexity.
- And still, the home page is dynamic because of the recommendations and banner loggedIn, and product page due to this save feature and dynamic reviews. Route groups is not a good solution for this app. These are important pages. What else can we try?

### Request context

- Open next vs code branch and web browser deployed branch. Here, I created a request context hidden URL param, that is being set in middleware, now called proxy. Encoded request context in the URL.
- We can generateStaticParams the different variants of loggedIn/nonLoggedIn state.
- Call this function instead of isAuthenticated now. Avoiding doing auth check in the components themselves.
- This is actually a common pattern, and is also recommended by the vercel flags sdk using a precompute function. And used by i18n libraries.
- But to be able to cache this product page, I need to client side fetch with useSWR the user specific stuff on the product page, and the reviews because we want them fresh. All to get this cache HIT!
- Passing lot's of props now from the server side params, losing compositional benefits. And it's even more complex.
- And, hassle API endpoints, multiple data fetching strategies again. Pages routes flashbacks.
- (And we're even breaking the sweet new feature typed routes! Need this as Route everywhere.)
- And what about the home page, do we need to client side fetch everything user specific here too?
- This is a viable pattern, and useful for many regardless etc, but let's say we are actually not interested in rewriting our app.
- What if we could avoid all of these smart workarounds? What if there was a simpler way? Go back to real vscode.

## Mark dynamic/static components

- First', let's review the rendering strategy of our apps home page. Let's go back to our banner on the Home page.
- Mixing static and dynamic rendering here, nice pattern to avoid CLS. Mark them both. Toggle the rendering boundary, see the dynamic static, user profile dynamic too.
- What about these other ones? For example Hero.
- Hero.tsx is async, but doesn't depend on dynamic APIs. In this dynamic route, its slow. In a static, would be fast. Mark hybrid, also notice mark on FeaturedCategories, FeaturedProducts, not depending on dynamic APIs either.

## Excessive dynamic rendering -> Composable caching with 'use cache'

### Home page

- Now, everything here that's marked as hybrid can be cached. It's async and fetching something, but it does not depend on request time information like cookies, so we can share it across multiple users. Notice how right now its loading on every request.
- Enable cacheComponents. This will opt all our async calls into dynamic, and also give us errors whenever an async call does not have a suspense boundary above it, and allow us to use the new 'use cache' directive to mark components, functions, or pages as cachable.
- Try "use cache" Home page, see the error. Dynamic components imported here, luckily I already did a decent refactor of this page.
- Add "use cache" to the Hero to cache this. Now it's non longer running on the server. Add cacheTag for fine grained revalidation with revalidateTag. Showcase cacheLife. Mark it as "cached". We can remove this suspense boundary and skeleton. Worry less about millions of skeletons. See it's no longer loading.
- (One cache key linked to components, no hassle revalidating many different pages).
- We are no longer bound to page level static/dynamic rendering.
- And every cached segment will included in the statically generated shell from Partial Prerendering, cached on the CDN. PPR goes down as far as the cache goes, until it meets a dynamic API, like the WelcomeBanner or the PersonalizedSection. Our Hero can be included in the static shell.
- Do the same for the FeaturedCategories and FeaturedProducts: use cache and mark, remove suspense. Now they're all cached, no longer loading on every request. Only thing that loads is the personalized content. Less stress with skeletons.
- If I had this auth dep here, PPR would not be able to include anything in the static shell. That's why my pattern of resolving promises deeper is good for both composition and caching.

### All page

- See the rest of the boundaries pre-marked on other pages: all products. Categories and products. We can cache this too.
- On reload though, error from nextjs, search params doesn't have a suspense above it, remember it's a dynamic API. CacheComponents tells us we should either cache or suspend this. Make a choice: I can either add back the loading.tsx from before, or shift this page more towards static.
- With cacheComponents, dynamic is like a scale, and it's up to us to decide how much static we want. Let's create a bigger static shell here.
- Refactor to resolve deeper down, error gone. Now I have a bigger static shell, because the searchparams dont prevent this content from being statically generated anymore. Error gone, suspended by the product list.
- Also, we are getting help identifying blocking calls, which is often a problem in large codebases not already following best practises, and which we experienced earlier before adding this suspense. Remove it and show cacheComponents would have identified this blocking call for us, ensuring we don't create slow apps.
- Add use cache to the CategoryFilters, mark cached, remove suspense.
- Keep my Products hybrid, because I want them fresh.
- Add use cache to the Categories, mark cached, remove suspense.
- Can only use cache async functions, but since we already use the donut here it’s not a problem for the ShowMore, allowing us to cache more content as well as getting compositional benefits. It's all connected.
- See initial load, big static shell, only product list loads.

### Product page

- Let's finally tackle the product page, arguably the hardest, also pre-marked with boundaries.
- Add "use cache" to Product, mark cached, remove suspense, it's no longer loading on every request.
- Error in product page, no cache above params. We will still see this params resolve in the deployment, it's inside params, so it can't be static. Either we add a loading.tsx, or we can use generateStaticParams. Add an example generateStaticParams for a few products. Now it will ready for those, then cached as it's generated by users. The error is gone. Pick what is best for your use case and data set.
- Try add use cache to the product details. It fails, exposing our dynamic API. Why? We have a dynamic dep. A pretty cool optimistic save product button, showing the saved state of that product for the user. Instead of importing the dynamic dep, slot as children, and interleave it, like the donut pattern again. We can still cache the productDetails itself! Children reference can change without affecting the cache entry. Donut pattern, but for caching.  Now, we can cache the ProductDetails, mark cached.
- Remove details suspense, add the suspense there with Bookmark! Interactive user specific content still works.
- Keep the Reviews hybrid, want them fresh.
- See the cache boundaries again.
- No longer loading on every request. Small chunk of dynamic content only, pushed the loading state all the way down.
- (For incrementally adopting cacheComponents, we would need to start high up with a dep, then build down and refactor out our dynamic APIs).
- Done with the codebase refactor. My route tree is primarily the same. Just changing a few things to better follow RSC best practice and optimization and adding caching.

## Final demo

- I added cache here to all components cachable.
- See the initial page loads. Almost my entire home page is already available. Only the personalized section and banner load. Navigate to the all products page, then the product page.
- Again, every cached segment will be a part of the statically generated shell from Partial Prerendering, giving us this extreme performance.
- In prod, in client side navs, with improved client side nav from next 16, shell can also be prefetched for even faster navigations, i.e categories. Params are already known for all links on the page.
- We don't see the params of the catgories on client side navs. And for products page, they're cached at the CDN edge after first generation.
- Remember i have purposefully added a lot of slows to this app, but with just a few code changes and smart patterns, we improved performance drastically, reduced server costs by caching much more content, and improved maintainability with better architecture and less prop drilling.
- There is no reason to be avoiding dynamic APIs anymore. There is not static and dynamic pages. No need for weird hacks or workarounds or multiple data fetching strategies or client fetching, don't need to compromising dynamic content or developer experience.
- Every data fetch is server components. In modern Next.js, dynamic vs static is a scale, and we decide how much static we want. We can have one paradigm and one mental model, performant and scalable by default.
