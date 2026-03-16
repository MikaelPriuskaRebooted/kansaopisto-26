import { loadProducts, loadCustomers, loadOrders } from "./loaders/load-data.js";
import { calculateSalesSummary } from "./calculations/revenue.js";
import { calculateTopSellingProducts } from "./calculations/top-selling-products.js";
import { VIP_THRESHOLDS } from "./configs/vip.js";
import { getUserPurchasesByTimeframe, getUserPurchases } from "./calculations/customer-sales.js";

async function run() {
    const orders = await loadOrders();
    const customers = await loadCustomers();
    const products = await loadProducts();

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

    const timeframe = {
        startDate: "2026-01-01",
        endDate: "2026-01-31",
    }
    const salesSummary = calculateSalesSummary(orders.data, products.data, timeframe);

    console.log(`\nSales Summary for ${timeframe.startDate} - ${timeframe.endDate}:`);
    console.log(`Total revenue: ${salesSummary.revenue.toFixed(2)} €`);
    console.log("Orders statistics:\n")
    console.log(`Total orders: ${salesSummary.orderCounts.total}`);
    console.log(`Paid orders: ${salesSummary.orderCounts.paid}`);
    console.log(`Pending orders: ${salesSummary.orderCounts.pending}`);
    console.log(`Cancelled orders: ${salesSummary.orderCounts.cancelled}`);
    console.log(`Other orders: ${salesSummary.orderCounts.other}`);

    const category = "Produce";

    const topFiveProducts = calculateTopSellingProducts(orders.data, products.data, timeframe, category);

    console.log("\nTop 5 Selling Products:");
    for (const product of topFiveProducts) {
        console.log(`${product.productId} ${product.name} ${category ? "" : `(${category})`} - ${product.quantity} sold, ${product.totalRevenue.toFixed(2)} € revenue`)
    }

    const customerId = "C006" // Leo Heikkinen
    const customerPurchases = {}

    if (timeframe) {
        customerPurchases = getUserPurchasesByTimeframe(customerId, orders.data, customers.data, products.data, timeframe, VIP_THRESHOLDS);
    } else {
        customerPurchases = getUserPurchases(customerId, orders.data, customers.data, products.data, VIP_THRESHOLDS);
    }

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
        console.log(`Top Products: ${topProducts}`);
        console.log(`Unique Product Count: ${uniqueProductCount}`);
        console.log(`VIP Recommendation: ${vipRecommendation}`);

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

run();
