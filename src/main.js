import { loadProducts, loadCustomers, loadOrders } from "./loaders/load-data.js";
import { calculateSalesSummary } from "./calculations/revenue.js";
import { calculateTopSellingProducts } from "./calculations/top-selling-products.js";
import { VIP_THRESHOLDS } from "./configs/vip.js";
import { getUserPurchasesByTimeframe, getUserPurchases } from "./calculations/customer-sales.js";
import { getLowStockWarnings } from "./calculations/stock-warnings.js"
import { STOCK_THRESHOLDS } from "./configs/stock.js"
import { printLoadedResults, printLowStockWarnings, printSalesSummary, printTopSellingProducts, printUserPurchases } from "./display/print-information.js"
import { parseCliArgs, printHelp } from "./cli/console-arguments.js"

async function run() {
    const { args, error: cliErrors } = parseCliArgs(process.argv)

    if (args.help) {
        printHelp();
        return;
    }

    if (cliErrors.length > 0) {
        console.log("CLI errors:")
        console.log(cliErrors.join("\n"))
        printHelp();
        return;
    }

    const orders = await loadOrders();
    const customers = await loadCustomers();
    const products = await loadProducts();

    printLoadedResults(orders, customers, products, args.showErrors, args.showErrorsLength)

    const timeframe = {
        startDate: args.startDate,
        endDate: args.endDate,
    }

    if (args.report === "sales" || args.report === "all") {
        const salesSummary = calculateSalesSummary(orders.data, products.data, timeframe);

        printSalesSummary(salesSummary, timeframe)
    }


    if ( args.report === "top-products" || args.report === "all") {
        const topProducts = calculateTopSellingProducts(orders.data, products.data, timeframe, args.category);

        printTopSellingProducts(topProducts, args.category)
    }

    if (args.report === "customer" || args.report === "all") { 
        if (timeframe) {
            printUserPurchases(getUserPurchasesByTimeframe(args.customerId, orders.data, customers.data, products.data, timeframe, VIP_THRESHOLDS))
        } else {
            printUserPurchases(getUserPurchases(args.customerId, orders.data, customers.data, products.data, VIP_THRESHOLDS))
        }
    }

    if (args.report === "stock" || args.report === "all") { 
        const lowStockReport = getLowStockWarnings({ products: products.data, 
                                                    timeframe: timeframe, 
                                                    orders: orders.data, 
                                                    stockConfig: STOCK_THRESHOLDS, 
                                                    category: args.category })

        printLowStockWarnings(lowStockReport)
    }


}

run();
