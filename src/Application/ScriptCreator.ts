import { PromptToScriptInterface } from '../Domain/PromptToScriptInterface';

export class ScriptCreator {
  constructor(private promptToScript: PromptToScriptInterface) {}

  async create(prompt: string): Promise<string> {
    const string = await this.promptToScript.fromPrompt(prompt);
    return Promise.resolve(string);
  }
}
