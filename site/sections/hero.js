import { html } from '../../src/lib/dom.js';
import { NextConcert } from '../../src/components/next-concert.js';

// Hero · foto encuadrada por su punto focal, nombre, definición, oficios y próxima fecha
export function Hero({ profile, next }) {
  const h = profile.hero;
  return html`<section class="bf-hero" aria-label="Portada" style="--fx: ${h.focal_x}; --fy: ${h.focal_y}">
    <div class="bf-hero__photo">
      <img class="bf-hero__backdrop" src="${h.thumb}" alt="" aria-hidden="true">
      <img class="bf-hero__img" src="${h.src}" srcset="${h.srcset}" sizes="(min-width: 640px) 1200px, 720px" width="${h.width}" height="${h.height}" alt="${h.alt}" fetchpriority="high">
    </div>
    <div class="bf-hero__aside">
      <div class="bf-container bf-grid"><ul class="bf-roles" aria-label="Oficios">${profile.roles.map((r) => html`<li>${r}</li>`)}</ul></div>
    </div>
    <div class="bf-hero__content">
      <div class="bf-container bf-hero__inner">
        <div class="bf-stack">
          <h1 class="t-display">${profile.name}</h1>
          <p class="t-body-l bf-hero__lede">${profile.lede}</p>
        </div>
        ${NextConcert(next)}
      </div>
    </div>
  </section>`;
}
