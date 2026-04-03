# PRD — Landing Page: Biotech Sprint 01

**Producto:** Sub-página dedicada al curso Biotech Sprint 01  
**Proyecto:** Bio Business School (biobusinessschool.org)  
**Fecha:** 2026-04-02  
**Versión:** 1.0  
**Stack:** React 18 + Vite 5 + Framer Motion 11 + CSS Variables  
**Ruta destino:** `/sprint01`

---

## 1. Objetivo

Crear una landing page dedicada para el curso **Biotech Sprint 01** que funcione como sub-página de la landing principal de Bio Business School. Esta página debe:

- Convertir visitantes en inscritos al Sprint 01 (conversión primaria)
- Comunicar la propuesta de valor diferencial: "Del Problema a la Inversión en 4 Pasos"
- Presentar el **Biotech Business Starter Kit** como entregable tangible y diferenciador
- Mantener coherencia visual total con la landing principal (design system, branding, animaciones)

**Métrica principal:** Tasa de conversión (clic en CTA de inscripción)  
**Métricas secundarias:** Scroll depth, tiempo en página, clics por sección

---

## 2. Punto de conexión con la landing principal

### Origen del tráfico
Los botones existentes en la landing principal que apuntan al Sprint 01:

| Componente | Elemento | Acción actual | Acción nueva |
|---|---|---|---|
| [Hero.jsx](src/components/Hero.jsx) | CTA "Ver Biotech Sprint 01 →" | `#curso` (scroll) | `/sprint01` (navegación) |
| [Course.jsx](src/components/Course.jsx) | CTA "Inscribirme al Sprint 01 →" | URL externa | `/sprint01` (navegación) |
| [Nav.jsx](src/components/Nav.jsx) | Link "Sprint 01" | `#curso` (scroll) | `/sprint01` (navegación) |
| [Footer.jsx](src/components/Footer.jsx) | Link "Sprint 01" | URL externa | `/sprint01` (navegación) |

### Cambio arquitectural requerido
La app actual es SPA sin router. Se requiere:

1. **Instalar `react-router-dom`** como dependencia
2. **Configurar rutas** en `App.jsx`:
   - `/` → Landing principal (componentes actuales)
   - `/sprint01` → Landing Biotech Sprint 01
3. **Actualizar `vercel.json`** — ya tiene rewrite SPA (`/(.*) → /index.html`), compatible con client-side routing
4. **Navegación de retorno:** la sub-página incluye link de regreso a `/` en el Nav

---

## 3. Design System — Criterios heredados

La sub-página **debe respetar íntegramente** el design system existente definido en [index.css](src/index.css):

### Paleta de colores
| Token | Valor | Uso en Sprint 01 |
|---|---|---|
| `--rose` | `#F32769` | Color primario de la página (hero, headers, CTAs principales) |
| `--lime` | `#C1F400` | Acentos, highlights, badges, flechas en listas |
| `--dark` | `#0E0E0E` | Fondos oscuros (módulos, FAQ) |
| `--cream` | `#F8F6F0` | Fondos claros (Starter Kit, pricing) |
| `--white` | `#FFFFFF` | Fondos de cards, contraste |

### Tipografía
| Fuente | Variable | Uso |
|---|---|---|
| Outfit | `--fout` | Headings (`t-xl`, `t-lg`, `t-md`, `t-sm`) |
| DM Sans | `--fdm` | Body text (`.lead`, `.body`, `.sm`) |
| Barlow Condensed | `--fbc` | Labels, badges, botones, datos numéricos |

### Componentes reutilizables
- Botones: `.btn-dark`, `.btn-lime`, `.btn-rose`, `.btn-outline-white`, `.btn-lg`, `.btn-full`
- Badges: `.badge-dark`, `.badge-lime`, `.badge-rose`, `.badge-white`, `.badge-cream`
- Labels: `.label`, `.label.white`, `.label.lime`
- Feature lists: `.feat`, `.feat.on-rose-bg`, `.feat.on-dark-bg`, `.feat.on-light`
- Layout: `.wrap` (max-width 1160px), `.sec`, `.sec-t`
- Animaciones: `FadeIn` component (scroll-triggered), `.float-y`, `.float-x`
- Transiciones SVG wave entre secciones (patrón usado en Course.jsx, Community.jsx)

