import { randomUUID } from 'crypto';
import { FileDownloaderInterface } from '../Domain/FileWriterInterface';
import { ScriptParser } from '../Domain/ScriptParser';
import { VoiceCreator } from './VoiceCreator';

export class NarrativeCreator {
  constructor(
    private readonly scriptParser: ScriptParser,
    private readonly voiceCreator: VoiceCreator,
    private readonly fileDownloader: FileDownloaderInterface
  ) {}

  async create(path: string): Promise<void> {
    const script = await this.scriptParser.parse(path);

    const basepath = process.cwd();
    const uuid = randomUUID();

    console.info(`creating intro: ${script.intro.slice(0, 30)}...`);
    const introFile = await this.voiceCreator.create(script.intro);
    console.log(`intro file: ${introFile.path}`);
    await this.fileDownloader.dowload(introFile.path, `${basepath}/output/${uuid}/intro.wav`);

    console.info(`creating firstParagraph: ${script.firstParagraph.slice(0, 30)}...`);
    const firstParagraphFile = await this.voiceCreator.create(script.firstParagraph);
    console.log(`firstParagraph file: ${firstParagraphFile.path}`);
    await this.fileDownloader.dowload(firstParagraphFile.path, `${basepath}/output/${uuid}/1p.wav`);

    console.info(`creating firstTitle: ${script.firstTitle.slice(0, 30)}...`);
    const firstTitleFile = await this.voiceCreator.create(script.firstTitle);
    console.log(`firstTitle file: ${firstTitleFile.path}`);
    await this.fileDownloader.dowload(firstTitleFile.path, `${basepath}/output/${uuid}/1t.wav`);

    console.info(`creating secondParagraph: ${script.secondParagraph.slice(0, 30)}...`);
    const secondParagraphFile = await this.voiceCreator.create(script.secondParagraph);
    console.log(`secondParagraph file: ${secondParagraphFile.path}`);
    await this.fileDownloader.dowload(secondParagraphFile.path, `${basepath}/output/${uuid}/2p.wav`);

    console.info(`creating secondTitle: ${script.secondTitle.slice(0, 30)}...`);
    const secondTitleFile = await this.voiceCreator.create(script.secondTitle);
    console.log(`secondTitle file: ${secondTitleFile.path}`);
    await this.fileDownloader.dowload(secondTitleFile.path, `${basepath}/output/${uuid}/2t.wav`);

    console.info(`creating thirdParagraph: ${script.thirdParagraph.slice(0, 30)}...`);
    const thirdParagraphFile = await this.voiceCreator.create(script.thirdParagraph);
    console.log(`thirdParagraph file: ${thirdParagraphFile.path}`);
    await this.fileDownloader.dowload(thirdParagraphFile.path, `${basepath}/output/${uuid}/3p.wav`);

    console.info(`creating thirdTitle: ${script.thirdTitle.slice(0, 30)}...`);
    const thirdTitleFile = await this.voiceCreator.create(script.thirdTitle);
    console.log(`thirdTitle file: ${thirdTitleFile.path}`);
    await this.fileDownloader.dowload(thirdTitleFile.path, `${basepath}/output/${uuid}/3t.wav`);

    console.info(`creating outro: ${script.outro.slice(0, 30)}...`);
    const outroFile = await this.voiceCreator.create(script.outro);
    console.log(`outro file: ${outroFile.path}`);
    await this.fileDownloader.dowload(outroFile.path, `${basepath}/output/${uuid}/outro.wav`);

    return Promise.resolve();
  }
}
