## Invenflex

### **Descripción del Proyecto**

**Invenflex** es una plataforma web diseñada para optimizar la gestión de inventarios, ventas y administración de bodegas y proveedores. La aplicación proporciona herramientas intuitivas para registrar productos, procesar ventas, administrar bodegas y proveedores, y consultar tablas de inventarios y registros de ventas. Su objetivo es simplificar y automatizar los procesos para aumentar la eficiencia y reducir errores

---

### **Características Principales**

#### **1. Registro de Ventas**

- Permite registrar clientes y asociar ventas con productos seleccionados desde un carrito.
- **Funciones clave:**
  - Registro de datos del cliente: nombre, apellido, cédula, y teléfono.
  - Selección de productos desde un buscador dinámico o mediante la lista de productos disponibles.
  - Cálculo automático del total a pagar, considerando precios, ganancias e impuestos.
  - Opción de especificar métodos de pago y si se requiere instalación.
  - **Ruta Django:** `/addventa` (método `POST`).
  - **Archivo relacionado:** `views.py`, función `addventa`.

#### **2. Registro de Productos**

- Permite añadir productos al inventario con detalles como nombre, marca, modelo, precio unitario, ganancia, IVA, descripción y cantidad.
- **Funciones clave:**
  - Selección de bodegas y proveedores existentes para asociar el producto.
  - **Ruta Django:** `/addproducto` (método `POST`).
  - **Archivo relacionado:** `views.py`, función `addproducto`.

#### **3. Tabla de Inventario de Productos**

- Muestra todos los productos en una tabla con las siguientes columnas:
  - ID, nombre, proveedor, marca, modelo, precio unitario, ganancia, IVA, bodega, cantidad, descripción, y fecha de actualización.
- Soporte para exportar a Excel, PDF o impresión.
- Opciones para editar o eliminar productos directamente desde la tabla.
- **Ruta Django:** `/productos` (método `GET`).
- **Archivo relacionado:** `main.js`, función `getproducts`.

#### **4. Tabla de Ventas**

- Registra y muestra todas las ventas realizadas con los siguientes detalles:
  - ID de venta, cliente, vendedor, pago total, método de pago, productos vendidos, instalación requerida, dirección, y fecha de la venta.
- Agrupa productos vendidos por ID de venta para simplificar la visualización.
- **Ruta Django:** `/historyventa` (método `GET`).
- **Archivo relacionado:** `main.js`, función `gethventas`.

#### **5. Administración de Bodegas y Proveedores**

- Gestión dinámica de bodegas:
  - Registro, edición y eliminación de bodegas con atributos como nombre y capacidad.
  - **Ruta Django:** `/addbodega` (método `POST`, `PUT`, `DELETE`).
- Gestión de proveedores:
  - Registro, edición y eliminación de proveedores con atributos como nombre, apellido, cédula, y teléfono.
  - **Ruta Django:** `/addproveedor` (método `POST`, `PUT`, `DELETE`).
- **Archivos relacionados:**
  - `views.py`, funciones `addbodega`, `editar_bodega`, `addproveedor`, y `editar_proveedor`.
  - `main.js`, funciones `registrarBodega`, `registrarprov`, y `actualizarlistpb`.

---

### **Arquitectura**

#### **Backend (Django):**

- **Funciones principales:** Implementación de rutas para gestionar inventarios, ventas, bodegas y proveedores.
- **Modelos:** `producto`, `bodega`, `proveedor`, `detalleproveedor`, entre otros.

#### **Frontend (HTML y JavaScript):**

- **HTML:** Organización de secciones para ventas, inventario, administración y registro.
- **JavaScript:** Funciones dinámicas para manejar eventos de usuario como editar, eliminar y registrar datos. Incluye la integración con `fetch` para consumir las API.

---

### **Instrucciones de Uso**

1. **Inicio de Sesión:**

   - Accede al sistema con tus credenciales para visualizar el dashboard principal.
   - Credenciales de superusuario: usuario: `admin` / Contraseña: `dante`.

2. **Registro de Ventas:**

   - Completa los datos del cliente.
   - Selecciona productos desde el buscador.
   - Especifica el método de pago y otros detalles antes de confirmar.

3. **Gestión de Productos:**

   - Usa el formulario de "Nuevo Producto" para añadir productos al inventario.
   - Desde la tabla de inventarios, edita o elimina productos según sea necesario.

4. **Administración de Bodegas y Proveedores:**

   - Accede a la sección de "Administración" para registrar nuevas bodegas o proveedores.
   - Edita o elimina registros desde las tablas correspondientes.

5. **Consultas:**
   - Revisa el inventario y las ventas desde las tablas dinámicas con soporte para exportación e impresión.

---

### **Notas Técnicas**

- **Dependencias:**

  - Django (backend).
  - DataTables para tablas dinámicas.
  - Bootstrap para estilos responsivos.

- **Requisitos del sistema:**

  - Python 3.8 o superior.
  - Entorno virtual configurado con dependencias de Django.
  - Navegador compatible con ES6+ para soporte de JavaScript moderno.

- **Base de datos:**

  - Configurada para almacenar clientes, productos, bodegas, proveedores y registros de ventas..

  **Para prueba**
