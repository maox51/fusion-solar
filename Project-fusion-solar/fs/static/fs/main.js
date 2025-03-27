let dataTable;
let dataTableIsInitialized = false;
let datos;

let dataTableOptions = {
  scrollX: true,
  paging: false,
  scrollCollapse: true,
  scrollY: '60vh',
  dom: 'Bfrtilp',
  buttons: [
    {
      extend: 'colvisRestore',
      text: '<i class="fa fa-undo"></i>',
      titleAttr: 'Restaurar columnas',
      className: 'btn btn-dark',

    },
    {
      extend: 'colvis',
      className: 'btn btn-dark',
    },
    {
      extend: 'excelHtml5',
      title: 'Fusión Solar',
      text: '<i class="fas fa-file-excel"></i> ',
      autoFilter: true,
      titleAttr: 'Exportar a Excel',
      className: 'btn btn-success',
      exportOptions: {
        columns: ':visible'
    }
    },
    {
      extend: 'pdfHtml5',
      messageTop: 'PDF created by Website Fusión Solar.',
      title: 'Fusión Solar',
      text: '<i class="fas fa-file-pdf"></i> ',
      autoFilter: true,
      titleAttr: 'Exportar a PDF',
      className: 'btn btn-danger',
      orientation: 'landscape',
      download: 'open',
      exportOptions: {
        columns: ':visible'
    },
    },
    {
      extend: 'print',
      title: 'Fusión Solarx',
      text: '<i class="fa fa-print"></i> ',
      titleAttr: 'Imprimir',
      className: 'btn btn-warning',
      messageTop:
        'This print was produced using Website Fusión Solar.',
      exportOptions: {
        columns: ':visible'
      }
    },
  ],
  columnDefs: [
    { className: 'centered', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8]},
    { orderable: false, targets: [0]},
    { width: '20%', targets: [0, 1, 2, 3, 4, 5, 6, 7, 8]}
  ],
  pageLength: 4,
  destroy: true,
  language: {
    processing: 'Procesando...',
    lengthMenu: 'Mostrar _MENU_ registros',
    zeroRecords: 'No se encontraron resultados',
    emptyTable: 'Ningún dato disponible en esta tabla',
    infoEmpty: 'Mostrando registros del 0 al 0 de un total de 0 registros',
    infoFiltered: '(filtrado de un total de _MAX_ registros)',
    search: 'Buscar:',
    infoThousands: ',',
    loadingRecords: 'Cargando...',
    paginate: {
      first: 'Primero',
      last: 'Último',
      next: 'Siguiente',
      previous: 'Anterior',
    },
    aria: {
      sortAscending: ': Activar para ordenar la columna de manera ascendente',
      sortDescending: ': Activar para ordenar la columna de manera descendente',
    },
    buttons: {
      copy: 'Copiar',
      colvis: 'Visibilidad',
      collection: 'Colección',
      colvisRestore: 'Restaurar visibilidad',
      copyKeys:
        'Presione ctrl o u2318 + C para copiar los datos de la tabla al portapapeles del sistema. <br /> <br /> Para cancelar, haga clic en este mensaje o presione escape.',
      copySuccess: {
        1: 'Copiada 1 fila al portapapeles',
        _: 'Copiadas %ds fila al portapapeles',
      },
      copyTitle: 'Copiar al portapapeles',
      csv: 'CSV',
      excel: 'Excel',
      pageLength: {
        '-1': 'Mostrar todas las filas',
        _: 'Mostrar %d filas',
      },
      pdf: 'PDF',
      print: 'Imprimir',
      renameState: 'Cambiar nombre',
      updateState: 'Actualizar',
      createState: 'Crear Estado',
      removeAllStates: 'Remover Estados',
      removeState: 'Remover',
      savedStates: 'Estados Guardados',
      stateRestore: 'Estado %d',
    },
    autoFill: {
      cancel: 'Cancelar',
      fill: 'Rellene todas las celdas con <i>%d</i>',
      fillHorizontal: 'Rellenar celdas horizontalmente',
      fillVertical: 'Rellenar celdas verticalmentemente',
    },
    decimal: ',',
    searchBuilder: {
      add: 'Añadir condición',
      button: {
        0: 'Constructor de búsqueda',
        _: 'Constructor de búsqueda (%d)',
      },
      clearAll: 'Borrar todo',
      condition: 'Condición',
      conditions: {
        date: {
          after: 'Despues',
          before: 'Antes',
          between: 'Entre',
          empty: 'Vacío',
          equals: 'Igual a',
          notBetween: 'No entre',
          notEmpty: 'No Vacio',
          not: 'Diferente de',
        },
        number: {
          between: 'Entre',
          empty: 'Vacio',
          equals: 'Igual a',
          gt: 'Mayor a',
          gte: 'Mayor o igual a',
          lt: 'Menor que',
          lte: 'Menor o igual que',
          notBetween: 'No entre',
          notEmpty: 'No vacío',
          not: 'Diferente de',
        },
        string: {
          contains: 'Contiene',
          empty: 'Vacío',
          endsWith: 'Termina en',
          equals: 'Igual a',
          notEmpty: 'No Vacio',
          startsWith: 'Empieza con',
          not: 'Diferente de',
          notContains: 'No Contiene',
          notStartsWith: 'No empieza con',
          notEndsWith: 'No termina con',
        },
        array: {
          not: 'Diferente de',
          equals: 'Igual',
          empty: 'Vacío',
          contains: 'Contiene',
          notEmpty: 'No Vacío',
          without: 'Sin',
        },
      },
      data: 'Data',
      deleteTitle: 'Eliminar regla de filtrado',
      leftTitle: 'Criterios anulados',
      logicAnd: 'Y',
      logicOr: 'O',
      rightTitle: 'Criterios de sangría',
      title: {
        0: 'Constructor de búsqueda',
        _: 'Constructor de búsqueda (%d)',
      },
      value: 'Valor',
    },
    searchPanes: {
      clearMessage: 'Borrar todo',
      collapse: {
        0: 'Paneles de búsqueda',
        _: 'Paneles de búsqueda (%d)',
      },
      count: '{total}',
      countFiltered: '{shown} ({total})',
      emptyPanes: 'Sin paneles de búsqueda',
      loadMessage: 'Cargando paneles de búsqueda',
      title: 'Filtros Activos - %d',
      showMessage: 'Mostrar Todo',
      collapseMessage: 'Colapsar Todo',
    },
    select: {
      cells: {
        1: '1 celda seleccionada',
        _: '%d celdas seleccionadas',
      },
      columns: {
        1: '1 columna seleccionada',
        _: '%d columnas seleccionadas',
      },
      rows: {
        1: '1 fila seleccionada',
        _: '%d filas seleccionadas',
      },
    },
    thousands: '.',
    datetime: {
      previous: 'Anterior',
      next: 'Proximo',
      hours: 'Horas',
      minutes: 'Minutos',
      seconds: 'Segundos',
      unknown: '-',
      amPm: ['AM', 'PM'],
      months: {
        0: 'Enero',
        1: 'Febrero',
        10: 'Noviembre',
        11: 'Diciembre',
        2: 'Marzo',
        3: 'Abril',
        4: 'Mayo',
        5: 'Junio',
        6: 'Julio',
        7: 'Agosto',
        8: 'Septiembre',
        9: 'Octubre',
      },
      weekdays: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
    },
    editor: {
      close: 'Cerrar',
      create: {
        button: 'Nuevo',
        title: 'Crear Nuevo Registro',
        submit: 'Crear',
      },
      edit: {
        button: 'Editar',
        title: 'Editar Registro',
        submit: 'Actualizar',
      },
      remove: {
        button: 'Eliminar',
        title: 'Eliminar Registro',
        submit: 'Eliminar',
        confirm: {
          _: '¿Está seguro que desea eliminar %d filas?',
          1: '¿Está seguro que desea eliminar 1 fila?',
        },
      },
      error: {
        system:
          'Ha ocurrido un error en el sistema (<a target="\\" rel="\\ nofollow" href="\\">Más información&lt;\\/a&gt;).</a>',
      },
      multi: {
        title: 'Múltiples Valores',
        info: 'Los elementos seleccionados contienen diferentes valores para este registro. Para editar y establecer todos los elementos de este registro con el mismo valor, hacer click o tap aquí, de lo contrario conservarán sus valores individuales.',
        restore: 'Deshacer Cambios',
        noMulti:
          'Este registro puede ser editado individualmente, pero no como parte de un grupo.',
      },
    },
    info: 'Mostrando _START_ a _END_ de _TOTAL_ registros',
    stateRestore: {
      creationModal: {
        button: 'Crear',
        name: 'Nombre:',
        order: 'Clasificación',
        paging: 'Paginación',
        search: 'Busqueda',
        select: 'Seleccionar',
        columns: {
          search: 'Búsqueda de Columna',
          visible: 'Visibilidad de Columna',
        },
        title: 'Crear Nuevo Estado',
        toggleLabel: 'Incluir:',
      },
      emptyError: 'El nombre no puede estar vacio',
      removeConfirm: '¿Seguro que quiere eliminar este %s?',
      removeError: 'Error al eliminar el registro',
      removeJoiner: 'y',
      removeSubmit: 'Eliminar',
      renameButton: 'Cambiar Nombre',
      renameLabel: 'Nuevo nombre para %s',
      duplicateError: 'Ya existe un Estado con este nombre.',
      emptyStates: 'No hay Estados guardados',
      removeTitle: 'Remover Estado',
      renameTitle: 'Cambiar Nombre Estado',
    },
  },
};

