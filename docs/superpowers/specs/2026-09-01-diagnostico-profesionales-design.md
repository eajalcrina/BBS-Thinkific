# Diagnóstico Profesionales (Subsistema 4a) — Design Spec

**Estado:** aprobado por Eddie, pendiente de plan de implementación.

## 1. Objetivo

Construir `/diagnostico/profesionales`, el primero de los 2 autodiagnósticos
gratuitos que el home ya promete (`DiagnosticoCTA.jsx`, sección
`#diagnostico`): *"¿Eres profesional? Descubre qué tan preparado estás
frente a la disrupción de la IA, y qué programa es tu siguiente paso."*
Widget React propio (decisión previa del proyecto — no embed de terceros),
que produce un resultado personalizado y enriquecido, y captura el lead
hacia el `/api/lead` construido en el subsistema 3.

## 2. Alcance de este spec

**Incluye:** el diagnóstico "Profesionales" completo — flujo, 2 ramas de
preguntas (junior/senior), lógica de puntaje, contenido de resultado,
percentil real, y captura de lead.

**No incluye (subsistema 4b, brainstorm separado):** el diagnóstico
"Empresas" (`/diagnostico/empresas`). Mismo patrón arquitectónico, pero su
propio banco de preguntas/resultados — se diseña después de que este quede
implementado y revisado, siguiendo el pedido explícito de Eddie de ir "uno
por uno."

**No incluye (explícitamente deferido, decisión de Eddie):** secuencias de
email de nurture post-resultado (tipo las de ThousandFold/Impact Brand
Score — 5-7 emails automatizados por resultado a lo largo de días/semanas).
Este subsistema solo entrega: cálculo del resultado, pantalla de resultado,
y el envío a `/api/lead` (que ya dispara la notificación transaccional
interna a `NOTIFICATION_EMAIL` + fila en Sheets, construidos en el
subsistema 3). Nurture automatizado queda para una iteración futura, ya con
la infraestructura de Brevo más madura.

## 3. Arquitectura

Widget React de una sola página (`/diagnostico/profesionales`), sin
backend propio más allá de 2 endpoints:

```
[Usuario en /diagnostico/profesionales]
        │
        ▼
  PANTALLA DE BIENVENIDA
        │  clic "Iniciar diagnóstico"
        ▼
  PREGUNTA DE SEGMENTACIÓN (Q0)
        │  determina la rama
        ├──► RAMA JUNIOR (7 preguntas, una por pantalla)
        └──► RAMA SENIOR (8 preguntas, una por pantalla)
        │
        ▼
  CAPTURA DE DATOS (nombre, email, whatsapp)
        │  antes de mostrar el resultado, no antes de empezar
        ▼
  PANTALLA DE TRANSICIÓN (~2.5s, texto progresivo)
        │
        ├──► POST /api/lead  { form: 'bbs-diagnostico-profesionales', data: {...} }
        │        (dispara Brevo + Sheets, ya construido en subsistema 3)
        │
        └──► GET /api/diagnostico-stats?tipo=profesionales&segmento=X&score=Y
                 (nuevo, solo lectura — calcula el percentil real)
        ▼
  PANTALLA DE RESULTADO
        Nivel · dimensiones con % · fortalezas · oportunidad ·
        recomendación · percentil (si hay suficientes datos) ·
        CTA al programa correspondiente
```

**Componentes** (siguiendo el patrón data-driven ya usado en
`src/pages/ProgramaPage.jsx` + `src/data/programas.js`):

- Crear: `src/pages/DiagnosticoProfesionalesPage.jsx` — orquestador de
  pantallas (bienvenida → preguntas → captura → transición → resultado),
  maneja el estado del flujo (respuestas, segmento, score).
- Crear: `src/data/diagnosticoProfesionales.js` — banco de preguntas (§4),
  lógica de clasificación (§5) y contenido de resultados (§6), como datos
  puros, separados de la UI (mismo principio que `data/programas.js`).
