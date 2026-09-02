# Diagnóstico Profesionales Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build `/diagnostico/profesionales` — a self-contained React quiz
widget (welcome → segmentation → branch-specific questions → contact
capture → transition → enriched result) that writes leads to the existing
`/api/lead` endpoint and shows a real, non-fabricated percentile via a new
read-only `/api/diagnostico-stats` endpoint.

**Architecture:** Pure data/logic (questions, scoring, result content,
classification) lives in one data module, fully unit-testable without a
browser. Presentational screen components stay dumb (props in, callbacks
out); one page component owns the flow state and the two API calls. The
percentile endpoint reuses the existing Google Sheets JWT client from the
subsystem 3 backend — no new credentials, no new Google Cloud permissions.

**Tech Stack:** React (existing Vite SPA, no new dependency), Vercel
serverless function (plain JS, ESM, ohm — matches `api/lead.js`), Node's
built-in `node:test` runner (matches subsystem 3's test setup, `npm test`
already runs `test/**/*.test.js`).

## Global Constraints

- Segmentation question (Q0) does not score — it only picks the branch (`junior` if < 5 years experience, `senior` if ≥ 5 years).
- Junior branch: exactly 7 questions (`j1`–`j7`), each option worth 0–3, score range 0–21.
- Senior branch: exactly 8 questions (`s1`–`s8`), each option worth 0–3, score range 0–24.
- Junior tiers: 0–6 "Techo de cristal activo", 7–14 "En construcción", 15–21 "Liderando el cambio".
- Senior tiers: 0–8 "Experiencia en riesgo de invisibilidad", 9–16 "Multiplicando, pero no del todo", 17–24 "Liderando la multiplicación".
- Junior dimensions: Criterio propio (j1,j2,j3 / max 9), Aprendizaje activo (j4 / max 3), Proyección de crecimiento (j5,j6,j7 / max 9).
- Senior dimensions: Amplificación de criterio (s1,s2 / max 6), Sistematización y mentoría (s3,s6 / max 6), Posicionamiento y visibilidad (s4,s5 / max 6), Proyección de independencia (s7,s8 / max 6).
- Junior routes to program slug `ia-nuevos-profesionales`; senior routes to `ia-profesionales-senior` (from `src/data/programas.js`) — always, regardless of tier.
- `/api/lead` payload: `{ form: 'bbs-diagnostico-profesionales', data: { nombre, email, whatsapp, segmento, score, scoreMax, nivel, pagina_origen } }`.
- Sheet column order for the "Diagnóstico Profesionales" tab: `timestamp, nombre, email, whatsapp, segmento, score, scoreMax, nivel, pagina_origen` (segmento at index 4, score at index 5 — 0-based, after the timestamp column the append always prepends).
- `/api/diagnostico-stats` never returns a hard error and never fabricates a percentile — below 20 saved responses for that `tipo`+`segmento` combination, it returns `{ insufficientData: true, muestraTotal: N }` instead of a number.
- No email nurture sequences, no `/diagnostico/empresas` — both explicitly out of scope for this plan.
- `package.json` has `"type": "module"` — ESM only. No test files under `api/` (Vercel routing risk) — all tests under `test/`.

---

### Task 1: Data layer — questions, scoring, result content

**Files:**
- Create: `src/data/diagnosticoProfesionales.js`
- Create: `test/diagnosticoProfesionales.test.js`

**Interfaces:**
- Produces: `SEGMENTO_QUESTION` (object, see Step 1), `JUNIOR_QUESTIONS` (array of 7 question objects), `SENIOR_QUESTIONS` (array of 8 question objects), `calcularResultado(segmento, respuestas)` → `{ score: number, scoreMax: number, nivel: string, dimensiones: [{ nombre: string, porcentaje: number }], contenido: { diagnostico: string, fortalezas: string[], oportunidad: string[], recomendacion: string, programaSlug: string, programaCtaNota: string } }`. `segmento` is `'junior'` or `'senior'`; `respuestas` is a plain object mapping question `id` → the chosen option's `valor` (e.g. `{ j1: 2, j2: 0, ... }`).

- [ ] **Step 1: Write `src/data/diagnosticoProfesionales.js`**

