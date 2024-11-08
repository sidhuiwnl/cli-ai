#!/usr/bin/env node

import { green, red } from "kolorist";
import { program } from "commander";
import  { execa } from "execa"
import generateCommitMessage from "../lib/msggenerator.js";




  


program.command("message")
    .description("to view the all the changes in the project")
    .action(async() =>{
      const  { stdout } = await execa('git',['diff']);

      if(!stdout){
        console.log("nothing to commit")
      }
      if(stdout){
        const lines = stdout.split('\n').map((line) =>{
          if(line.startsWith('---') || line.startsWith('-')){
            return red(line)
          }else if(line.startsWith('+++') || line.startsWith('+')){
            return green(line)
          }else{
            return line
          }
        }).join('\n')

        
        const commitMessage = await generateCommitMessage(lines);

        console.log(commitMessage)
      }
      
    })
program.parse();

