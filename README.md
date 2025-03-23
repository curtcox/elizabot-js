elizabot-js
===========

Eliza JS bot based on www.masswerk.at/elizabot and http://en.wikipedia.org/wiki/ELIZA

Try it online: [ElizaBot Demo](https://curtcox.github.io/elizabot-js/)

## Usage via Node.js

```javascript
var elizabot = require('./elizabot.js');

elizabot.start()          // initializes eliza and returns a greeting message

elizabot.reply(msgtext)   // returns a eliza-like reply based on the message text passed into it

elizabot.bye()            // returns a farewell message
```

## Web Interface

A simple web chat interface is also available:

1. Open `index.html` in your browser
2. Chat with ElizaBot using the text input
3. Press Enter or click "Send" to send your message

The web interface uses `elizabot-browser.js`, which is a browser-compatible version of the original ElizaBot.