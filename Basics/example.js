const birthYear = 2012; 
const currentYear = 2026;

const hobbies = ["reading", "writing", "coding", "gaming"];

const placeOfLiving = {
    "streetAddress": {
        "street": "123 Main St",
        "houseNumber": "123",
    },
    "city": "New York",
    "state": "NY",
    "zipCode": "10001", 
    "country": "USA"
};

const age = currentYear - birthYear;

const user = {
    name: {
        firstName: "John",
        lastName: "Doe",
        middleName: "Smith",
        nickName: "Johny",
    },
    birthYearData: {
        year: birthYear,
        age: age,
    },
    hobbies: hobbies,
    placeOfLiving: placeOfLiving,
};

const { streetAddress } = user.placeOfLiving;

const { hobbies: _hobbies, ...rest } = user;

user.birthYearData.age = 20;

const userUpdated = {
    ...rest,
    name: {
        ...rest.name,
        nickName: "Johny",
    },
    hobbies: ["reading", "writing", "coding", "gaming", "cooking"],
}

console.log(`Hello! ${user.name.nickName}! Your current age is ${age} years old. You live at ${streetAddress.street}.`);

const {age: userAge } = user.birthYearData;

function checkAge(userAge) {
    let result = "";

    if (userAge >= 18 && userAge <= 65) {
        result = "You are an adult.";
    } else if (userAge <= 16) {
        result = "You are a teenager.";
    } else if (userAge <= 12) {
        result = "You are a child.";
    } else {
        result = "You are a senior.";
    }

    return result;
};


let i = 0;
while (i < 10) {
    console.log(checkAge(age));
    i = i + 1;
}

for (let i = 0; i < 10; i = i + 1) {
    console.log(checkAge(age));
} 

for (const hobby of hobbies) {
    console.log(hobby);
}