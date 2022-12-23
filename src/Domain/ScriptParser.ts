import { FileReaderInterface } from './FileReaderInterface';
import { Script } from './Script';

export class ScriptParser {
  constructor(private fileReader: FileReaderInterface) {}

  async parse(filePath: string): Promise<Script> {
    const content = await this.fileReader.fromPath(filePath);

    const introMatch = content.match(/Intro: "([\w\W]+?)"/);
    if (undefined == introMatch) {
      throw new Error('intro not found');
    }
    const intro = introMatch[1];

    const firstParagraphMatch = content.match(/TYDK1: "([\w\W]+?)"[\w\W]+?"([\w\W]+?)"/);
    if (undefined == firstParagraphMatch) {
      throw new Error('TYDK1 not found');
    }
    const firstTitle = firstParagraphMatch[1];
    const firstParagraph = firstParagraphMatch[2];

    const secondParagraphMatch = content.match(/TYDK2: "([\w\W]+?)"[\w\W]+?"([\w\W]+?)"/);
    if (undefined == secondParagraphMatch) {
      throw new Error('TYDK2 not found');
    }
    const secondTitle = secondParagraphMatch[1];
    const secondParagraph = secondParagraphMatch[2];

    const thirdParagraphMatch = content.match(/TYDK3: "([\w\W]+?)"[\w\W]+?"([\w\W]+?)"/);
    if (undefined == thirdParagraphMatch) {
      throw new Error('TYDK3 not found');
    }
    const thirdTitle = thirdParagraphMatch[1];
    const thirdParagraph = thirdParagraphMatch[2];

    const outroMatch = content.match(/Outro: "([\w\W]+?)"/);
    if (undefined == outroMatch) {
      throw new Error('outro not found');
    }
    const outro = outroMatch[1];

    return Promise.resolve({
      intro: intro,
      firstTitle: firstTitle,
      firstParagraph: firstParagraph,
      secondTitle: secondTitle,
      secondParagraph: secondParagraph,
      thirdTitle: thirdTitle,
      thirdParagraph: thirdParagraph,
      outro: outro
    });
  }
}
