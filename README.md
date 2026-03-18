# Bio Business School — Landing Page

Plataforma de inteligencia para bionegocios rentables en América Latina.

## Stack

- **React 18** + **Vite 5**
- **Framer Motion** — animaciones de entrada y micro-interacciones
- **Barlow Condensed** + **Barlow** (Google Fonts)
- Sin dependencias de UI externas — CSS propio con variables

## Estructura

```
bbs-react/
├── public/
│   ├── book-cover.jpg       # Portada del Bio Business Playbook
│   └── book-stack.jpg       # Foto de la pila de libros
├── src/
│   ├── components/
│   │   ├── Nav.jsx          # Navegación sticky con scroll detection
│   │   ├── Hero.jsx         # Hero animado con stats panel
│   │   ├── Problem.jsx      # 4 fallas del modelo actual
│   │   ├── BioBuilder.jsx   # Diagrama radial SVG animado + tabla comparativa
│   │   ├── Course.jsx       # Biotech Sprint 01 (color #f32769)
│   │   ├── Book.jsx         # Bio Business Playbook — layout editorial
│   │   ├── Community.jsx    # Membresía Starter (gratis) + formulario
│   │   ├── Team.jsx         # Equipo fundador + LinkedIn
│   │   ├── Footer.jsx       # Footer
│   │   └── FadeIn.jsx       # Wrapper de animación con IntersectionObserver
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Variables CSS + estilos globales + animaciones
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── .gitignore
```

## Instalación local

```bash
npm install
npm run dev
```

## Deploy en Vercel

El proyecto está configurado para deploy automático en Vercel:

1. Sube todos los archivos al repositorio GitHub `BBS-Thinkific`
2. En Vercel, importa el repositorio
3. Vercel detecta automáticamente el framework (Vite)
4. Los parámetros del `vercel.json` configuran el build y routing SPA

**Build command:** `npm run build`  
**Output directory:** `dist`  
**Install command:** `npm install`

## Personalización

### Colores principales (en `src/index.css`)
```css
--lime:  #C5FC00   /* Verde lima — color dominante */
--rose:  #f32769   /* Magenta — sección Biotech Sprint 01 */
--bg:    #0C0C12   /* Fondo near-black con tinte índigo */
```

### Actualizar URLs de productos
Busca los `href="#"` en `Course.jsx`, `Book.jsx` y `Community.jsx` y reemplázalos con las URLs reales de Thinkific.

### Conectar el formulario
En `Community.jsx`, la función `submit` actualmente solo cambia el estado local. Para conectarlo a un CRM:

```js
// Reemplazar en Community.jsx
const submit = async () => {
  // validación...
  await fetch('TU_ENDPOINT', {
    method: 'POST',
    body: JSON.stringify({ name, email, country, plan })
  })
  setDone(true)
}
```

## Créditos

Bio Business School — [biobusinessschool.org](https://biobusinessschool.org)  
Powered by Redesign Lab — [redesignlab.org](https://redesignlab.org)
