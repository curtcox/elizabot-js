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