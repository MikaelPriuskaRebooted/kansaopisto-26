const customerSummary = {
  totalSpent: 120,
  paidOrderCount: 3,
  uniqueProductsPurchased: 4,
  currentVip: false,
};

const vipConfig = {
  spendingThreshold: 80,
  orderCountThreshold: 2,
  uniqueProductsThreshold: 3,
  minimumRulesPassed: 2,
};

// Return an object:
// {
//   vip: true/false,
//   reasons: []
// }
//
// The three rules are:
// 1. totalSpent >= spendingThreshold → "Spending threshold reached"
// 2. paidOrderCount >= orderCountThreshold → "Order count threshold reached"
// 3. uniqueProductsPurchased >= uniqueProductsThreshold → "Unique products threshold reached"
//
// Add the reason string for each rule that passes.
// Recommend VIP if the number of passed rules is at least minimumRulesPassed.
function getVipRecommendation(customerSummary, vipConfig) {

}

console.log(getVipRecommendation(customerSummary, vipConfig));

// Expected output:
// {
//   vip: true,
//   reasons: [
//     "Spending threshold reached",
//     "Order count threshold reached",
//     "Unique products threshold reached"
//   ]
// }
