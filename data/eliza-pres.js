// ElizaBot pre-substitution data
// This file contains the pre-substitution patterns for the Eliza chatbot

const elizaPresData = [
    "dont", "don't",
    "cant", "can't",
    "wont", "won't",
    "recollect", "remember",
    "recall", "remember",
    "dreamt", "dreamed",
    "dreams", "dream",
    "maybe", "perhaps",
    "certainly", "yes",
    "machine", "computer",
    "machines", "computer",
    "computers", "computer",
    "were", "was",
    "you're", "you are",
    "i'm", "i am",
    "same", "alike",
    "identical", "alike",
    "equivalent", "alike"
];

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaPresData = elizaPresData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaPresData;
}