### Patrones visuales a mantener
- Círculos decorativos con opacity baja como elementos de fondo
- Dot grid patterns como texturas sutiles
- Wave SVGs como transiciones entre secciones de diferente color
- Cards con `border-radius: 20px` y `box-shadow: 0 24px 64px rgba()`
- Scroll-triggered fade-in animations con `FadeIn` wrapper
- Responsive breakpoints: 960px, 860px, 760px, 600px, 480px

---

## 4. Arquitectura de la página — Secciones

### Estructura de secciones (orden secuencial)

```
┌─────────────────────────────────────────────┐
│  S01  NAV (sticky, variante sub-página)     │
├─────────────────────────────────────────────┤
│  S02  HERO — Rose background                │
│  Título + Tagline + CTA + Stats             │
├─────────────────────────────────────────────┤
│  S03  PROBLEMA — Dark background            │
│  "El problema con otros programas"           │
├─────────────────────────────────────────────┤
│  S04  EL CAMINO — Cream background          │
│  Diagrama 4 módulos secuenciales            │
├─────────────────────────────────────────────┤
│  S05  STARTER KIT — White background        │
│  4 piezas del entregable                    │
├─────────────────────────────────────────────┤
│  S06  MÓDULOS — Dark background             │
│  4 módulos detallados (accordion/cards)     │
├─────────────────────────────────────────────┤
│  S07  TODO INCLUIDO — Cream background      │
│  Checklist de beneficios por tier           │
├─────────────────────────────────────────────┤
│  S08  PARA QUIÉN — White background         │
│  4 perfiles de participante                 │
├─────────────────────────────────────────────┤
│  S09  PRICING — Rose background             │
│  Card de precios + CTA principal            │
├─────────────────────────────────────────────┤
│  S10  CREADORES — Dark background           │
│  BBS × 404 Tech Found                      │
├─────────────────────────────────────────────┤
│  S11  FAQ — Cream background                │
│  Preguntas frecuentes (accordion)           │
├─────────────────────────────────────────────┤
│  S12  CTA FINAL — Rose background           │
│  Cierre con urgencia + CTA                  │
├─────────────────────────────────────────────┤
│  S13  FOOTER (reutilizar componente)        │
└─────────────────────────────────────────────┘
```

---

## 5. Especificación detallada por sección

### S01 — Nav (variante sub-página)

**Componente:** `SprintNav.jsx` (o variante condicional de `Nav.jsx`)

| Elemento | Especificación |
|---|---|
| Logo | `/logo-red.png` con filter para mostrar en blanco (sobre rose) o normal (scrolled) |
| Breadcrumb | `BBS > Biotech Sprint 01` — font: `--fbc`, size: 0.72rem |
| Links internos | El Camino, Módulos, Incluye, Precios, FAQ (anclas internas de esta página) |
| CTA | "Inscribirme →" → scroll a sección pricing |
| Back link | "← Bio Business School" → `/` |
| Scroll behavior | Background: `rgba(243,39,105,0.95)` → `rgba(255,255,255,0.95)` on scroll (patrón actual adaptado a rose) |

### S02 — Hero

**Background:** `var(--rose)` con círculos decorativos (patrón de Course.jsx)  
**Layout:** Grid 2 columnas (contenido | stats card)

