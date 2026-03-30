import { hasKey, isString, isNumber, isInteger, isBoolean, isValidDateString, isPositiveNumber, isNull, isDefinedSting } from "./guard-utilities.js";


export function validateProduct(product) {

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


    if (product.stock < 0) {
        errors.push("Product stock must be positive number");
    }

    if (product.price < 0) {
        errors.push("Product price must be positive number");
    }

    const isValid = errors.length === 0;

    return { ok: isValid, errors };
}

export function validateCustomer(customer) {
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

    if (!customer.email.includes("@")) {
        errors.push("Customer email must include @ mark")
    }

    const isValid = errors.length === 0;

    return { ok: isValid, errors };
}

export function validateOrder(order) {
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

    if (!Array.isArray(order.items)) {
        errors.push("Order items must be an array");
    }

    if (Array.isArray(order.items)) {
        order.items.forEach((item, index) => {
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

    if (item.qty <= 0) {
        errors.push("Order item qty must be a positive number");
    }

    const isValid = errors.length === 0;

    return { ok: isValid, errors };
}

function isOrderStatus(status) {
    return status === "pending" || status === "paid"
}

export function validateArgs(args, error) {
    const validReports = ["all", "sales", "top-products", "customer", "stock"]

    if (!validReports.includes(args.report)) {
        error.push(`Invalid report: ${args.report}`)
    }

    if (!isPositiveNumber(args.showErrorsLength)) {
        error.push(`Invalid show errors length: ${args.showErrorsLength}`)
    }

    if (!isString(args.customerId) || args.customerId.length < 4) {
        error.push(`Invalid customer ID: ${args.customerId}`)
    }


    if (!isNull(args.category) && !isDefinedSting(args.category)) {
        error.push(`Invalid category: ${args.category}`)
    }

    if (!isValidDateString(args.startDate)) {
        error.push(`Invalid start date: ${args.startDate}`)
    }

    if (!isValidDateString(args.endDate)) {
        error.push(`Invalid end date: ${args.endDate}`)
    }
}