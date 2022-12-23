import { Configuration, OpenAIApi } from 'openai';
import { File } from '../Domain/File';
import { TextToImageInterface } from '../Domain/TextToImageInterface';

export class TextToImageDalle implements TextToImageInterface {
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey
    });
    this.openai = new OpenAIApi(configuration);
  }

  async fromString(text: string): Promise<File> {
    const response = await this.openai.createImage({
      prompt: text,
      n: 1,
      size: '512x512'
    });

    const image_url = response.data.data[0].url;

    if (undefined == image_url) {
      throw new Error('could create image');
    }

    return Promise.resolve({
      path: image_url
    });
  }
}
