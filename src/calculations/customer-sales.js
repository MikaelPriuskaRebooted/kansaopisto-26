import { filterOrdersByTimeframe } from "./order-utilities.js";
import { getPaidOrders } from "./order-utilities.js";

export function getUserPurchasesByTimeframe(customerId, orders, customers, products, timeframe, vipConfig) {
    const filteredOrders = filterOrdersByTimeframe(orders, timeframe);

    return getUserPurchases(customerId, filteredOrders, customers, products, vipConfig);
}

export function getUserPurchases(customerId, orders, customers, products, vipConfig) {
    const foundCustomer = customers.find((customer) => customer.id === customerId);

    if (!foundCustomer) {
        return {
            ok: false,
            errors: [`Customer with id ${customerId} not found`],
        }
    }

    const paidCustomerOrders = getPaidCustomerOrders(customerId, orders);

    const productLookup = buildProductLookup(products);
    const customerProductSales = getProductSales(paidCustomerOrders, productLookup);

    const totalSpending = calculateTotalSpending(customerProductSales);
    const topProducts = getTopProducts(customerProductSales, 5);
    const totalPaidOrders = paidCustomerOrders.length;

    const summary = {
        name: foundCustomer.name,
        customerId: foundCustomer.id,
        email: foundCustomer.email,
        vip: foundCustomer.vip,
        totalSpending: totalSpending,
        totalPaidOrders: totalPaidOrders,
        topProducts: topProducts,
        uniqueProductCount: customerProductSales.length,
    }

    const vipRecommendation = getVipRecommendation(vipConfig, summary);

    return {
        ok: true,
        data: { ...summary, vipRecommendation: vipRecommendation },
    }
}


function getVipRecommendation (vipConfig, summary) {
    const { spendingThreshold, orderCountThreshold, uniqueProductsThreshold } = vipConfig;
    const { totalSpending, totalPaidOrders, topProducts, uniqueProductCount } = summary;

    if (summary.vip) {
        return {
            vip: false,
            label: "Already VIP",
            reasons: ["Customer is already a VIP"],
        }
    }

    const reasons = [];
    let rulesPassed = 0;


    if (totalSpending >= spendingThreshold) {
        rulesPassed++;
    } else {
        reasons.push(`You have spent ${totalSpending}€, but the threshold is ${spendingThreshold}€`);
    }

    if (totalPaidOrders >= orderCountThreshold) {
        rulesPassed++;
    } else {
        reasons.push(`You have made ${totalPaidOrders} paid orders, but the threshold is ${orderCountThreshold}`);
    }

    if (uniqueProductCount >= uniqueProductsThreshold) {
        rulesPassed++;
    } else {
        reasons.push(`You have purchased ${uniqueProductCount} unique products, but the threshold is ${uniqueProductsThreshold} products`);
    }

    const vipRecommendation = rulesPassed >= vipConfig.minimumRulesPassed;

    return {
        vip: vipRecommendation,
        label: vipRecommendation ? "Recommended for VIP" : "Not recommended for VIP",
        reasons: reasons,
    }

}

function getTopProducts (purchases, threshold) {
    const sortedPurchases = [...purchases].sort((a, b) => b.totalRevenue - a.totalRevenue);

    return sortedPurchases.slice(0, threshold);
}

const temp = [{
    name: product.name,
    productId: product.id,
    category: product.category,
    quantity: 2,
    totalRevenue: 100,
}]

function calculateTotalSpending(productSales) {
    let totalSpending = 0;

    for (const sale of productSales) {
        totalSpending = totalSpending + sale.totalRevenue
    }

    return totalSpending;
}

function getPaidCustomerOrders(customerId, orders) {
    const paidOrders = getPaidOrders(orders);

    return paidOrders.filter((order) => order.customerId === customerId);
}

