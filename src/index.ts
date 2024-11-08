#!/usr/bin/env node
import { intro, outro, confirm } from "@clack/prompts";
import { green, red, yellow } from "kolorist";
import { program } from "commander";
import { execa } from "execa";
import generateCommitMessage from "../lib/msggenerator.js";

intro(green(`Welcome to cli ai`));

program
  .command("message")
  .description("to view the all the changes in the project")

  .action(async () => {
    try {
      const { stdout: gitStatus } = await execa("git", [
        "rev-parse",
        "--is-inside-work-tree",
      ]).catch(() => ({ stdout: "" }));

      if (!gitStatus) {
        console.log(yellow("Initializing a new Git repository..."));
        await execa("git", ["init"]);
      }

      await execa("git", ["add", "."]);

      const { stdout: diffOutput } = await execa("git", ["diff", "--cached"]);

      if (!diffOutput) {
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

      const response = await confirm({
        message: "Would you like to use this generated commit message?",
      });

      if (response) {
        await execa("git", ["commit", "-m", commitMessage]);
        console.log(`Changes committed with message: "${commitMessage}"`);

        const { stdout : lastCommitInfo }  = await execa("git",["log","-1","--stat","--online"]);
        console.log(lastCommitInfo)
        outro(green(`You're all set!`));
      }
    } catch (error) {
      console.error(red("Error executing command:"), error);
    }
  });

program.parse();
