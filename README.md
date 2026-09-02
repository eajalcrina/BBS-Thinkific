# Bio Business School — biobusinessschool.org

Formación especializada en IA para profesionales y empresas de industrias
basadas en sistemas vivos, en toda América Latina. Sitio completo: home, 6
subpáginas de programa, 2 herramientas de autodiagnóstico interactivas, y el
backend de captura de leads (Brevo + Google Sheets) que las alimenta a todas.

## Stack

- **React 18** + **Vite 5**
- **React Router 7** — enrutamiento de páginas
- **Framer Motion 11** — animaciones de entrada y scroll-triggered
- **Vercel Serverless Functions** (`api/`) — backend de leads y estadísticas
- **`node:test`** — 68 tests sobre el backend (`api/`) y la lógica de los
  diagnósticos (`src/data/diagnostico*.js`)
- Deploy en **Vercel**, a partir del repositorio de GitHub

## Tipografía

- **Syne** — headings
- **Inter** — cuerpo de texto
- **Barlow Condensed** — labels, botones y wordmark
- **Newsreader** (itálica) — tratamiento "carta personal" de la sección
  Manifiesto en el home, cargada solo para esa sección, de forma diferida
  (no bloquea el render inicial — ver `index.html`)

## Paleta de colores

El sitio de Bio Business School usa dos variantes de sección: oscura y clara.

```
Oscuro (base)
--fro-bg:       #0A0A0A   Fondo principal
--fro-amber:    #FFC800   Acento (chips, subrayados, CTAs, tags)
--fro-text:     #FFFFFF   Texto principal

Claro (secciones "on-light")
--fro-bg-light: #FAF8F2   Fondo de sección clara
--fro-bg-white: #FFFFFF   Fondo de tarjetas
--fro-ink:      #2B2B2B   Texto principal sobre fondo claro
```

Los colores lima y rose (`--lime`, `--rose`) y la fuente Mluvka que aparecen
también en `src/index.css` pertenecen a la paleta del dashboard NESsT
(`/proyecto-nesst`), un proyecto separado que comparte este repo — no forman
parte del scope de BBS.

## Páginas

```
/                              Home
/programas/:slug               6 subpáginas de programa (ver slugs abajo)
/diagnostico/profesionales     Autodiagnóstico — IA para profesionales
/diagnostico/empresas          Autodiagnóstico — momento del negocio
/privacidad                    Política de privacidad
```

Slugs de programa (`src/data/programas.js`): `ia-nuevos-profesionales`,
`ia-profesionales-senior`, `negocios-regenerativos`, `marcas-regenerativas`,
`economia-circular-industria`, `capital-de-impacto`.

## Estructura de la Home

Las secciones se renderizan en este orden (ver `src/pages/Home.jsx`):

```
1. Nav                        — navegación sticky (Profesionales/Empresas/Comunidad)
2. Hero                       — mensaje principal + 2 CTAs por audiencia + link a WhatsApp
3. Endorsements                — franja de instituciones (marquee)
4. Manifiesto                  — "por qué hacemos esto", tratamiento de carta personal
5. TransformamosProfesionales  — diagnóstico + 2 programas para profesionales
6. TransformamosEmpresas       — diagnóstico + 4 programas para empresas
7. TresEjes                    — los tres ejes de la propuesta (Venn)
8. ComunidadBiobuilders        — comunidad de Biobuilders (WhatsApp)
9. RespaldoInstitucional        — respaldo institucional + fundadores
10. Footer                      — pie de página (Explorar / Contacto / Newsletter)
```

`src/components/Programas.jsx` y `src/components/DiagnosticoCTA.jsx` existen
en el repo pero ya no se usan en ningún lado (reemplazados por
`TransformamosProfesionales`/`TransformamosEmpresas`) — quedan como código
muerto, no se han borrado.

## Estructura de una subpágina de programa

Ver `src/pages/ProgramaPage.jsx`:

```
ProgramaHero → FichaTecnica → BonusExclusivo → RedAliados →
PrecioRepetido → RizomaBlock (solo Marcas Regenerativas) →
NoEsParaTi → NotaPertenencia (+ FloatingCtaBar fijo al hacer scroll)
```

