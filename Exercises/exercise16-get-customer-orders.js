const orders = [
  { id: "O1", customerId: "C001" },
  { id: "O2", customerId: "C002" },
  { id: "O3", customerId: "C001" },
];

// Return only the orders that belong to the given customer ID.
function getCustomerOrders(orders, customerId) {

}

console.log(getCustomerOrders(orders, "C001"));

// Expected output:
// [
//   { id: "O1", customerId: "C001" },
//   { id: "O3", customerId: "C001" }
// ]
