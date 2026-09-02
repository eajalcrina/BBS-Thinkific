# Content Update: Home restructuring + Programa pricing sync — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync the already-shipped Home page and 6 program subpages with Eddie's updated content docs (2026-09-02): a new home structure split by audience, 2 new sections, several copy rewrites, and pricing/CTA-logic changes across 4 of 6 programs.

**Architecture:** Pure content/UI change on an existing React + Vite SPA. No new dependencies, no backend changes, no new design tokens — reuse the existing `--fro-*` CSS system and established component patterns (`FadeIn` wrapper, `fro-eyebrow`/`fro-h2`/`fro-lead`/`fro-card` classes). All program copy/pricing lives in one data file (`src/data/programas.js`); components read from it, never hardcode program-specific text.

**Tech Stack:** React 18, React Router 7, Vite, Framer Motion (via `FadeIn.jsx`).

## Global Constraints

- **Verbatim copy only** — every string pulled from the source docs in this plan must be used exactly as written, no paraphrasing (brief's QA checklist, last item). The docs live at `docs/superpowers/specs/content-update-2026-09-02/`.
- **No new design tokens** — reuse existing `--fro-*` CSS variables and `.fro-*` utility classes from `src/index.css`. Don't invent new colors/spacing scales.
- **4 decisions already confirmed by Eddie** (do not re-litigate, do not "improve" on them):
  1. Home restructuring into "Transformamos Profesionales" / "Transformamos Empresas" — proceed now.
  2. "Red de Aliados" stays OFF the home (stays only on program subpages, per the 2026-08-31 decision) — do not add it back.
  3. Economía Circular para la Industria's `audiencia` field stays `"Industria"` — do NOT change to "Industria pesada".
  4. The program subpage secondary CTA stays "Inscríbete" with the existing 3-field form (nombre+email+WhatsApp) — do NOT change to email-only "Quiero más información"/"Solo avísame cuando abra".
- **Home section order after this plan**: Hero → Manifiesto → Los tres ejes (unchanged) → Franja de instituciones → Transformamos Profesionales → Transformamos Empresas → Comunidad Biobuilders → Respaldo institucional → Footer.
- **Anchor ids**: the home no longer has `#programas` or `#diagnostico` sections — the two new audience sections use `id="profesionales"` and `id="empresas"`. Every internal link (Nav, Footer, Hero CTA) must point at real ids after this plan — nothing left pointing at a dead anchor.
- **Pricing/CTA logic is real product logic, not just copy** — `usePaymentCta.js`'s label-generation branches on `programa.status` today; after this plan it must also branch on whether `programa.precioDescuento` is set, independent of status (this is what makes Marcas Regenerativas' live+discount case work).

---

### Task 1: Programa data — prices, tags, and copy updates

**Files:**
- Modify: `src/data/programas.js` (all 6 program objects)

