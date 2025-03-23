/**
 * Test that elizabot-browser.js and elizabot.js produce identical results
 * with the same inputs and random seed.
 */

const fs = require('fs');
const assert = require('assert');
const elizabot = require('./elizabot');
const browserElizabot = require('./browser-wrapper');
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

// Read inputs from a file
function readInputsFromFile(filename) {
  return fs.readFileSync(filename, 'utf8')
    .split('\n')
    .filter(line => line.trim() !== '');
}

// Test function to directly compare both implementations for a specific input file
function compareImplementations(seed, inputFile) {
  const filename = path.basename(inputFile, '.txt');
  console.log(`Comparing implementations on ${filename} with seed: ${seed}`);

  const inputs = readInputsFromFile(inputFile);

  // Initialize both bots with same seed
  const nodeBot = new elizabot.ElizaBot(createSeededRandom(seed));
  browserElizabot.setSeed(seed);

  // Compare initial messages
  const nodeInitial = nodeBot.getInitial();
  const browserInitial = browserElizabot.start();
  assert.strictEqual(
    browserInitial,
    nodeInitial,
    `Initial messages don't match for seed ${seed} in ${filename}`
  );
  console.log('✓ Initial messages match');

  // Compare responses to each input
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const nodeResponse = nodeBot.transform(input);
    const browserResponse = browserElizabot.reply(input);

    assert.strictEqual(
      browserResponse,
      nodeResponse,
      `Responses to "${input}" don't match for seed ${seed} in ${filename}`
    );

    if (i < 3 || i >= inputs.length - 3) {
      // Only log first 3 and last 3 responses for long conversations
      console.log(`✓ Response to "${input}" matches`);
    } else if (i === 3) {
      console.log(`✓ ... (${inputs.length - 6} more responses match) ...`);
    }

    // Check if either bot wants to quit
    if (nodeBot.quit || (browserElizabot.bot && browserElizabot.bot.quit)) {
      break;
    }
  }

  // Compare final messages
  const nodeFinal = nodeBot.getFinal();
  const browserFinal = browserElizabot.bye();
  assert.strictEqual(
    browserFinal,
    nodeFinal,
    `Final messages don't match for seed ${seed} in ${filename}`
  );
  console.log('✓ Final messages match');

  console.log(`All responses match for ${filename} with seed ${seed}!\n`);
}

// Test all conversations with all seeds
function compareAllConversations(seed) {
  console.log(`\n=== TESTING SEED ${seed} ===\n`);

  for (const inputFile of inputFiles) {
    try {
      compareImplementations(seed, inputFile);
    } catch (error) {
      console.error(`❌ Test failed for ${inputFile} with seed ${seed}:`, error.message);
      throw error; // Re-throw to stop execution
    }
  }
}

console.log('=== Testing elizabot-browser.js compatibility with elizabot.js ===');
console.log('This test will verify that given the same inputs and random seed,');
console.log('elizabot-browser.js produces identical outputs to elizabot.js.\n');

// Test with multiple seeds to ensure consistency
const seeds = [42, 100, 123, 456, 789];
let allTestsPassed = true;

for (const seed of seeds) {
  try {
    compareAllConversations(seed);
  } catch (error) {
    allTestsPassed = false;
    // Continue with other seeds even if one fails
  }
}

if (allTestsPassed) {
  console.log('✅ All tests passed! elizabot-browser.js produces identical results to elizabot.js.');
  console.log('This confirms that both implementations behave the same way with the same inputs and random seed.');
} else {
  console.log('❌ Some tests failed. The implementations produce different results in some cases.');
  process.exit(1);
}