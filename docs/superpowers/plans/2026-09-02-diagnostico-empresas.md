# Diagnóstico Empresas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/diagnostico/empresas` — a single-questionnaire (no
branching) quiz widget that scores 3 dimensions (Marca, Negocio,
Capital), classifies into 1 of 4 results (with a conditional secondary
recommendation), and writes leads to the existing `/api/lead` endpoint.
No percentile — Eddie's explicit call — replaced with a detailed
per-dimension read shown for all 3 dimensions regardless of which is
primary.

**Architecture:** Same split as subsistema 4a: pure data/logic in one
data module (questions, scoring, classification, result content),
presentational screen components, one page component owning flow state.
Two of 4a's screen components (`PantallaBienvenida.jsx`,
`PantallaTransicion.jsx`) currently hardcode Profesionales-specific
copy instead of receiving it via props — this plan genericizes both
(Task 2) as a prerequisite, since this diagnostic needs its own welcome/
transition copy and duplicating those components would violate DRY.

**Tech Stack:** React (existing SPA), no new dependencies. `node:test`
for the data layer and the `lead-notify.js` schema, matching 4a.
`api/diagnostico-stats.js` is **not touched** — this diagnostic has no
percentile.

## Global Constraints

- 10 questions, fixed order, no branching: Marca (m1-m3) → Negocio (n1-n3) → Capital (c1-c3) → Sector (s1, doesn't score).
- Each scored question's 4 options are worth 0/1/2/3 points; each dimension's max is 9 (3 questions × 3).
- Classification: `sector === 'industria'` → `resultado = 'industria'`, overriding everything else. Otherwise `resultado` = the dimension (`marca`/`negocio`/`capital`) with the lowest score; ties broken by priority `marca > negocio > capital`.
- `secundario = 'capital'` when `resultado !== 'capital'` AND `capitalScore <= 3`; otherwise `null`.
- Programs: `marca` → `marcas-regenerativas`, `negocio` → `negocios-regenerativos`, `capital` → `capital-de-impacto`, `industria` → `economia-circular-industria` (slugs from `src/data/programas.js`).
- `/api/lead` payload: `{ form: 'bbs-diagnostico-empresas', data: { nombre, email, whatsapp, sector, marcaScore, negocioScore, capitalScore, scoreTotal, scoreMax, resultado, secundario, pagina_origen } }`.
- Sheet column order for "Diagnóstico Empresas": `timestamp, nombre, email, whatsapp, sector, marcaScore, negocioScore, capitalScore, scoreTotal, scoreMax, resultado, secundario, pagina_origen`.
- No percentile anywhere in this subsystem — `api/diagnostico-stats.js` is not modified, not called, not tested further.
- `package.json` has `"type": "module"` — ESM only. No test files under `api/` — all tests under `test/`.

---

### Task 1: Data layer — questions, scoring, result content

**Files:**
- Create: `src/data/diagnosticoEmpresas.js`
- Create: `test/diagnosticoEmpresas.test.js`

**Interfaces:**
- Produces: `QUESTIONS` (array of the 9 scored questions, `m1..c3`, in
  fixed order), `SECTOR_QUESTION` (object, the 10th/last question, does
  not score), `calcularResultado(respuestas, sector)` →
  `{ sector, marcaScore, negocioScore, capitalScore, scoreTotal,
  scoreMax, resultado, secundario, dimensiones: [{nombre, porcentaje,
  lectura}], contenido: {nombre, diagnostico, fortalezas, oportunidad,
  recomendacion, programaSlug, programaCtaNota}, contenidoSecundario:
  (same shape as contenido) | null }`. `respuestas` maps question `id` →
  the chosen option's `valor` (0-3); `sector` is `'general'` or
  `'industria'` (from the caller having already read the sector answer
  out of `respuestas` — see Task 4).

- [ ] **Step 1: Write `src/data/diagnosticoEmpresas.js`**

```js
export const MARCA_QUESTIONS = [
  {
    id: 'm1',
    dimension: 'marca',
    pregunta: 'Si le preguntas a un cliente qué te hace diferente de la competencia, ¿qué tan claro tiene la respuesta?',
    opciones: [
      { texto: 'No creo que sepa decirlo', valor: 0 },
      { texto: 'Diría algo genérico, tipo "sostenibilidad" o "impacto"', valor: 1 },
      { texto: 'Tiene una idea, aunque no muy afilada', valor: 2 },
      { texto: 'Lo tiene clarísimo, y es distinto a lo que dicen mis competidores', valor: 3 },
    ],
  },
  {
    id: 'm2',
    dimension: 'marca',
    pregunta: '¿Tu identidad visual y tu forma de comunicar realmente reflejan lo que hace distinto a tu negocio?',
    opciones: [
      { texto: 'Se parece bastante a cualquier otra marca "verde" del mercado', valor: 0 },
      { texto: 'Tiene algo propio, pero se pierde entre el resto', valor: 1 },
      { texto: 'Sí se nota una diferencia, aunque podría ser más fuerte', valor: 2 },
      { texto: 'Es inconfundible — nadie la confunde con otra marca', valor: 3 },
    ],
  },
  {
    id: 'm3',
    dimension: 'marca',
    pregunta: '¿Sientes que estás cobrando lo que tu propuesta realmente vale, o compitiendo por precio?',
    opciones: [
      { texto: 'Compito por precio, constantemente', valor: 0 },
      { texto: 'A veces logro cobrar más, pero cuesta sostenerlo', valor: 1 },
      { texto: 'En general logro un precio justo por mi diferencia', valor: 2 },
      { texto: 'Cobro un premium claro y los clientes lo entienden', valor: 3 },
    ],
  },
]

export const NEGOCIO_QUESTIONS = [
  {
    id: 'n1',
    dimension: 'negocio',
    pregunta: '¿Tienes un modelo económico (cómo generas ingresos, cuáles son tus márgenes reales) documentado y claro, más allá de la intención regenerativa?',
    opciones: [
      { texto: 'No, vamos más por intuición y ajustes sobre la marcha', valor: 0 },
      { texto: 'Tengo una idea general, pero no está en un documento o modelo real', valor: 1 },
      { texto: 'Sí, tengo un modelo, aunque no lo reviso seguido', valor: 2 },
      { texto: 'Sí, y lo reviso y ajusto activamente con datos reales', valor: 3 },
    ],
  },
  {
    id: 'n2',
    dimension: 'negocio',
    pregunta: '¿Qué tan claro tienes tu modelo operativo — cómo escala tu negocio sin que dependa 100% de ti?',
    opciones: [
      { texto: 'Hoy depende casi todo de mí', valor: 0 },
      { texto: 'Tengo procesos básicos, pero informales', valor: 1 },
      { texto: 'Tengo procesos documentados para lo esencial', valor: 2 },
      { texto: 'El negocio funciona con estructura, no solo conmigo', valor: 3 },
    ],
  },
  {
    id: 'n3',
    dimension: 'negocio',
    pregunta: '¿Tienes gobernanza clara (roles, decisiones, cómo se reparte el valor) si tu negocio creciera mañana?',
    opciones: [
      { texto: 'No lo he pensado', valor: 0 },
      { texto: 'Tengo una idea informal', valor: 1 },
      { texto: 'Tengo algo definido, aunque básico', valor: 2 },
      { texto: 'Tengo gobernanza clara y probada', valor: 3 },
    ],
  },
]

export const CAPITAL_QUESTIONS = [
  {
    id: 'c1',
    dimension: 'capital',
    pregunta: 'Si un inversionista te pregunta por tu estructura de capital, ¿qué tan preparado te sientes para responder?',
    opciones: [
      { texto: 'No sabría por dónde empezar', valor: 0 },
      { texto: 'Tengo una idea general, no un documento', valor: 1 },
      { texto: 'Podría responder con algo de preparación', valor: 2 },
      { texto: 'Tengo la estructura de capital clara y documentada', valor: 3 },
    ],
  },
  {
    id: 'c2',
    dimension: 'capital',
    pregunta: '¿Tienes un data room (documentos financieros, legales, operativos ordenados) listo para mostrar a un inversionista?',
    opciones: [
      { texto: 'No tengo nada armado', valor: 0 },
      { texto: 'Tengo algunos documentos sueltos', valor: 1 },
      { texto: 'Tengo la mayoría, pero no está ordenado como data room', valor: 2 },
      { texto: 'Sí, tengo un data room listo', valor: 3 },
    ],
  },
  {
    id: 'c3',
    dimension: 'capital',
    pregunta: '¿Sabrías construir el caso de inversión — por qué tu negocio merece financiamiento y cómo generaría retorno — de forma convincente?',
    opciones: [
      { texto: 'No, es mi punto más débil', valor: 0 },
      { texto: 'Tengo el argumento, pero no lo he probado con inversionistas reales', valor: 1 },
      { texto: 'Lo he armado y presentado, con resultados mixtos', valor: 2 },
      { texto: 'Sí, y he conseguido o estoy cerca de conseguir financiamiento con eso', valor: 3 },
    ],
  },
]

export const QUESTIONS = [...MARCA_QUESTIONS, ...NEGOCIO_QUESTIONS, ...CAPITAL_QUESTIONS]

export const SECTOR_QUESTION = {
  id: 's1',
  pregunta: '¿Cuál describe mejor tu negocio?',
  opciones: [
    { texto: 'Producto, marca o servicio de consumo (B2C o B2B general)', sector: 'general' },
    { texto: 'Agricultura, pesca, minería, energía o manufactura a escala industrial', sector: 'industria' },
    { texto: 'Servicios profesionales, consultoría o tecnología', sector: 'general' },
    { texto: 'Otro', sector: 'general' },
  ],
}

const DIMENSION_MAX = 9

const LECTURAS = {
  marca: {
    brechaReal: 'Tu marca aún no comunica lo que te hace distinto.',
    enDesarrollo: 'Tienes una diferencia real, pero no está del todo afilada.',
    solido: 'Tu marca ya comunica tu diferencia con claridad.',
  },
  negocio: {
    brechaReal: 'Tu modelo económico y operativo no está lo suficientemente definido.',
    enDesarrollo: 'Tienes estructura básica — falta consolidarla.',
    solido: 'Tu ingeniería de negocio ya sostiene el propósito.',
  },
  capital: {
    brechaReal: 'No estás preparado para hablar el idioma de un inversionista.',
    enDesarrollo: 'Tienes elementos sueltos — falta armarlos en un caso convincente.',
    solido: 'Tu preparación para levantar capital ya es competitiva.',
  },
}

function lecturaDimension(dimension, score) {
  if (score <= 3) return LECTURAS[dimension].brechaReal
  if (score <= 6) return LECTURAS[dimension].enDesarrollo
  return LECTURAS[dimension].solido
}

const RESULTADOS = {
  marca: {
    nombre: 'Marca eco-genérica',
    diagnostico: 'Tu marca probablemente suena parecida a las cien que dicen tener lo mismo. No es un problema de diseño — es que tu propuesta de valor real no se está traduciendo en algo que el mercado perciba y esté dispuesto a pagar más por eso.',
    fortalezas: [
      'Tienes una causa real detrás — el problema no es de sustancia, es de traducción',
      'Ya estás operando, lo cual te da casos reales para construir una narrativa distinta',
    ],
    oportunidad: [
      'Tu identidad visual y narrativa se parecen a cualquier otra marca "verde" del mercado',
      'Estás compitiendo por precio en vez de cobrar lo que tu diferencia realmente vale',
    ],
    recomendacion: 'Antes de gastar más en marketing genérico, define qué te hace estructuralmente distinto — y constrúyelo desde ahí.',
    programaSlug: 'marcas-regenerativas',
    programaCtaNota: 'para dejar de sonar genérica y empezar a sonar como lo que realmente eres.',
  },
  negocio: {
    nombre: 'Intención sin ingeniería',
    diagnostico: 'Tienes la intención regenerativa correcta, pero sin modelo económico y operativo sólido, el propósito no escala — se queda en discurso. Te falta la ingeniería detrás del negocio que sí funciona.',
    fortalezas: [
      'El propósito ya está — no partes de cero en lo que más cuesta enseñar',
      'Tienes el contexto real de tu negocio para diseñar un modelo que sí aplique, no uno genérico',
    ],
    oportunidad: [
      'Tu modelo económico y operativo no está lo suficientemente documentado ni probado',
      'Dependes más de intuición que de estructura para decisiones clave',
    ],
    recomendacion: 'Convierte tu buena intención en un modelo económico y operativo que puedas defender con números, no solo con propósito.',
    programaSlug: 'negocios-regenerativos',
    programaCtaNota: 'la ingeniería detrás del negocio que sí funciona.',
  },
  capital: {
    nombre: 'Buen proyecto, capital que no llega',
    diagnostico: 'El capital no te está esquivando por falta de mérito — te está esquivando porque todavía no hablas el idioma que un inversionista necesita escuchar: estructura de capital, narrativa financiera, data room.',
    fortalezas: [
      'Tienes un proyecto real detrás — el problema no es el fondo, es la forma',
      'Ya identificas que necesitas capital, lo cual ya es más claridad que la mayoría',
    ],
    oportunidad: [
      'No tienes un data room ni una estructura de capital lista para mostrar',
      'Te falta el caso de inversión armado — por qué tu negocio merece financiamiento y cómo retorna',
    ],
    recomendacion: 'Antes de salir a buscar inversionistas, arma primero el material que ellos esperan ver — la preparación es lo que cierra la brecha.',
    programaSlug: 'capital-de-impacto',
    programaCtaNota: 'para que hables el idioma que un inversionista necesita escuchar.',
  },
  industria: {
    nombre: 'Operaciones ineficientes y lineales',
    diagnostico: 'Tu industria opera con márgenes cada vez más ajustados — y probablemente no estás aprovechando al máximo los recursos que ya tienes, incluido todo lo que hoy tratas como residuo. No es solo un tema de desperdicio: es cuánto valor real dejas sin capturar en tu propia operación.',
    fortalezas: [
      'Ya tienes la escala y los procesos para que un rediseño circular genere ahorro real, no solo simbólico',
      'Tu industria específica ya tiene marcos aplicados (ISO 59000, casos reales) que se pueden adaptar directo a tu operación',
    ],
    oportunidad: [
      'Sigues operando bajo una lógica lineal — extraer, usar, descartar — en vez de circular',
      'El riesgo social de tu operación probablemente se aborda con programas genéricos, no con modelos de negocio que generen valor compartido real',
    ],
    recomendacion: 'Empieza por mapear qué estás descartando hoy que todavía tiene valor recuperable — ahí suele estar el primer ahorro concreto.',
    programaSlug: 'economia-circular-industria',
    programaCtaNota: 'para llevar tu economía circular al siguiente nivel operativo.',
  },
}

const SECUNDARIO_CAPITAL_UMBRAL = 3

function sumaDimension(preguntas, respuestas) {
  return preguntas.reduce((sum, p) => sum + (respuestas[p.id] ?? 0), 0)
}

export function calcularResultado(respuestas, sector) {
  const marcaScore = sumaDimension(MARCA_QUESTIONS, respuestas)
  const negocioScore = sumaDimension(NEGOCIO_QUESTIONS, respuestas)
  const capitalScore = sumaDimension(CAPITAL_QUESTIONS, respuestas)
  const scoreTotal = marcaScore + negocioScore + capitalScore
  const scoreMax = DIMENSION_MAX * 3

  let resultado
  if (sector === 'industria') {
    resultado = 'industria'
  } else {
    const candidatos = [
      { key: 'marca', score: marcaScore },
      { key: 'negocio', score: negocioScore },
      { key: 'capital', score: capitalScore },
    ]
    resultado = candidatos.reduce((min, c) => (c.score < min.score ? c : min)).key
  }

  const secundario = resultado !== 'capital' && capitalScore <= SECUNDARIO_CAPITAL_UMBRAL ? 'capital' : null

  const dimensiones = [
    { nombre: 'Marca', porcentaje: Math.round((marcaScore / DIMENSION_MAX) * 100), lectura: lecturaDimension('marca', marcaScore) },
    { nombre: 'Negocio', porcentaje: Math.round((negocioScore / DIMENSION_MAX) * 100), lectura: lecturaDimension('negocio', negocioScore) },
    { nombre: 'Capital', porcentaje: Math.round((capitalScore / DIMENSION_MAX) * 100), lectura: lecturaDimension('capital', capitalScore) },
  ]

  return {
    sector,
    marcaScore,
    negocioScore,
    capitalScore,
    scoreTotal,
    scoreMax,
    resultado,
    secundario,
    dimensiones,
    contenido: RESULTADOS[resultado],
    contenidoSecundario: secundario ? RESULTADOS[secundario] : null,
  }
}
```

- [ ] **Step 2: Write the tests**

Create `test/diagnosticoEmpresas.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  QUESTIONS,
  SECTOR_QUESTION,
  calcularResultado,
} from '../src/data/diagnosticoEmpresas.js'

test('QUESTIONS has exactly 9 scored questions, each with 4 options valued 0-3', () => {
  assert.equal(QUESTIONS.length, 9)
  for (const q of QUESTIONS) {
    assert.equal(q.opciones.length, 4)
    assert.deepEqual(q.opciones.map(o => o.valor), [0, 1, 2, 3])
  }
})

test('SECTOR_QUESTION has 4 options, exactly one mapping to sector "industria"', () => {
  assert.equal(SECTOR_QUESTION.opciones.length, 4)
  const industriaCount = SECTOR_QUESTION.opciones.filter(o => o.sector === 'industria').length
  assert.equal(industriaCount, 1)
  const generalCount = SECTOR_QUESTION.opciones.filter(o => o.sector === 'general').length
  assert.equal(generalCount, 3)
})

function allZero(ids) {
  return Object.fromEntries(ids.map(id => [id, 0]))
}
function allMax(ids) {
  return Object.fromEntries(ids.map(id => [id, 3]))
}

const TODAS_LAS_PREGUNTAS_IDS = ['m1', 'm2', 'm3', 'n1', 'n2', 'n3', 'c1', 'c2', 'c3']

test('calcularResultado: all-zero answers, sector general, routes to marca (tie-break priority)', () => {
  const r = calcularResultado(allZero(TODAS_LAS_PREGUNTAS_IDS), 'general')
  assert.equal(r.marcaScore, 0)
  assert.equal(r.negocioScore, 0)
  assert.equal(r.capitalScore, 0)
  assert.equal(r.scoreTotal, 0)
  assert.equal(r.scoreMax, 27)
  assert.equal(r.resultado, 'marca')
})

test('calcularResultado: sector industria always wins, regardless of dimension scores', () => {
  const r = calcularResultado(allMax(TODAS_LAS_PREGUNTAS_IDS), 'industria')
  assert.equal(r.resultado, 'industria')
  assert.equal(r.contenido.programaSlug, 'economia-circular-industria')
})

test('calcularResultado: lowest dimension wins when there is no tie', () => {
  const respuestas = {
    m1: 3, m2: 3, m3: 3, // marca = 9
    n1: 1, n2: 1, n3: 1, // negocio = 3 (lowest)
    c1: 3, c2: 2, c3: 3, // capital = 8
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.marcaScore, 9)
  assert.equal(r.negocioScore, 3)
  assert.equal(r.capitalScore, 8)
  assert.equal(r.resultado, 'negocio')
  assert.equal(r.contenido.programaSlug, 'negocios-regenerativos')
})

test('calcularResultado: tie between negocio and capital breaks toward negocio', () => {
  const respuestas = {
    m1: 3, m2: 3, m3: 3, // marca = 9
    n1: 1, n2: 1, n3: 1, // negocio = 3
    c1: 1, c2: 1, c3: 1, // capital = 3 (tied with negocio)
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.negocioScore, 3)
  assert.equal(r.capitalScore, 3)
  assert.equal(r.resultado, 'negocio')
})

test('calcularResultado: secundario capital appears when capitalScore <= 3 and capital is not primary', () => {
  const respuestas = {
    m1: 0, m2: 0, m3: 0, // marca = 0 (lowest, primary)
    n1: 3, n2: 3, n3: 3, // negocio = 9
    c1: 1, c2: 1, c3: 1, // capital = 3 (<=3, triggers secundario)
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.resultado, 'marca')
  assert.equal(r.secundario, 'capital')
  assert.equal(r.contenidoSecundario.programaSlug, 'capital-de-impacto')
})

test('calcularResultado: no secundario when capitalScore is above the threshold', () => {
  const respuestas = {
    m1: 0, m2: 0, m3: 0, // marca = 0 (primary)
    n1: 3, n2: 3, n3: 3,
    c1: 2, c2: 1, c3: 1, // capital = 4 (above the <=3 threshold)
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.resultado, 'marca')
  assert.equal(r.secundario, null)
  assert.equal(r.contenidoSecundario, null)
})

test('calcularResultado: no secundario when capital is already the primary result', () => {
  const respuestas = {
    m1: 3, m2: 3, m3: 3,
    n1: 3, n2: 3, n3: 3,
    c1: 0, c2: 0, c3: 0, // capital = 0, both primary AND under the threshold
  }
  const r = calcularResultado(respuestas, 'general')
  assert.equal(r.resultado, 'capital')
  assert.equal(r.secundario, null)
})

test('calcularResultado: dimension percentages and lecturas match the score tercios', () => {
  const respuestas = {
    m1: 3, m2: 0, m3: 0, // marca = 3 -> brecha real, 33%
    n1: 2, n2: 2, n3: 2, // negocio = 6 -> en desarrollo, 67%
    c1: 3, c2: 3, c3: 3, // capital = 9 -> solido, 100%
  }
  const r = calcularResultado(respuestas, 'general')
  assert.deepEqual(r.dimensiones, [
    { nombre: 'Marca', porcentaje: 33, lectura: 'Tu marca aún no comunica lo que te hace distinto.' },
    { nombre: 'Negocio', porcentaje: 67, lectura: 'Tienes estructura básica — falta consolidarla.' },
    { nombre: 'Capital', porcentaje: 100, lectura: 'Tu preparación para levantar capital ya es competitiva.' },
  ])
})

test('calcularResultado: a missing answer counts as 0, never crashes', () => {
  const r = calcularResultado({ m1: 3 }, 'general')
  assert.equal(r.marcaScore, 3)
  assert.equal(r.negocioScore, 0)
  assert.equal(r.capitalScore, 0)
})
```

- [ ] **Step 3: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests in `test/diagnosticoEmpresas.test.js` PASS (11 tests),
plus the pre-existing 53 tests from subsistemas 3-4a still pass (64
total). This is written test-after rather than test-first because the
question bank and result content **are** the spec's §4/§5/§6 content —
the tests assert the exact classification/threshold rules the spec
already fixed. If any assertion fails, fix
`src/data/diagnosticoEmpresas.js`, not the test.

- [ ] **Step 4: Commit**

```bash
git add src/data/diagnosticoEmpresas.js test/diagnosticoEmpresas.test.js
git commit -m "feat(diagnostico): add Empresas question bank, scoring and result content"
```

---

### Task 2: Genericize `PantallaBienvenida.jsx` and `PantallaTransicion.jsx`

**Files:**
- Modify: `src/components/diagnostico/PantallaBienvenida.jsx`
- Modify: `src/components/diagnostico/PantallaTransicion.jsx`
- Modify: `src/pages/DiagnosticoProfesionalesPage.jsx`

**Interfaces:**
- Produces: `PantallaBienvenida({ eyebrow, titulo, descripcion, meta, ctaTexto, onStart })` (all required — no defaults, so a caller can never silently render the wrong diagnostic's copy). `PantallaTransicion({ mensajes, onComplete })` (`mensajes`: array of strings, required).

Both components currently hardcode Diagnóstico Profesionales' exact
copy — built that way in subsistema 4a, before a second diagnostic
existed to reuse them. Task 4 needs its own welcome/transition copy for
Empresas; genericizing via props (instead of duplicating both
components) keeps the two diagnostics' UI code DRY. This task changes
**zero** visible behavior for the already-shipped
`/diagnostico/profesionales` — it only moves its hardcoded strings from
inside the components to the call site that already renders them.

- [ ] **Step 1: Genericize `PantallaBienvenida.jsx`**

Find the full current file:

```jsx
export default function PantallaBienvenida({ onStart }) {
  return (
    <div className="fro-wrap" style={{ maxWidth: 640, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>
        AUTODIAGNÓSTICO GRATUITO · IA PARA PROFESIONALES
      </div>
      <h1 className="fro-h2" style={{ marginBottom: '1.4rem' }}>
        ¿Qué tan preparado estás frente a la disrupción de la IA?
      </h1>
      <p className="fro-lead" style={{ marginBottom: '2.2rem' }}>
        No medimos si usas IA o no. Medimos si la estás usando para
        desarrollar criterio propio, o para dejar que piense por ti.
      </p>
      <p className="fro-sm" style={{ marginBottom: '2.4rem', color: 'var(--fro-text-2)' }}>
        8 preguntas · 3 minutos · Resultado inmediato con análisis por dimensión.
        <br />
        Tu email se pide antes del resultado, no antes de empezar.
      </p>
      <button type="button" onClick={onStart} className="fro-btn fro-btn-amber fro-btn-lg">
        Iniciar diagnóstico <span aria-hidden>→</span>
      </button>
    </div>
  )
}
```

Replace with:

```jsx
export default function PantallaBienvenida({ eyebrow, titulo, descripcion, meta, ctaTexto, onStart }) {
  return (
    <div className="fro-wrap" style={{ maxWidth: 640, margin: '0 auto', padding: '6rem 2rem', textAlign: 'center' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>
        {eyebrow}
      </div>
      <h1 className="fro-h2" style={{ marginBottom: '1.4rem' }}>
        {titulo}
      </h1>
      <p className="fro-lead" style={{ marginBottom: '2.2rem' }}>
        {descripcion}
      </p>
      <p className="fro-sm" style={{ marginBottom: '2.4rem', color: 'var(--fro-text-2)' }}>
        {meta}
      </p>
      <button type="button" onClick={onStart} className="fro-btn fro-btn-amber fro-btn-lg">
        {ctaTexto} <span aria-hidden>→</span>
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Genericize `PantallaTransicion.jsx`**

Find the full current file:

```jsx
import { useEffect, useState } from 'react'

const MENSAJES = [
  'Evaluando tu criterio propio...',
  'Analizando tu relación con el aprendizaje...',
  'Calculando tu proyección de crecimiento...',
  'Generando tu resultado...',
]

export default function PantallaTransicion({ onComplete }) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const stepMs = 650
    const intervalo = setInterval(() => {
      setIndice(i => Math.min(i + 1, MENSAJES.length - 1))
    }, stepMs)

    const timeout = setTimeout(onComplete, MENSAJES.length * stepMs)

    return () => {
      clearInterval(intervalo)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ width: 220, height: 3, background: 'var(--fro-line)', borderRadius: 2, margin: '0 auto 1.4rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--fro-amber)', width: `${((indice + 1) / MENSAJES.length) * 100}%`, transition: 'width 0.3s var(--ease)' }} />
        </div>
        <p className="fro-sm" style={{ fontFamily: 'var(--fbc)', letterSpacing: '0.04em' }}>{MENSAJES[indice]}</p>
      </div>
    </div>
  )
}
```

Replace with:

```jsx
import { useEffect, useState } from 'react'

