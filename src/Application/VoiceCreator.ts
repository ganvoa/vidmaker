import { File } from '../Domain/File';
import { TextToSpeechInterface } from '../Domain/TextToSpeechInterface';

export class VoiceCreator {
  constructor(private voiceCreatorService: TextToSpeechInterface) {}

  async create(text: string): Promise<File> {
    const file = await this.voiceCreatorService.fromString(text);
    return Promise.resolve(file);
  }
}