| Elemento | Contenido | Estilo |
|---|---|---|
| Label | `Curso especializado · Primera cohorte · 2026` | `.label.white` |
| Co-branding | Logo BBS + "× 404 Tech Found" | Logo blanco + `--fbc` 0.72rem |
| Badges | `⚡ Early Bird` · `4 semanas · Online` · `DeepTech + Business` | `.badge-lime`, `.badge-white` |
| Título | `BIOTECH` (weight 300) + `SPRINT 01` (weight 800, color lime) | `--fout`, `clamp(2.8rem, 6vw, 5.5rem)` |
| Subtítulo | "Del Problema a la Inversión: Construye tu Biotech en 4 Pasos" | `--fbc`, 0.9rem, uppercase, white 60% |
| Copy | "Cuatro semanas. Cuatro pasos. Una biotech con chances reales." | 1.05rem, white 85%, italic DM Sans |
| Descripción | Párrafo diferenciador: "No sales con conocimiento. Sales con un documento." | 0.95rem, white 80%, max-width 520px |
| CTA primario | "Inscribirme al Sprint 01 →" | `.btn-lime.btn-lg` |
| CTA secundario | "Ver qué incluye" | `.btn-outline-white` |
| Stats card (derecha) | Card blanca con 3 datos: precio desde $35, 30+ horas, 4 entregables | Estilo pricing card de Course.jsx |

**Animaciones:**
- Título: `FadeIn` con delay escalonado
- Stats card: `FadeIn` delay 0.15
- Círculos decorativos: `.float-y`, `.float-x`
- Wave SVG inferior transición a dark

### S03 — El Problema

**Background:** `var(--dark)` (patrón de Problem.jsx)  
**Objetivo:** Generar tensión — por qué los otros cursos no funcionan

| Elemento | Contenido | Estilo |
|---|---|---|
| Label | `El problema` | `.label.lime` |
| Título | "La mayoría de cursos de biotech tienen un mismo defecto" | `t-md`, `--fout`, white |
| Copy | Texto sobre "temas en paralelo sin conexión causal" | `.lead`, `--t-white2` |
| Highlight box | "Mucho conocimiento, poca acción." | Card con borde `var(--rose)`, fondo `rgba(243,39,105,0.1)` |
| Resolución | "El Biotech Sprint 01 está diseñado como un camino, no como una lista de temas." | `--lime` highlight |

**Animación:** `FadeIn` con y=28

### S04 — El Camino del Fundador

**Background:** `var(--cream)`  
**Layout:** Diagrama visual vertical con 4 nodos conectados

| Elemento | Contenido |
|---|---|
| Label | `La lógica detrás del Sprint` |
| Título | "El Camino del Fundador" |
| Diagrama | 4 nodos verticales conectados por líneas/flechas animadas |

**Diagrama — Especificación visual:**

```
  ┌─────────────────────────────┐
  │  M01 — ¿Qué problema       │  ← Badge rose
  │  quiero resolver?           │
  └──────────────┬──────────────┘
                 ↓ (flecha animada)
  ┌─────────────────────────────┐
  │  M02 — ¿Con qué tecnología │  ← Badge rose
  │  se resuelve?               │
  └──────────────┬──────────────┘
                 ↓
  ┌─────────────────────────────┐
  │  M03 — ¿Cómo se convierte  │  ← Badge rose
  │  en negocio?                │
  └──────────────┬──────────────┘
                 ↓
  ┌─────────────────────────────┐
  │  M04 — ¿Cómo se financia?  │  ← Badge rose
  └──────────────┬──────────────┘
                 ↓
  ┌─────────────────────────────┐
  │  🎯 BIOTECH BUSINESS       │  ← Card lime, destacada
  │     STARTER KIT             │
  └─────────────────────────────┘
```

- Cada nodo es un card con `border-radius: 16px`, `border-left: 4px solid var(--rose)`
- Las flechas entre nodos usan SVG animado (draw-on con Framer Motion)
- El nodo final (Starter Kit) tiene fondo `var(--lime)`, text `var(--dark)`, es más grande
- Responsive: se mantiene vertical en todas las resoluciones

