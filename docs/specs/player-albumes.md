# Spec · Selector de álbum en el reproductor

Estado: **validado** (2026-11-23, David) · prototipo interactivo en el lienzo, página "Reproductor · prueba" · Fase: 1 → se construye en la fase 3
Componente afectado: `PlayerBar` (+ panel nuevo `AlbumMenu`) · Datos: `src/data/albums.json`

## 1. Objetivo
Que quien visita la web pueda cambiar de disco desde el reproductor sin salir de la página. Un toque en la portada abre un menú hacia arriba con los discos; al elegir uno, el reproductor pasa a sonar ese disco.

**Por qué:** hoy el reproductor solo enseña *Bru Ferri* (2019). Los discos recientes (*Camastro*, *Lorca*) son los que Bru está presentando en directo y deben poder escucharse desde la portada.

## 2. Alcance
**Entra**
- Abrir y cerrar el menú de álbumes desde la portada del reproductor.
- Lista de los 3 discos: portada, título y año; el disco activo, marcado.
- Elegir un disco: se carga su primera pista y se cierra el menú.
- Teclado, lector de pantalla y móvil (ver §6 y §7).

**No entra (ahora)**
- Recordar el disco elegido entre visitas: cada visita empieza en el disco por defecto.
- Reproducción aleatoria, repetición, letras o enlaces a plataformas dentro del menú.
- Editar discos o pistas desde el backoffice: solo se cambian las **portadas** (flujo B5). Títulos, años y pistas los actualiza David en `albums.json`.

## 3. Contenido

| Orden | slug | Título | Año | Portada | Pistas |
|---|---|---|---|---|---|
| 1 | `primeros-veranos-de-lorca` | Primeros Veranos de Lorca | 2025 · **por confirmar** | `site/assets/albums/primeros-veranos-de-lorca.avif` | **pendiente** |
| 2 | `canciones-de-camastro-y-cuna` | Canciones de Camastro y Cuna | 2023 | `site/assets/albums/canciones-de-camastro-y-cuna.avif` | **pendiente** |
| 3 | `bru-ferri` | Bru Ferri | 2019 | `site/assets/albums/bru-ferri.avif` | 5 (ya en el prototipo) |

- **Orden:** del más reciente al más antiguo.
- **Disco por defecto al entrar:** *Bru Ferri*, pista "Miradas Distraídas Mientras Abrazo" (decisión del 2026-11-20). Se cambia en `albums.json` con `"default": true`.
- **Portadas:** cuadradas, 700 × 700 px, AVIF, de 8 a 21 KB. En el reproductor se ven a 56 px y en el menú a 40 px. Texto alternativo: "Portada del disco *título*".

### Modelo de datos (`src/data/albums.json`)
```json
[
  {
    "slug": "bru-ferri",
    "title": "Bru Ferri",
    "year": "2019",
    "cover": "assets/albums/bru-ferri.avif",
    "alt": "Portada del disco Bru Ferri",
    "default": true,
    "tracks": [
      { "title": "Miradas Distraídas Mientras Abrazo", "dur": "3:14", "src": "audio/bru-ferri/01.m4a" }
    ]
  }
]
```
Sustituye a `tracks` y `album` de `data.js` del prototipo. La portada que se cambie desde el backoffice (`album_covers`) tiene prioridad sobre `cover`.

## 4. Comportamiento

| # | Cuando… | Entonces… |
|---|---|---|
| C1 | se toca la portada (o el bloque portada + título) del reproductor | se abre el menú encima del reproductor, alineado con su borde izquierdo y separado 8 px |
| C2 | el menú está abierto | el disco activo aparece marcado (fondo `--surface-2` y `aria-current="true"`) |
| C3 | se elige **otro** disco | se carga la pista 1 de ese disco, el reproductor actualiza portada, título y disco y el progreso vuelve a 0:00; el panel **sigue abierto** mostrando las pistas del disco nuevo |
| C4 | se elige otro disco **mientras suena** | empieza a sonar la pista 1 del disco nuevo sin pulsar Play |
| C5 | se elige otro disco **en pausa** | queda cargado y en pausa: nunca suena solo |
| C6 | se elige el disco que ya está activo | solo se cierra el menú; la pista y el progreso no cambian |
| C7 | se toca fuera del menú, se pulsa Esc o se vuelve a tocar la portada | el menú se cierra y el foco vuelve a la portada |
| C8 | se toca el icono de lista (escritorio) | abre el mismo panel; solo existe un panel |
| C9 | una pista termina | pasa a la siguiente del **mismo** disco; al acabar el disco se detiene (no salta al siguiente disco) |
| C10 | el audio de una pista no carga | aviso en el reproductor ("No se ha podido cargar esta pista") y se ofrece la siguiente; el menú sigue funcionando |
| C11 | un disco no tiene pistas con audio todavía | aparece en el menú, pero desactivado y con la etiqueta "Próximamente" |

