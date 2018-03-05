// Increase product

// Decrease product

// Remove product

// Empty basket

// Update total due
updateTotalDue = (products) => {
    let total = 0;
    products.map(product => {
        const { name, price, amount } = product;
        console.log(name, amount, '*', price, '=', amount * price);
        total = total + price * amount;
    });
    console.log('Total:', total);
    // TODO: Apply discount
    document.getElementById('total').innerHTML = total.toString();
};

// Update basket
updateBasket = () => {
    // Get new basket
    fetch('http://localhost:8081/products')
        .then(res => res.json())
        .then(data => {
            console.log('Received:', data);

            // Build product list
            data.map(product => {
                const { name, price, amount } = product;
                const productItem = document.createElement('p');
                productItem.innerText = `${name} ${price} ${amount}`;

                // Mount product to DOM
                if (amount > 0) {
                    document.getElementById('basket').appendChild(productItem);
                }
            });

            // Invoke total due update
            updateTotalDue(data);
        })
        .catch(err => console.error(err));
};

// Init
updateBasket();