```js
export const SEGMENTO_QUESTION = {
  id: 'q0',
  pregunta: '¿Cuántos años de experiencia profesional tienes?',
  opciones: [
    { texto: 'Menos de 5 años', segmento: 'junior' },
    { texto: '5 años o más', segmento: 'senior' },
  ],
}

export const JUNIOR_QUESTIONS = [
  {
    id: 'j1',
    dimension: 'criterioPropio',
    pregunta: 'Cuando algo no sale como esperabas en el trabajo, ¿qué es lo primero que haces?',
    opciones: [
      { texto: 'Le pregunto a una IA qué debería hacer y sigo su sugerencia', valor: 0 },
      { texto: 'Le pregunto a una IA, pero comparo su respuesta con lo que yo pienso', valor: 1 },
      { texto: 'Lo pienso yo primero, y uso la IA para chequear o afinar', valor: 2 },
      { texto: 'Lo resuelvo yo, reviso con colegas o fuentes, y ya después considero qué diría una IA', valor: 3 },
    ],
  },
  {
    id: 'j2',
    dimension: 'criterioPropio',
    pregunta: '¿Con qué frecuencia te ha tocado tomar una decisión difícil sin tener toda la información?',
    opciones: [
      { texto: 'Casi nunca — prefiero esperar a tener claridad', valor: 0 },
      { texto: 'Rara vez, y cuando pasa me cuesta mucho', valor: 1 },
      { texto: 'A veces, y ya le voy agarrando la mano', valor: 2 },
      { texto: 'Seguido — es parte normal de mi trabajo', valor: 3 },
    ],
  },
  {
    id: 'j3',
    dimension: 'criterioPropio',
    pregunta: 'Si tuvieras que defender una postura distinta a la que te da una IA frente a tu jefe, ¿qué tan preparado te sientes?',
    opciones: [
      { texto: 'No sabría ni por dónde empezar', valor: 0 },
      { texto: 'Podría, pero me tomaría tiempo armar el argumento', valor: 1 },
      { texto: 'Me siento cómodo, ya me ha tocado', valor: 2 },
      { texto: 'Es algo que hago con frecuencia y disfruto', valor: 3 },
    ],
  },
  {
    id: 'j4',
    dimension: 'aprendizajeActivo',
    pregunta: 'Cuando la IA te muestra un concepto o dato que no conocías, ¿qué haces normalmente?',
    opciones: [
      { texto: 'Lo incorporo y sigo trabajando — confío en que está bien', valor: 0 },
      { texto: 'Le pido a la misma IA que me explique más, pero no salgo de ahí', valor: 1 },
      { texto: 'Investigo por mi cuenta en otras fuentes para entender mejor', valor: 2 },
      { texto: 'Además de investigar, lo contrasto con un colega o alguien con más experiencia antes de aplicarlo', valor: 3 },
    ],
  },
  {
    id: 'j5',
    dimension: 'proyeccionCrecimiento',
    pregunta: '¿La IA te ha permitido hacer cosas que van más allá de tu rol actual (tareas, responsabilidades o habilidades nuevas que antes no tenías)?',
    opciones: [
      { texto: 'No, la uso solo para hacer mi trabajo actual más rápido', valor: 0 },
      { texto: 'A veces pruebo cosas fuera de mi rol, pero no se ha notado', valor: 1 },
      { texto: 'He empezado a asumir tareas o proyectos que antes no me tocaban, gracias a lo que la IA me permite hacer', valor: 2 },
      { texto: 'Ya me han dado responsabilidades nuevas porque he demostrado que puedo hacer más de lo que mi puesto pedía', valor: 3 },
    ],
  },
  {
    id: 'j6',
    dimension: 'proyeccionCrecimiento',
    pregunta: 'Cuando piensas en las personas con cargos de liderazgo por encima de ti (tu jefe, tu coordinador), ¿qué tan claro tienes lo que a ti te falta para llegar ahí?',
    opciones: [
      { texto: 'No lo he pensado mucho todavía', valor: 0 },
      { texto: 'Tengo una idea general, pero no muy concreta', valor: 1 },
      { texto: 'Tengo bastante claro qué habilidades o experiencia me faltan', valor: 2 },
      { texto: 'Tengo un plan activo — sé exactamente qué necesito, incluyendo cómo la IA me ayuda a llegar ahí', valor: 3 },
    ],
  },
  {
    id: 'j7',
    dimension: 'proyeccionCrecimiento',
    pregunta: 'La IA te está liberando tiempo. ¿Qué haces con eso?',
    opciones: [
      { texto: 'Todavía no siento que me libere tiempo real', valor: 0 },
      { texto: 'Lo uso para profundizar en lo mismo que ya hacía — mi especialidad', valor: 1 },
      { texto: 'Lo uso para aprender cosas nuevas fuera de mi especialidad y volverme más versátil', valor: 2 },
      { texto: 'Lo uso para eso, y además comparto lo que aprendo con mi equipo — me estoy volviendo un referente', valor: 3 },
    ],
  },
]

export const SENIOR_QUESTIONS = [
  {
    id: 's1',
    dimension: 'amplificacionCriterio',
    pregunta: 'Cuando la IA te sugiere algo que contradice tu experiencia o intuición, ¿qué haces?',
    opciones: [
      { texto: 'Sigo mi criterio y ni pruebo lo que sugiere la IA', valor: 0 },
      { texto: 'Reviso lo que sugiere, pero rara vez cambia lo que ya iba a hacer', valor: 1 },
      { texto: 'Lo considero en serio, y a veces ajusto mi decisión con eso', valor: 2 },
      { texto: 'Lo uso activamente para poner a prueba mi propio criterio, y he cambiado de opinión más de una vez gracias a eso', valor: 3 },
    ],
  },
  {
    id: 's2',
    dimension: 'amplificacionCriterio',
    pregunta: '¿Qué tanto usas la IA para amplificar tu trabajo (no para que lo haga por ti, sino para hacer más con lo que ya sabes)?',
    opciones: [
      { texto: 'Casi no la uso, prefiero mis métodos de siempre', valor: 0 },
      { texto: 'La uso para tareas puntuales, pero no ha cambiado cómo trabajo', valor: 1 },
      { texto: 'La uso regularmente para acelerar partes de mi trabajo', valor: 2 },
      { texto: 'La uso para escalar criterio que antes solo yo podía dar, llegando a más gente o proyectos de los que podría solo', valor: 3 },
    ],
  },
  {
    id: 's3',
    dimension: 'sistematizacionMentoria',
    pregunta: '¿Cuánto de tu conocimiento y criterio está hoy solo "en tu cabeza" — y cuánto está documentado, sistematizado o enseñado a otros?',
    opciones: [
      { texto: 'Casi todo está solo en mi cabeza', valor: 0 },
      { texto: 'He compartido algo informalmente, pero no está sistematizado', valor: 1 },
      { texto: 'He documentado o enseñado partes importantes a mi equipo', valor: 2 },
      { texto: 'Activamente sistematizo y transfiero mi criterio — incluso usando IA para hacerlo escalable', valor: 3 },
    ],
  },
  {
    id: 's4',
    dimension: 'posicionamientoVisibilidad',
    pregunta: 'Cuando trabajas con alguien más joven que "sabe usar bien la IA", ¿cómo te sientes respecto a tu propio valor?',
    opciones: [
      { texto: 'Me preocupa no poder competir con esa fluidez', valor: 0 },
      { texto: 'Me genera algo de inseguridad, aunque sé que aporto otras cosas', valor: 1 },
      { texto: 'Confío en que mi experiencia sigue siendo más valiosa, aunque no siempre se note', valor: 2 },
      { texto: 'Tengo claro que mi criterio es lo que hace que su uso de la IA realmente valga — y lo demuestro', valor: 3 },
    ],
  },
  {
    id: 's5',
    dimension: 'posicionamientoVisibilidad',
    pregunta: '¿Sientes que tu experiencia es reconocida y aprovechada activamente en tu organización?',
    opciones: [
      { texto: 'No, siento que se está dando por sentada o pasando por alto', valor: 0 },
      { texto: 'A veces, pero no de forma consistente', valor: 1 },
      { texto: 'Sí, en general se reconoce', valor: 2 },
      { texto: 'Sí, y activamente me buscan para decisiones estratégicas justamente por eso', valor: 3 },
    ],
  },
  {
    id: 's6',
    dimension: 'sistematizacionMentoria',
    pregunta: '¿Qué tan seguido mentoreas, entrenas o le pasas criterio a colegas más jóvenes?',
    opciones: [
      { texto: 'Casi nunca — no es parte de mi rol o no encuentro el espacio', valor: 0 },
      { texto: 'Ocasionalmente, cuando alguien pregunta directamente', valor: 1 },
      { texto: 'Regularmente, es parte de cómo trabajo', valor: 2 },
      { texto: 'Es una parte activa y reconocida de mi rol — incluso he usado IA para hacerlo más escalable', valor: 3 },
    ],
  },
  {
    id: 's7',
    dimension: 'proyeccionIndependencia',
    pregunta: 'Cuando piensas en los próximos años de tu carrera, ¿qué tan clara tienes tu relación con la IA (ser quien la dirige y entrena, vs. quedar detrás de quienes la usan mejor)?',
    opciones: [
      { texto: 'No lo he pensado mucho', valor: 0 },
      { texto: 'Tengo una idea general, pero no un plan concreto', valor: 1 },
      { texto: 'Tengo bastante claro hacia dónde quiero ir con esto', valor: 2 },
      { texto: 'Tengo un plan activo — sé exactamente cómo posicionar mi experiencia frente a la IA en los próximos años', valor: 3 },
    ],
  },
  {
    id: 's8',
    dimension: 'proyeccionIndependencia',
    pregunta: 'Pensando en tu independencia futura (por decisión propia o por cambios en tu empleo), ¿qué tan claro tienes cómo usarías tu experiencia + IA para generar ingresos por tu cuenta (consultoría, negocio propio, especialización)?',
    opciones: [
      { texto: 'No lo he pensado — dependo de estar empleado', valor: 0 },
      { texto: 'Lo he pensado, pero no sé por dónde empezar', valor: 1 },
      { texto: 'Tengo una idea de cómo podría hacerlo, aunque no he dado pasos concretos', valor: 2 },
      { texto: 'Ya lo estoy construyendo o tengo un plan claro de cómo mi experiencia + IA me daría independencia', valor: 3 },
    ],
  },
]

// Nombres visibles de cada dimensión — la agrupación en sí vive en el
// campo `dimension` de cada pregunta (JUNIOR_QUESTIONS/SENIOR_QUESTIONS),
// no aquí, para tener una sola fuente de verdad.
const DIMENSION_NAMES = {
  criterioPropio: 'Criterio propio',
  aprendizajeActivo: 'Aprendizaje activo',
  proyeccionCrecimiento: 'Proyección de crecimiento',
  amplificacionCriterio: 'Amplificación de criterio',
  sistematizacionMentoria: 'Sistematización y mentoría',
  posicionamientoVisibilidad: 'Posicionamiento y visibilidad',
  proyeccionIndependencia: 'Proyección de independencia',
}

function calcularDimensiones(preguntas, respuestas) {
  const orden = []
  const grupos = {}
  for (const p of preguntas) {
    if (!grupos[p.dimension]) {
      grupos[p.dimension] = { val: 0, max: 0 }
      orden.push(p.dimension)
    }
    grupos[p.dimension].val += respuestas[p.id] ?? 0
    grupos[p.dimension].max += 3
  }
  return orden.map(id => ({
    nombre: DIMENSION_NAMES[id],
    porcentaje: Math.round((grupos[id].val / grupos[id].max) * 100),
  }))
}

const NIVELES = {
  junior: [
    {
      min: 0,
      max: 6,
      nombre: 'Techo de cristal activo',
      contenido: {
        diagnostico: 'Hoy estás construyendo bajo el mismo riesgo que describe el programa — dejar que la IA piense por ti, sin desarrollar el criterio propio que te va a diferenciar. No es un juicio, es una alerta a tiempo.',
        fortalezas: [
          'Ya usas IA activamente — la adopción no es el problema',
          'Tienes tiempo de sobra para revertir esto antes de que se vuelva un hábito permanente',
        ],
        oportunidad: [
          'Delegas el pensamiento crítico a la IA en vez de usarla para afinar el tuyo',
          'Todavía no tienes claro qué te falta para crecer hacia roles de liderazgo',
          'No estás usando el tiempo que la IA libera para expandirte más allá de tu rol actual',
        ],
        recomendacion: 'Empieza por resolver tú primero, y usa la IA para contrastar — no al revés. Es el hábito que más rápido cambia tu trayectoria.',
        programaSlug: 'ia-nuevos-profesionales',
        programaCtaNota: 'diseñado exactamente para este momento, antes de que el techo de cristal se vuelva permanente.',
      },
    },
    {
      min: 7,
      max: 14,
      nombre: 'En construcción',
      contenido: {
        diagnostico: 'Vas por buen camino — ya usas la IA con algo de criterio propio, pero todavía no es sistemático. Estás en la zona donde la diferencia entre liderar el cambio o quedarte a medias se decide.',
        fortalezas: [
          'Tienes momentos de pensamiento crítico genuino, no dependes 100% de la IA',
          'Ya muestras señales de querer crecer más allá de tu rol',
        ],
        oportunidad: [
          'Tu criterio propio es inconsistente — a veces lo usas, a veces no',
          'Podrías estar sistematizando más lo que aprendes en vez de dejarlo suelto',
        ],
        recomendacion: 'Convierte lo que haces bien ocasionalmente en un hábito consistente. Ahí está el salto al siguiente nivel.',
        programaSlug: 'ia-nuevos-profesionales',
        programaCtaNota: 'te ayuda a consolidar el criterio que ya empezaste a construir.',
      },
    },
    {
      min: 15,
      max: 21,
      nombre: 'Liderando el cambio',
      contenido: {
        diagnostico: 'Ya estás haciendo lo que este programa busca formar: usar la IA como herramienta, no como reemplazo de tu pensamiento. Tu siguiente reto es profundizar y multiplicar eso.',
        fortalezas: [
          'Sostienes tu propio criterio incluso frente a la IA',
          'Ya estás expandiéndote más allá de tu rol y compartiendo lo que aprendes',
        ],
        oportunidad: [
          'El siguiente nivel es sistematizar esto — pasar de hacerlo bien intuitivamente a tener un marco replicable',
          'Vale la pena afinar tu lectura de qué necesitas específicamente para el salto a roles de más responsabilidad',
        ],
        recomendacion: 'No te quedes en "ya lo hago bien" — profundiza el marco que te permita escalarlo y hacerlo visible ante quienes deciden tu siguiente paso.',
        programaSlug: 'ia-nuevos-profesionales',
        programaCtaNota: 'para llevar tu ventaja actual a un nivel más estratégico y visible.',
      },
    },
  ],
  senior: [
    {
      min: 0,
      max: 8,
      nombre: 'Experiencia en riesgo de invisibilidad',
      contenido: {
        diagnostico: 'Tu experiencia vale — el riesgo no es que la IA te reemplace, es que nadie (ni tú) esté multiplicándola todavía. Esa brecha es la que más rápido se puede cerrar.',
        fortalezas: [
          'Tienes años de criterio construido que ningún junior puede improvisar',
          'Estás a tiempo de posicionarte antes de que la brecha se sienta más',
        ],
        oportunidad: [
          'Tu criterio está solo "en tu cabeza" — no documentado ni transferido',
          'Sientes que tu valor no se nota frente a colegas más jóvenes "tool-fluent"',
          'No tienes un plan claro para tu independencia si tu situación laboral cambia',
        ],
        recomendacion: 'Empieza por sistematizar una sola cosa que sabes hacer mejor que nadie — es el primer paso hacia hacerlo visible.',
        programaSlug: 'ia-profesionales-senior',
        programaCtaNota: 'para que tu experiencia deje de sentirse amenazada y empiece a sentirse multiplicada.',
      },
    },
    {
      min: 9,
      max: 16,
      nombre: 'Multiplicando, pero no del todo',
      contenido: {
        diagnostico: 'Ya usas la IA como amplificador, no como amenaza — vas en la dirección correcta. Falta llevarlo de "lo hago" a "lo sistematizo y lo hago visible."',
        fortalezas: [
          'Usas la IA activamente para escalar tu trabajo',
          'Mentoreas o compartes criterio al menos ocasionalmente',
        ],
        oportunidad: [
          'La sistematización es parcial — se pierde valor que podría estar documentado o replicado',
          'Tu plan de independencia (consultoría, negocio propio) sigue siendo una idea, no una acción',
        ],
        recomendacion: 'Convierte una práctica de mentoría que ya haces en algo estructurado y repetible — ahí está tu ventaja competitiva más clara.',
        programaSlug: 'ia-profesionales-senior',
        programaCtaNota: 'para llevar tu criterio de algo que compartes ocasionalmente a un activo estratégico.',
      },
    },
    {
      min: 17,
      max: 24,
      nombre: 'Liderando la multiplicación',
      contenido: {
        diagnostico: 'Ya estás haciendo lo que muchos profesionales senior todavía no se atreven: usar la IA para escalar tu criterio, no para competir con él. El siguiente paso es capitalizar eso, dentro y fuera de tu organización.',
        fortalezas: [
          'Sistematizas y transfieres tu conocimiento activamente',
          'Tu experiencia es reconocida y buscada para decisiones estratégicas',
          'Tienes claridad sobre tu proyección, incluyendo independencia futura',
        ],
        oportunidad: [
          'El riesgo en este nivel no es de criterio, es de tiempo — ¿estás dedicando el espacio necesario a construir lo que ya sabes que quieres construir?',
        ],
        recomendacion: 'Pon fecha a los próximos pasos de tu plan de independencia o especialización — el conocimiento ya lo tienes.',
        programaSlug: 'ia-profesionales-senior',
        programaCtaNota: 'para darle estructura y velocidad a algo que ya sabes hacer bien.',
      },
    },
  ],
}

export function calcularResultado(segmento, respuestas) {
  const preguntas = segmento === 'junior' ? JUNIOR_QUESTIONS : SENIOR_QUESTIONS
  const scoreMax = preguntas.length * 3
  const score = preguntas.reduce((sum, p) => sum + (respuestas[p.id] ?? 0), 0)

  const dimensiones = calcularDimensiones(preguntas, respuestas)

  const nivelObj = NIVELES[segmento].find(n => score >= n.min && score <= n.max)

  return {
    score,
    scoreMax,
    nivel: nivelObj.nombre,
    dimensiones,
    contenido: nivelObj.contenido,
  }
}
```

