Fase: 2 · Sistema (desde 2026-11-25)
Escala: web de cliente con backoffice → fases 0 (breve), 1, 2, 3. Sin modo demo ni fase 4 de producto.
Deuda consciente:
- 2026-11-25 · el formulario de contacto abre el correo (mailto) hasta tener la Edge Function `contact` (fase 3.2)
- 2026-11-25 · el player simula el avance: no hay audio todavía (BACKLOG)
- 2026-11-25 · el vídeo de fondo de "Quién es Bru" se incrusta desde YouTube hasta tener el archivo (BACKLOG)
- 2026-11-25 · "Trayectoria" enlazada pero sin construir (fase 3.1); hoy cae en la 404

# Bru Ferri — web y backoffice

Web oficial de Bru Ferri (pianista, compositor, cantante e improvisador, Barcelona 1995), que sustituye al WordPress actual de bruferri.com, y un backoffice para que el artista edite su contenido sin tocar código.

## Criterio (fase 0 · provisional, validar con Bru)

| | |
|---|---|
| **Problema** | La web actual es una plantilla WordPress: el vídeo de YouTube tapa la identidad, la música queda enterrada en embeds de Bandcamp, la agenda es un listado de texto y el contacto es un enlace más del menú. |
| **Para quién** | 1) Programadores, teatros y festivales que buscan contratar o informarse. 2) Público que quiere escuchar y ver fechas. 3) Bru, que necesita actualizar agenda y contenidos solo. |
| **Hipótesis más arriesgada** | Si la música está a un toque y la agenda y el contacto son evidentes, aumentan los contactos de programación y los clics a entradas. |
| **Métricas** | Mensajes enviados desde Contacta · clics en "Info y entradas". (Secundaria: reproducciones del player.) |
| **Modelo** | Proyecto de cliente. Para David: caso de estudio de portfolio (antes/después + métricas). |
| **Qué NO es el MVP** | Tienda, blog, newsletter, área de prensa, multi-idioma completo, streaming propio de audio largo. |

## Dos flujos

1. **Web pública** (`/`): portada con foto y player en pausa, quién es Bru, agenda, contacto y trayectoria.
2. **Backoffice** (`/admin/`): solo lo que cambia a menudo. Bru inicia sesión y gestiona los conciertos y las imágenes (portada y portadas de discos). El resto lo actualiza David en el repo.

## Dónde está cada cosa

| Archivo | Para qué |
|---|---|
| `CLAUDE.md` | Instrucciones cortas para el agente. Leer primero. |
| `SPEC.md` | Alcance, modelo de datos, criterios de aceptación de los dos flujos. |
| `docs/ARQUITECTURA.md` | Estructura de carpetas, capas, reglas de imports y build. |
| `docs/FLUJOS.md` | Flujos de la web y del backoffice, estados e inventario de componentes. |
| `DESIGN_SYSTEM.md` | Cuándo usar cada token y componente (no repite valores). |
| `ROADMAP.md` | Plan por fases con puertas de salida. |
| `docs/MIGRACION.md` | Ruta de WordPress → GitHub Pages con el dominio. |
| `DECISIONS.md` | Fecha · decisión · descartes · por qué. |
| `BACKLOG.md` | Pendiente y bloqueado. |
| `GOTCHAS.md` | Errores ya vistos y cómo evitarlos. |
| `SKILLS.md` | Recetas repetibles (añadir componente, publicar…). |
| `explora/` | Prototipos de la fase 1. Fuera de git y del build. **No pasan a producción.** |
| `src/` · `site/` · `scripts/` | Código: tokens, componentes, secciones, features, build y check (ver `docs/ARQUITECTURA.md`). |

## Referencias vivas

- Sistema de diseño (fuente): https://claude.ai/artifact/VmSpdWrWV2pe8xhnWv5V8o
- Lienzo de exploración (Home, móvil, trayectoria, variante editorial, antes/después): https://claude.ai/artifact/KKhGXQqFRvcnbFNzkZXVjD
- Web nueva (pruebas): https://chewim.github.io/bruferri/
- Web actual: https://bruferri.com · Música: https://bruferri.bandcamp.com
- Booking y management: Maria Thorson · info@insectotropics.com
