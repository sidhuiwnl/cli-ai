"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@clack/prompts");
const commander_1 = require("commander");
const child_process_1 = require("child_process");
(0, prompts_1.intro)("Welcome to aicli!!!");
commander_1.program
    .option('--first')
    .option('-s,--seperator  <char>');
commander_1.program.command('message')
    .description("to view the all the changes in the project")
    .action(() => {
    (0, child_process_1.exec)('git status', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Output: ${stdout}`);
    });
});
commander_1.program.parse();
(0, prompts_1.outro)('you are all set');
