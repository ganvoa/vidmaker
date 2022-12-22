import { File } from './File';

export interface TextToSpeechInterface {
  fromString(text: string): Promise<File>;
}
