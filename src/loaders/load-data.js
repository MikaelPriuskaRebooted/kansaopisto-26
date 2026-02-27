import { loadJSONFile } from "./load-json-file.js";


function toUrl(pathFromHere) {
    return new URL(pathFromHere, import.meta.url);
}

async function loadAndValidateArray({fileUrl, validateItem, label}) {
    const parsedData = await loadJSONFile(fileUrl);

    if(!parsedData.ok) {
        return { data: [], error: [`Error loading ${label} data: ${parsedData.error}`] };
    }

    if (!Array.isArray(parsedData.value)) {
        return { data: [], error: [`${label} data is not an array`] };
    }

    const data = [];
    const errors = [];

    parsedData.value.forEach((item, index) => {
        const validationResult = validateItem(item);

        if(validationResult.ok) {
            data.push(item);
        } else {
            errors.push(`${label} data is not valid array item at index ${index}: ${validationResult.errors.join(", ")}`);
        }
    });

    return { data, errors };
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