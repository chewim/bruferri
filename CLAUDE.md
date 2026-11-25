# CLAUDE.md — Bru Ferri

1. Antes de nada: lee la línea `Fase:` de `CONTEXT.md` y avisa si lo pedido es de otra fase.
2. Estructura y capas en `docs/ARQUITECTURA.md`: respeta la dirección de imports y un archivo por responsabilidad (< 200 líneas). Tokens en `src/styles/tokens.css` (prefijo `--bf-*`); un CSS y un JS por componente (clases `bf-*`). Usa siempre `var(--bf-…)`: nunca hex, px sueltos ni `style="…"` con valores.
3. Si falta un token o componente, pregunta antes de inventarlo; si se aprueba: token → `DESIGN_SYSTEM.md` → `DECISIONS.md`.
4. Si algo falla visualmente, corrige primero el sistema y después la pantalla.
5. Contenido real solo desde Supabase o `SPEC.md`. Nada inventado: lo que falte va como `[PENDIENTE: …]` y a `BACKLOG.md`.
6. Planifica antes de tocar código (modo plan): propuesta → David aprueba → ejecutas. **Avisa a David cuando algo pida spec** (`docs/specs/`, antes de construir) si tiene reglas de comportamiento, toca datos o backoffice, lo valida o construye otro, o equivocarse sale caro. Lo visual o de contenido va solo a `DECISIONS.md`.
7. Ediciones con `str_replace`; valida JS con `node --check`; pasa `node scripts/check.mjs` antes de cada commit.
8. `git pull` al empezar; commits pequeños, uno por cambio aprobado.
9. Secretos nunca en el repo: solo la anon key de Supabase (pública por diseño, protegida por RLS). Service role y claves de Resend/GitHub viven en los secrets de Supabase.
10. Un solo agente sobre el repo a la vez. Archivos de documentación < 250 líneas; si la sesión se satura, empieza otra y relee este archivo.
