import { validateArgs } from "../validators/validators.js"
import { parseBoolean } from "../transforms/simple-transform-utilities.js"

export function printHelp() {
    console.log("Usage:")
    console.log("node main.js --report=all --startDate=2025-11-01 --endDate=2026-01-31")
    console.log("Available arguments:")
    console.log("--report=all|sales|top-products|customer|stock")
    console.log("--startDate=YYYY-MM-DD")
    console.log("--endDate=YYYY-MM-DD")
    console.log("--category=CategoryName")
    console.log("--customerId=CustomerId")
    console.log("--showErrors=true|false")
    console.log("--showErrorsLength=10")
    console.log("--help")
}

export function parseCliArgs(argv) {
    const args = {
        report: "all",
        showErrors: true,
        showErrorsLength: 5,
        customerId: "C020",
        startDate: "2025-11-01",
        endDate: "2026-01-31",
        category: null,
        help: false
    }

    const error = []

    for (const argument of argv.slice(2)) {

        if (argument === "--help") {
            args.help = true;
            continue;
        }

        const [ rawKey, rawValue ] = argument.split("=")

        const normalizedKey = rawKey.slice(2)

        if (!normalizedKey) {
            error.push(`Missing value for argument: ${rawKey}`)
            continue;
        }

        switch (normalizedKey) {
            case "report":
                args.report = rawValue;
                break;
            case "showErrors":
                args.showErrors = parseBoolean(rawValue);
                break;
            case "showErrorsLength":
                args.showErrorsLength = Number(rawValue);
                break;
            case "customerId":
                args.customerId = rawValue;
                break;
            case "startDate":
                args.startDate = rawValue;
                break;
            case "endDate":
                args.endDate = rawValue;
                break;
            case "category":
                args.category = rawValue;
                break;
            default:
                error.push(`Unknown argument: ${rawKey}`)
                break;
        }
    }

    validateArgs(args, error)

    return { args: args, error: error}
}
