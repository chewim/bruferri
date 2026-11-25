import { html } from '../lib/dom.js';

// PressQuote · una opinión real del sector, corta, con nombre. Se cita en el idioma original (lang).
// compact: versión de la portada (comillas en línea, texto más pequeño)
export function PressQuote({ quote, author, role = null, lang = 'es', compact = false }) {
  return html`<figure class="bf-quote${compact ? ' bf-quote--compact' : ''}">
    <blockquote class="bf-quote__text" lang="${lang}"><p>${quote}</p></blockquote>
    <figcaption class="bf-quote__by"><span class="bf-quote__author">${author}</span>${role ? html`<span class="t-muted"> · ${role}</span>` : ''}</figcaption>
  </figure>`;
}
