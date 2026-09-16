# Dev Insights — Mini Blog

A small internal blog platform built for "Dev Insights", implemented with React, TypeScript, and Vite as a Formative Assessment project.

## Tech Stack

- [Vite](https://vitejs.dev/) — build tool and dev server
- [React 19](https://react.dev/) with TypeScript (`react-ts` template)
- No UI/CSS framework or starter template — components, styling and logic were written from scratch for this project

No additional runtime libraries were added beyond `react` and `react-dom` (the Vite scaffold's defaults).

## Getting Started

### Install

```bash
npm install
```

### Run (development)

This project is powered by Vite, so `npm run dev` starts a local dev server with hot module replacement:

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

### Build & preview production bundle

```bash
npm run build     # type-checks with tsc, then builds with Vite into dist/
npm run preview   # serves the production build locally
```

### Test / verify

There is no automated test suite for this project. To verify the app:

```bash
npm run build   # runs `tsc -b`, so type errors will fail the build
npm run lint    # runs oxlint
```

Then run `npm run dev` and open the app in a browser to check it renders the header, post list, highlighted post, and "New!" badge as described below.

## Project Structure

```text
src/
  components/
    Header.tsx       Site header (logo + "New Post" link)
    Header.css
    Post.tsx          Renders a single post
    Post.css
    PostList.tsx      Hardcoded sample posts, renders a list of <Post>
    PostList.css
  hoc/
    withLogger.tsx    Higher-order component: logs mount/unmount
  types/
    Post.ts           Shared `PostData` TypeScript interface
  App.tsx             Root component — renders Header + PostList
  App.css
  main.tsx
  index.css
```

## Design Decisions

### Component types: functional vs. class

- **Header**, **PostList**, and **App** are functional components. They hold no local state and don't need lifecycle methods, so functions keep them short and easy to read.
- **Post** is a **class component**, extending `React.PureComponent`. `PostList` can render many `Post` instances, so `Post` is the component where re-render behavior matters most: `PureComponent` gives it a shallow prop comparison "for free," skipping a re-render when its `post` prop hasn't actually changed, even if a sibling post re-renders. Making it a class also lets its rendering logic live alongside a `render()` method for a clear contrast with the functional components elsewhere in the app.

### Styling

Two styling methods were used, as required:

1. **External CSS files** — each component has a co-located `.css` file (`Header.css`, `Post.css`, `PostList.css`, `App.css`) imported directly into the component. This keeps layout, typography, and color choices out of the component logic.
2. **Inline styles** — used in `Post.tsx` specifically for **conditional** styling that depends on data at render time: a post by a specific author (`Amina Kone`) gets a highlighted background and accent border, computed in a `cardStyle` object and applied via the `style` prop. Static/interactive/non-conditional styling (hover states, spacing, etc.) stays in the external CSS files where it belongs.

Conditional styling implemented:
- **Author highlight** — posts by `Amina Kone` get a highlighted background/border (inline style, computed from `post.author`).
- **"New!" badge** — a post posted within the last 24 hours shows a red "New!" badge next to its title (conditional JSX + external CSS class).

### Optimization

- **`PureComponent`** on `Post` avoids unnecessary re-renders of list items whose props haven't changed (see above).
- **`React.memo`** wraps `Header`, since it takes no props and never needs to re-render after its first render.
- **Unique `key` prop** — `PostList` maps over the sample posts using `post.id` as the `key`, rather than the array index, so React can correctly track each item across re-renders.

### Higher-Order Component

`withLogger` (`src/hoc/withLogger.tsx`) is a generic HOC that wraps any component and logs to the console when it mounts and unmounts, using a `useEffect` with an empty dependency array and a cleanup function. It's applied to `Header` in `Header.tsx`:

```tsx
export default withLogger(MemoizedHeader, 'Header');
```

Open the browser console while running the app in dev mode to see `[withLogger] Header mounted` (and `unmounted`, if the component is ever removed from the tree).

Note: in development, React's `StrictMode` intentionally mounts, unmounts, and re-mounts components once to help surface effect bugs, so you'll briefly see mount → unmount → mount in the console — this doesn't happen in production builds.

## Types

Blog posts are typed with a single shared interface (`src/types/Post.ts`):

```ts
export interface PostData {
  id: number;
  title: string;
  author: string;
  content: string;
  date: string; // ISO 8601 date string
}
```

Using one shared type (rather than re-declaring the shape in each component) keeps `Post` and `PostList` in sync — a change to the post shape only needs to happen in one place.

## Challenges & Reflection

The main design decision to work through was **where** to draw the line between "external CSS" and "inline styles" — it would have been easy to put everything in CSS classes with conditionally-applied class names instead. I chose to reserve inline styles specifically for the one case where styling is a direct function of post data (the author highlight color), which better demonstrates the distinction the assignment is testing rather than using inline styles arbitrarily.

The other consideration was making `Post` a class component without it feeling forced. Tying it to `PureComponent` gave the class-vs-function choice an actual technical justification (shallow prop comparison in a list of repeated items) rather than picking a component type at random just to "check the box."

## Reflection (for Canvas submission)

Building the Mini Blog was honestly the first time a lot of the TypeScript and React concepts I'd only really understood in theory started clicking in an actual codebase. Setting up types for the post object (title, author, content, date) forced me to think upfront about the shape of my data before I even wrote the components that would use it, which is different from how I used to approach plain JavaScript, where I'd usually figure the shape out as I went and fix mismatches when something broke. Deciding between a functional and class component for the Post component was also a good exercise — I went with **class**, extending `PureComponent`, because `Post` is the component that gets rendered repeatedly in a list, so it's the one place in the app where `PureComponent`'s built-in shallow prop comparison actually buys something (skipping a re-render when a post's data hasn't changed). Reasoning through that decision instead of just defaulting to whatever felt familiar helped it stick better than just reading about the difference.

The part I found most valuable was [implementing the HOC / getting conditional styling to work / seeing React.memo actually prevent a re-render in the dev tools] — it was one thing to hear about it in class, and a different thing to watch it actually behave that way in my own project. The main challenge I ran into was [describe your specific bug or sticking point, e.g., getting TypeScript to accept the props I was passing into Post, or figuring out how the HOC should wrap the component], which I worked through by [how you fixed it — checking the TypeScript error message carefully, referring back to the module examples, etc.]. Going forward I'd like to explore [state management across more components / more TypeScript utility types / testing components], since this project mostly stayed within a few components and I'm curious how these same ideas hold up in a bigger app.
