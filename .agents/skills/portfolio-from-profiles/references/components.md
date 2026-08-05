# Component Library

All components are **plain JSX** (no TypeScript). Section components live in
`src/components/`; reusable 21st.dev-derived primitives live in
`src/components/ui/`. Theme: dark, cyan/blue/purple accents, glassmorphism.

Each section follows the same shell:
```jsx
<section id="<id>" className="py-24 px-6">
  <div className="max-w-6xl mx-auto">
    {/* eyebrow label + gradient <h2> heading */}
    {/* content with whileInView reveals */}
  </div>
</section>
```

---

## Icons.jsx (REQUIRED — lucide dropped brand icons)
```jsx
export function GithubIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}
export function LinkedinIcon({ size = 18, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}
```
Use these everywhere instead of `import { Github, Linkedin } from 'lucide-react'`.
Non-brand icons (Mail, ArrowDown, Menu, X, Briefcase, Award, Star, ExternalLink,
GraduationCap, BookOpen, Trophy, Code2, MapPin, Send, CheckCircle, Users,
GitFork) DO import fine from lucide-react.

---

## ui/ primitives (adapted from 21st.dev → JSX)

### ui/word-rotate.jsx — rotating Hero title
```jsx
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
export function WordRotate({ words, duration = 2800, className = '', motionProps }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI(p => (p + 1) % words.length), duration)
    return () => clearInterval(id)
  }, [words, duration])
  const mp = motionProps ?? {
    initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 }, transition: { duration: 0.3, ease: 'easeOut' },
  }
  return (
    <div className="overflow-hidden py-1">
      <AnimatePresence mode="wait">
        <motion.span key={words[i]} className={className} {...mp}>{words[i]}</motion.span>
      </AnimatePresence>
    </div>
  )
}
```

### ui/number-ticker.jsx — spring stat counter
```jsx
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'
export function NumberTicker({ value, direction = 'up', delay = 0, decimalPlaces = 0, className = '' }) {
  const ref = useRef(null)
  const mv = useMotionValue(direction === 'down' ? value : 0)
  const spring = useSpring(mv, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true, margin: '0px' })
  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => mv.set(direction === 'down' ? 0 : value), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, delay, mv, value, direction])
  useEffect(() => spring.on('change', v => {
    if (ref.current) ref.current.textContent = Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces,
    }).format(Number(v.toFixed(decimalPlaces)))
  }), [spring, decimalPlaces])
  return <span ref={ref} className={`tabular-nums tracking-wider ${className}`} />
}
```
For values like `1.7K+`, pass `value={1.7} decimalPlaces={1}` and render the
`K+` suffix as static text next to the ticker.

### ui/blur-fade.jsx — section reveal
```jsx
import { useRef } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
export function BlurFade({ children, className = '', duration = 0.4, delay = 0, yOffset = 6, blur = '6px', inViewMargin = '-50px' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: inViewMargin })
  const variants = {
    hidden:  { y: yOffset,  opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: 'blur(0px)' },
  }
  return (
    <AnimatePresence>
      <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'}
        exit="hidden" variants={variants}
        transition={{ delay: 0.04 + delay, duration, ease: 'easeOut' }} className={className}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### ui/animated-shiny-text.jsx — badge shimmer
```jsx
export function AnimatedShinyText({ children, shimmerWidth = 100, className = '' }) {
  return (
    <span style={{ '--shiny-width': `${shimmerWidth}px` }}
      className={['animate-shiny-text bg-clip-text bg-no-repeat',
        '[background-position:0_0] [background-size:var(--shiny-width)_100%]',
        '[background-image:linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.55)_50%,transparent_75%)]',
        className].join(' ')}>
      {children}
    </span>
  )
}
```
Requires the `@keyframes shiny-text` + `.animate-shiny-text` in index.css.

### ui/spotlight-card.jsx — cursor-follow glow
```jsx
import { useRef, useState } from 'react'
export function SpotlightCard({ children, className = '', spotlightColor = 'rgba(34,211,238,0.07)' }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [on, setOn] = useState(false)
  return (
    <div ref={ref}
      onMouseMove={e => { const r = ref.current.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }) }}
      onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)}
      className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: on ? 1 : 0, background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 70%)` }} />
      {children}
    </div>
  )
}
```
Wrap skill cards / project cards / hackathon cards with this. Match
`spotlightColor` to each card's accent.

