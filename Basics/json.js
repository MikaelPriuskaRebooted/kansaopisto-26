import data from "./data.json" with { type: "json" };
import { hasKey, isObject, isString, isNumber } from "./utilities.js";


function getProductData() {
    return JSON.stringify(data);
}


function safeJSONParse(jsonString) {
    try {
        return { success: true, data: JSON.parse(jsonString)};
    } catch (error) {
        return { success: false, data: null, error: error.message};
    }
}

function isInventoryData(user) {
    if (!isObject(user)) {
        return false;
    }

    if (!hasKey(user, "sku")) {
        return false;
    }

    if (!hasKey(user, "name")) {
        return false;
    }

    if (!hasKey(user, "price") ) {
        return false;
    }

    if (!hasKey(user, "quantity") ) {
        return false;
    }

     if(isString(user.sku) && isString(user.name) && isNumber(user.price) && isNumber(user.quantity)) {
        return true;
    } else {
        return false;
    }
 }


function buildInventoryReport(parsedData) {
    const filteredData = parsedData.data.filter(isInventoryData);
    const totalValue = filteredData.reduce((total, item) => total + item.price * item.quantity, 0);
    const lowStockItems = filteredData.filter(item => item.quantity < 2)
    const namesSortedNames = filteredData.map(item => item.name).sort((a, b) => a.localeCompare(b));


    return {
        totalItems: filteredData.length,
        validItemsCount: filteredData.length,
        invalidItemsCount: parsedData.data.length - filteredData.length,
        totalValue: totalValue,
        lowStockItems: lowStockItems,
        namesSortedNames: namesSortedNames,
        filteredData: filteredData,
    }
}

function printInventoryReport(inventoryReport) {
    const { totalItems, namesSortedNames, validItemsCount, invalidItemsCount, totalValue, lowStockItems } = inventoryReport;


    console.log("Inventory Report")
    console.log("--------------------------------")
    console.log(`Total Items: ${totalItems}`)
    console.log(`Names Names: ${namesSortedNames}`)
    console.log(`Valid Items Count: ${validItemsCount}`)
    console.log(`Invalid Items Count: ${invalidItemsCount}`)
    console.log(`Total Value: ${totalValue}`)
    console.log(`Low Stock Items: ${lowStockItems.map(item => item.sku).join(", ")}`)
}


function runInventoryReport() {
    const jsonString = getProductData();
    const parsedData = safeJSONParse(jsonString);

    if (!parsedData.success && parsedData.data === null && !Array.isArray(parsedData.data)) {
        console.log(parsedData.error);
        return;
    }

    const inventoryReport = buildInventoryReport(parsedData);
    printInventoryReport(inventoryReport);
}

runInventoryReport();
