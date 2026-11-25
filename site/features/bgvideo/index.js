import { on } from '../../../src/lib/dom.js';
import { Icon } from '../../../src/components/icon.js';

// Vídeo de fondo: se carga al acercarse a la vista, nunca con "reducir movimiento"; botón de pausa.
// Provisional: YouTube (iframe sin cookies). Con archivo propio (<video>), el mismo botón lo controla.
export function initBgVideo(root) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const btn = root.querySelector('[data-action="bgvideo-toggle"]');
  const video = root.querySelector('video');
  const id = root.dataset.youtube;
  let frame = null;
  let loaded = false;
  let playing = false;
  let userPaused = false;

  function command(play) {
    if (video) { play ? video.play().catch(() => {}) : video.pause(); }
    else frame?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: play ? 'playVideo' : 'pauseVideo', args: [] }), '*');
    playing = play;
    btn.setAttribute('aria-pressed', String(!play));
    btn.setAttribute('aria-label', btn.getAttribute('aria-label').replace(/^(Pausar|Reanudar)/, play ? 'Pausar' : 'Reanudar'));
    btn.innerHTML = String(Icon(play ? 'pause' : 'play', 's'));
  }
  function load() {
    loaded = true;
    if (id) {
      frame = document.createElement('iframe');
      frame.className = 'bf-bgvideo__frame';
      frame.title = 'Vídeo de fondo';
      frame.tabIndex = -1;
      frame.setAttribute('aria-hidden', 'true');
      frame.allow = 'autoplay; encrypted-media';
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&disablekb=1&playsinline=1&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1`;
      // se muestra cuando ya ha arrancado, para no enseñar la carga de YouTube
      frame.addEventListener('load', () => setTimeout(() => { frame.dataset.state = 'ready'; }, 1200));
      root.querySelector('.bf-bgvideo__shade').before(frame);
    }
    btn.hidden = false;
    command(true);
  }

  // Solo se carga (y gasta datos) cuando la sección está cerca; fuera de la vista se pausa
  new IntersectionObserver(([e]) => {
    if (e.isIntersecting) { if (!loaded) load(); else if (!userPaused && !playing) command(true); }
    else if (playing) command(false);
  }, { rootMargin: '200px' }).observe(root);

  on(root, 'click', '[data-action="bgvideo-toggle"]', () => { userPaused = playing; command(!playing); });
}
