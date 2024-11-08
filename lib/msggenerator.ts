import { modal } from "./modal.js";

export default async function generateCommitMessage(commits: string) {
  const prompt = `Generate a complete, concise commit message in a single sentence based on this git diff: ${commits}`;

  const result = await modal.generateContent(prompt);

  return result.response.text();
}
