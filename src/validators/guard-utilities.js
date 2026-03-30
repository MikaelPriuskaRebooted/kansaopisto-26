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

export function isPositiveNumber(value) {
    return isNumber(value) && value >= 0
}

export function isBoolean(value) {
    return typeof value === "boolean"
}

export function isInteger(value) {
    return Number.isInteger(value)
}

export function isNull(value) {
    return typeof value === "object" && value === null
}

export function isDefinedSting(value) {
    return isString(value) && value.length > 0
}

export function isValidDateString(value) {
    if (!isString(value)) {
        return false
    }

    if (value.length !== 10) {
        return false
    }

    if (value[4] !== "-" || value[7] !== "-") {
        return false
    }

    return true
}