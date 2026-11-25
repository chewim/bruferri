# DESIGN_SYSTEM — Bru Ferri

Cuándo usar cada cosa (y cuándo no). Los valores viven en `src/styles/tokens.css` (prefijo `--bf-*`); aquí no se repiten. `node scripts/check.mjs` falla si aparece un valor fuera de ellos.
Fuente completa con previews: https://claude.ai/artifact/VmSpdWrWV2pe8xhnWv5V8o

## Principios
1. **Escenario a oscuras, un foco.** Una sola acción en acento por vista.
2. **La música manda.** El player siempre visible abajo; nada lo tapa salvo la hoja de contacto.
3. **Superficie y línea, no sombra.** Se separa con `surface-1/2` y `line`.
4. **Retícula de 8.** Espacios, alturas y radios en múltiplos de 8.
5. **Sin callejones sin salida.**

## Color (roles)
| Token | Úsalo para | No lo uses para |
|---|---|---|
| `bg` | Fondo de página | Tarjetas |
| `surface-1` | Tarjetas, filas, hojas | Fondo de página |
| `surface-2` | Botones secundarios, campos, hover | Texto |
| `glass` | Player y TopBar sobre foto (siempre con blur) | Cualquier otra superficie |
| `ink` / `ink-muted` | Texto principal / metadatos | — |
| `accent` + `on-accent` | El CTA de la vista, play, fecha del próximo concierto | Decoración, más de una vez por vista |
| `accent-ink` | Acento como texto (overlines, "Próximo") | Rellenos |
| `scrim` / `ink-on-photo` | Legibilidad sobre la foto | Fuera del hero |

## Tipografía
- **Archivo**, una sola familia (ver `DECISIONS.md`). Eje de anchura (`wdth`) para el nombre y las etiquetas.
- Roles (`--bf-text-*` + `--bf-lh-*`): display (nombre), heading (sección), lead (definición y oficios en escritorio, título de la hoja), title (tarjeta/concierto), body-l (resumen), body, label (controles), caption (overlines y metadatos en mayúsculas). display y heading crecen en escritorio.
- No uses un tamaño suelto: si ningún rol encaja, se propone uno nuevo y se apunta en `DECISIONS.md`.

## Forma
- Radios por rol: `sm` campos y portada mini · `md` fechas y filas · `lg` tarjetas y player · `xl` hojas · `pill` botones y chips.
- Controles: 32 (chip, icono pequeño) · 48 (botón, mínimo táctil) · 64 (play principal).
- **Encuadre de la foto:** por punto focal (`focal_x`, `focal_y`), nunca por `object-position` a ojo. La cara no se corta en ningún ancho.
- **Holgura del player:** `player-offset` (alto del player + `space-4`) es lo que ocupa abajo. Nada se apoya en él: texto del hero a `player-offset + space-8` (móvil) / `+ space-12` (desktop); final de página a `player-offset + space-6`.

## Componentes
| Componente | Cuándo | Cuándo no |
|---|---|---|
| `bf-btn--primary` | La acción de la vista | Dos en la misma vista |
| `bf-btn--secondary` | Avanzar (ver trayectoria) | Acciones destructivas |
| `bf-btn--ghost` | Utilidad (ver todo, contacta, info) | La acción principal |
| `bf-btn--glass` | Sobre la foto | Sobre fondo liso |
| `bf-icon-btn` | Solo icono, siempre con `aria-label` | Cuando el texto cabe |
| `bf-chip` | Filtros y metadatos; estado con `aria-pressed` | Acciones |
| TopBar | Contacta (izquierda), marca, idioma; alineada con el contenedor | — |
| PlayerBar | Siempre en pausa al cargar | Autoplay |
| ConcertRow | Un concierto; `--next` solo para el primero | Listas que no son agenda |
| ContactSheet | Contacto con confirmación y salidas | Otros formularios largos |
| Card | Disco o proyecto (Trayectoria) | Texto largo |
| NextConcert | La próxima fecha en la portada; lleva a la agenda | Más de una fecha |
| DateBadge | Día + mes; `--next` en acento solo para el primer concierto | Fechas de texto largo |
| ConcertList | La agenda: 6 filas y "Ver todas" | — |
| MusicPanel | Discos y pistas desde el player | Otros menús |
| Track | Una pista (panel de música y colección) | Listas que no son de audio |
| AlbumShelf | La colección de discos en la sección Discografía (`--wide`); manda reproducir al player | Más de un sitio por página |
| PressQuote | Opinión real del sector, corta y con nombre; en el idioma original (`--compact` en la portada) | Citas inventadas o sin autor; más de dos en la portada |
| BgVideo | Vídeo decorativo detrás de un texto, siempre oscurecido y con pausa | Contenido que haya que ver con sonido; más de uno por página |
| LangSelect | Idioma en la TopBar | — |

## Backoffice
Usa los mismos tokens y componentes. Los componentes nuevos salen del inventario de `docs/FLUJOS.md` (Tabs, AdminRow, Badge, Toggle, Select, DateField, ImageUploader, FocalPicker, Toast, ConfirmDialog, EmptyState, StatusIndicator, AdminNav) y pasan por el sistema antes de usarse.

## Descartes
Sombras decorativas · degradados de fondo · más de un acento · emojis como iconos · bordes laterales de color en tarjetas.
