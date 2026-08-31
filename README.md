# Bio Business School — Landing Page

Formación en IA para industrias de sistemas vivos. Plataforma de inteligencia
para bionegocios rentables en América Latina.

## Stack

- **React 18** + **Vite 5**
- **React Router 7** — enrutamiento de páginas (`/`, `/privacidad`)
- **Framer Motion 11** — animaciones de entrada y scroll-triggered
- Deploy en **Vercel**

## Tipografía

- **Syne** — headings
- **Inter** — cuerpo de texto
- **Barlow Condensed** — labels, botones y wordmark

## Paleta de colores

El sitio de Bio Business School usa dos variantes de sección: oscura y clara.

```
Oscuro (base)
--fro-bg:       #0A0A0A   Fondo principal
--fro-amber:    #FFC800   Acento (solo detalles: chips, subrayados, CTAs)
--fro-text:     #FFFFFF   Texto principal

Claro (secciones "on-light")
--fro-bg-light: #FAF8F2   Fondo de sección clara
--fro-bg-white: #FFFFFF   Fondo de tarjetas
--fro-ink:      #2B2B2B   Texto principal sobre fondo claro
```

Los colores lima y rose (`--lime`, `--rose`) que aparecen también en
`src/index.css` pertenecen a la paleta del dashboard NESsT
(`/proyecto-nesst`), un proyecto separado que comparte este repo — no forman
parte del scope de BBS.

## Páginas

```
/            Home — rediseñada en esta rama
/privacidad  Política de privacidad
```

## Estructura de la Home

Las secciones se renderizan en este orden (ver `src/pages/Home.jsx`):

```
1. Nav                      — navegación sticky
2. Hero                     — mensaje principal + CTA
3. TresEjes                 — los tres ejes de la propuesta
4. Programas                — tarjetas de programas/audiencias
5. ComunidadBiobuilders     — comunidad de Biobuilders
6. RedAliados                — red de aliados institucionales
7. DiagnosticoCTA            — CTA de diagnóstico
8. RespaldoInstitucional     — respaldo institucional
9. Endorsements               — testimonios/endosos (marquee)
10. Footer                    — pie de página
```

## Archivos del proyecto

```
├── public/                 # assets estáticos (favicon, og-cover, fuentes)
├── src/
│   ├── components/         # componentes de la Home + Nav/Footer
│   ├── pages/               # Home.jsx, Privacy.jsx
│   ├── App.jsx               # rutas (React Router)
│   ├── main.jsx
│   └── index.css              # sistema de diseño (BBS + NESsT)
├── index.html                 # entrada, meta tags, structured data (JSON-LD)
├── package.json
└── vite.config.js
```

## Instalación local

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Build

```bash
npm run build
npm run preview
```

## Deploy

El sitio se despliega en Vercel a partir del repositorio de GitHub. Un push
a la rama de producción dispara el build y deploy automáticamente.

## Créditos

Bio Business School — [biobusinessschool.org](https://biobusinessschool.org)
Powered by Redesign Lab — [redesignlab.org](https://redesignlab.org)