const getlistpb = async () =>{
  try{
    const response = await fetch(`/getprovandbodega`);
    const data = await response.json();
    console.log(data);
    return data;
  }catch (error) {
    console.log(error);
  }
};

//obtiene las ventas de la api
const gethventas = async () => {
  try {
    const response = await fetch('/historyventa');
    const data = await response.json();

    console.log(data);

    document.getElementById('table_sells').innerHTML = data.map(venta => {
      const productosTexto = venta.productos
        .map(producto => `${producto.nombre} (<span class="badge text-bg-warning">${producto.cantidad}</span>)`)
        .join(', ');

      return `
        <tr>
          <td>${venta.venta_id}</td>
          <td>${venta.cliente}</td>
          <td>${venta.empleado}</td>
          <td>${venta.totalapagar.toFixed(2)}</td>
          <td>${venta.metododepago}</td>
          <td>${productosTexto}</td>
          ${venta.instalacion ? 
            `<td><i class="fa-solid fa-square-check"></i> SI</td>`:
            `<td><i class="fa-solid fa-square-xmark"></i> No</td>`
          }
          <td>${venta.direccion}</td>
          <td>${venta.fecha}</td>
        </tr>
      `;
    }).join('');
  } catch (error) {
    console.error('Error al obtener las ventas:', error);
  }
};

