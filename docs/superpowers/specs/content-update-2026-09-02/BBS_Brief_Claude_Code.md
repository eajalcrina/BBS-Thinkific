# BBS — Brief de Implementación para Claude Code
### Rediseño de biobusinessschool.org — de plataforma genérica a propuesta personal de Eddie Ajalcriña y Lorenzo Ortiz

---

## 0. Contexto y alcance de este trabajo

Este documento es la instrucción de trabajo para Claude Code. El sitio actual (`biobusinessschool.org`) corre sobre el repo legacy `BBS-Thinkific` (React + Vite, deploy en Vercel vía GitHub) y **debe modificarse/reescribirse sobre ese mismo repo**, no crear uno nuevo.

**Alcance de esta ejecución: completo.**
- Home rediseñado
- 6 subpáginas de programa
- 2 páginas de diagnóstico (lead magnets interactivos)
- Backend de captura de leads (Brevo + Google Sheets)

**Documentos de contenido que se adjuntan junto a este brief** (fuente de verdad para todo el copy — no reescribir ni resumir el contenido de ahí, usarlo tal cual):
1. `BBS_Identidad_de_Marca_y_Propuesta_de_Valor.md` — quiénes son, tesis, los tres ejes, manifiesto, voz y tono
2. `BBS_Programas_Contenido_Consolidado.md` — ficha completa de los 6 programas (audiencia, objetivo, temas, outcome, bonus, notas extendida/corta)
3. `BBS_Propuesta_Estructura_Landing.md` — sitemap y estructura de secciones
4. `BBS_Copy_Landing_Home_v5.md` — copy final del home, sección por sección, con segmentación por audiencia (Transformamos Profesionales / Transformamos Empresas)
5. `BBS_Copy_Subpaginas_Programas.md` — copy final de las 6 subpáginas, con estado de lanzamiento y CTAs por programa
6. `BBS_Copy_Paginas_Diagnostico.md` — flujo de preguntas, lógica de reporte, y especificación técnica de la infraestructura de leads

Si algún documento no fue adjuntado en la conversación, pedirlo antes de avanzar — no inventar contenido de relleno.

---

## 1. Identidad de marca (resumen ejecutivo — el detalle completo está en el documento 1)

- BBS no es una plataforma. Es una propuesta personal de Eddie Ajalcriña y Lorenzo Ortiz, respaldada por Redesign Lab.
- BBS existe en la intersección de tres ejes: **Empresas y capital**, **Sistemas vivos**, **Inteligencia artificial**. Ver diagrama de intersección referenciado en el documento 1 — construir un diagrama Venn de 3 círculos como pieza visual en el home (sección "Los tres ejes").
- Manifiesto central (usar tal cual, no parafrasear): ver documento 4, sección 2.
- Tono: natural, sin estilo IA — nada de guiones largos (—), nada de estructura repetitiva "no es X, sino Y", nada de tríos retóricos. Frases cortas intercaladas con otras más largas. Primera persona desde Eddie/Lorenzo.

### 1.1 — Regla no negociable: eliminación de 404 Tech Found

El sitio actual en producción todavía muestra "Biotech Sprint 01" co-brandeado con **404 Tech Found** (logo, mención de certificado conjunto, pricing de $40/$95). **Esto debe eliminarse por completo del sitio**, sin excepción — es una alianza descontinuada. Buscar y remover cualquier referencia a "404", "404 Tech Found", o el programa "Biotech Sprint 01" en su forma actual (ese contenido queda reemplazado por los 6 programas nuevos).

---

## 2. Dirección de diseño visual

**Logo:** wordmark en texto (como el actual "bio/business"), tipografía **Barlow Condensed**. No se crea logo en imagen/isotipo — se mantiene texto estilizado.

**Paleta de color:** no hay valores hex definitivos cerrados — Claude Code tiene libertad para proponer los tonos exactos dentro de esta dirección, ya validada con Eddie:

