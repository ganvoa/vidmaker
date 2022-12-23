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

  async fromString(text: string): Promise<File[]> {
    const response = await this.openai.createImage({
      prompt: text,
      n: 4,
      size: '512x512'
    });

    const files: File[] = [];
    for (const image of response.data.data) {
      const image_url = image.url;
      if (undefined == image_url) {
        throw new Error('could create image');
      }

      files.push({
        path: image_url
      });
    }

    return Promise.resolve(files);
  }
}
