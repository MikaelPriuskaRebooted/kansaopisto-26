const orders = [
  { id: "O1", status: "paid" },
  { id: "O2", status: "paid" },
  { id: "O3", status: "pending" },
  { id: "O4", status: "cancelled" },
  { id: "O5", status: "unknown" },
];

// Return an object with counts for:
// total, paid, pending, cancelled, other
// Any status that is not "paid", "pending", or "cancelled" counts as "other".
function calculateOrderCounts(orders) {

}

console.log(calculateOrderCounts(orders));

// Expected output:
// {
//   total: 5,
//   paid: 2,
//   pending: 1,
//   cancelled: 1,
//   other: 1
// }
