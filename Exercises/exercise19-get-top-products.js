const productSales = [
  { productId: "P001", name: "Coffee", totalRevenue: 42.5 },
  { productId: "P002", name: "Tea", totalRevenue: 4.2 },
  { productId: "P003", name: "Bread", totalRevenue: 18.0 },
  { productId: "P004", name: "Milk", totalRevenue: 12.0 },
];

// Return the top N products sorted by totalRevenue descending.
function getTopProducts(productSales, limit) {

}

console.log(getTopProducts(productSales, 3));

// Expected output:
// [
//   { productId: "P001", name: "Coffee", totalRevenue: 42.5 },
//   { productId: "P003", name: "Bread", totalRevenue: 18.0 },
//   { productId: "P004", name: "Milk", totalRevenue: 12.0 }
// ]
