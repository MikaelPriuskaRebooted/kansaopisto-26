const orders = [
  {
    id: "O1",
    customerId: "C001",
    status: "paid",
    items: [
      { productId: "P001", qty: 2 },
    ],
  },
  {
    id: "O2",
    customerId: "C001",
    status: "paid",
    items: [
      { productId: "P002", qty: 3 },
    ],
  },
  {
    id: "O3",
    customerId: "C001",
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

// Return total money spent by this customer from paid orders only.
function calculateCustomerSpending(customerId, orders, products) {

}

console.log(calculateCustomerSpending("C001", orders, products));

// Expected output:
// 29.6