**Animación:** Nodos aparecen secuencialmente con `FadeIn` y delays incrementales (0, 0.1, 0.2, 0.3, 0.4)

### S05 — Biotech Business Starter Kit

**Background:** `var(--white)`  
**Layout:** Grid 2x2 (4 cards de piezas)  
**Objetivo:** Mostrar el entregable tangible como diferenciador principal

| Elemento | Contenido | Estilo |
|---|---|---|
| Label | `Tu entregable final` | `.label` (rose) |
| Título | "Biotech Business Starter Kit" | `t-md`, `--fout` |
| Subtítulo | "4 piezas construidas semana a semana que forman el esqueleto completo de tu biotech" | `.lead` |

**4 Cards (grid 2x2 → 1 col en mobile <760px):**

| Card | Icono | Título | Descripción |
|---|---|---|---|
| 1 | `🗂️` | Problem Statement Card | Problema + mercado + ventaja LATAM |
| 2 | `🔬` | Tech Stack Card | Tecnología + madurez + costo de acceso |
| 3 | `🧩` | Bio Business Model Canvas | Canvas 8 dimensiones adaptado a biotech LATAM |
| 4 | `🗺️` | Fundraising Roadmap | Fuentes de capital + elevator pitch + 3 próximos pasos |

**Estilo de cards:**
- Background: `var(--cream)`
- Border-radius: 16px
- Padding: 1.5rem
- Hover: `translateY(-4px)`, `box-shadow: 0 16px 48px rgba(14,14,14,0.1)`
- Icono: tamaño 2rem, en un circle de 48x48px con fondo `rgba(243,39,105,0.08)`
- Título: `--fbc`, 0.85rem, uppercase, `var(--dark)`
- Descripción: `--fdm`, 0.85rem, `var(--t-dark2)`

**Nota al pie:** "El Starter Kit es el insumo directo para aplicar al Bootcamp 101" — `.sm`, `var(--t-dark3)`

### S06 — Los 4 Módulos

**Background:** `var(--dark)`  
**Layout:** 4 bloques expandibles (accordion) o 4 cards apiladas  
**Transición:** Wave SVG desde white

| Elemento | Contenido | Estilo |
|---|---|---|
| Label | `Programa · 4 módulos` | `.label.lime` |
| Título | "Qué aprenderás y qué construirás" | `t-md`, white |

**Implementación recomendada: Accordion interactivo**

Cada módulo tiene estado collapsed/expanded:

**Estado collapsed:**
- Número de módulo: badge circle (`--rose`)
- Título: "M01 — El Problema" — `--fout`, weight 500, 1.2rem
- Frase destacada en itálica (el quote del módulo)
- Flecha de expansión: `→` rota a `↓`

**Estado expanded (además del collapsed):**
- "Qué cubre el módulo:" — lista `.feat.on-dark-bg` con items del contenido
- "Sesión en vivo:" — descripción con badge `🎙️ 90 min con especialista`
- "Tu entregable:" — highlight card con fondo `rgba(193,244,0,0.06)`, borde left lime

**Contenido por módulo:**

| Módulo | Título | Quote | Entregable |
|---|---|---|---|
| M01 | El Problema | "Los problemas más grandes del siglo ya tienen un ejército de científicos..." | Problem Statement Card |
| M02 | La Tecnología | "No necesitas ser científico para entender qué tecnología usar..." | Tech Stack Card |
| M03 | El Modelo | "Tener la tecnología no es tener el negocio..." | Bio Business Model Canvas |
| M04 | El Capital | "El capital ya está buscando proyectos como el tuyo..." | Fundraising Roadmap |

**Animación:**
- Accordion: `motion.div` con `animate={{ height }}` (Framer Motion layout animation)
- Cada módulo: `FadeIn` con delay incremental
- Primer módulo abierto por defecto

### S07 — Todo lo que incluye

**Background:** `var(--cream)`  
**Layout:** 2 columnas (todos | Early Bird exclusivo)

