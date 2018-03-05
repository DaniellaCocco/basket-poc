// Increase product

// Decrease product

// Remove product

// Empty basket

// Calculate total due

// Update basket
updateBasket = () => {
    // Get new basket
    fetch('http://localhost:8081/products')
        .then(res => res.json())
        .then(data => {
            console.log('Received:', data);

            // Build product list
            return data.map(product => {
                const { name, price, amount } = product;
                const productItem = document.createElement('p');
                productItem.innerText = `${name} ${price} ${amount}`;

                // Mount product to DOM
                if (amount > 0) {
                    document.getElementById('app').appendChild(productItem);
                }
            })
        })
        .catch(err => console.error(err));
};

// Init
updateBasket();
