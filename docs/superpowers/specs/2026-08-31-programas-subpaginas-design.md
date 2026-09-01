# Subpáginas de Programa — Bio Business School

**Fecha:** 2026-08-31
**Repo:** `BBS-Thinkific` (Vite + React + React Router — mismo repo, misma rama `home-redesign`)
**Subsistema:** 2 de 4 (Home ✅ → **Subpáginas de programa** → Backend de leads → Diagnósticos)

## 0. Contexto

Subsistema 1 (Home) está completo, revisado y pusheado a la rama `home-redesign` (branch abierto, sin mergear a `main` hasta que este subsistema y el de diagnósticos existan — el home ya enlaza directo a las 6 rutas `/programas/*`). Este spec cubre esas 6 rutas.

Fuente de todo el copy: `BBS_Copy_Subpaginas_Programas.md` (template y copy completo de las 6 subpáginas) y `BBS_Programas_Contenido_Consolidado.md` (ficha técnica/temas/outcome por programa) — **verbatim, no se resume ni parafrasea**, salvo las excepciones de copy explícitamente acordadas con Eddie en esta conversación (ver §4).

## 1. Alcance

**Dentro de alcance:** las 6 subpáginas de programa en `/programas/<slug>`, cada una con su ficha completa, precio/CTA según estado (`live`/`reserve`), y el bloque cruzado con ThousandFold (solo en Marcas Regenerativas). Corrección del bug de Nav (anclas rotas fuera del home).

**Fuera de alcance:**
- Función serverless `/api/lead` real (Brevo + Sheets) — subsistema 3. Los formularios de captura de email y los botones de pago quedan listos para conectar, pero fallan con gracia mientras tanto (mismo patrón que el newsletter del footer).
- Integración real con Mercado Pago (crear preferencias de pago, checkout dinámico) — requiere backend; subsistema 3. El botón de pago apunta a un placeholder claramente marcado en el código.
- Las 2 páginas de diagnóstico — subsistema 4.

## 2. Arquitectura

**Una plantilla, no 6 páginas.** Los 6 programas comparten estructura idéntica (documento 5: "template consistente"), así que en vez de 6 archivos JSX casi duplicados:

- `src/data/programas.js` — array con las 6 entradas completas: slug, estado, título, audiencia, nota corta, nota extendida, ficha técnica (dirigido a / objetivo / temas clave / outcome — el formato "1 mes · 4 sesiones..." es común a los 6, va como constante compartida), bonus exclusivo, precio regular, precio con descuento, y el campo opcional `rizoma` (solo Marcas Regenerativas).
- `src/components/ProgramaPage.jsx` — la plantilla, recibe los datos de un programa y renderiza las 8 secciones (ver §3).
- Ruta dinámica en `src/App.jsx`: `<Route path="/programas/:slug" element={<ProgramaPage/>} />`. Si el slug no matchea ninguno de los 6, redirige a `/#programas` (no se construye una página 404 dedicada en este subsistema).

**Nav.jsx — fix de bug:** los links `#programas`, `#comunidad`, `#diagnostico` pasan a `/#programas`, `/#comunidad`, `/#diagnostico` — hoy son anclas sueltas que en cualquier ruta que no sea `/` no llevan a ningún lado (bug preexistente, visible ahora que hay 6 páginas más donde ocurre).

## 3. Sistema visual — mismo lenguaje del home

Sin componentes ni tokens nuevos: Syne + Inter + Barlow Condensed, paleta oscuro/claro ya establecida, `.fro-card`, `.fro-chip-outline`, hover invertido. Ritmo de secciones:

