import { html, attrs } from '../lib/dom.js';

// Chip · filtro con aria-pressed, o etiqueta estática (pressed = null)
export function Chip({ label, pressed = null, extra = '', a = {} }) {
  if (pressed === null) return html`<span class="bf-chip bf-chip--static ${extra}">${label}</span>`;
  return html`<button class="bf-chip ${extra}" type="button" aria-pressed="${pressed ? 'true' : 'false'}"${attrs(a)}>${label}</button>`;
}
