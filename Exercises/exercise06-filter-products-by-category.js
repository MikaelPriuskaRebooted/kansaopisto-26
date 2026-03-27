const products = [
  { id: "P001", name: "Coffee", category: "Beverages" },
  { id: "P002", name: "Tea", category: "Beverages" },
  { id: "P003", name: "Bread", category: "Bakery" },
];

// Return only the products that belong to the given category.
function filterProductsByCategory(products, category) {

}

console.log(filterProductsByCategory(products, "Beverages"));

// Expected output:
// [
//   { id: "P001", name: "Coffee", category: "Beverages" },
//   { id: "P002", name: "Tea", category: "Beverages" }
// ]
