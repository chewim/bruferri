import { html, raw } from '../../src/lib/dom.js';
import { TopBar } from '../../src/components/top-bar.js';
import { BASE, VERSION } from '../../src/lib/env.js';

// Documento común: <head>, barra superior y datos para las features del navegador
export function Document({ title, description, image, profile, body, data, dock = '' }) {
  return html`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<base href="${BASE}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${description}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:type" content="website">
${image ? html`<meta property="og:image" content="${image}">` : ''}
<meta name="theme-color" content="#0b0b0c">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&amp;display=swap">
<link rel="stylesheet" href="assets/bf.css?v=${VERSION}">
</head>
<body>
<div class="bf-page">
  <div class="bf-dock-top">${TopBar({ brand: profile.name, langs: profile.langs, home: BASE })}</div>
  <main>${body}</main>
  ${dock}
</div>
<script type="application/json" id="bf-data">${raw(JSON.stringify(data).replace(/</g, '\\u003c'))}</script>
<script type="module" src="assets/js/site/main.js?v=${VERSION}"></script>
</body>
</html>
`;
}
