// ÚNICO acceso a datos. Hoy: JSON de src/data (en el build) y el bloque #bf-data (en el navegador).
// Mañana: Supabase, sin tocar componentes ni secciones.
const FILES = ['profile', 'concerts', 'albums'];

export async function getData() {
  if (typeof document !== 'undefined') {
    const el = document.getElementById('bf-data');
    return el ? JSON.parse(el.textContent) : {};
  }
  const { readFile } = await import('node:fs/promises');
  const out = {};
  for (const f of FILES) {
    out[f] = JSON.parse(await readFile(new URL(`../data/${f}.json`, import.meta.url), 'utf8'));
  }
  return out;
}
