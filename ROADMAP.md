# ROADMAP — Bru Ferri

Cada fase empieza con un plan que David aprueba (modo plan) y termina en una puerta: señales cumplidas → decisión → `CONTEXT.md` y `DECISIONS.md` actualizados → captura de 1-3 datos para el caso de estudio.

## Fase 1 · Exploración — cerrada (2026-11-25)
- [x] Dirección visual, paleta, formas y componentes (lienzo).
- [x] Home desktop y móvil, trayectoria, contacto y antes/después.
- [x] Prototipo estático navegable (`explora/bru-ferri-web`).
- [x] Flujos de web y backoffice + inventario de componentes (`docs/FLUJOS.md`).
- [ ] Validar con Bru las tareas del backoffice (conciertos e imágenes) y si las hará desde el móvil.
- [x] **Tipografía: Archivo.**
- **Captura:** antes/después de la home (ya está en el lienzo).

## Fase 2 · Sistema — en curso (desde 2026-11-25)
1. Crear el repo en GitHub y clonarlo en `~/Desktop/bruferri`.
2. Crear la estructura de carpetas de `docs/ARQUITECTURA.md` y `scripts/build.mjs` mínimo.
3. `src/styles/tokens.css` con prefijo `--bf-*` desde el sistema de diseño (con la tipografía elegida). Ningún token sin uso.
4. Migrar el prototipo pieza a pieza: un CSS y un JS por componente, `features/` para el estado (ARQUITECTURA §6).
5. Contraste comprobado (texto 4,5:1; texto grande, bordes y foco 3:1).
6. Copiar `scripts/check.mjs` de `chewim/pujobaixo`, ampliarlo con las reglas de imports y tamaño de ARQUITECTURA §3, baseline a cero y hook de pre-commit (`git config core.hooksPath .githooks`).
7. Primera pantalla (Inicio) construida solo con tokens y clases.
- **Puerta:** check en verde + Inicio sin valores sueltos.
- **Captura:** nº de tokens · nº de componentes · valores fuera del sistema = 0.

## Fase 3 · Construcción
**3.1 Web pública con datos locales**
- Inicio, Trayectoria, Contacto y Legal desde un `data.json` (el contenido real que ya tenemos).
- SEO base, Open Graph y `MusicEvent`.

**3.2 Supabase**
- SQL de tablas, RLS y bucket `media` en `supabase/`. Carga inicial con el contenido real.
- La web lee de Supabase (fetch en cliente al principio).
- Edge Function `contact` + Resend (dominio verificado). Formulario real.

**3.3 Backoffice** (flujos B0–B5 de `docs/FLUJOS.md`)
- Login con enlace mágico y tabla `admins`.
- Orden: Conciertos (lista, crear, editar, duplicar, ocultar, eliminar) → Portada (subida, encuadre, restaurar) → Portadas de discos.
- Solo con componentes del sistema; los nuevos del inventario se añaden al sistema antes de usarse.

**3.4 Actualización automática** (flujo B6)
- GitHub Action que genera HTML estático desde Supabase + `src/data/` y lo publica en Pages.
- Trigger + Edge Function `rebuild` con retraso para agrupar cambios; indicador de estado en el backoffice.

**3.5 Prueba con Bru**
- Bru hace las 4 tareas del criterio de aceptación sin ayuda; se apuntan las fricciones y se corrigen.

**3.6 Migración del dominio** → ver `docs/MIGRACION.md`.
- **Puerta de salida (web en producción):** bruferri.com sirve la nueva web, se mantiene el correo y Bru publica solo.
- **Captura:** Lighthouse antes/después · tiempo para publicar un concierto (WordPress vs backoffice).

## Después del MVP (no comprometido)
Catalán e inglés · métricas (Plausible o similar, sin cookies) · prensa · histórico de conciertos pasados.
