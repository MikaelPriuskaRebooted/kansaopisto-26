const orders = [
  {
    id: "O1",
    status: "paid",
    items: [
      { productId: "P001", qty: 2 },
      { productId: "P002", qty: 1 },
    ],
  },
  {
    id: "O2",
    status: "pending",
    items: [
      { productId: "P001", qty: 1 },
    ],
  },
];

const products = [
  { id: "P001", name: "Coffee", price: 8.5 },
  { id: "P002", name: "Tea", price: 4.2 },
];

// Return the total revenue from paid orders only.
function calculateRevenue(orders, products) {

}

console.log(calculateRevenue(orders, products));

// Expected output:
// 21.2
