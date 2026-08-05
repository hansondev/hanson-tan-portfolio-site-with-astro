# Gotchas & Fixes (learned the hard way)

These broke real builds. Apply preemptively.

## 1. lucide-react dropped brand icons
`import { Github, Linkedin } from 'lucide-react'` → `[MISSING_EXPORT]`, build
fails. Modern lucide-react (v1.x+) removed brand logos. **Fix:** custom inline
SVGs in `Icons.jsx` (see components.md). All non-brand icons import fine.

## 2. Tailwind v4 `@import` ordering
Lightning CSS: `@import` rules must precede all other rules. A Google-Fonts
`@import url(...)` placed AFTER `@import "tailwindcss";` triggers
"@import rules must precede all rules" and fonts silently fail. **Fix:** fonts
first, then `@import "tailwindcss";`, then `tw-animate-css` (if used).

## 3. github-readme-stats is rate-limited
`github-readme-stats.vercel.app/api?username=...` uses a shared public GitHub
token (60 req/hr across ALL users globally) → almost always returns a
"Too Many Requests" SVG on a deployed site. **Fix:** fetch `api.github.com`
directly from the client and render stats natively (`GitHubStats.jsx`). Each
visitor gets their own 60 req/hr unauthenticated budget — plenty for a portfolio.

## 4. LinkedIn returns HTTP 999 to bots
`WebFetch https://linkedin.com/...` → HTTP 999 (bot protection). You CANNOT
scrape profile data or recommendations. **Fix:** use the LinkedIn URL only as a
link; ask the user to paste recommendation text and metadata. Never fabricate
recommendation content.

## 5. `animate={inView ? {...} : {}}` is wrong
The empty `{}` is not a defined off-state, so elements may render in the wrong
state or never animate. **Fix:** use `whileInView={{...}}` +
`viewport={{ once: true, margin: '-80px' }}` with a matching `initial={{...}}`.

## 6. Stagger via variants, not per-item delay
Hardcoding `delay: i * 0.08` on each item is brittle and fights re-renders.
**Fix:** parent gets `variants={grid}` with `transition:{ staggerChildren }`;
children just declare `variants={item}`. Parent: `initial="hidden"
whileInView="visible"`.

## 7. Deep list items in long cards don't reveal
If a long card uses one `motion.ul` with a single `whileInView`, items far down
the card may sit below the viewport trigger and stay hidden/faded. **Fix:** give
EACH `motion.li` its own `whileInView` + `viewport={{ once:true, margin:'-20px' }}`.

## 8. Bare `whileHover` feels cheap
`whileHover={{ y:-4 }}` uses a default linear tween. **Fix:** add
`transition:{ type:'spring', stiffness:280, damping:18 }`.

## 9. MotionValue `.to()` doesn't exist in Framer Motion v12
Calling `.to()` on a spring → blank render / runtime error. **Fix:** map it with
`useTransform` and pass the result to `style`:
```jsx
const width = useTransform(spring, v => `${v}%`)
// ...
<motion.div style={{ width }} />
```

## 10. `layoutId` nav pill streaks
A shared-layout `layoutId` indicator on nav items can animate as a full-width
gradient bar stretching across the page during fast scroll/section changes.
**Fix:** use a small `AnimatePresence` fade+scale dot under the active item
instead of a shared-layout pill.

## 11. Scrollable region inside a draggable card
Adding `overflow-y-auto` (or `stopPropagation` on pointerdown) inside a
Framer `drag` card breaks the drag gesture. **Fix:** let recommendation cards
auto-size to fit full text; give the absolute-positioned deck container an
explicit height that fits the tallest card (~520px).

## 12. 21st.dev components are Next.js + TypeScript
They ship with `"use client"`, TS type annotations, and `next/image`. In a Vite
JSX project these fail. **Fix when adapting:** remove `"use client"`, strip all
TS types, replace `next/image` `<Image>` with `<img>`, and ensure the `@` alias
exists in `vite.config.js`. Place them under `src/components/ui/`.

## 13. Windows / npm notes
- Build/dev commands run from the project dir (`D:\project\portfolio`), not the
  parent. If `npm run build` says "Missing script", you're in the wrong cwd.
- EBADENGINE warnings from eslint deps on Node 22.12 are harmless.
- `mkdir -p` and `rm -f` work via the Bash tool on Windows here.
