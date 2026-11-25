import { on } from '../../../src/lib/dom.js';

// Hoja de contacto: abrir/cerrar (Escape, fondo), motivo, asunto precargado y envío.
// Hasta tener la Edge Function `contact`, el envío abre el correo con el mensaje listo (mailto).
export function initContact(scrim, { profile }) {
  const sheet = scrim.querySelector('.bf-sheet');
  const form = scrim.querySelector('form');
  let reason = 'programacion';
  let opener = null;
  let subject = '';

  function setReason(id) {
    reason = id;
    scrim.querySelectorAll('[data-action="contact-reason"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.reason === id)));
  }
  function setSubject(text) {
    subject = text;
    let p = form.querySelector('.bf-sheet__subject');
    if (!text) { p?.remove(); return; }
    if (!p) { p = document.createElement('p'); p.className = 't-label t-accent bf-sheet__subject'; form.querySelector('#cf-msg').before(p); }
    p.textContent = `Asunto: ${text}`;
  }
  function open(text = '') {
    opener = document.activeElement;
    setSubject(text);
    setReason(text.startsWith('Entradas') ? 'entradas' : 'programacion');
    scrim.hidden = false;
    document.body.style.overflow = 'hidden';
    sheet.querySelector('#cf-name').focus();
  }
  function close() {
    scrim.hidden = true;
    document.body.style.overflow = '';
    opener?.focus();
  }

  on(document, 'click', '[data-action="contact-open"]', () => open());
  on(scrim, 'click', '[data-action="contact-close"]', close);
  on(scrim, 'click', '[data-action="contact-reason"]', (e, el) => setReason(el.dataset.reason));
  scrim.addEventListener('click', (e) => { if (e.target === scrim) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !scrim.hidden) close(); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const label = profile.contactReasons.find((r) => r.id === reason)?.label || '';
    const subj = subject || `${label} · ${f.get('name')}`;
    const body = `${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`;
    window.location.href = `mailto:${profile.booking.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
  });

  return { open, close };
}
