// Ruta base de la web: "/" con dominio propio, "/bruferri/" en chewim.github.io. La fija el build (BF_BASE).
export const BASE = (typeof process !== 'undefined' && process.env && process.env.BF_BASE) || '/';

// Versión del build para invalidar la caché (assets/bf.css?v=…)
export const VERSION = (typeof process !== 'undefined' && process.env && process.env.BF_VERSION) || 'dev';
