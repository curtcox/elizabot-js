// Deterministic ElizaBot Test
// This script verifies that the Node.js and browser versions produce identical output
// when given the same random seed and inputs.

const fs = require('fs');
const assert = require('assert');

// Load the original elizabot.js module
const originalEliza = require('./elizabot.js');

console.log("==================== ELIZA DETERMINISTIC TEST ====================");
console.log("Testing that both implementations produce identical output with the same seed\n");

// First initialize the original Eliza to access its internal keywords
originalEliza.start();

// Now we can extract the keywords from the original implementation
// to ensure both versions use exactly the same keywords
console.log("Extracting keywords from original implementation...");
const originalKeywords = originalEliza.bot.elizaKeywords;
console.log(`Extracted ${originalKeywords.length} keywords`);

// Load the browser version
const browserElizaCode = fs.readFileSync('./elizabot-browser.js', 'utf8');

// Execute the browser code in the Node.js environment
// We need to create a global variable for the keywords first
global.elizaKeywords = originalKeywords;
eval(browserElizaCode);
// Now the 'elizabot' global variable should be available

// Function to run a test sequence with a specific seed
function runTestWithSeed(seed, testInputs) {
    console.log(`\nRunning test sequence with seed: ${seed}\n`);

    // Reset and configure both implementations
    originalEliza.setSeed(seed);
    elizabot.setSeed(seed);

    // Test initial greeting
    const origInit = originalEliza.start();
    const browserInit = elizabot.start();

    console.log(`Initial greeting (Original): "${origInit}"`);
    console.log(`Initial greeting (Browser): "${browserInit}"`);

    try {
        assert.strictEqual(origInit, browserInit);
        console.log("✅ Initial greetings match\n");
    } catch (e) {
        console.error("❌ Initial greetings don't match\n");
        throw e;
    }

    // Test responses to each input
    for (const input of testInputs) {
        const origResponse = originalEliza.reply(input);
        const browserResponse = elizabot.reply(input);

        console.log(`Input: "${input}"`);
        console.log(`Original: "${origResponse}"`);
        console.log(`Browser:  "${browserResponse}"`);

        try {
            assert.strictEqual(origResponse, browserResponse);
            console.log("✅ Responses match\n");
        } catch (e) {
            console.error("❌ Responses don't match\n");
            throw e;
        }
    }

    // Test final goodbye
    const origBye = originalEliza.bye();
    const browserBye = elizabot.bye();

    console.log(`Final goodbye (Original): "${origBye}"`);
    console.log(`Final goodbye (Browser): "${browserBye}"`);

    try {
        assert.strictEqual(origBye, browserBye);
        console.log("✅ Final goodbyes match\n");
    } catch (e) {
        console.error("❌ Final goodbyes don't match\n");
        throw e;
    }

    console.log(`✅ All tests PASSED for seed ${seed}\n`);
}

// Define test sequences with increasing complexity
// Each test set represents a typical conversation pattern
const testSet1 = [
    "Hello",
    "I feel sad",
    "My mother doesn't understand me",
    "I have bad dreams",
    "I want to be happy",
    "Yes that's true",
    "No I don't think so",
    "I remember my childhood",
    "Thank you for your help",
    "What should I do?"
];

const testSet2 = [
    "I'm feeling anxious",
    "I can't sleep at night",
    "My wife says I'm too tense",
    "Maybe I should see a doctor",
    "My father was very strict",
    "Computers make me nervous",
    "Nobody understands me",
    "Do you remember what I said before?",
    "I dreamed about falling",
    "Why can't I just be normal?"
];

const testSet3 = [
    "Hello there",
    "I am feeling sad today",
    "I don't know what to do with my life",
    "My mother always criticized me",
    "I remember when I was happy",
    "computers scare me",
    "Do you remember our last conversation?",
    "I dreamed about flying last night",
    "you are very helpful",
    "I can't sleep at night",
    "I want to be happy",
    "Why can't I get what I want?",
    "I'm sorry for bothering you",
    "Can you help me with my problems?",
    "I feel better now"
];

// Run tests with different seeds and test sets
try {
    runTestWithSeed(42, testSet1);
    runTestWithSeed(123, testSet2);
    runTestWithSeed(7777, testSet3);

    // Run a very long conversation to ensure seed stability
    console.log("Running extended test with 50+ exchanges...");
    const longTestSet = Array(50).fill(0).map((_, i) =>
        `This is message ${i+1} in a long conversation to test seed stability`);
    runTestWithSeed(999, longTestSet);

    console.log("\n==================== SUMMARY ====================");
    console.log("✅ SUCCESS: All tests passed! Both implementations produce identical output");
    console.log("This confirms that given the same seed, both the Node.js and browser versions");
    console.log("will generate identical responses to the same sequence of inputs.");
} catch (error) {
    console.log("\n==================== SUMMARY ====================");
    console.log("❌ FAILURE: Test failed with error:", error.message);
    console.log("The Node.js and browser versions produce different results");
    process.exit(1);
}