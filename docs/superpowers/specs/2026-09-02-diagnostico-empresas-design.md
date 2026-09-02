# Diagnóstico Empresas (Subsistema 4b) — Design Spec

**Estado:** aprobado por Eddie, pendiente de plan de implementación.

## 1. Objetivo

Construir `/diagnostico/empresas`, el segundo de los 2 autodiagnósticos
gratuitos que el home promete (`DiagnosticoCTA.jsx`): *"¿Tienes un
negocio? Evalúa en qué momento estás, de la marca al capital, y qué
programa te ayuda a avanzar."* Mismo patrón arquitectónico que
`Diagnóstico Profesionales` (subsistema 4a, ya en producción en esta
rama): widget React propio, resultado enriquecido con percentil real, y
captura de lead hacia `/api/lead`.

## 2. Alcance

**Incluye:** el flujo completo de Diagnóstico Empresas — 10 preguntas (9
puntuadas + 1 de sector), lógica de clasificación entre 4 resultados
posibles (routeando a 4 programas distintos), resultado secundario
condicional, percentil real, y captura de lead.

**No incluye:** secuencias de email de nurture (mismo criterio que
subsistema 4a). Tampoco incluye la reestructuración del home en 2
bloques temáticos ("Transformando personas" / "Transformando empresas")
que Eddie propuso durante este brainstorm — queda como su propio
follow-up después de que este subsistema esté implementado y revisado,
siguiendo el mismo criterio de "uno por uno."

## 3. Arquitectura

A diferencia de Diagnóstico Profesionales (que bifurca temprano en
junior/senior), este diagnóstico usa **un solo cuestionario sin
bifurcación** — todos responden las mismas 10 preguntas. El tamaño/sector
del negocio se infiere de una pregunta categórica (no puntuada) en vez de
preguntarse como un filtro explícito al inicio.

```
[Usuario en /diagnostico/empresas]
        │
        ▼
  PANTALLA DE BIENVENIDA
        │  clic "Evaluar mi momento"
        ▼
  10 PREGUNTAS (una por pantalla, mismo orden para todos)
        │  Marca (3) → Negocio (3) → Capital (3) → Sector (1, no puntúa)
        ▼
  CAPTURA DE DATOS (nombre, email, whatsapp)
        ▼
  PANTALLA DE TRANSICIÓN (~2.6s, texto progresivo)
        │
        ├──► POST /api/lead  { form: 'bbs-diagnostico-empresas', data: {...} }
        └──► GET /api/diagnostico-stats?tipo=empresas&score=<scoreTotal>
        ▼
  PANTALLA DE RESULTADO
        Resultado principal · % por dimensión (Marca/Negocio/Capital) ·
        percentil (si hay suficientes datos) · diagnóstico · fortalezas ·
        oportunidad · recomendación · CTA al programa · nota de
        resultado secundario (si aplica)
```

**Componentes** (mismo patrón que 4a — reutiliza los componentes de
pantalla ya existentes en `src/components/diagnostico/`, no se
duplican):

- Crear: `src/pages/DiagnosticoEmpresasPage.jsx` — orquestador, mismo
  patrón de fases que `DiagnosticoProfesionalesPage.jsx`, pero **sin**
  fase de segmentación (una fase `PREGUNTAS` corrida de las 10, sin
  bifurcación).
- Crear: `src/data/diagnosticoEmpresas.js` — banco de preguntas (§4),
  lógica de clasificación (§5), contenido de resultados (§6).
- Reutilizar sin cambios: `PantallaBienvenida.jsx`, `PreguntaScreen.jsx`,
  `CapturaDatos.jsx`, `PantallaTransicion.jsx` (todos ya son genéricos,
  reciben su contenido por props).
- Crear: `src/components/diagnostico/PantallaResultadoEmpresas.jsx` —
  variante de `PantallaResultado.jsx` que además soporta el bloque de
  resultado secundario condicional (`PantallaResultado.jsx` de 4a no lo
  necesita, no se modifica).
- Modificar: `src/App.jsx` — agregar la ruta `/diagnostico/empresas`.
- Modificar: `api/_lib/lead-notify.js` — reemplazar el schema
  placeholder de `bbs-diagnostico-empresas` (§8).