export default function PantallaTransicion({ mensajes, onComplete }) {
  const [indice, setIndice] = useState(0)

  useEffect(() => {
    const stepMs = 650
    const intervalo = setInterval(() => {
      setIndice(i => Math.min(i + 1, mensajes.length - 1))
    }, stepMs)

    const timeout = setTimeout(onComplete, mensajes.length * stepMs)

    return () => {
      clearInterval(intervalo)
      clearTimeout(timeout)
    }
  }, [mensajes, onComplete])

  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ width: 220, height: 3, background: 'var(--fro-line)', borderRadius: 2, margin: '0 auto 1.4rem', overflow: 'hidden' }}>
          <div style={{ height: '100%', background: 'var(--fro-amber)', width: `${((indice + 1) / mensajes.length) * 100}%`, transition: 'width 0.3s var(--ease)' }} />
        </div>
        <p className="fro-sm" style={{ fontFamily: 'var(--fbc)', letterSpacing: '0.04em' }}>{mensajes[indice]}</p>
      </div>
    </div>
  )
}
```

Note the `useEffect` dependency array gained `mensajes` — this only
stays harmless if every call site passes a referentially stable array
(a module-level constant, not an inline literal recreated on every
render). Step 3 below hoists one for Profesionales; Task 4 does the same
for Empresas. **Do not** pass `mensajes={[...]}` as an inline array
literal directly in JSX — an early version of this task did exactly
that, and the final whole-branch review caught it as a real,
triggerable regression: it reintroduces the same timer-reset bug the
`onComplete` `useCallback` fix (below) was written to prevent, since a
new array reference on every re-render retriggers the effect.

- [ ] **Step 3: Update `DiagnosticoProfesionalesPage.jsx`'s call sites to pass the now-required props**

In `src/pages/DiagnosticoProfesionalesPage.jsx`, find:

```jsx
        {fase === FASES.BIENVENIDA && <PantallaBienvenida onStart={handleStart} />}
