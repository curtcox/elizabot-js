elizabot-js
===========

[![Deploy to GitHub Pages](https://github.com/curtcox/elizabot-js/actions/workflows/deploy-to-pages.yml/badge.svg)](https://github.com/curtcox/elizabot-js/actions/workflows/deploy-to-pages.yml)

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

## Local Server

A local server has been added to make it easier to run and compare different ElizaBot implementations:

1. Install dependencies: `npm install`
2. Start the server: `npm start`
3. Visit `http://localhost:3000` in your browser

### Comparison Page

The server includes a comparison page at `http://localhost:3000/compare` that allows you to test and compare the behavior of different ElizaBot implementations side by side.