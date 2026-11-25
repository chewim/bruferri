import { html } from '../lib/dom.js';
import { Icon } from './icon.js';

const initials = (name) => name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('');

// Testimonials · opiniones del sector de una en una, en el mismo espacio. Avanza solo con barra de progreso
// (la feature), se pausa al pasar por encima, con el foco o con el botón; con "reducir movimiento" no avanza.
// Todas las opiniones ocupan la misma celda: la caja mide lo que la más larga y no salta al cambiar.
export function Testimonials({ items, active = 0, label = 'Opiniones' }) {
  return html`<div class="bf-testimonials" role="region" aria-roledescription="carrusel" aria-label="${label}" data-feature="testimonials">
    <div class="bf-testimonials__stage">
      ${items.map((t, i) => html`<figure class="bf-testimonials__slide" role="group" aria-roledescription="opinión" aria-label="${i + 1} de ${items.length}: ${t.author}"${i === active ? '' : html` aria-hidden="true"`} data-state="${i === active ? 'on' : 'off'}">
        <blockquote class="bf-testimonials__quote" lang="${t.lang}"><p>${t.quote}</p></blockquote>
        <figcaption class="bf-testimonials__by">
          ${t.photo ? html`<img class="bf-testimonials__avatar" src="${t.photo}" alt="" width="56" height="56" loading="lazy">` : html`<span class="bf-testimonials__avatar" aria-hidden="true">${initials(t.author)}</span>`}
          <span class="bf-testimonials__who"><span class="bf-testimonials__author">${t.author}</span>${t.role ? html`<span class="t-muted">${t.role}</span>` : ''}</span>
        </figcaption>
      </figure>`)}
    </div>
    <div class="bf-testimonials__nav">
      <div class="bf-testimonials__steps">
        ${items.map((t, i) => html`<button class="bf-testimonials__step" type="button" aria-label="Ver opinión ${i + 1} de ${items.length}: ${t.author}" aria-current="${i === active ? 'true' : 'false'}" data-action="testimonial-go" data-index="${i}"><span class="bf-testimonials__fill"></span></button>`)}
      </div>
      <button class="bf-icon-btn bf-icon-btn--s bf-icon-btn--bare bf-testimonials__toggle" type="button" aria-label="Pausar las opiniones" aria-pressed="false" data-action="testimonial-toggle">${Icon('pause', 's')}</button>
    </div>
  </div>`;
}
