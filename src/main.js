import { loadProducts, loadCustomers, loadOrders } from "./loaders/load-data.js";
import { calculateSalesSummary } from "./calculations/revenue.js";

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
        startDate: "2026-01-01T00:00:00",
        endDate: "2026-01-31",
    }
    const salesSummary = calculateSalesSummary(orders.data, products.data, timeframe);
    console.log(salesSummary);
}

run();
