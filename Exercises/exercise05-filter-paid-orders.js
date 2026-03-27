const orders = [
  { id: "O1", status: "paid" },
  { id: "O2", status: "pending" },
  { id: "O3", status: "paid" },
  { id: "O4", status: "cancelled" },
];

// Return only the orders that have status "paid".
function getPaidOrders(orders) {

}

console.log(getPaidOrders(orders));

// Expected output:
// [
//   { id: "O1", status: "paid" },
//   { id: "O3", status: "paid" }
// ]
