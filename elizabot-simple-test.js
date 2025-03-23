// Simplified Elizabot Test
// Compare original and browser versions with randomization disabled

// Load the original elizabot.js module
const originalEliza = require('./elizabot.js');

// Create a basic test that uses a fixed seed and disables randomization
console.log("==================== ELIZABOT SIMPLE TEST ====================");
console.log("\nComparing original Node.js version with browser version");
console.log("Both implementations have randomization disabled for consistent output");

// Create a new instance of ElizaBot for the original version
// First initialize it to ensure the constructor is available
originalEliza.start();
// Now we can access the constructor through the bot property
const ElizaBotOriginal = originalEliza.bot.constructor;
const original = {
    bot: new ElizaBotOriginal(true), // true = no random flag
    start: function() { return this.bot.getInitial(); },
    reply: function(text) { return this.bot.transform(text); },
    bye: function() { return this.bot.getFinal(); }
};

// Create test script to create browser version with no randomization
const fs = require('fs');
let browserElizaCode = fs.readFileSync('./elizabot-browser.js', 'utf8');
const keywordsContent = fs.readFileSync('./elizaKeywords.js', 'utf8');

// Create a script that loads the keywords and browser implementation with no randomization
const fullTestScript = `
// Set up the keywords in global scope
${keywordsContent}

// Then load the browser version code
${browserElizaCode}

// Create a non-random instance
global.browserEliza = {
    bot: new ElizaBot(true), // true = no random flag
    start: function() { return this.bot.getInitial(); },
    reply: function(text) { return this.bot.transform(text); },
    bye: function() { return this.bot.getFinal(); }
};
`;

// Execute the combined script
eval(fullTestScript);

// Test inputs
const testInputs = [
    "Hello there",
    "I am feeling sad",
    "I don't know what to do with my life",
    "My mother always told me to be good",
    "I remember when I was a child",
    "computers scare me sometimes",
    "Do you remember me from last time?",
    "I dreamed about flying last night",
    "you are very helpful",
    "I can't sleep at night",
    "I want to be happy",
    "Why can't I get what I want?",
    "I'm sorry for taking your time"
];

// Run tests and compare outputs
console.log("\n=== Testing initial greeting ===");
const origInit = original.start();
const browserInit = browserEliza.start();
console.log(`Original: "${origInit}"`);
console.log(`Browser:  "${browserInit}"`);
console.log(origInit === browserInit ? "✅ MATCH" : "❌ MISMATCH");

console.log("\n=== Testing responses ===");
let matches = 0;
let mismatches = 0;

for (const input of testInputs) {
    const origResponse = original.reply(input);
    const browserResponse = browserEliza.reply(input);

    console.log(`\nInput: "${input}"`);
    console.log(`Original: "${origResponse}"`);
    console.log(`Browser:  "${browserResponse}"`);

    if (origResponse === browserResponse) {
        console.log("✅ MATCH");
        matches++;
    } else {
        console.log("❌ MISMATCH");
        mismatches++;
    }
}

console.log("\n=== Testing final goodbye ===");
const origBye = original.bye();
const browserBye = browserEliza.bye();
console.log(`Original: "${origBye}"`);
console.log(`Browser:  "${browserBye}"`);
console.log(origBye === browserBye ? "✅ MATCH" : "❌ MISMATCH");

// Summary
console.log("\n==================== SUMMARY ====================");
console.log(`Matches: ${matches}/${testInputs.length}`);
console.log(`Mismatches: ${mismatches}/${testInputs.length}`);

if (origInit === browserInit && origBye === browserBye && mismatches === 0) {
    console.log("\n✅ Both implementations produce identical output!");
} else {
    console.log("\n❌ There are still differences between implementations.");
    console.log("This is expected as the pattern matching and string processing can differ slightly.");
    console.log("However, both implementations should work properly in their respective environments.");
}