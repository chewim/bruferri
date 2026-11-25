import { html } from '../lib/dom.js';
import { Icon } from './icon.js';

// LangSelect · desplegable de idioma (CA/EN pendientes de traducción: BACKLOG)
export function LangSelect({ langs, current = 'ES', open = false }) {
  const cur = langs.find((l) => l.code === current) || langs[0];
  return html`<div class="bf-lang" data-feature="lang">
    <button class="bf-chip bf-lang__btn" type="button" aria-haspopup="listbox" aria-expanded="${open ? 'true' : 'false'}" aria-label="Idioma: ${cur.name}" data-action="lang-toggle">${cur.code}${Icon('chevronDown', 's')}</button>
    <ul class="bf-lang__menu" role="listbox" aria-label="Idioma"${open ? '' : html` hidden`}>
      ${langs.map((l) => html`<li><button class="bf-lang__item" type="button" role="option" aria-selected="${l.code === cur.code ? 'true' : 'false'}" data-action="lang-pick" data-lang="${l.code}">${l.code} <span>${l.name}</span></button></li>`)}
    </ul>
  </div>`;
}
