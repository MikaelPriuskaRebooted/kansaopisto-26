import { hasKey, isObject, isString, isNumber, isInteger } from "./guard-utilities.js";

function validateProduct(product) {

    const errors = [];

    // Checking if the object keys exist
    if (!hasKey(product, "id")) {   
        errors.push("Product id is required");
    }

    if (!hasKey(product, "name")) {
        errors.push("Product name is required");
    }

    if (!hasKey(product, "category")) {
        errors.push("Product category is required");
    }

    if (!hasKey(product, "price")) {
        errors.push("Product price is required");
    }

    if (!hasKey(product, "stock")) {
        errors.push("Product stock is required");
    }

    // Checking if the values are the correct type
    if (!isString(product.id)) {
        errors.push("Product id must be a string");
    }

    if (!isString(product.name)) {
        errors.push("Product name must be a string");
    }

    if (!isString(product.category)) {
        errors.push("Product category must be a string");
    }

    if (!isNumber(product.price)) {
        errors.push("Product price must be a number");
    }

    if (!isInteger(product.stock)) {
        errors.push("Product stock must be an integer");
    }


    const isValid = errors.length === 0;

    return { ok: isValid, errors };
}

function validateCustomer(customer) {
    const errors = [];

    // Checking if the object keys exist
    if (!hasKey(customer, "id")) {   
        errors.push("Customer id is required");
    }

    if (!hasKey(customer, "name")) {
        errors.push("Customer name is required");
    }

    if (!hasKey(customer, "email")) {
        errors.push("Customer email is required");
    }

    if (!hasKey(customer, "joinedAt")) {
        errors.push("Customer joinedAt is required");
    }

    if (!hasKey(customer, "vip")) {
        errors.push("Customer vip is required");
    }

    // Checking if the values are the correct type
    if (!isString(customer.id)) {
        errors.push("Customer id must be a string");
    }

    if (!isString(customer.name)) {
        errors.push("Customer name must be a string");
    }

    if (!isString(customer.email)) {
        errors.push("Customer email must be a string");
    }

    if (!isString(customer.joinedAt)) {
        errors.push("Customer joinedAt must be a string");
    }

    if (!isBoolean(customer.vip)) {
        errors.push("Customer vip must be a boolean");
    }


    const isValid = errors.length === 0;

    return { ok: isValid, errors };
}

function validateOrder(order) {
    const errors = [];

    // Checking if the object keys exist
    if (!hasKey(order, "id")) {   
        errors.push("Order id is required");
    }

    if (!hasKey(order, "customerId")) {   
        errors.push("Order customerId is required");
    }
    if (!hasKey(order, "createdAt")) {   
        errors.push("Order createdAt is required");
    }

    if (!hasKey(order, "status")) {   
        errors.push("Order status is required");
    }

    if (!hasKey(order, "items")) {   
        errors.push("Order items is required");
    }

    // Checking if the values are the correct type
    if (!isString(order.id)) {
        errors.push("Order id must be a string");
    }

    if (!isString(order.customerId)) {
        errors.push("Order customerId must be a string");
    }

    if (!isString(order.createdAt)) {
        errors.push("Order createdAt must be a string");
    }

    if (!isOrderStatus(order.status)) {
        errors.push("Order status must be a valid order status");
    }

    if (!isArray(order.items)) {
        errors.push("Order items must be an array");
    }

    if (Array.isArray(order.items)) {
        order.items.forEach((item) => {
            const validationResult = validateOrderItem(item);
            if (!validationResult.ok) {
                errors.push(`Order item at index ${index} is not valid: ${validationResult.errors.join(", ")}`);
            }
        });
    }


    const isValid = errors.length === 0;
    
    return { ok: isValid, errors };
}


function validateOrderItem(item) {
    const errors = [];

    // Checking if the object keys exist
    if (!hasKey(item, "productId")) {   
        errors.push("Order item productId is required");
    }

    if (!hasKey(item, "qty")) {   
        errors.push("Order item qty is required");
    }

    // Checking if the values are the correct type
    if (!isString(item.productId)) {
        errors.push("Order item productId must be a string");
    }

    if (!isNumber(item.qty)) {
        errors.push("Order item qty must be a number");
    }

    const isValid = errors.length === 0;

    return { ok: isValid, errors };
}

function isOrderStatus(status) {
    return status === "pending" || status === "paid"
}