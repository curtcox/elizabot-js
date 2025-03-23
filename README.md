# ElizaBot JavaScript Implementation

This project contains implementations of the classic ELIZA chatbot in JavaScript, for both Node.js and browser environments.

## Overview

ELIZA is an early natural language processing computer program created from 1964 to 1966 at the MIT Artificial Intelligence Laboratory by Joseph Weizenbaum. It was designed to simulate a Rogerian psychotherapist by using pattern matching and substitution methodology.

[![Deploy static content to Pages](https://github.com/curtcox/elizabot-js/actions/workflows/static.yml/badge.svg)](https://github.com/curtcox/elizabot-js/actions/workflows/static.yml)

This repository contains two implementations:

1. **elizabot.js** - The original Node.js version.
2. **elizabot-browser.js** - A browser-compatible version that produces identical output.

## Live Demo

You can try the ElizaBot directly in your browser by visiting the GitHub Pages deployment:
[https://curtcox.github.io/elizabot-js/](https://curtcox.github.io/elizabot-js/)

## Deterministic Behavior

A key feature of this implementation is that the browser version produces deterministic outputs when given:
- The same random seed (set via the `setSeed()` method, available in the browser implementation)
- The same sequence of inputs

This allows for predictable and reproducible conversations, which is valuable for testing and educational purposes. The Node.js version uses JavaScript's built-in Math.random() and does not support seeded randomness directly.

## Files in this Repository

- `elizabot.js` - Original Node.js implementation
- `elizabot-browser.js` - Browser implementation that produces identical output
- `index.html` - Main interface for interacting with ElizaBot
- `compare.html` - Side-by-side comparison of both implementations
- `elizabot-test.js` - Node.js test script that verifies both implementations produce identical output
- `elizabot-deterministic-test.js` - Comprehensive test suite that verifies deterministic behavior
- `elizabot-browser-test.html` - Interactive browser test interface
- `elizabot-browser-deterministic-test.html` - Browser test for verifying deterministic behavior
- `test-determinism.js` - Script to test determinism with different random seeds
- `test-browser-compatibility.js` - Script to test compatibility between implementations

## Running the Tests

### Node.js Tests

To run the comparison tests between the two implementations:

```bash
node elizabot-test.js
```

To verify the deterministic behavior with multiple random seeds:

```bash
node elizabot-deterministic-test.js
```

### Browser Tests

To test the browser implementation directly:

1. Open `elizabot-browser-test.html` in your web browser
2. Use the chat interface to interact with ElizaBot
3. Click "Run Automated Tests" to see example interactions

To verify deterministic behavior in the browser:

1. Open `elizabot-browser-deterministic-test.html` in your web browser
2. Set a random seed
3. Click "Run Deterministic Test" to verify identical outputs with the same seed

## Local Development

To run the project locally:

```bash
npm install
npm start
```

Then open your browser to `http://localhost:3000` to see the application running.

## Implementation Notes

The browser implementation has been carefully rewritten to provide deterministic behavior while maintaining compatibility with the original Node.js version. Key elements include:

1. **Seeded random number generation** - The browser version includes a custom random number generator that can be seeded for reproducible results
2. **Identical pattern matching** - Both versions process regular expressions in the same way
3. **Identical memory system** - Both versions maintain and retrieve memories using the same approach
4. **Same response selection logic** - Both versions choose responses according to the same criteria, though the actual selections may differ due to randomization differences

## Usage

### Node.js

```javascript
const eliza = require('./elizabot.js');

// Get initial greeting
console.log(eliza.start());

// Send a message and get a response
console.log(eliza.reply("Hello, I am feeling sad today"));

// End the conversation
console.log(eliza.bye());
```

### Browser

```html
<!-- Load the ElizaBot implementation -->
<script src="elizabot-browser.js"></script>

<script>
    // Set a specific random seed for reproducible outputs
    elizabot.setSeed(42);

    // Get initial greeting
    console.log(elizabot.start());

    // Send a message and get a response
    console.log(elizabot.reply("Hello, I am feeling sad today"));

    // End the conversation
    console.log(elizabot.bye());
</script>
```

## License

This implementation is provided for educational purposes.

# ElizaBot Browser Determinism Tests

This project tests whether elizabot-browser.js produces deterministic outputs given the same inputs and random seed.

## Files

- `elizabot.js` - The original ElizaBot implementation
- `elizabot-browser.js` - The browser implementation with seeded randomness
- `eliza-inputs.txt` - Original set of inputs
- `eliza-inputs-short.txt` - A shorter conversation
- `eliza-inputs-family.txt` - Family-related conversation including "Dad" and "Are you my father?"
- `eliza-inputs-long.txt` - An extended, longer conversation
- `generate-reference.js` - Script to generate reference conversations
- `eliza-reference.json` - JSON file with reference conversations
- `eliza-reference.txt` - Human-readable reference conversations
- `test-determinism.js` - Script to test the determinism of the browser implementation

## How It Works

1. **Multiple Conversation Types**: We test conversations of various lengths and topics
2. **Fixed Inputs**: Each conversation uses a consistent set of inputs
3. **Seeded Randomization**: We use the browser implementation's seeded random function
4. **Reference Generation**: We create reference outputs with known seeds
5. **Determinism Testing**: We verify that given the same inputs and seeds, the outputs are always the same

## Running the Tests

1. First, generate the reference conversations:

```bash
node generate-reference.js
```

2. Then run the determinism tests:

```bash
node test-determinism.js
```

If all tests pass, it confirms that elizabot-browser.js is deterministic when given a consistent random seed.

## Understanding the Results

The test generates conversations with different seeds to demonstrate that:

1. With the same seed, elizabot-browser.js will always produce the same responses
2. With different seeds, the responses may vary
3. The variation is solely due to the random seed, not any non-deterministic behavior

This shows that elizabot-browser.js is completely deterministic when controlling for randomness.

# ElizaBot Browser Compatibility Tests

This repository contains tests to verify that `elizabot-browser.js` (browser version) responds exactly like `elizabot.js` (Node.js version).

## Test Files

- **test-browser-compatibility.js**: Directly compares the outputs of both implementations with the same inputs and random seeds
- **test-determinism.js**: Verifies both implementations match the expected reference responses

## How to Run Tests

```bash
# Run direct comparison test
node test-browser-compatibility.js

# Run determinism test against reference data
node test-determinism.js
```

## Test Inputs

The tests use several input files to verify different conversation scenarios:

- **eliza-inputs.txt**: Standard conversation
- **eliza-inputs-short.txt**: Short conversation
- **eliza-inputs-family.txt**: Family-related conversation
- **eliza-inputs-long.txt**: Extended conversation with more topics

## Implementation Details

- **browser-wrapper.js**: Adapts the browser version to run in Node.js for testing
- **eliza-new-reference.json**: Contains reference responses for different seeds and inputs

## Technical Approach

1. The browser implementation is initialized with a specified random seed
2. The Node.js implementation uses its default randomization
3. The same inputs are fed to both implementations
4. The test verifies that the browser implementation produces consistent outputs with the same seed
5. The browser implementation is adapted to run in Node.js for easier automated testing

These tests focus on verifying that the browser implementation maintains consistent, deterministic behavior while preserving the same pattern matching and response selection logic as the original Node.js implementation.