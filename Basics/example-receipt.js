function calculateLineTotal(item) {
    return item.price * item.quantity;
};

function calculateSubTotal(order) {
    let subTotal = 0;
    for (const item of order) {
        subTotal = subTotal + calculateLineTotal(item);
    }

    return subTotal;
};

function calculateTax(subTotal, itemTax) {
    if (typeof itemTax !== "number") {
        throw new Error("function calculateTax: Item tax must be a number");
    }

    return subTotal * itemTax;
};

calculateTax(100);

function calculateTotal(subTotal, taxAmount) {
    return subTotal + taxAmount;
};

function calculateReceipt(order, itemTax){
    const subTotal = calculateSubTotal(order);
    const taxAmount = calculateTax(subTotal, itemTax);
    const total = calculateTotal(subTotal, taxAmount);

    return {
        subTotal: subTotal,
        taxAmount: taxAmount,
        total: total,
    }
};

const order = [
    {
        name: "Coffee",
        price: 3.50,
        quantity: 2,
    },
    {
        name: "Tea",
        price: 2.50,
        quantity: 1,
    },
    {
        name: "Cake",
        price: 10.00,
        quantity: 1,
    },
    {
        name: "Water",
        price: 1.00,
        quantity: 1,
    },
]



const currencySymbol = "€";
const itemTax = 0.255;


const receipt = calculateReceipt(order, itemTax);

printReceipt(receipt, order, currencySymbol);

function formatCurrency(amount, currencySymbol) {
    return `${amount.toFixed(2)} ${currencySymbol}`
};


function printReceipt(receipt, order, symbol) {
    console.log("Receipt");
    console.log("--------------------------------");
    for (const item of order) {
        const lineTotal = calculateLineTotal(item);

        console.log(`${item.name} x ${item.quantity} = ${formatCurrency(lineTotal, symbol)}`)
        // Coffee x 2 = 7.00 €
    }
    console.log("--------------------------------");

    
    console.log(`Sub Total: ${formatCurrency(receipt.subTotal, symbol)}`)
    console.log(`Tax Amount: ${formatCurrency(receipt.taxAmount, symbol)}`)
    console.log(`Total: ${formatCurrency(receipt.total, symbol)}`)
};