```

Replace with:

```jsx
        {fase === FASES.BIENVENIDA && (
          <PantallaBienvenida
            eyebrow="AUTODIAGNÓSTICO GRATUITO · IA PARA PROFESIONALES"
            titulo="¿Qué tan preparado estás frente a la disrupción de la IA?"
            descripcion="No medimos si usas IA o no. Medimos si la estás usando para desarrollar criterio propio, o para dejar que piense por ti."
            meta={
              <>
                8 preguntas · 3 minutos · Resultado inmediato con análisis por dimensión.
                <br />
                Tu email se pide antes del resultado, no antes de empezar.
              </>
            }
            ctaTexto="Iniciar diagnóstico"
            onStart={handleStart}
          />
        )}
```

Find, near the top of the file, right after the `FASES` constant:

```jsx
const FASES = {
  BIENVENIDA: 'bienvenida',
  SEGMENTACION: 'segmentacion',
  PREGUNTAS: 'preguntas',
  CAPTURA: 'captura',
  TRANSICION: 'transicion',
  RESULTADO: 'resultado',
}
```

Add a module-level constant directly after it (sibling to `FASES`, not
inside the component — this is what gives it a stable reference across
every re-render):

```jsx
// Constante de módulo — referencia estable entre renders. PantallaTransicion
// depende de `mensajes` en su useEffect; un array literal inline en el JSX
// de abajo se recrearía en cada re-render (ej. cuando `percentil` resuelve
// en paralelo durante la transición, ver handleCaptura) y reiniciaría el
// temporizador de 2.6s — el mismo bug que ya se corrigió una vez para
// `onComplete` con useCallback, reintroducido por esta prop si no se hace
// igual de estable.
const MENSAJES_TRANSICION = [
  'Evaluando tu criterio propio...',
  'Analizando tu relación con el aprendizaje...',
  'Calculando tu proyección de crecimiento...',
  'Generando tu resultado...',
]
```

Then find:

```jsx
        {fase === FASES.TRANSICION && <PantallaTransicion onComplete={handleTransicionComplete} />}
