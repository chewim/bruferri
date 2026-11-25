import { mount, on } from '../../../src/lib/dom.js';
import { bus } from '../../../src/lib/store.js';
import { AlbumShelf } from '../../../src/components/album-shelf.js';

// Colección de discos: elegir funda, ver pistas y mandar reproducir al player (vía bus)
export function initShelf(root, { albums }) {
  const list = albums.list;
  let active = null;
  let now = null;
  const wide = !!root.querySelector('.bf-shelf--wide');
  const render = () => mount(root, AlbumShelf({ albums: list, active, now, wide }));

  on(root, 'click', '[data-action]', (e, el) => {
    const a = el.dataset.action;
    if (a === 'shelf-pick') { active = Number(el.dataset.index); render(); }
    if (a === 'shelf-back') { active = null; render(); }
    if (a === 'shelf-play') bus.set({ play: { album: list[active].slug, index: Number(el.dataset.index) } });
  });
  bus.subscribe((g) => {
    const n = g.nowPlaying;
    if ((n && (!now || n.album !== now.album || n.index !== now.index)) || (!n && now)) { now = n; render(); }
  });
}
