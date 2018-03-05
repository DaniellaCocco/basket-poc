// Calculate new product amount helper
// Takes the old amount and the type of computation required and returns the new value
// NOTE: In a real-world app it'd be useful to document the business logic properly, possibly with something like JSDoc.
calculateNewAmount = (oldAmount, type) => {

    // NOTE: In a real-world app you'd want to check the parameter values someway before using them.
    if (type === 'increase') return oldAmount + 1;
    if (type === 'decrease') return oldAmount - 1;
    return 0; // Default = assume type 'delete'
};

// Change product amount
// NOTE: In a real-world app you'd extract the fetches into dedicated functions which build the request.
// And you'd not put the fetches inside each other, but use a more sophisticated method for getting and storing data.
// Possibly something with Promise.All and chuck the data in a front-end state management object, possibly with Redux.
// ]This would also allow for the writing of unit tests, api uri generation based upon context, etc.
changeProductAmount = (id, type) => {
    let newAmount = 0;

    // First we'll get the current (old) product
    fetch(`http://localhost:8081/products/${id}`)
        .then(res => res.json())
        .then(data => {
            // Calculate the new to-be amount
            newAmount = calculateNewAmount(data.amount, type);

            // Now that we know the to-be amount we'll update the product in our mock database
            fetch(`http://localhost:8081/products/${id}`, {
                body: JSON.stringify({ 'amount': newAmount }),
                headers: { 'content-type': 'application/json' },
                method: 'PATCH'
            })
                .then(res => res.json())
                .then(data => {
                    // And lastly we'll re-render the basket so our changes will be reflected in the browser
                    updateBasket();
                })
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

// Format currency helper function
// Takes a value in cents as an integer and returns a formatted string
formatCurrency = (value) => {
    const wholeNumberz = value / 100;
    return wholeNumberz.toLocaleString('en-US', {
        currency: 'USD',
        minimumFractionDigits: 2,
        style: 'currency'
    });
};

// Calculate product price
calculateProductPrice = (amount, price, discount) => {
    // If there's no discount defined at all we can return early and not execute this code any further
    if (!discount) return amount * price;

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
        total = total + calculateProductPrice(amount, price, discount);
    });
    document.getElementById('total').innerHTML = formatCurrency(total);
};

// Control helper function; generates a button element
createControl = (id, type, text) => {
    const control = document.createElement('button');
    control.onclick = () => { changeProductAmount(id, type) };
    control.innerText = text;
    return control;
};

// Update basket
// Gets the data from the mock API and also takes care of displaying it.
// NOTE: In a real-world app the logic for getting and displaying data would be separated. Also, every little change
// currently causes an entire re-render, which isn't very efficient. A library such as React would help in this case,
// using its virtual DOM to diff changes with the actual DOM and re-render only the nodes that need updating.
updateBasket = () => {
    // Get new basket
    fetch('http://localhost:8081/products')
        .then(res => res.json())
        .then(data => {
            // Clear basket
            document.getElementById('basket').innerHTML = '';

            // Build product list
            data.map(product => {
                const { id, name, price, amount } = product;

                // Product details
                const productItem = document.createElement('li');
                productItem.innerText = `${name}: ${amount} * ${formatCurrency(price)} `;

                // Product controls
                const addButton = createControl(id, 'increase', '+ Add 1');
                const remButton = createControl(id, 'decrease', '- Remove 1');
                const delButton = createControl(id, 'delete', 'Delete from basket');

                // Display discount to the user
                const discountInfo = () => {
                    let discountEl = document.createElement('em');
                    if (product.discount) {
                        discountEl.innerText = ` ${product.discount[0]} for the price of ${product.discount[1]}!`;
                    }
                    return discountEl;
                };

                // Mount product to DOM
                if (amount > 0) {
                    document.getElementById('basket')
                        .appendChild(productItem)
                        .append(addButton, remButton, delButton, discountInfo());
                }
            });

            // Invoke total due update
            updateTotalDue(data);
        })
        .catch(err => console.error(err));
};

// Init
updateBasket();
