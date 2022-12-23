import { readFile } from 'fs/promises';
import { FileReaderInterface } from '../Domain/FileReaderInterface';

export class FileReader implements FileReaderInterface {
  async fromPath(path: string): Promise<string> {
    const file = await readFile(path);
    return Promise.resolve(file.toString());
  }
}
