import { File } from '../Domain/File';
import { TextToImageInterface } from '../Domain/TextToImageInterface';

export class ImageCreator {
  constructor(private textToImage: TextToImageInterface) {}

  async create(text: string): Promise<File> {
    const file = await this.textToImage.fromString(text);
    return Promise.resolve(file);
  }
}