```

Replace with:

```jsx
        {fase === FASES.TRANSICION && (
          <PantallaTransicion
            mensajes={MENSAJES_TRANSICION}
            onComplete={handleTransicionComplete}
          />
        )}
```

- [ ] **Step 4: Run the build to verify nothing broke**

Run: `npm run build`

Expected: succeeds, same chunks as before, no new warnings.

- [ ] **Step 5: Manual regression check on `/diagnostico/profesionales`**

Using the local dev server, visit `/diagnostico/profesionales` and
confirm the welcome screen and (after completing the quiz) the
transition screen render **exactly the same text** as before this task —
this is a pure refactor, the rendered output must be byte-identical.

- [ ] **Step 6: Commit**

```bash
git add src/components/diagnostico/PantallaBienvenida.jsx src/components/diagnostico/PantallaTransicion.jsx src/pages/DiagnosticoProfesionalesPage.jsx
git commit -m "refactor(diagnostico): genericize PantallaBienvenida/PantallaTransicion via props"
```

---

### Task 3: Update `/api/lead`'s diagnóstico-empresas schema

**Files:**
- Modify: `api/_lib/lead-notify.js`
- Modify: `test/lead-notify.test.js`

**Interfaces:**
- Consumes: nothing new from Tasks 1-2 (backend-only task).
- Modifies: `buildEnvelope('bbs-diagnostico-empresas', data)`'s return
  shape — `data` now expects `{ nombre, email, whatsapp, sector,
  marcaScore, negocioScore, capitalScore, scoreTotal, scoreMax,
  resultado, secundario, pagina_origen }` instead of the old placeholder
  `{ nombre, email, whatsapp, resultado, pagina_origen }`.

- [ ] **Step 1: Replace the `bbs-diagnostico-empresas` case in `buildEnvelope`**

In `api/_lib/lead-notify.js`, find this exact block:

```js
    case 'bbs-diagnostico-empresas':
      return {
        emailSubject: `Diagnóstico Empresas — ${data.nombre || 'sin nombre'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Resultado', data.resultado],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Empresas',
        sheetRow: [
          ts,
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          data.resultado || '',
          data.pagina_origen || '',
        ],
      }
```

Replace with:

```js
    case 'bbs-diagnostico-empresas': {
      const {
        sector, marcaScore, negocioScore, capitalScore, scoreTotal, scoreMax, resultado, secundario,
      } = sanitizeDiagnosticoEmpresasResult(data)
      return {
        emailSubject: `Diagnóstico Empresas — ${data.nombre || 'sin nombre'} — ${resultado || 'sin resultado'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Sector', sector],
          ['Marca', marcaScore],
          ['Negocio', negocioScore],
          ['Capital', capitalScore],
          ['Score total', `${scoreTotal}/${scoreMax}`],
          ['Resultado', resultado],
          ['Secundario', secundario],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Empresas',
        sheetRow: [
          ts,
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          sector,
          marcaScore,
          negocioScore,
          capitalScore,
          scoreTotal,
          scoreMax,
          resultado,
          secundario,
          data.pagina_origen || '',
        ],
      }
    }
