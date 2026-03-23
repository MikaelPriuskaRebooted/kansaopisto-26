import { loadProducts, loadCustomers, loadOrders } from "./loaders/load-data.js";
import { calculateSalesSummary } from "./calculations/revenue.js";
import { calculateTopSellingProducts } from "./calculations/top-selling-products.js";
import { VIP_THRESHOLDS } from "./configs/vip.js";
import { getUserPurchasesByTimeframe, getUserPurchases } from "./calculations/customer-sales.js";
import { getLowStockWarnings } from "./calculations/stock-warnings.js"
import { STOCK_THRESHOLDS } from "./configs/stock.js"
import { printLoadedResults, printLowStockWarnings, printSalesSummary, printTopSellingProducts, printUserPurchases } from "./display/print-information.js"


const temp = ["all", "sales", "top-products", "customer", "stock"]

const showErrors = true
const showErrorsLength = 5
const customerId = "C020"
const startDate = "2025-11-01"
const endDate = "2026-01-31"
const category = "Produce";
 
function printHelp() {}


async function run() {
    const orders = await loadOrders();
    const customers = await loadCustomers();
    const products = await loadProducts();

    printLoadedResults(orders, customers, products)

    const timeframe = {
        startDate: "2025-11-01",
        endDate: "2026-01-31",
    }
    const salesSummary = calculateSalesSummary(orders.data, products.data, timeframe);

    printSalesSummary(salesSummary, timeframe)


    const category = "Produce";

    const topProducts = calculateTopSellingProducts(orders.data, products.data, timeframe, category);

    printTopSellingProducts(topProducts, category)

    const customerId = "C020" // Emma Rantanen

    if (timeframe) {
        printUserPurchases(getUserPurchasesByTimeframe(customerId, orders.data, customers.data, products.data, timeframe, VIP_THRESHOLDS))
    } else {
        printUserPurchases(getUserPurchases(customerId, orders.data, customers.data, products.data, VIP_THRESHOLDS))
    }


    const lowStockReport = getLowStockWarnings({ products: products.data, 
                                                timeframe: timeframe, 
                                                orders: orders.data, 
                                                stockConfig: STOCK_THRESHOLDS, 
                                                category: undefined })

    printLowStockWarnings(lowStockReport)
}

run();
