// Increase product

// Decrease product

// Remove product

// Empty basket

// Calculate product price
calculateProductPrice = (amount, price, discount) => {
    // If there's no discount defined at all we can return early and not execute this code any further
    if (!discount) return amount * price;

    console.log('calculateProductPrice params:', amount, price, discount);
    console.log('discount:', discount[0], 'for', discount[1]);
    // Check the passed amount against multiples of the defined discount amount value
    if (amount % discount[0] === 0) { // = Yes we should apply a discount
        const amountToCalculateWith = amount * (discount[1] / discount[0]);
        return amountToCalculateWith * price;
    }

    // Default = a discount was defined but needn't be _applied_. E.g. in the case of 4 kiwi's: kiwi's do have a discount
    // active but the discount should only be _applied_ for multiples of 5.
    return amount * price;
};

// Update total due
updateTotalDue = (products) => {
    let total = 0;
    products.map(product => {
        const { name, amount, price, discount } = product;
        console.log(name, amount, '*', price, '=', amount * price);
        total = total + calculateProductPrice(amount, price, discount);
    });
    console.log('Total:', total);
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