```

- [ ] **Step 2: Add `sanitizeDiagnosticoEmpresasResult`**

In `api/_lib/lead-notify.js`, find the existing `sanitizeDiagnosticoResult`
function (used by the `bbs-diagnostico-profesionales` case) and add this
new function directly after it, before `buildEnvelope`:

```js
const DIMENSION_SCORE_MAX_EMPRESAS = 9
const SECTOR_VALUES = ['general', 'industria']
const RESULTADO_VALUES_EMPRESAS = ['marca', 'negocio', 'capital', 'industria']
const SECUNDARIO_VALUES = ['capital', '']

function sanitizeDimensionScore(score) {
  const n = Number(score)
  return Number.isInteger(n) && n >= 0 && n <= DIMENSION_SCORE_MAX_EMPRESAS ? n : null
}

function sanitizeDiagnosticoEmpresasResult(data) {
  const sector = SECTOR_VALUES.includes(data.sector) ? data.sector : ''

  const marcaScore = sanitizeDimensionScore(data.marcaScore)
  const negocioScore = sanitizeDimensionScore(data.negocioScore)
  const capitalScore = sanitizeDimensionScore(data.capitalScore)
  const dimensionesValidas = marcaScore !== null && negocioScore !== null && capitalScore !== null

  const scoreTotalNum = Number(data.scoreTotal)
  const scoreTotalValido = dimensionesValidas && scoreTotalNum === marcaScore + negocioScore + capitalScore

  const resultado = RESULTADO_VALUES_EMPRESAS.includes(data.resultado) ? data.resultado : ''
  const secundario = SECUNDARIO_VALUES.includes(data.secundario) ? data.secundario : ''

  return {
    sector,
    marcaScore: dimensionesValidas ? marcaScore : '',
    negocioScore: dimensionesValidas ? negocioScore : '',
    capitalScore: dimensionesValidas ? capitalScore : '',
    scoreTotal: scoreTotalValido ? scoreTotalNum : '',
    scoreMax: scoreTotalValido ? 27 : '',
    resultado,
    secundario,
  }
}
```

- [ ] **Step 3: Write the tests**

In `test/lead-notify.test.js`, find the existing test
`'buildEnvelope: bbs-diagnostico-empresas'` and replace it (it currently
tests the old placeholder schema):

```js
test('buildEnvelope: bbs-diagnostico-empresas', () => {
  const env = buildEnvelope('bbs-diagnostico-empresas', {
    nombre: 'Rosa',
    email: 'rosa@example.com',
    whatsapp: '+51988777666',
    sector: 'general',
    marcaScore: 3,
    negocioScore: 7,
    capitalScore: 2,
    scoreTotal: 12,
    scoreMax: 27,
    resultado: 'capital',
    secundario: '',
    pagina_origen: '/diagnostico/empresas',
  })
  assert.equal(env.emailSubject, 'Diagnóstico Empresas — Rosa — capital')
  assert.equal(env.sheetTab, 'Diagnóstico Empresas')
  assert.deepEqual(env.sheetRow.slice(1), [
    'Rosa',
    'rosa@example.com',
    '+51988777666',
    'general',
    3,
    7,
    2,
    12,
    27,
    'capital',
    '',
    '/diagnostico/empresas',
  ])
})

test('buildEnvelope: bbs-diagnostico-empresas rejects an unknown sector', () => {
  const env = buildEnvelope('bbs-diagnostico-empresas', {
    nombre: 'Rosa',
    sector: 'no-es-un-sector-real',
    marcaScore: 3,
    negocioScore: 3,
    capitalScore: 3,
    scoreTotal: 9,
    resultado: 'marca',
    pagina_origen: '/diagnostico/empresas',
  })
  // índices de sheetRow: ts(0) nombre(1) email(2) whatsapp(3) sector(4)
  // marcaScore(5) negocioScore(6) capitalScore(7) scoreTotal(8) scoreMax(9) resultado(10) secundario(11) pagina_origen(12)
  assert.equal(env.sheetRow[4], '')
})