1. **Hero** (oscuro) — nota corta, badge de estado (🟢/🟡), precio, CTA primario + secundario.
2. **Nota extendida** (clara) — el "por qué", primera persona.
3. **Ficha técnica** (clara) — dirigido a / objetivo / formato / temas clave / outcome.
4. **Bonus exclusivo** (oscuro, acento ámbar — tratamiento tipo tarjeta "live" del home, tono de diferenciador fuerte).
5. *(Solo Marcas Regenerativas)* **Diagnóstico RIZOMA de ThousandFold** — bloque cruzado, claro, con link a `thousandfold.la/diagnostico`.
6. **Precio + CTA** (repetido — momento de decisión, con más contexto que el hero).
7. **"Esto no es para ti si..."** (claro) — lista, refuerza la comunidad curada.
8. **Nota de pertenencia** (oscuro, cierre) — "Al inscribirte te sumas a la Comunidad Biobuilders" (texto compartido, idéntico en los 6).

**Barra de CTA flotante:** aparece al hacer scroll pasado el hero (precio + botón primario), patrón estándar de landing de oferta única, acordado con Eddie.

## 4. CTAs por estado — copy acordado con Eddie (reemplaza el texto del documento fuente)

| Estado | Precio regular | CTA primario | CTA secundario |
|---|---|---|---|
| 🟢 Disponible (IA Nuevos Profesionales, Marcas Regenerativas) | S/ 297 · S/ 597 | "Pagar ahora con 15% off — S/ [249 / 499]" → Mercado Pago | "Quiero más información" → solo email |
| 🟡 Reserva (los otros 4) | S/ 497 · S/ 597 · S/ 797 · S/ 997 | **"Inscríbete hoy con 50% off — S/ [precio]"** → Mercado Pago | "Solo avísame cuando abra" → solo email |

Nota: el documento fuente (`BBS_Copy_Subpaginas_Programas.md`) usa "Reserva tu cupo con 50% off" para el CTA primario de los programas reserva — Eddie pidió explícitamente cambiarlo a "Inscríbete hoy con 50% off" en esta conversación, para promover más el registro directo. Se usa el texto nuevo, no el del documento.

Los programas reserva mantienen la nota: *"Cohorte a confirmar en el tercer trimestre de 2026 (Q3)"*.

**Comportamiento exacto del botón de pago (sin link real de Mercado Pago aún):** no es un link muerto. Cada programa tiene un campo `mercadopagoUrl` en los datos, hoy `null` para los 6. El botón primario es un `<button>` (no un `<a>`), y su `onClick`:
- Si `mercadopagoUrl` existe (subsistema 3 lo completará): navega ahí directo, sin capturar nada más — Mercado Pago captura los datos del comprador después del pago, como especifica el brief.
- Si `mercadopagoUrl` es `null` (caso de hoy): hace el mismo `POST /api/lead` que el CTA secundario, con `form: "bbs-enroll"` y un campo extra `intento_pago: true` para distinguirlo, y muestra el mensaje *"Estamos activando los pagos — dejamos tu registro guardado, te contactamos para completar la inscripción."* en vez de silenciosamente no hacer nada. Mismo patrón de fallo controlado que el newsletter del footer si el POST también falla (endpoint no existe aún): error visible, sin romper la página.

El CTA secundario (solo email) sigue el mismo patrón de captura ya usado en el newsletter, sin el campo `intento_pago`.

## 5. SEO por página

Cada subpágina setea `document.title` y `meta[name=description]` propios vía `useEffect` (mismo patrón ya usado en `Privacy.jsx`), más un schema JSON-LD `Course` por programa (nombre, precio, disponibilidad según estado).

## 6. Testing / QA

- `npm run build` sin errores, en cada tarea del plan.
- Grep de que no quede "Reserva tu cupo" en el código (debe estar reemplazado por el nuevo copy).
- Verificación visual de los 6 slugs en el navegador (2 disponibles + 4 reserva), desktop y mobile, incluida la barra de CTA flotante.
- Verificar que los links de Nav (`/#programas` etc.) funcionan desde una subpágina de programa, no solo desde el home.
- Verificar el bloque ThousandFold solo aparece en `/programas/marcas-regenerativas`.

## 7. Fuera de alcance (explícito)

- `/api/lead` real y creación de preferencias de Mercado Pago — subsistema 3.
- Las 2 páginas de diagnóstico — subsistema 4.
- Página 404 dedicada para slugs inválidos (se redirige a `/#programas`).
