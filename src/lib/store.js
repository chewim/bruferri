// Estado mínimo con suscripción: las features se comunican por aquí, nunca entre ellas.
export function createStore(initial) {
  let state = { ...initial };
  const subs = new Set();
  return {
    get: () => state,
    set(patch) {
      state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
      subs.forEach((fn) => fn(state));
    },
    subscribe(fn) { subs.add(fn); return () => subs.delete(fn); }
  };
}

// Bus global de la página (orden de reproducción de la colección al player, etc.)
export const bus = createStore({ play: null, nowPlaying: null, contact: null });