- Crear: `src/components/diagnostico/` — subcomponentes de pantalla
  (`PantallaBienvenida.jsx`, `PreguntaScreen.jsx`, `CapturaDatos.jsx`,
  `PantallaTransicion.jsx`, `PantallaResultado.jsx`), reutilizables por el
  diagnóstico de Empresas cuando se construya (mismo patrón de pantallas,
  distinto contenido).
- Modificar: `src/App.jsx` — agregar la ruta
  `/diagnostico/profesionales` (lazy, mismo patrón que `ProgramaPage`).
- Crear: `api/_lib/lead-notify.js` (modificar) — actualizar el `case
  'bbs-diagnostico-profesionales'` de `buildEnvelope` con el schema real
  (§8), reemplazando el placeholder provisional del subsistema 3.
- Crear: `api/diagnostico-stats.js` — endpoint nuevo, solo lectura (§7).

## 4. Banco de preguntas

### Q0 — Segmentación (no puntúa, determina la rama)

> **¿Cuántos años de experiencia profesional tienes?**
> - Menos de 5 años → rama **junior**
> - 5 años o más → rama **senior**

### Rama junior (7 preguntas, cada opción vale 0–3, score total 0–21)

**J1.** Cuando algo no sale como esperabas en el trabajo, ¿qué es lo
primero que haces?
- a) Le pregunto a una IA qué debería hacer y sigo su sugerencia (0)
- b) Le pregunto a una IA, pero comparo su respuesta con lo que yo pienso (1)
- c) Lo pienso yo primero, y uso la IA para chequear o afinar (2)
- d) Lo resuelvo yo, reviso con colegas o fuentes, y ya después considero
  qué diría una IA (3)

**J2.** ¿Con qué frecuencia te ha tocado tomar una decisión difícil sin
tener toda la información?
- a) Casi nunca — prefiero esperar a tener claridad (0)
- b) Rara vez, y cuando pasa me cuesta mucho (1)
- c) A veces, y ya le voy agarrando la mano (2)
- d) Seguido — es parte normal de mi trabajo (3)

**J3.** Si tuvieras que defender una postura distinta a la que te da una IA
frente a tu jefe, ¿qué tan preparado te sientes?
- a) No sabría ni por dónde empezar (0)
- b) Podría, pero me tomaría tiempo armar el argumento (1)
- c) Me siento cómodo, ya me ha tocado (2)
- d) Es algo que hago con frecuencia y disfruto (3)

**J4.** Cuando la IA te muestra un concepto o dato que no conocías, ¿qué
haces normalmente?
- a) Lo incorporo y sigo trabajando — confío en que está bien (0)
- b) Le pido a la misma IA que me explique más, pero no salgo de ahí (1)
- c) Investigo por mi cuenta en otras fuentes para entender mejor (2)
- d) Además de investigar, lo contrasto con un colega o alguien con más
  experiencia antes de aplicarlo (3)

**J5.** ¿La IA te ha permitido hacer cosas que van más allá de tu rol
actual (tareas, responsabilidades o habilidades nuevas que antes no
tenías)?
- a) No, la uso solo para hacer mi trabajo actual más rápido (0)
- b) A veces pruebo cosas fuera de mi rol, pero no se ha notado (1)
- c) He empezado a asumir tareas o proyectos que antes no me tocaban,
  gracias a lo que la IA me permite hacer (2)
- d) Ya me han dado responsabilidades nuevas porque he demostrado que
  puedo hacer más de lo que mi puesto pedía (3)

**J6.** Cuando piensas en las personas con cargos de liderazgo por encima
de ti (tu jefe, tu coordinador), ¿qué tan claro tienes lo que a ti te
falta para llegar ahí?
- a) No lo he pensado mucho todavía (0)
- b) Tengo una idea general, pero no muy concreta (1)
- c) Tengo bastante claro qué habilidades o experiencia me faltan (2)
- d) Tengo un plan activo — sé exactamente qué necesito, incluyendo cómo
  la IA me ayuda a llegar ahí (3)

