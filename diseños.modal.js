//whasappp 
const whatsappButton = document.querySelector('.whatsapp-button');

function adjustWhatsappButtonPosition() {
    const modal = document.querySelector('.modal');

    if (modal && window.getComputedStyle(modal).display !== 'none') {
        const modalHeight = modal.offsetHeight;

        whatsappButton.style.bottom = `${modalHeight + 20}px`; 
    } else {
        whatsappButton.style.bottom = '20px'; 
    }
}

adjustWhatsappButtonPosition();
window.addEventListener('resize', adjustWhatsappButtonPosition);
window.addEventListener('scroll', adjustWhatsappButtonPosition);



// Función para inicializar el carrito

function initializeCart() {
    document.getElementById('viewCartButton').addEventListener('click', function() {
        renderSelectedProducts(); 
    });

    document.getElementById('openCartModal').addEventListener('click', function() {
        renderSelectedProducts();
        document.getElementById('cartModal').style.display = 'block';
    });

    document.querySelectorAll('#cartModal .close, #cartModal .modal-footer .btn-secondary').forEach(function(el) {
        el.addEventListener('click', function() {
            document.getElementById('cartModal').style.display = 'none';
        });
    });
}

function renderSelectedProducts() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = ''; 

    const selectedProducts = getSelectedProducts();

    if (selectedProducts.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'No hay productos seleccionados.';
        cartItemsElement.appendChild(message);
    } else {
        selectedProducts.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - ${product.price}`;
            cartItemsElement.appendChild(li);
        });
    }
}
function getSelectedProducts() {
    return [];
}
document.addEventListener("DOMContentLoaded", function() {
    initializeCart();
});
