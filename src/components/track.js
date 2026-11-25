import { html, attrs } from '../lib/dom.js';

// Track · fila de pista. meta: duración o "Sonando"
export function Track({ n, title, meta, current = false, a = {} }) {
  return html`<button class="bf-track" type="button"${attrs({ 'aria-current': current ? 'true' : null, ...a })}><span class="bf-track__num">${n}</span><span class="bf-track__name">${title}</span><span class="t-caption ${current ? 'bf-track__now' : 't-muted'}">${meta}</span></button>`;
}
