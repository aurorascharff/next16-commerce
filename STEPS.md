# DEMO STEPS

## Setup and problem

- This is a e commerce demo app. Last year when I was here, I focused on dynamic data and how to handle that. This time, I took inspiration from Elkjøp which is the biggest ecommerce platform in the nordics. Thanks to the Prinicipal Software Engineer Tomas Jansson for sparring with me through this demo app.
- The setup is the Next.js App Router, Prisma ORM and an Prisma Postgres DB, Tailwind CSS.
- Demo app. Ecommerce mimic. Everything here looks pretty decent. Home page, browse page, login page, about page, profile page. Performance is pretty good in the CWV plugin.
- Let's say I just built this and its pretty good overall.
- However, I have a problem. My entire app is entirely dynamic. Why? This is preventing me from caching anything or using ISR, even though so much of my app is static.
- Wasting server resources constantly, quickly gets expensive.
- Showcase build output. How can I fix this.
- The goal here is to take this regular Next.js app and enhance it with modern patterns, regarding architecture, composition, and caching capabilities.
- Improvements based on my exp building with server comp also and other codebases I have seen, and what devs commonly do wrong or struggle to find solutions for.

## Go through the app structure

- I have all my pages here. I'm using feature slicing to keep the app router folder clean and easy to read. Could also use the underscore components. Services and queries talking to my db.
- I'm mostly following React Server Component best practises, like doing data fetching inside components, suspending with suitable fallbacks that avoid CLS. Keep component architeture reusable and composable by fetching inside components.
- Composable components like this product and product details that handle their own data fetching, that can be used all over the app. Avoid lots of prop passing from page level.
- Extracting client logic to smaller client components, like this search.

## App and Component Architecture

- Let's not worry about that yet. Let's begin by improving some architectural decisions.
- Notice this user page is very slow. We have a waterfall here. The discounts and saved products are locked inside this page. Many ways to fix it, extract to a UserProfile component. We can also utilize more of the app router to make.
- Use a layout.tsx to parallel fetch this while keeping everything readable. Now it's no longer blocked. Layouts are helpful to minimize the skeletons we need to duplicate code to create. When possible, don't suspend the layout, just the data.
- This user route is actually only accessible when logged in. Let's say we want to handle an unauthorized attempt here in a different way. This is a general error, will trigger this view on any error. Let's enable authInterrupts and create a custom error boundary. There is also a version of forbidden. Use this either in data access or components.
- How about excessive prop passing. It's a very common problem. For exampke, getting the logged in state of a user on the server and passing it to the client.
- Showcase my user profile. Passing props. We likely need this loggedIn state all the time.
- Add authprovider. Awaiting this would block the inital load. Let's pass it as a promise down, keep it as a promise in the provider, then read it with use. LoginButton is now composable again.
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
- Showcase all boundaries. Donut pattern can also be used for framer-motion animation containers, MotionWrapper, showcase. Add animation?

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

- Open next vs code branch and web browser deployed branch. Here, I created a request context hidden URL param, that is being set in middleware. Avoiding doing auth check in the components themselves.
- We can generateStaticParams the different variant.
- Show cache HIT about page. This is actually a common pattern, and is also recommended by the vercel flags sdk using a precompute function. And used by i18n libraries.
- Client side fetch the user specific stuff on the product page, and the reviews because we want them fresh, cache HIT. UseSWR! Endpoints. Pages routes flashbacks.
- But it's even more complex and we're even breaking the sweet new feature typed routes! Need this as Route everywhere. And what about the home page, do we need to client side fetch everything here too?
- Passing lot's of props now from the server side params, losing compositional benefits.
- And also, we can't generateStaticParams thousands of products. But still, viable pattern.

## 
