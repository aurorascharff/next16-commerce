# DEMO STEPS

## Setup and problem

- This is a e commerce demo app. Last year when I was here, I focused on dynamic data and how to handle that. This time, I took inspiration from Elkjøp which is the biggest ecommerce platform in the nordics. Thanks to the Prinicipal Software Engineer Tomas Jansson for sparring with me through this demo app.
- The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, Tailwind CSS.
- Demo app. Ecommerce mimic. Everything here looks pretty decent. Home page, browse page, login page, about page, profile page. Performance is pretty good in the CWV plugin.
- Let's say I just built this and its pretty good overall.
- However, I have a problem. My entire app is entirely dynamic. Why? This is preventing me from caching anything or using ISR, even though so much of my app is static.
- Wasting server resources constantly, quickly gets expensive. Crawlers will wait for this, and the QWV is not terrible, but it's slow and redundant.
- Showcase build output. How can I fix this.
- The goal here is to take this regular Next.js app and enhance it with modern patterns, regarding architecture, composition, and caching capabilities.
- Improvements based on my exp building with server comp also and other codebases I have seen, and what devs commonly do wrong or struggle to find solutions for.

## Go through the app structure

- I have all my pages here. I'm using feature slicing to keep the app router folder clean and easy to read. Could also use the underscore components. Services and queries talking to my db.
- I'm mostly following React Server Component best practises, like doing data fetching inside components, suspending with suitable fallbacks that avoid CLS. Keep component architeture reusable and composable by fetching inside components.
- Composable components like this product and product details that handle their own data fetching, that can be used all over the app. Avoid lots of prop passing from page level.
- Also using typed routes to get these page props and type safe links.
- Extracting client logic to smaller client components, like this search.

## App and Component Architecture

- Let's not worry about that yet. Let's begin by improving some architectural decisions.
- Notice this user page is very slow. We have a waterfall here. The discounts and saved products are locked inside this page. Many ways to fix it, extract to a UserProfile component. We can also utilize more of the app router to make.
- Use a layout.tsx to parallel fetch this while keeping everything readable. Now it's no longer blocked. Layouts are helpful to minimize the skeletons we need to duplicate code to create. When possible, don't suspend the layout, just the data.
- This user route is actually only accessible when logged in. Let's say we want to handle an unauthorized attempt here in a different way. This is a general error, will trigger this view on any error. Let's enable authInterrupts and create a custom error boundary. There is also a version of forbidden. Use this either in data access or components.
- How about excessive prop passing. It's a very common problem. For exampke, getting the logged in state of a user on the server and passing it to the client.
- Showcase my user profile. Passing props. We likely need this loggedIn state all the time.
- Add authprovider. Let's pass it as a promise down, keep it as a promise in the provider. LoginButton is now composable again. Spoiler: we'll get back to this component.
- Many purposes, any server state you want to share. Just remember to not pass secrets.

## Client/server Composition

- I want to add more interactive features to this app. Let's see some practical strategies on how to do this in a clean way.
- Begin with my links in the categories footer. I could make this client components, let's instead use a rather new nextjs feature, useLinkStatus. Like useformstatus, avoid blocking navigation while waiting for the search param.
- Begin with this Banner. I want to be able to dismiss this with for example a useState(). But these are all server components. I suppose I could turn all of them client and pass down data, or switch to client side fetching with something like react query or useSWR. Showcase idea.
- However, that would break seperation of concerns by involving UI logic with data. Instead, let's utilize the donut pattern to make a client component wrapper, BannerContainer.
- See in devtools only the container is client.
- By the way, using this pattern with a boundary provider. Wrap a boundary here so we can mark this as client. Hard code "hydration". See the links as well client.
- Compositional power, WelcomeBanner can be added anywhere. Add to /all page.
- For component that don't rely on server logic and neither on client js, let's mark them hybrid. Pagination.
- What if we want a modal for our products? Mark product as server. Relies on server stuff and is async. We can utilize for example the modal pattern with intercepting routes, or pass the content as props.
- Add snippet passing down server component into a ProductModal. Mark modal as client.
- The compositional power of server components, Product is passed into this modal, handles its own data.
- What about this Categories. I want to hide the excess categories if theres many. Let's do some RSC gymnastics. Use ShowMore client wrapper and React.Children to maintain our separation of concerns, and reusability of the Categories component. Mark the boundary.
- Showcase all boundaries. Donut pattern can also be used for framer-motion animation containers, MotionWrapper, showcase. Carousels.

## Discuss dynamic issues

- Now we have a pretty good architecture. But we still have the issue of everything being dynamic. Let's discuss some strategies to improve this.
- The culprit is actually this auth check in my layout. My header is hiding my user profile, which is using cookies, which is forcing dynamic rendering. Auth check in layout. Classic. Everything I do is now dynamically being run on the server.
. Even my non-user personalized content, which I need to suspend this too now to avoid blocking the page, and even my about page which doesn't even have a dynamic API dep! Because remember, pages could either be static OR dynamic.
- This is a common issue and something that's been solved before. Let's briefly see what we could do.
- Even if i add client side caching with staletimes, it wont help a lot. Even though im doing everything right with Server Components.

### Static/dynamic split