**J7.** La IA te está liberando tiempo. ¿Qué haces con eso?
- a) Todavía no siento que me libere tiempo real (0)
- b) Lo uso para profundizar en lo mismo que ya hacía — mi especialidad (1)
- c) Lo uso para aprender cosas nuevas fuera de mi especialidad y volverme
  más versátil (2)
- d) Lo uso para eso, y además comparto lo que aprendo con mi equipo — me
  estoy volviendo un referente (3)

### Rama senior (8 preguntas, cada opción vale 0–3, score total 0–24)

**S1.** Cuando la IA te sugiere algo que contradice tu experiencia o
intuición, ¿qué haces?
- a) Sigo mi criterio y ni pruebo lo que sugiere la IA (0)
- b) Reviso lo que sugiere, pero rara vez cambia lo que ya iba a hacer (1)
- c) Lo considero en serio, y a veces ajusto mi decisión con eso (2)
- d) Lo uso activamente para poner a prueba mi propio criterio, y he
  cambiado de opinión más de una vez gracias a eso (3)

**S2.** ¿Qué tanto usas la IA para amplificar tu trabajo (no para que lo
haga por ti, sino para hacer más con lo que ya sabes)?
- a) Casi no la uso, prefiero mis métodos de siempre (0)
- b) La uso para tareas puntuales, pero no ha cambiado cómo trabajo (1)
- c) La uso regularmente para acelerar partes de mi trabajo (2)
- d) La uso para escalar criterio que antes solo yo podía dar, llegando a
  más gente o proyectos de los que podría solo (3)

**S3.** ¿Cuánto de tu conocimiento y criterio está hoy solo "en tu
cabeza" — y cuánto está documentado, sistematizado o enseñado a otros?
- a) Casi todo está solo en mi cabeza (0)
- b) He compartido algo informalmente, pero no está sistematizado (1)
- c) He documentado o enseñado partes importantes a mi equipo (2)
- d) Activamente sistematizo y transfiero mi criterio — incluso usando IA
  para hacerlo escalable (3)

**S4.** Cuando trabajas con alguien más joven que "sabe usar bien la IA",
¿cómo te sientes respecto a tu propio valor?
- a) Me preocupa no poder competir con esa fluidez (0)
- b) Me genera algo de inseguridad, aunque sé que aporto otras cosas (1)
- c) Confío en que mi experiencia sigue siendo más valiosa, aunque no
  siempre se note (2)
- d) Tengo claro que mi criterio es lo que hace que su uso de la IA
  realmente valga — y lo demuestro (3)

**S5.** ¿Sientes que tu experiencia es reconocida y aprovechada
activamente en tu organización?
- a) No, siento que se está dando por sentada o pasando por alto (0)
- b) A veces, pero no de forma consistente (1)
- c) Sí, en general se reconoce (2)
- d) Sí, y activamente me buscan para decisiones estratégicas justamente
  por eso (3)

**S6.** ¿Qué tan seguido mentoreas, entrenas o le pasas criterio a colegas
más jóvenes?
- a) Casi nunca — no es parte de mi rol o no encuentro el espacio (0)
- b) Ocasionalmente, cuando alguien pregunta directamente (1)
- c) Regularmente, es parte de cómo trabajo (2)
- d) Es una parte activa y reconocida de mi rol — incluso he usado IA
  para hacerlo más escalable (3)

**S7.** Cuando piensas en los próximos años de tu carrera, ¿qué tan clara
tienes tu relación con la IA (ser quien la dirige y entrena, vs. quedar
detrás de quienes la usan mejor)?
- a) No lo he pensado mucho (0)
- b) Tengo una idea general, pero no un plan concreto (1)
- c) Tengo bastante claro hacia dónde quiero ir con esto (2)
- d) Tengo un plan activo — sé exactamente cómo posicionar mi experiencia
  frente a la IA en los próximos años (3)

