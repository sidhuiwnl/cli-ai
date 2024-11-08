import { modal } from "./modal.js";

export default async function generateCommitMessage(commits: string) {
  const prompt = `Generate a concise commit message based on the provided git diff content: ${commits}`;

  const result = await modal.generateContent(prompt);

  return result.response.text();
}