**Interfaces:**
- Produces: two new fields on every `PROGRAMAS` entry — `tagHome: string | null` (short tag shown on the home ficha instead of a price) and `descuentoPct: number | null` (the discount percentage, used by Task 2's `usePaymentCta`). Later tasks (2, 6) read these by name — do not rename.

- [ ] **Step 1: Update `ia-nuevos-profesionales` (lines 1-32)**

Change `precioRegular: 297` → `precioRegular: 197`, `precioRegularUsd: 89` → `precioRegularUsd: 59`. Add two new fields right after `precioDescuentoUsd: null,`:
```js
    tagHome: null,
    descuentoPct: null,
```

- [ ] **Step 2: Update `ia-profesionales-senior` (lines 33-63)**

Change `precioRegular: 497` → `precioRegular: 397`, `precioRegularUsd: 148` → `precioRegularUsd: 118`, `precioDescuento: 349` → `precioDescuento: 278`, `precioDescuentoUsd: 104` → `precioDescuentoUsd: 83`. Add after `precioDescuentoUsd: 83,`:
```js
    tagHome: '30% off por pronto pago',
    descuentoPct: 30,
```

Also replace the `dirigidoA` value (line 41) — current:
```js
    dirigidoA: 'Profesionales senior con trayectoria consolidada que buscan mantenerse competitivos en un mundo tomado por la IA.',
```
with the extended version (verbatim from `docs/superpowers/specs/content-update-2026-09-02/BBS_Copy_Subpaginas_Programas.md`, program 2, "Ficha técnica → Dirigido a"):
```js
    dirigidoA: 'Profesionales senior con trayectoria consolidada que buscan mantenerse competitivos en un mundo tomado por la IA. Incluye también a quienes están jubilados o cerca de jubilarse y ven en la reconversión como asesor o consultor experto, apalancado en IA, una forma de seguir generando valor con su experiencia.',
```

- [ ] **Step 3: Update `negocios-regenerativos` (lines 64-98)**

Change `precioRegular: 597` → `precioRegular: 497`, `precioRegularUsd: 178` → `precioRegularUsd: 148`, `precioDescuento: 419` → `precioDescuento: 348`, `precioDescuentoUsd: 125` → `precioDescuentoUsd: 104`. Add after `precioDescuentoUsd: 104,`:
```js
    tagHome: '30% off por pronto pago',
    descuentoPct: 30,
```

- [ ] **Step 4: Update `marcas-regenerativas` (lines 99-133)**

`precioRegular` (597) and `precioRegularUsd` (178) stay unchanged. Change `precioDescuento: null` → `precioDescuento: 499`, `precioDescuentoUsd: null` → `precioDescuentoUsd: 149`. Add after `precioDescuentoUsd: 149,`:
```js
    tagHome: 'Precio especial',
    descuentoPct: 15,
```

Also replace the `notaCorta` value (line 104) — current ends `"...empezar a sonar como lo que realmente eres, y vender más por eso."` — wait, verify: current text ends `"...empezar a sonar como lo que realmente eres."` — append the missing clause so the full string (verbatim from `BBS_Copy_Subpaginas_Programas.md`, program 4 hero) reads:
```js
    notaCorta: 'Tener una causa real no basta si tu marca suena igual a las cien que dicen tener lo mismo. El problema eco-genérico le cuesta mercado a proyectos que sí merecen ganarlo. Este programa es para dejar de sonar genérico y empezar a sonar como lo que realmente eres, y vender más por eso.',
```
(`notaCard`, the shorter version used on home fichas, is NOT changed — the doc only extends the long hero version.)

- [ ] **Step 5: Update `economia-circular-industria` (lines 134-164)**

Change `precioRegular: 797` → `precioRegular: 497`, `precioRegularUsd: 238` → `precioRegularUsd: 148`, `precioDescuento: 559` → `precioDescuento: 348`, `precioDescuentoUsd: 167` → `precioDescuentoUsd: 104`. Add after `precioDescuentoUsd: 104,`:
```js
    tagHome: '30% off por pronto pago',
    descuentoPct: 30,
```
Leave `audiencia: 'Industria'` exactly as-is (Eddie confirmed: do not change to "Industria pesada").

- [ ] **Step 6: Update `capital-de-impacto` (lines 165-195)**

`precioRegular` (997) and `precioRegularUsd` (298) stay unchanged. Change `precioDescuento: 699` → `precioDescuento: 698`, `precioDescuentoUsd: 209` → `precioDescuentoUsd: 208`. Add after `precioDescuentoUsd: 208,`:
```js
    tagHome: '30% off por pronto pago',
    descuentoPct: 30,
```

- [ ] **Step 7: Verify the file still parses and the app builds**

Run: `npm run build`
Expected: succeeds with no errors (this is a plain data file, a syntax slip — e.g. a missing comma — will fail the Vite build immediately).

- [ ] **Step 8: Commit**

```bash
git add src/data/programas.js
git commit -m "feat(programas): sync pricing, tags, and copy with 2026-09-02 content update

- ia-nuevos-profesionales: 297->197 (sin descuento)
- ia-profesionales-senior: 497->397, descuento 349->278; dirigidoA amplia mencion a jubilados
- negocios-regenerativos: 597->497, descuento 419->348
- marcas-regenerativas: agrega descuento 499 (15%% off, antes null); notaCorta amplia cierre
- economia-circular-industria: 797->497, descuento 559->348
- capital-de-impacto: descuento 699->698
- agrega tagHome/descuentoPct a los 6 programas, para las fichas del home (Task 6) y el CTA de pago (Task 2)"
```

---

### Task 2: Payment CTA logic — live+discount case, and section reorder

**Files:**
- Modify: `src/components/programa/usePaymentCta.js`
- Modify: `src/components/programa/ProgramaCTA.jsx` (lines 78-84 only)
- Modify: `src/pages/ProgramaPage.jsx` (lines 82-91 only)

**Interfaces:**
- Consumes: `programa.descuentoPct`, `programa.precioDescuento`, `programa.precioDescuentoUsd` (from Task 1).
- Produces: `usePaymentCta(programa)` keeps its existing return shape `{ label, status, handleClick }` — `ProgramaCTA.jsx` and `FloatingCtaBar.jsx` consume it unchanged, no signature change.

- [ ] **Step 1: Rewrite the label logic in `usePaymentCta.js`**

Current (lines 7-9):
```js
  const label = programa.status === 'live'
    ? `Pagar ahora — S/ ${programa.precioRegular} (~USD ${programa.precioRegularUsd})`
    : `Reserva tu cupo con 30% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`
```

Replace with:
```js
  const label = !programa.precioDescuento
    ? `Pagar ahora — S/ ${programa.precioRegular} (~USD ${programa.precioRegularUsd})`
    : programa.status === 'live'
      ? `Pagar ahora con ${programa.descuentoPct}% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`
      : `Reserva tu cupo con ${programa.descuentoPct}% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`
```

This produces, per program (verify by reading `src/data/programas.js` after Task 1):
- `ia-nuevos-profesionales` (live, no descuento): `Pagar ahora — S/ 197 (~USD 59)`
- `ia-profesionales-senior` (reserve, descuento 278/30%): `Reserva tu cupo con 30% off — S/ 278 (~USD 83)`
- `negocios-regenerativos` (reserve, descuento 348/30%): `Reserva tu cupo con 30% off — S/ 348 (~USD 104)`
- `marcas-regenerativas` (live, descuento 499/15%): `Pagar ahora con 15% off — S/ 499 (~USD 149)`
- `economia-circular-industria` (reserve, descuento 348/30%): `Reserva tu cupo con 30% off — S/ 348 (~USD 104)`
- `capital-de-impacto` (reserve, descuento 698/30%): `Reserva tu cupo con 30% off — S/ 698 (~USD 208)`

- [ ] **Step 2: Extend the "precio de lista" tachado condition in `ProgramaCTA.jsx`**

Current (lines 78-84):
```jsx
      {programa.status === 'reserve' && (
        <p className="fro-sm" style={{ marginBottom: '0.6rem', color: dark ? 'var(--fro-text-2)' : 'var(--fro-ink-2)' }}>
          Precio de lista: <span style={{ textDecoration: 'line-through' }}>
            S/ {programa.precioRegular} (~USD {programa.precioRegularUsd})
          </span>
        </p>
      )}
```

Replace the condition so it also shows for `live` programs that have a discount (Marcas Regenerativas):
```jsx
      {programa.precioDescuento && (
        <p className="fro-sm" style={{ marginBottom: '0.6rem', color: dark ? 'var(--fro-text-2)' : 'var(--fro-ink-2)' }}>
          Precio de lista: <span style={{ textDecoration: 'line-through' }}>
            S/ {programa.precioRegular} (~USD {programa.precioRegularUsd})
          </span>
        </p>
      )}
```

- [ ] **Step 3: Reorder `RizomaBlock` after `PrecioRepetido` in `ProgramaPage.jsx`**

Current (lines 82-91):
```jsx
        <ProgramaHero programa={programa}/>
        <FichaTecnica programa={programa}/>
        <BonusExclusivo programa={programa}/>
        <RizomaBlock rizoma={programa.rizoma}/>
        <PrecioRepetido programa={programa}/>
        <NoEsParaTi items={programa.noEsParaTi}/>
        <NotaPertenencia/>
```

Replace with (swap `RizomaBlock` and `PrecioRepetido`):
```jsx
        <ProgramaHero programa={programa}/>
        <FichaTecnica programa={programa}/>
        <BonusExclusivo programa={programa}/>
        <PrecioRepetido programa={programa}/>
        <RizomaBlock rizoma={programa.rizoma}/>
        <NoEsParaTi items={programa.noEsParaTi}/>
        <NotaPertenencia/>
```

- [ ] **Step 4: Build and manually verify**

Run: `npm run build`
Expected: succeeds.

Then start the dev server (`npm run dev` or the project's existing preview config) and visually check, for each of these 3 programs, that the payment button and (where applicable) the crossed-out list price render correctly:
- `/programas/ia-nuevos-profesionales` → button reads "Pagar ahora — S/ 197 (~USD 59)", no crossed-out price line.
- `/programas/marcas-regenerativas` → button reads "Pagar ahora con 15% off — S/ 499 (~USD 149)", crossed-out "Precio de lista: S/ 597 (~USD 178)" appears above it, and the RIZOMA block ("Diagnóstico complementario") now appears AFTER the price section, before "Esto no es para ti si...".
- `/programas/capital-de-impacto` → button reads "Reserva tu cupo con 30% off — S/ 698 (~USD 208)".

- [ ] **Step 5: Commit**

```bash
git add src/components/programa/usePaymentCta.js src/components/programa/ProgramaCTA.jsx src/pages/ProgramaPage.jsx
git commit -m "feat(programa): support live+discount pricing label, reorder RIZOMA after price

usePaymentCta now branches on whether precioDescuento is set (not just
status), so a live program with a discount (Marcas Regenerativas) gets
'Pagar ahora con N% off' instead of the full-price label. The crossed-
out list-price line in ProgramaCTA follows the same condition. Also
reorders ProgramaPage so RizomaBlock renders after PrecioRepetido,
matching the subpaginas doc's template order for Marcas Regenerativas."
```

---

### Task 3: Hero copy update

**Files:**
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Produces: nothing consumed elsewhere — this section is self-contained. The CTA's `href="#profesionales"` depends on Task 6 having created that id; if Task 6 hasn't run yet, the link simply won't scroll anywhere until it has (not a broken build, just a dead anchor in the interim — fine for incremental task review).

- [ ] **Step 1: Replace the badge, titular, and both paragraphs**

Current (lines 16-37):
```jsx
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom:'1.8rem' }}>
            Programas de formación especializada para Latam
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="fro-display" style={{ fontSize:'clamp(2.4rem, 6vw, 5.2rem)', maxWidth:920, marginBottom:'1.6rem' }}>
            Transformamos América Latina y el Caribe con inteligencia artificial.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'1.2rem' }}>
            Somos Eddie Ajalcriña (Lima) y Lorenzo Ortiz (Bogotá): hemos desarrollado múltiples proyectos a través de Redesign Lab en la región, y hemos identificado la necesidad urgente de formación especializada para que profesionales y empresas de industrias que dependen de sistemas vivos dominen la IA y lideren ese cambio.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-sm" style={{ maxWidth:600, marginBottom:'2.4rem' }}>
            Estos programas son la destilación de nuestra experiencia como docentes y speakers en instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE.
          </p>
        </FadeIn>
```

Replace with (verbatim from `BBS_Copy_Landing_Home_v5.md`, sección 1):
```jsx
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom:'1.8rem' }}>
            Formación especializada · Industrias de sistemas vivos · Perú, Colombia y LATAM
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <h1 className="fro-display" style={{ fontSize:'clamp(2.4rem, 6vw, 5.2rem)', maxWidth:920, marginBottom:'1.6rem' }}>
            Transformamos América Latina con inteligencia territorial y artificial.
          </h1>
        </FadeIn>

        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:640, marginBottom:'1.2rem' }}>
            Hola, somos Eddie y Lorenzo. Después de años trabajando e invirtiendo en industrias de sistemas vivos en la región, vimos algo claro: para ser más competitivos, hay que transformar dos cosas a la vez, a las personas y a las empresas. Por eso diseñamos programas 100% aplicativos, pensados para que cada participante salga con nuevas competencias y herramientas concretas para crecer y escalar negocios en la región.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="fro-sm" style={{ maxWidth:600, marginBottom:'2.4rem' }}>
            Son la destilación de nuestra experiencia como docentes y speakers en instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE.
          </p>
        </FadeIn>
```

- [ ] **Step 2: Update the CTA anchor**

Current (lines 40-46):
```jsx
          <a
            href="#programas"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('hero_ver_programas', 'home_hero', '#programas')}
          >
            Ver los 6 programas <span aria-hidden>→</span>
          </a>
```

Replace with:
```jsx
          <a
            href="#profesionales"
            className="fro-btn fro-btn-amber fro-btn-lg"
            onClick={() => trackCta('hero_ver_programas', 'home_hero', '#profesionales')}
          >
            Ver los 6 programas <span aria-hidden>→</span>
          </a>
```

- [ ] **Step 3: Remove the stats bar entirely**

Delete the `STATS` constant (lines 4-9) and the entire `FadeIn delay={0.34}` block (lines 49-58):
```jsx
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
```
(These numbers move to Respaldo Institucional in Task 8 — not duplicated here.)

- [ ] **Step 4: Build and verify**

Run: `npm run build`
Expected: succeeds, no unused-variable warnings for `STATS` (fully removed, not just unused).

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat(home): update hero copy, drop stats bar (moves to Respaldo Institucional)"
```

---

### Task 4: Manifiesto — new section

**Files:**
- Create: `src/components/Manifiesto.jsx`
- Modify: `src/pages/Home.jsx` (add import + render call)

**Interfaces:**
- Produces: `<Manifiesto/>` component, no props, self-contained. Rendered in `Home.jsx` between `<Hero/>` and the "Los tres ejes" section (`<TresEjes/>` stays where it is; this task only inserts `Manifiesto` before it — the rest of `Home.jsx`'s reordering happens in Task 7).

- [ ] **Step 1: Create `src/components/Manifiesto.jsx`**

Follow the same structural pattern as `TresEjes.jsx` (light-on-dark section, `FadeIn` wrapper, `fro-eyebrow` + short paragraphs). Content verbatim from `BBS_Copy_Landing_Home_v5.md`, sección 2:

```jsx
import FadeIn from './FadeIn.jsx'

export default function Manifiesto() {
  return (
    <section id="manifiesto" className="fro-sec" style={{ background:'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.6rem' }}>Por qué hacemos esto</div></FadeIn>

        <FadeIn delay={0.08}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Donde muchos ven ineficiencia y limitación, nosotros vemos una oportunidad real de inversión y retorno.
          </p>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Creemos que el futuro de América Latina y el Caribe pasa por transformar las industrias que dependen de sistemas vivos.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Para lograrlo hacen falta profesionales y empresas que dominen la inteligencia artificial, sin perder la inteligencia territorial que ya tienen: el conocimiento del campo, del agua, de la tierra que nadie más tiene.
          </p>
        </FadeIn>
        <FadeIn delay={0.26}>
          <p className="fro-lead" style={{ maxWidth:760, marginBottom:'1.4rem' }}>
            Nuestra ventaja no está en seguir vendiendo materia prima barata. Está en el agua, la biodiversidad, los principios activos que solo existen aquí.
          </p>
        </FadeIn>
        <FadeIn delay={0.32}>
          <p className="fro-lead" style={{ maxWidth:760 }}>
            Convertir esa ventaja en resultado real solo requiere mejores herramientas: las competencias y capacidades que transforman desventaja en crecimiento, competitividad y desarrollo.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wire it into `Home.jsx`**

Current (full file):
```jsx
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Programas from '../components/Programas.jsx'
import ComunidadBiobuilders from '../components/ComunidadBiobuilders.jsx'
import DiagnosticoCTA from '../components/DiagnosticoCTA.jsx'
import RespaldoInstitucional from '../components/RespaldoInstitucional.jsx'
import Endorsements from '../components/Endorsements.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <DiagnosticoCTA/>
        <Programas/>
        <TresEjes/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
        <Endorsements/>
      </main>
      <Footer/>
    </>
  )
}
```

Add the `Manifiesto` import and insert `<Manifiesto/>` right after `<Hero/>`. Leave everything else in this file exactly as-is for now — the rest of the reordering (removing `Programas`/`DiagnosticoCTA`, moving `Endorsements`, adding the two new `Transformamos*` sections) happens in Tasks 5-7, each touching this same file incrementally:

```jsx
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Manifiesto from '../components/Manifiesto.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Programas from '../components/Programas.jsx'
import ComunidadBiobuilders from '../components/ComunidadBiobuilders.jsx'
import DiagnosticoCTA from '../components/DiagnosticoCTA.jsx'
import RespaldoInstitucional from '../components/RespaldoInstitucional.jsx'
import Endorsements from '../components/Endorsements.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <Manifiesto/>
        <DiagnosticoCTA/>
        <Programas/>
        <TresEjes/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
        <Endorsements/>
      </main>
      <Footer/>
    </>
  )
}
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: succeeds. Manually check in the dev server that the Manifiesto section renders between the hero and the rest of the page, with all 5 lines visible.

- [ ] **Step 4: Commit**

```bash
git add src/components/Manifiesto.jsx src/pages/Home.jsx
git commit -m "feat(home): add Manifiesto section"
```

---

### Task 5: Franja de instituciones — extend Endorsements and reposition it

**Files:**
- Modify: `src/components/Endorsements.jsx`
- Modify: `src/pages/Home.jsx` (move the `<Endorsements/>` render call)

**Interfaces:**
- Produces: `<Endorsements/>` unchanged as a component name/API (no props before or after) — only its internal content and its position in `Home.jsx` change.

- [ ] **Step 1: Add the 3 missing institutions and the eyebrow label**

Current (full file):
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

Replace with (institutions list per `BBS_Copy_Landing_Home_v5.md`, sección 4, in the doc's order; add the `Docentes y speakers en` eyebrow the doc specifies, which the component didn't render before):

```jsx
import FadeIn from './FadeIn.jsx'

const PARTNERS = [
  'MIT Professional Education',
  'Universidad de Chicago',
  'CATIE',
  'INCAE',
  'University of the Arts London',
  'FIT — Fashion Institute of Technology (Nueva York)',
  'Parsons School of Design (Nueva York)',
]

export default function Endorsements() {
  return (
    <section id="respaldan" className="fro-sec" style={{ background:'var(--fro-bg)', paddingBottom:'3rem' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.4rem' }}>Docentes y speakers en</div></FadeIn>
      </div>
      <FadeIn delay={0.06}>
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

(Note: `paddingBottom` changed from `6rem` to `3rem` and `paddingTop` implicitly comes from `.fro-sec` now — the original had no top padding source since it was the last section before the footer; wrapping the eyebrow in `.fro-wrap` and adding `.fro-sec` gives it consistent top/bottom spacing matching every other home section. Verify visually in Step 3 and adjust the inline `paddingBottom` if the spacing looks off compared to neighboring sections — this is a minor visual judgment call, not a hard requirement.)

- [ ] **Step 2: Move `<Endorsements/>` to right after `<Manifiesto/>` and before the rest**

Current `Home.jsx` render (after Task 4):
```jsx
      <main id="main">
        <Hero/>
        <Manifiesto/>
        <DiagnosticoCTA/>
        <Programas/>
        <TresEjes/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
        <Endorsements/>
      </main>
```

Replace with (move `Endorsements` to right after `TresEjes`, matching the "Alcance — Home" order in the spec: Hero → Manifiesto → Tres ejes → Franja de instituciones → ...):
```jsx
      <main id="main">
        <Hero/>
        <Manifiesto/>
        <TresEjes/>
        <Endorsements/>
        <DiagnosticoCTA/>
        <Programas/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
      </main>
```
(`DiagnosticoCTA` and `Programas` are still rendered here as placeholders — they get removed and replaced by the two new `Transformamos*` sections in Task 7. Leaving them in this position for now keeps this task's diff focused on `Endorsements` only.)

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: succeeds. Manually check the dev server: the institutions marquee now appears right after "Los tres ejes", shows all 7 names scrolling, and has the "Docentes y speakers en" label above it.

- [ ] **Step 4: Commit**

```bash
git add src/components/Endorsements.jsx src/pages/Home.jsx
git commit -m "feat(home): extend institutions marquee to 7 names, add eyebrow, reposition after Tres Ejes"
```

---

### Task 6: Transformamos Profesionales + Transformamos Empresas — new sections

**Files:**
- Create: `src/components/TransformamosProfesionales.jsx`
- Create: `src/components/TransformamosEmpresas.jsx`

**Interfaces:**
- Consumes: `PROGRAMAS` from `src/data/programas.js` (Task 1's `tagHome` field), specifically by slug: Profesionales uses `ia-nuevos-profesionales` and `ia-profesionales-senior`; Empresas uses `negocios-regenerativos`, `marcas-regenerativas`, `economia-circular-industria`, `capital-de-impacto` (in that order, per `BBS_Copy_Landing_Home_v5.md` sección 6).
- Produces: two components, no props, each self-contained with its own `id` (`profesionales` / `empresas`) for the Nav/Footer/Hero anchors. Neither is wired into `Home.jsx` yet — that happens in Task 7, alongside removing `Programas`/`DiagnosticoCTA`.

- [ ] **Step 1: Create `src/components/TransformamosProfesionales.jsx`**

Reuses the diagnostic-card pattern from `DiagnosticoCTA.jsx` (single card, not a 2-card grid) and the program-card pattern from `Programas.jsx` (`fro-card`, "Disponible ahora" badge for `live`) — but filtered to 2 programs and with the price chip replaced by `tagHome`. Content verbatim from `BBS_Copy_Landing_Home_v5.md`, sección 5:

```jsx
import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { PROGRAMAS } from '../data/programas.js'

const SLUGS = ['ia-nuevos-profesionales', 'ia-profesionales-senior']
const PROGRAMAS_PROFESIONALES = SLUGS.map(slug => PROGRAMAS.find(p => p.slug === slug))

export default function TransformamosProfesionales() {
  return (
    <section id="profesionales" className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Para personas</div></FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:640 }}>Transformamos profesionales</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'3rem' }}>
            El criterio y la experiencia siguen siendo la ventaja que ninguna IA puede reemplazar. El riesgo no es usarla, es no saber dominarla.
          </p>
        </FadeIn>

        <div className="transf-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.6rem', alignItems:'start' }}>
          <FadeIn delay={0.16}>
            <a
              href="/diagnostico/profesionales"
              onClick={() => trackCta('diagnostico_profesionales', 'home_transformamos_profesionales', '/diagnostico/profesionales')}
              className="fro-card"
              style={{ display:'block', padding:'2rem', height:'100%', textDecoration:'none' }}
            >
              <h3 className="fro-h3" style={{ marginBottom:'0.9rem' }}>¿Dominas la IA, o la IA te está dominando a ti?</h3>
              <p className="fro-body" style={{ marginBottom:'1.4rem' }}>
                Antes de elegir un programa, descubre en qué nivel estás — una evaluación real, no un quiz de tres preguntas.
              </p>
              <span className="fro-mark-amber fro-card-cta" style={{ fontSize:'0.88rem', fontWeight:700 }}>Haz tu autodiagnóstico →</span>
            </a>
          </FadeIn>

          <div style={{ display:'flex', flexDirection:'column', gap:'1.2rem' }}>
            {PROGRAMAS_PROFESIONALES.map((p, i) => (
              <FadeIn key={p.slug} delay={0.22 + i*0.06}>
                <a
                  href={`/programas/${p.slug}`}
                  onClick={() => trackCta(`programa_${p.slug}`, 'home_transformamos_profesionales', `/programas/${p.slug}`)}
                  className={p.status === 'live' ? 'fro-card fro-card-live' : 'fro-card'}
                  style={{ display:'flex', flexDirection:'column', padding:'1.4rem', textDecoration:'none' }}
                >
                  {p.status === 'live' && (
                    <span style={{ alignSelf:'flex-start', background:'#0A0A0A', color:'var(--fro-amber)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.28rem 0.6rem', borderRadius:20, marginBottom:'0.8rem' }}>
                      Disponible ahora
                    </span>
                  )}
                  <div className="fro-sm" style={{ marginBottom:'0.6rem', textTransform:'uppercase', letterSpacing:'0.1em', fontSize:'0.68rem' }}>{p.audiencia}</div>
                  <h3 className="fro-h3" style={{ marginBottom:'0.6rem', fontSize:'1.05rem' }}>{p.titulo}</h3>
                  <p className="fro-body" style={{ fontSize:'0.86rem', marginBottom:0 }}>{p.notaCard}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'1.2rem' }}>
                    {p.tagHome ? <span className="fro-chip-outline">{p.tagHome}</span> : <span/>}
                    <span className="fro-card-cta" style={{ fontSize:'0.82rem', fontWeight:600 }}>Ver programa →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width: 860px){ .transf-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/TransformamosEmpresas.jsx`**

Same structure, 4 program cards. Content verbatim from `BBS_Copy_Landing_Home_v5.md`, sección 6:

```jsx
import FadeIn from './FadeIn.jsx'
import { trackCta } from '../lib/analytics.js'
import { PROGRAMAS } from '../data/programas.js'

const SLUGS = ['negocios-regenerativos', 'marcas-regenerativas', 'economia-circular-industria', 'capital-de-impacto']
const PROGRAMAS_EMPRESAS = SLUGS.map(slug => PROGRAMAS.find(p => p.slug === slug))

export default function TransformamosEmpresas() {
  return (
    <section id="empresas" className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom:'1.2rem' }}>Para negocios</div></FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom:'1rem', maxWidth:640 }}>Transformamos empresas</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'3rem' }}>
            Fortalecer el negocio primero es lo que realmente prepara a una empresa para escalar y acceder a capital. No al revés.
          </p>
        </FadeIn>

        <div className="transf-grid-empresas" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.6rem', alignItems:'start' }}>
          <FadeIn delay={0.16}>
            <a
              href="/diagnostico/empresas"
              onClick={() => trackCta('diagnostico_empresas', 'home_transformamos_empresas', '/diagnostico/empresas')}
              className="fro-card"
              style={{ display:'block', padding:'2rem', height:'100%', textDecoration:'none' }}
            >
              <h3 className="fro-h3" style={{ marginBottom:'0.9rem' }}>Antes de salir a levantar capital, hay que saber qué fortalecer primero</h3>
              <p className="fro-body" style={{ marginBottom:'1.4rem' }}>
                Este diagnóstico te da una radiografía honesta de tu negocio en minutos, como la vería un inversionista.
              </p>
              <span className="fro-mark-amber fro-card-cta" style={{ fontSize:'0.88rem', fontWeight:700 }}>Evalúa tu negocio →</span>
            </a>
          </FadeIn>

          <div className="empresas-cards-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
            {PROGRAMAS_EMPRESAS.map((p, i) => (
              <FadeIn key={p.slug} delay={0.22 + i*0.05}>
                <a
                  href={`/programas/${p.slug}`}
                  onClick={() => trackCta(`programa_${p.slug}`, 'home_transformamos_empresas', `/programas/${p.slug}`)}
                  className={p.status === 'live' ? 'fro-card fro-card-live' : 'fro-card'}
                  style={{ display:'flex', flexDirection:'column', padding:'1.2rem', height:'100%', textDecoration:'none' }}
                >
                  {p.status === 'live' && (
                    <span style={{ alignSelf:'flex-start', background:'#0A0A0A', color:'var(--fro-amber)', fontSize:'0.6rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', padding:'0.28rem 0.6rem', borderRadius:20, marginBottom:'0.7rem' }}>
                      Disponible ahora
                    </span>
                  )}
                  <div className="fro-sm" style={{ marginBottom:'0.5rem', textTransform:'uppercase', letterSpacing:'0.1em', fontSize:'0.66rem' }}>{p.audiencia}</div>
                  <h3 className="fro-h3" style={{ marginBottom:'0.5rem', fontSize:'0.98rem' }}>{p.titulo}</h3>
                  <p className="fro-body" style={{ fontSize:'0.82rem', marginBottom:0 }}>{p.notaCard}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'1rem' }}>
                    {p.tagHome ? <span className="fro-chip-outline">{p.tagHome}</span> : <span/>}
                    <span className="fro-card-cta" style={{ fontSize:'0.78rem', fontWeight:600 }}>Ver programa →</span>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width: 860px){ .transf-grid-empresas { grid-template-columns: 1fr !important; } }
        @media(max-width: 560px){ .empresas-cards-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: succeeds. These two components are not yet imported anywhere (Task 7 wires them in) — this step only confirms they're syntactically valid and `PROGRAMAS.find()` resolves all 6 slugs without returning `undefined` (a typo'd slug would make a card render with `undefined` fields, not a build failure — double-check by temporarily adding `console.log(PROGRAMAS_PROFESIONALES, PROGRAMAS_EMPRESAS)` in one file, running `npm run dev`, checking the browser console shows 2 and 4 fully-populated objects respectively, then removing the console.log before committing).

- [ ] **Step 4: Commit**

```bash
git add src/components/TransformamosProfesionales.jsx src/components/TransformamosEmpresas.jsx
git commit -m "feat(home): add Transformamos Profesionales/Empresas sections (not yet wired into Home)"
```

---

### Task 7: Wire the new sections into Home, remove the old ones

**Files:**
- Modify: `src/pages/Home.jsx`
- Check (read-only, no modification expected): grep the repo for other consumers of `Programas.jsx` / `DiagnosticoCTA.jsx` / the `#programas` / `#diagnostico` anchors, per Step 3 below.

**Interfaces:**
- Consumes: `TransformamosProfesionales` and `TransformamosEmpresas` from Task 6.

- [ ] **Step 1: Replace `Programas`/`DiagnosticoCTA` with the two new sections**

Current `Home.jsx` (after Task 5):
```jsx
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Manifiesto from '../components/Manifiesto.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Programas from '../components/Programas.jsx'
import ComunidadBiobuilders from '../components/ComunidadBiobuilders.jsx'
import DiagnosticoCTA from '../components/DiagnosticoCTA.jsx'
import RespaldoInstitucional from '../components/RespaldoInstitucional.jsx'
import Endorsements from '../components/Endorsements.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <Manifiesto/>
        <TresEjes/>
        <Endorsements/>
        <DiagnosticoCTA/>
        <Programas/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
      </main>
      <Footer/>
    </>
  )
}
```

Replace with:
```jsx
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Manifiesto from '../components/Manifiesto.jsx'
import TresEjes from '../components/TresEjes.jsx'
import Endorsements from '../components/Endorsements.jsx'
import TransformamosProfesionales from '../components/TransformamosProfesionales.jsx'
import TransformamosEmpresas from '../components/TransformamosEmpresas.jsx'
import ComunidadBiobuilders from '../components/ComunidadBiobuilders.jsx'
import RespaldoInstitucional from '../components/RespaldoInstitucional.jsx'
import Footer from '../components/Footer.jsx'

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link" style={{ position:'absolute', left:-9999, top:0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <Hero/>
        <Manifiesto/>
        <TresEjes/>
        <Endorsements/>
        <TransformamosProfesionales/>
        <TransformamosEmpresas/>
        <ComunidadBiobuilders/>
        <RespaldoInstitucional/>
      </main>
      <Footer/>
    </>
  )
}
```

- [ ] **Step 2: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Grep for other consumers of the removed sections/anchors**

Run:
```bash
grep -rn "Programas.jsx\|DiagnosticoCTA.jsx" src/ --include="*.jsx" --include="*.js"
grep -rn "#programas\|#diagnostico\b" src/ public/ --include="*.jsx" --include="*.js" --include="*.html" --include="*.xml"
```
Expected: `Programas.jsx`/`DiagnosticoCTA.jsx` no longer appear in any import (only their own file definitions, if grep matches the filename inside the file itself it's a false positive from the search pattern — check actual import lines). `#programas`/`#diagnostico` should not appear anywhere except possibly `Nav.jsx`/`Footer.jsx` (which Task 9 fixes) — if either string turns up somewhere else (e.g. `public/sitemap.xml`, an old test, a README), report it in the task report as a finding rather than silently leaving it — don't guess whether it's safe to change without checking what references it.

If the grep confirms `Programas.jsx` and `DiagnosticoCTA.jsx` have zero remaining importers, leave the files in place (do not delete them in this task — removing dead files is a separate, lower-risk cleanup that doesn't need to block this content update; note it in the task report as a follow-up candidate).

- [ ] **Step 4: Manual verification in the dev server**

Start the dev server, load the home page, and confirm:
- The page no longer has a single mixed 6-card program grid.
- "Transformamos Profesionales" (2 cards, diagnostic card on the left) and "Transformamos Empresas" (4 cards, diagnostic card on the left) both render, each program card links to the right `/programas/<slug>` page, and neither ficha shows a price — only "Ver programa →" plus a tag where the program has one (verify against the `tagHome` values from Task 1: no tag on IA Nuevos Profesionales, "30% off por pronto pago" on Senior/Negocios/Economía Circular/Capital, "Precio especial" on Marcas).
- The hero's "Ver los 6 programas" button scrolls to the "Transformamos Profesionales" section (id `profesionales`, wired in Task 3 — confirm the scroll target actually exists now that Task 6/7 created it).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat(home): replace single programs grid + diagnostico CTA with audience-split Transformamos sections"
```

---

### Task 8: Comunidad Biobuilders + Respaldo Institucional copy

**Files:**
- Modify: `src/components/ComunidadBiobuilders.jsx`
- Modify: `src/components/RespaldoInstitucional.jsx`

**Interfaces:** none — both are self-contained, no props, no consumers beyond `Home.jsx`'s existing render calls (unchanged).

- [ ] **Step 1: Update `ComunidadBiobuilders.jsx` — eyebrow, title, and paragraph**

Current (lines 12-21):
```jsx
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
```

Replace with (verbatim from `BBS_Copy_Landing_Home_v5.md`, sección 7 — antetítulo `Biobuilders`, título `Súmate a la comunidad`, and the simplified paragraph):
```jsx
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom:'1.2rem' }}>Biobuilders</div></FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="fro-h2" style={{ marginBottom:'1.4rem', maxWidth:760 }}>
            Súmate a la comunidad
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="fro-lead" style={{ maxWidth:680, marginBottom:'2.2rem' }}>
            Súmate a la comunidad gratuita de profesionales que comparten nuestra visión de transformar América Latina y el Caribe, a través del desarrollo e inversión de industrias basadas en sistemas vivos. Recibe nuevas oportunidades de inversión, trabajo y financiamiento, entre otras.
          </p>
        </FadeIn>
```
(The CTA button `Únete por WhatsApp →` and the `Gratuito` caption below it, lines 24-33, are unchanged — don't touch them.)

- [ ] **Step 2: Update `RespaldoInstitucional.jsx` — main paragraph**

Current (lines 15-17):
```jsx
          <p className="fro-lead" style={{ maxWidth:820, marginBottom:'2.4rem' }}>
            Bio Business School nace de Redesign Lab, la empresa que fundamos y desde la cual hemos desarrollado distintas iniciativas de transformación económica en la región. Antes de este proyecto, hemos ayudado a diseñar y ejecutar programas de formación para instituciones como MIT Professional Education, la Universidad de Chicago, CATIE e INCAE. Somos Claude Network Partners, porque creemos que la inteligencia artificial es indispensable para este proceso. Y seguimos sumando alianzas que refuercen la misma tesis.
          </p>
```

Replace with (verbatim from `BBS_Copy_Landing_Home_v5.md`, sección 9 — no longer names the 4 institutions individually, since they're now in the marquee from Task 5; instead carries the trajectory numbers that used to live in the Hero's stats bar, removed in Task 3):
```jsx
          <p className="fro-lead" style={{ maxWidth:820, marginBottom:'2.4rem' }}>
            Bio Business School nace de Redesign Lab, la empresa que Eddie y Lorenzo fundaron, y desde la cual han desarrollado distintas iniciativas de transformación económica en la región. Cuentan con más de 30 años de experiencia corporativa combinada: han gestionado más de un millón de dólares en fondos no reembolsables, un millón y medio de dólares en deuda de impacto, y participado en procesos de formulación de proyectos de financiamiento por 80 millones de dólares en la región. Ambos son docentes y speakers en instituciones de renombre internacional, y son Claude Network Partners en Perú, porque creen que la inteligencia artificial es indispensable para acelerar la transformación de los negocios regenerativos y la bioeconomía en América Latina.
          </p>
```
(The founders block below it — `FOUNDERS.map`, photos + LinkedIn links, lines 20-46 — is unchanged.)

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: succeeds. Manually check both sections render the new text with no leftover reference to "fundamos" (first person) or to MIT/Chicago/CATIE/INCAE by name in Respaldo Institucional, and Comunidad Biobuilders no longer says "No es un producto que se vende."

- [ ] **Step 4: Commit**

```bash
git add src/components/ComunidadBiobuilders.jsx src/components/RespaldoInstitucional.jsx
git commit -m "feat(home): update Comunidad Biobuilders and Respaldo Institucional copy"
```

---

### Task 9: Nav + Footer anchor links

**Files:**
- Modify: `src/components/Nav.jsx`
- Modify: `src/components/Footer.jsx`

**Interfaces:** none — both are self-contained navigation components, no props.

- [ ] **Step 1: Update `Nav.jsx`'s `LINKS` array**

Current (lines 5-9):
```jsx
const LINKS = [
  ['/#programas',   'Programas'],
  ['/#comunidad',   'Comunidad'],
  ['/#diagnostico', 'Diagnóstico'],
]
```

Replace with:
```jsx
const LINKS = [
  ['/#profesionales', 'Profesionales'],
  ['/#empresas',      'Empresas'],
  ['/#comunidad',     'Comunidad'],
]
```
(This one array feeds both the desktop nav and the mobile menu — both `.map(LINKS...)` calls elsewhere in the file need no other changes, they just render whatever's in this array.)

- [ ] **Step 2: Update `Footer.jsx`'s nav links and add a visible contact email**

Current (lines 85-99):
```jsx
          <nav aria-label="Navegación">
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Explorar</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                ['Programas', '/#programas'],
                ['Comunidad', '/#comunidad'],
                ['Diagnóstico', '/#diagnostico'],
                ['Contacto', 'mailto:biobusiness@redesignlab.org'],
              ].map(([l,h]) => (
                <li key={l}>
                  <a href={h} style={{ fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none' }}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>
```

Replace with (3 links per the doc — Profesionales, Empresas, Comunidad — dropping Contacto from this list; the contact email moves to the logo blurb column instead, so it's not lost):
```jsx
          <nav aria-label="Navegación">
            <h4 className="fro-eyebrow" style={{ fontSize:'0.68rem', marginBottom:'1rem' }}>Explorar</h4>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.5rem' }}>
              {[
                ['Profesionales', '/#profesionales'],
                ['Empresas', '/#empresas'],
                ['Comunidad', '/#comunidad'],
              ].map(([l,h]) => (
                <li key={l}>
                  <a href={h} style={{ fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none' }}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>
```

Then, in the first footer-grid column (lines 72-83), add the contact email under the existing "Powered by Redesign Lab" line so the address stays visible somewhere:

Current:
```jsx
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
```

Replace with:
```jsx
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
            <a
              href="mailto:biobusiness@redesignlab.org"
              style={{ display:'inline-block', marginTop:'0.6rem', fontSize:'0.85rem', color:'var(--fro-text-2)', textDecoration:'none' }}
            >
              biobusiness@redesignlab.org
            </a>
          </div>
```

- [ ] **Step 3: Build and verify**

Run: `npm run build`
Expected: succeeds. Manually check: the top nav shows "Profesionales · Empresas · Comunidad" and each link scrolls to the right section on the home page (test from a program subpage too, e.g. `/programas/marcas-regenerativas` — clicking "Profesionales" from there should navigate back to `/#profesionales` and land on the right section). The footer shows the same 3 links plus the contact email visible near the logo.

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.jsx src/components/Footer.jsx
git commit -m "feat(nav): update Nav and Footer links to Profesionales/Empresas/Comunidad anchors"
```

---

### Task 10: Final verification

**Files:** none (verification only).

- [ ] **Step 1: Full build**

Run: `npm run build`
Expected: succeeds cleanly, no warnings about unused imports (`Programas`, `DiagnosticoCTA` should show 0 remaining imports per Task 7's grep check — if the files are still imported anywhere by mistake this would either fail the build or silently keep dead sections around, so re-run the Task 7 Step 3 greps here as a final check).

- [ ] **Step 2: Existing automated test suite still passes**

Run: `npm test`
Expected: all tests pass (this content update touches zero files under `api/` or `src/data/diagnostico*.js` — the full suite from subsystems 3-4 should be unaffected; if anything fails, it's a sign something in this plan touched a file it shouldn't have).

- [ ] **Step 3: Full manual browser walkthrough of the home page**

Using the dev server, load `/` and confirm, top to bottom:
1. Hero shows the new badge/titular/paragraphs, no stats bar, and the CTA scrolls to "Transformamos Profesionales".
2. Manifiesto renders all 5 lines.
3. Los tres ejes is unchanged (Venn diagram + copy).
4. The institutions marquee shows all 7 names and the "Docentes y speakers en" label.
5. Transformamos Profesionales: diagnostic card links to `/diagnostico/profesionales`; both program cards link correctly, show no price, and show the right tag (none / "30% off por pronto pago").
6. Transformamos Empresas: diagnostic card links to `/diagnostico/empresas`; all 4 program cards link correctly, show no price, and show the right tag (per program, from Task 1's `tagHome` values).
7. Comunidad Biobuilders shows "Biobuilders" / "Súmate a la comunidad" / the new paragraph, and the WhatsApp CTA still works.
8. Respaldo Institucional shows the new paragraph (with the trajectory numbers, no institution names) and the founders block still renders both photos/LinkedIn links.
9. Footer shows "Profesionales · Empresas · Comunidad" links plus the visible contact email, and the newsletter form still submits (`bbs-newsletter` via `/api/lead` — unaffected by this plan, just confirm it's still there and functional).

- [ ] **Step 4: Spot-check 3 program subpages for pricing correctness**

Visit `/programas/ia-nuevos-profesionales`, `/programas/marcas-regenerativas`, and `/programas/capital-de-impacto`. For each, confirm the payment button label matches Task 2 Step 1's table, and for Marcas Regenerativas specifically confirm the RIZOMA/ThousandFold block now appears after the price section (not before, as it did originally).

- [ ] **Step 5: Mobile viewport check**

Resize to 375px width (or use the browser's device emulation) and re-check the home page top to bottom — particularly the two-column sections (Transformamos Profesionales/Empresas, footer grid) should collapse to single-column with no horizontal overflow.

- [ ] **Step 6: Update the progress ledger**

Create `.superpowers/sdd/progress-content-update.md` (if using subagent-driven-development) summarizing each task's outcome, or otherwise note in the session that this plan is complete — no commit needed for this step if using inline execution instead.
