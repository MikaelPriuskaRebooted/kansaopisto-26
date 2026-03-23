import { filterOrdersByTimeframe, getPaidOrders } from "./order-utilities.js";
import { buildProductLookup, getProductSales, filterProductsByCategory  } from "./product-utilities.js";


export function calculateTopSellingProducts(orders, products, timeframe, category) {
    const paidOrders = getPaidOrders(orders);
    const filteredOrders = filterOrdersByTimeframe(paidOrders, timeframe);

    const filteredProducts = filterProductsByCategory(products, category);
    const productLookup = buildProductLookup(filteredProducts);

    const productSales = getProductSales(filteredOrders, productLookup);


    return [...productSales].sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);
}



