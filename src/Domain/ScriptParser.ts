import { FileReaderInterface } from './FileReaderInterface';
import { Script } from './Script';

export class ScriptParser {
  constructor(private fileReader: FileReaderInterface) {}

  async parse(filePath: string): Promise<Script> {
    const content = await this.fileReader.fromPath(filePath);

    const titleMatch = content.match(/Title: "([\w\W]+?)"/);
    if (undefined == titleMatch) {
      throw new Error('Title not found');
    }
    const title = titleMatch[1];

    const summaryMatch = content.match(/Summary: "([\w\W]+?)"/);
    if (undefined == summaryMatch) {
      throw new Error('Summary not found');
    }
    const summary = summaryMatch[1];

    return Promise.resolve({
      title: title,
      summary: summary
    });
  }
}
