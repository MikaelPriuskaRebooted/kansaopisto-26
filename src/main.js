import { loadProducts, loadCustomers, loadOrders } from "./loaders/load-data.js";
import { calculateSalesSummary } from "./calculations/revenue.js";
import { calculateTopSellingProducts } from "./calculations/top-selling-products.js";
import { VIP_THRESHOLDS } from "./configs/vip.js";
import { getUserPurchasesByTimeframe, getUserPurchases } from "./calculations/customer-sales.js";
import { getLowStockWarnings } from "./calculations/stock-warnings.js"
import { STOCK_THRESHOLDS } from "./configs/stock.js"
import { isPositiveNumber } from "./validators/guard-utilities.js"
import { printLoadedResults, printLowStockWarnings, printSalesSummary, printTopSellingProducts, printUserPurchases } from "./display/print-information.js"


function printHelp() {
    console.log("Usage:")
    console.log("node main.js --report=all --startDate=2025-11-01 --endDate=2026-01-31")
    console.log("Available arguments:")
    console.log("--report=all|sales|top-products|customer|stock")
    console.log("--startDate=YYYY-MM-DD")
    console.log("--endDate=YYYY-MM-DD")
    console.log("--category=CategoryName")
    console.log("--customerId=CustomerId")
    console.log("--showErrors=true|false")
    console.log("--showErrorsLength=10")
    console.log("--help")
}

function parseCliArgs(argv) {
    const args = {
        report: "all",
        showErrors: true,
        showErrorsLength: 5,
        customerId: "C020",
        startDate: "2025-11-01",
        endDate: "2026-01-31",
        category: null,
        help: false
    }

    const error = []

    console.log()

    for (const argument of argv.slice(2)) {

        if (argument === "--help") {
            args.help = true;
            continue;
        }


        const [ rawKey, rawValue ] = argument.split("=")

        
        console.log("rawKey", rawKey)
        console.log("rawValue", rawValue)

        if (!rawValue) {
            error.push(`Missing value for argument: ${rawKey}`)
            continue;
        }


        switch (rawKey) {
            case "report":
                args.report = rawValue;
                break;
            case "showErrors":
                args.showErrors = parseBoolean(rawValue);
                break;
            case "showErrorsLength":
                args.showErrorsLength = rawValue;
                break;
            case "customerId":
                args.customerId = rawValue;
                break;
            case "startDate":
                args.startDate = rawValue;
                break;
            case "endDate":
                args.endDate = rawValue;
                break;
            case "category":
                args.category = rawValue;
                break;
            default:
                error.push(`Unknown argument: ${rawKey}`)
                break;
        }
    }

    validateArgs(args, error)

    return { args: args, error: error}
}


function validateArgs(args, error) {
    const validReports = ["all", "sales", "top-products", "customer", "stock"]

    if (!validReports.includes(args.report)) {
        error.push(`Invalid report: ${args.report}`)
    }

    if (!isPositiveNumber(args.showErrorsLength)) {
        error.push(`Invalid show errors length: ${args.showErrorsLength}`)
    }

    if (!isString(args.customerId) || args.customerId.length < 4) {
        error.push(`Invalid customer ID: ${args.customerId}`)
    }

    if (!isString(args.category) || args.category.length === 0) {
        error.push(`Invalid category: ${args.category}`)
    }

    if (!isValidDateString(args.startDate)) {
        error.push(`Invalid start date: ${args.startDate}`)
    }

    if (!isValidDateString(args.endDate)) {
        error.push(`Invalid end date: ${args.endDate}`)
    }
}

function isValidDateString(value) {
    if (!isString(value)) {
        return false
    }

    if (value.length !== 10) {
        return false
    }

    if (value[4] !== "-" || value[7] !== "-") {
        return false
    }

    return true
}

function parseBoolean(value,) {
    if (value === "true") {
        return true
    }
    if (value === "false") {
        return false
    }

    return false
}



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
