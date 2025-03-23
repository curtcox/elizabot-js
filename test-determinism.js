const fs = require('fs');
const assert = require('assert');
const elizabot = require('./elizabot');
const path = require('path');

// Create a predictable "random" function with a seed
function createSeededRandom(seed) {
  return function() {
    // Simple pseudo-random number generator
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Input files to process
const inputFiles = [
  'eliza-inputs.txt',       // Original inputs
  'eliza-inputs-short.txt', // Short conversation
  'eliza-inputs-family.txt', // Family-related conversation
  'eliza-inputs-long.txt'   // Longer conversation
];

// Load reference conversations
const references = JSON.parse(fs.readFileSync('./eliza-reference.json', 'utf8'));

// Read inputs from a file
function readInputsFromFile(filename) {
  return fs.readFileSync(filename, 'utf8')
    .split('\n')
    .filter(line => line.trim() !== '');
}

// Test function to check determinism for a specific input file
function testConversationDeterminism(seed, inputFile) {
  const conversationName = path.basename(inputFile, '.txt');
  console.log(`Testing ${conversationName} with seed: ${seed}`);

  const inputs = readInputsFromFile(inputFile);
  const bot = new elizabot.ElizaBot(createSeededRandom(seed));
  const referenceConversation = references[seed][conversationName];

  // Check initial message
  const initialMessage = bot.getInitial();
  assert.strictEqual(
    initialMessage,
    referenceConversation.messages[0].message,
    `Initial message does not match for seed ${seed} in ${conversationName}`
  );
  console.log('✓ Initial message matches');

  // Check each input/response pair
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const response = bot.transform(input);

    // Reference index starts at 0 with initial message, then pairs of user/bot messages
    const refIndex = 2 * i + 2;

    // Verify bot's response matches reference
    assert.strictEqual(
      response,
      referenceConversation.messages[refIndex].message,
      `Response to "${input}" doesn't match reference for seed ${seed} in ${conversationName}`
    );

    if (i < 3 || i >= inputs.length - 3) {
      // Only log first 3 and last 3 responses for long conversations
      console.log(`✓ Response to "${input}" matches`);
    } else if (i === 3) {
      console.log(`✓ ... (${inputs.length - 6} more responses match) ...`);
    }

    // If the bot quits, break the loop
    if (bot.quit) break;
  }

  console.log(`All responses match for ${conversationName} with seed ${seed}!\n`);
}

// Test all conversations with all seeds
function testDeterminism(seed) {
  console.log(`\n=== TESTING SEED ${seed} ===\n`);

  for (const inputFile of inputFiles) {
    try {
      testConversationDeterminism(seed, inputFile);
    } catch (error) {
      console.error(`❌ Test failed for ${inputFile} with seed ${seed}:`, error.message);
      throw error; // Re-throw to stop execution
    }
  }
}

console.log('=== Testing elizabot.js for determinism ===');
console.log('This test will verify that given the same inputs and random seed,');
console.log('elizabot.js will always produce the same outputs.\n');

let allTestsPassed = true;
const seeds = Object.keys(references).map(Number);

for (const seed of seeds) {
  try {
    testDeterminism(seed);
  } catch (error) {
    allTestsPassed = false;
  }
}

if (allTestsPassed) {
  console.log('✅ All tests passed! elizabot.js is deterministic across conversations of different lengths.');
  console.log('This confirms that with the same random seed, elizabot.js produces identical responses.');
} else {
  console.log('❌ Some tests failed. elizabot.js might not be deterministic.');
  process.exit(1);
}