const getproducts = async () => {
  try {
    const response = await fetch('/productos');
    const data = await response.json();
    console.log(data);
    document.getElementById('table_products').innerHTML = '';
    // Renderizar los productos en la tabla
    document.getElementById('table_products').innerHTML = data.map(product => `
      <tr>
        <td>
          <button class="btn btn-dark" id="eliminarp-${product.id}"><i class="fa-solid fa-trash-can"></i></button>
          <button class="btn btn-dark" id="editarp-${product.id}"><i class="fa-solid fa-pen-to-square"></i></button>
        </td>
        <td>${product.id}</td>
        <td>${product.nombre}</td>
        <td>${product.proveedor}</td>
        <td>${product.marca}</td>
        <td>${product.modelo}</td>
        <td>${product.preciounitario}</td>
        <td>${product.ganancia}</td>
        <td>${product.iva}</td>
        <td>${product.codigobodega}</td>
        <td>${product.cantidad}</td>
        <td>${product.descripcion}</td>
        <td>${product.fechadeactualizacion}</td>
      </tr>
    `).join('');

    // Renderizar los productos en la lista de búsqueda
    document.getElementById('searhp').innerHTML = data.map(product => `
      <option id="optionid-${product.id}" value="${product.nombre}">
        Precio: C$ ${product.preciounitario + product.ganancia + product.iva}, Stock: ${product.cantidad}
      </option>
    `).join('');

    // Agregar eventos a los botones de eliminar y editar
    data.forEach(product => {
      // Botón de eliminar
      const deleteButton = document.getElementById(`eliminarp-${product.id}`);
      deleteButton.removeEventListener('click', () => eliminarprod(product.id));
      deleteButton.addEventListener('click', () => eliminarprod(product.id));

      // Botón de editar
      const editButton = document.getElementById(`editarp-${product.id}`);
      editButton.removeEventListener('click', () => editarProducto(product));
      editButton.addEventListener('click', () => editarProducto(product));
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

async function editarProducto(product){
  // Rellenar los campos del formulario con los datos del producto
  document.getElementById('nombrepro').value = product.nombre;
  document.getElementById('preciouni').value = product.preciounitario;
  document.getElementById('gananciapro').value = product.ganancia;
  document.getElementById('marcapro').value = product.marca;
  document.getElementById('modelopro').value = product.modelo;
  document.getElementById('descripcionpro').value = product.descripcion;
  document.getElementById('cantidadpro').value = product.cantidad;

  const recientesSection = document.getElementById('Recientes');
  const registrarSection = document.getElementById('Registrar');
  const registrarpSection = document.getElementById('registrarp'); 
  const administrarSection = document.getElementById('Administrar');
  const inventarioSection = document.getElementById('tabla');
  const ventasSection = document.getElementById('tablav');

  const data = await getlistpb();
  const selectbodega = document.getElementById('selectbodega');
  const selectproveedor = document.getElementById('selectproveedor');
  selectbodega.innerHTML = '';
  selectproveedor.innerHTML = '';
  data.bodegas.forEach(bodega => {
    const option = document.createElement('option');
    option.value = bodega.id;
    option.text = bodega.nombre;
    selectbodega.appendChild(option);
  });
  data.proveedores.forEach(proveedor => {
    const option = document.createElement('option');
    option.value = proveedor.id;
    option.text = proveedor.nombre + ' ' + proveedor.apellido;
    selectproveedor.appendChild(option);
  });

  const bodeg = document.getElementById('selectbodega');
  const prove = document.getElementById('selectproveedor');
  
  for (let option of bodeg.options) {
    if (option.value === product.codigobodega) {
      option.selected = true;
      break;
    }
  }

  for (let option of prove.options) {
    if (option.value === product.proveedor) {
      option.selected = true;
      break;
    }
  }


  recientesSection.style.display = 'none';
  registrarSection.style.display = 'none';
  administrarSection.style.display = 'none';
  ventasSection.style.display = 'none';
  inventarioSection.style.display = 'none';
  registrarpSection.style.display = 'block';

  document.getElementById('tituloproducto').textContent = 'Editar Producto';
  document.getElementById('confirmarproducto').classList.add('hidden');
  document.getElementById('btneditpro').classList.remove('hidden');
  console.log(product);

  const btneditpro = document.getElementById('confircambiopro')
  const btncancelpro = document.getElementById('cancelpro')

  btneditpro.removeEventListener('click', (event) =>{edito(event);});
  btneditpro.addEventListener('click', (event) =>{edito(event);});

  async function edito(event) {
    event.preventDefault(); // Evitar comportamiento predeterminado
    console.log('funciona editar producto');

    const nombre =document.getElementById('nombrepro').value;
    const preciouni = document.getElementById('preciouni').value;
    const gananciapro = document.getElementById('gananciapro').value;
    const marcapro = document.getElementById('marcapro').value;
    const modelopro = document.getElementById('modelopro').value;
    const descripcionpro = document.getElementById('descripcionpro').value;
    const cantidadpro = document.getElementById('cantidadpro').value;
    const selectbodega = document.getElementById('selectbodega').value;
    const selectproveedor = document.getElementById('selectproveedor').value;

    try{
      const response = await fetch(`/editproductos/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre,
          preciounitario: preciouni,
          ganancia: gananciapro,
          iva: preciouni * 0.15,
          marca: marcapro,
          modelo: modelopro,
          descripcion: descripcionpro,
          cantidad: cantidadpro,
          codigobodega: parseInt(selectbodega),
          proveedor: parseInt(selectproveedor),
        }),
      });

      if (response.ok) {
        console.log('Producto actualizado exitosamente');
        cleaninputs();
        window.location.href = '/salvavidas/3';
      }
    }catch(error){
      console.log(error);
    }

  };


  btncancelpro.removeEventListener('click', function (event) {cancel(event);});
  btncancelpro.addEventListener('click', function (event) {cancel(event);});
  
  function cancel(event) {
    event.preventDefault(); // Evitar comportamiento predeterminado
    console.log('funciona cancelar producto');
    //redireccion a tabla inventario
    redireccion();
    // Limpiar los campos del formulario
    cleaninputs();

  }

  function redireccion(){
    inventarioSection.style.display = 'block';
    registrarpSection.style.display = 'none';
    document.getElementById('confirmarproducto').classList.remove('hidden');
    document.getElementById('btneditpro').classList.add('hidden');
    document.getElementById('tituloproducto').textContent = 'Añadir Producto';
  }
  function cleaninputs() {
    document.getElementById('nombrepro').value = '';
    document.getElementById('preciouni').value = '';
    document.getElementById('gananciapro').value = '';
    document.getElementById('marcapro').value = '';
    document.getElementById('modelopro').value = '';
    document.getElementById('descripcionpro').value = '';
    document.getElementById('cantidadpro').value = '';
    document.getElementById('selectbodega').value = '';
    document.getElementById('selectproveedor').value = '';
  }

};


// Función para eliminar un producto
const eliminarprod = async (product_id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
    try {
      const response = await fetch(`/editproductos/${product_id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Producto eliminado exitosamente');
        getproducts(); // Actualizar la lista de productos
      } else {
        console.log('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }
};
let numero = 0;

// inicia y actualiza la datatable
const initdatatable = async () => {
  if (dataTableIsInitialized){

    datatable.destroy();
    datatablev.destroy();
    $('#inventariop').empty();
    $('#inventariov').empty();
  }
  await getproducts();
  await gethventas();
  datatable =  $('#inventariop').DataTable(dataTableOptions);
  datatablev =  $('#inventariov').DataTable(dataTableOptions);
  dataTableIsInitialized = true;
  
}

function getParametroUrl(parametro) {
  const params = new URLSearchParams(window.location.search); // Obtener todos los parámetros de la URL
  return params.get(parametro); // Devolver el valor del parámetro solicitado
}

function eliminarParametroUrl(parametro) {
  const url = new URL(window.location.href); // Obtener la URL actual
  url.searchParams.delete(parametro); // Eliminar el parámetro

  // Reemplazar el estado actual en el historial sin recargar la página
  window.history.replaceState({}, document.title, url.toString());
}

document.addEventListener('DOMContentLoaded', async function () {
  initdatatable();


  // Función para mostrar u ocultar el campo Dirección basado en el estado del checkbox
  let installationCheckboxisChecked = false;
  const installationCheckbox = document.getElementById('installation-checkbox');
  const direccionField = document.getElementById('direccion');
  // precio de instalacion

  installationCheckbox.addEventListener('change', function () {
      if (installationCheckbox.checked) {
          direccionField.style.display = 'block'; // Mostrar el campo Dirección
          installationCheckboxisChecked = true;
      } else {
          direccionField.style.display = 'none'; // Ocultar el campo Dirección
          installationCheckboxisChecked = false;
      }
  });

// Sección de enlaces del menú
const recientesLink = document.getElementById('recientes-link');
const registrarLink = document.getElementById('registrar-link');
const administrarLink = document.getElementById('administrar-link');
const inventariolink = document.getElementById('inventario-link');
const ventaslink = document.getElementById('venta-link');

const administrarLink2 = document.getElementById('administrar-link2');
const inventariolink2 = document.getElementById('inventario-link2');
const ventaslink2 = document.getElementById('venta-link2');

// Submenú: Enlaces de "Registrar"
const registrarProductoLink = document.getElementById('registrarproducto');
const registrarVentaLink = document.getElementById('registrarventa');

// Menurecientes: Enlaces de "Registrar"
/*const registrarProductoLink2 = document.getElementById('registrarproducto2');
const registrarVentaLink2 = document.getElementById('registrarventa2');*/

// Sección de contenido
const recientesSection = document.getElementById('Recientes');
const registrarSection = document.getElementById('Registrar');
const registrarpSection = document.getElementById('registrarp'); 
const administrarSection = document.getElementById('Administrar');
const inventarioSection = document.getElementById('tabla');
const ventasSection = document.getElementById('tablav');

// Botones de confirmación de venta
const añadiritem = document.getElementById('confirm-item');
const confirmarVenta = document.getElementById('confirm_venta');

// Botones de confirmación de administración
const confirmarBodega = document.getElementById('confirmarbodega');
const confirmarProveedor = document.getElementById('confirmarproveedor');

// Botones de confirmación de producto
const confirmarproducto = document.getElementById('confirmarproducto');

// Referencias a los botones y formularios de administración
const bodegasBtn = document.getElementById('bodegasbtn');
const proveedoresBtn = document.getElementById('proveedoresbtn');

//formularios de administración
const formularioBodega = document.getElementById('fbodega');
const formularioProveedor = document.getElementById('fproveedor');


// Función para ocultar todas las secciones
function hideSections() {
    recientesSection.style.display = 'none';
    registrarSection.style.display = 'none';
    administrarSection.style.display = 'none';
    inventarioSection.style.display = 'none';
    ventasSection.style.display = 'none';
    registrarpSection.style.display = 'none';
}

// Función para desactivar todos los enlaces principales
function deactivateLinks() {
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.classList.remove('active');
    });
}

// Función para manejar el clic en los submenús de "Registrar"
function handleSubmenuClick(event, Registrar) {
    event.preventDefault(); // Evitar comportamiento predeterminado
    hideSections(); // Ocultar todas las secciones
    deactivateLinks(); // Desactivar todos los enlaces principales
    registrarLink.classList.add('active'); // Activar el enlace principal "Registrar"
    document.getElementById(Registrar).style.display = 'block'; // Mostrar la sección correspondiente
}

function msgerrorbox(msg, seccion) {
  const msgerror = document.getElementById(seccion);
  msgerror.textContent = msg;
  msgerror.style.display = "block";
    setTimeout(() => {msgerror.style.opacity = "1";}, 10);+

    setTimeout(() => {msgerror.style.opacity = "0"; 
      setTimeout(() => {msgerror.style.display = "none";}, 500);
    }, 3000);
}

function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
  localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}

function agregarProductoAlCarrito(producto) {

  let carrito = JSON.parse(localStorage.getItem("carrito")) || { productos: [], total: 0, cantidadxproducto: [] };
  const productoExistente = carrito.productos.find(p => p.id === producto.id);

  if (productoExistente) {
    msgerrorbox('El producto ya esta en el carrito', 'msgerrorventa');
    return;
  }

  carrito.productos.push(producto);

  carrito.total += producto.preciounitario + producto.ganancia + producto.iva;

  carrito.cantidadxproducto.push(1);

  console.log(carrito);
  console.log(carrito.total);

  guardarAlmacenamientoLocal("carrito", carrito);
  actualizarVistaCarrito(carrito); //test
}

function actualizarVistaCarrito(carrito) {
  const totalElement = document.getElementById("total-a-pagar");
  const listaProductosElement = document.getElementById("car_products");

  totalElement.textContent = `${carrito.total}`;

  listaProductosElement.innerHTML = "";
  carrito.productos.forEach((producto, index) => {
      const item = document.createElement("tr");
      item.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.preciounitario + producto.ganancia + producto.iva}</td>
        <td>${producto.cantidad}</td>
        <td><input name="Cantidad" id="vpcantidad-${producto.id}" class="form-control" type="number" min="1" required></td>
        <td><button id="eliminar-${producto.id}"class="btn btn-dark"><i class="fa-solid fa-delete-left"></i></button></td>
      `;
      listaProductosElement.appendChild(item);

      const cantidadProducto = document.getElementById(`vpcantidad-${producto.id}`);
      cantidadProducto.addEventListener('change', function (event) {
        actualizarCantidad(event.target.value, index, carrito, producto.id);
      });

      const eliminarProducto = document.getElementById(`eliminar-${producto.id}`);
      eliminarProducto.removeEventListener('click', function (event) {
        eliminarProductoDelCarrito(index, carrito);
      });
      eliminarProducto.addEventListener('click', function (event) {
        eliminarProductoDelCarrito(index, carrito);
      });
    });
}

function actualizarCantidad(cantidad, index, carrito, producto_id) {
  const productoExistente = carrito.productos[index];
  let preciototal, cxp, actualtp;
  const valuecount = document.getElementById(`vpcantidad-${producto_id}`);

  if (productoExistente.cantidad < cantidad) {
    msgerrorbox('Cantidad no disponible', 'msgerrorventa');
    return;
  }
  if (cantidad < 1) {
    msgerrorbox('Cantidad no puede ser menor a 1', 'msgerrorventa');
    return;
  }else{
    preciototal = productoExistente.preciounitario + productoExistente.ganancia + productoExistente.iva;
    cxp = carrito.cantidadxproducto[index] * preciototal;
    actualtp = preciototal * cantidad;
    carrito.total = (carrito.total - cxp) + actualtp;
    carrito.cantidadxproducto[index] = cantidad;
  }

  valuecount.value = cantidad;
  console.log(carrito);
  console.log(carrito.total);

  guardarAlmacenamientoLocal("carrito", carrito);
  actualizarVistaCarrito(carrito); //test
}

// Función para enviar el carrito al servidor
async function registrarVenta() {
  
  // Datos del cliente
  let vnomcliente = document.getElementById("vnomcliente").value;
  let vapcliente = document.getElementById("vapcliente").value;
  let vtelfcliente = document.getElementById("vtelfcliente").value;
  let vidcliente = document.getElementById("vidcliente").value;
  let vdireccion = document.getElementById("vdireccion").value;

  // datos de la venta
  const vmetododepago = document.getElementById("vmetododepago").value;

  let carrito = JSON.parse(localStorage.getItem("carrito")) || { productos: [], total: 0, cantidadxproducto: [] };

  if (carrito.total === 0) {
    msgerrorbox('El carrito está vacío', 'msgerrorventa');
  }else if (vnomcliente === "" || vapcliente === "" || vtelfcliente === "" || vidcliente === ""){
      msgerrorbox('Ingrese los datos del cliente correctamente', 'msgerrorventa');
  }else{
    const cliente = {
        cedula: vidcliente,
        nombre: vnomcliente,
        apellido: vapcliente,
        telefono: vtelfcliente,
    };
  
    const venta = {
      instalacion: installationCheckboxisChecked,
      direccion: vdireccion,
      metododepago: vmetododepago, // Método de pago
      totalapagar: carrito.total, // Total a pagar
      productos: []
    };
  
    for (let i = 0; i < carrito.productos.length; i++) {
      const producto = carrito.productos[i];
      const cantidadxproducto = carrito.cantidadxproducto[i];
      venta.productos.push({
        producto_id: producto.id,
        cantidad: cantidadxproducto
      });
    }
    try {
        // Realizar la solicitud POST
        const response = await fetch("/addventa", {
            method: "POST",
            body: JSON.stringify({ cliente, venta }), // Datos en formato JSON
        });
  
        // Verificar la respuesta
        if (response.ok) {
          const data = await response.json();
          console.log("Venta registrada:", data);
          console.log("Venta registrada exitosamente");
          window.location.href = '/salvavidas/2';
          freecart();
          getproducts();
        } else {
            const errorData = await response.json();
            console.error("Error al registrar la venta:", errorData);
            console.log("Error al registrar la venta: " + errorData.error);
            return lol;
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        console.log("Ocurrió un error al conectar con el servidor");
        return lol;
    }
  }

}


function eliminarProductoDelCarrito(indice, carrito) {

  if (indice === -1) {
    console.log("Producto no encontrado en el carrito.");
      return;
  }

  // Restar el precio del producto eliminado del total del carrito
  carrito.total -= (carrito.productos[indice].preciounitario + carrito.productos[indice].ganancia + carrito.productos[indice].iva) * carrito.cantidadxproducto[indice];

  // Eliminar el producto del arreglo
  carrito.productos.splice(indice, 1);
  carrito.cantidadxproducto.splice(indice, 1);

  console.log(carrito);
  guardarAlmacenamientoLocal("carrito", carrito);
  actualizarVistaCarrito(carrito);
}

function freecart() {
  localStorage.removeItem("carrito");
  document.getElementById("item-name").value = "";
  actualizarVistaCarrito({ productos: [], total: 0 }); // Reiniciar vista del carrito
}
async function registrarprov() {
  const inputnombre = document.getElementById('nameprov');
  const inputapellido = document.getElementById('lastnameprov');
  const inputcedula = document.getElementById('cedulaprov');
  const inputtelefono = document.getElementById('telfprov');

  const nombre = inputnombre.value;
  const apellido = inputapellido.value;
  const cedula = inputcedula.value;    
  const telefono = inputtelefono.value;

  if (nombre === "" || apellido === "" || cedula === "" || telefono === "") {
    msgerrorbox('Campos vacíos - ingrese los datos correctamente', 'msgerroradmin');
    return;
  } else if (telefono < 1 ) {
    msgerrorbox('Ingrese un número valido en el número telefonico', 'msgerroradmin');
    return;
  }else{
    try {
      // Realizar la solicitud POST
      const response = await fetch('/addproveedor', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, apellido, cedula, telefono }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Proveedor registrada:", data);
        console.log("Proveedor registrado exitosamente");
        // Limpiar los campos
        inputnombre.value = '';
        inputapellido.value = '';
        inputcedula.value = '';
        inputtelefono.value = '';
        // Actualizar la tabla de proveedores
        actualizarlistpb('prov');
      } else {
          const errorData = await response.json();
          console.error("Error al registrar el proveedor:", errorData);
          console.log("Error al registrar el proveedor: " + errorData.error);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        console.log("Ocurrió un error al conectar con el servidor");
    }
  }

}
async function registrarBodega(){
  const namebodegaInput = document.getElementById("namebodega");
  const capacidadbodegaInput = document.getElementById("capacidadbodega");

  const namecodega = namebodegaInput.value;
  const capacidadcodega = capacidadbodegaInput.value;

  if (namecodega === "" || capacidadcodega === "") {
    msgerrorbox('Campos vacíos - ingrese los datos correctamente', 'msgerroradmin');
    return;
  } else if (capacidadcodega < 1 ) {
    msgerrorbox('Ingrese un número valido en la capacidad de la bodega', 'msgerroradmin');
    return;
  }else{
    try {
      const response = await fetch('/addbodega', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: namecodega, capacidad: capacidadcodega }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Bodega registrada:", data);
        console.log("Bodega registrada exitosamente");

        // Limpiar los campos
        namebodegaInput.value = '';
        capacidadbodegaInput.value = '';

        actualizarlistpb('bod');
      } else {
          const errorData = await response.json();
          console.error("Error al registrar la bodega:", errorData);
          console.log("Error al registrar la bodega: " + errorData.error);
      }
  }catch (error) {
    console.error("Error en la solicitud:", error);
    console.log("Ocurrió un error al conectar con el servidor");
  }
  }
}

async function registrarProducto() {

  // Obtener los valores del formulario
  const nombreMarca = document.getElementById("marcapro").value;
  const modeloMarca = document.getElementById("modelopro").value;
  const nombreProducto = document.getElementById("nombrepro").value;
  const precioUnitario = parseFloat(document.getElementById("preciouni").value);
  const ganancia = parseFloat(document.getElementById("gananciapro").value);
  const iva = parseFloat(precioUnitario * 0.15);
  const descripcion = document.getElementById("descripcionpro").value;
  const cantidad = parseInt(document.getElementById("cantidadpro").value);
  const idBodega = parseInt(document.getElementById("selectbodega").value);
  const idProveedor = parseInt(document.getElementById("selectproveedor").value);

  // Validar campos
  if (!nombreMarca || !modeloMarca || !nombreProducto || isNaN(precioUnitario) || 
      isNaN(ganancia) || isNaN(iva) || !descripcion || isNaN(cantidad) || 
      isNaN(idBodega) || isNaN(idProveedor)) {
      msgerrorbox('Por favor, complete todos los campos correctamente', 'msgerrorprod');
    return;
  }

  try {
    // Realizar la solicitud POST
    const response = await fetch('/addproducto', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_marca: nombreMarca,
        modelo_marca: modeloMarca,
        nombre_producto: nombreProducto,
        preciounitario: precioUnitario,
        ganancia: ganancia,
        iva: iva,
        descripcion: descripcion,
        cantidad: cantidad,
        id_bodega: idBodega,
        id_proveedor: idProveedor,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
      // Restablecer los valores del formulario
      document.getElementById("nombre_marca").value = "";
      document.getElementById("modelo_marca").value = "";
      document.getElementById("nombre_producto").value = "";
      document.getElementById("preciounitario").value = "";
      document.getElementById("ganancia").value = "";
      document.getElementById("iva").value = "";
      document.getElementById("descripcion").value = "";
      document.getElementById("cantidad").value = "";
      document.getElementById("id_bodega").value = "";
      document.getElementById("id_proveedor").value = "";
    } else {
      const errorData = await response.json();
      console.log("Error al registrar el producto: " + errorData.error);
      console.error(errorData);
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    console.log("Ocurrió un error al conectar con el servidor.");
  }
}

async function actualizarlistpb(list) {
  const data = await getlistpb();
  const listadopb = document.getElementById('listadopb');
  const headprov = document.getElementById('headprov');
  const headbod = document.getElementById('headbod');
  const titulo = document.getElementById('tituloadmin');

  if (list === 'bod') {
    titulo.textContent = 'Listado de Bodegas';
    headprov.classList.add('hidden');
    headbod.classList.remove('hidden');
    console.log(data.bodegas);
    listadopb.innerHTML = ''; // Limpiar el contenido previo

    // Crear las filas y agregar eventos
    data.bodegas.forEach(bodega => {
      const fila = document.createElement('tr');

      // Crear celdas
      const nombreCelda = document.createElement('td');
      nombreCelda.textContent = bodega.nombre;

      const capacidadCelda = document.createElement('td');
      capacidadCelda.textContent = bodega.capacidad;

      const botonCelda = document.createElement('td');
      const boton = document.createElement('button');
      boton.className = 'btn btn-dark';
      boton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      boton.id = `editarbtnbod-${bodega.id, bodega}`
      boton.removeEventListener('click', () => editarbod(bodega.id, bodega));
      boton.addEventListener('click', () => editarbod(bodega.id, bodega));
      botonCelda.appendChild(boton);

      fila.appendChild(nombreCelda);
      fila.appendChild(capacidadCelda);
      fila.appendChild(botonCelda);
      
      listadopb.appendChild(fila);
    });
  }else if (list === 'prov') {
    titulo.textContent = 'Listado de Proveedores';
    headprov.classList.remove('hidden');
    headbod.classList.add('hidden');
    console.log(data.proveedores);
    listadopb.innerHTML = ''; // Limpiar el contenido previo

    // Crear las filas y agregar eventos
    data.proveedores.forEach(proveedor => {
      const fila = document.createElement('tr');

      // Crear celdas
      const nombreCelda = document.createElement('td');
      nombreCelda.textContent = proveedor.nombre + ' ' + proveedor.apellido;

      const cedulaCelda = document.createElement('td');
      cedulaCelda.textContent = proveedor.cedula;

      const botonCelda = document.createElement('td');
      const boton = document.createElement('button');
      boton.className = 'btn btn-dark';
      boton.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
      boton.removeEventListener('click', () => editarprov(proveedor.id, proveedor));
      boton.addEventListener('click', () => editarprov(proveedor.id, proveedor));
      botonCelda.appendChild(boton);

      fila.appendChild(nombreCelda);
      fila.appendChild(cedulaCelda);
      fila.appendChild(botonCelda);
      
      listadopb.appendChild(fila);
    });
  }
}

function editarbod(bodega_id, bodega) {
  const boton = document.getElementById('confirmarbodega');
  const titulo = document.getElementById('titulobodega');
  
  boton.classList.add('hidden')
  titulo.textContent = 'Editar Bodega';

  const seccionedibod = document.getElementById('btneditbod');
  const nombre = document.getElementById('namebodega');
  const capacidad = document.getElementById('capacidadbodega');

  seccionedibod.classList.remove('hidden');
  nombre.value = bodega.nombre;
  capacidad.value = bodega.capacidad;

  const botondelete = document.getElementById('eliminarbod');
  const botonconfirmac = document.getElementById('confircambiobod');
  const botoncancelc = document.getElementById('cancelbod');

  botondelete.removeEventListener('click', function (event) {ojala1(event);});
  botondelete.addEventListener('click', function (event) {ojala1(event);});
  
  function ojala1(event) {
    console.log('funciona eliminar bodega');
    event.preventDefault(); // Evitar comportamiento predeterminado
    eliminarbod(bodega_id);

  }

  botonconfirmac.removeEventListener('click', function (event) {ojala2(event);});
  botonconfirmac.addEventListener('click', function (event) {ojala2(event);});
  
  function ojala2(event) {
    console.log('funciona confirmar cambio bodega');
    event.preventDefault(); // Evitar comportamiento predeterminado
    confirmacambiobod(bodega_id);
  }

  botoncancelc.removeEventListener('click', function () { ojala3(); });
  botoncancelc.addEventListener('click', function () { ojala3(); });
  
  function ojala3(){
    console.log('funciona confirmar cancelar edit bodega');
    seccionedibod.classList.add('hidden');
    boton.classList.remove('hidden')
    nombre.value = '';
    capacidad.value = '';

  }

  console.log('ID de la bodega:', bodega_id);
  console.log('Detalles de la bodega:', bodega);
}

function editarprov(proveedor_id, proveedor) {
  const boton = document.getElementById('confirmarproveedor');
  const titulo = document.getElementById('tituloproveedor');
  
  boton.classList.add('hidden')
  titulo.textContent = 'Editar Proveedor';

  const seccionediprov = document.getElementById('btneditrov');
  const nombre = document.getElementById('nameprov');
  const apellido = document.getElementById('lastnameprov');
  const cedula = document.getElementById('cedulaprov');
  const telefono = document.getElementById('telfprov');

  seccionediprov.classList.remove('hidden');
  nombre.value = proveedor.nombre;
  apellido.value = proveedor.apellido;
  cedula.value = proveedor.cedula;
  telefono.value = proveedor.telefono;

  const botondelete = document.getElementById('eliminarprov');
  const botonconfirmac = document.getElementById('confircambioprov');
  const botoncancelprov = document.getElementById('cancelprov'); 

  botondelete.addEventListener('click', function (event) {
    console.log('funciona eliminar bodega');
    event.preventDefault(); // Evitar comportamiento predeterminado
    eliminarprov(proveedor_id);
  });

  botonconfirmac.addEventListener('click', function (event) {
    console.log('funciona confirmar cambio bodega');
    event.preventDefault(); // Evitar comportamiento predeterminado
    confirmacambioprov(proveedor_id);
  });

  botoncancelprov.addEventListener('click', function (event) {
    console.log('funciona confirmar cancelar edit bodega');
    seccionediprov.classList.add('hidden');
    boton.classList.remove('hidden')
    nombre.value = '';
    apellido.value = '';
    cedula.value = '';
    telefono.value = '';
  });

  console.log('ID de la bodega:', proveedor_id);
  console.log('Detalles de la bodega:', proveedor);
}

async function eliminarprov(proveedor_id) {
  try {
    // Realizar la solicitud DELETE
    const response = await fetch(`/addproveedor/${proveedor_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Proveedor eliminada exitosamente');

      // Limpiar los campos del formulario
      document.getElementById('nameprov').value = '';
      document.getElementById('lastnameprov').value = '';
      document.getElementById('cedulaprov').value = '';
      document.getElementById('telfprov').value = '';

      // Actualizar la tabla de proveedores
      actualizarlistpb('prov');

      // Restablecer el estado del formulario
      const boton = document.getElementById('confirmarproveedor');
      const titulo = document.getElementById('tituloproveedor');
      boton.classList.remove('hidden');
      titulo.textContent = 'Añadir Proveedor';

      const seccionedibod = document.getElementById('btneditrov');
      seccionedibod.classList.add('hidden');
      window.location.reload(true);

    } else {
      const errorData = await response.json();
      console.error('Error al eliminar el proveedor:', errorData);
      //alert('Error al eliminar la bodega: ' + errorData.error);
    }
  } catch (error) {
    console.error('Error en la solicitud DELETE:', error);
    //alert('Ocurrió un error al eliminar la bodega.');
  }
}

async function eliminarbod(bodega_id) {
  
  try {
    // Realizar la solicitud DELETE
    const response = await fetch(`/addbodega/${bodega_id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Bodega eliminada exitosamente');
      // Limpiar los campos del formulario
      document.getElementById('namebodega').value = '';
      document.getElementById('capacidadbodega').value = '';

      // Restablecer el estado del formulario
      const boton = document.getElementById('confirmarbodega');
      const titulo = document.getElementById('titulobodega');
      boton.classList.remove('hidden');
      titulo.textContent = 'Añadir Bodega';

      const seccionedibod = document.getElementById('btneditbod');
      seccionedibod.classList.add('hidden');
      window.location.reload(true);

      // Actualizar la tabla de bodegas
      actualizarlistpb('bod');
    } else {
      const errorData = await response.json();
      console.error('Error al eliminar la bodega:', errorData);
      //alert('Error al eliminar la bodega: ' + errorData.error);
    }
  } catch (error) {
    console.error('Error en la solicitud DELETE:', error);
    //alert('Ocurrió un error al eliminar la bodega.');
  }
}

async function confirmacambioprov(proveedor_id) {
  // Obtener los valores actualizados de los inputs
  const nombre = document.getElementById('nameprov').value;
  const apellido = document.getElementById('lastnameprov').value;
  const cedula = document.getElementById('cedulaprov').value;
  const telefono = document.getElementById('telfprov').value;

  try {
    // Realizar la solicitud PUT con los datos actualizados
    const response = await fetch(`/addproveedor/${proveedor_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre,
        apellido,
        cedula,
        telefono,
      }),
    });

    if (response.ok) {
      console.log('Proveedor actualizada exitosamente');
      
      // Limpiar los campos del formulario
      document.getElementById('nameprov').value='';
      document.getElementById('lastnameprov').value='';
      document.getElementById('cedulaprov').value='';
      document.getElementById('telfprov').value='';

      // Restablecer el estado del formulario
      const boton = document.getElementById('confirmarproveedor');
      const titulo = document.getElementById('tituloproveedor');
      boton.classList.remove('hidden');
      titulo.textContent = 'Añadir Proveedor';

      const seccionedibod = document.getElementById('btneditrov');
      seccionedibod.classList.add('hidden');
      window.location.href = '/salvavidas/4';

      // Actualizar la tabla de bodegas
      actualizarlistpb('prov');
    } else {
      const errorData = await response.json();
      console.error('Error al actualizar el proveedor:', errorData);
      console.log('Error al actualizar el proveedor: ' + errorData.error);
    }
  } catch (error) {
    console.error('Error en la solicitud PUT:', error);
    console.log('Ocurrió un error al actualizar el proveedor.');
  }

}

async function confirmacambiobod(bodega_id) {
  // Obtener los valores actualizados de los inputs
  const nombre = document.getElementById('namebodega').value;
  const capacidad = document.getElementById('capacidadbodega').value;

  if (nombre === "" || capacidad === "") {
    msgerrorbox('Campos vacíos - ingrese los datos correctamente', 'msgerroradmin');
    return;
  } else if (capacidad < 1 ) {
    msgerrorbox('Ingrese un número valido en la capacidad de la bodega', 'msgerroradmin');
    return;
  }else{

    try {
      // Realizar la solicitud PUT con los datos actualizados
      const response = await fetch(`/addbodega/${bodega_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          capacidad,
        }),
      });
  
      if (response.ok) {
        console.log('Bodega actualizada exitosamente');
        // Limpiar los campos del formulario
        document.getElementById('namebodega').value = '';
        document.getElementById('capacidadbodega').value = '';
  
        // Restablecer el estado del formulario
        const boton = document.getElementById('confirmarbodega');
        const titulo = document.getElementById('titulobodega');
        boton.classList.remove('hidden');
        titulo.textContent = 'Añadir Bodega';
  
        const seccionedibod = document.getElementById('btneditbod');
        seccionedibod.classList.add('hidden');
       
        window.location.href = '/salvavidas/5';
        //window.location.reload(true);
        // Actualizar la tabla de bodegas
        actualizarlistpb('bod');
      } else {
        const errorData = await response.json();
        console.error('Error al actualizar la bodega:', errorData);
        console.log('Error al actualizar la bodega: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error en la solicitud PUT:', error);
      console.log('Ocurrió un error al actualizar la bodega.');
    }

  }
}
async function actualizarselectproandbod() {
  const data = await getlistpb();
  const selectbodega = document.getElementById('selectbodega');
  const selectproveedor = document.getElementById('selectproveedor');
  selectbodega.innerHTML = '';
  selectproveedor.innerHTML = '';
  data.bodegas.forEach(bodega => {
    const option = document.createElement('option');
    option.value = bodega.id;
    option.text = bodega.nombre;
    selectbodega.appendChild(option);
  });
  data.proveedores.forEach(proveedor => {
    const option = document.createElement('option');
    option.value = proveedor.id;
    option.text = proveedor.nombre + ' ' + proveedor.apellido;
    selectproveedor.appendChild(option);
  });

}

// Manejadores para los subenlaces del menú "Registrar"
registrarProductoLink.addEventListener('click',  function (event) {
  handleSubmenuClick(event, 'registrarp'); // Activar sección Registrar al seleccionar Producto
  actualizarselectproandbod();
  freecart();
  });
  
registrarVentaLink.addEventListener('click', async function (event) {
  handleSubmenuClick(event, 'Registrar'); // Activar sección Registrar al seleccionar Venta
  datos = await getproducts();
  console.log(`datos: ${datos}`);
  freecart();
});

// Función para manejar el clic en "Recientes"
recientesLink.addEventListener('click', function (event) {
    freecart();
    event.preventDefault(); // Evitar comportamiento predeterminado
    hideSections(); // Ocultar todas las secciones
    deactivateLinks(); // Desactivar todos los enlaces
    recientesSection.style.display = 'block'; // Mostrar la sección Recientes
    recientesLink.classList.add('active'); // Activar el enlace Recientes
});

// Función para manejar el clic en "Administrar"
administrarLink.addEventListener('click', function (event) {
    freecart();
    actualizarlistpb('bod')
    event.preventDefault(); // Evitar comportamiento predeterminado
    hideSections(); // Ocultar todas las secciones
    deactivateLinks(); // Desactivar todos los enlaces
    administrarSection.style.display = 'block'; // Mostrar la sección Administrar
    administrarLink.classList.add('active'); // Activar el enlace Administrar
});

// Función para manejar el clic en "Inventario"
inventariolink.addEventListener('click', async function (event) {
  freecart();
  event.preventDefault(); // Evitar comportamiento predeterminado
  await getproducts();
  hideSections(); // Ocultar todas las secciones
  deactivateLinks(); // Desactivar todos los enlaces
  inventarioSection.style.display = 'block'; // Mostrar la sección Inventario
  inventariolink.classList.add('active'); // Activar el enlace Inventario
  });

// Función para manejar el clic en "ventas"
ventaslink.addEventListener('click', async function (event) {
  freecart();
  event.preventDefault(); // Evitar comportamiento predeterminado
  await gethventas();
  hideSections(); // Ocultar todas las secciones
  deactivateLinks(); // Desactivar todos los enlaces
  ventasSection.style.display = 'block'; // Mostrar la sección Inventario
  ventaslink.classList.add('active'); // Activar el enlace Inventario
});



añadiritem.addEventListener('click', function (event) {
    event.preventDefault(); // Evitar comportamiento predeterminado
    const nombre = document.getElementById('item-name').value;

    const confirmname = datos.filter(
      (look) => look.nombre === nombre
    );

    console.log(confirmname);
    if (confirmname.length === 0) {
      msgerrorbox('El producto no existe en inventario', 'msgerrorventa');
      return;
    }
    else if (confirmname[0].cantidad === 0) {
      console.log(confirmname[0].nombre);
      msgerrorbox('Ya no tiene stock de este producto', 'msgerrorventa');
      return;
    }else{
      agregarProductoAlCarrito(confirmname[0]);
    }
});

bodegasBtn.addEventListener('click', () => {
    actualizarlistpb('bod');
    formularioBodega.style.display = 'block'; 
    formularioProveedor.style.display = 'none'; 
});

proveedoresBtn.addEventListener('click', () => {
    actualizarlistpb('prov');
    formularioProveedor.style.display = 'block'; 
    formularioBodega.style.display = 'none'; 
});

confirmarVenta.addEventListener('click', () =>{
  registrarVenta();
 
});

confirmarBodega.addEventListener('click', () =>{
  registrarBodega();
  actualizarlistpb('bod');
})

confirmarProveedor.addEventListener('click', () =>{
  registrarprov();
  actualizarlistpb('prov');
})

confirmarproducto.addEventListener('click', () =>{
  registrarProducto();
})

numero = getParametroUrl('numero');  

switch (numero) {
  case "5":
      getlistpb();
      actualizarlistpb('bod');
      administrarSection.classList.remove('hidden');
      deactivateLinks(); // Desactivar todos los enlaces
      administrarSection.style.display = 'block'; // Mostrar la sección Administrar
      administrarLink.classList.add('active'); // Activar el enlace Administrar
      eliminarParametroUrl('numero');
      numero = 0;
    break;
  case "4":
      getlistpb();
      actualizarlistpb('prov');
      administrarSection.classList.remove('hidden');
      formularioProveedor.classList.remove('hidden');
      formularioBodega.classList.add('hidden');
      deactivateLinks(); // Desactivar todos los enlaces
      administrarSection.style.display = 'block'; // Mostrar la sección Administrar
      administrarLink.classList.add('active'); // Activar el enlace Administrar
      eliminarParametroUrl('numero');
      numero = 0;
    break;
  case "3":
      inventarioSection.classList.remove('hidden');
      await getproducts();
      deactivateLinks(); // Desactivar todos los enlaces
      inventarioSection.style.display = 'block'; // Mostrar la sección Inventario
      inventariolink.classList.add('active'); // Activar el enlace Inventario
      eliminarParametroUrl('numero');
      numero = 0;
    break;
  case "2":
    await gethventas();
    deactivateLinks(); // Desactivar todos los enlaces
    ventasSection.style.display = 'block'; // Mostrar la sección Inventario
    ventaslink.classList.add('active'); // Activar el enlace Inventario
    eliminarParametroUrl('numero');
    numero = 0;
    break;
  default:
      recientesSection.classList.remove('hidden');
}

const precioInstalacion = document.getElementById(`vidpinstalacion`);
const totalAPagarElement = document.getElementById('total-a-pagar'); 

let precioInstalacionSumado = false;

precioInstalacion.addEventListener('change', function (event) {
    let total = parseFloat(totalAPagarElement.textContent);
    const nuevoPrecioInstalacion = parseFloat(event.target.value) || 0;

    if (installationCheckbox.checked) {
        if (precioInstalacionSumado) {
            total = total - (precioInstalacionSumado ? parseFloat(precioInstalacion.dataset.precioPrevio || 0) : 0) + nuevoPrecioInstalacion;
        } else {
            total += nuevoPrecioInstalacion;
            precioInstalacionSumado = true;
        }

        console.log('Precio de instalación sumado. Nuevo total:', total);
    } else {
        console.log('Checkbox no marcado. No se suma el precio de instalación.');
    }
    totalAPagarElement.textContent = total.toFixed(2);

    precioInstalacion.dataset.precioPrevio = nuevoPrecioInstalacion;
});



});