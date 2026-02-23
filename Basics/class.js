
class BankAccount {
    constructor(balance, owner) {
        this.balance = balance;
        this.owner = owner;
    }

    getBalance() {
        return this.balance;
    }

    setBalance(balance) {
        if(typeof balance !== "number") {
            throw new Error("Balance must be a number");
        }

        if(!Number.isFinite(balance)) {
            throw new Error("Balance must be a finite number");
        }

        if(balance < 0) {
            throw new Error("Balance must be greater than 0");
        }

        this.balance = balance;
    }

    deposit(amount) {
        this.balance = this.balance + amount;
    }

    withdraw(amount) {
        if (amount > this.balance) {
            throw new Error("Insufficient funds");
        }
        
        this.balance = this.balance - amount;
    }
}


class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return this.name;
    }
}

class Employee {
    constructor(name, hourlyRate) {
        this.name = name;
        this.hourlyRate = hourlyRate;
    }

    getDailyWage(hours = 7.5) {
        return this.hourlyRate * hours;
    }
}

class Developer extends Employee {
    constructor(name, hourlyRate, programmingLanguage) {
        super(name, hourlyRate);
        this.programmingLanguage = programmingLanguage;
    }

    getProfile() {
        return `Developer ${this.name} is a ${this.programmingLanguage} developer.`;
    }

    getDailyWage(hours = 7.5, bonus = 1.2) {
        this.getProfile();
        return super.getDailyWage(hours) * bonus;
    }
}

class TodoItem {
    constructor(title) {
        this.title = title;
        this._done = false;
    }

    toggle() {
        this._done = !this._done;
    }

    getDone() {
        return this._done;
    }

    setDone(done) {
        if (typeof done !== "boolean") {
            throw new Error("Done must be a boolean");
        }
        
        return this.title;
    }

    getStatus() {
        const status = this._done ? "done" : "not done";

        return `${this.title} is ${status}.`;
    }
}


const todoCoffee = new TodoItem("Buy coffee");
const todoTea = new TodoItem("Buy tea");

todoCoffee.toggle();

console.log(`Coffee is done: ${todoCoffee.getDone()}.`);
console.log(`Tea is done: ${todoTea.getDone()}.`);

console.log(todoCoffee.getStatus());
console.log(todoTea.getStatus());



class Product {
    constructor(name, price) {
        this.name = name;
        this._price = price;
        this._discountPercent = 0;
    }

    setPrice(price) {
        if(typeof price !== "number") {
            throw new Error("Price must be a number");
        }

        if(!Number.isFinite(price)) {
            throw new Error("Price must be a finite number");
        }

        if(price < 0) {
            throw new Error("Price must be greater than or equal to 0");
        }

        this._price = price;
    }

    setDiscountPercent(discountPercent) {
        if(typeof discountPercent !== "number") {
            throw new Error("Discount percent must be a number");
        }

        if(!Number.isFinite(discountPercent)) {
            throw new Error("Discount percent must be a finite number");
        }

        if(discountPercent < 0 || discountPercent > 100) {
            throw new Error("Discount percent must be between 0 and 100");
        }
        
        this._discountPercent = discountPercent;
    }

    getFinalPrice() {
        return this._price * (1 - this._discountPercent / 100);
    }

    getLabel() {
        return `${this.name}: ${this.getFinalPrice().toFixed(2)}€ (${this._discountPercent}% off)`;
    }
}