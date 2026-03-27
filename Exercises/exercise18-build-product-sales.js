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
    status: "paid",
    items: [
      { productId: "P001", qty: 3 },
    ],
  },
];

const products = [
  { id: "P001", name: "Coffee", category: "Beverages", price: 8.5 },
  { id: "P002", name: "Tea", category: "Beverages", price: 4.2 },
];

// Return an array where each product has:
// productId, name, category, quantity, totalRevenue
function buildProductSales(orders, products) {

}

console.log(buildProductSales(orders, products));

// Expected output:
// [
//   {
//     productId: "P001",
//     name: "Coffee",
//     category: "Beverages",
//     quantity: 5,
//     totalRevenue: 42.5
//   },
//   {
//     productId: "P002",
//     name: "Tea",
//     category: "Beverages",
//     quantity: 1,
//     totalRevenue: 4.2
//   }
// ]
