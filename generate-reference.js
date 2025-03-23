const fs = require('fs');
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
  'eliza-inputs.txt',      // Original inputs
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

// Create a reference conversation with a fixed seed and inputs
function generateReference(seed, inputs, conversationName) {
  const bot = new elizabot.ElizaBot(createSeededRandom(seed));

  const conversation = {
    name: conversationName,
    messages: []
  };

  // Start message
  conversation.messages.push({
    speaker: 'ELIZA',
    message: bot.getInitial()
  });

  // Process each input
  for (const input of inputs) {
    conversation.messages.push({
      speaker: 'USER',
      message: input
    });

    const response = bot.transform(input);
    conversation.messages.push({
      speaker: 'ELIZA',
      message: response
    });

    // If the bot quits, break the loop
    if (bot.quit) break;
  }

  return conversation;
}

// Generate reference conversations with different seeds
const seeds = [42, 100, 123];
const references = {};

seeds.forEach(seed => {
  references[seed] = {};

  inputFiles.forEach(inputFile => {
    try {
      const inputs = readInputsFromFile(inputFile);
      const conversationName = path.basename(inputFile, '.txt');

      references[seed][conversationName] = generateReference(
        seed,
        inputs,
        conversationName
      );

      console.log(`Generated conversation for seed ${seed}, file ${inputFile}`);
    } catch (error) {
      console.error(`Error processing ${inputFile}:`, error.message);
    }
  });
});

// Save the reference conversations to a file
fs.writeFileSync(
  './eliza-reference.json',
  JSON.stringify(references, null, 2)
);

console.log('Reference conversations generated and saved to eliza-reference.json');

// Also create a human-readable version
let readableOutput = '';

for (const [seed, conversations] of Object.entries(references)) {
  readableOutput += `=== Conversations with seed ${seed} ===\n\n`;

  for (const [conversationName, conversation] of Object.entries(conversations)) {
    readableOutput += `--- ${conversationName} ---\n\n`;

    for (const { speaker, message } of conversation.messages) {
      readableOutput += `${speaker}: ${message}\n`;
    }

    readableOutput += '\n\n';
  }
}

fs.writeFileSync('./eliza-reference.txt', readableOutput);
console.log('Human-readable reference saved to eliza-reference.txt');