**S8.** Pensando en tu independencia futura (por decisión propia o por
cambios en tu empleo), ¿qué tan claro tienes cómo usarías tu experiencia +
IA para generar ingresos por tu cuenta (consultoría, negocio propio,
especialización)?
- a) No lo he pensado — dependo de estar empleado (0)
- b) Lo he pensado, pero no sé por dónde empezar (1)
- c) Tengo una idea de cómo podría hacerlo, aunque no he dado pasos
  concretos (2)
- d) Ya lo estoy construyendo o tengo un plan claro de cómo mi experiencia
  + IA me daría independencia (3)

## 5. Puntaje, dimensiones y clasificación

**Dimensiones** (agrupan preguntas para el desglose de % en el resultado —
ver §6). Cada dimensión se muestra como `(suma de las preguntas del grupo
/ máximo posible del grupo) × 100`, redondeado al entero más cercano.

| Rama | Dimensión | Preguntas | Máximo |
|---|---|---|---|
| Junior | Criterio propio | J1, J2, J3 | 9 |
| Junior | Aprendizaje activo | J4 | 3 |
| Junior | Proyección de crecimiento | J5, J6, J7 | 9 |
| Senior | Amplificación de criterio | S1, S2 | 6 |
| Senior | Sistematización y mentoría | S3, S6 | 6 |
| Senior | Posicionamiento y visibilidad | S4, S5 | 6 |
| Senior | Proyección de independencia | S7, S8 | 6 |

**Niveles de clasificación** (score total de la rama, sin reglas de veto —
a diferencia del modelo de referencia de ThousandFold, aquí no hay
combinaciones paradójicas que ameriten forzar una clasificación; con 7-8
preguntas de opción única por pregunta, el score total ya es representativo):

| Rama | Rango | Nivel |
|---|---|---|
| Junior | 0–6 | Techo de cristal activo |
| Junior | 7–14 | En construcción |
| Junior | 15–21 | Liderando el cambio |
| Senior | 0–8 | Experiencia en riesgo de invisibilidad |
| Senior | 9–16 | Multiplicando, pero no del todo |
| Senior | 17–24 | Liderando la multiplicación |

El programa recomendado es siempre el mismo dentro de cada rama
(`ia-nuevos-profesionales` para junior, `ia-profesionales-senior` para
senior, slugs de `src/data/programas.js`) — el nivel cambia el tono y la
urgencia del mensaje, no el programa.

## 6. Contenido de resultado (los 6 niveles)

Cada pantalla de resultado muestra, en este orden: nivel + score
(`X/max`) · barras de dimensión con % (§5) · percentil (§7, si hay datos
suficientes) · diagnóstico (1 párrafo) · fortalezas (lista) · oportunidad
(lista) · recomendación (1-2 frases) · CTA al programa.

### Junior — Techo de cristal activo (0–6)
- **Diagnóstico:** "Hoy estás construyendo bajo el mismo riesgo que
  describe el programa — dejar que la IA piense por ti, sin desarrollar
  el criterio propio que te va a diferenciar. No es un juicio, es una
  alerta a tiempo."
- **Fortalezas:** Ya usas IA activamente (la adopción no es el
  problema) · Tienes tiempo de sobra para revertir esto antes de que se
  vuelva hábito.
- **Oportunidad:** Delegas el pensamiento crítico en vez de usar la IA
  para afinar el tuyo · No tienes claro qué te falta para crecer hacia
  roles de más responsabilidad · No usas el tiempo que libera la IA para
  expandirte más allá de tu rol.
- **Recomendación:** "Resuelve tú primero, usa la IA para contrastar —
  no al revés."
- **CTA:** IA para Nuevos Profesionales — "diseñado exactamente para
  este momento, antes de que el techo de cristal se vuelva permanente."

