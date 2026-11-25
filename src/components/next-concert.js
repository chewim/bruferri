import { html } from '../lib/dom.js';
import { Icon } from './icon.js';
import { DateBadge } from './date.js';

// NextConcert · tarjeta de la portada que lleva a la agenda
export function NextConcert(c, { href = '#conciertos' } = {}) {
  if (!c) return '';
  return html`<a class="bf-next" href="${href}" aria-label="${c.label}: ${c.title}, ${c.place}. Ver todas las fechas">
    ${DateBadge({ day: c.day, month: c.month, variant: 'outline' })}
    <div class="bf-next__body">
      <p class="t-caption t-accent">${c.label}</p>
      <p class="bf-next__title">${c.title}</p>
      <p class="bf-next__place">${Icon('pin', 's')}${c.place}</p>
    </div>
    <span class="bf-next__more"><span class="bf-next__more-label">Todas las fechas</span>${Icon('arrowDown')}</span>
  </a>`;
}