### ui/testimonial-card.jsx — draggable recommendation deck card
Stacked, draggable (swipe-left advances). **Show full text — never line-clamp.**
Cards are `absolute`, width ~360px, auto-height; the parent deck container needs
an explicit height (~520px) and `max-w-[400px]`.
```jsx
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { LinkedinIcon } from '../Icons'
const POSITIONS = { front:{rotate:'-5deg',x:0,zIndex:3}, middle:{rotate:'2deg',x:18,zIndex:2}, back:{rotate:'7deg',x:36,zIndex:1} }
export function TestimonialCard({ testimonial, position, handleShuffle }) {
  const dragRef = useRef(0)
  const isFront = position === 'front'
  const p = POSITIONS[position]
  return (
    <motion.div style={{ zIndex: p.zIndex }} animate={{ rotate: p.rotate, x: p.x }}
      drag={isFront} dragElastic={0.25} dragListener={isFront}
      dragConstraints={{ top:0, left:0, right:0, bottom:0 }}
      onDragStart={e => { dragRef.current = e.clientX }}
      onDragEnd={e => { if (dragRef.current - e.clientX > 120) handleShuffle(); dragRef.current = 0 }}
      transition={{ duration: 0.35, ease: [0.25,0.46,0.45,0.94] }}
      className={`absolute left-0 top-0 w-[360px] select-none flex flex-col gap-4 rounded-2xl
        border border-white/10 bg-[#0f0f17]/95 backdrop-blur-xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)]
        ${isFront ? 'cursor-grab active:cursor-grabbing' : ''}`}>
      <div className="flex items-center gap-3">
        <img src={testimonial.avatar} alt={testimonial.name} width={44} height={44}
          className="w-11 h-11 rounded-full object-cover border border-white/10 bg-slate-800 shrink-0"
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=1a1a2e&color=94a3b8&size=88` }} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight truncate" style={{ fontFamily:"'Space Grotesk',sans-serif" }}>{testimonial.name}</p>
          <p className="text-[11px] text-slate-400 truncate">{testimonial.title}</p>
          <p className="text-[11px] text-cyan-400/80 truncate">{testimonial.company}</p>
        </div>
        <a href={testimonial.linkedin ?? '#'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
          onClick={e => e.stopPropagation()}
          className="p-1.5 rounded-lg bg-[#0a66c2]/15 border border-[#0a66c2]/25 text-[#0a66c2] hover:bg-[#0a66c2]/30 transition-colors shrink-0">
          <LinkedinIcon size={13} />
        </a>
      </div>
      <div className="h-px bg-white/6" />
      <blockquote className="text-[13px] text-slate-300 leading-relaxed flex-1 italic">"{testimonial.text}"</blockquote>
      <div className="flex items-center justify-between">
        <p className="text-[10px] text-slate-600">{testimonial.relation}</p>
        {isFront && <p className="text-[10px] text-slate-600">← swipe to next</p>}
      </div>
    </motion.div>
  )
}
```
Deck wrapper:
```jsx
function ShuffleCards({ cards }) {
  const [order, setOrder] = useState(cards.map((_, i) => i))
  const shuffle = () => setOrder(prev => { const n = [...prev]; n.push(n.shift()); return n })
  const POS = ['front','middle','back']
  return (
    <div className="relative mx-auto w-full max-w-[400px]" style={{ height: 520 }}>
      {order.slice(0,3).map((ci, pi) => (
        <TestimonialCard key={cards[ci].id} testimonial={cards[ci]} position={POS[pi]} handleShuffle={shuffle} />
      ))}
    </div>
  )
}
```

---

## GitHubStats.jsx (replaces the rate-limited readme-stats image)
Fetch `api.github.com` directly, render stat cards + a language-distribution bar
with accurate brand colors. Skeleton while loading; graceful error fallback link.
Key logic:
```jsx
const [userRes, reposRes] = await Promise.all([
  fetch(`https://api.github.com/users/${username}`),
  fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`),
])
const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0)
const totalForks = repos.reduce((s, r) => s + r.forks_count, 0)
// language distribution by repo count:
const langCount = {}; repos.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language]||0)+1 })
```
LANG_COLORS map: Java `#b07219`, JavaScript `#f1e05a`, TypeScript `#3178c6`,
Python `#3572a5`, C++ `#f34b7d`, PHP `#4f5d95`, HTML `#e34c26`, CSS `#563d7c`,
HCL `#844fba`, Jupyter Notebook `#da5b0b`, Shell `#89e051`, Go `#00add8`,
Ruby `#701516`, Rust `#dea584`, C# `#178600`, Kotlin `#a97bff`, Swift `#f05138`,
fallback `#64748b`. Render the bar with per-segment `whileInView scaleX`.

---

## Section components (build each per these specs)

- **Navbar** — fixed, blur-on-scroll. Scroll-spy via `IntersectionObserver`
  (`rootMargin: '-40% 0px -55% 0px'`). Active item = cyan + small fading dot
  (NOT a `layoutId` pill — it streaks). Scroll progress bar at the bottom edge
  using `useMotionValue` + `useSpring` + `useTransform` (map the value to a
  percent string for the bar width). Mobile hamburger via `AnimatePresence`.
- **Hero** — full-height `mesh-bg`, ambient blurred orbs (float keyframes),
  badge with `AnimatedShinyText`, **full name** in `.gradient-text-shimmer`,
  `WordRotate` job titles + blinking cursor, CTA buttons, social icons
  (springy `whileHover`), bouncing scroll-down arrow.
- **About** — bio paragraphs, `BlurFade` highlight rows, stat grid with
  `NumberTicker`, and `<GitHubStats />`.
- **Skills** — category cards (`SpotlightCard`), tags stagger in via parent
  `variants` + `staggerChildren`. Tighter padding (`py-16`) to avoid dead space.
- **Experience** — vertical timeline (scaleY draw-in line), one card per role.
  Each bullet is a `motion.li` with its OWN `whileInView` so deep bullets in
  long cards still animate. Awards as spring-pop chips.
- **Hackathons** — card grid (`SpotlightCard`), icon + year badge + result +
  tags. `py-16`.
- **Projects** — featured (3-col) + rest grid; `SpotlightCard` cards with
  pulsing accent dot for featured; tech tags; star count; live/github links.
- **Education** — timeline like Experience; degree, school, period, highlights.
- **Recommendations** — ONLY the `ShuffleCards` deck (no separate static grid),
  centered, full text, "View all on LinkedIn" CTA. Data array order = user's
  given order.
- **Footer** — copyright + social icons.

## Framer Motion conventions (apply consistently)
```jsx
// section heading
initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
viewport={{ once:true, margin:'-100px' }} transition={{ duration:0.5, ease:'easeOut' }}

// staggered grid
const grid = { hidden:{}, visible:{ transition:{ staggerChildren:0.08, delayChildren:0.05 } } }
const item = { hidden:{ opacity:0, y:28 }, visible:{ opacity:1, y:0, transition:{ duration:0.5, ease:[0.25,0.46,0.45,0.94] } } }
// parent: variants={grid} initial="hidden" whileInView="visible" viewport={{once:true}}
// child:  variants={item}

// springy hover
whileHover={{ y:-6, transition:{ type:'spring', stiffness:280, damping:18 } }}
```
