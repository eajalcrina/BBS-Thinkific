# Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the BBS home page (`/`) with the new brand identity, copy, and light/dark visual system, and remove every trace of the discontinued "404 Tech Found" / "Biotech Sprint 01" program from the codebase.

**Architecture:** Vite + React SPA (no test framework in this repo — verification is `npm run build` + grep + visual check in the browser preview, not unit tests). One new component per home section, composed in `src/pages/Home.jsx`. Dead/legacy code is deleted up front so every later task lands on a clean tree.

**Tech Stack:** React 18, React Router 7, Framer Motion, plain CSS custom properties (`src/index.css`) — no CSS framework, no new dependencies.

## Global Constraints

- All section copy is verbatim from `BBS_Copy_Landing_Home_v4.md` — never paraphrased or summarized.
- Zero case-insensitive matches for `404`, `biotech sprint`, or `sprint01` anywhere in the repo (code, metadata, docs) by the last task.
- Palette: `--fro-bg` (`#0A0A0A`) for dark sections; `--fro-bg-light` (`#FAF8F2`) / `--fro-bg-white` (`#FFFFFF`) for light sections; `--fro-ink` (`#2B2B2B`) for text on light backgrounds; `--fro-amber` (`#FFC800`) as accent only (button fill, chip border, underline mark) — **never** as a text color on a light background. Lime and rose are retired from BBS scope (they remain reserved for the unrelated NESsT dashboard palette).
- Typography stays Syne (headings) + Inter (body) + Barlow Condensed (labels, buttons, wordmark) — no Outfit/DM Sans added.
- Section order/background rhythm: Hero (dark) → Tres ejes (light) → Los 6 programas (light) → Comunidad Biobuilders (dark) → Red de aliados (light) → Diagnóstico CTA doble (light) → Respaldo institucional + Endorsements (dark) → Footer (dark).
- WhatsApp community link: `https://chat.whatsapp.com/EnVjmCxvR6Q6TaUORbLAj8`.
- Program routes referenced (not built in this plan): `/programas/ia-nuevos-profesionales`, `/programas/ia-profesionales-senior`, `/programas/negocios-regenerativos`, `/programas/marcas-regenerativas`, `/programas/economia-circular-industria`, `/programas/capital-de-impacto`.
- Diagnostic routes referenced (not built in this plan): `/diagnostico/profesionales`, `/diagnostico/empresas`.
- This branch (`home-redesign`) does not merge to `main` until the subpage and diagnostic subsystems exist — that's a merge-timing decision for Eddie, not a task in this plan.
- `npm run build` must succeed after every task below.

---

### Task 1: Remove legacy/dead code and stand up a minimal Home shell

**Files:**
- Delete: `src/pages/Sprint01.jsx`
- Delete: `src/components/sprint01/` (entire directory — `Accordion.jsx`, `FAQAccordion.jsx`, `SprintCTAFinal.jsx`, `SprintCamino.jsx`, `SprintCreadores.jsx`, `SprintFAQ.jsx`, `SprintHero.jsx`, `SprintIncluye.jsx`, `SprintModulos.jsx`, `SprintNav.jsx`, `SprintParaQuien.jsx`, `SprintPricing.jsx`, `SprintProblem.jsx`, `SprintStarterKit.jsx`)
- Delete: `docs/PRD-Biotech-Sprint-01-Landing.md`
- Delete: `src/components/Problem.jsx`, `src/components/BioBuilder.jsx`, `src/components/Course.jsx`, `src/components/Book.jsx`, `src/components/Community.jsx`, `src/components/Team.jsx`, `src/components/FAQ.jsx`, `src/components/HeroFroohm.jsx`
- Modify: `src/App.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/lib/utm.js`
- Modify: `index.html`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Produces: `src/pages/Home.jsx` exporting default `Home()` — a minimal shell (`Nav` + empty `<main id="main">` + `Footer`) that every later task adds one `<Section/>` into.

- [ ] **Step 1: Delete the Sprint01 page and its components**

```bash
rm -rf "src/pages/Sprint01.jsx" "src/components/sprint01" "docs/PRD-Biotech-Sprint-01-Landing.md"
```

- [ ] **Step 2: Delete the old home-section components that are not part of the new structure**

```bash
rm "src/components/Problem.jsx" "src/components/BioBuilder.jsx" "src/components/Course.jsx" \
   "src/components/Book.jsx" "src/components/Community.jsx" "src/components/Team.jsx" \
   "src/components/FAQ.jsx" "src/components/HeroFroohm.jsx"
```

- [ ] **Step 3: Rewrite `src/App.jsx` to drop the `/sprint01` route**

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home.jsx'

