# Content Update: Home restructuring + Programa pricing sync

> Fuente de verdad para el copy exacto: los 4 documentos en
> `docs/superpowers/specs/content-update-2026-09-02/` (copias de los
> archivos que Eddie compartió el 2026-09-02). **No parafrasear ni
> resumir ese copy — usarlo tal cual**, como pide el brief
> (`BBS_Brief_Claude_Code.md`, sección 7, último ítem del checklist de
> QA). Este documento es el diff contra lo ya implementado, más las
> decisiones que Eddie confirmó — no repite el copy completo salvo
> donde hace falta para dejar los pasos ejecutables.

## Contexto

El home y las 6 subpáginas de programa (subsistemas 1-2 de este
proyecto) ya están construidos y en producción en esta rama. Eddie hizo
ediciones de wording, estructura, manifiesto y ubicación de precios
sobre el contenido base, y las compartió en 4 documentos actualizados.
Este spec cubre exclusivamente el diff entre esos documentos y el
código actual — no es una reconstrucción desde cero, y no toca el
backend de leads ni los diagnósticos (subsistemas 3-4, ya completos).

## Decisiones ya confirmadas por Eddie (2026-09-02)

1. **Reestructuración del home en dos bloques por audiencia**
   ("Transformamos Profesionales" / "Transformamos Empresas") —
   confirmado, procede ahora. Esto es lo que había quedado pospuesto
   como follow-up durante el brainstorm de Diagnóstico Empresas.
2. **"Red de Aliados" se mantiene fuera del home** — la decisión del
   31 de agosto de moverla solo a las subpáginas de programa sigue
   vigente; el listado de esa sección en el doc v5 (sección 8) no
   aplica. `src/components/RedAliados.jsx` no se toca (ya vive en las
   subpáginas via `NotaPertenencia`/bonus, verificar que sigue ahí; si
   no está enlazada a ninguna subpágina, es un hallazgo a reportar, no
   asumir).
3. **Audiencia de "Economía Circular para la Industria" se mantiene
   como "Industria"** (no "Industria pesada") — consistente con el
   cambio explícito que Eddie ya hizo esta sesión para no sonar
   limitante. Aplica solo al campo `audiencia` usado en la ficha del
   home; el resto del copy de esa subpágina (que sí habla de
   "industrias intensivas en recursos") no cambia.