test('buildEnvelope: bbs-diagnostico-empresas rejects a dimension score outside 0-9', () => {
  const env = buildEnvelope('bbs-diagnostico-empresas', {
    nombre: 'Rosa',
    sector: 'general',
    marcaScore: 99,
    negocioScore: 3,
    capitalScore: 3,
    scoreTotal: 105,
    resultado: 'marca',
    pagina_origen: '/diagnostico/empresas',
  })
  // sector sigue siendo válido de forma independiente — solo los scores se descartan
  assert.equal(env.sheetRow[4], 'general')
  assert.equal(env.sheetRow[5], '')
  assert.equal(env.sheetRow[6], '')
  assert.equal(env.sheetRow[7], '')
  assert.equal(env.sheetRow[8], '')
  assert.equal(env.sheetRow[9], '')
})

test('buildEnvelope: bbs-diagnostico-empresas rejects a scoreTotal that does not match the sum of the 3 dimensions', () => {
  const env = buildEnvelope('bbs-diagnostico-empresas', {
    nombre: 'Rosa',
    sector: 'general',
    marcaScore: 3,
    negocioScore: 3,
    capitalScore: 3,
    scoreTotal: 999, // no es 3+3+3=9 — payload inconsistente
    resultado: 'marca',
    pagina_origen: '/diagnostico/empresas',
  })
  assert.equal(env.sheetRow[5], 3)
  assert.equal(env.sheetRow[6], 3)
  assert.equal(env.sheetRow[7], 3)
  assert.equal(env.sheetRow[8], '') // scoreTotal descartado
  assert.equal(env.sheetRow[9], '') // scoreMax también, ya que dependía de scoreTotal
})

test('buildEnvelope: bbs-diagnostico-empresas rejects an unknown resultado', () => {
  const env = buildEnvelope('bbs-diagnostico-empresas', {
    nombre: 'Rosa',
    sector: 'general',
    marcaScore: 3,
    negocioScore: 3,
    capitalScore: 3,
    scoreTotal: 9,
    resultado: 'no-es-un-resultado-real',
    pagina_origen: '/diagnostico/empresas',
  })
  assert.equal(env.sheetRow[10], '')
})
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests pass. `test/lead-notify.test.js` gains 4 tests (1
replaced in place + 4 new = net +4). Running total from the pre-existing
64 (see Task 1): `64 + 4 = 68`.

- [ ] **Step 5: Commit**

```bash
git add api/_lib/lead-notify.js test/lead-notify.test.js
git commit -m "feat(api): update diagnóstico-empresas schema in /api/lead"
```

---

### Task 4: Quiz UI — result screen, page, route

**Files:**
- Create: `src/components/diagnostico/PantallaResultadoEmpresas.jsx`
- Create: `src/pages/DiagnosticoEmpresasPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/lib/utm.js`
- Modify: `public/sitemap.xml`

**Interfaces:**
- Consumes: `QUESTIONS`, `SECTOR_QUESTION`, `calcularResultado` from
  `src/data/diagnosticoEmpresas.js` (Task 1). Consumes the now-generic
  `PantallaBienvenida({ eyebrow, titulo, descripcion, meta, ctaTexto,
  onStart })` and `PantallaTransicion({ mensajes, onComplete })` (Task
  2). Reuses `PreguntaScreen.jsx` and `CapturaDatos.jsx` unchanged (both
  already generic — confirmed no diagnostic-specific text in either).
  Calls `POST /api/lead` at runtime (Task 3) — not imported.

This repo has no component test framework — verification is `npm run
build` + manual browser walkthrough, matching Tasks 4 and 5 of 4a.

- [ ] **Step 1: Add the UTM campaign**

In `src/lib/utm.js`, find:

```js
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL:          'playbook_digital',
  PLAYBOOK_IMPRESO:          'playbook_impreso',
  COMMUNITY:                 'community_whatsapp',
  PROGRAMA_WHATSAPP:         'programa_whatsapp',
  DIAGNOSTICO_PROFESIONALES: 'diagnostico_profesionales',
}
```

Replace with:

```js
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL:          'playbook_digital',
  PLAYBOOK_IMPRESO:          'playbook_impreso',
  COMMUNITY:                 'community_whatsapp',
  PROGRAMA_WHATSAPP:         'programa_whatsapp',
  DIAGNOSTICO_PROFESIONALES: 'diagnostico_profesionales',
  DIAGNOSTICO_EMPRESAS:      'diagnostico_empresas',
}
```

- [ ] **Step 2: Write `src/components/diagnostico/PantallaResultadoEmpresas.jsx`**

```jsx
import { trackCta } from '../../lib/analytics.js'
import { PROGRAMAS } from '../../data/programas.js'

export default function PantallaResultadoEmpresas({ resultado }) {
  const { scoreTotal, scoreMax, dimensiones, contenido, contenidoSecundario } = resultado
  const programa = PROGRAMAS.find(p => p.slug === contenido.programaSlug)
  const programaSecundario = contenidoSecundario
    ? PROGRAMAS.find(p => p.slug === contenidoSecundario.programaSlug)
    : null

  return (
    <div className="fro-wrap" style={{ maxWidth: 680, margin: '0 auto', padding: '5rem 2rem' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '0.8rem' }}>Tu resultado</div>
      <h2 className="fro-h2" style={{ marginBottom: '0.6rem' }}>{contenido.nombre}</h2>
      <p className="fro-sm" style={{ marginBottom: '1.8rem', color: 'var(--fro-text-2)' }}>
        {scoreTotal} / {scoreMax} puntos en preparación regenerativa general
      </p>

      <h3 className="fro-h3" style={{ fontSize: '1rem', marginBottom: '0.8rem' }}>Análisis por dimensión</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.2rem' }}>
        {dimensiones.map(d => (
          <div key={d.nombre}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
              <span>{d.nombre}</span>
              <span>{d.porcentaje}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--fro-line)', borderRadius: 3, overflow: 'hidden', marginBottom: '0.4rem' }}>
              <div style={{ height: '100%', width: `${d.porcentaje}%`, background: 'var(--fro-amber)' }} />
            </div>
            <p className="fro-sm" style={{ color: 'var(--fro-text-2)' }}>{d.lectura}</p>
          </div>
        ))}
      </div>

      <p className="fro-body" style={{ marginBottom: '1.8rem' }}>{contenido.diagnostico}</p>

      <h3 className="fro-h3" style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>Fortalezas</h3>
      <ul className="fro-feat" style={{ marginBottom: '1.6rem' }}>
        {contenido.fortalezas.map(f => <li key={f}>{f}</li>)}
      </ul>

      <h3 className="fro-h3" style={{ fontSize: '1rem', marginBottom: '0.6rem' }}>Oportunidad</h3>
      <ul className="fro-feat" style={{ marginBottom: '1.6rem' }}>
        {contenido.oportunidad.map(o => <li key={o}>{o}</li>)}
      </ul>

      <p className="fro-body" style={{ marginBottom: '2.2rem', fontWeight: 600 }}>{contenido.recomendacion}</p>

      {programa && (
        <a
          href={`/programas/${programa.slug}`}
          onClick={() => trackCta(`diagnostico_resultado_${programa.slug}`, 'diagnostico_empresas', `/programas/${programa.slug}`)}
          className="fro-btn fro-btn-amber fro-btn-lg"
        >
          {programa.titulo} — {contenido.programaCtaNota} <span aria-hidden>→</span>
        </a>
      )}

      {programaSecundario && (
        <p className="fro-sm" style={{ marginTop: '1.4rem', color: 'var(--fro-text-2)' }}>
          Ojo: además de esto, tu preparación para levantar capital también está baja —{' '}
          <a
            href={`/programas/${programaSecundario.slug}`}
            onClick={() => trackCta(`diagnostico_resultado_secundario_${programaSecundario.slug}`, 'diagnostico_empresas', `/programas/${programaSecundario.slug}`)}
            style={{ color: 'var(--fro-amber)', textDecoration: 'underline' }}
          >
            {programaSecundario.titulo}
          </a>{' '}
          podría ser tu segundo paso.
        </p>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Write `src/pages/DiagnosticoEmpresasPage.jsx`**

```jsx
import { useState, useCallback, useEffect } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PantallaBienvenida from '../components/diagnostico/PantallaBienvenida.jsx'
import PreguntaScreen from '../components/diagnostico/PreguntaScreen.jsx'
import CapturaDatos from '../components/diagnostico/CapturaDatos.jsx'
import PantallaTransicion from '../components/diagnostico/PantallaTransicion.jsx'
import PantallaResultadoEmpresas from '../components/diagnostico/PantallaResultadoEmpresas.jsx'
import { trackCta, trackForm } from '../lib/analytics.js'
import { QUESTIONS, SECTOR_QUESTION, calcularResultado } from '../data/diagnosticoEmpresas.js'

