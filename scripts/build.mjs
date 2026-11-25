#!/usr/bin/env node
// Build sin dependencias: genera dist/ (HTML estático + CSS unido + módulos JS + imágenes).
//   node scripts/build.mjs            → dist/ con base "/" (dominio propio)
//   BF_BASE=/bruferri/ node scripts/build.mjs → para chewim.github.io/bruferri
//   node scripts/build.mjs --watch    → reconstruye al guardar
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync, watch } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const STYLES = join(ROOT, 'src', 'styles');
const PAGES = { 'index.html': 'home.js', '404.html': '404.js' };

const css = (dir) => readdirSync(dir).filter((f) => f.endsWith('.css')).sort().map((f) => readFileSync(join(dir, f), 'utf8'));

async function build() {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(join(DIST, 'assets', 'js'), { recursive: true });

  // 1 · CSS en orden de capas: tokens → base → layout → componentes → secciones
  const bundle = [
    readFileSync(join(STYLES, 'tokens.css'), 'utf8'),
    readFileSync(join(STYLES, 'base.css'), 'utf8'),
    readFileSync(join(STYLES, 'layout.css'), 'utf8'),
    ...css(join(STYLES, 'components')),
    ...css(join(STYLES, 'sections'))
  ].join('\n');
  writeFileSync(join(DIST, 'assets', 'bf.css'), bundle);

  // 2 · Módulos para el navegador (misma estructura que el repo, así los imports relativos no cambian)
  cpSync(join(ROOT, 'src'), join(DIST, 'assets', 'js', 'src'), { recursive: true, filter: (p) => !p.includes(`${join('src', 'styles')}`) });
  for (const d of ['features']) cpSync(join(ROOT, 'site', d), join(DIST, 'assets', 'js', 'site', d), { recursive: true });
  cpSync(join(ROOT, 'site', 'main.js'), join(DIST, 'assets', 'js', 'site', 'main.js'));

  // 3 · Imágenes
  cpSync(join(ROOT, 'site', 'assets'), join(DIST, 'assets'), { recursive: true });

  // 4 · Páginas: los mismos componentes, ejecutados en Node
  for (const [out, file] of Object.entries(PAGES)) {
    const url = pathToFileURL(join(ROOT, 'site', 'pages', file)).href + `?t=${Date.now()}`;
    const page = (await import(url)).default;
    writeFileSync(join(DIST, out), String(await page()));
  }

  // 5 · Dominio propio (cuando apunte aquí) y sin Jekyll
  writeFileSync(join(DIST, '.nojekyll'), '');
  if (existsSync(join(ROOT, 'CNAME'))) cpSync(join(ROOT, 'CNAME'), join(DIST, 'CNAME'));
  console.log(`✓ dist/ generado (base ${process.env.BF_BASE || '/'})`);
}

await build();
if (process.argv.includes('--watch')) {
  let t;
  for (const d of ['src', 'site']) watch(join(ROOT, d), { recursive: true }, () => { clearTimeout(t); t = setTimeout(() => build().catch((e) => console.error(e)), 150); });
  console.log('· vigilando src/ y site/ …');
}
