import { intro,outro,text } from "@clack/prompts";
import { program } from "commander";
import { exec } from "child_process";


intro("Welcome to aicli!!!")

program
    .option('--first')
    .option('-s,--seperator  <char>');


program.command('message')
    .description("to view the all the changes in the project")
    .action(() =>{
       exec('git status',(error,stdout, stderr) =>{
            if (error) {
                console.error(`Error: ${error.message}`);
                return;
              }
              if (stderr) {
                console.error(`Stderr: ${stderr}`);
                return;
              }
              console.log(`Output: ${stdout}`);
        })
    })
program.parse();


outro('you are all set')