4. **El CTA secundario de las subpáginas de programa NO cambia** — se
   mantiene "Inscríbete" con el formulario de 3 campos
   (nombre+email+WhatsApp) tal como está hoy. El texto del documento
   de subpáginas ("Quiero más información" / "Solo avísame cuando
   abra", captura solo email) NO se implementa — es una discrepancia
   conocida entre el documento y la implementación actual que Eddie
   decidió no resolver en esta pasada.

## Alcance — Home (`src/pages/Home.jsx` y sus componentes)

Orden final de secciones en Home, por sección del doc v5
(`BBS_Copy_Landing_Home_v5.md`):

1. Hero (existe, se edita)
2. Manifiesto (**nueva sección**)
3. Los tres ejes (existe, sin cambios de copy — verificar que ya
   coincide)
4. Franja de instituciones (**se extiende una sección ya existente**,
   ver abajo — no es 100% nueva)
5. Transformamos Profesionales (**nueva sección**, reemplaza el rol de
   la mitad de `Programas.jsx` + la mitad de `DiagnosticoCTA.jsx`)
6. Transformamos Empresas (**nueva sección**, reemplaza la otra mitad)
7. Comunidad Biobuilders (existe, se edita el copy)
8. ~~Red de aliados~~ — NO se agrega (decisión confirmada arriba)
9. Respaldo institucional (existe, se reescribe)
10. Footer (existe, se edita solo la lista de links)

`src/components/Programas.jsx` y `src/components/DiagnosticoCTA.jsx`
quedan sin uso en Home tras este cambio — no se importan más desde
`Home.jsx`. No borrar los archivos (podrían reutilizarse o hay
referencias en tests/otros lados) salvo que una búsqueda confirme que
no los usa nada más; si algo más los importa, hay que dejar constancia
en el plan y decidir ahí.

### 1. Hero (`src/components/Hero.jsx`)

Reemplazar copy con el contenido exacto de
`BBS_Copy_Landing_Home_v5.md`, sección 1:

- Badge: `Formación especializada · Industrias de sistemas vivos · Perú, Colombia y LATAM`
- Titular (h1): `Transformamos América Latina con inteligencia territorial y artificial.`
- Párrafo 1 (`fro-lead`): el texto exacto de "Párrafo 1 (apertura personal)" en el doc.
- Párrafo 2 (`fro-sm`): el texto exacto de "Párrafo 2 (credibilidad)" en el doc.
- CTA: se mantiene `Ver los 6 programas` (sin cambios), pero el
  `href="#programas"` deja de apuntar a una sección con ese id (ver
  sección "Franja de instituciones" y "Transformamos..." más abajo
  para el id real que debe usar). Decidir el ancla final durante el
  plan — probablemente apunte a la primera de las dos secciones
  nuevas, o a un ancla compartida. No dejarlo roto.
- **Quitar** el bloque `hero-stats` completo (el array `STATS` y su
  render) — esos mismos números se trasladan a Respaldo Institucional
  (ver más abajo), no se duplican.

### 2. Manifiesto — nueva sección

Nuevo componente `src/components/Manifiesto.jsx`, siguiendo el patrón
de cualquier sección existente (`FadeIn`, `fro-eyebrow`, `fro-h2` o
similar, `fro-wrap`). Contenido exacto: `BBS_Copy_Landing_Home_v5.md`
sección 2 — antetítulo `Por qué hacemos esto`, y las 5 líneas del
manifiesto tal cual (son líneas cortas separadas, no un párrafo
corrido — respetar los saltos de línea/blockquote del doc como
párrafos o líneas separadas). Insertar en `Home.jsx` justo después del
`Hero`.

### 3. Los tres ejes (`src/components/TresEjes.jsx`)

Comparado contra `BBS_Copy_Landing_Home_v5.md` sección 3: el
antetítulo, título, cuña de autoidentificación y línea de cierre ya
coinciden con el código actual (verificado en la exploración de este
spec). **No requiere cambios de copy.** Confirmar en el plan con una
comparación línea por línea antes de dar el paso por cerrado, por si
hay una diferencia sutil no detectada.

### 4. Franja de instituciones — extender `Endorsements.jsx`

`src/components/Endorsements.jsx` ya es casi exactamente esta sección
(un marquee horizontal usando las clases CSS `.fro-marquee` /
`.fro-marquee-track` ya definidas en `src/index.css:312-321`), pero:

- Le faltan 3 instituciones: `University of the Arts London`, `FIT —
  Fashion Institute of Technology (Nueva York)`, `Parsons School of
  Design (Nueva York)`. Agregarlas al array `PARTNERS`, en el orden
  del doc.
- No tiene el antetítulo `Docentes y speakers en` que pide el doc — el
  componente actual no renderiza ningún texto, solo el marquee.
  Agregarlo (usar el patrón `fro-eyebrow` de otras secciones).
- Está posicionado al final del home (después de
  `RespaldoInstitucional`). Debe moverse a la posición 4 (después de
  "Los tres ejes", antes de las dos secciones de audiencia), por eso
  el orden en la sección "Alcance — Home" de este documento.
- Puede conservar su nombre de archivo/componente (`Endorsements`) o
  renombrarse a algo más descriptivo (`FranjaInstituciones`) — decisión
  de estilo del implementador, sin impacto funcional. Si se renombra,
  actualizar el único import en `Home.jsx`.

### 5-6. Transformamos Profesionales / Transformamos Empresas — nuevas secciones

Dos nuevos componentes (sugerido:
`src/components/TransformamosProfesionales.jsx` y
`TransformamosEmpresas.jsx`), cada uno con:

- Antetítulo + título + línea de justificación (copy exacto de
  `BBS_Copy_Landing_Home_v5.md` secciones 5 y 6).
- Layout de 2 columnas (usar el patrón de grid `1fr 1fr` con colapso a
  `1fr` en mobile, como ya hacen `Programas.jsx` y `DiagnosticoCTA.jsx`
  hoy — mismo enfoque, breakpoint ~720-960px).
- **Columna izquierda**: el bloque de diagnóstico correspondiente —
  mismo contenido/comportamiento que las tarjetas actuales de
  `DiagnosticoCTA.jsx` (link a `/diagnostico/profesionales` o
  `/diagnostico/empresas`, mismo tracking `trackCta`), pero con el
  copy nuevo de cada línea de justificación + nota, y ya no en un grid
  de 2 tarjetas iguales sino como un bloque único por sección.
- **Columna derecha**: fichas de programa — reutilizar el patrón visual
  de tarjeta de `Programas.jsx` (`fro-card`, badge "Disponible ahora"
  para `live`), filtrando `PROGRAMAS` por audiencia (2 profesionales:
  `ia-nuevos-profesionales`, `ia-profesionales-senior`; 4 empresas: los
  otros 4 slugs, en el orden que lista el doc v5 sección 6:
  negocios-regenerativos, marcas-regenerativas,
  economia-circular-industria, capital-de-impacto).
- **La ficha ya NO muestra el precio** (`S/ {precioRegular}` chip que
  hoy se ve en `Programas.jsx:39` se elimina). En su lugar: solo `Ver
  programa →`, y cuando el programa lo amerita, el tag corto que
  especifica el doc v5:
  - IA Nuevos Profesionales: sin tag, solo `Ver programa →`
  - IA Profesionales Senior: `30% off por pronto pago`
  - Negocios Regenerativos: `30% off por pronto pago`
  - Marcas Regenerativas: `Precio especial`
  - Economía Circular: `30% off por pronto pago`
  - Capital de Impacto: `30% off por pronto pago`

  Necesita un campo nuevo en `src/data/programas.js` (ej. `tagHome:
  string | null`) para no hardcodear esta lista en el componente —
  seguir el patrón de datos ya existente (todo el copy vive en
  `programas.js`, los componentes solo renderizan).
- ids de sección: usar `id="profesionales"` y `id="empresas"` (no
  `id="programas"` ni `id="diagnostico"`, que dejan de existir como
  secciones propias) — estos ids son los que debe usar el nuevo footer
  y el Hero CTA.

### 7. Comunidad Biobuilders (`src/components/ComunidadBiobuilders.jsx`)

Reemplazar el párrafo `fro-lead` con el texto exacto de
`BBS_Copy_Landing_Home_v5.md` sección 7 (quita el framing "No es un
producto que se vende..." y la mención a "todo egresado se suma
automáticamente"; queda una invitación directa con el beneficio en una
sola frase). Antetítulo, título y CTA (`Únete por WhatsApp →`) no
cambian.

### 9. Respaldo institucional (`src/components/RespaldoInstitucional.jsx`)

Reemplazar el párrafo `fro-lead` con el texto exacto de
`BBS_Copy_Landing_Home_v5.md` sección 9 — ya no nombra
MIT/Chicago/CATIE/INCAE (ahora en la franja de instituciones), en su
lugar lleva los números de trayectoria (30 años, USD 1M, USD 1.5M, USD
80M) en texto corrido, terminando en la conexión a "negocios
regenerativos y bioeconomía" en vez de "seguimos sumando alianzas".
El bloque de fundadores (`FOUNDERS.map`, fotos + LinkedIn) no cambia.

### 10. Footer (`src/components/Footer.jsx`)

El array `LINKS` interno (línea ~88-93) cambia de:
```js
['Programas', '/#programas'],
['Comunidad', '/#comunidad'],
['Diagnóstico', '/#diagnostico'],
['Contacto', 'mailto:biobusiness@redesignlab.org'],
```
a los 3 links que pide el doc v5 sección 10 — `Profesionales`,
`Empresas`, `Comunidad` — apuntando a los ids nuevos (`/#profesionales`,
`/#empresas`, `/#comunidad`). El doc no menciona explícitamente si
"Contacto" se mantiene; dado que el doc solo dice "Links: Profesionales
· Empresas · Comunidad" sin excluir contacto explícitamente y el email
de contacto (`biobusiness@redesignlab.org`) sigue apareciendo en el
footer por otro lado (línea 92 del doc: el bloque
`biobusiness@redesignlab.org` se lista aparte de "Links"), lo más fiel
es dejar el link de Contacto fuera de la lista de "Links" pero
mantener el correo visible en el footer de alguna otra forma (ej. como
texto plano junto al logo, o una línea aparte) — decidir el detalle
visual durante el plan, pero no perder el dato de contacto.

### `src/components/Nav.jsx` — no mencionado en los docs, pero requiere el mismo fix

El array `LINKS` de la navegación superior (línea 5-9) apunta a
`/#programas` y `/#diagnostico`, que dejan de existir como secciones.
Esto no está en ningún doc (los docs solo hablan del footer), pero es
una consecuencia técnica directa de la reestructuración del home — si
no se actualiza, los links de navegación quedan rotos (no hacen scroll
a nada). Actualizar a los mismos 3 destinos que el footer:
`/#profesionales`, `/#empresas`, `/#comunidad` (mismas etiquetas que
el footer, para consistencia — el doc no da un texto distinto para el
nav).

## Alcance — Programas (`src/data/programas.js`, componentes de subpágina)

### Precios — cambian 4 de 6 programas

Valores nuevos exactos (fuente:
`BBS_Programas_Contenido_Consolidado.md`, tabla de referencia rápida +
`BBS_Copy_Subpaginas_Programas.md`, sección "Precio" de cada programa).
USD calculado con el mismo ratio ~3.35 PEN/USD que ya usan los valores
actuales del código (verificado: 297/89, 497/148, 597/178, 797/238,
997/298 dan todos ≈3.35 — se mantiene esa convención para los campos
que el doc no da en USD explícito):

| slug | precioRegular | precioRegularUsd | precioDescuento | precioDescuentoUsd |
|---|---|---|---|---|
| `ia-nuevos-profesionales` | 297 → **197** | 89 → **59** | null (sin cambio) | null |
| `ia-profesionales-senior` | 497 → **397** | 148 → **118** | 349 → **278** | 104 → **83** |
| `negocios-regenerativos` | 597 → **497** | 178 → **148** | 419 → **348** | 125 → **104** |
| `marcas-regenerativas` | 597 (sin cambio) | 178 (sin cambio) | null → **499** | null → **149** |
| `economia-circular-industria` | 797 → **497** | 238 → **148** | 559 → **348** | 167 → **104** |
| `capital-de-impacto` | 997 (sin cambio) | 298 (sin cambio) | 699 → **698** | 209 → **208** |

**`marcas-regenerativas` es el caso especial**: hoy tiene
`precioDescuento: null` (nunca mostró descuento), pero es `status:
'live'` y el doc pide un CTA primario de "Pagar ahora con 15% off —
S/499" — un descuento en un programa `live`, algo que el código de
`usePaymentCta.js` no contempla hoy (ese hook solo genera copy de
descuento para `status === 'reserve'`; todo `live` muestra el precio
regular sin descuento). Ver siguiente sub-sección.

### `usePaymentCta.js` — lógica de label necesita un tercer caso

Estado actual (línea 7-9):
```js
const label = programa.status === 'live'
  ? `Pagar ahora — S/ ${programa.precioRegular} (~USD ${programa.precioRegularUsd})`
  : `Reserva tu cupo con 30% off — S/ ${programa.precioDescuento} (~USD ${programa.precioDescuentoUsd})`
```
Necesita distinguir "live sin descuento" (IA Nuevos Profesionales) de
"live con descuento" (Marcas Regenerativas). Regla: si
`programa.precioDescuento` existe, usar el precio con descuento en el
label sin importar el status; el texto varía por status:
- `live` + `precioDescuento` presente → `Pagar ahora con 15% off — S/
  {precioDescuento} (~USD {precioDescuentoUsd})` (el "15%" es
  específico de Marcas — no hardcodear el porcentaje en el hook si se
  puede evitar; si se necesita un número, considerar agregar un campo
  `descuentoPct` a `programas.js` en vez de asumir 15% o 30% fijo, para
  que cada programa declare su propio porcentaje y el hook solo lo
  interpole).
- `live` + sin `precioDescuento` → como hoy: `Pagar ahora — S/
  {precioRegular} (~USD {precioRegularUsd})`.
- `reserve` → como hoy: `Reserva tu cupo con {descuentoPct}% off — S/
  {precioDescuento} (~USD {precioDescuentoUsd})`.

El bloque "Precio de lista" tachado en `ProgramaCTA.jsx` (línea 78-84)
hoy solo se muestra para `status === 'reserve'` — extender la condición
a "cuando `precioDescuento` existe", para que Marcas también muestre el
precio de lista tachado (S/597) junto al de lanzamiento.

Todos los usos de `usePaymentCta` (`ProgramaCTA.jsx`,
`FloatingCtaBar.jsx`) consumen el hook sin acceder a los campos
internos, así que un cambio dentro del hook no debería requerir tocar
esos dos archivos — confirmar durante el plan.

### `ia-profesionales-senior.dirigidoA` — texto ampliado

Agregar la frase sobre jubilados/reconversión, tal como aparece en
`BBS_Copy_Subpaginas_Programas.md` sección 2, "Ficha técnica → Dirigido
a" (texto completo, no resumir):

> Profesionales senior con trayectoria consolidada que buscan
> mantenerse competitivos en un mundo tomado por la IA. Incluye también
> a quienes están jubilados o cerca de jubilarse y ven en la
> reconversión como asesor o consultor experto, apalancado en IA, una
> forma de seguir generando valor con su experiencia.

### `marcas-regenerativas.notaCorta` — línea final ampliada

El doc de subpáginas agrega ", y vender más por eso" al final de la
nota corta (hero) de Marcas Regenerativas. Actualizar
`notaCorta` en `programas.js` para terminar en "...empezar a sonar
como lo que realmente eres, y vender más por eso." (el `notaCard` más
corto que se usa en las fichas del home NO cambia — el doc solo agrega
esa cola a la versión larga del hero).

