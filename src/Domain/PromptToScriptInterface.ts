export interface PromptToScriptInterface {
  fromPrompt(prompt: string): Promise<string>;
}