- [ ] **Step 2: Write the tests**

Create `test/diagnosticoProfesionales.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  SEGMENTO_QUESTION,
  JUNIOR_QUESTIONS,
  SENIOR_QUESTIONS,
  calcularResultado,
} from '../src/data/diagnosticoProfesionales.js'

test('SEGMENTO_QUESTION has exactly the junior/senior split', () => {
  assert.equal(SEGMENTO_QUESTION.opciones.length, 2)
  assert.equal(SEGMENTO_QUESTION.opciones[0].segmento, 'junior')
  assert.equal(SEGMENTO_QUESTION.opciones[1].segmento, 'senior')
})

test('JUNIOR_QUESTIONS has exactly 7 questions, each with 4 options valued 0-3', () => {
  assert.equal(JUNIOR_QUESTIONS.length, 7)
  for (const q of JUNIOR_QUESTIONS) {
    assert.equal(q.opciones.length, 4)
    assert.deepEqual(q.opciones.map(o => o.valor), [0, 1, 2, 3])
  }
})

test('SENIOR_QUESTIONS has exactly 8 questions, each with 4 options valued 0-3', () => {
  assert.equal(SENIOR_QUESTIONS.length, 8)
  for (const q of SENIOR_QUESTIONS) {
    assert.equal(q.opciones.length, 4)
    assert.deepEqual(q.opciones.map(o => o.valor), [0, 1, 2, 3])
  }
})

function allZero(ids) {
  return Object.fromEntries(ids.map(id => [id, 0]))
}
function allMax(ids) {
  return Object.fromEntries(ids.map(id => [id, 3]))
}

test('calcularResultado: junior minimum score (0) lands in Techo de cristal activo', () => {
  const r = calcularResultado('junior', allZero(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7']))
  assert.equal(r.score, 0)
  assert.equal(r.scoreMax, 21)
  assert.equal(r.nivel, 'Techo de cristal activo')
})

test('calcularResultado: junior boundary score 6 still Techo de cristal activo, 7 is En construcción', () => {
  const respuestas6 = { j1: 3, j2: 3, ...allZero(['j3', 'j4', 'j5', 'j6', 'j7']) }
  assert.equal(calcularResultado('junior', respuestas6).score, 6)
  assert.equal(calcularResultado('junior', respuestas6).nivel, 'Techo de cristal activo')

  const respuestas7 = { j1: 3, j2: 3, j3: 1, ...allZero(['j4', 'j5', 'j6', 'j7']) }
  assert.equal(calcularResultado('junior', respuestas7).score, 7)
  assert.equal(calcularResultado('junior', respuestas7).nivel, 'En construcción')
})

test('calcularResultado: junior boundary score 14 vs 15', () => {
  const r14 = calcularResultado('junior', { j1: 3, j2: 3, j3: 3, j4: 3, j5: 2, j6: 0, j7: 0 })
  assert.equal(r14.score, 14)
  assert.equal(r14.nivel, 'En construcción')

  const r15 = calcularResultado('junior', { j1: 3, j2: 3, j3: 3, j4: 3, j5: 3, j6: 0, j7: 0 })
  assert.equal(r15.score, 15)
  assert.equal(r15.nivel, 'Liderando el cambio')
})

test('calcularResultado: junior maximum score (21) is Liderando el cambio', () => {
  const r = calcularResultado('junior', allMax(['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7']))
  assert.equal(r.score, 21)
  assert.equal(r.nivel, 'Liderando el cambio')
  assert.equal(r.contenido.programaSlug, 'ia-nuevos-profesionales')
})

test('calcularResultado: junior dimension percentages', () => {
  const r = calcularResultado('junior', { j1: 3, j2: 3, j3: 3, j4: 0, j5: 0, j6: 0, j7: 0 })
  assert.deepEqual(r.dimensiones, [
    { nombre: 'Criterio propio', porcentaje: 100 },
    { nombre: 'Aprendizaje activo', porcentaje: 0 },
    { nombre: 'Proyección de crecimiento', porcentaje: 0 },
  ])
})

test('calcularResultado: senior minimum score (0) lands in Experiencia en riesgo de invisibilidad', () => {
  const r = calcularResultado('senior', allZero(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']))
  assert.equal(r.score, 0)
  assert.equal(r.scoreMax, 24)
  assert.equal(r.nivel, 'Experiencia en riesgo de invisibilidad')
})

test('calcularResultado: senior boundary score 8 vs 9', () => {
  const r8 = calcularResultado('senior', { s1: 3, s2: 3, s3: 2, ...allZero(['s4', 's5', 's6', 's7', 's8']) })
  assert.equal(r8.score, 8)
  assert.equal(r8.nivel, 'Experiencia en riesgo de invisibilidad')

  const r9 = calcularResultado('senior', { s1: 3, s2: 3, s3: 3, ...allZero(['s4', 's5', 's6', 's7', 's8']) })
  assert.equal(r9.score, 9)
  assert.equal(r9.nivel, 'Multiplicando, pero no del todo')
})

test('calcularResultado: senior boundary score 16 vs 17', () => {
  const r16 = calcularResultado('senior', { s1: 3, s2: 3, s3: 3, s4: 3, s5: 3, s6: 1, s7: 0, s8: 0 })
  assert.equal(r16.score, 16)
  assert.equal(r16.nivel, 'Multiplicando, pero no del todo')

  const r17 = calcularResultado('senior', { s1: 3, s2: 3, s3: 3, s4: 3, s5: 3, s6: 2, s7: 0, s8: 0 })
  assert.equal(r17.score, 17)
  assert.equal(r17.nivel, 'Liderando la multiplicación')
})

test('calcularResultado: senior maximum score (24) is Liderando la multiplicación', () => {
  const r = calcularResultado('senior', allMax(['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8']))
  assert.equal(r.score, 24)
  assert.equal(r.nivel, 'Liderando la multiplicación')
  assert.equal(r.contenido.programaSlug, 'ia-profesionales-senior')
})

test('calcularResultado: senior dimension percentages', () => {
  const r = calcularResultado('senior', { s1: 3, s2: 3, s3: 0, s4: 0, s5: 0, s6: 0, s7: 0, s8: 0 })
  assert.deepEqual(r.dimensiones, [
    { nombre: 'Amplificación de criterio', porcentaje: 100 },
    { nombre: 'Sistematización y mentoría', porcentaje: 0 },
    { nombre: 'Posicionamiento y visibilidad', porcentaje: 0 },
    { nombre: 'Proyección de independencia', porcentaje: 0 },
  ])
})

test('calcularResultado: a missing answer counts as 0, never crashes', () => {
  const r = calcularResultado('junior', { j1: 3 })
  assert.equal(r.score, 3)
})
```

