export const STOCK_THRESHOLDS = {
    monthsToAverage: 1,
    stockCoverageMonths: 1,
    minimumStock: 3,
    tiers: {
        outOfStock: {
            priority: 3,
        },
        critical: {
            priority: 2,
            threshold: 0.5,
        },
        low: {
            priority: 1,
            threshold: 1,
        }
    }
}