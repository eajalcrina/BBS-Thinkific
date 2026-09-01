# Subpáginas de Programa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the 6 `/programas/<slug>` subpages (a data-driven template, not 6 duplicated files), with the revised pricing (0% off live / 30% off reserve, USD shown informationally) and the 3-CTA hierarchy (payment / inline enrollment form / WhatsApp) agreed with Eddie.

**Architecture:** One route `/programas/:slug` renders `src/pages/ProgramaPage.jsx`, which looks up the slug in `src/data/programas.js` and composes 7 focused section components from `src/components/programa/`. The payment CTA's fallback logic (POST `/api/lead` when no Mercado Pago link exists yet) lives in one shared hook, `usePaymentCta`, consumed by both the inline CTA block and the floating bar so the behavior can't drift between the two.

**Tech Stack:** React 18, React Router 7, Framer Motion — same as the rest of the repo, no new dependencies.

## Global Constraints

- All copy is verbatim from `BBS_Copy_Subpaginas_Programas.md` and `BBS_Programas_Contenido_Consolidado.md`, **except** the CTA copy and pricing, which Eddie revised live in this conversation (see below) — those revisions are what's correct, not the source document's original text.
- Pricing: `IA para Nuevos Profesionales` and `Construcción de Marcas Regenerativas` are `live` — **no discount**, list price only. The other 4 are `reserve` — **30% off** (not 50%). Exact discounted prices: S/349 (IA Profesionales Senior), S/419 (Negocios Regenerativos), S/559 (Economía Circular), S/699 (Capital de Impacto).
- USD shown next to every S/ price is informational only (never used for the actual charge): S/297→USD89, S/597→USD178 (both live programs, no discount so this is also the "final" price), S/497→USD148 (list) / S/349→USD104 (discounted), S/597→USD178 (list) / S/419→USD125 (discounted), S/797→USD238 (list) / S/559→USD167 (discounted), S/997→USD298 (list) / S/699→USD209 (discounted).
- 3 CTAs per program, with a deliberate visual hierarchy — **not 3 equal-weight buttons**: payment (primary, solid amber `fro-btn-amber`) > "Inscríbete" (secondary, outline, expands an inline form with nombre/correo/whatsapp — no modal, no page change) > WhatsApp (tertiary, icon + text only, no button chrome).
- WhatsApp number: `51974620309` (Peru country code + the number Eddie gave, `+51 974620309`, digits only per the `wa.me` URL format). Message per program: `Hola, me interesa el curso <título del programa>`, URL-encoded.
- The payment button is a `<button>`, not an `<a>`. If `mercadopagoUrl` is `null` (true for all 6 programs today — subsystem 3 will fill these in later), clicking it `POST`s to `/api/lead` with `form: "bbs-enroll"` and `intento_pago: true`, then shows "Estamos activando los pagos — dejamos tu registro guardado, te contactamos para completar la inscripción." instead of doing nothing. Same graceful-failure pattern as the footer newsletter if that POST also fails (endpoint doesn't exist yet): visible error, no crash.
- `/api/lead` does not exist yet (subsystem 3) — every fetch to it is expected to fail in this environment; that failure must never crash the page.
- Nav.jsx's `#programas`/`#comunidad`/`#diagnostico` links become `/#programas`/`/#comunidad`/`/#diagnostico` (bug fix — they're dead outside `/`).
- Reuse the existing visual system exactly: Syne/Inter/Barlow Condensed, `--fro-*` tokens, `.fro-card`, `.fro-btn`, `.fro-chip-outline`, `.fro-eyebrow`, `.fro-on-light` — no new CSS tokens or components beyond what's specified in the tasks below.
- `npm run build` must succeed after every task.
- Invalid slug → redirect to `/#programas` (no dedicated 404 page in this plan).
- The `rizoma` cross-reference block (ThousandFold) renders only for `marcas-regenerativas` — every other program has `rizoma: null`.

---

### Task 1: Program data file

**Files:**
- Create: `src/data/programas.js`

**Interfaces:**
- Produces: `export const PROGRAMAS` — an array of 6 objects, each with fields: `slug`, `status` (`'live'|'reserve'`), `titulo`, `audiencia`, `notaCorta`, `notaExtendida`, `dirigidoA`, `dirigidoAItems` (optional array, only `negocios-regenerativos`), `objetivo`, `temasClave` (array of 4 strings), `outcome`, `bonus`, `precioRegular` (number), `precioRegularUsd` (number), `precioDescuento` (number or `null`), `precioDescuentoUsd` (number or `null`), `mercadopagoUrl` (always `null` in this plan), `rizoma` (object `{texto, cta, href}` or `null`), `noEsParaTi` (array of 3 strings). All later tasks read from this array — the field names above are exact and used verbatim by every component in Tasks 3-8.

- [ ] **Step 1: Create `src/data/programas.js` with the exact content below**

