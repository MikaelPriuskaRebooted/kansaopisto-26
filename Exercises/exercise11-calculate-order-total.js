const order = {
  id: "O100",
  items: [
    { productId: "P001", qty: 2 },
    { productId: "P002", qty: 1 },
  ],
};

const products = [
  { id: "P001", name: "Coffee", price: 8.5 },
  { id: "P002", name: "Tea", price: 4.2 },
];

// Return the total value of the order.
// Ignore items whose product cannot be found.
function calculateOrderTotal(order, products) {

}

console.log(calculateOrderTotal(order, products));

// Expected output:
// 21.2
