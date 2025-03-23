# ElizaBot JavaScript Implementation

This project contains implementations of the classic ELIZA chatbot in JavaScript, for both Node.js and browser environments.

## Overview

ELIZA is an early natural language processing computer program created from 1964 to 1966 at the MIT Artificial Intelligence Laboratory by Joseph Weizenbaum. It was designed to simulate a Rogerian psychotherapist by using pattern matching and substitution methodology.

This repository contains two implementations:

1. **elizabot.js** - The original Node.js version.
2. **elizabot-browser.js** - A browser-compatible version that produces identical output.

## Deterministic Behavior

A key feature of this implementation is that both versions produce identical, deterministic outputs when given:
- The same random seed (set via the `setSeed()` method)
- The same sequence of inputs

This allows for predictable and reproducible conversations, which is valuable for testing and educational purposes.

## Files in this Repository

- `elizabot.js` - Original Node.js implementation
- `elizabot-browser.js` - Browser implementation that produces identical output
- `elizaKeywords.js` - The pattern matching rules used by the ELIZA bot
- `elizabot-test.js` - Node.js test script that verifies both implementations produce identical output
- `elizabot-deterministic-test.js` - Comprehensive test suite that verifies deterministic behavior
- `elizabot-browser-test.html` - Interactive browser test interface
- `elizabot-browser-deterministic-test.html` - Browser test for verifying deterministic behavior

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

## Implementation Notes

The browser implementation has been carefully rewritten to match the original Node.js version. Key elements include:

1. **Identical random number generation** - Both versions use the same seeded random number generator algorithm
2. **Identical pattern matching** - Both versions process regular expressions exactly the same way
3. **Identical memory system** - Both versions maintain and retrieve memories identically
4. **Same response selection** - Both versions choose responses according to the same criteria

## Usage

### Node.js

```javascript
const eliza = require('./elizabot.js');

// Set a specific random seed for reproducible outputs
eliza.setSeed(42);

// Get initial greeting
console.log(eliza.start());

// Send a message and get a response
console.log(eliza.reply("Hello, I am feeling sad today"));

// End the conversation
console.log(eliza.bye());
```

### Browser

```html
<!-- First load the keywords -->
<script src="elizaKeywords.js"></script>

<!-- Then load the ElizaBot implementation -->
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

# ElizaBot.js Determinism Test

This project tests whether elizabot.js produces deterministic outputs given the same inputs and random seed.

## Files

- `elizabot.js` - The original ElizaBot implementation
- `eliza-inputs.txt` - Original set of inputs
- `eliza-inputs-short.txt` - A shorter conversation
- `eliza-inputs-family.txt` - Family-related conversation including "Dad" and "Are you my father?"
- `eliza-inputs-long.txt` - An extended, longer conversation
- `generate-reference.js` - Script to generate reference conversations
- `eliza-reference.json` - JSON file with reference conversations
- `eliza-reference.txt` - Human-readable reference conversations
- `test-determinism.js` - Script to test the determinism of ElizaBot

## How It Works

1. **Multiple Conversation Types**: We test conversations of various lengths and topics
2. **Fixed Inputs**: Each conversation uses a consistent set of inputs
3. **Seeded Randomization**: We replace JavaScript's `Math.random()` with our own deterministic random function
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

If all tests pass, it confirms that elizabot.js is deterministic when given a consistent random seed.

## Understanding the Results

The test generates conversations with different seeds to demonstrate that:

1. With the same seed, elizabot.js will always produce the same responses
2. With different seeds, the responses may vary
3. The variation is solely due to the random seed, not any non-deterministic behavior

This shows that elizabot.js is completely deterministic when controlling for randomness.

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

1. Each test initializes both implementations with the same random seed
2. The same inputs are fed to both implementations
3. Responses are compared to ensure they're identical
4. With the determinism test, responses are also compared against a pre-generated reference

This confirms that `elizabot-browser.js` maintains full compatibility with the original `elizabot.js` implementation.