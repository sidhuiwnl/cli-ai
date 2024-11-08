#!/usr/bin/env node

import { green, red,yellow } from "kolorist";
import { program } from "commander";
import { execa } from "execa";
import generateCommitMessage from "../lib/msggenerator.js";

program
  .command("message")
  .description("to view the all the changes in the project")
  .action(async () => {

    try {
      const { stdout : gitStatus } = await execa("git",["rev-parse","--is-inside-work-tree"]).catch(() => ({stdout : ""}));

      if(!gitStatus){
        console.log(yellow("Initializing a new Git repository..."));
        await execa("git",["init"]);
      }

      await execa("git",["add","."]);

      const { stdout : diffOutput } = await execa("git",["diff","--cached"]);

      if(!diffOutput){
        console.log(yellow("Nothing to commit."));
        return;
      }

      const formattedDiff = diffOutput
      .split("\n")
      .map((line) => {
        if (line.startsWith("---") || line.startsWith("-")) {
          return red(line);
        } else if (line.startsWith("+++") || line.startsWith("+")) {
          return green(line);
        } else {
          return line;
        }
      })
      .join("\n");

      const commitMessage = await generateCommitMessage(formattedDiff);

      await execa("git", ["commit", "-m", commitMessage]);
      console.log(green(`Changes committed with message: "${commitMessage}"`));

    } catch (error) {
      console.error(red("Error executing command:"), error);
    }
  });
  


program.parse();
