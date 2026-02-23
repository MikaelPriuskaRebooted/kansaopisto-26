


function hasKey(value, key) {
    return key in value
}

function isObject(value) {
    return typeof value === "object" && value !== null
}

function isString(value) {
    return typeof value === "string"
}

function isDefinedString(value) {
    return isString(value) && value.length > 0
}

function isNumber(value) {
    return typeof value === "number"
}

function isEmail(value) {
    return isString(value) && value.includes("@")
}

const user = {
    name: "John",
    age: 20,
    email: "john@example.com",
}

const whatWeKnow = {
    name: "string",
    age: "number",
    email: "email",
}


 function isUser(user) {
    if (!isObject(user)) {
        return false;
    }

    if (!hasKey(user, "name")) {
        return false;
    }

    if (!hasKey(user, "age") ) {
        return false;
    }

    if (!hasKey(user, "email")) {
        return false;
    }

     if(isString(user.name) && isNumber(user.age) && isEmail(user.email)) {
        return true;
    } else {
        return false;
    }

 }

 function delay(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
 }

 async function fetchUser(scenario) {
    await delay(1000)


    if(scenario === "correct") {
        return {
            age: 20,
            name: "John",
            email: "John@Example.com",
        }
    }

    if(scenario === "emailMissing") {
        return {
            age: 20,
            name: "Jane",
            email: null,
        }
    }

    if (scenario === "userMissing") {
        return null;
    }

    if (scenario === "incorrectData") {

        return [
            "John",
            null,
        ]
    }

    throw new Error("User not found");
}

async function printUser() {
    try {
        console.log("Fetching user...");
        const fetchedUser = await fetchUser("correct");
        console.log("User fetched");

        if (isUser(fetchedUser)) {
            console.log(fetchedUser);
            console.log("Name: " + fetchedUser.name);
        } else {
            console.log("User is invalid");
        }

    } catch (error) {
        console.log("Error fetching user");
        console.log(error.message);
    }
}

printUser();