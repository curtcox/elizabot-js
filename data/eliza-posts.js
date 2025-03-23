// ElizaBot post-substitution data
// This file contains the post-substitution patterns for the Eliza chatbot

const elizaPostsData = [
    "am", "are",
    "your", "my",
    "me", "you",
    "myself", "yourself",
    "yourself", "myself",
    "i", "you",
    "you", "I",
    "my", "your",
    "i'm", "you are"
];

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaPostsData = elizaPostsData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaPostsData;
}