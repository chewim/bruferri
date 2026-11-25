#!/usr/bin/env node
// Verificación de Bru Ferri: sintaxis + sistema de diseño + capas. Basado en scripts/check.mjs de chewim/pujobaixo.
//   node scripts/check.mjs   → valida (lo usa el hook pre-commit y la Action de despliegue)
// Baseline a cero: cualquier valor fuera del sistema falla. Reglas en docs/ARQUITECTURA.md §3.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN = ['src', 'site', 'admin', 'scripts'];
const MAX_LINES = 200;
const errors = [], warns = [];

const walk = (d) => readdirSync(d).flatMap((f) => {
  const p = join(d, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const files = SCAN.flatMap((d) => { try { return walk(join(ROOT, d)); } catch { return []; } });
const rel = (p) => relative(ROOT, p).split(sep).join('/');
const lineOf = (txt, i) => txt.slice(0, i).split('\n').length;
const css = files.filter((f) => f.endsWith('.css'));
const js = files.filter((f) => f.endsWith('.js') || f.endsWith('.mjs'));

// ── 1. CSS: comentarios y llaves equilibrados (un /* sin cerrar anula reglas en silencio)
for (const f of css) {
  const t = readFileSync(f, 'utf8');
  const o = (t.match(/\/\*/g) || []).length, c = (t.match(/\*\//g) || []).length;
  if (o !== c) errors.push(`${rel(f)}: ${o} "/*" y ${c} "*/"`);
  const n = t.replace(/\/\*[\s\S]*?\*\//g, '');
  if ((n.match(/\{/g) || []).length !== (n.match(/\}/g) || []).length) errors.push(`${rel(f)}: llaves desequilibradas`);
}

// ── 2. Sistema de diseño: valores solo en tokens.css
const TOKENS = 'src/styles/tokens.css';
const RULES = [
  [/#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?)\(/g, 'color fuera de tokens (usa var(--bf-…) o color-mix con un token)'],
  [/font(?:-size)?\s*:[^;{}]*?\b\d+(?:\.\d+)?px/g, 'tamaño de letra fuera de la escala (usa var(--bf-text-…))'],
  [/border(?:-[a-z]+)?-radius\s*:[^;{}]*?(?<![\d.])(?!1px|2px)\d+(?:\.\d+)?px/g, 'radio fuera de la escala (usa var(--bf-radius-…))'],
  [/(?:^|[\s;{])(?:padding|margin|gap|row-gap|column-gap)(?:-[a-z]+)?\s*:[^;{}]*?(?<![\d.])(?!0px|1px|2px)\d+(?:\.\d+)?px/g, 'espacio fuera de la retícula (usa var(--bf-space-…))']
];
for (const f of css) {
  if (rel(f) === TOKENS) continue;
  const t = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  for (const [re, msg] of RULES) for (const m of t.matchAll(re)) errors.push(`${rel(f)}:${lineOf(t, m.index)} ${msg} → "${m[0].trim().slice(0, 60)}"`);
}

// ── 3. Plantillas: sin style="…" con valores; solo se permiten variables CSS (--x: …) como datos
for (const f of js.filter((x) => !rel(x).startsWith('scripts/'))) {
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/style="([^"]*)"/g)) {
    const decls = m[1].split(';').map((s) => s.trim()).filter(Boolean);
    if (decls.some((d) => !d.startsWith('--'))) errors.push(`${rel(f)}:${lineOf(t, m.index)} style="…" con valores: usa una clase o una variable --x`);
  }
}

// ── 4. Capas: dirección de los imports (docs/ARQUITECTURA.md §2)
const layer = (p) => {
  const r = rel(p);
  if (r.startsWith('src/lib/')) return 'lib';
  if (r.startsWith('src/components/')) return 'components';
  if (r.startsWith('site/sections/')) return 'sections';
  if (r.startsWith('site/features/') || r.startsWith('admin/features/')) return 'features';
  if (r.startsWith('site/pages/') || r.startsWith('admin/pages/')) return 'pages';
  return null;
};
const ALLOWED = {
  lib: ['lib'],
  components: ['lib', 'components'],
  sections: ['lib', 'components'],
  features: ['lib', 'components'],
  pages: ['lib', 'components', 'sections', 'pages']
};
for (const f of js) {
  const from = layer(f);
  if (!from) continue;
  const t = readFileSync(f, 'utf8');
  for (const m of t.matchAll(/(?:import|export)[^'"]*from\s*['"](\.[^'"]+)['"]/g)) {
    const target = join(dirname(f), m[1]);
    const to = layer(target);
    if (!to) continue;
    if (!ALLOWED[from].includes(to)) errors.push(`${rel(f)}: la capa "${from}" no puede importar "${to}" (${m[1]})`);
    if (from === 'components' && rel(target) === 'src/lib/api.js') errors.push(`${rel(f)}: un componente no accede a datos (api.js)`);
    if (from === 'features' && to === 'features' && dirname(target) !== dirname(f)) errors.push(`${rel(f)}: una feature no importa otra (usa store.js)`);
  }
}

// ── 5. Un componente = components/x.js + styles/components/x.css
const comps = files.filter((f) => rel(f).startsWith('src/components/')).map((f) => rel(f).split('/').pop().replace('.js', ''));
const compCss = new Set(files.filter((f) => rel(f).startsWith('src/styles/components/')).map((f) => rel(f).split('/').pop().replace('.css', '')));
for (const c of comps) if (c !== 'icon' && !compCss.has(c)) errors.push(`src/components/${c}.js no tiene src/styles/components/${c}.css`);
for (const c of compCss) if (!comps.includes(c)) errors.push(`src/styles/components/${c}.css no tiene componente src/components/${c}.js`);

// ── 6. Tamaño: archivos de más de 200 líneas → partir antes de seguir
for (const f of [...css, ...js]) {
  const n = readFileSync(f, 'utf8').split('\n').length;
  if (n > MAX_LINES) warns.push(`${rel(f)}: ${n} líneas (máx. ${MAX_LINES})`);
}

// ── 7. JS: node --check
for (const f of js) {
  const r = spawnSync(process.execPath, ['--check', f], { encoding: 'utf8' });
  if (r.status !== 0) errors.push(`${rel(f)} no pasa node --check:\n${(r.stderr || '').split('\n').slice(0, 4).join('\n')}`);
}

// ── 8. Tokens sin uso
const tokens = [...readFileSync(join(ROOT, TOKENS), 'utf8').matchAll(/(--bf-[a-z0-9-]+)\s*:/g)].map((m) => m[1]);
const used = css.filter((f) => rel(f) !== TOKENS).map((f) => readFileSync(f, 'utf8')).join('\n') + readFileSync(join(ROOT, TOKENS), 'utf8').replace(/(--bf-[a-z0-9-]+)\s*:/g, '');
for (const t of new Set(tokens)) if (!used.includes(`var(${t}`)) errors.push(`${TOKENS}: ${t} no se usa (ningún token sin uso)`);

for (const w of warns) console.log('· aviso: ' + w);
if (errors.length) { console.error('\n✗ check fallado:\n' + errors.map((e) => '  - ' + e).join('\n')); process.exit(1); }
console.log(`✓ check correcto · ${css.length} CSS · ${js.length} JS · ${new Set(tokens).size} tokens · ${comps.length} componentes`);
