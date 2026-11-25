import { html } from '../lib/dom.js';
import { Icon } from './icon.js';
import { LangSelect } from './lang-select.js';

// TopBar · Contacta (izquierda), marca (centro), idioma (derecha)
export function TopBar({ brand, langs, lang = 'ES', home = './' }) {
  return html`<header class="bf-topbar">
    <div class="bf-topbar__start">
      <button class="bf-btn bf-btn--glass bf-btn--s bf-topbar__contact" type="button" aria-label="Contacta" data-action="contact-open">${Icon('send')}<span class="bf-topbar__contact-label">Contacta</span></button>
    </div>
    <a class="bf-topbar__brand" href="${home}">${brand}</a>
    <div class="bf-topbar__end">${LangSelect({ langs, current: lang })}</div>
  </header>`;
}
