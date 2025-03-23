// ElizaBot for browser
// Based on the original elizabot.js but modified for browser use

var elizabot = (function() {
    var eliza = {};

    eliza.reply = function(r) {
        if (this.bot == null) {
            this.bot = new ElizaBot(false);
        }
        return this.bot.transform(r);
    };

    eliza.start = function() {
        if (this.bot == null) {
            this.bot = new ElizaBot(false);
        }
        return this.bot.getInitial();
    };

    eliza.bye = function() {
        if (this.bot == null) {
            this.bot = new ElizaBot(false);
        }
        return this.bot.getFinal();
    };

    function ElizaBot(noRandomFlag) {
        this.elizaInitials = [
            "How do you do.  Please tell me your problem.",
            "Please tell me what's been bothering you.",
            "Is something troubling you ?",
            "Im here. Talk to me.",
            "Talk to me",
            "Top of the morning to you.",
            "Thanks for waking me up"
        ];

        this.elizaFinals = [
            "Goodbye.  It was nice talking to you.",
            "Goodbye.  This was really a nice talk.",
            "Goodbye.  I'm looking forward to our next session.",
            "This was a good session, wasn't it -- but time is over now.   Goodbye.",
            "Maybe we could discuss this moreover in our next session ?   Goodbye."
        ];

        this.elizaQuits = [
            "bye",
            "goodbye",
            "done",
            "exit",
            "quit"
        ];

        this.elizaPres = [
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

        this.elizaPosts = [
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

        this.elizaKeywords = [
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

        this.elizaPostTransforms = [
            / old old/g, " old",
            /\bthey were( not)? me\b/g, "it was$1 me",
            /\bthey are( not)? me\b/g, "it is$1 me",
            /Are they( always)? me\b/, "it is$1 me",
            /\bthat your( own)? (\w+)( now)? \?/, "that you have your$1 $2 ?",
            /\bI to have (\w+)/, "I have $1",
            /Earlier you said your( own)? (\w+)( now)?\./, "Earlier you talked about your $2."
        ];

        this.noRandom = (noRandomFlag) ? true : false;
        this.capitalizeFirstLetter = true;
        this.debug = false;
        this.memSize = 20;
        this.version = "1.1 (original)";

        this.reset();
    }

    ElizaBot.prototype.reset = function() {
        this.quit = false;
        this.mem = [];
        this.lastchoice = [];

        for (var k = 0; k < this.elizaKeywords.length; k++) {
            this.lastchoice[k] = [];
            var rules = this.elizaKeywords[k][2];
            for (var i = 0; i < rules.length; i++) this.lastchoice[k][i] = -1;
        }
    };

    ElizaBot.prototype.transform = function(text) {
        var rpl = "";
        this.quit = false;
        if (this.debug) alert("ElizaBot.prototype.transform: " + text);
        text = text.toLowerCase();
        text = text.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t/g, " ");
        text = text.replace(/\s+-+\s+/g, ".");
        text = text.replace(/\s*[,\.\?!;]+\s*/g, ".");
        text = text.replace(/\s*\bbut\b\s*/g, ".");
        text = text.replace(/\s{2,}/g, " ");

        if (this.debug) alert("ElizaBot.prototype.transform: " + text);

        // check for quit word
        for (var i = 0; i < this.elizaQuits.length; i++) {
            if (this.elizaQuits[i] == text) {
                this.quit = true;
                return this.getFinal();
            }
        }

        // preprocess (v.1.1: work around lambda function)
        var sections = [
            this.preExp, this.replaceExp, this.finalExp,
            this.toExp, this.rep, this.reps
        ];
        var repgr = function(arr, i, exp) {
            for (var k = 0; k < exp.length; k += 2) {
                arr[i] = arr[i].replace(exp[k], exp[k + 1]);
            }
        };
        for (var i = 0; i < sections.length; i += 2) {
            var exp = sections[i + 1];
            repgr(sections, i, exp);
        }

        // parse data structure
        var reply = this.match(text);
        return reply;
    };

    ElizaBot.prototype.match = function(text) {
        if (this.debug) alert("ElizaBot.prototype.match: " + text);
        var reply = null;

        // check for exact matches
        if (text == "") text = "xnone";
        var stext = text.split('.');
        var part = '';
        for (var i = 0; i < stext.length; i++) {
            part = stext[i];

            // Check for keywords
            var m = this.matchKeyword(part);
            if (m) {
                if (this.debug) alert("ElizaBot.prototype.match: found keyword match");

                // Get the matching rule and response
                var k = m[1];
                var match = this.elizaKeywords[k];
                var keyword = match[0];
                var keywordRank = match[1];
                var rules = match[2];

                part = this.translateReferences(part);
                var reply = this.pickResponse(k, part);
                if (reply) return reply;
            }
        }

        // No match found, use xnone
        for (var k = 0; k < this.elizaKeywords.length; k++) {
            if (this.elizaKeywords[k][0] === "xnone") {
                return this.pickResponse(k, "xnone");
            }
        }

        // If we get here, something went wrong
        return "I am at a loss for words.";
    };

    ElizaBot.prototype.matchKeyword = function(text) {
        if (this.debug) alert("ElizaBot.prototype.matchKeyword: " + text);
        for (var k = 0; k < this.elizaKeywords.length; k++) {
            var keyword = this.elizaKeywords[k][0];
            if (text.indexOf(keyword) >= 0) return [keyword, k];
        }
        return null;
    };

    ElizaBot.prototype.translateReferences = function(text) {
        if (this.debug) alert("ElizaBot.prototype.translateReferences: " + text);
        text = " " + text + " ";

        // Swap first and second person parts
        for (var i = 0; i < this.elizaPres.length; i += 2) {
            var word1 = this.elizaPres[i];
            var word2 = this.elizaPres[i + 1];
            text = text.replace(new RegExp("\\b" + word1 + "\\b", "g"), word2);
        }

        for (var i = 0; i < this.elizaPosts.length; i += 2) {
            var word1 = this.elizaPosts[i];
            var word2 = this.elizaPosts[i + 1];
            text = text.replace(new RegExp("\\b" + word1 + "\\b", "g"), word2);
        }

        return text;
    };

    ElizaBot.prototype.pickResponse = function(k, text) {
        if (this.debug) alert("ElizaBot.prototype.pickResponse: " + k + " " + text);
        var rules = this.elizaKeywords[k][2];

        // Pick a random rule
        var rn = Math.floor(Math.random() * rules.length);
        if (this.noRandom) rn = 0;

        // Get the rule and responses
        var rule = rules[rn];
        var rulePattern = rule[0];
        var responses = rule[1];

        // Pick a random response
        var rn = Math.floor(Math.random() * responses.length);
        if (this.noRandom) rn = 0;

        var response = responses[rn];

        // Process the response for goto directives
        if (response.substring(0, 5) == "goto ") {
            var target = response.substring(5);
            for (var i = 0; i < this.elizaKeywords.length; i++) {
                if (this.elizaKeywords[i][0] == target) {
                    return this.pickResponse(i, text);
                }
            }
            return "I don't know what to say.";
        }

        // Process the response for placeholders
        response = this.postProcess(response);

        if (this.capitalizeFirstLetter) {
            response = response.charAt(0).toUpperCase() + response.substring(1);
        }

        return response;
    };

    ElizaBot.prototype.postProcess = function(response) {
        if (this.debug) alert("ElizaBot.prototype.postProcess: " + response);
        // Apply post transforms
        for (var i = 0; i < this.elizaPostTransforms.length; i += 2) {
            response = response.replace(this.elizaPostTransforms[i], this.elizaPostTransforms[i + 1]);
        }
        return response;
    };

    ElizaBot.prototype.getInitial = function() {
        var rn = Math.floor(Math.random() * this.elizaInitials.length);
        if (this.noRandom) rn = 0;
        return this.elizaInitials[rn];
    };

    ElizaBot.prototype.getFinal = function() {
        var rn = Math.floor(Math.random() * this.elizaFinals.length);
        if (this.noRandom) rn = 0;
        return this.elizaFinals[rn];
    };

    // ElizaBot internal functionalities
    ElizaBot.prototype.preExp = {};
    ElizaBot.prototype.replaceExp = {};
    ElizaBot.prototype.finalExp = {};
    ElizaBot.prototype.toExp = {};
    ElizaBot.prototype.rep = {};
    ElizaBot.prototype.reps = {};

    return eliza;
})();