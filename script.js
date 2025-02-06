document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    function updateCartPopup() {
        const cartItemsContainer = document.getElementById("cart-items");
        const totalAmount = document.getElementById("total-amount");
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} - ₱${item.price} x ${item.quantity}</p>
                <button class="remove-item button" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        totalAmount.textContent = `Total: ₱${total.toFixed(2)}`;
    }

    document.querySelectorAll(".add-to-cart-button").forEach(button => {
        button.addEventListener("click", function () {
            const productName = this.getAttribute("data-name");
            const productPrice = parseFloat(this.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }
            updateCartPopup();
        });
    });

    document.getElementById("cart-btn").addEventListener("click", function () {
        document.getElementById("cart-popup").style.display = "block";
        document.getElementById("cart-popup-overlay").style.display = "block";
    });

    document.getElementById("close-cart").addEventListener("click", function () {
        document.getElementById("cart-popup").style.display = "none";
        document.getElementById("cart-popup-overlay").style.display = "none";
    });

    document.getElementById("cart-items").addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.getAttribute("data-index");
            cart.splice(index, 1);
            updateCartPopup();
        }
    });
});