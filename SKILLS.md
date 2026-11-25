# SKILLS — Recetas del proyecto

## Empezar una sesión
1. `git pull`.
2. Leer `CLAUDE.md` y la línea `Fase:` de `CONTEXT.md`.
3. Revisar `BACKLOG.md` (bloqueos) y `GOTCHAS.md`.
4. Proponer el plan de la sesión → David aprueba → ejecutar.

## Crear un componente nuevo
1. Comprobar en `DESIGN_SYSTEM.md` que no existe uno equivalente.
2. Proponer: nombre `bf-*`, variantes, estados (con `aria-*`), tokens que usa. Si necesita un token nuevo, se pide.
3. CSS en `components.css` y función en `components.js`.
4. Fila en la tabla de componentes de `DESIGN_SYSTEM.md` (cuándo / cuándo no).
5. `node --check` + `node scripts/check.mjs` → commit.

## Añadir una tabla o campo en Supabase
1. Migración SQL en `supabase/migrations/AAAAMMDD_descripcion.sql`.
2. Política RLS en el mismo archivo (lectura pública solo de lo publicado; escritura de admins).
3. Actualizar `SPEC.md` (modelo de datos) y, si hay alternativas, `DECISIONS.md`.
4. Probar la escritura con la anon key: debe fallar.

## Publicar (cuando exista el backoffice)
Backoffice → Publicar → Edge Function `publish` → GitHub Action → Pages. Si falla, revisar el log de la Action y apuntar la causa en `GOTCHAS.md`.

## Cambiar de fase
1. Repasar las señales de salida en `ROADMAP.md`.
2. David decide → actualizar `Fase:` en `CONTEXT.md` y apuntar la decisión en `DECISIONS.md`.
3. Capturar 1-3 datos para el caso de estudio.
4. Revisar la deuda consciente.

## Cerrar una sesión
Actualizar `BACKLOG.md`, añadir los gotchas nuevos, commit con un mensaje que diga qué cambia y por qué.
