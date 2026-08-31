# Home Redesign — Bio Business School

**Fecha:** 2026-08-31
**Repo:** `BBS-Thinkific` (Vite + React + React Router + Vercel serverless functions — no Next.js)
**Subsistema:** 1 de 4 (Home → Subpáginas de programa → Backend de leads → Diagnósticos), cada uno con su propio spec → plan → PR.

## 0. Contexto y por qué se descompuso así

El pedido original ("cambio significativo en BBS") cubre 4 subsistemas casi independientes: home rediseñado, 6 subpáginas de programa, backend de captura de leads (Brevo + Google Sheets), y 2 diagnósticos interactivos con scoring. Se acordó con Eddie abordarlos en ese orden, cada uno en su propia rama con PR, dado que el repo hoy tiene todos los commits directo sobre `main` (que Vercel probablemente autodespliega a producción).

Fuente de todo el copy usado en este documento: los 4 documentos de contenido adjuntados por Eddie (`BBS_Identidad_de_Marca_y_Propuesta_de_Valor.md`, `BBS_Copy_Landing_Home_v4.md`, `BBS_Propuesta_Estructura_Landing.md`, `BBS_Programas_Contenido_Consolidado.md`) — **no se resume ni parafrasea, se usa tal cual**.

## 1. Alcance de este spec

**Dentro de alcance:** rediseño completo de `/` (home) — sistema visual, navegación, footer, y las secciones especificadas en `BBS_Propuesta_Estructura_Landing.md` §1. Eliminación total de referencias a "404 Tech Found" / "Biotech Sprint 01" del código.

**Fuera de alcance (subsistemas siguientes):** contenido real de las 6 subpáginas de programa (`/programas/*`), las 2 páginas de diagnóstico (`/diagnostico/*`), y la función serverless `/api/lead`. El home *enlaza* a esas rutas y *llama* a ese endpoint, pero no los implementa.

**Política de merge:** esta rama se abre y se revisa ahora, pero **no se mergea a `main` hasta que `/programas/*` y `/diagnostico/*` existan** (subsistemas 2 y 4) — el home enlaza directamente a esas rutas reales, sin páginas stub intermedias, para no construir algo que luego se descarta. El footer también llama a `POST /api/lead` (`form: "bbs-newsletter"`), que no responderá hasta que el subsistema de backend esté listo; se acepta como gap conocido mientras esta rama no está en producción.

## 2. Sistema visual

### Paleta

```css
--bg-dark:      #0A0A0A   /* Hero, Comunidad Biobuilders, Respaldo institucional + Endorsements, Footer */
--bg-dark-2:    #131313   /* capa media del degradado radial en el Hero */
--bg-light:     #FAF8F2   /* Tres ejes, Red de aliados, superficie de card dentro de la grilla de programas */
--bg-white:     #FFFFFF   /* Los 6 programas, Diagnóstico CTA doble */
--ink:          #2B2B2B   /* texto/títulos sobre fondo claro — gris carbón neutro, SIN matiz cálido (no debe leer marrón) */
--amber:        #FFC800   /* acento puro: fill de botón, chip con borde + texto oscuro, subrayado detrás de una palabra — NUNCA como color de texto suelto sobre blanco (contraste 1.55:1, inaccesible) */
```

