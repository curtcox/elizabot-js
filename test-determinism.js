const fs = require('fs');
const assert = require('assert');
const elizabot = require('./elizabot');
const path = require('path');

// Import browser version by creating a global context for it
const browserElizabot = require('./browser-wrapper');

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
const references = JSON.parse(fs.readFileSync('./eliza-new-reference.json', 'utf8'));

// Read inputs from a file
function readInputsFromFile(filename) {
  return fs.readFileSync(filename, 'utf8')
    .split('\n')
    .filter(line => line.trim() !== '');
}

// Test function to check determinism for a specific input file
function testConversationDeterminism(seed, inputFile, botModule, moduleName) {
  const conversationName = path.basename(inputFile, '.txt');
  console.log(`Testing ${moduleName} with ${conversationName} (seed: ${seed})`);

  const inputs = readInputsFromFile(inputFile);

  // Initialize the bot based on module type
  let bot;
  if (moduleName === 'elizabot.js') {
    bot = new botModule.ElizaBot(createSeededRandom(seed));
  } else if (moduleName === 'elizabot-browser.js') {
    // For browser version, we use the pre-wrapped module
    bot = botModule;
    bot.setSeed(seed); // Initialize with our seed
  }

  const referenceConversation = references[seed][conversationName];

  // Check initial message
  const initialMessage = bot.getInitial ? bot.getInitial() : bot.start();
  assert.strictEqual(
    initialMessage,
    referenceConversation.messages[0].message,
    `Initial message does not match for seed ${seed} in ${conversationName}`
  );
  console.log('✓ Initial message matches');

  // Check each input/response pair
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const response = bot.transform ? bot.transform(input) : bot.reply(input);

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

    // Check bot's quit status
    if ((bot.quit !== undefined && bot.quit) ||
        (bot.bot && bot.bot.quit !== undefined && bot.bot.quit)) {
      break;
    }
  }

  console.log(`All responses match for ${conversationName} with seed ${seed}!\n`);
}

// Test all conversations with all seeds for a specific module
function testDeterminism(seed, botModule, moduleName) {
  console.log(`\n=== TESTING ${moduleName} WITH SEED ${seed} ===\n`);

  for (const inputFile of inputFiles) {
    try {
      testConversationDeterminism(seed, inputFile, botModule, moduleName);
    } catch (error) {
      console.error(`❌ Test failed for ${inputFile} with seed ${seed} (${moduleName}):`, error.message);
      throw error; // Re-throw to stop execution
    }
  }
}

console.log('=== Testing elizabot.js and elizabot-browser.js for determinism ===');
console.log('This test will verify that given the same inputs and random seed,');
console.log('both implementations will always produce the same outputs as the reference.\n');

let allTestsPassed = true;
const seeds = Object.keys(references).map(Number);

// Test both node.js and browser versions
const modules = [
  { module: elizabot, name: 'elizabot.js' },
  { module: browserElizabot, name: 'elizabot-browser.js' }
];

for (const { module, name } of modules) {
  console.log(`\n===== TESTING MODULE: ${name} =====\n`);

  for (const seed of seeds) {
    try {
      testDeterminism(seed, module, name);
    } catch (error) {
      allTestsPassed = false;
    }
  }
}

if (allTestsPassed) {
  console.log('✅ All tests passed! Both implementations are deterministic across conversations of different lengths.');
  console.log('This confirms that with the same random seed, both implementations produce identical responses.');
} else {
  console.log('❌ Some tests failed. One or both implementations might not be deterministic.');
  process.exit(1);
}