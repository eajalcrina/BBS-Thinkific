# Subpáginas de Programa — Bio Business School

**Fecha:** 2026-08-31
**Repo:** `BBS-Thinkific` (Vite + React + React Router — mismo repo, misma rama `home-redesign`)
**Subsistema:** 2 de 4 (Home ✅ → **Subpáginas de programa** → Backend de leads → Diagnósticos)

## 0. Contexto

Subsistema 1 (Home) está completo, revisado y pusheado a la rama `home-redesign` (branch abierto, sin mergear a `main` hasta que este subsistema y el de diagnósticos existan — el home ya enlaza directo a las 6 rutas `/programas/*`). Este spec cubre esas 6 rutas.

Fuente de todo el copy: `BBS_Copy_Subpaginas_Programas.md` (template y copy completo de las 6 subpáginas) y `BBS_Programas_Contenido_Consolidado.md` (ficha técnica/temas/outcome por programa) — **verbatim, no se resume ni parafrasea**, salvo las excepciones de copy explícitamente acordadas con Eddie en esta conversación (ver §4).

## 1. Alcance

**Dentro de alcance:** las 6 subpáginas de programa en `/programas/<slug>`, cada una con su ficha completa, precio (S/ + equivalente USD informativo)/3 CTAs según estado (`live`/`reserve`), y el bloque cruzado con ThousandFold (solo en Marcas Regenerativas). Corrección del bug de Nav (anclas rotas fuera del home).

**Fuera de alcance:**
- Función serverless `/api/lead` real (Brevo + Sheets) — subsistema 3. Los formularios de captura de email y los botones de pago quedan listos para conectar, pero fallan con gracia mientras tanto (mismo patrón que el newsletter del footer).
- Integración real con Mercado Pago (crear preferencias de pago, checkout dinámico) — requiere backend; subsistema 3. El botón de pago apunta a un placeholder claramente marcado en el código.
- Las 2 páginas de diagnóstico — subsistema 4.

## 2. Arquitectura

**Una plantilla, no 6 páginas.** Los 6 programas comparten estructura idéntica (documento 5: "template consistente"), así que en vez de 6 archivos JSX casi duplicados:

- `src/data/programas.js` — array con las 6 entradas completas: slug, estado, título, audiencia, nota corta, nota extendida, ficha técnica (dirigido a / objetivo / temas clave / outcome — el formato "1 mes · 4 sesiones..." es común a los 6, va como constante compartida), bonus exclusivo, precio regular (S/ + USD), precio con descuento cuando aplica (S/ + USD, solo `reserve`), `mercadopagoUrl` (hoy `null` para los 6), y el campo opcional `rizoma` (solo Marcas Regenerativas). El mensaje de WhatsApp ("Hola, me interesa el curso [título]") se genera con el título, no se guarda como dato aparte.
- `src/components/ProgramaPage.jsx` — la plantilla, recibe los datos de un programa y renderiza las 8 secciones (ver §3).
- Ruta dinámica en `src/App.jsx`: `<Route path="/programas/:slug" element={<ProgramaPage/>} />`. Si el slug no matchea ninguno de los 6, redirige a `/#programas` (no se construye una página 404 dedicada en este subsistema).

**Nav.jsx — fix de bug:** los links `#programas`, `#comunidad`, `#diagnostico` pasan a `/#programas`, `/#comunidad`, `/#diagnostico` — hoy son anclas sueltas que en cualquier ruta que no sea `/` no llevan a ningún lado (bug preexistente, visible ahora que hay 6 páginas más donde ocurre).

## 3. Sistema visual — mismo lenguaje del home

Sin componentes ni tokens nuevos: Syne + Inter + Barlow Condensed, paleta oscuro/claro ya establecida, `.fro-card`, `.fro-chip-outline`, hover invertido. Ritmo de secciones:

1. **Hero** (oscuro) — nota corta, badge de estado (🟢/🟡), precio (S/ + USD), los 3 CTAs (pago / inscríbete / WhatsApp).
2. **Nota extendida** (clara) — el "por qué", primera persona.
3. **Ficha técnica** (clara) — dirigido a / objetivo / formato / temas clave / outcome.
4. **Bonus exclusivo** (oscuro, acento ámbar — tratamiento tipo tarjeta "live" del home, tono de diferenciador fuerte).
5. *(Solo Marcas Regenerativas)* **Diagnóstico RIZOMA de ThousandFold** — bloque cruzado, claro, con link a `thousandfold.la/diagnostico`.
6. **Precio + los 3 CTAs** (repetido — momento de decisión, con más contexto que el hero).
7. **"Esto no es para ti si..."** (claro) — lista, refuerza la comunidad curada.
8. **Nota de pertenencia** (oscuro, cierre) — "Al inscribirte te sumas a la Comunidad Biobuilders" (texto compartido, idéntico en los 6).

**Barra de CTA flotante:** aparece al hacer scroll pasado el hero (precio + botón primario), patrón estándar de landing de oferta única, acordado con Eddie.

## 4. Precios y 3 CTAs por estado — modelo revisado con Eddie

Cambio de modelo respecto a la primera versión de este spec: **los programas disponibles ahora NO llevan descuento** (precio de lista directo); **los programas en reserva llevan 30% off** (no 50% como en el documento fuente original). Se agrega el equivalente informativo en USD junto a cada precio en soles — no participa del cobro (Mercado Pago cobra en soles), solo ayuda a quien está fuera de Perú a dimensionar el precio. Los USD ya venían dados en el documento fuente para el precio de lista (tasa implícita ~S/3.35 = USD 1); el USD del precio con descuento se calcula proporcional al mismo 30%, redondeado.