- Modificar: `api/diagnostico-stats.js` — generalizar para soportar
  `tipo=empresas` (§7).

## 4. Banco de preguntas

10 preguntas, mismo orden para todos, sin bifurcación. Cada pregunta
puntuada vale 0–3 por opción (idéntica mecánica a Profesionales).

### Marca (dimensión: `marca`, máximo 9)

**M1.** Si le preguntas a un cliente qué te hace diferente de la
competencia, ¿qué tan claro tiene la respuesta?
- a) No creo que sepa decirlo (0)
- b) Diría algo genérico, tipo "sostenibilidad" o "impacto" (1)
- c) Tiene una idea, aunque no muy afilada (2)
- d) Lo tiene clarísimo, y es distinto a lo que dicen mis competidores (3)

**M2.** ¿Tu identidad visual y tu forma de comunicar realmente reflejan
lo que hace distinto a tu negocio?
- a) Se parece bastante a cualquier otra marca "verde" del mercado (0)
- b) Tiene algo propio, pero se pierde entre el resto (1)
- c) Sí se nota una diferencia, aunque podría ser más fuerte (2)
- d) Es inconfundible — nadie la confunde con otra marca (3)

**M3.** ¿Sientes que estás cobrando lo que tu propuesta realmente vale,
o compitiendo por precio?
- a) Compito por precio, constantemente (0)
- b) A veces logro cobrar más, pero cuesta sostenerlo (1)
- c) En general logro un precio justo por mi diferencia (2)
- d) Cobro un premium claro y los clientes lo entienden (3)

### Negocio (dimensión: `negocio`, máximo 9)

**N1.** ¿Tienes un modelo económico (cómo generas ingresos, cuáles son
tus márgenes reales) documentado y claro, más allá de la intención
regenerativa?
- a) No, vamos más por intuición y ajustes sobre la marcha (0)
- b) Tengo una idea general, pero no está en un documento o modelo real (1)
- c) Sí, tengo un modelo, aunque no lo reviso seguido (2)
- d) Sí, y lo reviso y ajusto activamente con datos reales (3)

**N2.** ¿Qué tan claro tienes tu modelo operativo — cómo escala tu
negocio sin que dependa 100% de ti?
- a) Hoy depende casi todo de mí (0)
- b) Tengo procesos básicos, pero informales (1)
- c) Tengo procesos documentados para lo esencial (2)
- d) El negocio funciona con estructura, no solo conmigo (3)

**N3.** ¿Tienes gobernanza clara (roles, decisiones, cómo se reparte el
valor) si tu negocio creciera mañana?
- a) No lo he pensado (0)
- b) Tengo una idea informal (1)
- c) Tengo algo definido, aunque básico (2)
- d) Tengo gobernanza clara y probada (3)

### Capital (dimensión: `capital`, máximo 9)

**C1.** Si un inversionista te pregunta por tu estructura de capital,
¿qué tan preparado te sientes para responder?
- a) No sabría por dónde empezar (0)
- b) Tengo una idea general, no un documento (1)
- c) Podría responder con algo de preparación (2)
- d) Tengo la estructura de capital clara y documentada (3)

**C2.** ¿Tienes un data room (documentos financieros, legales,
operativos ordenados) listo para mostrar a un inversionista?
- a) No tengo nada armado (0)
- b) Tengo algunos documentos sueltos (1)
- c) Tengo la mayoría, pero no está ordenado como data room (2)
- d) Sí, tengo un data room listo (3)

**C3.** ¿Sabrías construir el caso de inversión — por qué tu negocio
merece financiamiento y cómo generaría retorno — de forma convincente?
- a) No, es mi punto más débil (0)
- b) Tengo el argumento, pero no lo he probado con inversionistas reales (1)
- c) Lo he armado y presentado, con resultados mixtos (2)
- d) Sí, y he conseguido o estoy cerca de conseguir financiamiento con
  eso (3)

### Sector (no puntúa — señal categórica para detectar encaje con Industria)

**S1.** ¿Cuál describe mejor tu negocio?
- a) Producto, marca o servicio de consumo (B2C o B2B general) →
  `sector: 'general'`
- b) Agricultura, pesca, minería, energía o manufactura a escala
  industrial → `sector: 'industria'`
- c) Servicios profesionales, consultoría o tecnología →
  `sector: 'general'`
