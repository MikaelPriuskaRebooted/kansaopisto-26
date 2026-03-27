const customer = {
  id: "C001",
  name: "Ella",
  email: "ella@example.com",
  vip: false,
};

const topProducts = [
  { productId: "P001", name: "Coffee", quantity: 5, totalRevenue: 42.5 },
  { productId: "P002", name: "Tea", quantity: 2, totalRevenue: 8.4 },
];

// Return one object with:
// customerId, name, email, vip, totalSpent, topProducts
//
// totalSpent should be calculated from topProducts.
function buildCustomerSummary(customer, topProducts) {

}

console.log(buildCustomerSummary(customer, topProducts));

// Expected output:
// {
//   customerId: "C001",
//   name: "Ella",
//   email: "ella@example.com",
//   vip: false,
//   totalSpent: 50.9,
//   topProducts: [
//     { productId: "P001", name: "Coffee", quantity: 5, totalRevenue: 42.5 },
//     { productId: "P002", name: "Tea", quantity: 2, totalRevenue: 8.4 }
//   ]
// }
