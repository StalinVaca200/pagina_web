$(document).ready(function() {
    // Verificar si hay productos guardados en el carrito al cargar la página
    var savedProducts = localStorage.getItem('cartProducts');
    if (savedProducts) {
        $('#cartCounter').text(savedProducts); // Actualizar el contador del carrito
    }

    // Función para limpiar el carrito cada 24 horas
    function clearCart() {
        localStorage.removeItem('cartProducts'); // Eliminar los productos del carrito
        $('#cartCounter').text('0'); // Reiniciar el contador del carrito
    }

    // Verificar y limpiar el carrito cada 24 horas (86400000 milisegundos = 24 horas)
    setInterval(clearCart, 86400000);

    // Delegación de eventos para el botón de agregar al carrito
    $(document).on('click', '.btn-add-to-cart', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del botón

        // Obtener los detalles del producto
        var productName = $(this).closest('.product-item').find('.text-truncate').text();

        // Incrementar el contador del carrito
        var currentCount = parseInt($('#cartCounter').text());
        var newCount = currentCount + 1;
        $('#cartCounter').text(newCount);

        // Guardar el contador actual en localStorage
        localStorage.setItem('cartProducts', newCount);

        // Mostrar la notificación al usuario utilizando SweetAlert2
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado al carrito',
            showConfirmButton: false,
            timer: 1500 // Cerrar automáticamente después de 1.5 segundos
        });
    });
});




// Obtener referencia al contenedor del carrito y la tabla de productos
var carritoContainer = document.querySelector('.carrito');
var tablaProductos = carritoContainer.querySelector('tbody');

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    // Crea una nueva fila para el producto
    var fila = document.createElement('tr');
    fila.innerHTML = `
        <td class="align-middle">
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px;">
            ${producto.nombre}
        </td>
        <td class="align-middle">$${producto.precio.toFixed(2)}</td>
        <td class="align-middle">
            <div class="input-group quantity mx-auto" style="width: 100px;">
                <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary btn-minus">
                        <i class="fa fa-minus"></i>
                    </button>
                </div>
                <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center quantity-input" value="1">
                <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary btn-plus">
                        <i class="fa fa-plus"></i>
                    </button>
                </div>
            </div>
        </td>
        <td class="align-middle">$${producto.precio.toFixed(2)}</td>
        <td class="align-middle"><button class="btn btn-sm btn-danger btn-remove"><i class="fa fa-times"></i></button></td>
    `;

    // Agrega la fila a la tabla de productos
    tablaProductos.appendChild(fila);
}

// Función para calcular el subtotal del carrito
function calcularSubtotal() {
    var subtotal = 0;
    var filasProductos = tablaProductos.querySelectorAll('tr.product-row');
    filasProductos.forEach(function(fila) {
        var precioProducto = parseFloat(fila.querySelector('.precio-producto').textContent.replace('$', ''));
        var cantidadProducto = parseInt(fila.querySelector('.quantity-input').value);
        subtotal += precioProducto * cantidadProducto;
    });
    return subtotal;
}

// Función para actualizar el subtotal, envío y total
function actualizarResumenCarrito() {
    var subtotal = calcularSubtotal();
    var envio = 6.00; // Costo fijo de envío
    var total = subtotal + envio;

    // Actualiza los elementos HTML con los nuevos valores
    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('envio').textContent = '$' + envio.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
    var fila = event.target.closest('tr.product-row');
    if (fila) {
        fila.remove();
        actualizarResumenCarrito(); // Actualiza el resumen del carrito después de eliminar un producto
    }
}

// Asocia eventos de clic a los botones de "Eliminar" producto
var botonesEliminar = tablaProductos.querySelectorAll('.btn-remove');
botonesEliminar.forEach(function(boton) {
    boton.addEventListener('click', eliminarProducto);
});

// Asocia eventos de cambio a los inputs de cantidad para actualizar los totales
tablaProductos.addEventListener('change', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        actualizarResumenCarrito();
    }
});

// Paso 1: Recuperar los productos del almacenamiento local
var productosJSON = localStorage.getItem('productos');

console.log('Contenido de productosJSON:', productosJSON); // Verificar el contenido de productosJSON

// Paso 2: Verificar si hay productos en el almacenamiento local
var productos;

if (!productosJSON) {
    // Si no hay productos en el almacenamiento local, inicializar con un conjunto predeterminado de productos
    productos = [
        {
            id: 1,
            nombre: "Tecno Spark 20 Pro (8+256GB)",
            precio: 195.00,
            imagen: "img/destacdos/spark20pro.jpg"
        },
        {
            id: 2,
            nombre: "Infinix Zero 30 (8+256GB)",
            precio: 279.00,
            imagen: "img/destacdos/zero30.jpg"
        },
        {
            id: 3,
            nombre: "Infinix Note 30 Pro(8+256GB)",
            precio: 235.00,
            imagen: "img/destacdos/note30pro.jpg"
        },
        {
            id: 4,
            nombre: "Tecno Spark GO 2024 (8+256GB)",
            precio: 115.00,
            imagen: "img/destacdos/go2024.png"
        }
    ];

    // Almacena los productos predeterminados en el almacenamiento local
    localStorage.setItem('productos', JSON.stringify(productos));
} else {
    // Si hay productos en el almacenamiento local, convierte la cadena JSON en un array de objetos
    productos = JSON.parse(productosJSON);
}

console.log('Contenido de productos:', productos); // Verificar el contenido de productos



// Asocia eventos de clic a los botones de "Agregar al Carrito"
var botonesAgregar = document.querySelectorAll('.btn-add-to-cart');
botonesAgregar.forEach(function(boton) {
    boton.addEventListener('click', function(event) {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace
        var productId = parseInt(boton.dataset.productId);
        var producto = productos.find(function(item) {
            return item.id === productId;
        });
        if (producto) {
            agregarAlCarrito(producto);
            actualizarResumenCarrito(); // Actualiza el resumen del carrito después de agregar un producto
        }
    });
});
