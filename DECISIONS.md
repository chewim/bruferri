# DECISIONS — Bru Ferri

Formato: fecha · decisión · descartes · por qué. Las marcadas **(propuesta)** esperan validación de David.

## 2026-11-19 · Dirección visual: "escenario a oscuras, un foco"
- **Decisión:** fondo casi negro, un único acento amarillo (#ede56b), radios generosos, controles en píldora, player flotante en vidrio. Retícula de 8.
- **Descartes:** fondo claro tipo WordPress actual; vídeo de YouTube como hero.
- **Por qué:** la foto y la música son lo que identifica a Bru; el resto se aparta. Referencias de UI musicales (player tipo Spotify).

## 2026-11-19 · Hero con retrato B/N a sangre y player en pausa
- **Decisión:** retrato fotográfico en portada; player fijo abajo con "Miradas Distraídas Mientras Abrazo" (álbum *Bru Ferri*, 2019) en pausa.
- **Descartes:** autoplay; embed de YouTube/Bandcamp en portada.
- **Por qué:** el autoplay molesta y los navegadores lo bloquean; un player propio mantiene la marca.

## 2026-11-19 · Contacta siempre arriba a la izquierda
- **Decisión:** botón fijo en la TopBar que abre una hoja de contacto con confirmación y salidas.
- **Por qué:** el contacto de programación es la conversión principal.

## 2026-11-19 · Sin flujos sin salida
- **Decisión:** toda vista tiene una acción siguiente (enviar → confirmación → volver / ver conciertos).

## 2026-11-19 · Responsive por container queries
- **Decisión:** los componentes se adaptan al ancho de su contenedor, no del viewport.
- **Por qué:** el mismo componente sirve en web, backoffice y vistas embebidas sin duplicar CSS.

## 2026-11-20 · Tipografía — PENDIENTE (bloquea la salida de la fase 1)
- **Opción A (actual):** Space Grotesk + DM Sans.
- **Opción B (prueba editorial):** Instrument Serif + Inter Tight + Geist Mono.
- Ver ambas en el lienzo de exploración. Al decidir, actualizar tokens y `DESIGN_SYSTEM.md`.

## 2026-11-20 · Stack (propuesta)
- **Decisión:** HTML + CSS + JS vanilla, sin framework ni bundler. GitHub (repo y Pages) + Supabase (Postgres, Auth, Storage, Edge Functions) + Resend para el email de contacto. DNS en el registrador actual del dominio.
- **Descartes:** WordPress (lo que se sustituye); Vercel (no es el flujo habitual de David); framework SPA (sobrecoste para una web de este tamaño).
- **Por qué:** es el stack que David ya domina (Pujobaixo), cero coste de hosting y escalable con el modelo de datos.

## 2026-11-20 · Arquitectura modular por capas
- **Decisión (David):** nada de archivos monolíticos. Capas `lib → components → sections → pages`, más `features` con estado; `src/` compartido entre web y backoffice; un archivo por responsabilidad (< 200 líneas); acceso a datos solo por `lib/api.js`. Detalle en `docs/ARQUITECTURA.md`.
- **Descartes:** un `app.js` y un `styles.css` únicos (como el prototipo); framework con bundler.
- **Por qué:** cambiar una pieza no rompe otras, el agente lee solo lo que necesita (menos contexto) y el backoffice reutiliza los componentes de la web.
- **Control:** `check.mjs` valida tokens, dirección de imports y tamaño de archivo.

## 2026-11-20 · Render de la web pública (propuesta)
- **Decisión:** la web se genera como HTML estático a partir de Supabase y de `site/data/*.json` con una GitHub Action. Se ejecuta tras cada cambio en el backoffice (Edge Function → `repository_dispatch`), en cada push a `main` y una vez al día (para que los conciertos pasados salgan solos de "Próximos").
- **Descartes:** render en cliente con fetch a Supabase en cada visita (peor SEO, la web depende de que Supabase responda).
- **Por qué:** SEO para agenda y bio, velocidad, y la web sigue en pie aunque la base de datos falle.
- **Paso intermedio aceptable:** empezar con fetch en cliente en la fase 3 y pasar a build en la fase 3.5 si hace falta acelerar.

## 2026-11-20 · Alcance del backoffice: solo lo que cambia
- **Decisión (David):** el backoffice edita conciertos e imágenes (portada y portadas de discos). Bio, trayectoria, pistas y textos los actualiza David en el repo.
- **Descartes:** backoffice que edita todo el contenido; bandeja de mensajes (llegan por email).
- **Por qué:** es lo que cambia a menudo; menos pantallas que Bru tenga que aprender y menos superficie que mantener.
- **Derivado (propuesta):** sin botón "Publicar": la web se regenera sola al guardar, con indicador de estado. Un paso menos para Bru.

## 2026-11-20 · Acceso: email + contraseña desde el footer
- **Decisión (David):** icono discreto de ajustes en el footer que solo conoce Bru → `/admin/` con email y contraseña. Sesión persistente en su dispositivo.
- **Descartes:** enlace mágico (depende de encontrar el email cada vez).
- **Por qué:** acceso directo y sin fricción para Bru.
- **Nota de seguridad:** el icono oculto es experiencia, no seguridad; la protección es la contraseña (≥ 12 caracteres), el registro público desactivado, el límite de intentos de Supabase y RLS. El correo solo se usa para recuperar la contraseña.

## 2026-11-20 · Backoffice en el mismo repo (propuesta)
- **Decisión:** `/admin/` estático (`noindex`) con el mismo sistema de diseño, login con email y contraseña de Supabase y escritura protegida por RLS (solo la tabla `admins`).
- **Descartes:** CMS externo (Strapi, Sanity, Decap): otra herramienta que Bru tendría que aprender y otra dependencia.
- **Por qué:** formularios a medida de su contenido, con su marca y el mínimo de piezas.

## 2026-11-23 · Tipografía oficial: Archivo
- **Decisión (David):** una sola familia, **Archivo** (opción A), para títulos, texto e interfaz. El nombre va en mayúsculas, peso 700 y anchura 118 (128/112 px en escritorio, 60/56 px en móvil); las etiquetas, a anchura 110 con tracking 0,14em.
- **Descartes:** IBM Plex Mono (D, elegida provisionalmente esta misma mañana), Schibsted Grotesk (B), Syne (C) y sus alternativas sin ensanchamiento (Syne 500, Bricolage Grotesque, Familjen Grotesk).
- **Por qué:** grotesca de carácter suizo con un toque brutalista que no resta elegancia; el eje de anchura da presencia al nombre sin mezclar familias; licencia OFL y se sirve desde el propio dominio (≈36 KB sin el eje de anchura, ≈88 KB con él).
- **Aplicado:** tokens (`--font-display` / `--font-sans`), estilos de texto de `bf.css` y `tokens.json` del sistema de diseño.

## 2026-11-23 · Composición de la portada
- Retícula de 12 / 8 / 4 columnas también en la portada: barra superior alineada con el contenedor, texto en las columnas 1–6, tarjeta del concierto en la 9–12.
- Oficios en lista, al lado de la cabeza (columna 9 en escritorio; a la derecha, alineados al margen, en móvil).
- Tarjeta del concierto compacta en móvil (fecha + lugar); "Hasta" sale de la caja de fecha y pasa a la etiqueta ("En cartel hasta").
- **Foto (provisional, pendiente de aprobación de Bru):** "bosque" pasa a ser la foto oficial de la portada (Bru centrado, panorámica en escritorio). "Cielo" queda de reserva, ya encuadrada con la misma composición.
- **Antes de cerrar:** enseñar a Bru las dos opciones y que elija; pedirle los originales en alta resolución y el crédito del fotógrafo.


## 2026-11-23 · Selector de disco en el reproductor (validado)
- **Decisión (David):** al tocar la portada del reproductor se abre un único panel "Música": discos arriba (del más reciente al más antiguo) y pistas del disco activo debajo. Cambiar de disco respeta si estaba sonando o en pausa; elegir pista la reproduce y cierra el panel.
- **Descartes:** menú solo de discos más lista de pistas aparte (en móvil no había forma de elegir pista).
- **Por qué:** un solo gesto y un solo panel en todos los tamaños; validado con el prototipo interactivo del lienzo.
- **Detalle:** `docs/specs/player-albumes.md`. Bloquea la construcción: pistas y audios de *Camastro* y *Lorca*, con permiso de Bru.

## 2026-11-25 · Portada de referencia y cierre de la exploración
- **Decisión (David):** la Home de la página "Estructura · retícula" del lienzo es la referencia de construcción: foto "cielo", nombre grande, oficios junto a la cabeza y colección de discos en "Quién es Bru". La prueba con los vinilos en la portada queda descartada.
- **Encuadre:** la foto escala con la altura de la portada y se coloca por su punto focal (`focal_x`, `focal_y` en los datos), así la cara nunca se corta en pantallas anchas; los lados son la misma foto ampliada y oscurecida. Es el mismo dato que editará el FocalPicker del backoffice.
- **Definición y oficios** más grandes y con peso en escritorio (nuevo rol de texto `lead`, 24/32).
- **Foto:** se construye con "cielo"; Bru la confirma o la cambia más adelante (solo cambia el dato).
- **Puerta 1 → 2:** dirección visual, tipografía, forma y 3 pantallas clave cerradas en el lienzo. Se pasa a la fase 2.

## 2026-11-25 · Sistema en el repo (fase 2)
- **Repo:** `chewim/bruferri`, público (GitHub Pages gratis). Pruebas en `chewim.github.io/bruferri` hasta tener acceso al dominio.
- **Tokens `--bf-*`** en `src/styles/tokens.css`; ocho roles de texto (caption, label, body, body-l, title, lead, heading, display). El nombre en móvil pasa de 60 a 56 px y el día de la fecha a 24 px para encajar en la escala.
- **Media queries en lugar de container queries:** en la web real el contenedor es la ventana; las container queries solo hacían falta en el lienzo.
- **Componentes pueden componer otros componentes** (ConcertRow usa DateBadge y Chip). Ajustada la tabla de capas de `docs/ARQUITECTURA.md`.
- **Datos** en `src/data/` (`profile.json`, `concerts.json`, `albums.json`); `concerts.json` ya usa los campos de la tabla `concerts` de Supabase para migrar sin tocar componentes.
- **Contacto:** hasta la Edge Function, "Enviar" abre el correo con el mensaje listo para booking. Honesto y funcional.
- **Check** (`scripts/check.mjs`, basado en el de Pujobaixo) con baseline a cero: colores, tamaños de letra, radios y espacios solo desde tokens; sin `style` con valores (solo variables CSS como datos); capas; un CSS por componente; tokens sin uso; `node --check`. Lo ejecutan el hook de pre-commit y la Action de despliegue.
- **Captura (caso de estudio):** 54 tokens · 15 componentes · 0 valores fuera del sistema · contraste mínimo de texto 6,1:1.

## 2026-11-25 · Discografía como sección y vídeo detrás de "Quién es Bru"
- **Decisión (David):** la colección de vinilos pasa a una sección propia, "Discografía" (`#discografia`), entre "Quién es Bru" y "Conciertos", para mejorar la usabilidad: en escritorio, colección a la izquierda y pistas a la derecha.
- **"Quién es Bru"** lleva un vídeo de fondo detrás del texto (componente `BgVideo`): oscurecido, sin sonido, en bucle, con botón de pausa (WCAG 2.2.2), se carga al acercarse y no con "reducir movimiento".
- **Provisional:** el vídeo de la web actual incrustado desde YouTube sin cookies (`SWCdzc7Rang`). Con el archivo original basta con poner `about.video.src` en `profile.json` y quitar `youtube`.
- **Descartes:** foto "cielo" animada y fondo abstracto como provisionales (David prefiere el vídeo real de Bru).

## 2026-11-25 · Opiniones del sector en la portada
- **Decisión (David):** dos opiniones reales (enviadas por Bru el 21/11) en una sección propia justo después de la portada. Se probaron dentro de la portada y se descartó: demasiada información en el primer pantallazo.
- **Por qué (diseño conductual):** menos carga cognitiva en la portada (ya tiene nombre, definición, oficios, fecha y player); la cita aislada se recuerda más (Von Restorff); secuencia impresión → prueba social con autoridad → detalle (bio, discos, fechas).
- **Frases:** Adriano Galante: "Una auténtica fuerza de la naturaleza." · Òscar Dalmau (en catalán, como la escribió): "Cartes d'amor musicades pel Bru amb una sensibilitat formidable." Se eligieron las que funcionan sin nombrar el disco.
- **Formato (David):** una opinión cada vez en la misma caja (componente `Testimonials`): frase grande (`heading`), avatar y nombre, y una barra de progreso tipo "stories" que pasa a la siguiente cada 7 s. Se pausa con el ratón encima, con el foco, con el botón o fuera de la vista; con "reducir movimiento" no avanza. La caja mide lo que la opinión más larga: no salta al cambiar. Sin laureles ni estrellas.
- **Avatares:** iniciales hasta tener las fotos. No se descargan de sus redes: las pasa Bru con su permiso (`press[].photo` en `profile.json`).
- **Descartes:** dentro de la portada (saturaba); en la Discografía (no cargar los vinilos con más información).
- **Siguiente para reforzar la autoridad:** el cargo de cada uno junto al nombre (BACKLOG).