```js
export const PROGRAMAS = [
  {
    slug: 'ia-nuevos-profesionales',
    status: 'live',
    titulo: 'IA para Nuevos Profesionales',
    audiencia: 'Jóvenes profesionales',
    notaCorta: 'La IA no va a reemplazar a los jóvenes profesionales que la dominen con criterio propio. Va a reemplazar a los que crecieron sin desarrollarlo, a los que nunca tuvieron la oportunidad de equivocarse y de enfrentar la complejidad real. Este programa existe para que no seas parte de esa generación, sino de la que lidera el cambio.',
    notaExtendida: 'Uno de los desafíos más críticos que veo en estos tiempos no es que la IA vaya a reducir empleos. Eso, la verdad, es debatible. El problema real es lo que la masificación de la IA le está haciendo al desarrollo de los jóvenes profesionales. Están perdiendo la oportunidad de enfrentarse al mundo real y de construir, con tiempo, con error y con dolor, el criterio y la experiencia que hoy son indispensables para sacarle provecho de verdad a la inteligencia artificial. Los jóvenes de hoy están creciendo bajo un nuevo techo de cristal: el conocimiento de la IA. No se están exponiendo a la complejidad, a lo irracional, a lo absurdo del mundo real. Están creciendo bajo una especie de ley absoluta. Y eso es un riesgo altísimo, porque van a terminar sin nada nuevo que aportarle a la IA. Van a ser liderados por ella en vez de dirigirla. La brecha que se viene no va a ser entre quienes usan IA y quienes no. Va a ser entre quienes la dominan desde el criterio y la experiencia, y quienes simplemente ejecutan lo que un agente les indica. Formar a esta generación con criterio propio, antes de que ese techo de cristal se vuelva permanente, es justo lo que buscamos con este programa: que los nuevos líderes de la bioeconomía regional no terminen siendo liderados por la IA, sino que la lideren ellos.',
    dirigidoA: 'Jóvenes profesionales y talento de alto potencial que buscan liderar la próxima generación de industrias de bioeconomía en la región.',
    dirigidoAItems: null,
    objetivo: 'Prepararlos para competir y destacar en el mundo corporativo, combinando IA, pensamiento crítico y pensamiento sistémico como ventaja diferencial.',
    temasClave: [
      'Uso estratégico de IA para pensamiento crítico y toma de decisiones bajo incertidumbre',
      'Pensamiento sistémico aplicado a problemas complejos de negocio e industria bio',
      'Posicionamiento profesional y marca personal en la era de la IA',
      'Herramientas prácticas de productividad y análisis con IA generativa (Claude, entre otras)',
    ],
    outcome: 'Sales con un portafolio de casos resueltos con IA y mayor claridad y confianza para posicionarte como líder emergente en bioeconomía.',
    bonus: 'Solo para los mejores participantes de la cohorte: simulación de entrevista de trabajo, para refinar tu técnica de cara a procesos de selección reales.',
    precioRegular: 297,
    precioRegularUsd: 89,
    precioDescuento: null,
    precioDescuentoUsd: null,
    mercadopagoUrl: null,
    rizoma: null,
    noEsParaTi: [
      'Buscas un curso técnico de programación o ingeniería de IA (este programa es de criterio y aplicación estratégica, no de código).',
      'Ya lideras equipos y necesitas multiplicar experiencia senior, no construir criterio desde cero (para eso está IA para Profesionales Senior).',
      'Esperas un certificado más, sin intención real de aplicar lo aprendido en tu día a día.',
    ],
  },
  {
    slug: 'ia-profesionales-senior',
    status: 'reserve',
    titulo: 'IA para Profesionales Senior',
    audiencia: 'Profesionales senior',
    notaCorta: 'Tu experiencia no está en riesgo por la IA. Está en riesgo si nadie aprende a multiplicarla con ella. Y no es solo tu problema: las empresas de IA pagan millones por conocimiento humano real, mientras muchas compañías de la región dejan de lado justo a quienes lo tienen. Este programa es para profesionales senior que quieren liderar ese cambio, no quedar fuera de él.',
    notaExtendida: 'Hay una conversación que casi nadie está teniendo, y le toca directamente a los profesionales senior, aunque en realidad es un problema de dos lados. Del lado del profesional: años de criterio, de decisiones tomadas bajo presión real, de intuición construida a punta de aciertos y errores, corren el riesgo de volverse invisibles frente a alguien más joven que "sabe usar la herramienta" pero no tiene nada más que aportar. Pero del lado de las empresas el problema es todavía más grave, y casi nadie lo está diciendo. Estamos en una época donde las empresas de inteligencia artificial pagan millones por experiencia humana real, por ese conocimiento tácito que sirve para diseñar, entrenar y customizar modelos de IA que hagan un negocio verdaderamente escalable. Y mientras eso pasa afuera, muchas empresas de la región se están dando el lujo de dejar de lado justo a los profesionales senior que tienen ese conocimiento. El que hoy vale más que nunca, y que ninguna IA puede fabricar desde cero. No se trata de aprender IA como si fueran principiantes. Se trata de multiplicar lo que ya saben, y de que las empresas entiendan que ese conocimiento senior es hoy un activo estratégico, no un costo que hay que reducir. Este programa es exactamente para eso: que la experiencia deje de sentirse amenazada y empiece a sentirse multiplicada, tanto para quien la tiene como para la empresa que sabe aprovecharla.',
    dirigidoA: 'Profesionales senior con trayectoria consolidada que buscan mantenerse competitivos en un mundo tomado por la IA.',
    dirigidoAItems: null,
    objetivo: 'Multiplicar el impacto de tu experiencia y criterio ya construido, usando IA como amplificador, no como reemplazo.',
    temasClave: [
      'Cómo amplificar el juicio experto con IA sin perder criterio propio',
      'Rediseño de procesos de decisión y liderazgo asistidos por IA',
      'Casos de industria bio/regenerativa aplicando IA a nivel estratégico',
      'Herramientas de productividad ejecutiva con IA generativa',
    ],
    outcome: 'Sales con un perfil profesional actualizado y competitivo frente a la disrupción de IA, con herramientas concretas de aplicación inmediata.',
    bonus: 'Solo para los mejores participantes de la cohorte: evaluación de competencias y potencial (tipo DISC, nivel avanzado), orientada a outplacement o pivote de carrera, para ayudarte a rediseñar tu perfil hacia nuevas oportunidades.',
    precioRegular: 497,
    precioRegularUsd: 148,
    precioDescuento: 349,
    precioDescuentoUsd: 104,
    mercadopagoUrl: null,
    rizoma: null,
    noEsParaTi: [
      'Recién empiezas tu carrera y todavía estás construyendo el criterio y la experiencia que este programa busca multiplicar (para eso está IA para Nuevos Profesionales).',
      'Buscas un tutorial paso a paso de herramientas de IA, sin conexión a decisiones estratégicas reales.',
      'No estás dispuesto a cuestionar procesos que llevas años haciendo de la misma forma.',
    ],
  },
  {
    slug: 'negocios-regenerativos',
    status: 'reserve',
    titulo: 'Construcción de Negocios Regenerativos',
    audiencia: 'Emprendimientos y pymes',
    notaCorta: 'Tener buena intención regenerativa no basta. Sin modelo económico y operativo sólido, el propósito no escala, se queda en discurso. Este programa es la ingeniería detrás del negocio que sí funciona: rentable, escalable, y que regenera en vez de extraer.',
    notaExtendida: 'Llevamos siglos operando como la despensa del mundo, exportando biomasa y materia prima a cambio de poco valor, mientras el valor real se captura en laboratorios y mercados extranjeros. Lo que más me inquieta no es la extracción en sí. Es que seguimos formando emprendedores con las mismas herramientas que sostienen ese modelo, sin enseñarles a diseñar negocios que capturen valor y protejan el territorio al mismo tiempo. "Regenerativo" se volvió una palabra de moda, usada por marcas y proyectos con la intención correcta pero sin la ingeniería de negocio detrás. Y sin ingeniería de negocio, la buena intención no escala. Se queda en discurso, en pitch, en principios que nunca llegan a un estado financiero. Este programa no es sobre inspiración. Es sobre modelo económico, modelo operativo, gobernanza: la parte dura que convierte un propósito regenerativo en un negocio que sobrevive, factura y crece. Porque si no diseñamos negocios rentables que regeneren en vez de extraer, vamos a seguir exportando biomasa barata y comprando de vuelta, a precio alto, el valor que otros le sacaron a nuestros propios recursos.',
    dirigidoA: 'Emprendedores, pymes y dueños de bionegocios, en tres momentos distintos que conviven en la misma cohorte:',
    dirigidoAItems: [
      'Quien quiere construir su negocio regenerativo desde cero.',
      'Quien ya tiene un negocio con intención de impacto, pero necesita transitarlo hacia un modelo verdaderamente regenerativo.',
      'Quien tiene un negocio de impacto en problemas (contable, tributario, financiero u operativo) y necesita reconstruir sus fundamentos para salir adelante.',
    ],
    objetivo: 'Diseñar y escalar negocios regenerativos con un modelo económico y operativo sólido y rentable.',
    temasClave: [
      'Diseño de modelo económico regenerativo (unit economics, rentabilidad + impacto)',
      'Modelo operativo y gobernanza para escalar sin perder propósito',
      'Certificaciones y estándares de sostenibilidad aplicables a LATAM',
      'Uso de IA para modelar escenarios financieros y de crecimiento',
    ],
    outcome: 'Sales con un modelo de negocio estructurado y listo para operar o escalar.',
    bonus: 'Solo para los mejores participantes de la cohorte (sesión compartida con Construcción de Marcas Regenerativas): presentación ante la red de inversionistas y empresarios aliados de BBS.',
    precioRegular: 597,
    precioRegularUsd: 178,
    precioDescuento: 419,
    precioDescuentoUsd: 125,
    mercadopagoUrl: null,
    rizoma: null,
    noEsParaTi: [
      'Ya tienes un modelo de negocio validado y sólo buscas capital (para eso está Capital de Impacto).',
      'Lo que necesitas es construir identidad de marca y estrategia comercial, no el modelo económico (para eso está Construcción de Marcas Regenerativas).',
      'Todavía no tienes ni estás formando un negocio real, solo una idea sin desarrollar.',
    ],
  },
  {
    slug: 'marcas-regenerativas',
    status: 'live',
    titulo: 'Construcción de Marcas Regenerativas',
    audiencia: 'Emprendimientos y pymes',
    notaCorta: 'Tener una causa real no basta si tu marca suena igual a las cien que dicen tener lo mismo. El problema eco-genérico le cuesta mercado a proyectos que sí merecen ganarlo. Este programa es para dejar de sonar genérico y empezar a sonar como lo que realmente eres, y vender más por eso.',
    notaExtendida: 'Hay algo que veo repetirse una y otra vez en la región: marcas con propósito real, con impacto genuino, que se ven y se sienten exactamente igual a cualquier otra marca "verde" del mercado. Le llamo el problema eco-genérico. El mismo verde, la misma hoja, el mismo lenguaje de sostenibilidad que ya nadie logra diferenciar. Y el costo de eso no es solo estético. Esas marcas, con productos y modelos que sí merecen ganar mercado, terminan compitiendo por atención con un discurso que el consumidor ya aprendió a ignorar. No basta con tener una causa real si nadie logra distinguirla de las cien causas que dicen tener lo mismo. Una marca regenerativa necesita una identidad tan diferenciada como su propuesta de valor: visual, narrativa, comercial. Y necesita traducir esa diferencia en algo que el mercado sí perciba y esté dispuesto a pagar. Este programa existe para que esas marcas dejen de sonar genéricas y empiecen a sonar como lo que realmente son: distintas, porque su modelo de negocio también lo es.',
    dirigidoA: 'Emprendedores y pymes que necesitan una marca con propuesta de valor real, no "eco-genérica".',
    dirigidoAItems: null,
    objetivo: 'Construir propuesta de valor, identidad y estrategia comercial diferenciada para marcas de impacto en LATAM.',
    temasClave: [
      'Propuesta de valor diferenciada, resolviendo el problema "eco-genérico"',
      'Identidad visual y narrativa de marca regenerativa (metodología RIZOMA)',
      'Estrategia de acceso a mercado y comercialización',
      'Uso de IA para generación de contenido y validación de marca',
    ],
    outcome: 'Sales con una marca con identidad y estrategia comercial definida, lista para lanzar o reposicionar.',
    bonus: 'Solo para los mejores participantes de la cohorte (sesión compartida con Construcción de Negocios Regenerativos): presentación ante la red de inversionistas y empresarios aliados de BBS.',
    precioRegular: 597,
    precioRegularUsd: 178,
    precioDescuento: null,
    precioDescuentoUsd: null,
    mercadopagoUrl: null,
    rizoma: {
      texto: 'Antes de inscribirte, puedes conocer en qué nivel está tu marca hoy con el Diagnóstico RIZOMA, la herramienta gratuita de ThousandFold (el proyecto de branding regenerativo de Redesign Lab, dueño del framework RIZOMA que se usa en este programa). 24 preguntas, ~8 minutos: descubre tu arquetipo de marca, tu score en las 6 capas RIZOMA, y las tres brechas prioritarias que separan a tu marca del precio que realmente vale.',
      cta: 'Hacer el Diagnóstico RIZOMA →',
      href: 'https://www.thousandfold.la/diagnostico',
    },
    noEsParaTi: [
      'Todavía no tienes claridad sobre tu modelo de negocio (para eso está Construcción de Negocios Regenerativos, primero).',
      'Buscas que una agencia te haga el trabajo, no aprender a construirlo tú mismo.',
      'Tu negocio no tiene ninguna relación con sostenibilidad, impacto o regeneración real.',
    ],
  },
  {
    slug: 'economia-circular-industria',
    status: 'reserve',
    titulo: 'Economía Circular para la Industria',
    audiencia: 'Gran industria',
    notaCorta: 'No lo hacemos porque lo pida un reporte a un índice de sostenibilidad, eso es relativo y cambia. Lo hacemos porque hay industrias que ya no pueden darse el lujo de desperdiciar materia prima cada vez más escasa, ni de seguir tratando el riesgo social con cursos genéricos en vez de con negocio real. Este programa es aplicado, no conceptual.',
    notaExtendida: 'Sí, los estándares internacionales lo piden. Los reportes a índices como el Dow Jones Sustainability, entre otros, cada vez exigen más de la industria pesada. Pero esa no es la razón real por la que hacemos este programa, porque esa exigencia es relativa y cambia todo el tiempo, depende de quién audita, de qué mercado, de qué momento político. La razón real es mucho más concreta. Hay industrias que cada día tienen menos margen para desperdiciar. Una pesquera no se puede dar el lujo de no maximizar el aprovechamiento de la materia prima de la anchoveta, cuando todavía hay muchísimo valor sin capturar en lo que hoy se descarta como residuo. La minería y la petrolera cargan con altos riesgos sociales que se siguen abordando con cursos genéricos de empleabilidad, en vez de con modelos de negocio circular que podrían generar autonomía económica real en las comunidades y convertirlas de fuente de riesgo social en socios de la cadena de valor: proveedores, aliados, hasta clientes. Esto no es sobre cumplir un reporte para accionistas. Es sobre ahorro real, sobre no perder materia prima que cada vez es más escasa y más valiosa (agua, pesca, suelo), y sobre generar nuevos ingresos que, de paso, transforman una relación de riesgo social en una relación económica de beneficio mutuo. Este programa es un roadmap técnico y aplicado, no una introducción conceptual a la sostenibilidad.',
    dirigidoA: 'Profesionales y equipos de industrias intensivas en recursos: pesquera, agrícola, acuícola, minería, petróleo.',
    dirigidoAItems: null,
    objetivo: 'Llevar la economía circular al más alto nivel operativo y regulatorio dentro de tu industria.',
    temasClave: [
      'Marcos de economía circular aplicados a operaciones industriales (Nordic Innovation Toolkit, ISO 59000, indicadores WBCSD)',
      'Rediseño de procesos y cadenas de valor para reducir desperdicio y maximizar reuso',
      'Casos reales de industrias extractivas/pesadas en transición circular',
      'Uso de IA para modelar y medir indicadores de circularidad',
    ],
    outcome: 'Sales con un roadmap técnico aplicable a tu operación, alineado a estándares internacionales.',
    bonus: 'Solo para los mejores participantes de la cohorte: sesión de evaluación de proyectos con gerentes y expertos de industria.',
    precioRegular: 797,
    precioRegularUsd: 238,
    precioDescuento: 559,
    precioDescuentoUsd: 167,
    mercadopagoUrl: null,
    rizoma: null,
    noEsParaTi: [
      'Tu empresa no pertenece a una industria intensiva en recursos naturales (pesca, agro, acuicultura, minería, energía).',
      'Buscas una introducción conceptual a la sostenibilidad, no un roadmap técnico aplicado a operaciones reales.',
      'No tienes decisión ni influencia sobre procesos operativos dentro de tu empresa.',
    ],
  },
  {
    slug: 'capital-de-impacto',
    status: 'reserve',
    titulo: 'Capital de Impacto',
    audiencia: 'Empresas grandes y pymes',
    notaCorta: 'El capital no huye de la región por falta de buenos proyectos. Huye por falta de preparación para levantarlo, de saber hablar el idioma que un inversionista necesita escuchar. Aplica igual para la empresa grande que financia su sostenibilidad y para la pyme que financia su negocio. Este programa cierra esa brecha.',
    notaExtendida: 'El capital huye de la región. No porque falte oportunidad, sobra, sino porque falta valor agregado claro y marcos de gobernanza que un inversionista pueda entender y en los que pueda confiar. He visto proyectos con impacto real, con modelos sólidos, quedarse sin financiamiento simplemente porque quien lo lideraba no sabía hablar el idioma que un inversionista de impacto necesita escuchar: estructura de capital, narrativa financiera, gobernanza, data room. No es un problema del proyecto. Es un problema de traducción. Y esa brecha es la que más me duele, porque significa que perdemos negocios que sí merecían escalar, no por falta de mérito, sino por falta de preparación. Este programa no es una introducción teórica a las finanzas de impacto. Es la preparación directa para levantar capital, con feedback real de inversionistas de nuestra red para quienes logren armar el mejor caso de inversión. Aplica tanto para la empresa grande que necesita financiar su iniciativa de sostenibilidad, como para la pyme o el emprendimiento que necesita financiar su propio negocio. El idioma del capital es el mismo, solo cambia la escala. La diferencia entre un buen proyecto y un proyecto financiado casi nunca es el proyecto. Es la preparación.',
    dirigidoA: 'Empresas grandes que buscan financiar iniciativas de sostenibilidad, y pymes/emprendimientos que buscan financiar su propio negocio.',
    dirigidoAItems: null,
    objetivo: 'Dejarte listo para levantar capital de impacto, no solo entender el tema, sino ejecutarlo.',
    temasClave: [
      'Diagnóstico del tipo de capital aplicable a tu caso (donación, deuda blanda, equity, blended finance)',
      'Construcción del caso de inversión: modelo financiero + narrativa de impacto',
      'Materiales de levantamiento: pitch deck, one-pager, data room básico',
      'Uso de IA para modelar escenarios financieros y afinar narrativa de impacto',
    ],
    outcome: 'Sales con pitch y materiales de levantamiento listos para presentar a inversionistas reales.',
    bonus: 'Solo para los mejores participantes de la cohorte: panel con inversionistas de la red BBS, presentación y feedback directo sobre tu propuesta.',
    precioRegular: 997,
    precioRegularUsd: 298,
    precioDescuento: 699,
    precioDescuentoUsd: 209,
    mercadopagoUrl: null,
    rizoma: null,
    noEsParaTi: [
      'Todavía no tienes un modelo de negocio o proyecto estructurado (para eso está Construcción de Negocios Regenerativos, primero).',
      'Buscas asesoría legal de estructuración societaria, no preparación para levantar capital.',
      'No estás dispuesto a exponer tu proyecto a feedback directo y honesto de inversionistas reales.',
    ],
  },
]
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: succeeds (the file is unused so far — just added, nothing imports it yet).

- [ ] **Step 3: Verify the array shape**

Run: `node -e "const {PROGRAMAS} = await import('./src/data/programas.js'); console.log(PROGRAMAS.length, PROGRAMAS.map(p=>p.slug).join(','))"`
Expected: `6 ia-nuevos-profesionales,ia-profesionales-senior,negocios-regenerativos,marcas-regenerativas,economia-circular-industria,capital-de-impacto`

- [ ] **Step 4: Commit**

```bash
git add src/data/programas.js
git commit -m "feat: add program data for the 6 subpages

