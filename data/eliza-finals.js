// ElizaBot finals data
// This file contains the goodbye messages for the Eliza chatbot

const elizaFinalsData = [
    "Goodbye. It was nice talking to you.",
    "Goodbye. This was really a nice talk.",
    "Goodbye. I'm looking forward to our next session.",
    "This was a good session, wasn't it -- but time is over now. Goodbye.",
    "Maybe we could discuss this moreover in our next session? Goodbye."
];

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaFinalsData = elizaFinalsData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaFinalsData;
}