import { getPaidOrders, filterOrdersByTimeframe } from "./order-utilities.js";
import { buildProductLookup, getProductSales, filterProductsByCategory } from "./product-utilities.js";


function calculateAverageMonthlySales(soldQuantity, stockConfig) {

    if (stockConfig.monthsToAverage === 0) {
        throw Error("monthsToAverage configured incorrectly")
    }

    return soldQuantity / stockConfig.monthsToAverage 
}


function getWarningLevel(currentStock, recommendedStock, stockConfig) {
    const { outOfStock, critical, low } = stockConfig.tiers

    if (currentStock === 0) {
        return outOfStock.priority
    }

    const criticalThreshold = Math.ceil(recommendedStock * critical.threshold)

    if (currentStock <= criticalThreshold) {
        return critical.priority
    }

    const lowThreshold = Math.ceil(recommendedStock * low.threshold)

    if (currentStock <= lowThreshold) {
        return low.priority
    }

    return null
}

function calculateRecommendedStock(averageMonthlySales, stockConfig) {
    const stockBasedOnSales = Math.ceil(averageMonthlySales * stockConfig.stockCoverageMonths)

    return Math.max(stockConfig.minimumStock, stockBasedOnSales)
}


function calculateEstimatedDaysLeft(averageMonthlySales, currentStock) {
    const needForOneDay = averageMonthlySales / 30

    if (needForOneDay === 0) {
        return 0
    } 

    return Math.ceil(currentStock / needForOneDay)
}


function buildProductWarning(product, soldQuantity, stockConfig) {
    const { price: price_, ...restOfProduct } = product
    const currentStock = product.stock;
    const averageMonthlySales = calculateAverageMonthlySales(soldQuantity, stockConfig)
    const recommendedStock = calculateRecommendedStock(averageMonthlySales, stockConfig)
    const warningLevel = getWarningLevel(currentStock, recommendedStock, stockConfig);

    if (!warningLevel) {
        return null
    }

    const reorderAmount = Math.max(0, recommendedStock - currentStock);


    return {
        ...restOfProduct,
        soldQuantity: soldQuantity,
        averageMonthlySales: averageMonthlySales,
        recommendedStock: recommendedStock,
        reorderAmount: reorderAmount,
        estimatedDaysLeft: calculateEstimatedDaysLeft(averageMonthlySales, currentStock),
        warningLevel: warningLevel
    }
}

function sortWarningsByPriority(warnings) {
  return [...warnings].sort((a, b) =>{
    if (b.warningLevel !== a.warningLevel) {
       return b.warningLevel - a.warningLevel
    }
    return b.reorderAmount - a.reorderAmount
    }
)}

function getLookbackTimeframe(timeframe, stockConfig) {
    const lookbackMonths = stockConfig.monthsToAverage;
    const originalStartDate = new Date(timeframe.startDate)

    const planningStartDate = new Date(
        originalStartDate.getFullYear(),
        originalStartDate.getMonth(),
        1
    );

    const lookbackStartDate = new Date(
        planningStartDate.getFullYear(),
        planningStartDate.getMonth() - lookbackMonths,
        1,
    )

    const lookbackEndDate = new Date(
        planningStartDate.getFullYear(),
        planningStartDate.getMonth(),
        0
    )

    return {
        startDate: formatDate(lookbackStartDate),
        endDate: formatDate(lookbackEndDate),
    }
}

function formatDate(date) {
    return date.toISOString().split('T')[0];
}



export function getLowStockWarnings(props) {
    const { products, orders, timeframe, stockConfig, category } = props

    const lookbackTimeframe = getLookbackTimeframe(timeframe, stockConfig)

    const paidOrders = getPaidOrders(orders);
    const filteredOrders = filterOrdersByTimeframe(paidOrders, lookbackTimeframe);

    const filteredProducts = filterProductsByCategory(products, category);
    const productLookup = buildProductLookup(filteredProducts);
    const productSales = getProductSales(filteredOrders, productLookup, true);


    const warnings = [];

    for (const product of filteredProducts) {
        const soldQuantity = productSales[product.id]?.quantity ?? 0;
        
        const warning = buildProductWarning(product, soldQuantity, stockConfig)

        if (warning) {
            warnings.push(warning)
        }
    }


    return {
        warnings: sortWarningsByPriority(warnings),
        lookbackTimeframe: lookbackTimeframe,
        planningStartDate: timeframe.startDate,
    }
}