Decisiones de contraste verificadas (WCAG):
- `--ink` (#2B2B2B) sobre `--bg-light`/`--bg-white`: contraste ~12.9:1 — pasa AA/AAA en cualquier tamaño.
- `--amber` (#FFC800) sobre blanco como texto: 1.55:1 — inaccesible, por eso su uso se restringe a fondo de elemento (botón/chip) o efecto decorativo (subrayado), nunca a texto.

**Lima (`#C1F400`) y rosa (`#F32769`) se retiran por completo** de la identidad de BBS — no combinan con la dirección elegida. Sus variables en `index.css` quedan reservadas exclusivamente al dashboard NESsT (`--lime*`, `--rose`), que no se toca en este trabajo.

**Ritmo de secciones (oscuro/claro) en el home:**
Hero (oscuro) → Tres ejes (claro) → Los 6 programas (claro) → Comunidad Biobuilders (oscuro) → Red de aliados (claro) → Diagnóstico CTA doble (claro) → Respaldo institucional + Endorsements (oscuro) → Footer (oscuro).

### Tipografía

Se mantiene el sistema ya implementado — **no se adopta Outfit/DM Sans** pese a que el brief original los mencionaba, porque el repo actual ya corre un sistema distinto y funcional:
- **Syne** — títulos (`h1`/`h2`).
- **Inter** — cuerpo.
- **Barlow Condensed** — labels, botones, y (corrección) el **wordmark del logo**, que hoy renderiza en Syne y debe pasar a Barlow Condensed para cumplir la regla no negociable del brief (§2).

## 3. Arquitectura de componentes

### Se elimina (código de "Biotech Sprint 01" / 404 Tech Found, y código huérfano)

- `src/pages/Sprint01.jsx`
- `src/components/sprint01/` — carpeta completa (10 archivos: `Accordion`, `FAQAccordion`, `SprintCTAFinal`, `SprintCamino`, `SprintCreadores`, `SprintFAQ`, `SprintHero`, `SprintIncluye`, `SprintModulos`, `SprintNav`, `SprintParaQuien`, `SprintPricing`, `SprintProblem`, `SprintStarterKit`)
- `docs/PRD-Biotech-Sprint-01-Landing.md`
- Ruta `/sprint01` en `src/App.jsx`
- `src/components/Problem.jsx`, `BioBuilder.jsx`, `Course.jsx`, `Book.jsx`, `Community.jsx`, `Team.jsx`, `FAQ.jsx`, `HeroFroohm.jsx` — secciones del home actual, fuera de la nueva estructura de 8 secciones.
- `src/components/Hero.jsx`, `CellCanvas.jsx`, `CellSystem.jsx`, `Mission.jsx` — código ya huérfano hoy (no se importan desde ninguna ruta activa); `Mission.jsx` se usa solo como **referencia** para el nuevo diagrama Venn (ver §4) antes de borrarse.

### Se conserva, con cambios

- `Nav.jsx` — nuevos links, wordmark en Barlow Condensed, sin botón sólido persistente (ver §4).
- `Footer.jsx` — nuevo contenido + bloque de newsletter.
- `Endorsements.jsx` — repaletizado (fondo `--bg-dark`), sin "404 Tech Found", lista de partners actualizada, sin la línea de testimonios.
- `Privacy.jsx`, `lib/analytics.js`, `lib/utm.js`, `FadeIn.jsx` — sin cambios funcionales.

### Se crea (`src/components/`)

`Hero.jsx` (rewrite), `TresEjes.jsx`, `Programas.jsx`, `ComunidadBiobuilders.jsx`, `RedAliados.jsx`, `DiagnosticoCTA.jsx`, `RespaldoInstitucional.jsx`.

### `App.jsx`

En esta PR solo se modifica la ruta `/` y se retira `/sprint01`. Las rutas de `/programas/*` y `/diagnostico/*` se agregan en los subsistemas 2 y 4 respectivamente (ver política de merge, §1).

## 4. Mapeo de contenido — sección por sección

Todo el copy es verbatim de `BBS_Copy_Landing_Home_v4.md`, sin resumir ni parafrasear.

| # | Sección | Fondo | Fuente | Notas de implementación |
|---|---|---|---|---|
| 1 | Hero | oscuro | doc v4 §1 | Badge, titular, subtítulo, línea de credibilidad, stats bar (4 cifras: +30 años combinados · USD 1M en grants · USD 1.5M en deuda de impacto · USD 80M en levantamiento de capital), CTA "Ver los 6 programas" con scroll a la sección de programas en el mismo home. |
| 2 | Tres ejes | claro | doc v4 §3 | Diagrama Venn de 3 círculos, adaptado del scaffold SVG de `Mission.jsx` (círculos con gradiente radial + animación `framer-motion`), re-etiquetado a **Empresas y capital / Sistemas vivos / Inteligencia artificial** — se elimina el 4° círculo ("Protección de la biodiversidad") que no aplica al copy nuevo. Incluye la cuña de autoidentificación y la línea de cierre. |
| 3 | Los 6 programas | claro | doc v4 §4 | Grid de 6 cards (título, audiencia, nota corta, precio, "Ver programa →"). Cada card enlaza a su ruta real del sitemap: `/programas/ia-nuevos-profesionales`, `/programas/ia-profesionales-senior`, `/programas/negocios-regenerativos`, `/programas/marcas-regenerativas`, `/programas/economia-circular-industria`, `/programas/capital-de-impacto`. |
| 4 | Comunidad Biobuilders | oscuro | doc v4 §5 | CTA "Únete por WhatsApp" → `https://chat.whatsapp.com/EnVjmCxvR6Q6TaUORbLAj8` (link real, confirmado por Eddie). |
| 5 | Red de aliados | claro | doc v4 §6 | Sin CTA propio. |
| 6 | Diagnóstico — CTA doble | claro | doc v4 §7 | 2 cards → `/diagnostico/profesionales`, `/diagnostico/empresas`. |
| 7 | Respaldo institucional + Endorsements | oscuro | doc v4 §8 | Bloque combinado: texto de Respaldo institucional + marquee de `Endorsements.jsx` debajo, en la misma sección oscura (evita redundancia con el marquee, aprovecha la nota de densidad del doc de estructura). Marquee actualizado a: MIT Professional Education, Universidad de Chicago, CATIE, INCAE — sin "404 Tech Found", sin la línea de testimonios. |
| 8 | Footer | oscuro | doc v4 §9 | Wordmark, tagline, links (Programas · Comunidad · Diagnóstico · Contacto), `biobusiness@redesignlab.org`, + bloque de newsletter ("No te pierdas las novedades de BBS." → campo email → `Suscribirme`, `POST /api/lead` con `form: "bbs-newsletter"`). |

**Nav:** "Programas · Comunidad · Diagnóstico" como links de texto (sin botón sólido persistente tipo "Únete gratis" — tono más discreto/boutique, consistente con la sección 2 del brief sobre microcopy selectivo).

## 5. Testing / QA

- **Build:** `npm run build` sin errores ni warnings nuevos.
- **Grep de limpieza:** `grep -rniI "404\|biotech sprint\|sprint01"` sobre `src/`, `public/`, `docs/`, `index.html` debe devolver cero resultados (criterio de aceptación no negociable del brief, §7).
- **Contraste:** verificar con herramienta de contraste que `--ink` sobre `--bg-light`/`--bg-white` y `--amber` sobre `--bg-dark` cumplen AA en texto real (no solo en los valores calculados en este documento).
- **Responsive:** verificación mobile-first en preview del navegador (viewport móvil primero, luego desktop) — la mayoría del tráfico de validación es probable que llegue de celular (brief §7).
- **Newsletter form:** en esta rama, el submit a `/api/lead` fallará (endpoint no existe aún) — verificar que el formulario maneja el error de red sin romper la página (estado de error visible, no un crash), ya que el backend real llega en el subsistema 3.
- **Enlaces salientes:** confirmar que las 6 rutas de programa y las 2 de diagnóstico están escritas correctamente (aunque no resuelvan hasta que existan sus PRs), y que el link de WhatsApp de Comunidad Biobuilders es el correcto.

## 6. Fuera de alcance (explícito)

- Contenido de las 6 subpáginas de programa — subsistema 2.
- Función serverless `/api/lead` (Brevo + Google Sheets) — subsistema 3.
- Las 2 páginas de diagnóstico interactivo — subsistema 4.
- Cambios al dashboard privado NESsT o su paleta (`--lime*`, `--rose`, `--dark`, etc. en `index.css`) — no se toca.
