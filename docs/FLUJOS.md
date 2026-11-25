# FLUJOS — Bru Ferri

Alcance del backoffice (decidido 2026-11-20): **solo lo que cambia a menudo** → conciertos e imágenes (portada y discos). Bio, trayectoria, pistas y textos los actualiza David en el repo (`src/data/*.json`).

Regla común: toda pantalla tiene salida y todo estado (vacío, cargando, error) tiene una acción.

---

## A · Web pública (ya explorada, aquí queda fijada)

**A1 · Escuchar**
Entrar → player abajo en pausa con la pista por defecto → Play → (opcional) abrir lista → elegir pista → cerrar lista.

**A2 · Conocer a Bru**
Portada → "Conoce a Bru" (scroll) → resumen → "Ver trayectoria" → Trayectoria → salidas: Inicio · Ver conciertos · Contacta.

**A3 · Ver agenda**
Inicio → Próximos conciertos → filtrar por proyecto (opcional) → "Ver todas las fechas" → concierto:
- con `ticket_url` → "Entradas" abre la taquilla en otra pestaña;
- sin `ticket_url` → "Info" abre Contacto con el asunto precargado.
Sin conciertos próximos → mensaje "Nuevas fechas en breve" + Contacta (nunca una lista vacía).

**A4 · Contactar**
Contacta (TopBar, footer o concierto) → hoja: motivo · nombre · email · mensaje → Enviar →
- correcto → "Mensaje enviado" → Volver a la web · Ver conciertos;
- error → mensaje en la hoja + Reintentar + email directo de booking como alternativa.
Cerrar: X, Escape o clic fuera. El email llega a booking (Resend).

---

## B · Backoffice (`/admin/`)

**B0 · Entrar (email + contraseña)**
Footer de la web → icono discreto de ajustes (sin texto, `aria-label="Acceso del artista"`, contraste bajo pero ≥ 3:1) → `/admin/` → email + contraseña → Entrar → Conciertos.
- Datos incorrectos → "Email o contraseña incorrectos" (mismo mensaje en ambos casos, no revela si el email existe).
- Demasiados intentos → "Espera unos minutos e inténtalo de nuevo" (límite de Supabase Auth).
- "¿Has olvidado la contraseña?" → email de restablecimiento → nueva contraseña → Conciertos. Es el único uso del correo.
- La sesión se queda abierta en ese dispositivo hasta "Salir", así que Bru casi nunca vuelve a escribir la contraseña.
- `/admin/` lleva `noindex` y no aparece en el sitemap; el icono no da pistas a buscadores ni a visitantes.
- Ya dentro, "Cambiar contraseña" en el menú.

**Navegación:** Conciertos (por defecto) · Imágenes · Ver web ↗ · Cuenta (cambiar contraseña, salir). En móvil, barra inferior.

**B1 · Lista de conciertos**
Pestañas Próximos / Pasados (por fecha, automático) → filas: fecha · espectáculo · ciudad · estado (Publicado / Oculto) → "+ Nuevo concierto".
- Vacío → "No hay conciertos próximos" + Nuevo concierto.
- Pasados: solo lectura + Duplicar (para repetir una obra); no se borran (histórico).

**B2 · Crear concierto**
Nuevo → formulario:
| Campo | Regla |
|---|---|
| Fecha | Obligatoria, o marcar "Fecha por confirmar" → mes y año |
| Hasta (opcional) | Para temporadas: "Del 5 al 22 nov" |
| Espectáculo | Lista de proyectos + "Otro" (texto) |
| Sala o lugar · Ciudad · País | Ciudad obligatoria; país por defecto España |
| Enlace de entradas | Opcional; se valida que sea una URL |
| Visible en la web | Interruptor, activado por defecto |
→ Guardar → vuelve a la lista con aviso "Guardado · la web se actualiza en unos minutos" + "Ver en la web".
- Error de validación → mensaje junto al campo, no se pierde lo escrito.
- Sin conexión → "No se ha podido guardar" + Reintentar (lo escrito se conserva).

**B3 · Editar · Duplicar · Ocultar · Eliminar**
Fila → formulario relleno → Guardar.
- **Duplicar** → formulario igual sin fecha (gira: misma obra, otra ciudad).
- **Ocultar** → interruptor; desaparece de la web sin borrarse.
- **Eliminar** → confirmación "¿Eliminar *El Rey de la Farándula · Ponferrada, 4 dic*? No se puede deshacer." → Eliminar / Cancelar.
- Salir con cambios sin guardar → "Tienes cambios sin guardar" → Guardar / Descartar / Seguir editando.

**B4 · Imágenes → Portada**
Imágenes → Portada (vista previa actual en escritorio y móvil) → Cambiar foto → elegir archivo (JPG/PNG/WebP, máx. 10 MB) →
1. **Encuadre:** tocar el punto importante (la cara) → preview escritorio + móvil con el texto encima.
2. **Texto alternativo** (obligatorio) y **crédito de la foto** (opcional).
3. Guardar → aviso "Portada actualizada · la web se actualiza en unos minutos".
- Archivo grande o formato no válido → mensaje + Elegir otro.
- Subida: barra de progreso; fallo → Reintentar.
- Se guarda la foto anterior: "Restaurar la anterior" durante 30 días.

**B5 · Imágenes → Portadas de discos**
Imágenes → Discos (cuadrícula de discos) → disco → Cambiar portada → elegir archivo → recorte cuadrado → texto alternativo (por defecto "Portada de *título*") → Guardar.

**B6 · Actualizar la web**
Guardar en B2–B5 → la web se regenera sola (sin botón "Publicar") → indicador en la cabecera: "Actualizando web…" → "Web actualizada · ver" o "Error al actualizar · reintentar".
Errores repetidos → aviso a David por email.

---

## Inventario derivado (entrada de la fase 2)

**Pantallas:** Web: Inicio · Trayectoria · Contacto (hoja) · Legal · 404. Admin: Entrar · Restablecer contraseña · Conciertos (lista) · Concierto (form) · Imágenes · Portada · Disco · Cuenta.

**Componentes que ya existen:** Button, IconButton, Chip, TopBar, PlayerBar, ConcertRow, Card, ContactSheet, Input.

**Componentes nuevos (pasan por el sistema):**
| Componente | Para |
|---|---|
| Tabs | Próximos / Pasados |
| AdminRow | Fila de lista con estado y acciones |
| Badge | Publicado / Oculto |
| Toggle | Visible en la web |
| Select | Espectáculo |
| DateField (+ "por confirmar") | Fecha |
| ImageUploader | Subida con progreso y error |
| FocalPicker + DevicePreview | Encuadre de portada en escritorio/móvil |
| Toast | Guardado, actualizado, errores |
| ConfirmDialog | Eliminar, cambios sin guardar |
| EmptyState | Listas vacías (web y admin) |
| StatusIndicator | Estado de actualización de la web |
| AdminNav | Barra lateral / inferior en móvil |
| PasswordField | Contraseña con mostrar/ocultar |
| FooterAccess | Icono discreto de acceso del artista en el footer |