### Orden de secciones en `ProgramaPage.jsx` — RizomaBlock después de PrecioRepetido

Estado actual (línea 82-91 de `src/pages/ProgramaPage.jsx`):
```
ProgramaHero → FichaTecnica → BonusExclusivo → RizomaBlock → PrecioRepetido → NoEsParaTi → NotaPertenencia
```
El doc de subpáginas, para el programa 4 (Marcas Regenerativas), pone
el bloque "Diagnóstico complementario (ThousandFold)" **después** de
"Precio" y antes de "Esto no es para ti si...". Reordenar a:
```
ProgramaHero → FichaTecnica → BonusExclusivo → PrecioRepetido → RizomaBlock → NoEsParaTi → NotaPertenencia
```
`RizomaBlock` ya maneja `rizoma == null` (los otros 5 programas no
tienen bloque RIZOMA) — confirmar que sigue sin renderizar nada visible
para esos casos tras el reorder, no debería requerir cambios en el
componente en sí, solo el orden de imports/JSX en `ProgramaPage.jsx`.

## Fuera de alcance (explícito)

- Backend de leads, diagnósticos, subsistemas 3-4 — ya completos, no se
  tocan.
- El CTA secundario "Inscríbete" de las subpáginas de programa — se
  mantiene igual (decisión confirmada arriba).
- "Red de aliados" en el home — se mantiene fuera (decisión confirmada
  arriba).
- Cualquier cambio de paleta/tipografía — los docs no piden nada nuevo
  en esta pasada de contenido; el sistema de diseño (`--fro-*`) ya
  existe y se reutiliza tal cual, sin tokens nuevos.

## Testing

No hay tests automatizados de contenido/copy en este repo (los tests
existentes cubren `api/` y la lógica de los diagnósticos). Este trabajo
es de UI/contenido estático — la verificación es manual: build limpio,
smoke-check visual de cada sección nueva/editada en el dev server
(desktop + mobile), y confirmar que los 3 anchors nuevos
(`#profesionales`, `#empresas`, `#comunidad`) funcionan desde Nav y
Footer. Verificar también que ningún otro archivo (tests, sitemap,
otros componentes) referencia `#programas` o `#diagnostico` como
anchors de Home, o los ids `programas`/`diagnostico` en `Home.jsx`, y
actualizarlos si los hay.
