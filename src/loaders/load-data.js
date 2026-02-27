import { loadJSONFile } from "./load-json-file.js";


function toUrl(pathFromHere) {
    return new URL(pathFromHere, import.meta.url);
}

async function loadAndValidateArray(filePath) {



}


export async function loadProducts() {
    return loadAndValidateArray({   
            fileUrl: toUrl("../data/products.json"), 
            validateItem: validateProduct, 
            label: "products"
        })
}

export async function loadCustomers() {
    return loadAndValidateArray({
        fileUrl: toUrl("../data/customers.json"), 
        validateItem: validateCustomer, 
        label:"customers"
    })
}

export async function loadOrders() {
    return loadAndValidateArray({
        fileUrl: toUrl("../data/orders.json"), 
        validateItem: validateOrder, 
        label:"orders"
    })
}