import { randomUUID } from 'crypto';
import { FileDownloaderInterface } from '../Domain/FileWriterInterface';
import { ScriptParser } from '../Domain/ScriptParser';
import { ImageCreator } from './ImageCreator';
import { VoiceCreator } from './VoiceCreator';

export class NarrativeCreator {
  constructor(
    private readonly scriptParser: ScriptParser,
    private readonly voiceCreator: VoiceCreator,
    private readonly imageCreator: ImageCreator,
    private readonly fileDownloader: FileDownloaderInterface
  ) {}

  async create(path: string): Promise<void> {
    const script = await this.scriptParser.parse(path);

    const basepath = process.cwd();
    const uuid = randomUUID();

    console.info(`creating title audio: ${script.title.slice(0, 30)}...`);
    const titleFile = await this.voiceCreator.create(script.title);
    console.log(`title audio file: ${titleFile.path}`);
    await this.fileDownloader.dowload(titleFile.path, `${basepath}/output/${uuid}/title.wav`);

    console.info(`creating title image: ${script.title.slice(0, 30)}...`);
    const titleImages = await this.imageCreator.create(script.title);

    let idx = 1;
    for (const titleImage of titleImages) {
      console.log(`title image file: ${titleImage.path}`);
      await this.fileDownloader.dowload(titleImage.path, `${basepath}/output/${uuid}/image${idx}.png`);
      idx++;
    }

    console.info(`creating summary: ${script.summary.slice(0, 30)}...`);
    const summaryFile = await this.voiceCreator.create(script.summary);
    console.log(`summary file: ${summaryFile.path}`);
    await this.fileDownloader.dowload(summaryFile.path, `${basepath}/output/${uuid}/summary.wav`);

    return Promise.resolve();
  }
}
