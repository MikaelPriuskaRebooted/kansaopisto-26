const orders = [
  { id: "O1", createdAt: "2026-01-05T10:00:00" },
  { id: "O2", createdAt: "2026-01-20T15:00:00" },
  { id: "O3", createdAt: "2026-02-02T09:00:00" },
];

const timeframe = {
  startDate: "2026-01-01",
  endDate: "2026-01-31",
};

// Return only the orders whose createdAt is inside the timeframe.
// Hint: compare only the date portion (first 10 characters) of createdAt.
function filterOrdersByTimeframe(orders, timeframe) {

}

console.log(filterOrdersByTimeframe(orders, timeframe));

// Expected output:
// [
//   { id: "O1", createdAt: "2026-01-05T10:00:00" },
//   { id: "O2", createdAt: "2026-01-20T15:00:00" }
// ]
