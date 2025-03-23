# ElizaBot JavaScript Implementation

This project contains implementations of the classic ELIZA chatbot in JavaScript, for both Node.js and browser environments.

## Overview

ELIZA is an early natural language processing computer program created from 1964 to 1966 at the MIT Artificial Intelligence Laboratory by Joseph Weizenbaum. It was designed to simulate a Rogerian psychotherapist by using pattern matching and substitution methodology.

This repository contains two implementations:

1. **elizabot.js** - The original Node.js version.
2. **elizabot-browser.js** - A browser-compatible version that produces identical output.

## Files in this Repository

- `elizabot.js` - Original Node.js implementation
- `elizabot-browser.js` - Browser implementation (fixed version)
- `elizaKeywords.js` - The pattern matching rules used by the ELIZA bot
- `elizabot-test.js` - Node.js test script that verifies both implementations produce identical output
- `elizabot-browser-test.html` - Browser test interface for the browser implementation

## Running the Tests

### Node.js Tests

To run the comparison tests between the two implementations:

```bash
node elizabot-test.js
```

This will run identical inputs through both implementations and verify they produce the same output.

### Browser Tests

To test the browser implementation directly:

1. Open `elizabot-browser-test.html` in your web browser
2. Use the chat interface to interact with ElizaBot
3. Click "Run Automated Tests" to see example interactions

## Implementation Notes

The browser implementation has been carefully rewritten to match the original Node.js version. Key fixes include:

1. Proper RegExp pattern generation from the keyword patterns
2. Correct implementation of the memory system
3. Proper handling of synonym expansion
4. Fixed pre/post transformations for input/output
5. Ensured identical random response selection with the same seed

The tests verify that given the same random seed, both implementations will produce identical responses to the same inputs.

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

// Set a specific random seed for reproducible outputs
eliza.setSeed(42);
```

### Browser

```html
<!-- First load the keywords -->
<script src="elizaKeywords.js"></script>

<!-- Then load the ElizaBot implementation -->
<script src="elizabot-browser.js"></script>

<script>
    // Get initial greeting
    console.log(elizabot.start());

    // Send a message and get a response
    console.log(elizabot.reply("Hello, I am feeling sad today"));

    // End the conversation
    console.log(elizabot.bye());

    // Set a specific random seed for reproducible outputs
    elizabot.setSeed(42);
</script>
```

## License

This implementation is provided for educational purposes.