- [ ] **Step 3: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests in `test/diagnosticoProfesionales.test.js` PASS (14
tests), plus the pre-existing 23 from subsystem 3 still pass (37 total).
This is written test-after rather than test-first because the question
bank and tier boundaries **are** the spec's §4/§5/§6 content — the tests
assert the same boundaries the spec already fixed. If any assertion
fails, fix `src/data/diagnosticoProfesionales.js`, not the test.

- [ ] **Step 4: Commit**

```bash
git add src/data/diagnosticoProfesionales.js test/diagnosticoProfesionales.test.js
git commit -m "feat(diagnostico): add question bank, scoring and result content"
```

---

### Task 2: Update `/api/lead`'s diagnóstico-profesionales schema + add Sheets read

**Files:**
- Modify: `api/_lib/lead-notify.js`
- Modify: `test/lead-notify.test.js`

**Interfaces:**
- Consumes: nothing new from Task 1 (this task only touches the backend).
- Produces: `getSheetValues(tabName)` → `Promise<string[][]>` (array of
  row arrays, `[]` on any failure — never throws). Task 3 imports this.
- Modifies: `buildEnvelope('bbs-diagnostico-profesionales', data)`'s
  return shape — `data` now expects `{ nombre, email, whatsapp, segmento,
  score, scoreMax, nivel, pagina_origen }` instead of the old
  `{ nombre, email, whatsapp, resultado, pagina_origen }`.