- Open new vs code branch and web browser deployed branch. About page is fully static, let's make a route group. Move all static pages out, simple auth layout. Create AppLayout and pass it data from the auth layout. Now we have additional layouts and deps to remember, and more complexity.
- Show cache HIT about page. Good for apps with very clear static/dynamic page boundaries.
- And still, my product and home page is dynamic because of the recommendations. These are important pages. What else can we try.

### Request context

- Open next vs code branch and web browser deployed branch. Here, I created a request context hidden URL param, that is being set in middleware. Encoded request context in the URL. Avoiding doing auth check in the components themselves.
- We can generateStaticParams the different variant.
- Show cache HIT about page. This is actually a common pattern, and is also recommended by the vercel flags sdk using a precompute function. And used by i18n libraries.
- Client side fetch the user specific stuff on the product page, and the reviews because we want them fresh, cache HIT. UseSWR! Endpoints. Pages routes flashbacks. And also, we can't generateStaticParams thousands of products.
- But it's even more complex and we're even breaking the sweet new feature typed routes! Need this as Route everywhere. And what about the home page, do we need to client side fetch everything here too?
- Passing lot's of props now from the server side params, losing compositional benefits.
- My brain is already breaking. But still, viable pattern. Useful for flags etc, but let's say we are not interested in rewriting our app.

## Mark dynamic/static components

- What if we could avoid all of these tactics? Go back to real vscode.
- First', let's review the state of our app. Let's go back to our banner.
- This Suspense is causing CLS. Let's mark this and make it one composable WelcomeBanner. Update the other page as well. No more CLS, weaving static and dynamic rendering here.
- Categories.tsx is a hybrid component without use cache. In a dynamic route, its slow. In a static, its fast.
- Refactor our main page better to push dynamic data down. LoggedIn using the toast pattern to avoid CLS. Mark the segments as dynamic. We are utilizing cache(), so there's no problem calling this many times. Composition, no weird prop passing to try and speed things up in the root.
- Hard code the toggle to "rendering". See the rest of the boundaries.

## Composable caching

- Now, everything here that's marked as hybrid can be cached. It's async and fetching something, but it does not depend on dynamic APIs.
- Enable cache components. This will opt all our async calls into dynamic calls, and also give us errors whenever a dynamic API does not have a suspense boundary.
- We have an error right away! The authprovider... Theres no way to fix this without lots of refactor. I suppose we remove this pattern. OR! Let's not await this, and read it with use() inside components. As long as it's suspended, no issue! Like params.
- Add "use cache" and cacheTag to the categories. Now it's fast on both about and home, we can remove this suspense boundary and skeleton. Worry less about millions of skeletons.
- One cache key linked to components, no hassle revalidating many different pages.
- No longer page level static/dynamic. And every cached segment will be a part of the statically generated shell from Partial Prerendering, and can also be prefetched for even faster navigations, cached on the CDN. That's why pushing my searchParams down like this will give me the biggest PPR shell.
- That's why my pattern in the home page is good for both composition and PPR.
- Add "use cache" to the category filters. Remove suspense.
- Add "use cache" to all hybrid components after the home refactor. Hero, FeaturedProducts, FeaturedCategories. Now they're all fast. Remove suspense.
- Add use cache to the Reviews, with cacheLife seconds. Keep the suspense.
- PPR goes down as far as the cache goes, until it meets a dynamic API.
- For the Product, it's inside params, so it can't be static. But, we can still use generateStaticParams. Add an example generateStaticParams.
- And also use "use cache: remote" to cache it between requests to avoid some server load. Inside dynamic API, we still need to add suspense.
- Can only use cache async functions, but since we already did the donut here it’s not a problem for the modal.
- Try add use cache to the ProductDetails. It fails, exposing our dynamic API. Why? We have a dynamic dep. This is also useful for debugging btw. Mark it as dynamic.
- Let's do some cache gymnastics. Weave in dynamic data. Same as donut pattern, let's slot this. Composable caching. This is whats happening all over our app with pages and layouts.
- Still, warning. Every await is now dynamic. The user saved product gives us the suspense warning. This error is caused because my cookies are not suspended. At least now I'll now I wont be blocking any pages. A common problem is not knowing why your app feels slow, with cacheComponents, we will be notified where we need a suspense boundary.
- We could continue this across the whole app, not changing anything in our component tree and structure.
- Our authProvider does not make it dynamic as long as the components using it are suspended, just like searchParams!
- For incrementally adopting, we need to start high up with a dep, then build down. Or use the plain useCache, but for future proofing, consider cache components.
- My route tree is primarily the same, no refactors. Just following RSC best practices and adding caching. And doing gymnastics if I want to optimize, but thats totally voluntary. Every data fetch is server components! One paradigm, one mental model, composable by default.

## Final demo

- See all boundaries, cached stuff. Initial page loads. Almost my entire page is already available.
- Again, every cached segment will be a part of the statically generated shell from Partial Prerendering, and can also be prefetched for even faster navigations.
And with static shell prefetching, we don't see the params of the product on client side navs, because they're already known. We see them only on the initial load here, after that the remote cache handles it.
- Show revalidation working with cacheTag.
- Follow best practises and hopefully it will all just work out the box, giving you max performance.
- There is no reason to be avoiding dynamic APIs anymore. There is not static and dynamic pages. Just performance and composition by default.
