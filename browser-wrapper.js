// This wrapper allows the browser version of elizabot to be loaded in Node.js
// It sets up the global context and then returns the elizabot object

// Read the browser file
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Create a context for the browser version to run in
const context = vm.createContext({});

// Read and execute the browser script in the sandbox context
const browserCode = fs.readFileSync(path.join(__dirname, 'elizabot-browser.js'), 'utf8');
vm.runInContext(browserCode, context);

// Export the elizabot object that was created in the browser context
module.exports = context.elizabot;