- [ ] **Step 1: Replace the `bbs-diagnostico-profesionales` case in `buildEnvelope`**

In `api/_lib/lead-notify.js`, find this exact block:

```js
    case 'bbs-diagnostico-profesionales':
      return {
        emailSubject: `Diagnóstico Profesionales — ${data.nombre || 'sin nombre'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Resultado', data.resultado],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Profesionales',
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
    case 'bbs-diagnostico-profesionales':
      return {
        emailSubject: `Diagnóstico Profesionales — ${data.nombre || 'sin nombre'} — ${data.nivel || 'sin nivel'}`,
        emailFields: [
          ['Nombre', data.nombre],
          ['Email', data.email],
          ['WhatsApp', data.whatsapp],
          ['Segmento', data.segmento],
          ['Score', `${data.score ?? ''}/${data.scoreMax ?? ''}`],
          ['Nivel', data.nivel],
          ['Página de origen', data.pagina_origen],
        ],
        sheetTab: 'Diagnóstico Profesionales',
        sheetRow: [
          ts,
          data.nombre || '',
          data.email || '',
          data.whatsapp || '',
          data.segmento || '',
          data.score ?? '',
          data.scoreMax ?? '',
          data.nivel || '',
          data.pagina_origen || '',
        ],
      }
```

Do not touch the `bbs-diagnostico-empresas` case below it — that one stays
on its old provisional schema until its own future spec/plan.

- [ ] **Step 2: Add `getSheetValues` for reading Sheet rows**

In `api/_lib/lead-notify.js`, find the end of `appendSheetRow` (the
closing `}` right before `export async function notifyLead`):

```js
export async function appendSheetRow(tabName, values) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const client = getSheetsClient()
  if (!sheetId || !client) {
    console.warn('[lead-notify] Google Sheets not configured — skipping row append.')
    return false
  }

  try {
    const { token } = await client.getAccessToken()
    const range = encodeURIComponent(`${tabName}!A:A`)
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ values: [values] }),
      }
    )
    if (!res.ok) {
      console.error('[lead-notify] Sheets append failed', res.status, await res.text().catch(() => ''))
      return false
    }
    return true
  } catch (err) {
    console.error('[lead-notify] Sheets append threw', err)
    return false
  }
}
```

Add this new exported function directly after it (before `notifyLead`):

```js
export async function getSheetValues(tabName) {
  const sheetId = process.env.GOOGLE_SHEET_ID
  const client = getSheetsClient()
  if (!sheetId || !client) {
    console.warn('[lead-notify] Google Sheets not configured — skipping row read.')
    return []
  }

  try {
    const { token } = await client.getAccessToken()
    const range = encodeURIComponent(`${tabName}!A:Z`)
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    if (!res.ok) {
      console.error('[lead-notify] Sheets read failed', res.status, await res.text().catch(() => ''))
      return []
    }
    const body = await res.json()
    return body.values || []
  } catch (err) {
    console.error('[lead-notify] Sheets read threw', err)
    return []
  }
}
```

This reuses the same internal `getSheetsClient()` already defined above it
in this file — no duplicated auth logic, and no new Google Cloud
permissions (same `spreadsheets` scope already granted).

- [ ] **Step 3: Update the existing test for the new schema**

In `test/lead-notify.test.js`, find:

```js
test('buildEnvelope: bbs-diagnostico-profesionales', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Luis',
    email: 'luis@example.com',
    whatsapp: '+51999888777',
    resultado: 'Nivel avanzado',
    pagina_origen: '/diagnostico/profesionales',
  })
  assert.equal(env.emailSubject, 'Diagnóstico Profesionales — Luis')
  assert.equal(env.sheetTab, 'Diagnóstico Profesionales')
  assert.deepEqual(env.sheetRow.slice(1), [
    'Luis',
    'luis@example.com',
    '+51999888777',
    'Nivel avanzado',
    '/diagnostico/profesionales',
  ])
})
```

Replace with:

```js
test('buildEnvelope: bbs-diagnostico-profesionales', () => {
  const env = buildEnvelope('bbs-diagnostico-profesionales', {
    nombre: 'Luis',
    email: 'luis@example.com',
    whatsapp: '+51999888777',
    segmento: 'senior',
    score: 17,
    scoreMax: 24,
    nivel: 'Liderando la multiplicación',
    pagina_origen: '/diagnostico/profesionales',
  })
  assert.equal(env.emailSubject, 'Diagnóstico Profesionales — Luis — Liderando la multiplicación')
  assert.equal(env.sheetTab, 'Diagnóstico Profesionales')
  assert.deepEqual(env.sheetRow.slice(1), [
    'Luis',
    'luis@example.com',
    '+51999888777',
    'senior',
    17,
    24,
    'Liderando la multiplicación',
    '/diagnostico/profesionales',
  ])
})
```

Then add a new test for `getSheetValues` right after it in the same file
(the file already imports `test`/`assert`; add `getSheetValues` to the
existing import line from `../api/_lib/lead-notify.js`):

```js
test('getSheetValues: returns [] without throwing when GOOGLE_SHEET_ID is unset', async () => {
  const original = process.env.GOOGLE_SHEET_ID
  delete process.env.GOOGLE_SHEET_ID
  try {
    const result = await getSheetValues('SomeTab')
    assert.deepEqual(result, [])
  } finally {
    if (original !== undefined) process.env.GOOGLE_SHEET_ID = original
  }
})
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests pass. `test/lead-notify.test.js` now has 14 tests (13
existing + 1 new), `test/lead.test.js` unaffected at 10, plus Task 1's 14
— 38 total.

