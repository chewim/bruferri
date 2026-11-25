import { html } from '../lib/dom.js';
import { Icon } from './icon.js';
import { DateBadge } from './date.js';
import { Chip } from './chip.js';

// ConcertRow · next = true solo para el primero de la agenda (acento)
export function ConcertRow(c, { next = false } = {}) {
  const label = next ? 'Info y entradas' : 'Info';
  return html`<article class="bf-concert" data-cat="${c.cat}">
    ${DateBadge({ day: c.day, month: c.month, variant: next ? 'next' : '' })}
    <div class="bf-concert__body">
      ${next ? html`<p class="t-caption t-accent">${c.rowLabel}</p>` : ''}
      <h3 class="bf-concert__title">${c.title}</h3>
      <p class="bf-concert__place">${Icon('pin', 's')}${c.place}</p>
    </div>
    ${Chip({ label: c.tag, extra: 'bf-concert__tag' })}
    <button class="bf-btn ${next ? 'bf-btn--primary' : 'bf-btn--ghost'}" type="button" aria-label="Info y entradas: ${c.title}, ${c.place}" data-action="concert-info" data-id="${c.id}"><span class="bf-concert__label">${label}</span>${Icon('arrowRight')}</button>
  </article>`;
}