Verbatim from BBS_Copy_Subpaginas_Programas.md and
BBS_Programas_Contenido_Consolidado.md, with the revised pricing
(0% off live, 30% off reserve) and mercadopagoUrl left null pending
subsystem 3.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 2: Fix Nav.jsx anchor links

**Files:**
- Modify: `src/components/Nav.jsx`

**Interfaces:** none — this only changes 3 string literals, no signature changes.

- [ ] **Step 1: Update the `LINKS` array**

In `src/components/Nav.jsx`, find:

```jsx
const LINKS = [
  ['#programas',   'Programas'],
  ['#comunidad',   'Comunidad'],
  ['#diagnostico', 'Diagnóstico'],
]
```

Replace with:

```jsx
const LINKS = [
  ['/#programas',   'Programas'],
  ['/#comunidad',   'Comunidad'],
  ['/#diagnostico', 'Diagnóstico'],
]
```

- [ ] **Step 2: Fix the `trackCta` call that derives an id from the href**

Find (inside the desktop `<a>` map):

```jsx
onClick={() => trackCta(`nav_${h.slice(1)}`, 'home_nav', h)}
```

`h.slice(1)` on `/#programas` now produces `#programas` (wrong — it used to strip the leading `#`, now the leading char is `/`). Replace with:

```jsx
onClick={() => trackCta(`nav_${h.replace(/^\/?#/, '')}`, 'home_nav', h)}
```

This strips an optional leading `/` followed by `#`, so `nav_programas` etc. are unchanged either way.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Verify the new hrefs**

Run: `grep -n "LINKS = \[" -A4 src/components/Nav.jsx`
Expected: shows the 3 links starting with `/#`.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "fix: Nav anchor links work from any route, not just /

'#programas' etc. were dead outside the home page — no route change,
just an in-page anchor that only meant something if you were already
on '/'. '/#programas' always navigates to the home page and scrolls
there, regardless of which page you're on. Becomes load-bearing now
that 6 more pages exist where this bug was reachable.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 3: Shared payment hook + the 3-CTA block

**Files:**
- Create: `src/components/programa/usePaymentCta.js`
- Create: `src/components/programa/ProgramaCTA.jsx`
- Modify: `src/lib/utm.js` (add `CAMPAIGNS.PROGRAMA_WHATSAPP`)
- Modify: `src/index.css` (add `.fro-on-light .fro-field` — see Step 4)

**Interfaces:**
- Consumes: `PROGRAMAS` shape from Task 1 (`programa.slug`, `.status`, `.precioRegular`, `.precioRegularUsd`, `.precioDescuento`, `.precioDescuentoUsd`, `.mercadopagoUrl`, `.titulo`); `trackCta`, `trackForm` from `../../lib/analytics.js`; `withUtm`, `CAMPAIGNS` from `../../lib/utm.js`.
- Produces: `usePaymentCta(programa)` → `{ label: string, status: 'idle'|'loading'|'sent'|'error', handleClick: () => Promise<void> }`, consumed by Task 3's `ProgramaCTA` and Task 7's `FloatingCtaBar`. `ProgramaCTA` default export takes props `{ programa, dark = false }` and renders the 3 CTAs — consumed by Task 4 (`ProgramaHero`) and Task 7 (`PrecioRepetido`).

- [ ] **Step 1: Add the `PROGRAMA_WHATSAPP` campaign to `src/lib/utm.js`**

In `src/lib/utm.js`, find:

```js
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL: 'playbook_digital',
  PLAYBOOK_IMPRESO: 'playbook_impreso',
  COMMUNITY:        'community_whatsapp',
}
```

Replace with:

```js
export const CAMPAIGNS = {
  PLAYBOOK_DIGITAL:   'playbook_digital',
  PLAYBOOK_IMPRESO:   'playbook_impreso',
  COMMUNITY:          'community_whatsapp',
  PROGRAMA_WHATSAPP:  'programa_whatsapp',
}
```

- [ ] **Step 2: Create `src/components/programa/usePaymentCta.js`**

```js
import { useState } from 'react'
import { trackCta } from '../../lib/analytics.js'

export function usePaymentCta(programa) {
  const [status, setStatus] = useState('idle') // idle | loading | sent | error

  const label = programa.status === 'live'
    ? `Pagar ahora — S/ ${programa.precioRegular} (~USD ${programa.precioRegularUsd})`
    : `Reserva tu cupo con 30% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`

  async function handleClick() {
    trackCta(`programa_${programa.slug}_pagar`, 'programa_cta', programa.mercadopagoUrl || 'pending')

    if (programa.mercadopagoUrl) {
      window.location.href = programa.mercadopagoUrl
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-enroll',
          programa: programa.slug,
          intento_pago: true,
          pagina_origen: window.location.pathname,
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return { label, status, handleClick }
}
```

- [ ] **Step 3: Create `src/components/programa/ProgramaCTA.jsx`**

```jsx
import { useState } from 'react'
import { trackCta, trackForm } from '../../lib/analytics.js'
import { withUtm, CAMPAIGNS } from '../../lib/utm.js'
import { usePaymentCta } from './usePaymentCta.js'

function buildWhatsAppUrl(titulo) {
  const msg = encodeURIComponent(`Hola, me interesa el curso ${titulo}`)
  const base = `https://wa.me/51974620309?text=${msg}`
  return withUtm(base, { campaign: CAMPAIGNS.PROGRAMA_WHATSAPP, content: titulo })
}

function InlineEnrollForm({ programa, dark }) {
  const [values, setValues] = useState({ nombre: '', email: '', whatsapp: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    trackForm('bbs-enroll', 'submit')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'bbs-enroll',
          programa: programa.slug,
          nombre: values.nombre,
          email: values.email,
          whatsapp: values.whatsapp,
          pagina_origen: window.location.pathname,
        }),
      })
      if (!res.ok) throw new Error('request_failed')
      setStatus('success')
      trackForm('bbs-enroll', 'success')
    } catch {
      setStatus('error')
      trackForm('bbs-enroll', 'error')
    }
  }

  if (status === 'success') {
    return (
      <p className="fro-sm" style={{ color: dark ? 'var(--fro-amber)' : 'var(--fro-ink)', marginTop: '0.9rem' }}>
        Listo, quedaste registrado. Te contactamos pronto.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '1rem', maxWidth: 360 }}>
      <input required type="text" placeholder="Tu nombre" value={values.nombre}
        onChange={e => setValues(v => ({ ...v, nombre: e.target.value }))} className="fro-field" />
      <input required type="email" placeholder="tu@correo.com" value={values.email}
        onChange={e => setValues(v => ({ ...v, email: e.target.value }))} className="fro-field" />
      <input required type="tel" placeholder="WhatsApp (con código de país)" value={values.whatsapp}
        onChange={e => setValues(v => ({ ...v, whatsapp: e.target.value }))} className="fro-field" />
      <button type="submit" disabled={status === 'loading'} className="fro-btn fro-btn-amber" style={{ marginTop: '0.2rem' }}>
        {status === 'loading' ? 'Enviando…' : 'Confirmar registro'}
      </button>
      {status === 'error' && <p className="fro-sm" style={{ color: 'var(--fro-danger)' }}>No se pudo enviar, intenta de nuevo.</p>}
    </form>
  )
}

