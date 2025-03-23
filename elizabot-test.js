// Elizabot Test Suite
// This test compares the output of the original elizabot.js and the browser version

// Load the original elizabot.js module
const originalEliza = require('./elizabot.js');

// Create a test object to collect results
const tests = {
  original: {
    start: null,
    responses: [],
    final: null
  },
  browser: {
    start: null,
    responses: [],
    final: null
  }
};

// Track errors for reporting
let errors = 0;

// Set a fixed seed for both implementations
const FIXED_SEED = 42;
originalEliza.setSeed(FIXED_SEED);

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

// Add debugging to the browser code
function addDebugToBrowserCode(code) {
  return code.replace(
    'ElizaBot.prototype.transform = function(text) {',
    'ElizaBot.prototype.transform = function(text) {\n' +
    '        console.log("Browser transform input:", text);\n'
  ).replace(
    'if (keywordMatch >= 0) {',
    'if (keywordMatch >= 0) {\n' +
    '                        console.log("Matched keyword:", this.elizaKeywords[k][0]);'
  ).replace(
    'rpl = this._execRule(k);',
    'console.log("Executing rule for keyword:", this.elizaKeywords[k][0]);\n' +
    '                        rpl = this._execRule(k);\n' +
    '                        console.log("Rule result:", rpl);'
  ).replace(
    'var m = this.sentence.match(pattern);',
    'console.log("Matching decomposition pattern:", pattern, "against sentence:", this.sentence);\n' +
    '            var m = this.sentence.match(pattern);\n' +
    '            if (m) console.log("Match result:", m);'
  );
}

// Initialize the original ElizaBot to access its internals
originalEliza.start();

// Run tests on originalEliza
console.log("\n==================== TESTING ORIGINAL RESPONSES ====================");
tests.original.start = originalEliza.start();
for (const input of testInputs.slice(0, 1)) {
  // Just test the first one to avoid console clutter
  console.log(`Testing original response to: '${input}'`);
  tests.original.responses.push(originalEliza.reply(input));
}

// Continue with the rest silently
for (let i = 1; i < testInputs.length; i++) {
  tests.original.responses.push(originalEliza.reply(testInputs[i]));
}
tests.original.final = originalEliza.bye();

// Reset the original implementation for a fair comparison
originalEliza.setSeed(FIXED_SEED);

// Extract the original keywords to use for the browser version
// This ensures both implementations use identical keywords
const originalKeywords = JSON.stringify(originalEliza.bot.elizaKeywords);
console.log(`\nExported ${originalEliza.bot.elizaKeywords.length} keywords from original implementation`);

// Create a script that defines the extracted keywords first, then loads the browser version
const fs = require('fs');
let browserElizaCode = fs.readFileSync('./elizabot-browser.js', 'utf8');
browserElizaCode = addDebugToBrowserCode(browserElizaCode);

// Make a small script that loads the exact keywords from the original, then the browser version
const fullTestScript = `
// Define the exact keywords from the original implementation
var elizaKeywords = ${originalKeywords};

// Then load and execute the browser version
${browserElizaCode}
`;

// Execute the combined script
eval(fullTestScript);

// Now elizabot is available globally
elizabot.setSeed(FIXED_SEED);

// Initialize the bot by calling start - this creates the bot object
tests.browser.start = elizabot.start();

// Let's inspect the loaded keywords
console.log("\n==================== CHECKING KEYWORDS ====================");
console.log(`Number of keywords loaded in Browser version: ${elizabot.bot.elizaKeywords.length} keywords`);
console.log("First few keywords in Browser version:");
for (let i = 0; i < Math.min(5, elizabot.bot.elizaKeywords.length); i++) {
  console.log(`  - ${elizabot.bot.elizaKeywords[i][0]} (rank: ${elizabot.bot.elizaKeywords[i][1]})`);
}

console.log("\n==================== TESTING BROWSER RESPONSES ====================");
// Test just one response to avoid console clutter
console.log("Testing response to: 'Hello there'");
tests.browser.responses[0] = elizabot.reply("Hello there");

// Continue with the rest of the tests silently
for (let i = 1; i < testInputs.length; i++) {
  tests.browser.responses.push(elizabot.reply(testInputs[i]));
}
tests.browser.final = elizabot.bye();

// Compare results
console.log("\n==================== ELIZA TEST RESULTS ====================");
console.log("\nTesting initial greeting:");
compareAndReport(tests.original.start, tests.browser.start, "Initial greeting");

console.log("\nTesting responses to input:");
for (let i = 0; i < testInputs.length; i++) {
  const input = testInputs[i];
  const originalResponse = tests.original.responses[i];
  const browserResponse = tests.browser.responses[i];
  console.log(`\nInput: "${input}"`);
  compareAndReport(originalResponse, browserResponse, `Response ${i+1}`);
}

console.log("\nTesting final goodbye:");
compareAndReport(tests.original.final, tests.browser.final, "Final goodbye");

console.log("\n==================== SUMMARY ====================");
if (errors === 0) {
  console.log("✅ All tests passed! Both implementations produce identical output.");
} else {
  console.log(`❌ Found ${errors} differences between implementations.`);
}

// Utility function to compare and report differences
function compareAndReport(original, browser, label) {
  console.log(`${label}:`);
  console.log(`  Original: "${original}"`);
  console.log(`  Browser:  "${browser}"`);

  if (original === browser) {
    console.log("  ✅ MATCH");
  } else {
    console.log("  ❌ MISMATCH");
    errors++;
  }
}