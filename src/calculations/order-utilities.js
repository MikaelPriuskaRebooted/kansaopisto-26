export function filterOrdersByTimeframe(orders, timeframe) {
    return orders.filter((order) => isDateBetween(order.createdAt, timeframe))
}


export function isDateBetween(date, timeframe) {
    const startDateNormalized = `${timeframe.startDate}T00:00:00`;
    const endDateNormalized = `${timeframe.endDate}T23:59:59`;

    if (date >= startDateNormalized && date <= endDateNormalized) {
        return true;
    }

    return false;
}

export function getPaidOrders(orders) {
    return orders.filter((order) => order.status === "paid");
}