El precio nunca aparece en el hero — recién en `PrecioRepetido`, después de
la ficha técnica y el bonus. Los 6 programas tienen su link real de Mercado
Pago (`mercadopagoUrl` en `programas.js`); el botón de pago redirige
directo ahí.

## Backend de leads (`api/`)

Endpoint único `POST /api/lead`, recibe `{ form, data }` y notifica en
paralelo por dos canales — ninguno bloquea al otro, éxito = al menos uno
responde OK:

- **Brevo** (`api/_lib/lead-notify.js`) — email transaccional inmediato
- **Google Sheets** (service account) — registro histórico, una fila por
  pestaña (`Newsletter`, `Inscripciones`, `Intentos de pago`, `Diagnóstico
  Profesionales`, `Diagnóstico Empresas`)

Valores de `form` soportados: `bbs-newsletter`, `bbs-enroll`, `bbs-payment`,
`bbs-diagnostico-profesionales`, `bbs-diagnostico-empresas`.

`api/diagnostico-stats.js` calcula el percentil real de Diagnóstico
Profesionales a partir de las filas ya guardadas — si hay menos de 20
respuestas acumuladas, devuelve `insufficientData` en vez de un número
inventado. Diagnóstico Empresas no tiene percentil (decisión de diseño).

### Variables de entorno

No están commiteadas — hay que configurarlas en Vercel (Project Settings →
Environment Variables, en los 3 ambientes: Production/Preview/Development)
y, para desarrollo local, en un `.env` propio:

```
GOOGLE_SHEET_ID
GOOGLE_SERVICE_ACCOUNT_EMAIL
GOOGLE_PRIVATE_KEY
BREVO_API_KEY
NOTIFICATION_EMAIL
```

Requiere **Node.js 22 o superior** en el runtime de Vercel (Project
Settings → Build and Deployment → Node.js Version) — lo declara
`package.json`'s `engines.node`, porque `google-auth-library@11` (cliente
de Google Sheets) lo exige.

## Archivos del proyecto

```
├── api/                     # serverless functions — backend de leads
│   ├── lead.js               # POST /api/lead
│   ├── diagnostico-stats.js  # GET /api/diagnostico-stats
│   └── _lib/lead-notify.js   # Brevo + Sheets, validación/saneo por form
├── test/                     # node:test — 68 tests (api/ + lógica diagnósticos)
├── public/                   # assets estáticos (favicon, og-cover, sitemap, robots.txt)
├── src/
│   ├── components/           # componentes de la Home + Nav/Footer
│   │   ├── programa/          # componentes de las subpáginas de programa
│   │   └── diagnostico/       # componentes compartidos por ambos diagnósticos
│   ├── data/                  # copy + lógica: programas.js, diagnostico*.js
│   ├── pages/                 # Home, ProgramaPage, Diagnostico*Page, Privacy
│   ├── lib/                   # analytics.js (GA4), utm.js
│   ├── App.jsx                 # rutas (React Router)
│   ├── main.jsx
│   └── index.css                # sistema de diseño (BBS + NESsT)
├── docs/superpowers/            # specs y planes de implementación (histórico)
├── index.html                   # entrada, meta tags, structured data (JSON-LD)
├── package.json
└── vercel.json
```

## Instalación local

```bash
npm install
npm run dev
# → http://localhost:5173
```

Las llamadas a `/api/*` no funcionan con `vite dev` solo (no hay runtime de
funciones serverless) — para probarlas localmente usa `vercel dev`, o
prueba directo en un Preview Deployment de Vercel.

## Tests

```bash
npm test
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

El sitio se despliega en Vercel a partir de este repositorio de GitHub. Un
push a cualquier branch dispara un Preview Deployment; un push/merge a
`main` dispara el deploy de Producción.

## Créditos

Bio Business School — [biobusinessschool.org](https://biobusinessschool.org)
Una propuesta de Eddie Ajalcriña y Lorenzo Ortiz — Powered by
[Redesign Lab](https://redesignlab.org)
Diseño y desarrollo por [Thousandfold](https://www.thousandfold.la/)
