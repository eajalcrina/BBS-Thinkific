# Bio Business School — Landing Page v6

Plataforma de inteligencia para bionegocios rentables en América Latina.

## Concepto de diseño: "Bioluminiscencia Estratégica"

La biodiversidad de LATAM emite luz en la oscuridad — como organismos bioluminiscentes.
Los colores lima y rose son puntos de luz que emergen de un fondo profundo oscuro.

## Stack

- **React 18** + **Vite 5**
- **Framer Motion 11** — animaciones de entrada y SVG animado
- **Outfit** (display/títulos) — geométrica moderna, weight 300/600
- **DM Sans** (cuerpo) — humanista y legible
- **Barlow Condensed** — logo y labels, mantenida como referencia de marca

## Paleta de colores

```
--lime:   #C8F000   Verde lima BBS — acento primario (bioluminiscencia)
--rose:   #F32769   Magenta BBS — exclusivo Sprint 01 + énfasis secundario
--bg:     #070810   Fondo near-black con tinte índigo profundo
--bg2:    #0C0C1A   Superficie de sección
--bg3:    #101024   Superficie elevada
Glassmorphism: rgba(12,12,26,0.7) + backdrop-filter: blur(12px)
```

## Estructura de secciones

```
1. Hero          — orbes bioluminiscentes CSS animados, stats panel glassmorphism
2. Mission       — diagrama Venn SVG animado (del deck de BBS)
3. Problem       — 4 fallas del modelo actual, cards glassmorphism
4. BioBuilder    — diagrama radial orbiting SVG + tabla MBA vs BioBuilder
5. Course        — Biotech Sprint 01 con rose #F32769 como color dominante
6. Book          — Bio Business Playbook, precio $25 prominente, mockup con foto real
7. Community     — Starter gratis + PRO + formulario de captación
8. Team          — Eddie y Lorenzo con LinkedIn, sección bg diferenciado
9. Footer        — logo verde, links organizados
```

## Archivos del proyecto

```
bbs-react/
├── public/
│   ├── logo-green.png    # Logo verde (nav + footer)
│   ├── logo-red.png      # Logo rojo (sección Sprint 01)
│   ├── book-cover.jpg    # Portada del Playbook
│   └── book-stack.jpg    # Foto de la pila de libros (mockup)
├── src/
│   ├── components/
│   │   ├── Nav.jsx       # Sticky nav con blur + scroll detection
│   │   ├── Hero.jsx      # Hero con orbes animados + stats panel
│   │   ├── Mission.jsx   # Venn diagram SVG animado
│   │   ├── Problem.jsx   # 4 cards glassmorphism
│   │   ├── BioBuilder.jsx# Diagrama orbital + tabla comparativa
│   │   ├── Course.jsx    # Sprint 01 con rose dominante
│   │   ├── Book.jsx      # Libro con precio $25 prominente
│   │   ├── Community.jsx # Membresía gratis + formulario
│   │   ├── Team.jsx      # Equipo con LinkedIn
│   │   ├── Footer.jsx    # Footer completo
│   │   └── FadeIn.jsx    # Wrapper animación scroll-triggered
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css         # Sistema de diseño completo
├── index.html            # Entrada con fuentes precargadas
├── package.json
├── vite.config.js
├── vercel.json
└── .gitignore
```

## Instalación local

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Deploy en Vercel desde GitHub

```bash
# 1. Descomprime y entra al directorio
unzip bbs-react.zip && cd bbs-react

# 2. Inicializa git y conecta con tu repositorio
git init
git remote add origin https://github.com/eajalcrina/BBS-Thinkific.git
git add .
git commit -m "feat: v6 - Bioluminiscencia Estratégica, Outfit+DM Sans, Venn animado"
git push origin main --force

# 3. Vercel despliega automáticamente al detectar el push
```

## Personalización de URLs

Busca los `href` de estos botones y actualiza con las URLs reales:

| Botón | Archivo | URL actual |
|-------|---------|-----------|
| Inscribirme al Sprint 01 | Course.jsx | `https://biobusinessschool.org/sprint01` |
| Comprar Playbook digital | Book.jsx | `https://biobusinessschool.org/playbook` |
| LinkedIn Eddie | Team.jsx | `https://www.linkedin.com/in/eddieajalcrina/` |
| LinkedIn Lorenzo | Team.jsx | `https://www.linkedin.com/in/lorenzoo/` ← verificar handle |

## Conectar formulario de comunidad

En `Community.jsx`, reemplaza la función `submit`:

```js
const submit = async () => {
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!name || !ok) { setErr(true); return }
  
  // Ejemplo con Mailchimp, ConvertKit, HubSpot, Zapier o tu endpoint propio:
  await fetch('https://tu-endpoint.com/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, country, plan })
  })
  
  setErr(false)
  setDone(true)
}
```

## Créditos

Bio Business School — [biobusinessschool.org](https://biobusinessschool.org)
Powered by Redesign Lab — [redesignlab.org](https://redesignlab.org)