- [ ] **Step 5: Commit**

```bash
git add api/_lib/lead-notify.js test/lead-notify.test.js
git commit -m "feat(api): update diagnóstico-profesionales schema, add Sheets read"
```

---

### Task 3: `GET /api/diagnostico-stats` — real percentile endpoint

**Files:**
- Create: `api/diagnostico-stats.js`
- Create: `test/diagnostico-stats.test.js`

**Interfaces:**
- Consumes: `getSheetValues(tabName)` from `api/_lib/lead-notify.js`
  (Task 2) → `Promise<string[][]>`.
- Produces: `createHandler(readValues)` factory (same testable pattern as
  `api/lead.js`) and `export default createHandler()` for Vercel.

- [ ] **Step 1: Write `api/diagnostico-stats.js`**

```js
import { getSheetValues } from './_lib/lead-notify.js'

const TAB_BY_TIPO = {
  profesionales: 'Diagnóstico Profesionales',
}

const MIN_SAMPLE_SIZE = 20
const SEGMENTO_COL = 4
const SCORE_COL = 5

export function createHandler(readValues = getSheetValues) {
  return async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' })
    }

    const { tipo, segmento, score } = req.query || {}
    const tab = TAB_BY_TIPO[tipo]
    const scoreNum = Number(score)

    if (!tab || !segmento || Number.isNaN(scoreNum)) {
      return res.status(400).json({ error: 'Missing or invalid "tipo"/"segmento"/"score".' })
    }

    let rows
    try {
      rows = await readValues(tab)
    } catch (err) {
      console.error('[diagnostico-stats] readValues threw', err)
      rows = []
    }

    const scores = (rows || [])
      .slice(1) // la primera fila son encabezados
      .filter(row => row[SEGMENTO_COL] === segmento)
      .map(row => Number(row[SCORE_COL]))
      .filter(n => !Number.isNaN(n))

    if (scores.length < MIN_SAMPLE_SIZE) {
      return res.status(200).json({ insufficientData: true, muestraTotal: scores.length })
    }

    const menores = scores.filter(s => s < scoreNum).length
    const percentil = Math.round((menores / scores.length) * 100)

    return res.status(200).json({ percentil, muestraTotal: scores.length })
  }
}

export default createHandler()
```

- [ ] **Step 2: Write the tests**

Create `test/diagnostico-stats.test.js`:

```js
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createHandler } from '../api/diagnostico-stats.js'

function createMockRes() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code
      return this
    },
    json(payload) {
      this.body = payload
      return this
    },
  }
}

function headerRow() {
  return ['timestamp', 'nombre', 'email', 'whatsapp', 'segmento', 'score', 'scoreMax', 'nivel', 'pagina_origen']
}

function dataRow(segmento, score) {
  return ['2026-09-01', 'Test', 'test@example.com', '', segmento, String(score), '21', 'Nivel', '/diagnostico/profesionales']
}

test('rejects non-GET methods with 405', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'POST', query: {} }, res)
  assert.equal(res.statusCode, 405)
})

test('rejects missing tipo/segmento/score with 400', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior' } }, res)
  assert.equal(res.statusCode, 400)
})

test('rejects an unknown tipo with 400', async () => {
  const handler = createHandler(async () => [])
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'no-existe', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 400)
})

test('returns insufficientData with fewer than 20 matching rows', async () => {
  const rows = [headerRow(), dataRow('junior', 5), dataRow('junior', 10), dataRow('senior', 20)]
  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '8' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 2)
})

test('computes a real percentile with 20+ matching rows, filtered by segmento', async () => {
  const rows = [headerRow()]
  // 19 junior rows scoring 0, 1 junior row scoring 20 => 20 junior rows total
  for (let i = 0; i < 19; i++) rows.push(dataRow('junior', 0))
  rows.push(dataRow('junior', 20))
  // decoy senior rows must never affect the junior calculation
  for (let i = 0; i < 25; i++) rows.push(dataRow('senior', 0))

  const handler = createHandler(async () => rows)
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '20' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, undefined)
  assert.equal(res.body.muestraTotal, 20)
  assert.equal(res.body.percentil, 95) // beats 19 of 20 => round(19/20*100) = 95
})

test('never hard-errors when readValues throws — returns insufficientData instead', async () => {
  const handler = createHandler(async () => {
    throw new Error('Sheets down')
  })
  const res = createMockRes()
  await handler({ method: 'GET', query: { tipo: 'profesionales', segmento: 'junior', score: '10' } }, res)
  assert.equal(res.statusCode, 200)
  assert.equal(res.body.insufficientData, true)
  assert.equal(res.body.muestraTotal, 0)
})
```

- [ ] **Step 3: Run the tests to verify they pass**

Run: `npm test`

Expected: all tests pass (Task 3 adds 6). Running total: 44.

- [ ] **Step 4: Commit**

```bash
git add api/diagnostico-stats.js test/diagnostico-stats.test.js
git commit -m "feat(api): add /api/diagnostico-stats real-percentile endpoint"
```

---

### Task 4: Quiz UI — screens, page, route

**Files:**
- Create: `src/components/diagnostico/PantallaBienvenida.jsx`
- Create: `src/components/diagnostico/PreguntaScreen.jsx`
- Create: `src/components/diagnostico/CapturaDatos.jsx`
- Create: `src/components/diagnostico/PantallaTransicion.jsx`
- Create: `src/components/diagnostico/PantallaResultado.jsx`
- Create: `src/pages/DiagnosticoProfesionalesPage.jsx`
- Modify: `src/App.jsx`
- Modify: `src/lib/utm.js`

**Interfaces:**
- Consumes: `SEGMENTO_QUESTION`, `JUNIOR_QUESTIONS`, `SENIOR_QUESTIONS`,
  `calcularResultado` from `src/data/diagnosticoProfesionales.js` (Task
  1). Calls `POST /api/lead` and `GET /api/diagnostico-stats` at runtime
  (Tasks 2/3) — not imported, called via `fetch`.
- Consumes: `trackCta`, `trackForm` from `src/lib/analytics.js`
  (existing); `withUtm`, `CAMPAIGNS` from `src/lib/utm.js`.
- Consumes: `Nav` from `src/components/Nav.jsx`, `Footer` from
  `src/components/Footer.jsx` (existing, same pattern as `ProgramaPage`).

