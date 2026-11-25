# Spec · Opiniones del sector (Testimonials)

Estado: **construido** (2026-11-25, David) · en la web, sección tras la portada
Componente: `Testimonials` (`src/components/testimonials.js` + CSS) · Feature: `site/features/testimonials` · Datos: `press[]` en `src/data/profile.json`

## 1. Objetivo
Que un programador vea, nada más pasar la portada, que alguien reconocido del sector avala a Bru (prueba social con autoridad) sin cargar la portada.

## 2. Reglas
| # | Regla |
|---|---|
| R1 | Solo opiniones **reales**, con nombre, en el **idioma original**. Nunca se editan las palabras: se elige un fragmento literal. |
| R2 | Una opinión cada vez, en la misma caja. La caja mide lo que la más larga: el contenido de debajo no salta. |
| R3 | Avanza sola. Tiempo por opinión = **2 s + 0,25 s por palabra** (6 palabras ≈ 3,5 s; 10 ≈ 4,5 s). Transición de 0,25 s. |
| R4 | La barra de la opinión activa se llena en ese tiempo; al llenarse, pasa a la siguiente y vuelve a la primera al final. |
| R5 | Tocar una barra salta a esa opinión. Cada barra es un botón de 32 px de alto. |
| R6 | Se pausa: ratón encima, foco dentro, botón de pausa, sección fuera de la vista. Se reanuda al quitar la causa (salvo el botón, que manda). |
| R7 | Con "reducir movimiento": no avanza sola, sin animación, se navega con las barras; el botón de pausa no aparece. |
| R8 | Avatar: foto si hay `photo` (cedida por la persona); si no, iniciales. **No se descargan fotos de redes.** |
| R9 | Con una sola opinión no hay barras ni pausa. Más de 4 opiniones: no (la rotación deja de leerse). |

## 3. Datos
```json
{ "quote": "Una auténtica fuerza de la naturaleza.", "author": "Adriano Galante", "role": null, "photo": null, "lang": "es" }
```
`role` y `photo` se muestran en cuanto existan (BACKLOG: pedirlos con permiso).

## 4. Accesibilidad
`role="region"` + `aria-roledescription="carrusel"`; cada opinión es un grupo "n de N: autor"; las ocultas llevan `aria-hidden`. Pausa obligatoria (WCAG 2.2.2) y sin anuncios automáticos al rotar.

## 5. Criterios de aceptación
- [ ] Las dos opiniones rotan solas con los tiempos de R3 y la caja no cambia de alto.
- [ ] Ratón encima o foco dentro → se para; al salir, sigue.
- [ ] Con "reducir movimiento" no rota.
- [ ] Teclado: Tab llega a las barras y a la pausa; Enter salta / pausa.
