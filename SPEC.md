# SPEC — Bru Ferri (web + backoffice)

Pliego de condiciones para el agente. Si algo no está aquí, se pregunta.

## 1. Alcance del MVP

### Web pública
| Pantalla | Debe hacer |
|---|---|
| Inicio | Foto de portada · nombre + oficio · player fijo en pausa (pista por defecto configurable) con selector de disco → [docs/specs/player-albumes.md](docs/specs/player-albumes.md) · resumen + "Ver trayectoria" · agenda con filtros por proyecto y "Ver todas" · footer con booking · Contacta arriba a la izquierda |
| Trayectoria | Hitos · proyectos actuales · discografía · formatos y facetas · CTA a conciertos y contacto |
| Contacto (hoja) | Motivo · nombre · email · mensaje (asunto precargado si viene de un concierto) → envío → confirmación → volver / ver conciertos |
| Legal | Aviso legal y política de privacidad (formulario con datos personales) |

### Backoffice (`/admin/`) — solo lo que cambia a menudo
Flujos detallados en `docs/FLUJOS.md` (B0–B6).
| Sección | Acciones |
|---|---|
| Acceso | Icono discreto en el footer → email + contraseña · recuperar contraseña por email · cambiar contraseña · cerrar sesión |
| Conciertos | Próximos / pasados · crear · editar · duplicar · ocultar · eliminar con confirmación |
| Imágenes | Portada (subida, encuadre, texto alternativo, crédito, restaurar anterior) · portadas de discos |
| Actualizar web | Automático al guardar, con indicador de estado |

Lo editan David en el repo (`src/data/*.json`): bio, resumen, cifras, trayectoria, proyectos, datos de discos, pistas del player, textos legales.

### Fuera del MVP
Tienda, blog, newsletter, prensa, multi-idioma (preparado en el modelo, no traducido), bandeja de mensajes en el backoffice (llegan por email), edición de textos en el backoffice.

## 2. Modelo de datos (Supabase)

**En Supabase (lo que edita Bru):**
| Tabla | Campos clave |
|---|---|
| `concerts` | `id`, `date_start` (nullable si TBA), `date_end` (nullable), `date_tba` (texto, p. ej. "Oct 2027"), `project_slug` o `title_other`, `venue`, `city`, `country`, `ticket_url`, `visible` (bool), `created_at`, `updated_at` |
| `hero` (fila única) | `image_url`, `image_prev_url`, `alt`, `credit`, `focal_x`, `focal_y` (0–1), `updated_at` |
| `album_covers` | `album_slug`, `image_url`, `alt`, `updated_at` |
| `admins` | `user_id` (auth.users) |

**En el repo (lo edita David):** `src/data/profile.json` (bio, resumen, cifras, booking, proyectos), `albums.json` (con sus pistas), `concerts.json` (hasta Supabase); más adelante `milestones.json`. Los `slug` enlazan con las tablas.

- **Storage:** bucket `media` público (portada, portadas de discos). Subida solo admins; máx. 10 MB; JPG/PNG/WebP.
- **RLS:** lectura pública de `concerts` con `visible = true`, de `hero` y de `album_covers`; escritura solo si `auth.uid()` está en `admins`.
- **Edge Functions:** `contact` (valida y envía email con Resend a booking) · `rebuild` (la llama un trigger tras cada cambio, con un retraso para agrupar cambios seguidos, y lanza la GitHub Action). Los secretos de Resend y GitHub viven en Supabase.
- **Campo `lang`:** las tablas de texto lo reservan (`es` por defecto) para traducir más adelante sin migrar.

## 3. Reglas técnicas

- HTML + CSS + JS vanilla. Sin framework, sin bundler. Dependencia permitida: `@supabase/supabase-js` (CDN con versión fijada).
- Estructura modular por capas (`src/` compartido, `site/`, `admin/`, `supabase/`, `scripts/`): ver `docs/ARQUITECTURA.md`.
- Componentes como funciones puras que devuelven HTML, uno por archivo; se usan igual en el build (Node) y en el navegador.
- Mobile-first, container queries, retícula de 8, contraste AA.
- Accesibilidad: botones reales, `aria-label` en iconos, foco visible, Escape cierra la hoja, el audio nunca arranca solo.
- SEO: `<title>` y descripción por página, Open Graph con la foto de portada, datos estructurados `MusicEvent` por concierto, `sitemap.xml`, redirecciones de las URLs antiguas de WordPress.
- Intocables sin aprobación: `tokens.css`, el esquema SQL publicado y las políticas RLS.

## 4. Criterios de aceptación

**Web**
- [ ] Lighthouse ≥ 90 en rendimiento, accesibilidad, buenas prácticas y SEO (móvil).
- [ ] 390, 768, 1024 y 1440 px sin roturas; el player nunca tapa contenido.
- [ ] Ningún enlace sin destino; todos los flujos tienen salida.
- [ ] Un concierto añadido y publicado en el backoffice aparece en la web en menos de 5 minutos.
- [ ] El formulario envía y llega el email a booking; los errores muestran un mensaje recuperable.
- [ ] `check.mjs` en verde (cero valores fuera de tokens).

**Backoffice**
- [ ] Bru completa sin ayuda, desde el móvil: crear un concierto, duplicarlo para otra ciudad, ocultarlo, cambiar la foto de portada y la portada de un disco.
- [ ] Nadie sin sesión de admin puede escribir (probado con la anon key).
- [ ] Contraseña de al menos 12 caracteres; registro público desactivado en Supabase (las cuentas las crea David); límite de intentos activo.
- [ ] Borrar pide confirmación; los cambios sin guardar avisan antes de salir.
- [ ] Usable en móvil (Bru actualiza la agenda desde el teléfono).
