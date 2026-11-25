import { mount, on } from '../../../src/lib/dom.js';
import { upcoming, present, todayISO } from '../../../src/lib/dates.js';
import { ConcertList, LIMIT } from '../../../src/components/concert-list.js';

// Agenda: filtros por proyecto y "Ver todas". Vuelve a filtrar por fecha en el navegador (la web es estática).
export function initAgenda(section, { profile, concerts }, { onInfo }) {
  const listEl = section.querySelector('[data-mount="agenda"]');
  const moreWrap = section.querySelector('.bf-concerts__more');
  const today = todayISO();
  const all = upcoming(concerts, today).map((c, i) => ({ ...present(c, profile.projects, today), isFirst: i === 0 }));
  let filter = 'all';
  let showAll = false;

  function render() {
    const items = all.filter((c) => filter === 'all' || c.cat === filter);
    mount(listEl, ConcertList(items, { showAll }));
    moreWrap.hidden = items.length <= LIMIT;
    const btn = moreWrap.querySelector('button');
    btn.textContent = showAll ? 'Ver menos fechas' : `Ver todas las fechas (${items.length})`;
    section.querySelectorAll('[data-action="agenda-filter"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
  }
  on(section, 'click', '[data-action]', (e, el) => {
    const a = el.dataset.action;
    if (a === 'agenda-filter') { filter = el.dataset.filter; showAll = false; render(); }
    if (a === 'agenda-more') { showAll = !showAll; render(); }
    if (a === 'concert-info') {
      const c = all.find((x) => x.id === el.dataset.id);
      if (c.ticketUrl) window.open(c.ticketUrl, '_blank', 'noopener');
      else onInfo(`Entradas · ${c.title} · ${c.place}`);
    }
  });
  render();
}
