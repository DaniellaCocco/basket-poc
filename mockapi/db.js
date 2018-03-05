// Little helper function which takes care of the generation of a new basket every time the mock API is launched
const randomAmount = () => Math.floor(Math.random() * 10);

// NOTE: This isn't a "proper" schema since most of the product details are fixed and don't need to be generated.
// If we were to generate basket contents entirely, including product names, prices, etc then a fully fledged JSON schema
// would have been helpful. Other helpful libs would have been:
// - JSON Schema Faker: https://github.com/json-schema-faker/json-schema-faker
// - Faker.js: https://github.com/marak/Faker.js
// - Chance.js: https://github.com/chancejs/chancejs
// However for the basic purpose of generating a random "basket" simply randomising the 'amount' key will do for now.
const data = {
  // NOTE: In a real-world app you'd have separate endpoints for the basket and the products. The basket would then only
  // contain the id's of the products and refer to the products that way.
  "products": [
    {
      "id": 1,
      "name": "Apples",
      // NOTE: Assuming a real DB would store monetary values in cents so as to use integers.
      // We have a formatCurrency() helper function defined in script.js for prettier display to the end user.
      "price": 25,
      "discount": null,
      "amount": randomAmount()
    },
    {
      "id": 2,
      "name": "Bananas",
      "price": 10,
      "discount": null,
      "amount": randomAmount()
    },
    {
      "id": 3,
      "name": "Kiwis",
      "price": 15,
      // NOTE: The 'discount' array of [5,3] means "5 for the price of 3". This is a little cryptic; in a real-world app
      // you'd use two separate, appropriately named keys to improve code maintainability as well as readability. It's
      // also not as stable as you'd want it to be because the exact order the array would change its meaning significantly,
      // and is something that could easily change without being noticed, causing hard-to-trace bugs.
      "discount": [
        5,
        3
      ],
      "amount": randomAmount()
    },
    {
      "id": 4,
      "name": "Oranges",
      "price": 30,
      "discount": null,
      "amount": randomAmount()
    },
    {
      "id": 5,
      "name": "Papayas",
      "price": 50,
      "discount": [
        3,
        2
      ],
      "amount": randomAmount()
    }
  ]
};

module.exports = () => {
    return data;
};