const FASES = {
  BIENVENIDA: 'bienvenida',
  PREGUNTAS: 'preguntas',
  CAPTURA: 'captura',
  TRANSICION: 'transicion',
  RESULTADO: 'resultado',
}

// Las 10 pantallas de pregunta en un orden fijo, sin bifurcación: las 9
// puntuadas (Marca, Negocio, Capital) y la de sector al final.
const TODAS_LAS_PREGUNTAS = [...QUESTIONS, SECTOR_QUESTION]

// Constante de módulo — referencia estable entre renders. PantallaTransicion
// depende de `mensajes` en su useEffect; un array literal inline en el JSX
// de abajo se recrearía en cada re-render y reiniciaría el temporizador de
// 2.6s (mismo bug ya corregido una vez en DiagnosticoProfesionalesPage.jsx —
// ver su commit "fix(diagnostico): stabilize the mensajes array reference").
const MENSAJES_TRANSICION = [
  'Evaluando tu marca...',
  'Analizando tu modelo de negocio...',
  'Revisando tu preparación para capital...',
  'Generando tu resultado...',
]

export default function DiagnosticoEmpresasPage() {
  const [fase, setFase] = useState(FASES.BIENVENIDA)
  const [respuestas, setRespuestas] = useState({})
  const [sector, setSector] = useState(null)
  const [preguntaIndex, setPreguntaIndex] = useState(0)
  const [resultado, setResultado] = useState(null)

  useEffect(() => {
    const pageUrl = 'https://biobusinessschool.org/diagnostico/empresas'
    const pageTitle = 'Autodiagnóstico: ¿en qué momento está tu negocio? | Bio Business School'
    const pageDesc = 'Evalúa en 4 minutos en qué momento está tu negocio — de la marca al capital — y qué programa de Bio Business School te ayuda a avanzar.'

    document.title = pageTitle

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : null
    if (metaDesc) metaDesc.setAttribute('content', pageDesc)

    const canonicalLink = document.querySelector('link[rel="canonical"]')
    const prevCanonical = canonicalLink ? canonicalLink.getAttribute('href') : null
    if (canonicalLink) canonicalLink.setAttribute('href', pageUrl)

    const ogUrl = document.querySelector('meta[property="og:url"]')
    const prevOgUrl = ogUrl ? ogUrl.getAttribute('content') : null
    if (ogUrl) ogUrl.setAttribute('content', pageUrl)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const prevOgTitle = ogTitle ? ogTitle.getAttribute('content') : null
    if (ogTitle) ogTitle.setAttribute('content', pageTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    const prevOgDesc = ogDesc ? ogDesc.getAttribute('content') : null
    if (ogDesc) ogDesc.setAttribute('content', pageDesc)

    window.scrollTo(0, 0)

    return () => {
      document.title = 'Bio Business School'
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
      if (canonicalLink && prevCanonical) canonicalLink.setAttribute('href', prevCanonical)
      if (ogUrl && prevOgUrl) ogUrl.setAttribute('content', prevOgUrl)
      if (ogTitle && prevOgTitle) ogTitle.setAttribute('content', prevOgTitle)
      if (ogDesc && prevOgDesc) ogDesc.setAttribute('content', prevOgDesc)
    }
  }, [])

  function handleStart() {
    trackCta('diagnostico_empresas_iniciar', 'diagnostico_empresas', '/diagnostico/empresas')
    setFase(FASES.PREGUNTAS)
  }

  function handleAnswer(pregunta, valor) {
    if (pregunta.id === SECTOR_QUESTION.id) {
      // La pregunta de sector no puntúa — `valor` aquí es directamente
      // el sector ('general'|'industria'), ver el mapeo de opciones más abajo.
      setSector(valor)
    } else {
      setRespuestas(r => ({ ...r, [pregunta.id]: valor }))
    }

    if (preguntaIndex + 1 < TODAS_LAS_PREGUNTAS.length) {
      setPreguntaIndex(preguntaIndex + 1)
    } else {
      setFase(FASES.CAPTURA)
    }
  }

  function handleCaptura(datosContacto) {
    trackForm('bbs-diagnostico-empresas', 'submit')
    const calculado = calcularResultado(respuestas, sector)
    setResultado(calculado)
    setFase(FASES.TRANSICION)

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: 'bbs-diagnostico-empresas',
        data: {
          nombre: datosContacto.nombre,
          email: datosContacto.email,
          whatsapp: datosContacto.whatsapp,
          sector: calculado.sector,
          marcaScore: calculado.marcaScore,
          negocioScore: calculado.negocioScore,
          capitalScore: calculado.capitalScore,
          scoreTotal: calculado.scoreTotal,
          scoreMax: calculado.scoreMax,
          resultado: calculado.resultado,
          secundario: calculado.secundario || '',
          pagina_origen: window.location.pathname,
        },
      }),
    })
      .then(res => {
        trackForm('bbs-diagnostico-empresas', res.ok ? 'success' : 'error')
      })
      .catch(() => {
        trackForm('bbs-diagnostico-empresas', 'error')
      })
  }

  const handleTransicionComplete = useCallback(() => {
    setFase(FASES.RESULTADO)
  }, [])

  const preguntaActual = TODAS_LAS_PREGUNTAS[preguntaIndex]
  const esPreguntaDeSector = preguntaActual && preguntaActual.id === SECTOR_QUESTION.id

  return (
    <>
      <Nav />
      <main id="main" style={{ minHeight: '70vh' }}>
        {fase === FASES.BIENVENIDA && (
          <PantallaBienvenida
            eyebrow="AUTODIAGNÓSTICO GRATUITO · EMPRESAS DE IMPACTO"
            titulo="¿En qué momento está tu negocio — de la marca al capital?"
            descripcion="No medimos si tienes buena intención regenerativa. Medimos si esa intención ya se tradujo en marca, modelo de negocio y capital, o dónde se está quedando."
            meta={
              <>
                10 preguntas · 4 minutos · Resultado inmediato con análisis por dimensión.
                <br />
                Tu email se pide antes del resultado, no antes de empezar.
              </>
            }
            ctaTexto="Evaluar mi momento"
            onStart={handleStart}
          />
        )}

        {fase === FASES.PREGUNTAS && preguntaActual && (
          <PreguntaScreen
            pregunta={
              esPreguntaDeSector
                ? { pregunta: preguntaActual.pregunta, opciones: preguntaActual.opciones.map(o => ({ texto: o.texto, valor: o.sector })) }
                : preguntaActual
            }
            numero={preguntaIndex + 1}
            total={TODAS_LAS_PREGUNTAS.length}
            onAnswer={valor => handleAnswer(preguntaActual, valor)}
          />
        )}

        {fase === FASES.CAPTURA && <CapturaDatos onSubmit={handleCaptura} />}

        {fase === FASES.TRANSICION && (
          <PantallaTransicion
            mensajes={MENSAJES_TRANSICION}
            onComplete={handleTransicionComplete}
          />
        )}

        {fase === FASES.RESULTADO && resultado && (
          <PantallaResultadoEmpresas resultado={resultado} />
        )}
      </main>
      <Footer />
    </>
  )
}
```

Note: unlike `DiagnosticoProfesionalesPage.jsx` (which has a dedicated
`FASES.SEGMENTACION` phase before branching), this page has a single
`FASES.PREGUNTAS` phase walking through all 10 questions in
`TODAS_LAS_PREGUNTAS` — the sector question is simply the last one in
that fixed array, distinguished inside `handleAnswer`/the render by
comparing `pregunta.id === SECTOR_QUESTION.id`.

- [ ] **Step 4: Add the route in `src/App.jsx`**

Find:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home.jsx'

const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const ProgramaPage = lazy(() => import('./pages/ProgramaPage.jsx'))
const DiagnosticoProfesionalesPage = lazy(() => import('./pages/DiagnosticoProfesionalesPage.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh' }}/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/programas/:slug" element={<ProgramaPage />} />
          <Route path="/diagnostico/profesionales" element={<DiagnosticoProfesionalesPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

Replace with:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home.jsx'

const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const ProgramaPage = lazy(() => import('./pages/ProgramaPage.jsx'))
const DiagnosticoProfesionalesPage = lazy(() => import('./pages/DiagnosticoProfesionalesPage.jsx'))
const DiagnosticoEmpresasPage = lazy(() => import('./pages/DiagnosticoEmpresasPage.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh' }}/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/programas/:slug" element={<ProgramaPage />} />
          <Route path="/diagnostico/profesionales" element={<DiagnosticoProfesionalesPage />} />
          <Route path="/diagnostico/empresas" element={<DiagnosticoEmpresasPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

- [ ] **Step 5: Add the sitemap entry**

In `public/sitemap.xml`, find:

```xml
  <url>
    <loc>https://biobusinessschool.org/diagnostico/profesionales</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

