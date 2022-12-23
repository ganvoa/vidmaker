import { File } from './File';

export interface TextToImageInterface {
  fromString(text: string): Promise<File>;
}
