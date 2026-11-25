// Conciertos: fechas, filtro de próximos y texto listo para pintar. Sin UI.
const MONTHS = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const iso = (d) => d.toISOString().slice(0, 10);

// Último día en que el concierto sigue vigente (YYYY-MM-DD); los TBA usan el último día de su mes
function lastDay(c) {
  if (c.date_end) return c.date_end;
  if (c.date_start) return c.date_start;
  if (c.date_tba) { const [y, m] = c.date_tba.split('-').map(Number); return iso(new Date(Date.UTC(y, m, 0))); }
  return '9999-12-31';
}

export function upcoming(concerts, today = iso(new Date())) {
  return concerts
    .filter((c) => c.visible !== false && lastDay(c) >= today)
    .sort((a, b) => (a.date_start || a.date_end || a.date_tba || '').localeCompare(b.date_start || b.date_end || b.date_tba || ''));
}

// Datos de presentación de un concierto (día, mes, título, lugar, etiqueta)
export function present(c, projects, today = iso(new Date())) {
  const running = c.date_end && (!c.date_start || c.date_start <= today);
  const ref = running ? c.date_end : (c.date_start || c.date_tba || '');
  const [, m, d] = ref.split('-');
  const project = projects[c.project_slug] || {};
  return {
    id: c.id,
    cat: c.project_slug,
    day: c.date_start || c.date_end ? d : 'TBA',
    month: m ? MONTHS[Number(m) - 1] : '',
    title: c.title_other || project.title || '',
    place: [c.venue, c.city, c.country].filter(Boolean).join(', '),
    tag: project.tag || '',
    ticketUrl: c.ticket_url || null,
    label: running ? 'En cartel hasta' : 'Próximo concierto',
    rowLabel: running ? 'En cartel ahora' : 'Próximo'
  };
}

export function todayISO() { return iso(new Date()); }