**Columna izquierda — "Para todos los participantes":**
Checklist con `✓` en rose:
- 4 sesiones en vivo de 90 min con especialistas
- 30+ horas de material curado en plataforma BBS (Thinkific)
- Grabaciones disponibles 30 días
- Certificado digital BBS × 404 Tech Found (30h)
- Biotech Business Starter Kit completo
- Bio Business Model Canvas (plantilla propietaria)
- Simulador de Unit Economics (Google Sheets)
- Radar de Fondos LATAM 2026 (30+ fondos)
- Pitch Deck Template (8 slides, Google Slides)
- Extracto exclusivo del Bio Business Playbook

**Columna derecha — "Solo Early Bird ⚡":**
Card destacada con borde `var(--lime)`:
- 🎯 $40 de descuento directo en Bootcamp 101
- 🎙️ Sesión privada Q&A post-Sesión 04 (30 min extra)
- 🏅 Badge "Biotech Sprint Founder" (primera cohorte)

**Sección adicional — "Comunidad 404 Tech Found":**
- Precio especial $35 con código `404SPRINT`
- Mención de membresía 404 en certificado oficial

**Estilo de checklist:** Reutilizar patrón de `included` list en Course.jsx (✓ + text, gap 0.4rem)

### S08 — Para quién es

**Background:** `var(--white)`  
**Layout:** Grid 2x2 (4 perfiles) → 1 col en mobile

**4 Cards de perfiles:**

| Perfil | Título | Descripción | Quote |
|---|---|---|---|
| 🧬 | El Estudiante STEM | Biotecnología, Biología, Ing. Química, Farmacia | "El mapa del biotech que tu carrera nunca te enseñó" |
| 🔄 | El Profesional que pivotea | 2-5 años en agro, pesca, pharma, banca | "Entiende el sector que va a redefinir tu industria" |
| 🚀 | El Emprendedor en etapa cero | Tiene idea de biotech, necesita validar | "4 semanas para saber si tu biotech tiene chances reales" |
| 🧠 | El Curioso estratégico | Economía, Admin, Derecho, Comunicación | "Deja de escuchar hablar de biotech. Empieza a entenderlo" |

**Estilo de cards:**
- Background: `var(--cream)`
- Border-radius: 16px
- Padding: 1.8rem
- Header: Icono (2rem) + Título (`--fbc`, uppercase, 0.78rem, `--rose`)
- Descripción: `--fdm`, 0.88rem, `--t-dark2`
- Quote: itálica, `--fdm`, 0.85rem, `--t-dark`, border-left 3px `var(--rose)`, padding-left 1rem
- Nota superior: "No necesitas ser biólogo. No necesitas tener una empresa." — `.lead`, centrado

### S09 — Pricing (CTA principal)

**Background:** `var(--rose)` con decorative circles  
**Layout:** Centrado, card de pricing prominente  
**Este es el principal punto de conversión**

| Elemento | Contenido | Estilo |
|---|---|---|
| Label | `Precios de lanzamiento · Q2 2026` | `.label.white` |
| Título | "Invierte en tu primer biotech" | `t-md`, white, `--fout` |
| Urgencia | "La primera cohorte define el estándar. Los cupos son limitados." | `.lead`, white 80% |

