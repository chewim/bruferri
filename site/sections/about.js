import { html } from '../../src/lib/dom.js';
import { Button } from '../../src/components/button.js';
import { BgVideo } from '../../src/components/bg-video.js';

// About · "Quién es Bru" con vídeo de fondo detrás del texto
export function About({ profile }) {
  const a = profile.about;
  return html`<section id="bru" class="bf-section bf-about" aria-labelledby="bru-title">
    ${BgVideo(a.video)}
    <div class="bf-container bf-grid">
      <div class="bf-about__lead">
        <p class="t-caption t-accent">${a.kicker}</p>
        <h2 id="bru-title" class="t-heading">${a.title}</h2>
        <p class="t-body-l bf-about__body t-measure">${a.body}</p>
        <div class="bf-row">
          ${Button({ label: 'Ver trayectoria completa', variant: 'secondary', href: 'trayectoria/', iconEnd: 'arrowRight' })}
          ${Button({ label: 'Escuchar sus discos', variant: 'ghost', href: '#discografia' })}
        </div>
        <p class="t-label t-muted bf-about__facts">${a.facts.map((f) => html`<span><b>${f.n}</b> ${f.label}</span>`)}</p>
      </div>
    </div>
  </section>`;
}
