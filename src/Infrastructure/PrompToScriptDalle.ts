import { Configuration, OpenAIApi } from 'openai';
import { PromptToScriptInterface } from '../Domain/PromptToScriptInterface';

export class PrompToScriptDalle implements PromptToScriptInterface {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey
    });
    this.openai = new OpenAIApi(configuration);
  }

  async fromPrompt(prompt: string): Promise<string> {
    const response = await this.openai.createCompletion({
      prompt: prompt,
      model: 'text-davinci-003',
      n: 1,
      max_tokens: 2000
    });

    const answer = response.data.choices[0].text;
    if (undefined == answer) {
      throw new Error('couldnt create text');
    }

    return Promise.resolve(answer);
  }
}
