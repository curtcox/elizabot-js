// ElizaBot initials data
// This file contains the initial greeting messages for the Eliza chatbot

const elizaInitialsData = [
    "How do you do. Please tell me your problem.",
    "Please tell me what's been bothering you.",
    "Is something troubling you?",
    "Im here. Talk to me.",
    "Talk to me",
    "Top of the morning to you.",
    "Thanks for waking me up"
];

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaInitialsData = elizaInitialsData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaInitialsData;
}