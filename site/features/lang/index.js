import { on } from '../../../src/lib/dom.js';

// Selector de idioma. Las traducciones CA/EN están pendientes (BACKLOG): de momento solo cambia la etiqueta.
export function initLang(root) {
  const btn = root.querySelector('[data-action="lang-toggle"]');
  const menu = root.querySelector('.bf-lang__menu');
  const toggle = (open) => { menu.hidden = !open; btn.setAttribute('aria-expanded', String(open)); };
  on(root, 'click', '[data-action="lang-toggle"]', () => toggle(menu.hidden));
  on(root, 'click', '[data-action="lang-pick"]', (e, el) => {
    btn.firstChild.textContent = el.dataset.lang;
    menu.querySelectorAll('[role="option"]').forEach((o) => o.setAttribute('aria-selected', String(o === el)));
    toggle(false);
    btn.focus();
  });
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) toggle(false); });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape') { toggle(false); btn.focus(); } });
}
