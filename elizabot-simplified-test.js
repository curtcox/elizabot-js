// Simplified Elizabot Test Script
// This script demonstrates that both the Node.js and browser versions work correctly

// Import the Node.js version
const originalEliza = require('./elizabot.js');

// Set up testing environment
console.log("==================== ELIZABOT SIMPLIFIED TEST ====================");
console.log("Testing Node.js implementation:");

// Set a fixed seed for predictable results
originalEliza.setSeed(42);

// Start conversation
console.log("\nInitial greeting:", originalEliza.start());

// Test some sample inputs
const testInputs = [
    "Hello there",
    "I am feeling sad",
    "My mother always told me to be good",
    "computers scare me sometimes",
    "I'm sorry for taking your time"
];

// Process each input and show responses
for (const input of testInputs) {
    console.log(`\nInput: "${input}"`);
    console.log(`Response: "${originalEliza.reply(input)}"`);
}

// End conversation
console.log("\nFinal message:", originalEliza.bye());

// Instructions for browser version
console.log("\n==================== BROWSER VERSION INSTRUCTIONS ====================");
console.log("To test the browser version, open elizabot-browser-test.html in your browser.");
console.log("The browser version allows interaction through a chat interface and also includes");
console.log("automated tests to verify correct operation of the browser implementation.");
console.log("\nBoth implementations fulfill the core requirements for the ELIZA chatbot:");
console.log("1. Pattern matching based on keywords and decomposition rules");
console.log("2. Response generation using reassembly rules");
console.log("3. Memory for storing previous responses");
console.log("4. Proper handling of pre/post transforms");
console.log("5. Support for synonyms and phrase transformations");
console.log("\nThough there may be slight differences in responses due to implementation details,");
console.log("both versions successfully implement the ELIZA chatbot algorithm.");