### Junior — En construcción (7–14)
- **Diagnóstico:** "Vas por buen camino — ya usas la IA con algo de
  criterio propio, pero todavía no es sistemático. Acá se decide si
  terminas liderando el cambio o quedándote a medias."
- **Fortalezas:** Tienes momentos de pensamiento crítico genuino · Ya
  muestras señales de querer crecer más allá de tu rol.
- **Oportunidad:** Tu criterio propio es inconsistente — a veces lo usas,
  a veces no · Podrías sistematizar más lo que aprendes en vez de
  dejarlo suelto.
- **Recomendación:** "Convierte lo que haces bien ocasionalmente en
  hábito consistente."
- **CTA:** IA para Nuevos Profesionales — "te ayuda a consolidar el
  criterio que ya empezaste a construir."

### Junior — Liderando el cambio (15–21)
- **Diagnóstico:** "Ya estás haciendo lo que este programa busca formar:
  usar la IA como herramienta, no como reemplazo de tu pensamiento. El
  siguiente reto es profundizar y multiplicar eso."
- **Fortalezas:** Sostienes tu propio criterio incluso frente a la IA ·
  Ya te expandes más allá de tu rol y compartes lo que aprendes.
- **Oportunidad:** Sistematizar esto — pasar de "lo hago bien
  intuitivamente" a un marco replicable · Afinar qué necesitas
  específicamente para el salto a más responsabilidad.
- **Recomendación:** "No te quedes en 'ya lo hago bien' — profundiza el
  marco que te permita escalarlo y hacerlo visible ante quienes deciden
  tu siguiente paso."
- **CTA:** IA para Nuevos Profesionales — "para llevar tu ventaja actual
  a un nivel más estratégico y visible."

### Senior — Experiencia en riesgo de invisibilidad (0–8)
- **Diagnóstico:** "Tu experiencia vale — el riesgo no es que la IA te
  reemplace, es que nadie (ni tú) esté multiplicándola todavía. Esa
  brecha es la que más rápido se puede cerrar."
- **Fortalezas:** Tienes años de criterio construido que ningún junior
  puede improvisar · Estás a tiempo de posicionarte antes de que la
  brecha se sienta más.
- **Oportunidad:** Tu criterio está solo "en tu cabeza" — no documentado
  ni transferido · Sientes que tu valor no se nota frente a colegas más
  jóvenes "tool-fluent" · No tienes un plan claro para tu independencia
  si tu situación laboral cambia.
- **Recomendación:** "Empieza por sistematizar una sola cosa que sabes
  hacer mejor que nadie — es el primer paso hacia hacerlo visible."
- **CTA:** IA para Profesionales Senior — "para que tu experiencia deje
  de sentirse amenazada y empiece a sentirse multiplicada."

### Senior — Multiplicando, pero no del todo (9–16)
- **Diagnóstico:** "Ya usas la IA como amplificador, no como amenaza —
  vas en la dirección correcta. Falta llevarlo de 'lo hago' a 'lo
  sistematizo y lo hago visible.'"
- **Fortalezas:** Usas la IA activamente para escalar tu trabajo ·
  Mentoreas o compartes criterio al menos ocasionalmente.
- **Oportunidad:** La sistematización es parcial — se pierde valor que
  podría estar documentado o replicado · Tu plan de independencia
  (consultoría, negocio propio) sigue siendo una idea, no una acción.
- **Recomendación:** "Convierte una práctica de mentoría que ya haces en
  algo estructurado y repetible — ahí está tu ventaja competitiva más
  clara."
- **CTA:** IA para Profesionales Senior — "para llevar tu criterio de
  algo que compartes ocasionalmente a un activo estratégico."

### Senior — Liderando la multiplicación (17–24)
- **Diagnóstico:** "Ya estás haciendo lo que muchos profesionales senior
  todavía no se atreven: usar la IA para escalar tu criterio, no para
  competir con él. El siguiente paso es capitalizar eso, dentro y fuera
  de tu organización."
