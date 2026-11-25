import { html } from '../lib/dom.js';
import { ConcertRow } from './concert-row.js';

export const LIMIT = 6;

// ConcertList · filas de la agenda; el acento solo para el primer concierto de todos (isFirst)
export function ConcertList(items, { showAll = false } = {}) {
  const visible = showAll ? items : items.slice(0, LIMIT);
  if (!visible.length) return html`<p class="t-body t-muted bf-concerts__empty">No hay fechas anunciadas para este proyecto.</p>`;
  return html`${visible.map((c) => ConcertRow(c, { next: !!c.isFirst }))}`;
}
