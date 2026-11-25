# Migración de bruferri.com: WordPress → GitHub Pages

**Complejidad: baja-media.** La parte técnica son unos pocos registros DNS. El riesgo real está en tres cosas: el **correo del dominio**, **quién tiene acceso** al registrador y las **URLs antiguas** (SEO y enlaces compartidos). Si se cubren, el cambio no corta nada.

## Paso 0 · Inventario (antes de tocar nada)
| Comprobar | Cómo | Por qué |
|---|---|---|
| Registrador del dominio y quién tiene acceso | `whois bruferri.com`; preguntar a Bru | Sin acceso no se puede cambiar el DNS |
| Dónde está alojado el WordPress | Panel del hosting / DNS actual | Saber qué se apaga al final |
| **¿Hay correo @bruferri.com?** | Registros MX actuales (`dig MX bruferri.com`) | Si existe, el MX **no se toca**: solo cambian los registros web |
| Otros registros (TXT, SPF, DKIM, verificaciones) | Exportar la zona DNS completa | Para no romper verificaciones ni el correo |
| URLs indexadas y enlaces | `site:bruferri.com` en Google, sitemap del WP | Para las redirecciones |

## Paso 1 · Copia de seguridad
- WordPress → Herramientas → Exportar (XML) + descarga de `wp-content/uploads` (fotos, portadas).
- Guardar en `explora/wp-backup/` (fuera de git si pesa: `.gitignore`).
- Captura de pantalla de cada página para el caso de estudio.

## Paso 2 · Nueva web en paralelo
- Publicar en GitHub Pages sin dominio (`<usuario>.github.io/bruferri`) o en un subdominio de prueba (`nueva.bruferri.com` con CNAME).
- Bru la revisa ahí. El WordPress sigue intacto en bruferri.com.

## Paso 3 · Redirecciones
GitHub Pages no tiene redirecciones de servidor: se generan **páginas de redirección** estáticas (HTML con `meta refresh` + `rel=canonical`) en las rutas antiguas.
| URL antigua (verificar en el inventario) | Destino |
|---|---|
| `/dates/` o equivalente de agenda | `/#conciertos` |
| Páginas de biografía / proyectos | `/trayectoria/` |
| Contacto | `/#contacto` |
| Entradas con fecha `/2023/…` | `/` o `/trayectoria/` |
La lista exacta sale del inventario; el script de build las genera desde `scripts/redirects.json`.

## Paso 4 · Cambio de DNS (día D, 15 minutos)
1. Bajar el TTL de los registros web a 300 s **24 h antes**.
2. En GitHub: Settings → Pages → Custom domain `bruferri.com` (crea el archivo `CNAME`).
3. En el registrador, **solo los registros web**:
   - `A` @ → 185.199.108.153 · 185.199.109.153 · 185.199.110.153 · 185.199.111.153
   - `AAAA` @ → 2606:50c0:8000::153 · 2606:50c0:8001::153 · 2606:50c0:8002::153 · 2606:50c0:8003::153
   - `CNAME` www → `<usuario>.github.io`
4. **No tocar MX, SPF, DKIM ni otros TXT.**
5. Verificar el dominio en GitHub (registro TXT que pide GitHub) y activar "Enforce HTTPS" cuando el certificado esté listo.
6. Añadir los registros de Resend (SPF/DKIM) para que el formulario envíe desde el dominio.

## Paso 5 · Comprobación
- bruferri.com y www cargan la nueva web por HTTPS.
- Las URLs antiguas redirigen.
- El correo @bruferri.com sigue llegando (si existía).
- El formulario envía.
- Google Search Console: nueva propiedad y sitemap enviado.

## Paso 6 · Vuelta atrás y cierre
- Mantener el hosting de WordPress **2-4 semanas** sin borrar: si algo falla, se restauran los registros DNS anteriores.
- Después, dar de baja el hosting (no el dominio) y apuntarlo en `DECISIONS.md`.

> Valores de IPs de GitHub Pages: comprobarlos en la documentación oficial de GitHub el día del cambio, por si han cambiado.