Replace with:

```xml
  <url>
    <loc>https://biobusinessschool.org/diagnostico/profesionales</loc>
    <lastmod>2026-09-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <url>
    <loc>https://biobusinessschool.org/diagnostico/empresas</loc>
    <lastmod>2026-09-02</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

</urlset>
```

- [ ] **Step 6: Run the build to verify nothing broke**

Run: `npm run build`

Expected: succeeds, emits a new `DiagnosticoEmpresasPage-*.js` lazy
chunk (same pattern as `DiagnosticoProfesionalesPage-*.js`), no new
warnings.

- [ ] **Step 7: Commit**

```bash
git add src/components/diagnostico/PantallaResultadoEmpresas.jsx src/pages/DiagnosticoEmpresasPage.jsx src/App.jsx src/lib/utm.js public/sitemap.xml
git commit -m "feat(diagnostico): build the Diagnóstico Empresas quiz UI and route"
```

---

### Task 5: Final wiring verification

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: nothing new — this task verifies Tasks 1-4 together.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: **68 tests pass, 0 fail**. Breakdown: 53 pre-existing
(subsistemas 3-4a: 10 in `test/lead.test.js`, 18 in
`test/lead-notify.test.js`, 14 in `test/diagnosticoProfesionales.test.js`,
11 in `test/diagnostico-stats.test.js`) + 11 new in
`test/diagnosticoEmpresas.test.js` (Task 1) + 4 net-new in
`test/lead-notify.test.js` (Task 3 replaces 1 existing test in place and
adds 4 — net +4, bringing that file to 22). Total: `53 + 11 + 4 = 68`.

- [ ] **Step 2: Run the build**

Run: `npm run build`

Expected: succeeds cleanly, both diagnostic page chunks present in the
output.

- [ ] **Step 3: Grep-verify the old placeholder `resultado`-only shape is gone**

Run: `grep -n "sheetTab: 'Diagnóstico Empresas'" -A 15 api/_lib/lead-notify.js`

Expected: the printed block shows `sector`, `marcaScore`, `negocioScore`,
`capitalScore`, `scoreTotal`, `scoreMax`, `secundario` in the `sheetRow`
array — confirms Task 3 actually replaced the old 5-field placeholder
schema and not just the email fields.

- [ ] **Step 4: Manual browser walkthrough**

Using a local dev server, visit `/diagnostico/empresas` and:

1. Complete the flow choosing **all-lowest** answers (option a) on
   every scored question, and the **first, general-sector** option on
   the sector question — confirm the result is "Marca eco-genérica"
   (tie-break priority — all 3 dimensions are 0), links to
   `/programas/marcas-regenerativas`, and shows a secondary note
   pointing to Capital de Impacto (since `capitalScore = 0 <= 3` and
   `resultado !== 'capital'`).
2. Complete it again choosing **all-highest** answers (option d) and
   general sector — confirm the result is "Marca eco-genérica" again
   (tie-break priority, all 3 dimensions tied at 9 — same tie-break
   rule applies at the top of the range too) and **no** secondary note
   (`capitalScore = 9`, well above the threshold).
3. Complete it choosing low answers only on the 3 Capital questions
   (option a) and high answers (option d) on Marca/Negocio, general
   sector — confirm the result is "Buen proyecto, capital que no llega"
   and **no** secondary note (capital is already the primary result).
4. Complete it choosing the **industrial** sector option — confirm the
   result is "Operaciones ineficientes y lineales" regardless of the
   other answers, links to `/programas/economia-circular-industria`.
5. On any completed run, check the Network tab: confirm `POST
   /api/lead` fires with `form: 'bbs-diagnostico-empresas'` and the
   full `data` object from the plan's Global Constraints. Confirm
   **no** request to `/api/diagnostico-stats` fires anywhere in this
   flow (this diagnostic has no percentile).
6. Confirm mobile viewport (375px): question buttons, dimension bars,
   and the secondary-result note (when present) all render without
   horizontal overflow.
7. Re-verify `/diagnostico/profesionales` still works end-to-end after
   Task 2's refactor (welcome screen, transition screen, and a full run
   through either branch) — this is the regression check for Task 2's
   changes to shared components, now exercised with real user flow
   rather than just a visual read of the welcome/transition screens.

- [ ] **Step 5: Note for Eddie — the Sheet's "Diagnóstico Empresas" header row**

Not a code step — flag it in the task report. That tab's header row
currently reads the old placeholder (`nombre, email, whatsapp,
resultado, pagina_origen`) from subsistema 3. It needs to become
`timestamp, nombre, email, whatsapp, sector, marcaScore, negocioScore,
capitalScore, scoreTotal, scoreMax, resultado, secundario,
pagina_origen` to match what this code now writes. Same situation as
4a's Task 5 — this requires editing the live Google Sheet directly, out
of scope for an implementer subagent; the controller does this itself
before/alongside deploy.

- [ ] **Step 6: Commit** (only if any fix was needed during
  verification; otherwise this task produces no commit of its own —
  record the fully clean verification in the task report)
