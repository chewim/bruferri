import { html, attrs } from '../lib/dom.js';
import { Icon } from './icon.js';

// IconButton · solo icono; label obligatorio (aria-label). variant: accent | bare; size: s | l
export function IconButton({ icon, label, variant = '', size = '', iconSize = '', a = {} }) {
  const cls = ['bf-icon-btn', variant && `bf-icon-btn--${variant}`, size && `bf-icon-btn--${size}`].filter(Boolean).join(' ');
  return html`<button class="${cls}" type="button" aria-label="${label}"${attrs(a)}>${Icon(icon, iconSize)}</button>`;
}
