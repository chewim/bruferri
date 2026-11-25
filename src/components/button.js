import { html, attrs } from '../lib/dom.js';
import { Icon } from './icon.js';

// Button · enlace si lleva href, botón si no. variant: primary | secondary | ghost | glass
export function Button({ label, variant = 'secondary', size = '', block = false, href = null, icon = null, iconEnd = null, labelClass = '', a = {} }) {
  const cls = ['bf-btn', `bf-btn--${variant}`, size && `bf-btn--${size}`, block && 'bf-btn--block'].filter(Boolean).join(' ');
  const inner = html`${icon ? Icon(icon) : ''}${labelClass ? html`<span class="${labelClass}">${label}</span>` : label}${iconEnd ? Icon(iconEnd) : ''}`;
  return href
    ? html`<a class="${cls}" href="${href}"${attrs(a)}>${inner}</a>`
    : html`<button class="${cls}" type="button"${attrs(a)}>${inner}</button>`;
}
