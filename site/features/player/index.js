import { mount, on } from '../../../src/lib/dom.js';
import { bus } from '../../../src/lib/store.js';
import { toSeconds, fmt } from '../../../src/lib/time.js';
import { PlayerBar } from '../../../src/components/player-bar.js';

// Player · en pausa al cargar. Con track.src suena el audio real; sin audio (aún no lo tenemos) simula el avance.
export function initPlayer(root, { albums }) {
  const list = albums.list;
  const audio = new Audio();
  let s = { album: albums.default || list[0].slug, index: 0, playing: false, open: false, t: 0, announce: '' };
  const al = () => list.find((a) => a.slug === s.album);
  const track = () => al().tracks[s.index];

  function render() {
    const a = al();
    const len = toSeconds(track().dur);
    mount(root, PlayerBar({ albums: list, album: a, index: s.index, playing: s.playing, open: s.open, elapsed: fmt(s.t), pct: Math.min(100, Math.round((s.t / len) * 100)), announce: s.announce }));
    bus.set({ nowPlaying: s.playing ? { album: s.album, index: s.index } : null });
  }
  function set(patch) {
    const prev = { album: s.album, index: s.index, playing: s.playing };
    s = { ...s, ...patch };
    const t = track();
    if (t.src && (prev.album !== s.album || prev.index !== s.index)) { audio.src = t.src; audio.currentTime = 0; }
    if (t.src) { if (s.playing) audio.play().catch(() => {}); else audio.pause(); }
    render();
  }
  function advance() {
    const a = al();
    if (s.index < a.tracks.length - 1) set({ index: s.index + 1, t: 0, announce: `Sonando: ${a.tracks[s.index + 1].title} · ${a.title}` });
    else set({ playing: false, index: 0, t: 0, announce: `Fin del disco ${a.title}` });
  }

  // Avance: solo se actualiza la barra de progreso, no se repinta el player entero
  function tick() {
    const len = toSeconds(track().dur);
    const pct = Math.min(100, Math.round((s.t / len) * 100));
    const bar = root.querySelector('.bf-progress');
    if (!bar) return;
    bar.setAttribute('aria-valuenow', pct);
    bar.firstElementChild.textContent = fmt(s.t);
    bar.querySelector('.bf-progress__fill').style.setProperty('--pct', pct + '%');
  }
  audio.addEventListener('timeupdate', () => { s.t = audio.currentTime; tick(); });
  audio.addEventListener('ended', advance);
  setInterval(() => {
    if (!s.playing || track().src) return;
    const t = s.t + 1;
    if (t < toSeconds(track().dur)) { s.t = t; tick(); } else advance();
  }, 1000);

  const go = (i) => { const n = al().tracks.length; set({ index: (i + n) % n, t: 0 }); };
  on(root, 'click', '[data-action]', (e, el) => {
    const a = el.dataset.action;
    if (a === 'play-pause') set({ playing: !s.playing });
    if (a === 'prev') go(s.index - 1);
    if (a === 'next') go(s.index + 1);
    if (a === 'music-toggle') set({ open: !s.open });
    if (a === 'music-close') set({ open: false });
    if (a === 'album-pick' && el.dataset.album !== s.album) {
      const next = list.find((x) => x.slug === el.dataset.album);
      set({ album: next.slug, index: 0, t: 0, announce: `${s.playing ? 'Sonando' : 'Cargado'}: ${next.tracks[0].title} · ${next.title}` });
    }
    if (a === 'track-pick') { const i = Number(el.dataset.index); set({ index: i, t: 0, playing: true, open: false, announce: `Sonando: ${al().tracks[i].title} · ${al().title}` }); }
  });
  root.addEventListener('keydown', (e) => { if (e.key === 'Escape' && s.open) { set({ open: false }); root.querySelector('[data-action="music-toggle"]')?.focus(); } });

  // Orden desde fuera (la colección de discos): cargar disco y pista y reproducir
  bus.subscribe((g) => {
    if (g.play && g.play !== s.lastCmd) { s.lastCmd = g.play; set({ album: g.play.album, index: g.play.index, t: 0, playing: true, open: false }); }
  });
  render();
}
