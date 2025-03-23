// ElizaBot post transforms data
// This file contains the post transform patterns for the Eliza chatbot

const elizaPostTransformsData = [
    / old old/g, " old",
    /\bthey were( not)? me\b/g, "it was$1 me",
    /\bthey are( not)? me\b/g, "it is$1 me",
    /Are they( always)? me\b/, "it is$1 me",
    /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
    /\bI to have (\w+)/, "I have $1",
    /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
];

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaPostTransformsData = elizaPostTransformsData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaPostTransformsData;
}