import { html } from '../lib/dom.js';

// PressQuote · una opinión real del sector, corta, con nombre. Se cita en el idioma original (lang).
export function PressQuote({ quote, author, role = null, lang = 'es' }) {
  return html`<figure class="bf-quote">
    <blockquote class="bf-quote__text" lang="${lang}"><p>${quote}</p></blockquote>
    <figcaption class="bf-quote__by"><span class="bf-quote__author">${author}</span>${role ? html`<span class="t-muted"> · ${role}</span>` : ''}</figcaption>
  </figure>`;
}
