import { filterOrdersByTimeframe } from "./order-utilities.js";

export function calculateTopSellingProducts(orders, products, timeframe, category) {
    const paidOrders = getPaidOrders(orders);
    const filteredOrders = filterOrdersByTimeframe(paidOrders, timeframe);

    const filteredProducts = filterProductsByCategory(products, category);
    const productLookup = buildProductLookup(filteredProducts);

    const salesByProductId = {};

    for (const order of filteredOrders) {
        for (const item of order.items) {
            const product = productLookup[item.productId]

            if (product) {
                if (!salesByProductId[product.id]) {
                    salesByProductId[product.id] = {
                        name: product.name,
                        productId: product.id,
                        category: product.category,
                        quantity: 0,
                        totalRevenue: 0,
                    }
                }

                salesByProductId[product.id].quantity += item.qty;
                salesByProductId[product.id].totalRevenue += (item.qty * product.price)
            }
        }
    }

    return Object.values(salesByProductId).sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);
}

function buildProductLookup(products) {
    const productLookup = {};

    for (const product of products) {
        productLookup[product.id] = product;
    }

    return productLookup;
}

function getPaidOrders(orders) {
    return orders.filter((order) => order.status === "paid");
}

function filterProductsByCategory(products, category) {
    if(!category) {
        return products;
    }

    return products.filter((product) => product.category === category);
}