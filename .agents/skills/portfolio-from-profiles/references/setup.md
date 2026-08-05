# Setup & Configuration

Tech stack: **React 19 + Vite + Tailwind CSS v4 + Framer Motion + lucide-react**.

## vite.config.js
Add the Tailwind v4 plugin and the `@` alias (needed for 21st.dev-style
`@/components/ui/...` imports).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

## src/index.css
**Font `@import` MUST precede `@import "tailwindcss"`** (Tailwind v4 / Lightning
CSS enforces `@import` rules come first). Define theme tokens and shared
utility classes here.

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
}

:root {
  --bg-primary: #0a0a0f;
  --bg-secondary: #111118;
  --accent-cyan: #22d3ee;
  --accent-blue: #3b82f6;
  --accent-purple: #a855f7;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}

html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.3); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.6); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #a855f7 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.gradient-text-shimmer {
  background: linear-gradient(135deg,#22d3ee 0%,#3b82f6 35%,#a855f7 65%,#22d3ee 100%);
  background-size: 200% auto;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer-gradient 4s linear infinite;
}
@keyframes shimmer-gradient { 0% { background-position:0% center } 100% { background-position:200% center } }

.card-glass {
  background: rgba(22,22,31,0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.07);
}
.mesh-bg {
  background:
    radial-gradient(ellipse 80% 50% at 20% -10%, rgba(34,211,238,0.08) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 110%, rgba(168,85,247,0.08) 0%, transparent 60%);
}

/* shiny-text keyframe (for animated-shiny-text 21st.dev component) */
@keyframes shiny-text {
  0%, 90%, 100% { background-position: calc(-100% - var(--shiny-width,100px)) 0; }
  30%, 60%      { background-position: calc(100%  + var(--shiny-width,100px)) 0; }
}
.animate-shiny-text { animation: shiny-text 8s cubic-bezier(0.6,0.6,0,1) infinite; }
```

If using `tw-animate-css`: `npm install tw-animate-css` and add
`@import "tw-animate-css";` immediately AFTER `@import "tailwindcss";`.

## index.html
Set title/description/theme-color and font preconnects. Mount `#root`.

## vercel.json (SPA deploy)
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/" }] }
```

## App.jsx composition order
```
Navbar
Hero → About → Skills → Experience → Hackathons → Projects → Education → Recommendations → Contact
Footer
```
Navbar links array must include an entry per section `id` for scroll-spy.