## 5. Diseño (sistema existente, sin estilos nuevos sueltos)
- **Panel:** reutiliza el patrón de `.bf-queue` (fondo `--surface-1`, borde `--line`, radio `--radius-lg`, padding `--space-2`). Cabecera "Discos" y botón cerrar (`.bf-icon-btn--s`).
- **Fila de disco** (`.bf-album-item`): portada 40 px (radio `--radius-sm`) · título en `t-label` · año en `t-caption t-muted`. Alto mínimo 56 px, toda la fila es un único botón.
- **Activo:** la misma clase de estado que la pista activa (`--on`), más un indicador de "sonando" a la derecha si está en reproducción.
- **Indicio de que se puede tocar:** un chevron pequeño junto al título del disco en el reproductor (gira 180° con el menú abierto).
- **Escritorio:** 360 px de ancho, anclado a la izquierda del reproductor. **Móvil:** el ancho del reproductor, con un alto máximo del 60 % de la pantalla y scroll interno.
- **Movimiento:** aparece desde abajo, 8 px y 150 ms; sin animación con `prefers-reduced-motion`.

## 6. Accesibilidad
- La portada es un `<button>` con `aria-haspopup="listbox"`, `aria-expanded` y `aria-label="Cambiar de disco. Disco actual: título"`.
- El menú es `role="listbox"` con `aria-label="Discos"`; cada disco es `role="option"` con `aria-selected` en el activo.
- Al abrir, el foco va al disco activo. Las flechas arriba y abajo mueven el foco, Enter o Espacio eligen, Esc cierra y devuelve el foco a la portada.
- Al cambiar de disco, una región `aria-live="polite"` anuncia "Sonando: *pista* · *disco*".
- Objetivos táctiles de 44 px como mínimo y contraste AA en texto y año.

## 7. Integración
- **Media Session API:** al cambiar de disco se actualizan título, artista, disco y portada, para que el control de la pantalla de bloqueo y de los auriculares muestre el disco correcto.
- **Precarga:** solo los metadatos (`preload="metadata"`). El audio se descarga al pulsar Play.
- **Sin dependencias nuevas:** vanilla JS, estado en el store único (`album`, `index`, `playing`, `panel: null | "albums" | "queue"`).

## 8. Criterios de aceptación
- [ ] Desde la portada del reproductor se abre el menú con los 3 discos en el orden de §3, y el activo aparece marcado.
- [ ] Elegir un disco cambia portada, título y pistas en menos de 300 ms, sin recargar la página.
- [ ] Se cumplen C4 y C5: el estado de reproducción se respeta al cambiar de disco.
- [ ] Esc, tocar fuera y volver a tocar la portada cierran el menú y el foco vuelve a su sitio.
- [ ] Nunca hay dos paneles abiertos a la vez (C8).
- [ ] Con un lector de pantalla se anuncian el disco actual, la lista y el cambio de pista.
- [ ] A 390, 768, 1024 y 1440 px el menú no sale de la pantalla ni tapa el botón de Play.
- [ ] La pantalla de bloqueo del móvil muestra la portada y el título del disco elegido.

## 9. Pendiente (bloquea la construcción, no el diseño)
- [ ] Listado de pistas, con duraciones, de *Camastro* y *Lorca*.
- [ ] Archivos de audio y **permiso de Bru** para publicarlos (formato propuesto: AAC `.m4a` a 192 kbps, unos 5 MB por pista).
- [ ] Año de *Primeros Veranos de Lorca*.
- [ ] Decidir dónde se alojan los audios: en el repo (GitHub Pages admite archivos de hasta 100 MB) o en un almacenamiento aparte si el total pasa de unos 300 MB.

## 10. Decisión (2026-11-23, David)
**¿Cómo se eligen las pistas en móvil?** En móvil el icono de lista no se ve, así que hoy no se puede elegir pista.
**Decidido:** debajo de los discos, el mismo menú muestra las pistas del disco activo. Así hay un solo panel y un solo gesto en todos los tamaños, y en escritorio el icono de lista abre ese mismo panel desplazado a las pistas. Elegir una pista la reproduce y cierra el panel.
