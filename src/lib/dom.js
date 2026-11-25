// Utilidades de plantilla y DOM. Sin dependencias de UI.
// html`…` escapa todo lo interpolado salvo lo que ya es HTML seguro (otro html`…` o raw()).
const SAFE = Symbol('safe');

export function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function raw(str) {
  return { [SAFE]: true, toString: () => String(str) };
}

function part(v) {
  if (v == null || v === false) return '';
  if (Array.isArray(v)) return v.map(part).join('');
  if (typeof v === 'object' && v[SAFE]) return String(v);
  return esc(v);
}

export function html(strings, ...values) {
  let out = strings[0];
  values.forEach((v, i) => { out += part(v) + strings[i + 1]; });
  return raw(out);
}

// Monta HTML en un nodo (navegador) y devuelve el foco al mismo control si estaba dentro
export function mount(el, markup) {
  const f = document.activeElement;
  const key = f && el.contains(f) && f.dataset.action ? `[data-action="${f.dataset.action}"]${f.dataset.index ? `[data-index="${f.dataset.index}"]` : ''}${f.dataset.album ? `[data-album="${f.dataset.album}"]` : ''}` : null;
  el.innerHTML = String(markup);
  if (key) el.querySelector(key)?.focus({ preventScroll: true });
  return el;
}

// Delegación de eventos: on(root, 'click', '[data-action="x"]', fn)
export function on(root, type, selector, fn) {
  root.addEventListener(type, (e) => {
    const t = e.target.closest(selector);
    if (t && root.contains(t)) fn(e, t);
  });
}

// Atributos a partir de un objeto: attrs({ 'data-action': 'play', hidden: true }) → data-action="play" hidden
export function attrs(obj = {}) {
  return raw(Object.entries(obj)
    .filter(([, v]) => v !== false && v != null)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${esc(v)}"`))
    .join(''));
}
