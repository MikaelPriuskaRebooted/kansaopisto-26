export function buildProductLookup(products) {
    const productLookup = {};

    for (const product of products) {
        productLookup[product.id] = product;
    }

    return productLookup;
}

export function getProductSales(orders, productLookup, includeKeys) {
    const salesByProductId = {};

    for (const order of orders) {
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

    if (includeKeys) {
        return salesByProductId;
    }

    return Object.values(salesByProductId)
}

export function filterProductsByCategory(products, category) {
    if(!category) {
        return products;
    }

    return products.filter((product) => product.category === category);
}