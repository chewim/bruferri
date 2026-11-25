import { html } from '../../src/lib/dom.js';
import { AlbumShelf } from '../../src/components/album-shelf.js';

// Discografía · la colección de discos en su propia sección; tocar uno lo trae al frente con sus pistas
export function Discography({ profile, albums }) {
  const d = profile.discography;
  return html`<section id="discografia" class="bf-section bf-discography" aria-labelledby="discografia-title">
    <div class="bf-container">
      <div class="bf-section-head">
        <div class="bf-section-head__text"><p class="t-caption t-muted">${d.kicker} · ${albums.list.length} álbumes</p><h2 id="discografia-title" class="t-heading">${d.title}</h2></div>
      </div>
      <div data-mount="shelf">${AlbumShelf({ albums: albums.list, wide: true })}</div>
    </div>
  </section>`;
}
