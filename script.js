document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.querySelector(".cart-items");
    const cartTotalElement = document.querySelector(".cart-total");
    let cart = [];

    // Function to update cart display
    function updateCart() {
        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - $${item.price} x ${item.quantity} 
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        // Update total display
        cartTotalElement.textContent = total.toFixed(2);

        // Attach remove event listeners after updating the cart
        attachRemoveEvent();
    }

    // Function to handle "Add to Cart" button clicks
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            updateCart();
        });
    });

    // Function to handle "Remove" button clicks
    function attachRemoveEvent() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});