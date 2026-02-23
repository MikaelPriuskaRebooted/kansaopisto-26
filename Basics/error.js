const name = "John";
const age = 20;
const isRegistered = true;

let isEmployee;
const email = "";
const hobbies = [];
const address = {}

const users = [
    {
        name: "John",
        age: 20,
        isRegistered: true,
        email: {
            provider: "gmail",
            address: "john@gmail.com",
        },
    }
]


function fetchUser(userId) {
    if(userId === 1) {
        return {
            id: 1,
            name: "John",
            email: "John@Example.com",
        }
    }

    if(userId === 2) {
        return {
            id: 2,
            name: "Jane",
            email: null ?? "Not set",
        }
    }

    if (userId === 3) {
        return null;
    }

    throw new Error("User not found");
}




function getUserData(){
        let user;
        try {
            user = fetchUser(2);
        } catch (error) {
            if(error instanceof Error) {
                console.log(error?.message);
            }
        }

        const safeUserName = user?.name ?? "Not set";
        const safeUserEmail = user?.email ?? "Not set";

    return {
        name: safeUserName,
        email: safeUserEmail,
        isAdmin: null,
        
    };
}

const finalUser = getUserData(2);
console.log(`${finalUser.name ?? ""} - ${finalUser.email ?? ""} - ${null}`);
