import { red,green } from "kolorist";

import { intro,outro } from "@clack/prompts";
import { program } from "commander";

import  { execa } from "execa"



program
    .option('--first')
    .option('-s,--seperator  <char>');


program.command("message")
    .description("to view the all the changes in the project")
    .action(async() =>{
      const  { stdout } = await execa('git',['diff']);
      
    })
program.parse();