- Alejarse del negro plano + amarillo/lima saturado como bloque de color dominante (estilo actual, sensación de "lanzamiento de producto tech" — Sprint 01, Early Bird, Vol. 01).
- Ir hacia un **degradado de tres capas**: base oscura (más profunda que negro puro — piensa carbón o azul muy oscuro), capa media azulada, acentos claros puntuales (no bloques, toques de luz).
- Referencia estética: dirección tipo "Enigma AI" (Dribbble) — dark mode sofisticado, tipografía limpia sin gritar, acentos de color moderados y no saturados, composición basada en espacio negativo y jerarquía tipográfica, no en bloques de color compitiendo.
- El amarillo/lima actual (#C1F400) y el rosa/magenta (#F32769) pueden sobrevivir como acentos puntuales muy controlados, no como fondo de sección — a evaluar visualmente por Claude Code, priorizando la sensación "boutique, privado, premium" sobre "vistoso".

**Tipografía de cuerpo:** Outfit y DM Sans (ya definidas en el repo actual) — evaluar si necesitan más peso editorial en titulares largos para lograr jerarquía sin depender de tamaño extra bold agresivo.

**Sensación general buscada:** círculo privado, íntimo, curado — no "lanzamiento de startup". Esto también aplica a microcopy de interfaz: reemplazar "Únete gratis" / "Early Bird" por lenguaje más selectivo donde aplique (ver documento de subpáginas para copy exacto de botones).

---

## 3. Sitemap

```
Home (landing principal)
├── /programas/ia-nuevos-profesionales
├── /programas/ia-profesionales-senior
├── /programas/negocios-regenerativos
├── /programas/marcas-regenerativas
├── /programas/economia-circular-industria
├── /programas/capital-de-impacto
├── /diagnostico/profesionales
└── /diagnostico/empresas
```

Estructura de secciones del home: especificada completa en `BBS_Copy_Landing_Home_v5.md`. **Cambio de estructura importante respecto a versiones anteriores:** el home ya no presenta los 6 programas en un solo grid mezclado. Se divide en dos secciones segmentadas por audiencia, cada una en layout de dos columnas:

- **"Transformamos Profesionales"** — columna izquierda: bloque de diagnóstico (`/diagnostico/profesionales`) con su propia línea de justificación; columna derecha: fichas de los 2 programas para profesionales (IA Nuevos Profesionales, IA Profesionales Senior).
- **"Transformamos Empresas"** — columna izquierda: bloque de diagnóstico (`/diagnostico/empresas`) con su propia línea de justificación; columna derecha: fichas de los 4 programas para empresas (Negocios Regenerativos, Marcas Regenerativas, Economía Circular, Capital de Impacto).

Esto resuelve un problema de UX identificado por Eddie: la versión anterior hablaba a dos públicos distintos (profesionales y empresas) en una sola sección indiferenciada. Ahora cada visitante se ubica de inmediato según quién es.

El home también incluye una **franja de instituciones** (marquee de logos, sección nueva): MIT Professional Education, Universidad de Chicago, CATIE, INCAE, University of the Arts London, FIT (Fashion Institute of Technology, Nueva York), Parsons School of Design (Nueva York). Implementar como scroll horizontal continuo, sin texto adicional más allá de un antetítulo corto ("Docentes y speakers en").

Structura completa de subpáginas de programa: documento 5 (`BBS_Copy_Subpaginas_Programas.md`).

---

## 4. Los 6 programas — estado de lanzamiento (importante para lógica condicional de UI)

Cada programa tiene un estado distinto que determina qué CTA(s) mostrar. Esto es lógica de producto, no solo copy — implementar como un campo de estado por programa (ej. `status: "live" | "reserve"`) para que sea fácil de cambiar cuando se lancen los que faltan.

| Programa | Estado | Precio regular | CTA primario | CTA secundario |
|---|---|---|---|---|
| IA para Nuevos Profesionales | 🟢 `live` | S/ 197 (sin descuento) | Pagar ahora — S/ 197 → Mercado Pago | Quiero más información (captura solo email) |
| Construcción de Marcas Regenerativas | 🟢 `live` | S/ 597 | Pagar ahora con 15% off — S/ 499 → Mercado Pago | Quiero más información (captura solo email) |
| IA para Profesionales Senior | 🟡 `reserve` | S/ 397 | Reserva tu cupo con 30% off — S/ 278 → Mercado Pago | Solo avísame cuando abra (captura solo email) |
| Construcción de Negocios Regenerativos | 🟡 `reserve` | S/ 497 | Reserva tu cupo con 30% off — S/ 348 → Mercado Pago | Solo avísame cuando abra (captura solo email) |
| Economía Circular para la Industria | 🟡 `reserve` | S/ 497 | Reserva tu cupo con 30% off — S/ 348 → Mercado Pago | Solo avísame cuando abra (captura solo email) |
| Capital de Impacto | 🟡 `reserve` | S/ 997 | Reserva tu cupo con 30% off — S/ 698 → Mercado Pago | Solo avísame cuando abra (captura solo email) |

Los programas en estado `reserve` muestran además la nota: *"Cohorte confirmada para el tercer trimestre de 2026 (Q3)"*.

**Regla de visualización del precio (importante):** el precio **no aparece** ni en las fichas de programa del home, ni en el hero de la subpágina del programa. En el home, cada ficha muestra solo `Ver programa →`, y cuando aplica, un tag corto tipo `30% off por pronto pago` o `Precio especial` — nunca el monto exacto. En la subpágina, el precio aparece recién después de la ficha técnica y el bonus exclusivo (a la mitad de la página, no en el hero), una vez que la persona ya vio el valor del programa.

**Pasarela de pago:** Mercado Pago. Precio ancla en soles (mercado principal Perú/LATAM); el equivalente en USD es solo informativo, no forma parte del flujo de cobro. El botón de pago lleva directo al checkout de Mercado Pago con el monto correspondiente (regular o con descuento según el CTA que se haya presionado); el registro de datos del comprador ocurre después del pago (vía el mismo endpoint de leads, ver sección 6, con `form: "bbs-enroll"`).

**Referencia cruzada especial (Marcas Regenerativas):** esta subpágina debe incluir un bloque que enlaza al Diagnóstico RIZOMA de ThousandFold (`https://www.thousandfold.la/diagnostico`) como recurso complementario — copy exacto en el documento 5, sección del programa 4.

---

## 5. Páginas de diagnóstico (lead magnets interactivos)

Dos herramientas de autodiagnóstico, con flujo de preguntas, lógica de scoring, y captura de datos — especificación completa (preguntas exactas, opciones, lógica de recomendación) en el documento 6.

**Patrón de interacción a replicar** (mismo patrón usado en `redesignlab.org/inteligencia-artificial/diagnostico` y `thousandfold.la/diagnostico`, ya en producción — revisar esas páginas como referencia de UX):
- Landing corta con hero + botón de inicio, mostrando cantidad de preguntas y tiempo estimado antes de arrancar.
- Una pregunta por pantalla, sin botón "siguiente" — al seleccionar una opción, avanza automáticamente tras una breve transición.
- Cada pregunta pertenece a un bloque/dimensión visible en la parte superior (ej. "BLOQUE 3 / Datos y Visibilidad").
- Las opciones de respuesta (donde aplique escala de madurez) deben redactarse como una escalera concreta de menor a mayor madurez, no como sí/no/tal vez genérico — ejemplo del patrón ya validado: *"Principalmente en papel o conversaciones verbales, el dato no queda registrado"* → *"En sistemas digitales integrados, con acceso en tiempo real"*. El documento 6 ya trae las preguntas y opciones de BBS redactadas en este formato.
- Pantalla final de captura de datos **antes** de mostrar el resultado (título tipo "Recibe tu diagnóstico completo"), con los campos especificados en el documento 6 para cada diagnóstico (incluye WhatsApp, a diferencia del patrón de Redesign Lab que no lo tiene).
- Pantalla de resultado: nivel/radiografía + programa recomendado con link directo a su subpágina + recomendaciones complementarias si aplica.

---

## 6. Backend de captura de leads

**Arquitectura a replicar tal cual** (mismo modelo que ya corre en producción en `redesignlab.org`, código fuente real en `app/api/lead/route.ts` + `lib/lead-notify.ts` de ese repo — portar o adaptar esos mismos archivos):

- Endpoint único server-side `POST /api/lead`, que llama a una función `notifyLead()`.
- Dos canales en paralelo, ninguno bloquea al otro: **Brevo** (`api.brevo.com/v3/smtp/email`, notificación transaccional inmediata) + **Google Sheets** (service account, registro histórico en una fila).
- Éxito = al menos un canal responde OK.
- **No usar Supabase** — fue descartado deliberadamente en Redesign Lab por fallos silenciosos de un proyecto free pausado por inactividad. No repetir ese patrón.

**Configuración específica de BBS:**

| Parámetro | Valor |
|---|---|
| Spreadsheet | `Web Leads — Bio Business School` (spreadsheet propio, no pestañas dentro del de Redesign Lab) |
| Pestañas | `Diagnóstico Profesionales`, `Diagnóstico Empresas`, `Inscripciones`, `Newsletter` |
| Valores de `form` | `bbs-diagnostico-profesionales`, `bbs-diagnostico-empresas`, `bbs-enroll`, `bbs-newsletter` |
| Service account de Google | Nuevo, propio de BBS (no reutilizar el de Redesign Lab) |
| Cuenta de Brevo | La misma cuenta de Redesign Lab (confirmado, sin necesidad de cuenta separada) |
| Email de notificación | `bbs@redesignlab.org` (a confirmar en firme por Eddie, no bloquea desarrollo) |
| Campo WhatsApp | Se agrega al esquema del body y a las columnas de todas las pestañas — no existe en el modelo base de Redesign Lab, es específico de BBS |

**Variables de entorno necesarias** (no inventar valores — Claude Code debe dejarlas como placeholders/env vars a completar por Eddie o el equipo, y señalar explícitamente cuáles faltan):
- `GOOGLE_SHEET_ID` (de `Web Leads — Bio Business School`)
- Credenciales del service account de Google (típicamente `GOOGLE_SERVICE_ACCOUNT_EMAIL` + `GOOGLE_PRIVATE_KEY`, confirmar nombre exacto contra el código real de Redesign Lab)
- API key de Brevo (`BREVO_API_KEY`, confirmar nombre exacto)

**Pendiente de definir (no bloquea desarrollo, pero flaguear):** si Brevo también dispara el correo con el resultado del diagnóstico al usuario, o si eso requiere una plantilla transaccional separada a construir.

**Bloque de newsletter (footer, todas las páginas):** formulario de fricción mínima — solo campo de email, sin nombre ni teléfono. Copy: *"No te pierdas las novedades de BBS."* → botón `Suscribirme`. Usa el mismo endpoint `/api/lead` con `form: "bbs-newsletter"`.

---

## 7. Criterios de aceptación / QA

- [ ] Cero referencias a "404 Tech Found" o "404" en cualquier parte del sitio, incluido código fuente, metadata, y assets de imagen si los hay.
- [ ] Los 6 programas reflejan su estado (`live` / `reserve`) correctamente, con el CTA correspondiente.
- [ ] Los botones de pago de programas `live` llevan a Mercado Pago con el monto correcto (con descuento si corresponde al CTA presionado).
- [ ] Las 2 páginas de diagnóstico funcionan de principio a fin: preguntas → captura de datos → resultado con recomendación.
- [ ] El endpoint `/api/lead` recibe correctamente los 4 tipos de formulario (`bbs-diagnostico-profesionales`, `bbs-diagnostico-empresas`, `bbs-enroll`, `bbs-newsletter`) y escribe en la pestaña correspondiente del spreadsheet `Web Leads — Bio Business School`.
- [ ] Notificación por Brevo llega correctamente a `bbs@redesignlab.org` (o el correo final que se defina) en un envío de prueba.
- [ ] El enlace cruzado a `thousandfold.la/diagnostico` funciona desde la subpágina de Marcas Regenerativas.
- [ ] Sitio responsive / mobile-first — la mayoría del tráfico de validación de estos programas es probable que llegue desde celular.
- [ ] Ningún texto del copy final (documentos 4, 5, 6) fue alterado, resumido o parafraseado respecto a la fuente.

---

## 8. Qué debe preguntar Claude Code antes de dar por cerrado el trabajo, si algo no está claro

- Nombre exacto de las variables de entorno de Brevo/Google en el código actual de Redesign Lab, si no son accesibles directamente desde ese repo.
- Confirmación del email de notificación final si `bbs@redesignlab.org` no existe todavía como casilla activa.
- Cualquier asset de diseño adicional (íconos, ilustraciones) que Eddie quiera aportar más allá de la dirección de paleta descrita en la sección 2.
