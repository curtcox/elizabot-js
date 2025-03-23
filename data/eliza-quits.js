// ElizaBot quits data
// This file contains the quit commands for the Eliza chatbot

const elizaQuitsData = [
    "bye",
    "goodbye",
    "done",
    "exit",
    "quit"
];

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaQuitsData = elizaQuitsData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaQuitsData;
}