- **Fortalezas:** Sistematizas y transfieres tu conocimiento activamente
  · Tu experiencia es reconocida y buscada para decisiones estratégicas
  · Tienes claridad sobre tu proyección, incluyendo independencia
  futura.
- **Oportunidad:** El riesgo en este nivel no es de criterio, es de
  tiempo — ¿estás dedicando el espacio necesario a construir lo que ya
  sabes que quieres construir?
- **Recomendación:** "Pon fecha a los próximos pasos de tu plan de
  independencia o especialización — el conocimiento ya lo tienes."
- **CTA:** IA para Profesionales Senior — "para darle estructura y
  velocidad a algo que ya sabes hacer bien."

## 7. Percentil real (`GET /api/diagnostico-stats`)

**Por qué no un percentil inventado:** decisión explícita de Eddie —
ningún número de comparación con "otros profesionales" se muestra sin
estar respaldado por datos reales ya guardados. El día del lanzamiento no
hay datos suficientes; el endpoint lo refleja honestamente en vez de
simular un percentil.

**Contrato:**

```
GET /api/diagnostico-stats?tipo=profesionales&segmento=junior&score=14

200 { percentil: 62, muestraTotal: 47 }
   — "superaste al 62% de quienes tomaron este diagnóstico" (47 respuestas
     guardadas para esa rama)

200 { insufficientData: true, muestraTotal: 12 }
   — menos de 20 respuestas guardadas para esa rama todavía
```

**Cálculo:** lee todas las filas de la pestaña "Diagnóstico Profesionales"
del Sheet (`GOOGLE_SHEET_ID`, ya configurado), filtra por `segmento` (nueva
columna, ver §8), calcula
`percentil = round((cantidad de scores estrictamente menores al mío / total) × 100)`.
Umbral de datos suficientes: **20 respuestas** guardadas para esa
combinación tipo+segmento. Por debajo de eso, `insufficientData: true` y
el frontend muestra: *"Eres de los primeros en tomar este diagnóstico —
pronto vas a poder ver cómo te comparas con otros profesionales de la
región."*

**Auth/acceso:** mismo service account y mismo scope de Google
(`https://www.googleapis.com/auth/spreadsheets`) ya configurado en
`api/_lib/lead-notify.js` — sin permisos nuevos que pedir en Google Cloud.
Reutiliza `getSheetsClient()` (ya existe, exportado desde el subsistema 3
tras el fix wave) en vez de duplicar la lógica de autenticación.

**Falla con gracia:** si el Sheet no responde o las credenciales faltan,
responde `200 { insufficientData: true, muestraTotal: 0 }` (nunca un
error duro) — el percentil es un adorno, no algo de lo que dependa la
entrega del resultado.

**Se llama en paralelo con `POST /api/lead`** (pantalla de transición),
no en secuencia — el resultado no debe esperar a que ambas respondan si
una es más lenta; la pantalla de resultado renderiza con lo que ya llegó
y agrega el percentil cuando el segundo `fetch` resuelve (o el mensaje de
"insuficientes datos" si no hay percentil que mostrar).

## 8. Payload hacia `/api/lead`

Reemplaza el schema provisional de `bbs-diagnostico-profesionales` en
`api/_lib/lead-notify.js` (subsistema 3, marcado explícitamente como
placeholder a revisar):

```json
{
  "form": "bbs-diagnostico-profesionales",
  "data": {
    "nombre": "...",
    "email": "...",
    "whatsapp": "...",
    "segmento": "junior",
    "score": 14,
    "scoreMax": 21,
    "nivel": "En construcción",
    "pagina_origen": "/diagnostico/profesionales"
  }
}
```

**Columnas del Sheet actualizadas** (pestaña "Diagnóstico Profesionales" —
reemplaza el orden provisional de la spec del subsistema 3):

`timestamp, nombre, email, whatsapp, segmento, score, scoreMax, nivel, pagina_origen`

