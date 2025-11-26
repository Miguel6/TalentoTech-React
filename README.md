# Aura Animal

E-commerce de **pet shop** para descubrir, comparar y comprar productos para mascotas. Incluye catálogo, detalle de producto y carrito con persistencia, además de flujo de sesión básico (Guest/Admin).

---

## ✨ Características
- **Catálogo de productos** (datos desde MockAPI / fuente simulada).
- **Detalle de producto** con información y acción de compra.
- **Carrito de compras**:
    - Agregar productos
    - Quitar productos
    - Actualizar cantidades
- **Autenticación simple**: inicio/cierre de sesión. Ruta protegida para **Admin**.
- **Diseño responsive**

---

## 🧱 Tech Stack
- **React** + React Router
- **Context API** para carrito y auth
- **CSS** para estilos
- **MockAPI** para datos de ejemplo

---


## 🔐 Roles y Acceso
- **Guest**: Navegar, ver productos, usar carrito.
- **Admin**: Acceso a rutas protegidas de administración

---

## ✅ Primer entrega: (MVP) / Pre Entrega
- [x] Listado de productos con datos falsos
- [x] Detalle de producto
- [x] Carrito funcional (agregar/quitar/actualizar)
- [x] Sesión: login/logout (Guest/Admin “mock”)
- [x] Responsive
- [x] Persistencia del carrito en localstorage
- [x] Rutas relativas

---
## ✅ Entrega Final:
- [x] Página **Administración** funcional
- [x] Página de **Login** funcionando con Usuario y Contraseña
- [x] Página de **Administracion de Usuarios** para visualizar usuarios actuales
- [x] Manejo de toaster y errores
- [x] Barra de búsqueda en **Productos** y **Edición de Productos**
- [x] Se agrega React Icons
- [x] Edición de productos
- [x] Eliminar  productos
- [x] Agregar productos


---
## 🗺️ Mejoras Futuras / Entrega Final
- Agregar página de **Registro**.
- Agregar página de **Contacto**.
- Agregar página de **Ofertas**.
- Agregar página de **Administracion de Reportes**.

---

## 🚀 Ejecutar el proyecto
```bash
# 1) Instalar dependencias
npm install

# 2) Iniciar entorno de desarrollo
npm run dev
