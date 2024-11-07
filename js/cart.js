// Update cart on page load and whenever quantity changes
document.addEventListener("DOMContentLoaded", () => {
    updateCart();
});

function updateCart() {
    let subtotal = 0;
    document.querySelectorAll('.cart-item').forEach(item => {
        const price = parseFloat(item.querySelector('.item-price').getAttribute('data-price'));
        const quantity = parseInt(item.querySelector('.quantity-input').value);
        const itemTotal = price * quantity;
        item.querySelector('.item-price').textContent = `$${itemTotal.toFixed(2)}`;
        subtotal += itemTotal;
    });

    const discount = 0; // Add logic for discount if needed
    const tax = subtotal * 0.10;
    const total = subtotal - discount + tax;
    
    document.getElementById('subtotal-price').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('discount-price').textContent = `$${discount.toFixed(2)}`;
    document.getElementById('tax-price').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total-price').textContent = `$${total.toFixed(2)}`;
}

function addItem() {
    const newItem = `
    <div class="cart-item d-flex align-items-center">
        <div class="col-2">
            <img src="image-placeholder.jpg" alt="Product Image" class="img-fluid rounded">
        </div>
        <div class="col-3">
            <p class="mb-1">New Product</p>
            <small class="text-muted">Short description</small>
        </div>
        <div class="col-2">
            <input type="number" class="form-control quantity-input" min="1" value="1" onchange="updateCart()">
        </div>
        <div class="col-2 text-success fw-bold item-price" data-price="150">$150.00</div>
        <div class="col-2 text-end">
            <button class="btn btn-outline-danger btn-sm" onclick="removeItem(this)">Delete</button>
        </div>
    </div>`;
    document.getElementById('cart-items').insertAdjacentHTML('beforeend', newItem);
    updateCart();
}

function removeItem(button) {
    button.closest('.cart-item').remove();
    updateCart();
}

// Initial calculation on page load
updateCart();