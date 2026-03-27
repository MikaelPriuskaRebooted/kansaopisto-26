const product = {
  id: "P026",
  name: "Peanut Butter",
  category: "Pantry",
  stock: 2,
};

const averageMonthlySales = 5;
const config = {
  stockCoverageMonths: 1,
  minimumStock: 3,
};

// Return an object with:
// {
//   productId,
//   name,
//   category,
//   currentStock,
//   recommendedStock,
//   reorderAmount
// }
//
// recommendedStock should be the larger of:
// - minimumStock
// - averageMonthlySales * stockCoverageMonths (rounded up)
function buildStockWarning(product, averageMonthlySales, config) {

}

console.log(buildStockWarning(product, averageMonthlySales, config));

// Expected output:
// {
//   productId: "P026",
//   name: "Peanut Butter",
//   category: "Pantry",
//   currentStock: 2,
//   recommendedStock: 5,
//   reorderAmount: 3
// }
