"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@clack/prompts");
const cleye_1 = require("cleye");
(0, prompts_1.intro)('Welcome to autoCommit');
const args = (0, cleye_1.cli)({
    name: "greet.js",
    parameters: [
        '<first name>',
        '[last_name]'
    ],
    flags: {
        time: {
            type: String,
            description: "Time of day to greet (morning or evening)",
            default: "morning"
        }
    }
});
const name = [args._.firstName, args._.lastName].filter(Boolean).join(" ");
if (args.flags.time === 'morning') {
    console.log(`Good morning ${name}!`);
}
else {
    console.log(`Good evening ${name}!`);
}
(0, prompts_1.outro)('to are all set');
