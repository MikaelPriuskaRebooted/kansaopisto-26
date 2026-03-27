const jsonText = '[{"id":"P001","name":"Coffee"}]';

// Parse the JSON string safely.
// If parsing succeeds, return:
// { ok: true, data: parsedValue }
//
// If parsing fails, return:
// { ok: false, error: "Invalid JSON" }
function safeParseJson(jsonText) {

}

console.log(safeParseJson(jsonText));

// Expected output:
// {
//   ok: true,
//   data: [
//     { id: "P001", name: "Coffee" }
//   ]
// }
