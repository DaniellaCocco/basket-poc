// Little helper function which takes care of the generation of a new basket every time the mock API is launched
const randomAmount = () => Math.floor(Math.random() * 10);

const data = {
  "products": [
    {
      "id": 1,
      "name": "Apples",
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
