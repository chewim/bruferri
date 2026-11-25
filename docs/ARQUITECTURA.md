# ARQUITECTURA — Bru Ferri

Objetivo: código **modular, no monolítico**. Cada archivo tiene una sola responsabilidad, las dependencias van en una sola dirección y la web y el backoffice comparten piezas sin duplicarlas. Sin framework ni bundler: HTML, CSS y ES modules nativos + un build en Node sin dependencias.

## 1. Estructura de carpetas

```
bruferri/
├─ src/                         # código compartido por web y backoffice
│  ├─ styles/
│  │  ├─ tokens.css             # SOLO variables --bf-* (color, tipo, espacio, radio, tamaños)
│  │  ├─ base.css               # reset, tipografía base, foco
│  │  ├─ layout.css             # container, grid, docks (top/bottom), secciones
│  │  ├─ components/            # un CSS por componente: button.css, chip.css, player-bar.css…
│  │  └─ sections/              # un CSS por sección: hero.css, about.css, concerts.css, footer.css
│  ├─ components/               # un módulo JS por componente: render puro datos → HTML
│  │  ├─ button.js  chip.js  icon.js  top-bar.js  player-bar.js
│  │  ├─ concert-row.js  card.js  contact-sheet.js  lang-select.js
│  │  └─ index.js               # re-exporta todos
│  ├─ lib/                      # utilidades sin UI
│  │  ├─ dom.js                 # esc(), mount(), delegate()
│  │  ├─ store.js               # estado mínimo + suscripción
│  │  ├─ dates.js               # formato de fechas de concierto
│  │  └─ api.js                 # ÚNICO acceso a datos (JSON local o Supabase)
│  └─ data/                     # contenido que edita David: profile, concerts (hasta Supabase), albums (.json)
│
├─ site/                        # web pública
│  ├─ pages/                    # composición por página: home.js, trayectoria.js, legal.js, 404.js
│  ├─ sections/                 # bloques de página: hero.js, about.js, concerts.js, footer.js…
│  ├─ features/                 # comportamiento con estado (solo en navegador)
│  │  ├─ player/   agenda/   contact/   lang/      # cada una: index.js (init + eventos)
│  └─ main.js                   # arranca las features presentes en la página
│
├─ admin/                       # backoffice
│  ├─ pages/                    # login, concerts-list, concert-form, images, hero, album-cover, account
│  ├─ features/                 # auth/, uploader/, focal-picker/, unsaved-guard/, rebuild-status/
│  ├─ components/               # solo los propios del admin: admin-nav, admin-row, toggle, select…
│  └─ main.js
│
├─ supabase/
│  ├─ migrations/               # AAAAMMDD_descripcion.sql (tablas + RLS en el mismo archivo)
│  └─ functions/  contact/  rebuild/
├─ scripts/
│  ├─ build.mjs                 # genera dist/ (HTML estático + CSS unido + JS)
│  ├─ check.mjs                 # tokens + reglas de imports (ver §3)
│  └─ redirects.json            # URLs antiguas de WordPress → nuevas
├─ .github/workflows/deploy.yml # build → GitHub Pages
├─ dist/                        # generado, no se edita ni se versiona
├─ explora/                     # prototipos de la fase 1, fuera del build
└─ docs/
```

## 2. Capas y dirección de dependencias

```
pages  →  sections  →  components  →  lib
   ↘        features  ↗ (usa components y lib)
```

| Capa | Hace | Puede importar | Nunca importa |
|---|---|---|---|
| `lib/` | Utilidades y acceso a datos | otros `lib/` | nada de UI |
| `components/` | Recibe datos, devuelve HTML. Sin estado, sin fetch, sin DOM global | `lib/` (salvo `api.js`), otros `components/` | `features/`, `api.js`, `sections/`, `pages/` |
| `sections/` | Compone componentes en un bloque de página | `components/`, `lib/` | `features/`, otras `sections/` |
| `features/` | Estado y eventos de una funcionalidad | `components/`, `lib/` | otras `features/` (se comunican por `store`) |
| `pages/` | Decide qué secciones lleva cada página | `sections/`, `lib/api.js` | — |
| `admin/` | Igual que `site/` | `src/*` compartido | `site/*` |

**Clave:** los componentes son funciones puras de texto, así que **los mismos componentes se ejecutan en Node durante el build** (HTML estático para SEO) **y en el navegador** cuando una feature necesita volver a pintar (player, filtros, hoja de contacto). Una sola implementación.

## 3. Reglas (las comprueba `check.mjs`)

1. CSS: ningún hex, px suelto ni `style="…"` con valores fuera de `tokens.css`.
2. Imports: cumplir la tabla de §2 (el check lee los `import` y falla si una capa importa de otra prohibida).
3. Tamaño: archivo JS o CSS de más de **200 líneas** → aviso; partir antes de seguir.
4. Un componente = `components/x.js` + `styles/components/x.css` con el mismo nombre y clases `bf-x`, `bf-x__parte`, `bf-x--variante`.
5. Estado visual con atributos (`aria-pressed`, `aria-expanded`, `data-state`), no con clases inventadas.
6. Acceso a datos solo por `lib/api.js`: cambiar de JSON a Supabase no toca componentes ni secciones.
7. Nombres: archivos en `kebab-case`, funciones exportadas en `PascalCase` para componentes (`ConcertRow`) y `camelCase` para el resto.

## 4. Flujo del build

`node scripts/build.mjs`
1. Lee `src/data/*.json` y, si hay credenciales, Supabase (conciertos, portada, portadas de discos) vía `lib/api.js`.
2. Ejecuta cada `site/pages/*.js` → HTML completo en `dist/`.
3. Une `tokens.css + base.css + layout.css + components/*.css + sections/*.css` → `dist/assets/bf.css`.
4. Copia `src/`, `site/features/` y `admin/` como módulos a `dist/assets/js/`.
5. Genera `sitemap.xml`, páginas de redirección (`redirects.json`) y `CNAME`.

Desarrollo local: `node scripts/build.mjs --watch` + `npx serve dist` (los ES modules no funcionan con doble clic en `file://`).
Para chewim.github.io: `BF_BASE=/bruferri/ node scripts/build.mjs` (lo hace la Action).

**Responsive:** media queries (640 · 1024). Las container queries solo hacían falta en el lienzo.

## 5. Añadir algo sin ensuciar

| Quiero… | Dónde |
|---|---|
| Un componente visual nuevo | `src/components/` + `src/styles/components/` + fila en `DESIGN_SYSTEM.md` |
| Un bloque nuevo en la home | `site/sections/` + añadirlo en `site/pages/home.js` |
| Comportamiento interactivo | `site/features/<nombre>/index.js`, registrado en `main.js` |
| Una pantalla del backoffice | `admin/pages/` (+ feature si tiene estado) |
| Un dato nuevo | `src/data/*.json` o migración en `supabase/migrations/` + `lib/api.js` |
| Un token | `src/styles/tokens.css` + `DESIGN_SYSTEM.md` + `DECISIONS.md` |

## 6. Del prototipo a esta estructura (fase 2)

`explora/bru-ferri-web` es monolítico a propósito (un `components.js`, un `bf.css`, un `app.js`). No se copia: se migra pieza a pieza.
- `bf.css` → `tokens.css` + `base.css` + `layout.css` + un CSS por componente.
- `components.js` → un módulo por componente.
- `app.js` → `features/player`, `features/agenda`, `features/contact`, `features/lang`.
- `data.js` → `src/data/*.json`.
