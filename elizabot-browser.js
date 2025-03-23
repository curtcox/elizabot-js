// ElizaBot for browser
// Based on the original elizabot.js but modified for browser use

import elizaInitials from './elizaInitials.js';
import elizaFinals from './elizaFinals.js';
import elizaQuits from './elizaQuits.js';
import elizaPres from './elizaPres.js';
import elizaPosts from './elizaPosts.js';
import elizaPostTransforms from './elizaPostTransforms.js';
import elizaKeywords from './elizaKeywords.js';

// Create and export the elizabot object
const elizabot = (function() {
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
        this.elizaInitials = elizaInitials;
        this.elizaFinals = elizaFinals;
        this.elizaQuits = elizaQuits;
        this.elizaPres = elizaPres;
        this.elizaPosts = elizaPosts;
        this.elizaPostTransforms = elizaPostTransforms;
        this.elizaKeywords = elizaKeywords;

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

export default elizabot;