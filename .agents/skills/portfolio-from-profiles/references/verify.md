# Verify (build + visual)

## 1. Build gate (always)
```bash
cd <project>
npm run build
```
Must finish with `✓ built` and no `[MISSING_EXPORT]` / CSS `@import` errors
before you tell the user it's done.

## 2. Visual check (recommended)
Drive the dev server with Playwright `chromium` and screenshot each section.
Playwright may need a one-time install:
```bash
npx playwright install chromium --with-deps
# if 'Cannot find module playwright' when running an inline node script,
# install it in the cwd you run node from:
npm install playwright
```

Start the dev server (note the actual port it prints — Vite auto-increments if
busy):
```bash
npm run dev -- --port 5180   # run in background
```

Screenshot script (run node from the dir where `playwright` is installed):
```js
const { chromium } = require('playwright')
;(async () => {
  const b = await chromium.launch()
  const page = await b.newPage()
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('http://localhost:5180', { waitUntil: 'networkidle' })
  const h = await page.evaluate(() => document.documentElement.scrollHeight)
  for (const [name, frac] of [['hero',0],['about',0.15],['skills',0.3],
       ['experience',0.45],['projects',0.6],['recs',0.8],['contact',0.95]]) {
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), Math.floor(h*frac))
    await page.waitForTimeout(900)
    await page.screenshot({ path: `shot_${name}.png` })
  }
  await b.close()
})()
```
Then `Read` each PNG and check for: clipped/truncated text, faded-but-never-
revealed elements (scroll-trigger bug), large dead vertical space, overlapping
cards, broken images, nav indicator streaking, full-name in Hero, full
recommendation text visible.

## 3. Common visual fixes
- Dead space below a section → reduce `py-24` to `py-16`.
- Faded bullets deep in a card → per-`<li>` `whileInView` (gotcha #7).
- Truncated recommendation → remove `line-clamp`, size deck container to tallest card.
- Streaking nav bar → replace `layoutId` pill with fading dot (gotcha #10).
- Mid-animation screenshot looks "broken" → scroll past and wait; it's just the
  reveal in progress, not a real defect.
