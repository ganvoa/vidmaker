import { NarrativeParser } from '../Domain/NarrativeParser';
import { VoiceCreator } from './VoiceCreator';

export class NarrativeCreator {
  constructor(private narrativeParser: NarrativeParser, private voiceCreator: VoiceCreator) {}

  async fromFile(path: string): Promise<void> {
    const narrative = await this.narrativeParser.parse(path);

    console.info(`creating intro: ${narrative.intro.slice(0, 20)}...`);
    const introFile = await this.voiceCreator.create(narrative.intro);
    console.log(`intro file: ${introFile.path}`);

    console.info(`creating firstParagraph: ${narrative.firstParagraph.slice(0, 20)}...`);
    const firstParagraphFile = await this.voiceCreator.create(narrative.firstParagraph);
    console.log(`firstParagraph file: ${firstParagraphFile.path}`);

    console.info(`creating firstTitle: ${narrative.firstTitle.slice(0, 20)}...`);
    const firstTitleFile = await this.voiceCreator.create(narrative.firstTitle);
    console.log(`firstTitle file: ${firstTitleFile.path}`);

    console.info(`creating secondParagraph: ${narrative.secondParagraph.slice(0, 20)}...`);
    const secondParagraphFile = await this.voiceCreator.create(narrative.secondParagraph);
    console.log(`secondParagraph file: ${secondParagraphFile.path}`);

    console.info(`creating secondTitle: ${narrative.secondTitle.slice(0, 20)}...`);
    const secondTitleFile = await this.voiceCreator.create(narrative.secondTitle);
    console.log(`secondTitle file: ${secondTitleFile.path}`);

    console.info(`creating thirdParagraph: ${narrative.thirdParagraph.slice(0, 20)}...`);
    const thirdParagraphFile = await this.voiceCreator.create(narrative.thirdParagraph);
    console.log(`thirdParagraph file: ${thirdParagraphFile.path}`);

    console.info(`creating thirdTitle: ${narrative.thirdTitle.slice(0, 20)}...`);
    const thirdTitleFile = await this.voiceCreator.create(narrative.thirdTitle);
    console.log(`thirdTitle file: ${thirdTitleFile.path}`);

    console.info(`creating outro: ${narrative.outro.slice(0, 20)}...`);
    const outroFile = await this.voiceCreator.create(narrative.outro);
    console.log(`outro file: ${outroFile.path}`);

    return Promise.resolve();
  }
}
