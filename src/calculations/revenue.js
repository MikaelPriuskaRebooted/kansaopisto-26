import { filterOrdersByTimeframe } from "./order-utilities.js";

export function calculateSalesSummary(orders, products, timeframe) {
    const filteredOrders = filterOrdersByTimeframe(orders, timeframe)

    const revenue = calculateRevenue(filteredOrders, products)
    const orderCounts = calculateOrderCounts(filteredOrders)

    return {
        revenue: revenue,
        orderCounts: orderCounts,
    }
}


function calculateRevenue(orders, products) {
   const paidOrders = orders.filter((order) => order.status === "paid")

   let totalRevenue = 0;

   for (const order of paidOrders) {
        for (const item of order.items) {

            const foundProduct = products.find((product) => product.id === item.productId)

            if (foundProduct) {
                const result = item.qty * foundProduct.price

                totalRevenue = totalRevenue + result;
            }
        }
   }

    return totalRevenue;
}

function calculateOrderCounts(orders) {
    let total = orders.length;
    let paid = 0;
    let pending = 0;
    let cancelled = 0;
    let other = 0;

    for (const order of orders) {
        if (order.status === "paid") {
            paid = paid + 1;
        } else if (order.status === "pending") {
            pending = pending + 1;
        } else if (order.status === "cancelled") {
            cancelled = cancelled + 1;
        } else {
            other = other + 1;
        }
    }

    return {
        total: total,
        paid: paid,
        pending: pending,
        cancelled: cancelled,
        other: other,
    }
}