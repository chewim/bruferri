import { html } from '../../src/lib/dom.js';
import { Testimonials } from '../../src/components/testimonials.js';

// Press · prueba social justo después de la portada: primero la impresión, después quien la avala,
// luego el detalle (bio, discos, fechas). Una opinión cada vez, en una sola caja.
export function Press({ profile }) {
  if (!profile.press?.length) return '';
  return html`<section class="bf-press" aria-label="Qué dicen de ${profile.name}">
    <div class="bf-container bf-grid"><div class="bf-press__box">${Testimonials({ items: profile.press, label: `Qué dicen de ${profile.name}` })}</div></div>
  </section>`;
}
