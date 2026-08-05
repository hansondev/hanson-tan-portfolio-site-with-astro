# Deploy to Vercel

The portfolio is a static Vite SPA, so any static host works — but Vercel is the
default. Two routes: **CLI** (fastest) or **GitHub + dashboard** (auto-deploys on
push). Do the prerequisites first, then pick one route.

## Prerequisites (do these first)

### 1. `vercel.json` (SPA routing)
A single-page app needs all paths rewritten to `/` so deep links / refreshes
don't 404. Create `vercel.json` in the project root:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

### 2. Confirm the build settings Vercel will auto-detect
Vite projects are auto-detected, but verify:
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Install command:** `npm install`

### 3. Build locally once — it must pass
```bash
npm run build
```
Never deploy a project whose local build fails.

---

## Route A — Vercel CLI (fastest)

```bash
# one-time
npm install -g vercel        # or use npx without installing
vercel login                 # opens browser; interactive — user runs this

# from the project root
cd <project>                 # e.g. D:\project\portfolio
vercel                       # first run: links/creates the project (preview deploy)
vercel --prod                # promotes to production, prints the live URL
```

Notes:
- `vercel login` is interactive — the user must run it themselves (suggest the
  `! vercel login` prefix so its output lands in this session).
- The first `vercel` run asks a few setup questions (scope, project name, root
  dir, override settings → accept the Vite defaults).
- Re-deploy anytime with `vercel --prod`.

---

## Route B — GitHub + Vercel dashboard (auto-deploy on push)

1. **Push the project to GitHub:**
   ```bash
   cd <project>
   git init
   git add -A
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. Go to **vercel.com → Add New… → Project → Import** the GitHub repo.
3. Vercel auto-detects Vite — confirm Build `npm run build`, Output `dist`.
4. Click **Deploy**. Every future `git push` to `main` auto-deploys; pull
   requests get preview URLs.

---

## Custom domain (optional)
Vercel project → **Settings → Domains → Add**. Point your registrar's DNS
(`A`/`CNAME`) at the values Vercel shows. HTTPS is provisioned automatically.

## Troubleshooting
- **404 on refresh / deep link** → `vercel.json` rewrite missing or malformed.
- **Blank page, console 404s for assets** → wrong Output Directory; must be
  `dist` for Vite (not `build`).
- **Fonts/Tailwind missing in prod but fine in dev** → the `@import` order bug;
  fonts `@import` must precede `@import "tailwindcss";` (see `gotchas.md` #2).
- **Build works locally, fails on Vercel** → commit `package-lock.json`; ensure
  no dependency is only installed globally on your machine.
- **`git` not configured** → set `user.name` / `user.email` before committing.
