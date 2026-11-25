# bruferri

Web oficial de Bru Ferri y backoffice de contenidos.

- Estado y fase: `CONTEXT.md`
- Para agentes: `CLAUDE.md`
- Plan: `ROADMAP.md` · Alcance: `SPEC.md` · Migración del dominio: `docs/MIGRACION.md`

Stack: HTML/CSS/JS vanilla · GitHub Pages · Supabase · Resend.

## Desarrollo

```sh
git config core.hooksPath .githooks   # una vez por clon: el check corre antes de cada commit
node scripts/build.mjs --watch        # genera dist/ al guardar
npx serve dist                        # http://localhost:3000
node scripts/check.mjs                # tokens, capas y sintaxis
```

Cada push a `main` construye y publica en GitHub Pages: https://chewim.github.io/bruferri/
