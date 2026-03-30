const customer = {
  id: "C001",
  name: "Ella Mäkelä",
  email: "ella@example.com",
  vip: false,
};

// Return the customer's name as a string.
function getCustomerName(customer) {
  return customer.name
}

console.log(getCustomerName(customer));

// Expected output:
// "Ella Mäkelä"