export default function ProgramaCTA({ programa, dark = false }) {
  const [showForm, setShowForm] = useState(false)
  const { label, status, handleClick } = usePaymentCta(programa)

  const outlineColor = dark ? 'var(--fro-line-2)' : 'var(--fro-ink)'
  const outlineText = dark ? 'var(--fro-text)' : 'var(--fro-ink)'
  const tertiaryColor = dark ? 'var(--fro-text-2)' : 'var(--fro-ink-2)'

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button type="button" onClick={handleClick} disabled={status === 'loading'} className="fro-btn fro-btn-amber fro-btn-lg">
          {status === 'loading' ? 'Un momento…' : label}
        </button>

        <button
          type="button"
          onClick={() => { setShowForm(v => !v); trackCta(`programa_${programa.slug}_inscribete`, 'programa_cta', 'form') }}
          className="fro-btn"
          style={{ border: `1.5px solid ${outlineColor}`, color: outlineText, background: 'transparent' }}
        >
          Inscríbete
        </button>

        <a
          href={buildWhatsAppUrl(programa.titulo)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackCta(`programa_${programa.slug}_whatsapp`, 'programa_cta', 'whatsapp')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.86rem', fontWeight: 600, color: tertiaryColor, textDecoration: 'none' }}
        >
          <span aria-hidden>💬</span> Escríbenos por WhatsApp
        </a>
      </div>

      {status === 'sent' && (
        <p className="fro-sm" style={{ marginTop: '0.8rem', color: dark ? 'var(--fro-amber)' : 'var(--fro-ink)' }}>
          Estamos activando los pagos — dejamos tu registro guardado, te contactamos para completar la inscripción.
        </p>
      )}
      {status === 'error' && (
        <p className="fro-sm" style={{ marginTop: '0.8rem', color: 'var(--fro-danger)' }}>No se pudo enviar, intenta de nuevo.</p>
      )}

      {showForm && <InlineEnrollForm programa={programa} dark={dark} />}
    </div>
  )
}
```

- [ ] **Step 4: Add a light-background variant of `.fro-field`**

`InlineEnrollForm` (inside `ProgramaCTA`) is reused both on the dark Hero (Task 4, `dark`) and the light "Precio" section (Task 7, `PrecioRepetido`, no `dark` prop). The existing `.fro-field` class in `src/index.css` is dark-only — white text (`color: var(--fro-text)`) on a near-transparent white background — illegible on a light/cream section. Add a light override.

In `src/index.css`, find the `.fro-on-light` block added for the home redesign (search for `.fro-on-light .fro-card {`) and add this right after it:

```css
.fro-on-light .fro-field {
  background: rgba(43,43,43,0.03);
  color: var(--fro-ink);
  border-color: var(--fro-ink-line);
}
.fro-on-light .fro-field::placeholder { color: var(--fro-ink-3); }
.fro-on-light .fro-field:focus { border-color: var(--fro-amber); background: rgba(255,200,0,0.06); box-shadow: 0 0 0 3px rgba(255,200,0,0.12); }
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: succeeds (both files are unused so far — nothing imports `ProgramaCTA` yet, that starts in Task 4).

- [ ] **Step 6: Commit**

```bash
git add src/lib/utm.js src/index.css src/components/programa/usePaymentCta.js src/components/programa/ProgramaCTA.jsx
git commit -m "feat: shared payment hook + 3-CTA block for program pages

usePaymentCta centralizes the payment button's fallback behavior
(POST /api/lead with intento_pago:true when mercadopagoUrl is null)
so it can't drift between the inline CTA block and the floating bar
that will consume it in Task 7. ProgramaCTA renders the 3-CTA
hierarchy Eddie asked for: payment (solid, primary) > Inscríbete
(outline, expands an inline nombre/correo/whatsapp form) > WhatsApp
(icon+text, wa.me link with a per-program pre-filled message).

Also adds .fro-on-light .fro-field: the existing .fro-field is
dark-only (white text), and the inline enrollment form is reused on
both a dark section (Hero) and a light one (PrecioRepetido, Task 7)
- without this override the form would be illegible there.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 4: ProgramaHero.jsx

**Files:**
- Create: `src/components/programa/ProgramaHero.jsx`

**Interfaces:**
- Consumes: `FadeIn` from `../FadeIn.jsx`; `ProgramaCTA` from `./ProgramaCTA.jsx` (Task 3); `programa` object shape from Task 1.
- Produces: `ProgramaHero` default export, takes `{ programa }`, renders the hero `<section>`.

- [ ] **Step 1: Create `src/components/programa/ProgramaHero.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'
import ProgramaCTA from './ProgramaCTA.jsx'

export default function ProgramaHero({ programa }) {
  return (
    <section className="fro-sec" style={{ paddingTop: '8rem', background: 'linear-gradient(160deg, var(--fro-bg) 0%, #131313 55%, var(--fro-bg-3) 100%)' }}>
      <div className="fro-wrap">
        <FadeIn>
          <div className="fro-chip" style={{ marginBottom: '1.6rem' }}>
            {programa.status === 'live' ? 'Disponible ahora' : 'Reserva tu cupo — cohorte Q3 2026'}
          </div>
        </FadeIn>
        <FadeIn delay={0.06}>
          <h1 className="fro-display" style={{ fontSize: 'clamp(2.1rem, 5vw, 3.6rem)', maxWidth: 820, marginBottom: '1.4rem' }}>
            {programa.titulo}
          </h1>
        </FadeIn>
        <FadeIn delay={0.12}>
          <p className="fro-lead" style={{ maxWidth: 720, marginBottom: '2rem', fontSize: '1.15rem' }}>
            {programa.notaCorta}
          </p>
        </FadeIn>
        <FadeIn delay={0.18}>
          <ProgramaCTA programa={programa} dark />
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: succeeds (still unused — wired into the page in Task 8).

- [ ] **Step 3: Commit**

```bash
git add src/components/programa/ProgramaHero.jsx
git commit -m "feat: add ProgramaHero section

Status badge, título, nota corta (verbatim), and the 3-CTA block in
its dark variant.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 5: FichaTecnica.jsx + BonusExclusivo.jsx

**Files:**
- Create: `src/components/programa/FichaTecnica.jsx`
- Create: `src/components/programa/BonusExclusivo.jsx`

**Interfaces:**
- Consumes: `FadeIn` from `../FadeIn.jsx`; `programa` object shape from Task 1 (`.notaExtendida`, `.dirigidoA`, `.dirigidoAItems`, `.objetivo`, `.temasClave`, `.outcome`, `.bonus`).
- Produces: `FichaTecnica` and `BonusExclusivo` default exports, each takes `{ programa }`.

- [ ] **Step 1: Create `src/components/programa/FichaTecnica.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'

export default function FichaTecnica({ programa }) {
  return (
    <section className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Por qué existe este programa</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 760, marginBottom: '3rem' }}>{programa.notaExtendida}</p>
        </FadeIn>

        <FadeIn delay={0.1}><div className="fro-eyebrow" style={{ marginBottom: '1.4rem' }}>Ficha técnica</div></FadeIn>

        <div className="ficha-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          <FadeIn delay={0.14}>
            <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Dirigido a</h3>
            <p className="fro-body">{programa.dirigidoA}</p>
            {programa.dirigidoAItems && (
              <ul className="fro-feat" style={{ marginTop: '0.7rem' }}>
                {programa.dirigidoAItems.map(t => <li key={t}>{t}</li>)}
              </ul>
            )}
          </FadeIn>
          <FadeIn delay={0.18}>
            <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Objetivo</h3>
            <p className="fro-body">{programa.objetivo}</p>
          </FadeIn>
        </div>

        <FadeIn delay={0.22}>
          <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Formato</h3>
          <p className="fro-body" style={{ marginBottom: '2rem' }}>1 mes · 4 sesiones sincrónicas de 1.5h vía Meet/Zoom · alta intensidad, enfoque aplicado.</p>
        </FadeIn>

        <FadeIn delay={0.26}>
          <h3 className="fro-h3" style={{ marginBottom: '0.8rem', fontSize: '1rem' }}>Temas clave</h3>
          <ul className="fro-feat" style={{ marginBottom: '2rem' }}>
            {programa.temasClave.map(t => <li key={t}>{t}</li>)}
          </ul>
        </FadeIn>

        <FadeIn delay={0.3}>
          <h3 className="fro-h3" style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Outcome</h3>
          <p className="fro-body">{programa.outcome}</p>
        </FadeIn>
      </div>
      <style>{`@media(max-width: 720px){ .ficha-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/programa/BonusExclusivo.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'

export default function BonusExclusivo({ programa }) {
  return (
    <section className="fro-sec" style={{ background: 'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>Bonus exclusivo</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 720 }}>{programa.bonus}</p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/programa/FichaTecnica.jsx src/components/programa/BonusExclusivo.jsx
git commit -m "feat: add FichaTecnica and BonusExclusivo sections

FichaTecnica handles the one program (negocios-regenerativos) whose
'dirigido a' has a nested 3-item list via the optional
dirigidoAItems field. Formato is a shared constant, not per-program
data, per the spec (identical across all 6).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 6: RizomaBlock.jsx + NoEsParaTi.jsx

**Files:**
- Create: `src/components/programa/RizomaBlock.jsx`
- Create: `src/components/programa/NoEsParaTi.jsx`

**Interfaces:**
- Consumes: `FadeIn` from `../FadeIn.jsx`; `trackOutbound` from `../../lib/analytics.js`; `programa.rizoma` (object or `null`) and `programa.noEsParaTi` (array) from Task 1.
- Produces: `RizomaBlock` default export, takes `{ rizoma }`, renders `null` when `rizoma` is falsy. `NoEsParaTi` default export, takes `{ items }`.

- [ ] **Step 1: Create `src/components/programa/RizomaBlock.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'
import { trackOutbound } from '../../lib/analytics.js'

export default function RizomaBlock({ rizoma }) {
  if (!rizoma) return null
  return (
    <section className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Diagnóstico complementario</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 760, marginBottom: '1.6rem' }}>{rizoma.texto}</p>
        </FadeIn>
        <FadeIn delay={0.12}>
          <a
            href={rizoma.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackOutbound(rizoma.href, 'rizoma_diagnostico')}
            className="fro-btn"
            style={{ border: '1.5px solid var(--fro-ink)', color: 'var(--fro-ink)', background: 'transparent' }}
          >
            {rizoma.cta}
          </a>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/programa/NoEsParaTi.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'

export default function NoEsParaTi({ items }) {
  return (
    <section className="fro-sec fro-bg-white fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Esto no es para ti si...</div></FadeIn>
        <FadeIn delay={0.06}>
          <ul className="fro-feat" style={{ maxWidth: 720 }}>
            {items.map(t => <li key={t}>{t}</li>)}
          </ul>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/programa/RizomaBlock.jsx src/components/programa/NoEsParaTi.jsx
git commit -m "feat: add RizomaBlock and NoEsParaTi sections

RizomaBlock renders null when a program has no rizoma data — only
marcas-regenerativas will have it, wired in Task 1.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 7: PrecioRepetido.jsx + NotaPertenencia.jsx + FloatingCtaBar.jsx

**Files:**
- Create: `src/components/programa/PrecioRepetido.jsx`
- Create: `src/components/programa/NotaPertenencia.jsx`
- Create: `src/components/programa/FloatingCtaBar.jsx`

**Interfaces:**
- Consumes: `FadeIn` from `../FadeIn.jsx`; `ProgramaCTA` from `./ProgramaCTA.jsx` (Task 3); `usePaymentCta` from `./usePaymentCta.js` (Task 3); `programa` object shape from Task 1.
- Produces: `PrecioRepetido` (`{ programa }`), `NotaPertenencia` (no props — identical text on all 6 pages), `FloatingCtaBar` (`{ programa }`) default exports.

- [ ] **Step 1: Create `src/components/programa/PrecioRepetido.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'
import ProgramaCTA from './ProgramaCTA.jsx'

export default function PrecioRepetido({ programa }) {
  return (
    <section className="fro-sec fro-bg-light fro-on-light">
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow" style={{ marginBottom: '1.2rem' }}>Precio</div></FadeIn>
        <FadeIn delay={0.06}>
          <h2 className="fro-h2" style={{ marginBottom: '1.6rem', maxWidth: 640 }}>¿Listo para dar el siguiente paso?</h2>
        </FadeIn>
        <FadeIn delay={0.12}>
          <ProgramaCTA programa={programa} />
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create `src/components/programa/NotaPertenencia.jsx`**

```jsx
import FadeIn from '../FadeIn.jsx'

export default function NotaPertenencia() {
  return (
    <section className="fro-sec-t" style={{ background: 'var(--fro-bg)' }}>
      <div className="fro-wrap">
        <FadeIn><div className="fro-eyebrow amber" style={{ marginBottom: '1.2rem' }}>Al inscribirte</div></FadeIn>
        <FadeIn delay={0.06}>
          <p className="fro-lead" style={{ maxWidth: 720 }}>
            Te sumas automáticamente a la Comunidad Biobuilders: noticias del sector, convocatorias de empleo, fuentes de financiamiento no reembolsable, y acceso a la red de aliados de BBS.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create `src/components/programa/FloatingCtaBar.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { usePaymentCta } from './usePaymentCta.js'

export default function FloatingCtaBar({ programa }) {
  const [visible, setVisible] = useState(false)
  const { label, status, handleClick } = usePaymentCta(programa)

  useEffect(() => {
    function onScroll() { setVisible(window.scrollY > 520) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Barra de inscripción"
      style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
        background: 'var(--fro-bg)', borderTop: '1px solid var(--fro-line)',
        padding: '0.9rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap',
      }}
    >
      <span className="fro-sm" style={{ color: 'var(--fro-text-2)' }}>{programa.titulo}</span>
      <button type="button" onClick={handleClick} disabled={status === 'loading'} className="fro-btn fro-btn-amber">
        {status === 'loading' ? 'Un momento…' : label}
      </button>
    </div>
  )
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add src/components/programa/PrecioRepetido.jsx src/components/programa/NotaPertenencia.jsx src/components/programa/FloatingCtaBar.jsx
git commit -m "feat: add PrecioRepetido, NotaPertenencia, and the floating CTA bar

FloatingCtaBar reuses usePaymentCta directly (own state instance,
same fallback behavior) rather than duplicating the payment logic —
appears once the visitor has scrolled past the hero (520px), shows
only the primary payment CTA per the spec.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 8: ProgramaPage.jsx + route wiring

**Files:**
- Create: `src/pages/ProgramaPage.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `Nav`/`Footer` from `../components/Nav.jsx`/`../components/Footer.jsx`; all 7 section components from Tasks 4-7 (`ProgramaHero`, `FichaTecnica`, `BonusExclusivo`, `RizomaBlock`, `PrecioRepetido`, `NoEsParaTi`, `NotaPertenencia`, `FloatingCtaBar`); `PROGRAMAS` from `../data/programas.js` (Task 1); `useParams`, `Navigate` from `react-router-dom`.
- Produces: `ProgramaPage` default export, no props (reads `slug` from the route). Wired into `App.jsx` at `/programas/:slug`.

- [ ] **Step 1: Create `src/pages/ProgramaPage.jsx`**

```jsx
import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import ProgramaHero from '../components/programa/ProgramaHero.jsx'
import FichaTecnica from '../components/programa/FichaTecnica.jsx'
import BonusExclusivo from '../components/programa/BonusExclusivo.jsx'
import RizomaBlock from '../components/programa/RizomaBlock.jsx'
import PrecioRepetido from '../components/programa/PrecioRepetido.jsx'
import NoEsParaTi from '../components/programa/NoEsParaTi.jsx'
import NotaPertenencia from '../components/programa/NotaPertenencia.jsx'
import FloatingCtaBar from '../components/programa/FloatingCtaBar.jsx'
import { PROGRAMAS } from '../data/programas.js'

export default function ProgramaPage() {
  const { slug } = useParams()
  const programa = PROGRAMAS.find(p => p.slug === slug)

  useEffect(() => {
    if (!programa) return

    document.title = `${programa.titulo} | Bio Business School`

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc ? metaDesc.getAttribute('content') : null
    if (metaDesc) metaDesc.setAttribute('content', programa.notaCorta)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: programa.titulo,
      description: programa.notaCorta,
      provider: { '@type': 'EducationalOrganization', name: 'Bio Business School' },
      offers: {
        '@type': 'Offer',
        price: programa.status === 'live' ? programa.precioRegular : programa.precioDescuento,
        priceCurrency: 'PEN',
        availability: programa.status === 'live' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
      },
    })
    document.head.appendChild(script)

    window.scrollTo(0, 0)

    return () => {
      document.title = 'Bio Business School'
      if (metaDesc && prevDesc) metaDesc.setAttribute('content', prevDesc)
      document.head.removeChild(script)
    }
  }, [programa])

  if (!programa) return <Navigate to="/#programas" replace />

  return (
    <>
      <a href="#main" className="skip-link" style={{ position: 'absolute', left: -9999, top: 0 }}>Ir al contenido</a>
      <Nav/>
      <main id="main">
        <ProgramaHero programa={programa}/>
        <FichaTecnica programa={programa}/>
        <BonusExclusivo programa={programa}/>
        <RizomaBlock rizoma={programa.rizoma}/>
        <PrecioRepetido programa={programa}/>
        <NoEsParaTi items={programa.noEsParaTi}/>
        <NotaPertenencia/>
      </main>
      <Footer/>
      <FloatingCtaBar programa={programa}/>
    </>
  )
}
```

- [ ] **Step 2: Wire the route in `src/App.jsx`**

Replace the full contents of `src/App.jsx` with:

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

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Visual check in the browser preview**

Start the worktree dev server, navigate to `/programas/ia-nuevos-profesionales`. Confirm: dark hero with "Disponible ahora" badge, título, nota corta, and 3 CTAs (amber "Pagar ahora — S/ 297 (~USD 89)" solid button, "Inscríbete" outline button, "💬 Escríbenos por WhatsApp" text link). Scroll down through all 7 remaining sections. Then navigate to `/programas/marcas-regenerativas` and confirm the RizomaBlock section appears (it's the only one of the 6 that should show it). Then navigate to `/programas/no-existe` and confirm it redirects to `/#programas`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ProgramaPage.jsx src/App.jsx
git commit -m "feat: wire ProgramaPage into the router at /programas/:slug

Looks up the slug in PROGRAMAS, redirects to /#programas on no match,
sets document.title/meta description/Course JSON-LD per program,
assembles all 7 sections plus the floating CTA bar.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

---

### Task 9: Final QA pass

**Files:** none created or modified — verification only. If any check fails, fix the specific file it points to and re-run that check before moving on.

- [ ] **Step 1: Full production build**

Run: `npm run build`
Expected: exits 0, no errors.

- [ ] **Step 2: Grep for stale pricing/CTA copy**

Run: `grep -rniI "15% off\|50% off\|reserva tu cupo con 50" src/components/programa src/pages/ProgramaPage.jsx src/data/programas.js`
Expected: no output.

- [ ] **Step 3: Verify all 6 discounted prices and USD figures**

Run: `grep -o "precioDescuento: [0-9]*\|precioDescuentoUsd: [0-9]*" src/data/programas.js`
Expected (in this order, one per line):
```
precioDescuento: null
precioDescuentoUsd: null
precioDescuento: 349
precioDescuentoUsd: 104
precioDescuento: 419
precioDescuentoUsd: 125
precioDescuento: null
precioDescuentoUsd: null
precioDescuento: 559
precioDescuentoUsd: 167
precioDescuento: 699
precioDescuentoUsd: 209
```

- [ ] **Step 4: Verify the WhatsApp link mechanics**

In the browser preview, navigate to `/programas/capital-de-impacto`, find the WhatsApp link, and read its `href`. Expected: starts with `https://wa.me/51974620309?text=` followed by a URL-encoded `Hola, me interesa el curso Capital de Impacto` plus the `utm_source=bbs&utm_medium=web&utm_campaign=programa_whatsapp` params.

- [ ] **Step 5: Verify the inline enrollment form**

On the same page, click "Inscríbete". Expected: a form with 3 fields (nombre, correo, WhatsApp) expands inline, no navigation, no modal overlay.

- [ ] **Step 6: Verify Nav links work from a program subpage**

Still on `/programas/capital-de-impacto`, click the Nav's "Programas" link. Expected: navigates to `/` and scrolls to the `#programas` section.

- [ ] **Step 7: Verify the floating CTA bar**

Scroll down past 520px on any program page. Expected: the floating bar appears at the bottom with the program title and the primary payment button, matching the hero's price label exactly.

- [ ] **Step 8: Mobile viewport check**

Resize the browser preview to the mobile (375×812) preset, reload a program page. Confirm the 3 CTAs stack/wrap sensibly (no overlap, no horizontal scroll) and the ficha técnica 2-column grid collapses to 1 column. Reset to desktop afterward.

- [ ] **Step 9: Verify the RizomaBlock boundary**

Run: `grep -l "rizoma:" src/data/programas.js` then manually inspect: only the `marcas-regenerativas` entry should have a non-null `rizoma` object; the other 5 must be `rizoma: null`. Confirmed already by Step 3's array shape, but re-confirm no `rizoma: {` appears more than once in the file:

Run: `grep -c "rizoma: {" src/data/programas.js`
Expected: `1`

- [ ] **Step 10: Final commit (if any step required fixes)**

If any of Steps 1-9 required a code fix:

```bash
git add -A
git commit -m "chore: final QA fixes for program subpages

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>"
```

If nothing needed fixing, no commit is required for this task — the plan is complete.
