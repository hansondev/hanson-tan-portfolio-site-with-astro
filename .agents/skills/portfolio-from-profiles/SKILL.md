---
name: portfolio-from-profiles
description: >
  Build a modern, animated personal portfolio website from a user's GitHub and
  LinkedIn profiles. Scaffolds a React + Vite + Tailwind CSS v4 + Framer Motion
  single-page app with Hero, About, Skills, Experience, Hackathons, Projects,
  Education, Recommendations, and Contact sections, plus scroll-triggered
  animations and a dark theme. Trigger when the user asks to "create a
  portfolio", "build a portfolio site", "make a personal website from my
  GitHub/LinkedIn", or provides profile URLs and wants a deployable site.
---

# Portfolio From Profiles

Turn a developer's GitHub + LinkedIn into a polished, animated, Vercel-ready
portfolio. This skill encodes a complete, tested workflow plus the non-obvious
gotchas that break naive attempts.

## Inputs to gather first

Before writing any code, collect:

1. **GitHub username / URL** — required. Scraped automatically (public API).
2. **LinkedIn URL** — for the profile link. LinkedIn **blocks automated
   scraping** (returns HTTP 999), so you CANNOT read it programmatically.
3. **Recommendations** — ask the user to **paste** their LinkedIn
   recommendations (Recommendations → Received). Never invent recommendation
   text; if not provided, ask for it or omit the section.
4. **Target install path** — ask where to create the project (e.g. `D:\project`).
5. **Extra context** — years of experience, current role/study, awards,
   hackathons, target roles. If the user has a master résumé, read it for
   richer Experience/Projects/Hackathons bullets.

If profile data is thin, ask focused questions rather than fabricating facts.

## Workflow

### 1. Plan the design (recommended)
If `ui-ux-pro-max` skill is available, invoke it for the design system
(palette, typography, animation guidance). Default aesthetic that works well:
dark theme (`#0a0a0f` bg), cyan→blue→purple gradient accents, Space Grotesk
display + Inter body, glassmorphism cards.

### 2. Fetch profile data (parallel)
- GitHub profile: `WebFetch https://github.com/<user>` for bio, location,
  pinned repos, achievements.
- Repos with metadata: `WebFetch https://api.github.com/users/<user>/repos?sort=stars&per_page=100`
  for name, description, language, stars, topics, homepage.
- Do NOT attempt to WebFetch LinkedIn — it will 999. Use the URL only as a link.

### 3. Scaffold the project
```bash
cd <target-path>
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
npm install framer-motion lucide-react
npm install -D tailwindcss @tailwindcss/vite
```
Then wire up the config and source files per
`references/setup.md` and `references/components.md`.

### 4. Build sections
Create `src/components/` with: `Navbar`, `Hero`, `About`, `Skills`,
`Experience`, `Hackathons`, `Projects`, `Education`, `Recommendations`,
`Footer`, plus `Icons.jsx` and a `GitHubStats.jsx`. Compose them in `App.jsx`.
Full reusable code lives in `references/components.md`.

### 5. Verify
- `npm run build` must pass cleanly before declaring done.
- Optionally drive the dev server with Playwright (`chromium`) and screenshot
  each section to catch layout/animation issues — see `references/verify.md`.

### 6. Deploy to Vercel
Add `vercel.json` (SPA rewrite), confirm `npm run build` passes, then deploy via
the Vercel CLI (`vercel` → `vercel --prod`) or by importing the GitHub repo in
the Vercel dashboard (auto-deploys on push). Full steps, build settings, custom
domains, and troubleshooting are in `references/deploy.md`.

## Critical gotchas (these WILL bite you)

Read `references/gotchas.md` for the full list. The headline ones:

1. **lucide-react has no brand icons** (≥ v1.x dropped `Github`/`Linkedin`).
   Importing them fails the build. Use custom inline SVG components — see
   `references/components.md` → `Icons.jsx`.
2. **Tailwind v4 `@import` order**: Google-Fonts `@import url(...)` MUST come
   *before* `@import "tailwindcss";` or the build warns and fonts may not load.
3. **`github-readme-stats.vercel.app` is rate-limited** (shared public token →
   "Too Many Requests" image). Don't embed it. Fetch `api.github.com` directly
   and render stats natively — see `GitHubStats.jsx`.
4. **LinkedIn returns HTTP 999** to bots. Never promise to scrape it. Have the
   user paste recommendations; store them in a clearly-marked data array.
5. **Framer Motion scroll reveals**: use `whileInView` + `viewport={{ once:true }}`,
   NOT `animate={inView ? {...} : {}}` (the empty object is not a valid
   off-state). For lists, stagger via parent `variants` + `staggerChildren`,
   not hardcoded per-item `delay`. Long cards: put `whileInView` on each
   child `<li>` so deep items still trigger.
6. **Hover should feel springy**: `whileHover={{ y:-6, transition:{ type:'spring',
   stiffness:280, damping:18 } }}` — a bare `whileHover={{y:-4}}` uses a linear
   tween and feels cheap.
7. **MotionValue → CSS string**: convert the spring with `useTransform` (map the
   value to a percent string), NOT `spring.to(...)` — `.to()` does not exist in
   Framer Motion v12. Driving a scroll progress bar from React state with an
   inline width string also works but is janky; prefer
   `useMotionValue` + `useSpring` + `useTransform`. See `references/gotchas.md` #9.