**Pricing Card (centrada, max-width 420px):**
Reutilizar el diseño exacto de la pricing card en [Course.jsx:78-122](src/components/Course.jsx#L78-L122):
- Card blanca, border-radius 20px, shadow
- Lime top bar con "Precios de lanzamiento"
- 3 tiers apilados:
  - Regular: ~~$55 USD~~ (tachado, gris)
  - Early Bird: **$40 USD** (destacado, grande)
  - Comunidad 404 & Starter: $35 USD (rose)
- Checklist de incluidos
- CTA: "Inscribirme al Sprint 01 →" — `.btn-dark.btn-full.btn-lg`
- Nota: "Cupos limitados · Primera cohorte Q2 2026"

**Carga horaria (debajo del pricing card):**
Mini-tabla o lista horizontal:
| Componente | Horas |
|---|---|
| 4 módulos asincrónicos | 24h |
| 4 sesiones en vivo | 6h |
| Bienvenida + Evaluación | 45 min |
| **Total** | **30+ horas** |

### S10 — Creadores

**Background:** `var(--dark)`  
**Layout:** 2 columnas (BBS | 404 Tech Found)

| Elemento | Contenido |
|---|---|
| Label | `Creado por` |
| Título | "Bio Business School × 404 Tech Found" |
| Subtítulo | "Juntos, construimos el programa que no existía." |
| Col BBS | Logo + descripción + Eddie & Lorenzo (reutilizar data de Team.jsx) |
| Col 404 | Logo/nombre + descripción de la asociación |

**Estilo:** Similar a Team.jsx pero más compacto, sin fotos individuales. Cards con `background: var(--dark2)`, `border-radius: 16px`

### S11 — FAQ

**Background:** `var(--cream)`  
**Layout:** Accordion de preguntas/respuestas, max-width 780px centrado

**Implementación:** Accordion con Framer Motion `AnimatePresence` + `motion.div`

| Pregunta |
|---|
| ¿Necesito saber de biología o ciencias? |
| ¿Cuánto tiempo por semana necesito dedicar? |
| ¿Las sesiones en vivo son obligatorias? |
| ¿El Starter Kit lo construyo solo o hay acompañamiento? |
| ¿Qué pasa si termino el Sprint y quiero seguir? |
| ¿El Starter Kit tiene valor más allá del curso? |
| ¿Hay comunidad después del programa? |
| ¿El certificado tiene reconocimiento institucional? |

**Estilo:**
- Cada pregunta: `--fbc`, 0.9rem, weight 600, uppercase
- Respuesta: `--fdm`, 0.88rem, `--t-dark2`, line-height 1.7
- Separator: 1px solid `rgba(14,14,14,0.08)`
- Icono toggle: `+` / `−` en `var(--rose)`
- Animación expand: `motion.div` con height auto animation

### S12 — CTA Final

**Background:** `var(--rose)` (gradient sutil hacia rose-d)  
**Layout:** Centrado, compact

| Elemento | Contenido | Estilo |
|---|---|---|
| Título | "El momento es ahora" | `t-md`, white, `--fout` |
| Checklist | 5 puntos diferenciadores (✅ bullets) | Lista centrada, white |
| CTA | "Inscribirme al Sprint 01 →" | `.btn-lime.btn-lg` |
| Contacto | "¿Preguntas? bbs@redesignlab.org" | `.sm`, white 60% |
| Hashtags | #BiotechSprint01 · #CienciaQueConstruye · #BBS404 | `--fbc`, 0.7rem |

### S13 — Footer

**Componente:** Reutilizar `Footer.jsx` existente sin modificación.

---

## 6. Distribución de CTAs (Estrategia de conversión)

| # | Sección | CTA | Tipo | Destino |
|---|---|---|---|---|
| 1 | S02 Hero | "Inscribirme al Sprint 01 →" | `.btn-lime.btn-lg` | Scroll a S09 Pricing |
| 2 | S02 Hero | "Ver qué incluye" | `.btn-outline-white` | Scroll a S07 |
| 3 | S05 Starter Kit | "Ver los 4 módulos →" | `.btn-dark` | Scroll a S06 |
| 4 | S06 Módulos | "Ver precios e inscribirme →" | `.btn-lime` | Scroll a S09 |
| 5 | S07 Incluye | "Inscribirme ahora →" | `.btn-rose` | Scroll a S09 |
| 6 | S09 Pricing | "Inscribirme al Sprint 01 →" | `.btn-dark.btn-full.btn-lg` | URL de pago/checkout |
| 7 | S12 CTA Final | "Inscribirme al Sprint 01 →" | `.btn-lime.btn-lg` | URL de pago/checkout |

**Ratio:** 7 CTAs en 13 secciones — uno cada ~2 secciones, escalando en urgencia.

---

## 7. Estructura de archivos

```
src/
├── App.jsx                      ← Agregar react-router-dom
├── pages/
│   ├── Home.jsx                 ← Extraer componentes actuales aquí
│   └── Sprint01.jsx             ← Nueva página principal
├── components/
│   ├── sprint01/
│   │   ├── SprintHero.jsx
│   │   ├── SprintProblem.jsx
│   │   ├── SprintCamino.jsx
│   │   ├── SprintStarterKit.jsx
│   │   ├── SprintModulos.jsx
│   │   ├── SprintIncluye.jsx
│   │   ├── SprintParaQuien.jsx
│   │   ├── SprintPricing.jsx
│   │   ├── SprintCreadores.jsx
│   │   ├── SprintFAQ.jsx
│   │   └── SprintCTAFinal.jsx
│   ├── shared/
│   │   ├── Nav.jsx              ← Refactorizar para aceptar props de variante
│   │   ├── Footer.jsx           ← Compartido
│   │   └── FadeIn.jsx           ← Compartido
│   └── ... (componentes landing principal)
```

---

## 8. Especificaciones técnicas

### Routing
```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Sprint01 from './pages/Sprint01.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sprint01" element={<Sprint01 />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### Nav — Variante sub-página
```jsx
// Nav acepta props para personalizar
<Nav
  variant="sprint01"           // Cambia logo, colores, links
  bgInitial="var(--rose)"     // Color inicial antes de scroll
  bgScrolled="white"          // Color después de scroll
  links={sprintLinks}         // Anclas internas de la sub-página
  backLink="/"                // Link de retorno
/>
```

### Scroll a sección (smooth)
```jsx
// Para CTAs internos
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
```

### Accordion component (módulos + FAQ)
```jsx
// Componente reutilizable con Framer Motion
<Accordion items={items} allowMultiple={false}>
  <AccordionItem title="..." defaultOpen={index === 0}>
    {content}
  </AccordionItem>
</Accordion>
```

### Responsive
Seguir los breakpoints existentes:
- `960px`: Reducir padding de secciones
- `860px`: Grids 2-col → 1-col, ocultar nav links
- `760px`: Grids 2x2 → 1-col (Starter Kit, Para Quién)
- `600px`: Reducir padding lateral
- `480px`: Ajustes finales de tipografía

### Performance
- Lazy load de la página Sprint01 con `React.lazy()` + `Suspense`
- Imágenes: formatos WebP con fallback
- Fonts: ya preloaded en `index.html` (compartidas)
- Scroll animations: `FadeIn` usa `useInView` de Framer Motion (intersection observer)

---

## 9. Assets requeridos

| Asset | Tipo | Descripción | Estado |
|---|---|---|---|
| `/logo-red.png` | PNG | Logo BBS en rose (ya existe) | ✅ Existente |
| `/logo-green.png` | PNG | Logo BBS en verde (ya existe) | ✅ Existente |
| Logo 404 Tech Found | PNG/SVG | Logo de la organización partner | ❌ Necesario |
| Iconos de módulos | SVG/Emoji | Iconos para M01-M04 | Usar emojis (ya en el contenido) |
| OG Image Sprint 01 | PNG 1200x630 | Para compartir en redes sociales | ❌ Necesario |
| Favicon Sprint 01 | ICO/PNG | Si se requiere diferenciado (opcional) | Usar el existente |

---

## 10. SEO y Meta tags

```html
<title>Biotech Sprint 01 — Del Problema a la Inversión | Bio Business School</title>
<meta name="description" content="Construye el esqueleto de tu biotech en 4 semanas. Curso especializado de Bio Business School × 404 Tech Found. Desde $35 USD. Primera cohorte 2026.">
<meta property="og:title" content="Biotech Sprint 01 — Construye tu Biotech en 4 Pasos">
<meta property="og:description" content="4 semanas. 4 módulos. Un Biotech Business Starter Kit. El primer programa en español que te acompaña a construir el esqueleto de tu biotech.">
<meta property="og:image" content="/og-sprint01.png">
<meta property="og:url" content="https://biobusinessschool.org/sprint01">
<link rel="canonical" href="https://biobusinessschool.org/sprint01">
```

Implementar con `react-helmet-async` o actualizando `document.title` en `useEffect`.

---

## 11. Plan de implementación

### Fase 1 — Infraestructura (Pre-requisito)
1. Instalar `react-router-dom`
2. Refactorizar `App.jsx` con routing
3. Extraer landing actual a `pages/Home.jsx`
4. Refactorizar `Nav.jsx` para aceptar variantes via props
5. Crear estructura de carpetas `pages/` y `components/sprint01/`

### Fase 2 — Componentes core
6. `SprintHero.jsx` — Hero con pricing mini-card
7. `SprintProblem.jsx` — Sección de problema
8. `SprintCamino.jsx` — Diagrama 4 módulos
9. `SprintStarterKit.jsx` — Grid de 4 piezas
10. `SprintModulos.jsx` — Accordion de módulos detallados

### Fase 3 — Componentes de conversión
11. `SprintIncluye.jsx` — Checklist de beneficios
12. `SprintParaQuien.jsx` — 4 perfiles
13. `SprintPricing.jsx` — Card de precios principal
14. `SprintFAQ.jsx` — Accordion de FAQ

### Fase 4 — Cierre y conexión
15. `SprintCreadores.jsx` — BBS × 404
16. `SprintCTAFinal.jsx` — Cierre con urgencia
17. `Sprint01.jsx` — Página ensamblada
18. Actualizar links en landing principal (Hero, Course, Nav, Footer)
19. CSS adicional específico para Sprint 01 (si necesario)

### Fase 5 — Polish
20. Animaciones y transiciones entre secciones
21. Meta tags SEO
22. Testing responsive en todos los breakpoints
23. Performance audit (Lighthouse)
24. Deploy a Vercel

---

## 12. Criterios de aceptación

- [ ] La página es accesible desde `/sprint01`
- [ ] Todos los CTAs de la landing principal que refieren al Sprint 01 navegan a `/sprint01`
- [ ] El design system (colores, tipografía, componentes) es idéntico al de la landing principal
- [ ] Las animaciones scroll-triggered funcionan con `FadeIn` y Framer Motion
- [ ] Las transiciones SVG wave conectan secciones visualmente
- [ ] El accordion de módulos y FAQ funciona correctamente
- [ ] La pricing card replica el diseño de Course.jsx con el contenido actualizado
- [ ] La página es fully responsive en los 5 breakpoints definidos
- [ ] El contenido refleja fielmente el documento fuente (4 semanas, no 8)
- [ ] Navegación de retorno a la landing principal funciona
- [ ] Meta tags SEO están configurados
- [ ] Lighthouse Performance score > 90
- [ ] Todos los links internos (anclas) funcionan con smooth scroll

---

## 13. Notas de contenido importantes

**Discrepancia detectada:** La landing principal (Course.jsx) dice "8 semanas" pero el documento fuente dice **4 semanas**. El PRD sigue el documento fuente (4 semanas, 4 módulos, 30+ horas). Se debe actualizar también Course.jsx en la landing principal para mantener consistencia.

**Precios confirmados:**
- Regular: $55 USD
- Early Bird: $40 USD (primeros 100 inscritos o 72h)
- Comunidad 404 (código 404SPRINT): $35 USD
- Comunidad Biobuilders Starter: $35 USD

**Tono de voz:** Directo, sin adornos, orientado a acción. Usa "tú" (informal). Combina rigor técnico con accesibilidad. Las frases de impacto son cortas y declarativas.