const Privacy = lazy(() => import('./pages/Privacy.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight:'100vh' }}/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

- [ ] **Step 4: Reduce `src/pages/Home.jsx` to a minimal shell**

```jsx
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
      </main>
      <Footer/>
    </>
  )
}
```

- [ ] **Step 5: Remove the `SPRINT_01` campaign constant from `src/lib/utm.js`**

Open `src/lib/utm.js` and remove the `SPRINT_01: 'sprint01',` line from the `CAMPAIGNS` object, leaving:

```js
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL: 'playbook_digital',
  PLAYBOOK_IMPRESO: 'playbook_impreso',
  COMMUNITY:        'community_whatsapp',
}
```

- [ ] **Step 6: Remove the Sprint01-only structured data blocks from `index.html`**

Delete these three `<script type="application/ld+json">` blocks entirely (keep the `Organization` and `WebSite` blocks — they don't reference Sprint01):
1. The block commented `<!-- ═══ Structured Data — Biotech Sprint 01 Course ═══ -->` (the `"@type": "Course"` block for "Biotech Sprint 01").
2. The block commented `<!-- ═══ Structured Data — FAQPage (sincronizado con src/components/FAQ.jsx) ═══ -->` — the FAQ section is being removed from the home in this plan (Task 1 already deleted `FAQ.jsx`), and this schema's own content references "Biotech Sprint 01" and "Early Bird $40 USD", which must go regardless.
3. The block commented `<!-- ═══ Structured Data — BreadcrumbList (Sprint 01) ═══ -->`.

Also remove the now-orphaned HTML comments left behind by those deletions.

- [ ] **Step 7: Remove the `/sprint01` entry from `public/sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <url>
    <loc>https://biobusinessschool.org/</loc>
    <lastmod>2026-08-31</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

</urlset>
```

- [ ] **Step 8: Verify the build**

Run: `npm run build`
Expected: build succeeds with no errors (warnings about unused old imports are not expected since every deleted file's importer was also updated/deleted above — if you see a "Could not resolve" error, you missed removing an import of a deleted file).

- [ ] **Step 9: Verify no orphaned imports of deleted files remain**

Run: `grep -rn "Sprint01\|SprintHero\|components/Problem\|components/BioBuilder\|components/Course\|components/Book\|components/Community\|components/Team\|components/FAQ\|HeroFroohm" src/`
Expected: no output.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: remove Biotech Sprint 01 / 404 Tech Found and legacy home sections

Deletes the sprint01 route, its components, the old PRD doc, the
Sprint01/FAQPage/BreadcrumbList structured data in index.html, the
sitemap entry, and the legacy home-section components that aren't
part of the new structure. Home.jsx is reduced to a minimal shell
that later tasks build up section by section.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Add light-section design tokens and utility classes

**Files:**
- Modify: `src/index.css`

**Interfaces:**
- Produces: CSS custom properties `--fro-bg-light`, `--fro-bg-white`, `--fro-ink`, `--fro-ink-2`, `--fro-ink-3`, `--fro-ink-line`; utility classes `.fro-bg-light`, `.fro-bg-white`, `.fro-on-light` (descendant-scoped text-color overrides for `.fro-eyebrow`/`.fro-h2`/`.fro-h3`/`.fro-lead`/`.fro-body`/`.fro-sm`/`.fro-card`), `.fro-chip-outline`, `.fro-mark-amber`. All later tasks (3–10) rely on these class names.

- [ ] **Step 1: Add the new custom properties**

In `src/index.css`, inside the `:root { ... }` block, right after the existing `/* ── Bio Business School palette (home + /sprint01) ───────── */` block (after the `--fro-danger`/`--fro-success` lines and before `--fsyne`), add:

```css
  --fro-bg-light: #FAF8F2;
  --fro-bg-white: #FFFFFF;
  --fro-ink:      #2B2B2B;
  --fro-ink-2:    rgba(43,43,43,0.68);
  --fro-ink-3:    rgba(43,43,43,0.48);
  --fro-ink-line: rgba(43,43,43,0.12);
```

- [ ] **Step 2: Add the light-section utility classes**

Right after the existing `/* Section background variants */` block (the `.fro-bg-1`/`.fro-bg-2`/`.fro-bg-3` rules), add:

```css
/* ══ BBS Light section variants (Home redesign) ═══════════ */
.fro-bg-light { background: var(--fro-bg-light); }
.fro-bg-white { background: var(--fro-bg-white); }

.fro-on-light .fro-eyebrow { color: var(--fro-ink-2); }
.fro-on-light .fro-h2,
.fro-on-light .fro-h3 { color: var(--fro-ink); }
.fro-on-light .fro-lead,
.fro-on-light .fro-body { color: var(--fro-ink-2); }
.fro-on-light .fro-sm { color: var(--fro-ink-3); }
.fro-on-light .fro-card { background: var(--fro-bg-white); border-color: var(--fro-ink-line); }

.fro-chip-outline {
  display: inline-flex; align-items: center; gap: 0.4rem;
  padding: 0.32rem 0.8rem; border-radius: 20px;
  border: 1.5px solid var(--fro-ink); color: var(--fro-ink);
  font-family: var(--finter); font-size: 0.72rem; font-weight: 700;
  letter-spacing: 0.02em;
}

.fro-mark-amber { position: relative; white-space: nowrap; }
.fro-mark-amber::before {
  content: ''; position: absolute; left: -0.06em; right: -0.06em; bottom: 0.06em; height: 0.32em;
  background: var(--fro-amber); opacity: 0.55; z-index: -1; border-radius: 2px;
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds (CSS is unused so far — this task only adds tokens/classes, no visual change yet).

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "style: add light-section design tokens and utility classes

Adds --fro-bg-light/--fro-bg-white/--fro-ink tokens and the
.fro-on-light / .fro-chip-outline / .fro-mark-amber utilities that
the new home sections (Tasks 3-10) consume.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Rewrite Nav.jsx

**Files:**
- Modify: `src/components/Nav.jsx`

**Interfaces:**
- Consumes: `trackCta(ctaId, location, destination)` from `../lib/analytics.js` (existing).
- Produces: `Nav` default export, unchanged usage (`<Nav/>`, no props) — already wired in `Home.jsx` from Task 1.

- [ ] **Step 1: Replace the full contents of `src/components/Nav.jsx`**

```jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { trackCta } from '../lib/analytics.js'

const LINKS = [
  ['#programas',   'Programas'],
  ['#comunidad',   'Comunidad'],
  ['#diagnostico', 'Diagnóstico'],
]

const Logo = () => (
  <span style={{ fontFamily:'var(--fbc)', fontWeight:700, fontSize:'1.25rem', letterSpacing:'-0.01em', color:'var(--fro-text)', userSelect:'none' }}>
    bio<span style={{ color:'var(--fro-amber)' }}>/</span>business
  </span>
)

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    fn()
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y:-60, opacity:0 }}
        animate={{ y:0, opacity:1 }}
        transition={{ duration:0.5, ease:[0.22,1,0.36,1] }}
        role="banner"
        style={{
          position:'sticky', top:0, zIndex:100,
          background: scrolled ? 'rgba(10,10,10,0.82)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(140%) blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--fro-line)' : '1px solid transparent',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <nav className="fro-wrap" aria-label="Principal" style={{ height:70, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'2rem' }}>
          <a href="#top" aria-label="Ir al inicio — Bio Business School" style={{ display:'flex', alignItems:'center', textDecoration:'none', flexShrink:0 }}>
            <Logo/>
          </a>

          <ul className="nav-ul" style={{ display:'flex', gap:'2rem', listStyle:'none' }}>
            {LINKS.map(([h,l]) => (
              <li key={h}>
                <a href={h}
                  onClick={() => trackCta(`nav_${h.slice(1)}`, 'home_nav', h)}
                  style={{ fontFamily:'var(--finter)', fontSize:'0.83rem', fontWeight:500, color:'var(--fro-text-2)', textDecoration:'none', transition:'color 0.18s' }}
                  onMouseEnter={e => e.currentTarget.style.color='var(--fro-text)'}
                  onMouseLeave={e => e.currentTarget.style.color='var(--fro-text-2)'}
                >{l}</a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="nav-burger"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(v => !v)}
            style={{
              width:42, height:42, borderRadius:6,
              background:'transparent', border:'1px solid var(--fro-line-2)',
              color:'var(--fro-text)', cursor:'pointer',
              display:'none', alignItems:'center', justifyContent:'center', flexShrink:0,
            }}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden>
              <rect y={open ? 6 : 0} width="18" height="1.6" fill="currentColor" style={{ transformOrigin:'center', transform: open?'rotate(45deg)':'none', transition:'transform 0.2s' }}/>
              <rect y="6" width="18" height="1.6" fill="currentColor" style={{ opacity: open?0:1, transition:'opacity 0.15s' }}/>
              <rect y={open ? 6 : 12} width="18" height="1.6" fill="currentColor" style={{ transformOrigin:'center', transform: open?'rotate(-45deg)':'none', transition:'transform 0.2s' }}/>
            </svg>
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú móvil"
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            transition={{ duration:0.2 }}
            style={{
              position:'fixed', inset:0, zIndex:99,
              background:'rgba(10,10,10,0.96)',
              backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)',
              padding:'6rem 2rem 2rem',
            }}
          >
            <motion.ul
              initial="hidden" animate="show"
              variants={{ hidden:{}, show:{ transition:{ staggerChildren:0.04, delayChildren:0.08 } } }}
              style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'1rem' }}
            >
              {LINKS.map(([h,l]) => (
                <motion.li key={h} variants={{ hidden:{ opacity:0, x:-20 }, show:{ opacity:1, x:0 } }}>
                  <a href={h} onClick={() => setOpen(false)}
                    style={{ display:'block', padding:'0.6rem 0', fontFamily:'var(--fsyne)', fontSize:'2rem', fontWeight:600, letterSpacing:'-0.02em', color:'var(--fro-text)', textDecoration:'none', borderBottom:'1px solid var(--fro-line)' }}>
                    {l}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .nav-ul { display: none !important; }
          .nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Visual check in the browser preview**

Start the dev server preview (`bbs-dev`, port 5173), navigate to `/`, and confirm: the wordmark renders in Barlow Condensed (a condensed sans, distinct from the Syne body font), there is no solid amber "Únete gratis" button in the header, and the three links (Programas, Comunidad, Diagnóstico) are visible. They won't scroll anywhere yet since the target sections don't exist until later tasks — that's expected at this point.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "feat: rewrite Nav with new links and Barlow Condensed wordmark

Drops the old #problema/#biobuilder/#sprint01/#libro/#equipo/#faq
anchors and the persistent 'Únete gratis' CTA in favor of three
links to the new sections (Programas, Comunidad, Diagnóstico) and a
minimal, boutique header. Wordmark now renders in Barlow Condensed
per the brief's non-negotiable logo spec.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: Build Hero.jsx

**Files:**
- Modify: `src/components/Hero.jsx` (this file currently exists but is dead code — an orphan that only `CellCanvas.jsx` imports and nothing in the app renders. Step 1 below replaces its entire content, which also removes its `CellCanvas` import.)
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `FadeIn` from `./FadeIn.jsx`, `trackCta` from `../lib/analytics.js` (both existing).
- Produces: `Hero` default export, no props, renders a `<section id="top">` — the `id="top"` is what `Nav.jsx`'s logo link (`href="#top"`) targets.

- [ ] **Step 1: Create `src/components/Hero.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

const STATS = [
  ['+30 años combinados', ''],
  ['USD 1M', 'en grants'],
  ['USD 1.5M', 'en deuda de impacto'],
  ['USD 80M', 'en levantamiento de capital'],
]

export default function Hero() {
  return (
    <section id="top" className="fro-sec" style={{ paddingTop:'8rem', background:'linear-gradient(160deg, var(--fro-bg) 0%, #131313 55%, var(--fro-bg-3) 100%)' }}>
      <div className="fro-wrap">
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom:'1.8rem' }}>
            Formación especializada · Industrias de sistemas vivos · Perú, Colombia y LATAM
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="fro-display" style={{ fontSize:'clamp(2.4rem, 6vw, 5.2rem)', maxWidth:920, marginBottom:'1.6rem' }}>
            Transformamos América Latina y el Caribe con inteligencia artificial.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'1.2rem' }}>
            De Eddie Ajalcriña (Lima) y Lorenzo Ortiz (Bogotá), respaldados por Redesign Lab: formación especializada para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la IA y lideren ese cambio, en toda la región.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-sm" style={{ maxWidth:600, marginBottom:'2.4rem' }}>
            Antes de esto, ayudamos a diseñar programas de formación para instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE. Aquí destilamos ese mismo nivel, para tu carrera o tu negocio.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <a
            href="#programas"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('hero_ver_programas', 'home_hero', '#programas')}
          >
            Ver los 6 programas <span aria-hidden>→</span>
          </a>
        </FadeIn>

        <FadeIn delay={0.34}>
          <div className="hero-stats" style={{ display:'flex', gap:'2.4rem', flexWrap:'wrap', marginTop:'3.6rem', paddingTop:'2.4rem', borderTop:'1px solid var(--fro-line)' }}>
            {STATS.map(([big, small]) => (
              <div key={big}>
                <div style={{ fontFamily:'var(--fsyne)', fontWeight:700, fontSize:'1.4rem', color:'var(--fro-text)' }}>{big}</div>
                {small && <div className="fro-sm">{small}</div>}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire `Hero` into `src/pages/Home.jsx`**

```jsx
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
      </main>
      <Footer/>
    </>
  )
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual check in the browser preview**

Reload `/` in the browser preview and take a screenshot. Confirm: dark gradient background, badge/titular/subtítulo/línea de credibilidad/CTA/stats bar all present and matching the copy above verbatim, and clicking "Ver los 6 programas" scrolls to an empty area (the `#programas` target doesn't exist until Task 6 — that's expected).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx src/pages/Home.jsx
git commit -m "feat: add new Hero section

Verbatim copy from BBS_Copy_Landing_Home_v4.md §1: badge, titular,
subtítulo, línea de credibilidad institucional, CTA, and the 4-stat
credibility bar.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: Build TresEjes.jsx (Venn diagram) and delete the last orphaned files

**Files:**
- Create: `src/components/TresEjes.jsx`
- Modify: `src/pages/Home.jsx`
- Delete: `src/components/Mission.jsx`, `src/components/CellCanvas.jsx`, `src/components/CellSystem.jsx` (dead code — `Mission.jsx`'s Venn SVG pattern is adapted into `TresEjes.jsx` in Step 1 below, then the source file is deleted in Step 3. `src/components/Hero.jsx`, created fresh in Task 4, is **not** touched by this task.)

**Interfaces:**
- Consumes: `FadeIn` from `./FadeIn.jsx` (existing), `motion` from `framer-motion` (existing dependency).
- Produces: `TresEjes` default export, no props, renders `<section id="tres-ejes">`.

- [ ] **Step 1: Create `src/components/TresEjes.jsx`**

```jsx
import { motion } from 'framer-motion'
import FadeIn from './FadeIn.jsx'

const EJES = [
  { cx:130, cy:148, label:['Empresas y', 'capital'] },
  { cx:280, cy:148, label:['Sistemas', 'vivos'] },
  { cx:430, cy:148, label:['Inteligencia', 'artificial'] },
]

function VennDiagram() {
  return (
    <div style={{ width:'100%', maxWidth:520, margin:'0 auto' }}>
      <svg viewBox="0 0 560 300" xmlns="http://www.w3.org/2000/svg" width="100%" style={{ overflow:'visible' }} role="img" aria-label="Diagrama: Bio Business School en la intersección de empresas y capital, sistemas vivos, e inteligencia artificial">
        <defs>
          <radialGradient id="te-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,200,0,0.28)"/>
            <stop offset="100%" stopColor="rgba(255,200,0,0)"/>
          </radialGradient>
        </defs>
        {EJES.map((c,i) => (
          <motion.circle key={i} cx={c.cx} cy={c.cy} r={110}
            fill="url(#te-g)" stroke="rgba(43,43,43,0.18)" strokeWidth="1.5"
            initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.8, delay:i*0.15, ease:[0.22,1,0.36,1] }}
            style={{ transformOrigin:`${c.cx}px ${c.cy}px` }}
          />
        ))}
        {EJES.map((c,i) => (
          <motion.g key={'l'+i} initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.5+i*0.1 }}>
            <text x={c.cx} y={142} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="var(--fro-ink)">{c.label[0]}</text>
            <text x={c.cx} y={160} textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="600" fontSize="13" fill="var(--fro-ink)">{c.label[1]}</text>
          </motion.g>
        ))}
      </svg>
    </div>
  )
}

export default function TresEjes() {
  return (
    <section id="tres-ejes" className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Dónde vivimos</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'2.6rem', maxWidth:820 }}>
            Bio Business School existe en la intersección de tres mundos
          </h2>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="fro-card" style={{ padding:'2rem', marginBottom:'2.6rem' }}>
            <VennDiagram/>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-lead" style={{ maxWidth:720, marginBottom:'1.6rem' }}>
            ¿Tu industria depende de un sistema vivo? Probablemente sí. Casi toda actividad económica depende, directa o indirectamente, de algo que la naturaleza produce o regula: agua, biomasa, suelo, biodiversidad. Pesca, agricultura, acuicultura, minería, energía, textil, alimentos, farmacéutica. Incluso la infraestructura que sostiene la inteligencia artificial depende de sistemas vivos, porque los centros de datos consumen agua y energía que salen de ecosistemas reales. Si tu negocio se sostiene sobre algo que la naturaleza sostiene primero, esto es para ti.
          </p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <p className="fro-body" style={{ maxWidth:640, fontWeight:600 }}>
            Ahí, en esa intersección, es donde la región deja de exportar materia prima y empieza a exportar valor.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire `TresEjes` into `src/pages/Home.jsx`**

```jsx
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <TresEjes/>
      </main>
      <Footer/>
    </>
  )
}
```

- [ ] **Step 3: Delete the now-fully-superseded diagram reference and remaining dead code**

```bash
rm "src/components/Mission.jsx" "src/components/CellCanvas.jsx" "src/components/CellSystem.jsx"
```

(`src/components/Hero.jsx` is not touched by this task — Task 4 already replaced its content and removed its `CellCanvas` import, so it has no dependency on the files being deleted here.)

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Verify no leftover imports of the deleted files**

Run: `grep -rn "Mission.jsx\|CellCanvas\|CellSystem" src/`
Expected: no output.

- [ ] **Step 6: Visual check in the browser preview**

Reload `/`, scroll to the "Dónde vivimos" section, screenshot it. Confirm: cream/light background, dark-gray heading text (not amber-tinted), 3-circle Venn diagram with the three new labels, and the closing line in bold.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Tres ejes section, remove last orphaned components

Venn diagram adapted from the old (unused) Mission.jsx, re-labeled
to Empresas y capital / Sistemas vivos / Inteligencia artificial and
recolored to the amber-only accent system. Mission.jsx, CellCanvas.jsx
and CellSystem.jsx are deleted — they were dead code.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: Build Programas.jsx

**Files:**
- Create: `src/components/Programas.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `FadeIn`, `trackCta`.
- Produces: `Programas` default export, renders `<section id="programas">` — this is the scroll target for the Hero CTA (Task 4) and the Nav link (Task 3).

- [ ] **Step 1: Create `src/components/Programas.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

const PROGRAMAS = [
  {
    slug: 'ia-nuevos-profesionales',
    titulo: 'IA para Nuevos Profesionales',
    audiencia: 'Jóvenes profesionales',
    nota: 'La IA no va a reemplazar a los jóvenes profesionales que la dominen con criterio propio. Va a reemplazar a los que crecieron sin desarrollarlo.',
    precio: 'S/ 297',
  },
  {
    slug: 'ia-profesionales-senior',
    titulo: 'IA para Profesionales Senior',
    audiencia: 'Profesionales senior',
    nota: 'Tu experiencia no está en riesgo por la IA. Está en riesgo si nadie aprende a multiplicarla con ella.',
    precio: 'S/ 497',
  },
  {
    slug: 'negocios-regenerativos',
    titulo: 'Construcción de Negocios Regenerativos',
    audiencia: 'Emprendimientos y pymes',
    nota: 'Tener buena intención regenerativa no basta. Este programa es la ingeniería detrás del negocio que sí funciona.',
    precio: 'S/ 597',
  },
  {
    slug: 'marcas-regenerativas',
    titulo: 'Construcción de Marcas Regenerativas',
    audiencia: 'Emprendimientos y pymes',
    nota: 'Tener una causa real no basta si tu marca suena igual a las cien que dicen tener lo mismo.',
    precio: 'S/ 597',
  },
  {
    slug: 'economia-circular-industria',
    titulo: 'Economía Circular para la Industria',
    audiencia: 'Industria pesada',
    nota: 'No lo hacemos porque lo pida un reporte de sostenibilidad. Lo hacemos porque hay industrias que ya no pueden darse el lujo de desperdiciar.',
    precio: 'S/ 797',
  },
  {
    slug: 'capital-de-impacto',
    titulo: 'Capital de Impacto',
    audiencia: 'Empresas grandes y pymes',
    nota: 'El capital no huye de la región por falta de buenos proyectos. Huye por falta de preparación para levantarlo.',
    precio: 'S/ 997',
  },
]

export default function Programas() {
  return (
    <section id="programas" className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>La planilla</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:760 }}>
            No es un catálogo extenso. Es lo primero que hay que resolver.
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'3rem' }}>
            Seis programas curados, no seis cursos genéricos. Cada uno es la expresión directa de lo que creemos que hay que resolver primero, para cada tipo de audiencia. Un mes, cuatro sesiones en vivo, sin relleno.
          </p>
        </FadeIn>

        <div className="programas-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'1.4rem' }}>
          {PROGRAMAS.map((p, i) => (
            <FadeIn key={p.slug} delay={0.18 + i*0.05}>
              <a
                href={`/programas/${p.slug}`}
                onClick={() => trackCta(`programa_${p.slug}`, 'home_programas', `/programas/${p.slug}`)}
                className="fro-card"
                style={{ display:'block', padding:'1.6rem', height:'100%', textDecoration:'none' }}
              >
                <div className="fro-sm" style={{ marginBottom:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em', fontSize:'0.68rem' }}>{p.audiencia}</div>
                <h3 className="fro-h3" style={{ marginBottom:'0.8rem', fontSize:'1.1rem' }}>{p.titulo}</h3>
                <p className="fro-body" style={{ fontSize:'0.86rem', marginBottom:'1.4rem' }}>{p.nota}</p>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span className="fro-chip-outline">{p.precio}</span>
                  <span style={{ fontSize:'0.82rem', fontWeight:600, color:'var(--fro-ink)' }}>Ver programa →</span>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        @media(max-width: 960px){ .programas-grid { grid-template-columns: 1fr 1fr !important; } }
        @media(max-width: 640px){ .programas-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 2: Wire `Programas` into `src/pages/Home.jsx`**

Add `import Programas from '../components/Programas.jsx'` and `<Programas/>` right after `<TresEjes/>`.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Verify all 6 routes match the sitemap exactly**

Run: `grep -o "/programas/[a-z-]*" src/components/Programas.jsx | sort -u`
Expected output (6 lines, exact match):
```
/programas/capital-de-impacto
/programas/economia-circular-industria
/programas/ia-nuevos-profesionales
/programas/ia-profesionales-senior
/programas/marcas-regenerativas
/programas/negocios-regenerativos
```

- [ ] **Step 5: Visual check in the browser preview**

Reload `/`, scroll to "La planilla", screenshot. Confirm: white background, 6 cards in a 3-column grid (2-column on tablet width, 1-column on mobile — resize the preview to verify), each with an outlined price chip (not a filled lime chip). Clicking the Hero's "Ver los 6 programas" CTA now scrolls here.

- [ ] **Step 6: Commit**

```bash
git add src/components/Programas.jsx src/pages/Home.jsx
git commit -m "feat: add Los 6 programas grid

Verbatim card copy from BBS_Copy_Landing_Home_v4.md §4. Each card
links to its real subpage route from the brief's sitemap (built in
subsystem 2).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: Build ComunidadBiobuilders.jsx

**Files:**
- Create: `src/components/ComunidadBiobuilders.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `FadeIn`, `trackCta`, `withUtm` + `CAMPAIGNS.COMMUNITY` from `../lib/utm.js` (existing).
- Produces: `ComunidadBiobuilders` default export, renders `<section id="comunidad">` — the Nav link target.

- [ ] **Step 1: Create `src/components/ComunidadBiobuilders.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { withUtm, CAMPAIGNS } from '../lib/utm.js'

const WHATSAPP_URL = 'https://chat.whatsapp.com/EnVjmCxvR6Q6TaUORbLAj8'

export default function ComunidadBiobuilders() {
  const href = withUtm(WHATSAPP_URL, { campaign: CAMPAIGNS.COMMUNITY, content: 'home_comunidad' })
  return (
    <section id="comunidad" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Únete a los Biobuilders</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1.4rem', maxWidth:760 }}>
            La red que venimos construyendo, curando y haciendo crecer
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'2.2rem' }}>
            No es un producto que se vende. Es la comunidad de quienes están comprometidos con transformar la región desde su expertise, sea el mundo corporativo, el emprendimiento o la inversión. Todo egresado de cualquiera de los 6 programas se suma automáticamente. Ahí compartimos noticias del sector, convocatorias de empleo, fuentes de financiamiento no reembolsable, y los primeros accesos a nuevos lanzamientos.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('comunidad_whatsapp', 'home_comunidad', href)}
          >
            Únete por WhatsApp <span aria-hidden>→</span>
          </a>
          <p className="fro-sm" style={{ marginTop:'0.8rem' }}>Gratuito</p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire into `src/pages/Home.jsx`**

Add `import ComunidadBiobuilders from '../components/ComunidadBiobuilders.jsx'` and `<ComunidadBiobuilders/>` right after `<Programas/>`.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Verify the WhatsApp URL is exactly right**

Run: `grep "chat.whatsapp.com" src/components/ComunidadBiobuilders.jsx`
Expected: `const WHATSAPP_URL = 'https://chat.whatsapp.com/EnVjmCxvR6Q6TaUORbLAj8'`

- [ ] **Step 5: Visual check in the browser preview**

Reload `/`, scroll to "Únete a los Biobuilders", screenshot. Confirm dark background, amber CTA button. Click it (opens a new tab to the WhatsApp invite with `?utm_source=bbs&utm_medium=web&utm_campaign=community_whatsapp&utm_content=home_comunidad` appended) — verify the tab opens to the correct WhatsApp invite link, then close that tab.

- [ ] **Step 6: Commit**

```bash
git add src/components/ComunidadBiobuilders.jsx src/pages/Home.jsx
git commit -m "feat: add Comunidad Biobuilders section

Verbatim copy from BBS_Copy_Landing_Home_v4.md §5. CTA links to the
real WhatsApp community invite, tagged with the existing UTM
convention (CAMPAIGNS.COMMUNITY).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 8: Build RedAliados.jsx

**Files:**
- Create: `src/components/RedAliados.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `FadeIn`.
- Produces: `RedAliados` default export, renders `<section id="aliados">`.

- [ ] **Step 1: Create `src/components/RedAliados.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'

export default function RedAliados() {
  return (
    <section id="aliados" className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>No estamos solos en esto</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1.4rem', maxWidth:760 }}>
            Amigos y expertos que suman a la conversación
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:720 }}>
            En cada programa invitamos a nuestra red, personas que comparten la misma misión de transformar América Latina y el Caribe, para enriquecer el debate en las sesiones. Y más allá de los programas, esa misma red ofrece espacios adicionales para quienes ya tomaron algún curso: experiencias reales de cómo levantar capital, cómo internacionalizar una marca, cómo estructurar un proyecto corporativo, cómo superar desafíos en la escalera corporativa. Conocimiento y experiencia real, no teoría.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire into `src/pages/Home.jsx`**

Add `import RedAliados from '../components/RedAliados.jsx'` and `<RedAliados/>` right after `<ComunidadBiobuilders/>`.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual check in the browser preview**

Reload `/`, scroll to "No estamos solos en esto", screenshot. Confirm light background, dark-gray heading (not amber).

- [ ] **Step 5: Commit**

```bash
git add src/components/RedAliados.jsx src/pages/Home.jsx
git commit -m "feat: add Red de aliados section

Verbatim copy from BBS_Copy_Landing_Home_v4.md §6.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 9: Build DiagnosticoCTA.jsx

**Files:**
- Create: `src/components/DiagnosticoCTA.jsx`
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `FadeIn`, `trackCta`.
- Produces: `DiagnosticoCTA` default export, renders `<section id="diagnostico">` — the Nav link target.

- [ ] **Step 1: Create `src/components/DiagnosticoCTA.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'

const CARDS = [
  {
    href: '/diagnostico/profesionales',
    id: 'profesionales',
    titulo: '¿Eres profesional?',
    nota: 'Descubre qué tan preparado estás frente a la disrupción de la IA, y qué programa es tu siguiente paso.',
    cta: 'Haz tu autodiagnóstico',
  },
  {
    href: '/diagnostico/empresas',
    id: 'empresas',
    titulo: '¿Tienes un negocio?',
    nota: 'Evalúa en qué momento estás, de la marca al capital, y qué programa te ayuda a avanzar.',
    cta: 'Evalúa tu momento',
  },
]

export default function DiagnosticoCTA() {
  return (
    <section id="diagnostico" className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>¿Por dónde empezar?</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'2.6rem', maxWidth:760 }}>
            Dos minutos de diagnóstico, una recomendación clara
          </h2>
        </FadeIn>

        <div className="diag-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.4rem' }}>
          {CARDS.map((c, i) => (
            <FadeIn key={c.href} delay={0.14 + i*0.08}>
              <a
                href={c.href}
                onClick={() => trackCta(`diagnostico_${c.id}`, 'home_diagnostico', c.href)}
                className="fro-card"
                style={{ display:'block', padding:'2rem', height:'100%', textDecoration:'none' }}
              >
                <h3 className="fro-h3" style={{ marginBottom:'0.9rem' }}>{c.titulo}</h3>
                <p className="fro-body" style={{ marginBottom:'1.4rem' }}>{c.nota}</p>
                <span className="fro-mark-amber" style={{ fontSize:'0.88rem', fontWeight:700, color:'var(--fro-ink)' }}>{c.cta} →</span>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width: 720px){ .diag-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
```

- [ ] **Step 2: Wire into `src/pages/Home.jsx`**

Add `import DiagnosticoCTA from '../components/DiagnosticoCTA.jsx'` and `<DiagnosticoCTA/>` right after `<RedAliados/>`.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 4: Visual check in the browser preview**

Reload `/`, scroll to "¿Por dónde empezar?", screenshot. Confirm two cards side by side (stacked on mobile — resize to verify), each with the amber underline mark behind the CTA text.

- [ ] **Step 5: Commit**

```bash
git add src/components/DiagnosticoCTA.jsx src/pages/Home.jsx
git commit -m "feat: add Diagnóstico CTA doble section

Verbatim copy from BBS_Copy_Landing_Home_v4.md §7. Links to the two
diagnostic tool routes (built in subsystem 4).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 10: Build RespaldoInstitucional.jsx and rewrite Endorsements.jsx

**Files:**
- Create: `src/components/RespaldoInstitucional.jsx`
- Modify: `src/components/Endorsements.jsx` (full rewrite)
- Modify: `src/pages/Home.jsx`

**Interfaces:**
- Consumes: `FadeIn`.
- Produces: `RespaldoInstitucional` default export (`<section id="respaldo">`) and `Endorsements` default export (`<section id="respaldan">`) — rendered back-to-back with the same dark background so they read as one visual block, per the spec's density note.

- [ ] **Step 1: Create `src/components/RespaldoInstitucional.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'

export default function RespaldoInstitucional() {
  return (
    <section id="respaldo" className="fro-sec-t" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Quién está detrás</div></FadeIn>
        <FadeIn delay={0.08}>
          <p className="fro-lead" style={{ maxWidth:820 }}>
            Bio Business School nace de Redesign Lab, la empresa que Eddie y Lorenzo fundaron y desde la cual han desarrollado distintas iniciativas de transformación económica en la región. Antes de este proyecto, ambos han ayudado a diseñar y ejecutar programas de formación para instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE. Somos Claude Network Partners, porque creemos que la inteligencia artificial es indispensable para este proceso. Y seguimos sumando alianzas que refuercen la misma tesis.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace the full contents of `src/components/Endorsements.jsx`**

```jsx
import FadeIn from './FadeIn.jsx'

const PARTNERS = [
  'MIT Professional Education',
  'Universidad de Chicago',
  'CATIE',
  'INCAE',
]

export default function Endorsements() {
  return (
    <section id="respaldan" style={{ background:'var(--fro-bg)', paddingBottom:'6rem' }}>
      <FadeIn>
        <div className="fro-marquee" aria-hidden>
          <div className="fro-marquee-track">
            <span>{PARTNERS.map(p => <span key={p}>{p}</span>)}</span>
            <span>{PARTNERS.map(p => <span key={p+'_b'}>{p}</span>)}</span>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
```

- [ ] **Step 3: Wire both into `src/pages/Home.jsx`**

Add `import RespaldoInstitucional from '../components/RespaldoInstitucional.jsx'` and `import Endorsements from '../components/Endorsements.jsx'`, then `<RespaldoInstitucional/>` followed immediately by `<Endorsements/>` right after `<DiagnosticoCTA/>`.

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Verify no "404" or testimonials references remain in this file**

Run: `grep -ni "404\|testimonio" src/components/Endorsements.jsx`
Expected: no output.

- [ ] **Step 6: Visual check in the browser preview**

Reload `/`, scroll to "Quién está detrás", screenshot. Confirm: dark background, the institutional text, and directly below it the marquee scrolling "MIT Professional Education · Universidad de Chicago · CATIE · INCAE" with no visible seam between the two sections (same background color, no border between them).

- [ ] **Step 7: Commit**

```bash
git add src/components/RespaldoInstitucional.jsx src/components/Endorsements.jsx src/pages/Home.jsx
git commit -m "feat: add Respaldo institucional + update Endorsements marquee

Verbatim copy from BBS_Copy_Landing_Home_v4.md §8. Endorsements.jsx
loses '404 Tech Found' and the old personal-credential list (ESAN,
PUCP, Singularity University, UE en Perú) in favor of the
institutions named in the new copy (MIT Professional Education,
Universidad de Chicago, CATIE, INCAE), and drops the stale
'testimonios Q2 2026' line. Both sections share one dark visual
block, no border between them.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 11: Rewrite Footer.jsx with the newsletter form

**Files:**
- Modify: `src/components/Footer.jsx` (full rewrite)

**Interfaces:**
- Consumes: `trackForm` from `../lib/analytics.js` (existing).
- Produces: `Footer` default export, unchanged usage (`<Footer/>`, no props) — already wired in `Home.jsx` since Task 1. Internally, `POST`s to `/api/lead` with `{ form: 'bbs-newsletter', email, pagina_origen }` — that endpoint doesn't exist until the backend subsystem, so the request will fail; the form must show a visible error rather than crash.

- [ ] **Step 1: Replace the full contents of `src/components/Footer.jsx`**

```jsx
import { useState } from 'react'
import { trackForm } from '../lib/analytics.js'

const Logo = () => (
  <span style={{ fontFamily:'var(--fbc)', fontWeight:700, fontSize:'1.15rem', letterSpacing:'-0.01em', color:'var(--fro-text)' }}>
    bio<span style={{ color:'var(--fro-amber)' }}>/</span>business
  </span>
)

const YEAR = new Date().getFullYear()

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    trackForm('bbs-newsletter', 'submit')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form: 'bbs-newsletter', email, pagina_origen: window.location.pathname }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
      trackForm('bbs-newsletter', 'success')
      setEmail('')
    } catch {
      setStatus('error')
      trackForm('bbs-newsletter', 'error')
    }
  }

  if (status === 'success') {
    return <p className="fro-sm" style={{ color:'var(--fro-amber)' }}>Listo, ya estás suscrito.</p>
  }

  return (
    <form onSubmit={handleSubmit} style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap', maxWidth:380 }}>
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        aria-label="Correo electrónico"
        className="fro-field"
        style={{ flex:'1 1 200px' }}
      />
      <button type="submit" disabled={status==='loading'} className="fro-btn fro-btn-amber" style={{ flexShrink:0 }}>
        {status === 'loading' ? 'Enviando…' : 'Suscribirme'}
      </button>
      {status === 'error' && (
        <p className="fro-sm" style={{ color:'var(--fro-danger)', width:'100%' }}>No se pudo enviar, intenta de nuevo.</p>
      )}
    </form>
  )
}

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ background:'var(--fro-bg)', borderTop:'1px solid var(--fro-line)' }}>
      <div className="fro-wrap" style={{ padding:'4rem 2rem 2rem' }}>

        <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1.4fr', gap:'3rem', marginBottom:'3rem' }}>
          <div>
            <Logo/>
            <p className="fro-sm" style={{ marginTop:'0.8rem', maxWidth:300 }}>
              Una propuesta de Eddie Ajalcriña y Lorenzo Ortiz — Powered by{' '}
              <a
                href="https://redesignlab.org/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color:'var(--fro-text-2)', textDecoration:'none', borderBottom:'1px solid var(--fro-line-2)' }}
              >Redesign Lab</a>.
            </p>
          </div>

          <nav aria-label="Navegación">
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Explorar</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                ['Programas', '#programas'],
                ['Comunidad', '#comunidad'],
                ['Diagnóstico', '#diagnostico'],
                ['Contacto', 'mailto:biobusiness@redesignlab.org'],
              ].map(([l,h]) => (
                <li key={l}>
                  <a href={h} style={{ fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none' }}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>No te pierdas las novedades de BBS.</h4>
            <NewsletterForm/>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--fro-line)', paddingTop:'1.5rem', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'1rem' }}>
          <p style={{ fontSize:'0.76rem', color:'var(--fro-text-3)' }}>© {YEAR} Bio Business School</p>
          <a href="/privacidad" style={{ fontSize:'0.76rem', color:'var(--fro-text-3)', textDecoration:'none' }}>Privacidad</a>
        </div>
      </div>

      <style>{`
        @media(max-width: 860px){ .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; } }
        @media(max-width: 520px){ .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 3: Verify no `/sprint01` link remains**

Run: `grep -n "sprint01" src/components/Footer.jsx`
Expected: no output.

- [ ] **Step 4: Visual + functional check in the browser preview**

Reload `/`, scroll to the footer, screenshot. Type a test email into the newsletter field and submit. Since `/api/lead` doesn't exist yet in this branch, expect the button to briefly show "Enviando…" and then the form to show the red "No se pudo enviar, intenta de nuevo." error — **this is the expected, correct behavior for this task** (confirms the error path doesn't crash the page). Check the browser console for an unhandled exception — there should be none, only the caught network error.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: rewrite Footer with newsletter signup

Verbatim copy from BBS_Copy_Landing_Home_v4.md §9. Drops the old
Biotech Sprint 01 / Playbook product links and stale contact block.
Newsletter form posts form:'bbs-newsletter' to /api/lead (built in
the backend subsystem) and fails gracefully — visible error, no
crash — until that endpoint exists.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 12: Update SEO metadata to match the new positioning

**Files:**
- Modify: `index.html`

**Interfaces:** none (metadata only, no component interfaces).

- [ ] **Step 1: Update the primary SEO tags**

In `index.html`, replace the `<title>` and the `description`/`keywords` meta tags:

```html
    <title>Bio Business School — Formación en IA para industrias de sistemas vivos</title>
    <meta name="description" content="Formación especializada de Eddie Ajalcriña y Lorenzo Ortiz, respaldados por Redesign Lab, para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la inteligencia artificial y lideren la transformación de América Latina y el Caribe." />
    <meta name="keywords" content="inteligencia artificial, bioeconomía, bionegocios, América Latina, economía regenerativa, capital de impacto, biotecnología, sistemas vivos, formación ejecutiva" />
```

- [ ] **Step 2: Update the Open Graph tags**

```html
    <meta property="og:title" content="Bio Business School — Formación en IA para industrias de sistemas vivos" />
    <meta property="og:description" content="Formación especializada para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la inteligencia artificial y lideren la transformación de América Latina y el Caribe." />
```

(Leave `og:image`, `og:image:width/height/alt`, `og:url`, `og:type`, `og:site_name`, `og:locale*` untouched — the cover image itself is out of scope for this plan.)

- [ ] **Step 3: Update the Twitter Card tags**

```html
    <meta name="twitter:title" content="Bio Business School — Formación en IA para industrias de sistemas vivos" />
    <meta name="twitter:description" content="Formación especializada para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la inteligencia artificial y lideren la transformación de América Latina y el Caribe." />
```

- [ ] **Step 4: Update the Organization schema description**

In the `"@type": "EducationalOrganization"` JSON-LD block, replace the `"description"` field:

```json
      "description": "Formación especializada para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la inteligencia artificial y lideren la transformación de América Latina y el Caribe.",
```

- [ ] **Step 5: Update the noscript fallback text**

```html
    <noscript>
      <div style="max-width:720px;margin:3rem auto;padding:2rem;font-family:Inter,sans-serif;color:#fff;background:#0A0A0A;">
        <h1 style="font-family:Syne,sans-serif;">Bio Business School</h1>
        <p>Necesitas activar JavaScript para ver este sitio. Formación especializada en inteligencia artificial para profesionales y empresas de industrias que dependen de sistemas vivos.</p>
        <p>Contacto: <a href="mailto:biobusiness@redesignlab.org" style="color:#FFC800">biobusiness@redesignlab.org</a></p>
      </div>
    </noscript>
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "chore: update SEO metadata to match the new positioning

Title/description/OG/Twitter/Organization-schema copy no longer
describes the old 'Bionegocios rentables, formamos BioBuilders no
MBAs' positioning — it now matches the new Hero copy (IA + sistemas
vivos + LATAM).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 13: Final QA pass

**Files:** none created or modified — verification only. If any check fails, fix the specific file it points to and re-run that check before moving on.

- [ ] **Step 1: Full-repo grep for any remaining 404/Sprint01 reference**

Run: `grep -rniI "404\|biotech sprint\|sprint01" src/ public/ docs/ index.html`
Expected: no output. If anything matches, open that file and remove it (this is the brief's non-negotiable acceptance criterion — do not skip).

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 3: Full scroll-through visual check (desktop)**

Start the dev server preview (`bbs-dev`), navigate to `/`, and screenshot each section top to bottom: Hero, Tres ejes, Los 6 programas, Comunidad Biobuilders, Red de aliados, Diagnóstico, Respaldo institucional + Endorsements, Footer. Confirm the dark/light rhythm matches: dark → light → light → dark → light → light → dark → dark.

- [ ] **Step 4: Mobile viewport check**

Resize the browser preview to the mobile (375×812) preset, reload `/`, and confirm: the burger menu replaces the inline nav links, the programs grid stacks to 1 column, the diagnostic cards stack to 1 column, and the footer grid stacks to 1 column. Reset the preview back to desktop afterward.

- [ ] **Step 5: Contrast spot-check**

In the browser preview, use `javascript_tool` to read the computed `color` and `background-color` of a heading in a light section (e.g. the Tres ejes `<h2>`) and confirm it resolves to `rgb(43, 43, 43)` text — not any amber/yellow value.

- [ ] **Step 6: Link and anchor check**

Click every Nav link (Programas, Comunidad, Diagnóstico) and confirm each scrolls to its matching section (`#programas`, `#comunidad`, `#diagnostico`). Click the Hero CTA and confirm it also lands on `#programas`.

- [ ] **Step 7: Final commit (if Step 1 required fixes)**

If Step 1 found and required fixing any leftover reference:

```bash
git add -A
git commit -m "chore: final 404/Sprint01 grep cleanup pass

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

If Step 1 found nothing to fix, no commit is needed for this task — the plan is complete.