- d) Otro → `sector: 'general'`

## 5. Clasificación

```
marcaScore, negocioScore, capitalScore = suma de las 3 preguntas de cada
                                          dimensión (0–9 cada una)
scoreTotal = marcaScore + negocioScore + capitalScore   (0–27)

si sector === 'industria':
    resultado = 'industria'
si no:
    resultado = la dimensión con el score MÁS BAJO entre
                {marca, negocio, capital}
    desempate (si hay más de una empatada en el mínimo):
                prioridad marca > negocio > capital
                (la etapa más temprana del recorrido "de la marca al
                capital" se recomienda primero)

secundario = 'capital'  si resultado !== 'capital'
                        Y capitalScore <= 3   (de 9 — zona roja)
             null       en cualquier otro caso
```

`capitalScore <= 3` corresponde al tercio inferior del rango 0–9 (mismo
criterio de "zona roja" usado en las bandas de Profesionales) — un
negocio con esa brecha de capital la tiene sea cual sea su problema
principal, porque Capital de Impacto es el único de los 4 programas cuya
propia copy dice que "aplica tanto para la empresa grande... como para la
pyme."

El programa recomendado por cada `resultado` es siempre el mismo (no
depende del score, solo del tono/urgencia del mensaje — mismo criterio
que 4a):

| `resultado` | Programa (slug) |
|---|---|
| `marca` | `marcas-regenerativas` |
| `negocio` | `negocios-regenerativos` |
| `capital` | `capital-de-impacto` |
| `industria` | `economia-circular-industria` |

## 6. Contenido de los 4 resultados

Cada resultado muestra: nombre del resultado · % de las 3 dimensiones
(Marca/Negocio/Capital, siempre las 3, incluso cuando el resultado es
`industria`) · percentil (si hay datos suficientes, §7) · diagnóstico ·
fortalezas · oportunidad · recomendación · CTA al programa · nota de
resultado secundario si aplica (§5).

### Marca eco-genérica (`resultado: 'marca'`)
- **Diagnóstico:** "Tu marca probablemente suena parecida a las cien que
  dicen tener lo mismo. No es un problema de diseño — es que tu
  propuesta de valor real no se está traduciendo en algo que el mercado
  perciba y esté dispuesto a pagar más por eso."
- **Fortalezas:** Tienes una causa real detrás — el problema no es de
  sustancia, es de traducción · Ya estás operando, lo cual te da casos
  reales para construir una narrativa distinta.
- **Oportunidad:** Tu identidad visual y narrativa se parecen a
  cualquier otra marca "verde" del mercado · Estás compitiendo por
  precio en vez de cobrar lo que tu diferencia realmente vale.
- **Recomendación:** "Antes de gastar más en marketing genérico, define
  qué te hace estructuralmente distinto — y constrúyelo desde ahí."
- **CTA:** Marcas Regenerativas.

### Intención sin ingeniería (`resultado: 'negocio'`)
- **Diagnóstico:** "Tienes la intención regenerativa correcta, pero sin
  modelo económico y operativo sólido, el propósito no escala — se
  queda en discurso. Te falta la ingeniería detrás del negocio que sí
  funciona."
- **Fortalezas:** El propósito ya está — no partes de cero en lo que más
  cuesta enseñar · Tienes el contexto real de tu negocio para diseñar
  un modelo que sí aplique, no uno genérico.
- **Oportunidad:** Tu modelo económico y operativo no está lo
  suficientemente documentado ni probado · Dependes más de intuición
  que de estructura para decisiones clave.
- **Recomendación:** "Convierte tu buena intención en un modelo
  económico y operativo que puedas defender con números, no solo con
  propósito."
- **CTA:** Negocios Regenerativos.

### Buen proyecto, capital que no llega (`resultado: 'capital'`)
- **Diagnóstico:** "El capital no te está esquivando por falta de
  mérito — te está esquivando porque todavía no hablas el idioma que un
  inversionista necesita escuchar: estructura de capital, narrativa
  financiera, data room."
- **Fortalezas:** Tienes un proyecto real detrás — el problema no es el
  fondo, es la forma · Ya identificas que necesitas capital, lo cual ya
  es más claridad que la mayoría.