| Programa | Estado | Precio de lista | Precio con descuento |
|---|---|---|---|
| IA para Nuevos Profesionales | 🟢 Disponible | S/ 297 (~USD 89) | *(sin descuento)* |
| Construcción de Marcas Regenerativas | 🟢 Disponible | S/ 597 (~USD 178) | *(sin descuento)* |
| IA para Profesionales Senior | 🟡 Reserva | S/ 497 (~USD 148) | S/ 349 (~USD 104) — 30% off |
| Construcción de Negocios Regenerativos | 🟡 Reserva | S/ 597 (~USD 178) | S/ 419 (~USD 125) — 30% off |
| Economía Circular para la Industria | 🟡 Reserva | S/ 797 (~USD 238) | S/ 559 (~USD 167) — 30% off |
| Capital de Impacto | 🟡 Reserva | S/ 997 (~USD 298) | S/ 699 (~USD 209) — 30% off |

Los programas en reserva mantienen la nota: *"Cohorte a confirmar en el tercer trimestre de 2026 (Q3)"*.

### Los 3 CTAs — jerarquía visual, no 3 botones iguales

Eddie pidió 3 caminos de conversión por programa (pago directo, inscripción con formulario, WhatsApp). Evaluado contra prácticas de conversión: 3 botones con el mismo peso visual diluye la decisión del visitante ("paradoja de elección"). Se implementan los 3, pero con jerarquía distinta:

1. **Pago — CTA primario, botón sólido (relleno ámbar).** Copy: "Pagar ahora — S/ [precio final]" para disponibles; "Reserva tu cupo con 30% off — S/ [precio con descuento]" para reserva. Mismo comportamiento de fallback ya definido (ver abajo) mientras no exista `mercadopagoUrl`.
2. **"Inscríbete" — CTA secundario, botón con contorno (outline, no relleno).** Al hacer clic, expande inline un formulario embebido (sin modal, sin redirección) con 3 campos: **nombre, correo, WhatsApp**. Al enviar, hace `POST /api/lead` con `form: "bbs-enroll"`. Mismo patrón de fallo controlado que el newsletter del footer (error visible si el endpoint aún no existe, sin romper la página).
3. **WhatsApp — CTA terciario, ícono + texto, sin peso de botón sólido.** Copy: "Escríbenos por WhatsApp". Link `https://wa.me/51974620309?text=<mensaje codificado>`, con el mensaje generado dinámicamente: *"Hola, me interesa el curso [título del programa]"*. Abre en pestaña nueva (`target="_blank" rel="noopener noreferrer"`).

**Comportamiento exacto del botón de pago (sin link real de Mercado Pago aún):** no es un link muerto. Cada programa tiene un campo `mercadopagoUrl` en los datos, hoy `null` para los 6. El botón de pago es un `<button>` (no un `<a>`), y su `onClick`:
- Si `mercadopagoUrl` existe (subsistema 3 lo completará): navega ahí directo, sin capturar nada más — Mercado Pago captura los datos del comprador después del pago, como especifica el brief.
- Si `mercadopagoUrl` es `null` (caso de hoy): hace el mismo `POST /api/lead` que el formulario de inscripción, con `form: "bbs-enroll"` y un campo extra `intento_pago: true` para distinguirlo, y muestra el mensaje *"Estamos activando los pagos — dejamos tu registro guardado, te contactamos para completar la inscripción."* en vez de silenciosamente no hacer nada. Mismo patrón de fallo controlado si el POST también falla (endpoint no existe aún): error visible, sin romper la página.

## 5. SEO por página

Cada subpágina setea `document.title` y `meta[name=description]` propios vía `useEffect` (mismo patrón ya usado en `Privacy.jsx`), más un schema JSON-LD `Course` por programa (nombre, precio, disponibilidad según estado).

## 6. Testing / QA

- `npm run build` sin errores, en cada tarea del plan.
- Grep de que no queden "15% off", "50% off" ni "Reserva tu cupo" en el código de las subpáginas — deben estar reemplazados por el nuevo modelo (0% en disponibles, 30% en reserva).
- Verificar los 6 precios con descuento y sus USD calculados coinciden exactamente con la tabla de §4.
- Verificar el link de WhatsApp de cada programa: número `51974620309` correcto, y el mensaje pre-llenado incluye el título exacto del programa, URL-encoded.
- Verificar que el formulario de "Inscríbete" se expande inline (sin modal, sin cambiar de página) y pide exactamente nombre, correo, WhatsApp.
- Verificación visual de los 6 slugs en el navegador (2 disponibles + 4 reserva), desktop y mobile, incluida la barra de CTA flotante y la jerarquía visual de los 3 CTAs (pago sólido > inscríbete outline > WhatsApp texto+ícono).
- Verificar que los links de Nav (`/#programas` etc.) funcionan desde una subpágina de programa, no solo desde el home.
- Verificar el bloque ThousandFold solo aparece en `/programas/marcas-regenerativas`.

## 7. Fuera de alcance (explícito)

- `/api/lead` real y creación de preferencias de Mercado Pago — subsistema 3.
- Las 2 páginas de diagnóstico — subsistema 4.
- Página 404 dedicada para slugs inválidos (se redirige a `/#programas`).
