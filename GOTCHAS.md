# GOTCHAS — Bru Ferri

Errores ya vistos y cómo evitarlos. Añade uno cada vez que algo falle dos veces.

- **Prototipo → producción.** El código de `explora/` usa estilos inline y datos fijos. No se copia tal cual: se migra componente a componente pasando por tokens y el check.
- **`position: sticky` en el player.** Funciona como último hijo de `.bf-page` (contenedor de toda la página). Si se mueve dentro de otra sección, deja de quedarse fijo.
- **Container queries (solo en el lienzo).** En el repo se usan media queries; al copiar CSS del lienzo, cambia `@container` por `@media` y `.bf-root` deja de existir.
- **Variables del lienzo.** El lienzo usa `--bg`, `--space-2`…; en el repo todo lleva prefijo `--bf-`.
- **Foto clara bajo texto claro.** La portada es gris claro; la TopBar necesita el degradado superior (`scrim-top`) y el titular el inferior. Si se cambia la foto, revisar el contraste.
- **`file://` y módulos ES.** Abriendo el HTML con doble clic, `type="module"` falla por CORS. Scripts clásicos o servidor local (`npx serve`).
- **iframe de la comparativa.** `comparativa.html` carga `index.html` del mismo directorio: no mover uno sin el otro.
- **Autoplay.** Los navegadores lo bloquean y además rompe la decisión de marca: el player arranca siempre en pausa.
- **Registro público de Supabase.** Desactivar "Allow new users to sign up" o cualquiera podría crearse una cuenta (no escribiría por RLS, pero ensucia y abre superficie). Las cuentas las crea David desde el panel.
- **Anon key de Supabase.** Es pública por diseño; la seguridad está en RLS. Probar siempre que una escritura sin sesión de admin falla.
- **`<base href>`.** Todas las rutas son relativas a la base (`/` o `/bruferri/`); no empieces rutas con `/` o se rompen en chewim.github.io.
