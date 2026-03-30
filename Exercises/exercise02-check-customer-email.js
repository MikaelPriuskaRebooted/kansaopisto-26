const customer = {
  id: "C002",
  name: "Leo Heikkinen",
  email: "",
  vip: false,
};

// Return true if the customer has a non-empty email, otherwise false.
function hasEmail(customer) {
  return "email" in customer && typeof customer.email === "string" && customer.email.length !== 0 && customer.email.includes("@")
}

console.log(hasEmail(customer));

// Expected output:
// false