This repo has no component test framework (established in subsystems
1–3) — verification for this task is `npm run build` + manual browser
walkthrough of both branches, matching prior subsystems' convention.

- [ ] **Step 1: Add the UTM campaign**

In `src/lib/utm.js`, find:

```js
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL:   'playbook_digital',
  PLAYBOOK_IMPRESO:   'playbook_impreso',
  COMMUNITY:          'community_whatsapp',
  PROGRAMA_WHATSAPP:  'programa_whatsapp',
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
}
```

- [ ] **Step 2: Write `src/components/diagnostico/PantallaBienvenida.jsx`**

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

- [ ] **Step 3: Write `src/components/diagnostico/PreguntaScreen.jsx`**

```jsx
export default function PreguntaScreen({ pregunta, numero, total, onAnswer }) {
  return (
    <div className="fro-wrap" style={{ maxWidth: 640, margin: '0 auto', padding: '5rem 2rem' }}>
      <div className="fro-sm" style={{ marginBottom: '0.6rem', color: 'var(--fro-text-2)' }}>
        Pregunta {numero} de {total}
      </div>
      <div style={{ height: 4, background: 'var(--fro-line)', borderRadius: 2, marginBottom: '2.4rem', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${(numero / total) * 100}%`,
            background: 'var(--fro-amber)',
            transition: 'width 0.3s var(--ease)',
          }}
        />
      </div>
      <h2 className="fro-h3" style={{ marginBottom: '1.8rem' }}>{pregunta.pregunta}</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {pregunta.opciones.map((opcion, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onAnswer(opcion.valor)}
            className="fro-btn"
            style={{
              justifyContent: 'flex-start',
              textAlign: 'left',
              padding: '1rem 1.2rem',
              border: '1.5px solid var(--fro-line-2)',
              color: 'var(--fro-text)',
              background: 'transparent',
              whiteSpace: 'normal',
            }}
          >
            {opcion.texto}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Write `src/components/diagnostico/CapturaDatos.jsx`**

```jsx
import { useState } from 'react'

export default function CapturaDatos({ onSubmit }) {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ nombre, email, whatsapp })
  }

  return (
    <div className="fro-wrap" style={{ maxWidth: 480, margin: '0 auto', padding: '5rem 2rem' }}>
      <h2 className="fro-h3" style={{ marginBottom: '0.8rem' }}>Ya casi. ¿A dónde te mandamos tu resultado?</h2>
      <p className="fro-body" style={{ marginBottom: '1.8rem' }}>
        Tu resultado se muestra en esta misma pantalla — estos datos son
        para que podamos contactarte con tu recomendación.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <input
          required
          type="text"
          placeholder="Tu nombre"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          className="fro-field"
        />
        <input
          required
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="fro-field"
        />
        <input
          required
          type="tel"
          placeholder="WhatsApp (con código de país)"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}
          className="fro-field"
        />
        <button type="submit" className="fro-btn fro-btn-amber fro-btn-lg" style={{ marginTop: '0.4rem' }}>
          Ver mi resultado
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 5: Write `src/components/diagnostico/PantallaTransicion.jsx`**

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

- [ ] **Step 6: Write `src/components/diagnostico/PantallaResultado.jsx`**

```jsx
import { trackCta } from '../../lib/analytics.js'
import { PROGRAMAS } from '../../data/programas.js'

export default function PantallaResultado({ resultado, percentil }) {
  const { score, scoreMax, nivel, dimensiones, contenido } = resultado
  const programa = PROGRAMAS.find(p => p.slug === contenido.programaSlug)

  return (
    <div className="fro-wrap" style={{ maxWidth: 680, margin: '0 auto', padding: '5rem 2rem' }}>
      <div className="fro-eyebrow amber" style={{ marginBottom: '0.8rem' }}>Tu resultado</div>
      <h2 className="fro-h2" style={{ marginBottom: '0.6rem' }}>{nivel}</h2>
      <p className="fro-sm" style={{ marginBottom: '1.6rem', color: 'var(--fro-text-2)' }}>
        {score} / {scoreMax} puntos
        {percentil && !percentil.insufficientData && (
          <> · Superaste al {percentil.percentil}% de quienes tomaron este diagnóstico</>
        )}
        {percentil && percentil.insufficientData && (
          <> · Eres de los primeros en tomar este diagnóstico — pronto vas a poder ver cómo te comparas con otros profesionales de la región.</>
        )}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.2rem' }}>
        {dimensiones.map(d => (
          <div key={d.nombre}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
              <span>{d.nombre}</span>
              <span>{d.porcentaje}%</span>
            </div>
            <div style={{ height: 6, background: 'var(--fro-line)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.porcentaje}%`, background: 'var(--fro-amber)' }} />
            </div>
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
          onClick={() => trackCta(`diagnostico_resultado_${programa.slug}`, 'diagnostico_profesionales', `/programas/${programa.slug}`)}
          className="fro-btn fro-btn-amber fro-btn-lg"
        >
          {programa.titulo} — {contenido.programaCtaNota} <span aria-hidden>→</span>
        </a>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Write `src/pages/DiagnosticoProfesionalesPage.jsx`**

```jsx
import { useState } from 'react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import PantallaBienvenida from '../components/diagnostico/PantallaBienvenida.jsx'
import PreguntaScreen from '../components/diagnostico/PreguntaScreen.jsx'
import CapturaDatos from '../components/diagnostico/CapturaDatos.jsx'
import PantallaTransicion from '../components/diagnostico/PantallaTransicion.jsx'
import PantallaResultado from '../components/diagnostico/PantallaResultado.jsx'
import { trackCta, trackForm } from '../lib/analytics.js'
import { SEGMENTO_QUESTION, JUNIOR_QUESTIONS, SENIOR_QUESTIONS, calcularResultado } from '../data/diagnosticoProfesionales.js'

const FASES = {
  BIENVENIDA: 'bienvenida',
  SEGMENTACION: 'segmentacion',
  PREGUNTAS: 'preguntas',
  CAPTURA: 'captura',
  TRANSICION: 'transicion',
  RESULTADO: 'resultado',
}

export default function DiagnosticoProfesionalesPage() {
  const [fase, setFase] = useState(FASES.BIENVENIDA)
  const [segmento, setSegmento] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [preguntaIndex, setPreguntaIndex] = useState(0)
  const [resultado, setResultado] = useState(null)
  const [percentil, setPercentil] = useState(null)

  const preguntas = segmento === 'junior' ? JUNIOR_QUESTIONS : SENIOR_QUESTIONS

  function handleStart() {
    trackCta('diagnostico_profesionales_iniciar', 'diagnostico_profesionales', '/diagnostico/profesionales')
    setFase(FASES.SEGMENTACION)
  }

  function handleSegmento(valorSegmento) {
    setSegmento(valorSegmento)
    setPreguntaIndex(0)
    setFase(FASES.PREGUNTAS)
  }

  function handleAnswer(valor) {
    const pregunta = preguntas[preguntaIndex]
    const nuevasRespuestas = { ...respuestas, [pregunta.id]: valor }
    setRespuestas(nuevasRespuestas)

    if (preguntaIndex + 1 < preguntas.length) {
      setPreguntaIndex(preguntaIndex + 1)
    } else {
      setFase(FASES.CAPTURA)
    }
  }

  function handleCaptura(datosContacto) {
    trackForm('bbs-diagnostico-profesionales', 'submit')
    const calculado = calcularResultado(segmento, respuestas)
    setResultado(calculado)
    setFase(FASES.TRANSICION)

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        form: 'bbs-diagnostico-profesionales',
        data: {
          nombre: datosContacto.nombre,
          email: datosContacto.email,
          whatsapp: datosContacto.whatsapp,
          segmento,
          score: calculado.score,
          scoreMax: calculado.scoreMax,
          nivel: calculado.nivel,
          pagina_origen: window.location.pathname,
        },
      }),
    })
      .then(res => {
        trackForm('bbs-diagnostico-profesionales', res.ok ? 'success' : 'error')
      })
      .catch(() => {
        trackForm('bbs-diagnostico-profesionales', 'error')
      })

    fetch(`/api/diagnostico-stats?tipo=profesionales&segmento=${segmento}&score=${calculado.score}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) setPercentil(data)
      })
      .catch(() => {})
  }

  function handleTransicionComplete() {
    setFase(FASES.RESULTADO)
  }

  return (
    <>
      <Nav />
      <main id="main" style={{ minHeight: '70vh' }}>
        {fase === FASES.BIENVENIDA && <PantallaBienvenida onStart={handleStart} />}

        {fase === FASES.SEGMENTACION && (
          <PreguntaScreen
            pregunta={{
              pregunta: SEGMENTO_QUESTION.pregunta,
              opciones: SEGMENTO_QUESTION.opciones.map(o => ({ texto: o.texto, valor: o.segmento })),
            }}
            numero={1}
            total={1}
            onAnswer={handleSegmento}
          />
        )}

        {fase === FASES.PREGUNTAS && (
          <PreguntaScreen
            pregunta={preguntas[preguntaIndex]}
            numero={preguntaIndex + 1}
            total={preguntas.length}
            onAnswer={handleAnswer}
          />
        )}

        {fase === FASES.CAPTURA && <CapturaDatos onSubmit={handleCaptura} />}

        {fase === FASES.TRANSICION && <PantallaTransicion onComplete={handleTransicionComplete} />}

        {fase === FASES.RESULTADO && resultado && (
          <PantallaResultado resultado={resultado} percentil={percentil} />
        )}
      </main>
      <Footer />
    </>
  )
}
```

Note: `handleSegmento` reuses `PreguntaScreen` with `valor` set to the
string `'junior'`/`'senior'` instead of a number — `PreguntaScreen` treats
`opcion.valor` as an opaque value passed straight to `onAnswer`, so this
works without modifying that component.

- [ ] **Step 8: Add the route in `src/App.jsx`**

Find:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home.jsx'

const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const ProgramaPage = lazy(() => import('./pages/ProgramaPage.jsx'))

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ minHeight: '100vh' }}/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/programas/:slug" element={<ProgramaPage />} />
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

- [ ] **Step 9: Run the build to verify nothing broke**

Run: `npm run build`

Expected: succeeds, emits a new `DiagnosticoProfesionalesPage-*.js` chunk
(lazy-loaded, same pattern as `ProgramaPage-*.js`), no new warnings.

- [ ] **Step 10: Commit**

```bash
git add src/components/diagnostico/ src/pages/DiagnosticoProfesionalesPage.jsx src/App.jsx src/lib/utm.js
git commit -m "feat(diagnostico): build the Diagnóstico Profesionales quiz UI and route"
```

---

### Task 5: Final wiring verification

**Files:**
- None (verification only).

**Interfaces:**
- Consumes: nothing new — this task verifies Tasks 1–4 together.

- [ ] **Step 1: Run the full test suite**

Run: `npm test`

Expected: **44 tests pass, 0 fail.** Breakdown: subsystem 3 left 10 tests
in `test/lead.test.js` and 13 in `test/lead-notify.test.js`. Task 2 adds 1
new test to `lead-notify.test.js` (14 total) and updates 1 existing test
in place (no count change from the update itself). Task 1 adds 14 in
`test/diagnosticoProfesionales.test.js`. Task 3 adds 6 in
`test/diagnostico-stats.test.js`. Total: `10 + 14 + 14 + 6 = 44`.

- [ ] **Step 2: Run the build**

Run: `npm run build`

Expected: succeeds cleanly.

- [ ] **Step 3: Grep-verify the old `resultado` field is gone from the diagnóstico-profesionales path**

Run: `grep -rn "data.resultado" api/_lib/lead-notify.js`

Expected: no matches for the `bbs-diagnostico-profesionales` case (the
`bbs-diagnostico-empresas` case below it still legitimately uses
`data.resultado` — that's untouched, expected, out of scope).

- [ ] **Step 4: Manual browser walkthrough**

Using a local dev server, visit `/diagnostico/profesionales` and:

1. Complete the **junior** branch (choose "Menos de 5 años" at
   segmentation) picking all-lowest-score answers (option a on every
   question) — confirm the result screen shows "Techo de cristal activo",
   score `0/21`, and links to `/programas/ia-nuevos-profesionales`.
2. Repeat picking all-highest-score answers (option d everywhere) —
   confirm "Liderando el cambio", score `21/21`.
3. Complete the **senior** branch (choose "5 años o más") with
   all-lowest answers — confirm "Experiencia en riesgo de invisibilidad",
   score `0/24`, links to `/programas/ia-profesionales-senior`.
4. Repeat picking all-highest answers — confirm "Liderando la
   multiplicación", score `24/24`.
5. On any completed run, check the Network tab: confirm a `POST
   /api/lead` fired with `form: 'bbs-diagnostico-profesionales'` and the
   full `data` object from §8 of the spec, and a `GET
   /api/diagnostico-stats?tipo=profesionales&segmento=...&score=...`
   fired in parallel. Both will fail locally (no `GOOGLE_SHEET_ID`/
   `BREVO_API_KEY` in local dev) — confirm the page does **not** crash or
   block on either failure; the result screen still renders fully, with
   the "eres de los primeros" fallback message where the percentile would
   go.
6. Confirm mobile viewport (375px): question buttons wrap without
   overflow, progress bar and dimension bars render correctly.

- [ ] **Step 5: Note for Eddie — update the Google Sheet header row**

This is not a code step — flag it explicitly in the task report. The
"Diagnóstico Profesionales" tab's header row currently reads `nombre,
email, whatsapp, resultado, pagina_origen` (created manually before this
plan existed). It needs to become `timestamp, nombre, email, whatsapp,
segmento, score, scoreMax, nivel, pagina_origen` (§8 of the spec) to match
what this code now writes — otherwise real submissions will land in the
wrong columns relative to the header labels once deployed. This requires
editing the live Google Sheet directly (not a repo file) — out of scope
for an implementer subagent to do blind; the controller should do this
itself before/alongside deploy, the same way it created the original
header rows.

- [ ] **Step 6: Commit** (only if any fix was needed during verification;
  otherwise this task produces no commit of its own — record the fully
  clean verification in the task report)