8. **Nav active indicator with `layoutId`** can stretch into a full-width
   artifact across the page during scroll. Prefer a small fading dot
   (`AnimatePresence` + scale) over a shared-layout pill if you see streaking.
9. **21st.dev components are Next.js + TS**: strip `"use client"`, remove TS
   types, and replace `next/image` with `<img>` when adapting to a Vite JSX
   project. Components live under `src/components/ui/` (shadcn convention) and
   need an `@` alias (`vite.config.js` → `resolve.alias`).

## Optional enhancements (21st.dev)
These were integrated successfully and are documented in
`references/components.md`: `word-rotate` (rotating Hero title),
`number-ticker` (spring stat counters), `blur-fade` (section reveals),
`animated-shiny-text` (badge shimmer), `spotlight-card` (cursor-follow glow on
cards), and a draggable `testimonial-card` deck for recommendations
(show FULL recommendation text — do not `line-clamp` it).

## Personalization rules
- Use the person's **full name** in the Hero headline.
- Order recommendations exactly as the user provides them.
- Map repo languages to accurate brand colors in the language breakdown.
- Keep all quantified achievements from the résumé intact in Experience bullets.

## Example

**User:**
> Create a Vercel React app containing my personal portfolio. Scan my GitHub and
> LinkedIn for details. Plan the UI/UX first, add animations, and put the project
> in `D:\project`.
> GitHub: https://github.com/janedoe — LinkedIn: https://linkedin.com/in/janedoe

**Assistant runs this skill:**
1. Invokes `ui-ux-pro-max` for the design system; `WebFetch`es
   `github.com/janedoe` and `api.github.com/users/janedoe/repos` in parallel.
   Notes that LinkedIn 999s and asks Jane to paste her recommendations.
2. Scaffolds `D:\project\portfolio` (Vite React + Tailwind v4 + Framer Motion +
   lucide-react), wires `vite.config.js` (@ alias) and `index.css` (fonts before
   tailwind).
3. Writes `Icons.jsx` (custom Github/Linkedin SVGs), the `ui/` primitives,
   `GitHubStats.jsx` (live api.github.com fetch), and all section components
   populated from the scraped repos + pasted résumé/recommendation data.
4. `npm run build` passes; drives the dev server with Playwright and screenshots
   each section to catch layout/animation issues.
5. Adds `vercel.json` and tells Jane to run `npx vercel --prod`.

**Follow-up requests the skill also handles** (each maps to a documented fix):
> "GitHub stats and top languages are broken" → swap readme-stats image for
> `GitHubStats.jsx` (gotcha #3). · "There's a stray motion bar after About" →
> remove the stray section / fix `layoutId` streak (gotcha #10). · "Add a
> recommendations section with good UI" → 21st.dev draggable testimonial deck. ·
> "Show full recommendation text" → remove `line-clamp` (gotcha #11). · "Use my
> full name at the start" → full name in Hero headline.

---

## Publishing this skill

This skill is a plain folder of Markdown — publish it by sharing that folder.
Pick whichever distribution fits:

### A. Personal skill (already done)
It lives at `~/.claude/skills/portfolio-from-profiles/` and works in every
session on this machine. Nothing else needed.

### B. Project skill (ship it inside a repo)
Make it available to anyone who clones a given project:
1. Copy the folder into the repo: `<repo>/.claude/skills/portfolio-from-profiles/`.
2. Commit it. Teammates get it automatically when they open the repo in Claude Code.

### C. Publish as a shareable plugin (Git-hosted)
Distribute it as an installable Claude Code plugin via a marketplace repo:

1. **Create a repo** (e.g. `portfolio-skill`) with this layout:
   ```
   portfolio-skill/
   ├── .claude-plugin/
   │   └── marketplace.json
   └── plugins/
       └── portfolio-from-profiles/
           ├── .claude-plugin/
           │   └── plugin.json
           └── skills/
               └── portfolio-from-profiles/
                   ├── SKILL.md
                   └── references/...
   ```
2. **`plugins/portfolio-from-profiles/.claude-plugin/plugin.json`:**
   ```json
   {
     "name": "portfolio-from-profiles",
     "version": "1.0.0",
     "description": "Build an animated React portfolio from GitHub + LinkedIn profiles.",
     "author": { "name": "Sanif Ali Momin" }
   }
   ```
3. **`.claude-plugin/marketplace.json`** (repo root):
   ```json
   {
     "name": "sanif-skills",
     "owner": { "name": "Sanif Ali Momin" },
     "plugins": [
       { "name": "portfolio-from-profiles", "source": "./plugins/portfolio-from-profiles" }
     ]
   }
   ```
4. **Push to GitHub** (public).
5. **Others install it** in Claude Code:
   ```
   /plugin marketplace add <your-gh-username>/portfolio-skill
   /plugin install portfolio-from-profiles@sanif-skills
   ```
   Then `/help` or the skills list shows it; it triggers on the phrases in this
   file's `description`.

### D. Share as a zip
Zip the `portfolio-from-profiles/` folder and send it. The recipient unzips it
into their `~/.claude/skills/` (personal) or `<repo>/.claude/skills/` (project).

### Pre-publish checklist
- `SKILL.md` frontmatter has a clear `name` + trigger-rich `description`.
- No secrets, no machine-specific absolute paths inside the references.
- All reference links are relative (`references/...`).
- (Plugin route) `plugin.json` and `marketplace.json` parse as valid JSON —
  run `node -e "JSON.parse(require('fs').readFileSync('<file>','utf8'))"`.
