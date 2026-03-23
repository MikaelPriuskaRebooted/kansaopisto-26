
export function printLoadedResults(orders, customers, products) {
    console.log("LOADED RESULTS");
    console.log(`Orders: ${orders.data.length} valid, ${orders.errors.length} errors`)
    console.log(`Customers: ${customers.data.length} valid, ${customers.errors.length} errors`)
    console.log(`Products: ${products.data.length} valid, ${products.errors.length} errors`)


    const allErrors = [
        ...orders.errors,
        ...customers.errors,
        ...products.errors,
    ]

    console.log("\nErrors:");
    console.log(allErrors.join("\n"));
}

export function printSalesSummary(salesSummary, timeframe) {
    console.log(`\nSales Summary for ${timeframe.startDate} - ${timeframe.endDate}:`);
    console.log(`Total revenue: ${salesSummary.revenue.toFixed(2)} €`);
    console.log("Orders statistics:\n")
    console.log(`Total orders: ${salesSummary.orderCounts.total}`);
    console.log(`Paid orders: ${salesSummary.orderCounts.paid}`);
    console.log(`Pending orders: ${salesSummary.orderCounts.pending}`);
    console.log(`Cancelled orders: ${salesSummary.orderCounts.cancelled}`);
    console.log(`Other orders: ${salesSummary.orderCounts.other}`);
}

export function printTopSellingProducts(topProducts, category) {
    console.log("\nTop 5 Selling Products:");
    for (const product of topProducts) {
        console.log(`${product.productId} ${product.name} ${category ? "" : `(${category})`} - ${product.quantity} sold, ${product.totalRevenue.toFixed(2)} € revenue`)
    }
}

export function printUserPurchases(customerPurchases) {
    const { ok, data, errors } = customerPurchases;

    if (ok) {
        const { name, 
                customerId, 
                email, 
                vip, 
                totalSpending, 
                totalPaidOrders, 
                topProducts, 
                uniqueProductCount, 
                vipRecommendation } = data;

        console.log("\nCustomer Purchases:");
        console.log(`Name: ${name}`);
        console.log(`Customer ID: ${customerId}`);
        console.log(`Email: ${email}`);
        console.log(`VIP: ${vip}`);
        console.log(`Total Spending: ${totalSpending}`);
        console.log(`Total Paid Orders: ${totalPaidOrders}`);
        console.log(`Unique Product Count: ${uniqueProductCount}`);
        console.log(`VIP Recommendation: ${vipRecommendation.label}`);

        if (!vipRecommendation.vip && !vip) {
            console.log(vipRecommendation.reasons.join("\n"));
        }

        console.log("\nTop Products:");
        for (const product of topProducts) {
            console.log(`${product.productId} ${product.name} - ${product.quantity} sold, ${product.totalRevenue.toFixed(2)} € revenue`);
        }

    } else {
        console.log("\nErrors:");
        console.log(errors.join("\n"));
    }
}

export function printLowStockWarnings(lowStockReport) {
    console.log("\nLow stock warnings:")
    console.log(`Report for starting date: ${lowStockReport.planningStartDate}`)

    if (lowStockReport.warnings.length === 0) {
        console.log("No low stock items.")
    } else {

        for (const warning of lowStockReport.warnings ) {
            const { stock, 
                    name, 
                    id, 
                    category, 
                    warningLevel, 
                    estimatedDaysLeft, 
                    reorderAmount } = warning

                    console.log(`\nName: ${name}, ID: ${id}, Stock: ${stock}, Category: ${category}}`)
                    console.log(`Priority: ${warningLevel}, Estimated time left for stock: ${estimatedDaysLeft} Order new stock: ${reorderAmount}`)

        }
    }
}