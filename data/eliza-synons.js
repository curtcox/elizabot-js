// ElizaBot synonyms data
// This file contains the synonyms for the Eliza chatbot

const elizaSynonsData = {
    "be": ["am", "is", "are", "was"],
    "belief": ["feel", "think", "believe", "wish"],
    "cannot": ["can't"],
    "desire": ["want", "need"],
    "everyone": ["everybody", "nobody", "noone"],
    "family": ["mother", "mom", "father", "dad", "sister", "brother", "wife", "children", "child", "uncle", "aunt", "child"],
    "happy": ["elated", "glad", "better"],
    "sad": ["unhappy", "depressed", "sick"]
};

// Export the data in a way that works in browsers
if (typeof window !== 'undefined') {
    window.elizaSynonsData = elizaSynonsData;
} else if (typeof module !== 'undefined' && module.exports) {
    module.exports = elizaSynonsData;
}