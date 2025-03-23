const { ElizaBot } = require('./elizabot-2025.js');

// Create a bot with a fixed random function
const bot = new ElizaBot(() => 0.5);

// Test a simple transformation
const input = "Hello";
const response = bot.transform(input);
console.log(`Input: "${input}", Response: "${response}"`);

// Test a few more inputs
const inputs = [
    "I am feeling happy",
    "My computer is not working",
    "I need help",
    "bye"
];

inputs.forEach(input => {
    const result = bot.transform(input);
    console.log(`Input: "${input}", Response: "${result}"`);
});

console.log("Tests completed successfully");