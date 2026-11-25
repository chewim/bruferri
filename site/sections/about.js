import { html } from '../../src/lib/dom.js';
import { Button } from '../../src/components/button.js';
import { AlbumShelf } from '../../src/components/album-shelf.js';

// About · "Quién es Bru" con la colección de discos
export function About({ profile, albums }) {
  const a = profile.about;
  return html`<section id="bru" class="bf-section" aria-labelledby="bru-title">
    <div class="bf-container bf-grid">
      <div class="bf-about__lead">
        <p class="t-caption t-accent">${a.kicker}</p>
        <h2 id="bru-title" class="t-heading">${a.title}</h2>
        <p class="t-body-l t-muted t-measure">${a.body}</p>
        <div class="bf-row">
          ${Button({ label: 'Ver trayectoria completa', variant: 'secondary', href: 'trayectoria/', iconEnd: 'arrowRight' })}
          ${Button({ label: 'Próximas fechas', variant: 'ghost', href: '#conciertos' })}
        </div>
        <p class="t-label t-muted bf-about__facts">${a.facts.map((f) => html`<span><b>${f.n}</b> ${f.label}</span>`)}</p>
      </div>
      <div class="bf-about__media" data-mount="shelf">${AlbumShelf({ albums: albums.list })}</div>
    </div>
  </section>`;
}
