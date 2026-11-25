import { raw } from '../lib/dom.js';

// Iconos de trazo 24×24. Decorativos (aria-hidden); el texto accesible va en el botón.
const STROKE = {
  send: '<path d="M21 3 10.5 13.5"/><path d="m21 3-6.5 18-4-7.5L3 9.5z"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronUp: '<path d="m6 15 6-6 6 6"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowDown: '<path d="M12 5v14M6 13l6 6 6-6"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  list: '<path d="M4 7h16M4 12h16M4 17h10"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>'
};
const FILL = {
  play: '<path d="M8 5.5v13l11-6.5z"/>',
  pause: '<rect x="6.5" y="5" width="4" height="14" rx="1"/><rect x="13.5" y="5" width="4" height="14" rx="1"/>',
  prev: '<path d="M18 6v12l-9-6z"/><rect x="5" y="6" width="2.5" height="12" rx="1"/>',
  next: '<path d="M6 6v12l9-6z"/><rect x="16.5" y="6" width="2.5" height="12" rx="1"/>'
};

export function Icon(name, size = '', extra = '') {
  const cls = ['bf-icon', size && `bf-icon--${size}`, extra].filter(Boolean).join(' ');
  if (FILL[name]) return raw(`<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${FILL[name]}</svg>`);
  return raw(`<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${STROKE[name] || ''}</svg>`);
}
