import { html } from '../../src/lib/dom.js';
import { Chip } from '../../src/components/chip.js';
import { ConcertList, LIMIT } from '../../src/components/concert-list.js';

// Concerts · agenda con filtros por proyecto y "Ver todas"
export function Concerts({ items, projects, year }) {
  const used = Object.keys(projects).filter((id) => items.some((c) => c.cat === id));
  const filters = [{ id: 'all', label: 'Todos' }, ...used.map((id) => ({ id, label: projects[id].title }))];
  return html`<section id="conciertos" class="bf-section bf-section--flush-top" aria-labelledby="conciertos-title">
    <div class="bf-container">
      <div class="bf-section-head">
        <div class="bf-section-head__text"><p class="t-caption t-muted">Agenda ${year}</p><h2 id="conciertos-title" class="t-heading">Próximos conciertos</h2></div>
        <div class="bf-chips" role="group" aria-label="Filtrar por proyecto">${filters.map((f) => Chip({ label: f.label, pressed: f.id === 'all', a: { 'data-action': 'agenda-filter', 'data-filter': f.id } }))}</div>
      </div>
      <div class="bf-concerts" data-mount="agenda">${ConcertList(items)}</div>
      <div class="bf-concerts__more"${items.length > LIMIT ? '' : html` hidden`}>
        <button class="bf-btn bf-btn--ghost" type="button" data-action="agenda-more">Ver todas las fechas (${items.length})</button>
      </div>
    </div>
  </section>`;
}
