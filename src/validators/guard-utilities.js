export function hasKey(value, key) {
    return key in value
}

export function isObject(value) {
    return typeof value === "object" && value !== null
}

export function isString(value) {
    return typeof value === "string"
}

export function isNumber(value) {
    return typeof value === "number" && Number.isFinite(value)
}

export function isBoolean(value) {
    return typeof value === "boolean"
}

export function isInteger(value) {
    return Number.isInteger(value)
}