// ElizaBot keywords
// This file contains the keywords and responses for the ElizaBot chatbot

const elizaKeywords = [
    ["xnone", 0, [
        ["*", [
            "I'm not sure I understand you fully.",
            "Please go on.",
            "Can you repeat that please ?",
            "What does that suggest to you ?",
            "Do you feel strongly about discussing such things ?",
            "That is interesting.  Please continue.",
            "Tell me more about that.",
            "Do go on.",
            "Please talk more about it",
            "Does talking about this bother you ?",
            "Can you rephrase that ?",
            "I see. Tell me more.",
            "Interesting. Is this something you are sorry about ?",
            "Mmm hmmm. Is this is your favorite subject ?",
            "Now we are getting somewhere. Explain more.",
            "I see. How does that make you feel ?"
        ]]
    ]],
    ["sorry", 0, [
        ["*", [
            "Please don't apologize.",
            "Apologies are not necessary.",
            "I've told you that apologies are not required.",
            "It did not bother me.  Please continue.",
            "I have no feelings. Do continue.",
            "There is nothing to worry about"
        ]]
    ]],
    ["apologize", 0, [
        ["*", [
            "goto sorry"
        ]]
    ]],
    ["remember", 5, [
        ["* i remember *", [
            "Do you often think of (2) ?",
            "Does thinking of (2) bring anything else to mind ?",
            "What else do you recollect ?",
            "Why do you remember (2) just now ?",
            "What in the present situation reminds you of (2) ?",
            "What is the connection between me and (2) ?",
            "What else does (2) remind you of ?"
        ]],
        ["* do you remember *", [
            "Did you think I would forget (2) ?",
            "Why do you think I should recall (2) now ?",
            "What about (2) ?",
            "goto what",
            "You mentioned (2) ?"
        ]],
        ["* you remember *", [
            "How could I forget (2) ?",
            "What about (2) should I remember ?",
            "goto you"
        ]]
    ]],
    ["forget", 5, [
        ["* i forget *", [
            "Can you think of why you might forget (2) ?",
            "Why can't you remember (2) ?",
            "How often do you think of (2) ?",
            "Does it bother you to forget that ?",
            "Could it be a mental block ?",
            "Are you generally forgetful ?",
            "Do you think you are suppressing (2) ?"
        ]],
        ["* did you forget *", [
            "Why do you ask ?",
            "Are you sure you told me ?",
            "Would it bother you if I forgot (2) ?",
            "Why should I recall (2) just now ?",
            "goto what",
            "Tell me more about (2)."
        ]]
    ]],
    ["hello", 0, [
        ["*", [
            "How do you do.  Please state your problem.",
            "Hi.  What seems to be your problem ?"
        ]]
    ]],
    ["hi", 0, [
        ["*", [
            "goto hello"
        ]]
    ]],
    ["hey", 0, [
        ["*", [
            "goto hello"
        ]]
    ]],
    ["computer", 50, [
        ["*", [
            "Do computers worry you ?",
            "Why do you mention computers ?",
            "What do you think machines have to do with your problem ?",
            "Don't you think computers can help people ?",
            "What about machines worries you ?",
            "What do you think about machines ?",
            "You don't think I am a computer program, do you ?"
        ]]
    ]],
    ["name", 15, [
        ["*", [
            "I am not interested in names.",
            "OK, my name is ElizaBot. What do you need to know ?",
            "I've told you before, I don't care about names -- please continue."
        ]]
    ]],
    ["yes", 0, [
        ["*", [
            "You seem quite sure.",
            "OK, but can you elaborate a bit?"
        ]]
    ]],
    ["no", 0, [
        ["*", [
            "Are you saying no just to be negative?",
            "You are being a bit negative.",
            "Why not?",
            "Why 'no'?"
        ]]
    ]],
    ["my", 2, [
        ["* my *", [
            "Let's discuss further why your (2).",
            "Earlier you said your (2).",
            "But your (2).",
            "Does that suggest anything else which belongs to you?",
            "Is it important to you that your (2)?"
        ]]
    ]],
    ["you", 0, [
        ["* you are *", [
            "What makes you think I am (2)?",
            "Does it please you to believe I am (2)?",
            "Do you sometimes wish you were (2)?",
            "Perhaps you would like to be (2)."
        ]],
        ["* you *", [
            "We were discussing you, not me.",
            "Oh, I (2)?",
            "You're not really talking about me, are you?",
            "What are your feelings now?"
        ]]
    ]],
    ["why", 0, [
        ["* why don't you *", [
            "Do you believe I don't (2)?",
            "Perhaps I will (2) in good time.",
            "Should you (2) yourself?",
            "You want me to (2)?",
            "goto what"
        ]],
        ["* why can't i *", [
            "Do you think you should be able to (2)?",
            "Do you want to be able to (2)?",
            "Do you believe this will help you to (2)?",
            "Have you any idea why you can't (2)?",
            "goto what"
        ]],
        ["*", [
            "goto what"
        ]]
    ]]
];

export default elizaKeywords;