- **Oportunidad:** No tienes un data room ni una estructura de capital
  lista para mostrar · Te falta el caso de inversión armado — por qué tu
  negocio merece financiamiento y cómo retorna.
- **Recomendación:** "Antes de salir a buscar inversionistas, arma
  primero el material que ellos esperan ver — la preparación es lo que
  cierra la brecha."
- **CTA:** Capital de Impacto.

### Operaciones ineficientes y lineales (`resultado: 'industria'`)
- **Diagnóstico:** "Tu industria opera con márgenes cada vez más
  ajustados — y probablemente no estás aprovechando al máximo los
  recursos que ya tienes, incluido todo lo que hoy tratas como residuo.
  No es solo un tema de desperdicio: es cuánto valor real dejas sin
  capturar en tu propia operación."
- **Fortalezas:** Ya tienes la escala y los procesos para que un
  rediseño circular genere ahorro real, no solo simbólico · Tu industria
  específica ya tiene marcos aplicados (ISO 59000, casos reales) que se
  pueden adaptar directo a tu operación.
- **Oportunidad:** Sigues operando bajo una lógica lineal — extraer,
  usar, descartar — en vez de circular · El riesgo social de tu
  operación probablemente se aborda con programas genéricos, no con
  modelos de negocio que generen valor compartido real.
- **Recomendación:** "Empieza por mapear qué estás descartando hoy que
  todavía tiene valor recuperable — ahí suele estar el primer ahorro
  concreto."
- **CTA:** Economía Circular para la Industria.

### Nota de resultado secundario (cuando `secundario === 'capital'`)

Se agrega al final de cualquiera de los 4 resultados de arriba (excepto
cuando el resultado principal ya es `capital`):

> "Ojo: además de esto, tu preparación para levantar capital también
> está baja — Capital de Impacto podría ser tu segundo paso." — con
> link al programa.

## 7. Percentil real (`GET /api/diagnostico-stats`, generalizado)

**Decisión de alcance:** a diferencia de Profesionales (que puntúa un
solo eje 0–21/24), Empresas tiene 3 dimensiones independientes y el
resultado principal depende de cuál es más baja, no de una suma. Calcular
un percentil específico por dimensión requeriría que el endpoint lea una
columna distinta según cuál dimensión sea la protagonista del resultado
de cada usuario — una generalización bastante más compleja. Para este
subsistema, el percentil compara el **`scoreTotal` agregado (0–27)**
contra el de otros que ya tomaron este diagnóstico — responde "qué tan
preparado está tu negocio en conjunto", no "qué tan preparado estás
específicamente en tu brecha principal". Es una simplificación deliberada
que Eddie debe confirmar al revisar este spec; si prefiere percentil
por dimensión, es una extensión de este mismo endpoint más adelante, no
un rediseño.

**Generalización del endpoint** (ya existe para `tipo=profesionales`,
construido en 4a):

```js
const TIPO_CONFIG = {
  profesionales: {
    tab: 'Diagnóstico Profesionales',
    filterParam: 'segmento',  // query param requerido además de `score`
    filterCol: 4,
    scoreCol: 6,
  },
  empresas: {
    tab: 'Diagnóstico Empresas',
    filterParam: null,        // sin filtro de población — cuenta todo
    filterCol: null,
    scoreCol: 8,               // ver orden de columnas en §8
  },
}
```

`GET /api/diagnostico-stats?tipo=empresas&score=14` (sin `segmento`, ya
que Empresas no tiene poblaciones separadas) → mismo contrato de
respuesta que 4a: `{ percentil, muestraTotal }` o
`{ insufficientData: true, muestraTotal }` por debajo de 20 respuestas.
El contrato para `tipo=profesionales` no cambia — sigue exigiendo
`segmento`.

## 8. Payload hacia `/api/lead` y columnas del Sheet

Reemplaza el schema placeholder de `bbs-diagnostico-empresas` en
`api/_lib/lead-notify.js` (existe desde el subsistema 3, nunca usado en
producción):

```json
{
  "form": "bbs-diagnostico-empresas",
  "data": {
    "nombre": "...",
    "email": "...",
    "whatsapp": "...",
    "sector": "general",
    "marcaScore": 3,
    "negocioScore": 7,
    "capitalScore": 2,
    "scoreTotal": 12,
    "scoreMax": 27,
    "resultado": "negocio",
    "secundario": "capital",
    "pagina_origen": "/diagnostico/empresas"
  }
}
```

