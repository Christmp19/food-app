// script principal
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price, productId) {
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).value);
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += quantity;
    } else {
        cart.push({ id: productId, name: productName, price: price, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Mettre à jour le localStorage
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = 'panier.html';
});


// script du panier
// custom.js

// Example cart items (in a real application, these would be fetched from the backend or local storage)
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('tr');
        itemElement.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} frs</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
            </td>
            <td>${item.price * item.quantity} frs</td>
            <td>
                <button class="delete-btn" data-id="${item.id}">Supprimer</button>
            </td>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('cart-count').textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}

document.getElementById('cart-items').addEventListener('input', function (e) {
    if (e.target.classList.contains('quantity-input')) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        const newQuantity = parseInt(e.target.value);
        cartItems = cartItems.map(item => item.id === itemId ? { ...item, quantity: newQuantity } : item);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
    }
});

document.getElementById('cart-items').addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const itemId = parseInt(e.target.getAttribute('data-id'));
        cartItems = cartItems.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
    }
});

renderCartItems();

// script validation du panier

document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    if (name && address && email) {
        // Process the order
        alert('Commande passée avec succès!');
        // Clear the cart
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});
