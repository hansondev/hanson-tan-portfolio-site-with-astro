# AGENTS.md — Hanson Portfolio

> AI-Powered Full-Stack Digital Marketing Lead | Personal Portfolio
> Deployed at [https://portfolio.hansondev.me](https://portfolio.hansondev.me)

## Project Objective

This is **Hanson Tan's personal portfolio** — a showcase of AI-powered marketing infrastructure built over 9+ years across Meta, TikTok, LinkedIn, and Google Ads. Quantified results: 1819.7% peak ROAS, $60K+/month ad spend managed, 15 production AI systems deployed.

The site serves a dual purpose:
- **Personal brand** — demonstrates expertise in bridging performance marketing with AI automation
- **Working CMS demo** — Astro + Directus headless CMS with visual editing, draft/preview mode, dynamic page builder, and form handling

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro 6 (static output, file-based routing) |
| UI Runtime | React 19 + TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 3, dark mode (`class` strategy), `tailwindcss-animate`, `@tailwindcss/typography` |
| Components | shadcn-style (Radix UI primitives, CVA, lucide-react, cmdk) |
| Forms | react-hook-form + zod validation |
| CMS | Directus (headless, visual editing, content versioning, draft/preview) |
| Package Manager | pnpm (workspace, lockfile) |
| Linting | ESLint (flat config) + Biome (formatting, import organization) |
| Build | Vite 7, PostCSS (nesting + preset-env) |
| Deployment | Vercel / Netlify (static export) |
| Infra | Coolify, n8n (workflow automation) |

Path alias: `@/` → `src/`. TypeScript target: ES2023, JSX: `react-jsx`.

## Site Architecture

**Single-page portfolio** with anchor-scroll sections (all on `index.astro`):

| Section | Route | Content |
|---------|-------|---------|
| Hero | `#hero` | Headline, tagline, CTA buttons |
| Stats Bar | `#stats` | 4 quantified result cards |
| Projects | `#projects` | 15 project cards (Problem→Solution→Impact→Tech Stack) |
| Skills | `#skills` | 4-category grid (AI & Automation, Performance Marketing, Analytics & Data, Web & Infrastructure) |
| Results | `#results` | Case study metric cards with context + impact |
| Process | `#process` | 7-step methodology (Discovery→Architecture→AI Logic→Development→QA→Deployment→Monitoring) |
| About | `#about` | Bio + experience |
| Contact | `#contact` | Contact form section |

**Dynamic routes:**
- `src/pages/[...permalink].astro` — CMS-driven pages via Directus Page Builder
- `src/pages/blog/[slug].astro` — blog posts from Directus

**Supporting routes:**
- `src/pages/api/search.ts` — search API endpoint
- `src/pages/404.astro` — custom 404
- `src/pages/sitemap.xml.ts` — auto-generated sitemap

**Layout:** `src/layouts/BaseLayout.astro` wraps all pages with SEO metadata, NavigationBar, Footer.

## Portfolio Reference Docs

All reference materials live under `reference-portfolio-docs/`:

| Directory | Contents |
|-----------|----------|
| `content-blueprints/` | 7 page blueprints (hero, about, projects, skills, process, results, directus-setup) defining content structure and copy direction |
| `cv-docs/` | Hanson Tan CV in PDF + companion Markdown |
| `portfolio-use-cases-docs/` | 3 portfolio PDFs + extracted Markdown: Agentic AI Marketing Automation, AI Web Dev Portfolio, Media Buy & PPC Campaigns |
| `reference-portfolio-sites/` | Scraped reference sites (bents25-ivan-portfolio, portfolio.hansondev.me) for benchmarking |

## Media Assets Directories

Extracted images from portfolio PDFs live under `reference-portfolio-docs/portfolio-media-assets/`:

- `July26-HT_Media_Buy_&_PPC_Campaigns_Portfolio_V1_compressed/` — 25 cropped dashboard/ad/result visuals
- `July26-HT_AI_Web_Dev_Portfolio_V1_compressed/` — web dev portfolio visuals
- `July2026_Agentic_AI_Marketing_Automation_For_Various_Marketing_Use_Cases_compressed-2/` — 46 extracted embedded images
- `July26-Hanson_Tan_AI_Marketing_CV_2026/` — CV assets

Images are cropped to actual visual regions (not full-page screenshots). Never import these directly — use Directus file library for production assets.

## Brand Voice & Design System

See `design-system/brand.json` and `design-system/DESIGN.md` for the full specification.

**Brand:** Hanson Dev — *"Expert software engineering for developers and businesses who demand precision."*

**Color Palette:**

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| background | Midnight Blue | `#112240` | Primary page canvas |
| surface | Deep Navy | `#1A365D` | Cards, panels |
| accent | Sky Blue | `#7BB5E3` | CTAs, logo, highlights |
| foreground | Light Text | `#E8F1FB` | Body text, headings |
| muted | Muted Blue | `#8BA3C7` | Secondary text, metadata |
| border | Navy Border | `#2D4A6F` | Rules, dividers, input borders |
| accent-secondary | Steel Blue | `#5A9BD5` | Hover states, secondary CTAs |

**Typography:** Inter (display: 400/600/700; body: 400/500), Fira Mono (code). Fallbacks: system-ui → Segoe UI → Helvetica Neue → Arial → sans-serif.

**Voice:** Technical, Professional, Precise. Speaks as an expert practitioner — facts and logic over hype.

**Vocabulary rules:**
- **Use:** Implementation, Architecture, Efficiency, Scalable, Precision, Systems, Performance, Optimization
- **Avoid:** Synergy, Game-changing, Revolutionary, Disruptive, Best-in-class, Cutting-edge, World-class

**Imagery:** Clean line-based iconography, code editor screenshots, terminal output, architecture diagrams, abstract geometric patterns. Technical authenticity over polish. Avoid stock photos and excessive gradients.

**Layout:** 6px border radius, 1px border weight, 8px baseline grid.

**Design system files:** `design-system/system/` — CSS variables, token JSON, component kit HTML, brand system docs.

## MCP Servers

Configured in `opencode.json`:

| Server | Type | Endpoint | Purpose |
|--------|------|----------|---------|
| **directus** | local stdio | `portfolio-cms.hansondev.me` | Directus CMS CRUD: collections, fields, items, files, flows, comments |
| **n8n-mcp** | remote HTTP | `n8n.hansondev.me/mcp-server/http` | n8n workflow automation: build, validate, deploy, execute workflows |
| **coolify** | local stdio | `coolify.hansondev.me` | Coolify infrastructure management |

**Never expose tokens or secrets in code.** MCP credentials live in `opencode.json` only.

## Project Skills

18 skills available under `.agents/skills/`:

| Skill | Purpose |
|-------|---------|
| `astro` | Astro components, routing, content collections, SSR adapters |
| `brandkit` | Premium brand-guidelines boards and identity decks |
| `copy-editing` | Review, polish, and refresh existing marketing copy |
| `copywriting` | Write homepage, landing page, CTA, and value proposition copy |
| `create-agentsmd` | Generate AGENTS.md project memory files |
| `creative-director` | AI creative direction with 20+ ideation methodologies |
| `directus` | Directus collections, fields, items, and CMS integration |
| `frontend-ui-engineering` | Production-quality UI components and layouts |
| `imagen` | Generate images via Gemini API for icons, mockups, assets |
| `impeccable-design-polish` | Audit, critique, animate, and polish web artifacts |
| `markdown-converter` | Convert PDF, DOCX, PPTX, HTML to Markdown |
| `portfolio-case-study-writer` | Transform resume bullets into portfolio case studies |
| `portfolio-from-profiles` | Scaffold portfolio sites from GitHub/LinkedIn profiles |
| `prompt-engineer` | Write, refactor, and evaluate LLM prompts |
| `react` | LobeHub React conventions: base-ui, antd-style, routing |
| `sop-creator` | Generate SOPs, runbooks, checklists, decision trees |
| `use-cases` | Create and optimize use-case/ICP/audience pages |
| `web-artifacts-builder` | Build claude.ai HTML artifacts with React + Tailwind |

Skills from `skills-lock.json`: `create-agentsmd`, `react`, `sop-creator`.

## Development Commands & Workflow

```bash
pnpm install           # Install dependencies
pnpm run dev           # Start dev server (port 3000) — or `astro dev --background`
astro dev stop         # Stop background server
astro dev status       # Check background server status
astro dev logs         # View background server logs
pnpm run build         # Production build (static export)
pnpm run preview       # Preview production build
pnpm run lint          # ESLint cache check
pnpm run lint:fix      # ESLint auto-fix
pnpm run generate:types # Regenerate Directus TypeScript types
```

**Component decision tree (from README):**
- **`.astro`** — static content, no interactivity, no visual editing needed (e.g., Footer, Tagline)
- **`.tsx`** — needs client state, event listeners, React UI library, or Directus visual editing (e.g., Gallery, Form, ThemeToggle)
- **Both versions** — component used inside both Astro and React contexts (e.g., Headline, Text)

**Formatting (Biome):** 2-space indent, single quotes, semicolons always, trailing commas, 120 char line width, LF line endings. Ignore `dist/`, `node_modules/`, `.astro/`, `directus-schema.ts`.

## SOPs — High-Level DOs and DON'Ts

### DO

- **Prefer Astro** as the default component format; use React only when interactivity or visual editing is required
- **Chain through BaseLayout** for every page — it provides SEO metadata, view transitions, theme, nav, and footer
- **Use `@/` path alias** (maps to `src/`) for all imports
- **Edit content via Directus CMS** whenever possible — leverage visual editing, draft/preview, and content versioning
- **Use `lib/directus/fetchers.ts` helpers** for all Directus API calls — never write raw fetch calls
- **Follow brand voice:** Technical, Professional, Precise. Use vocabulary from the approved word list
- **Use existing Tailwind color tokens** (`sky`, `midnight`, `navy-surface`, `light-text`, `muted-blue`, `navy-border`, `steel`) — no new ad-hoc colors
- **Run `pnpm lint` before committing** — ESLint + Biome must pass
- **Regenerate types** (`pnpm run generate:types`) after any Directus schema change
- **Consult `.wiki/`** for decision logs, runbooks, troubleshooting guides, and deployment checklists before implementing
- **Keep content page-specific and focused** — link related pages explicitly rather than duplicating information
- **Preserve accessible focus and keyboard behavior** on all interactive components
- **Prefer compact reusable components** from the existing UI kit over one-off implementations

### DON'T

- **Never edit `src/types/directus-schema.ts`** — it is auto-generated from the Directus schema
- **Don't use stock photos, generic business imagery, or excessive gradients/decorative elements**
- **Don't use banned vocabulary:** Synergy, Game-changing, Revolutionary, Disruptive, Best-in-class, Cutting-edge, World-class
- **Don't embed MCP tokens, API keys, or secrets in component or page code**
- **Don't skip BaseLayout** — it handles critical cross-cutting concerns (SEO, theme, navigation)
- **Don't create new color values** — use the established design system tokens
- **Don't mix Astro and React arbitrarily** — Astro cannot import React state/logic; keep the boundary clean
- **Don't commit without linting** — lint errors block deployment
- **Don't write raw Directus fetch calls** in components — use the fetcher helpers in `lib/directus/`
- **Don't edit the `.wiki/` index files manually** — they are derived caches rebuilt on read
- **Don't use emoji in copy or UI** unless explicitly requested

## Quick Links

- [Astro Docs](https://docs.astro.build)
- [Directus Docs](https://docs.directus.io)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [Project Wiki](.wiki/wiki/_index.md)
- [Design System](design-system/DESIGN.md)
- [Release Checklist](.wiki/wiki/deployment-checklist/release-checklist.md)