**Columnas del Sheet** ("Diagnóstico Empresas", ya creada con encabezado
placeholder desde el subsistema 3 — la implementación debe actualizar
esa fila de encabezados, igual que se hizo para Profesionales):

`timestamp, nombre, email, whatsapp, sector, marcaScore, negocioScore, capitalScore, scoreTotal, scoreMax, resultado, secundario, pagina_origen`

(`scoreCol` en `TIPO_CONFIG.empresas` de §7 apunta a `scoreTotal`, índice
8 — 0-based, después de `timestamp`.)

**Validación** (mismo criterio de integridad que 4a — el endpoint es
público y sin autenticación, y estos mismos datos se leen de vuelta para
calcular un percentil real):
- `sector` debe ser `'general'` o `'industria'` — cualquier otro valor
  se guarda vacío.
- `marcaScore`/`negocioScore`/`capitalScore` deben ser enteros en
  `[0, 9]` — fuera de eso, se guardan vacíos (igual que `sanitizeDiagnosticoResult`
  en 4a, adaptado a 3 columnas en vez de 1).
- `scoreTotal` debe ser exactamente la suma de los 3 anteriores cuando
  los 3 son válidos; si no coincide, se guarda vacío también (evita que
  el percentil agregado quede inflado con un total que no corresponde a
  las partes).
- `resultado` debe ser uno de `marca`/`negocio`/`capital`/`industria`.
- `secundario` debe ser `capital` o cadena vacía.

## 9. Integración con el resto del sitio

- Ruta: `/diagnostico/empresas`, lazy en `src/App.jsx`, mismo patrón que
  las demás rutas.
- `DiagnosticoCTA.jsx` (home) ya enlaza a esta ruta — sin cambios.
- `document.title`/meta description/canonical/OG: mismo patrón que
  `DiagnosticoProfesionalesPage.jsx` (ya corregido en la revisión final
  de 4a) — se implementa desde el inicio en este subsistema, no como fix
  posterior.
- `public/sitemap.xml`: agregar la entrada de esta ruta.
- Analytics: `trackCta`/`trackForm` mismo patrón, con
  `'bbs-diagnostico-empresas'` como `formId`.
- UTM: agregar `DIAGNOSTICO_EMPRESAS: 'diagnostico_empresas'` a
  `CAMPAIGNS` en `src/lib/utm.js` (aplicando la misma observación de la
  revisión de 4a: solo tiene efecto real si se usa en una URL absoluta,
  no en el link relativo al programa).
- Diseño visual: mismos tokens `--fro-*`/`.fro-*` ya establecidos, sin
  componentes ni paleta nuevos.

## 10. Manejo de errores

Mismo criterio que 4a: si `POST /api/lead` falla, el resultado se
muestra igual (nunca se pierde el valor entregado al usuario por un
problema del backend); si `GET /api/diagnostico-stats` falla o tarda, el
resultado se muestra sin la línea de percentil, nunca bloqueando el
resto de la pantalla.

## 11. Testing / verificación

Mismo patrón que 4a: `node:test` para la lógica pura de clasificación
(`src/data/diagnosticoEmpresas.js` — cubriendo los 4 resultados, el
desempate marca > negocio > capital, el umbral del secundario en
`capitalScore <= 3`, y `sector === 'industria'` como override), para
`buildEnvelope`'s nuevo case (sanitización de `sector`/scores/`resultado`/
`secundario`), y para la generalización de `api/diagnostico-stats.js`
(confirmar que el contrato de `tipo=profesionales` sigue exactamente
igual — regresión — y que `tipo=empresas` funciona sin `segmento`).
Verificación de UI: manual en navegador, sin framework de tests de
componentes (mismo criterio que todo el proyecto).

## 12. Fuera de alcance

- Secuencias de email de nurture.
- Reestructuración del home en 2 bloques ("Transformando personas" /
  "Transformando empresas") — follow-up separado, después de que este
  subsistema esté implementado y revisado.
- Percentil por dimensión (ver decisión de alcance en §7) — el agregado
  es la versión 1; una versión por dimensión es una extensión futura si
  hace falta más precisión.