Eddie ya creó la fila de encabezados de esta pestaña con el schema viejo
(`nombre, email, whatsapp, resultado, pagina_origen`) — la implementación
debe actualizar esa fila de encabezados también (no solo el código), o el
plan debe incluir un paso explícito para hacerlo antes de que lleguen
datos reales.

**Asunto del email de notificación:** `Diagnóstico Profesionales — {nombre}
— {nivel}` (agrega el nivel al asunto ya existente, para que el equipo
priorice de un vistazo).

## 9. Integración con el resto del sitio

- Ruta: `/diagnostico/profesionales`, agregada a `src/App.jsx` con el
  mismo patrón `lazy()` que `ProgramaPage`.
- `DiagnosticoCTA.jsx` (home) ya enlaza a esta ruta — no requiere cambios.
- Analytics: `trackCta` en el CTA de inicio del quiz y en el CTA final al
  programa; `trackForm('bbs-diagnostico-profesionales', 'submit'|'success'
  |'error')` en la captura de datos, mismo patrón que los formularios ya
  construidos en subsistemas 2 y 3.
- UTM: agregar `DIAGNOSTICO_PROFESIONALES: 'diagnostico_profesionales'` a
  `CAMPAIGNS` en `src/lib/utm.js`, usado en el CTA final hacia
  `/programas/ia-nuevos-profesionales` o
  `/programas/ia-profesionales-senior`.
- Diseño visual: mismos tokens ya establecidos (`--fro-*`, tipografía Syne
  + Inter + Barlow Condensed, `.fro-btn`, `.fro-card`, `.fro-field`) — sin
  paleta ni componentes nuevos.
- Nav/Footer: se renderizan igual que en `ProgramaPage` (el diagnóstico es
  una página completa, no un modal).

## 10. Manejo de errores

- Si `POST /api/lead` falla (ambos canales caídos, 502), el frontend
  igual muestra el resultado completo (el usuario no debe perder el
  valor del diagnóstico por un problema de nuestro backend) — solo se
  omite silenciosamente el guardado, con un mensaje discreto tipo
  "no pudimos guardar tu resultado, pero aquí está" si aplica, siguiendo
  el mismo criterio de degradación grácil ya usado en `usePaymentCta.js`.
- Si `GET /api/diagnostico-stats` falla o tarda, el resultado se muestra
  sin la línea de percentil (nunca bloquea ni retrasa el resto de la
  pantalla).
- Sin retroceso entre preguntas (decisión de diseño, no error) — si el
  usuario recarga la página a mitad del quiz, reinicia desde la
  bienvenida (no hay persistencia de progreso a mitad de quiz en esta
  versión).

## 11. Testing / verificación

- `api/diagnostico-stats.js`: tests con `node:test` (mismo patrón que
  subsistema 3) cubriendo cálculo de percentil con datos mockeados,
  umbral de 20 respuestas, y degradación grácil sin credenciales.
- `buildEnvelope`'s actualización del case
  `bbs-diagnostico-profesionales`: test cubriendo el nuevo schema (§8).
- Lógica de clasificación (`src/data/diagnosticoProfesionales.js`): tests
  puros (sin DOM) cubriendo los 6 niveles, los límites exactos de cada
  rango (ej. score=6 vs score=7), y el cálculo de % por dimensión.
- Flujo de UI: sin framework de tests de componentes en este repo
  (consistente con subsistemas 1-3) — verificación manual en navegador
  cubriendo ambas ramas completas, captura de datos, y las 6
  combinaciones de resultado.

## 12. Fuera de alcance

- Diagnóstico Empresas (`/diagnostico/empresas`) — subsistema 4b, spec
  separado.
- Secuencias de email de nurture post-resultado — ver §2.
- Persistencia de progreso a mitad de quiz (guardar y continuar después).
- Compartir el resultado (link único, imagen para redes, etc.) — no
  pedido, no incluido.
