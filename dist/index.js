import { intro, outro } from "@clack/prompts";
import { program } from "commander";
import { execa } from "execa";
intro("Welcome to aicli!!!");
program
    .option('--first')
    .option('-s,--seperator  <char>');
program.command('message')
    .description("to view the all the changes in the project")
    .action(async () => {
    const { stdout } = await execa('git', ['diff']);
    console.log(stdout);
});
program.parse();
outro('you are all set');
//# sourceMappingURL=index.js.map