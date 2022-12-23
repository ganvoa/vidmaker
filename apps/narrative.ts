import dotenv from 'dotenv';
import { ImageCreator } from '../src/Application/ImageCreator';
import { NarrativeCreator } from '../src/Application/NarrativeCreator';

dotenv.config();

import { VoiceCreator } from '../src/Application/VoiceCreator';
import { ScriptParser } from '../src/Domain/ScriptParser';
import { FileDownloader } from '../src/Infrastructure/FileDownloader';
import { FileReader } from '../src/Infrastructure/FileReader';
import { HttpClientFetch } from '../src/Infrastructure/HttpClientFetch';
import { TextToImageDalle } from '../src/Infrastructure/TextToImageDalle';
import { TextToSpeechUD } from '../src/Infrastructure/TextToSpeechUD';

async function run(path: string) {
  console.log(`narrative file: ${path}`);

  const apiKey: string = process.env.UBERDUCK_API_KEY || 'API_KEY';
  const apiSecret: string = process.env.UBERDUCK_API_SECRET || 'API_SECRET';
  const voiceId: string = process.env.UBERDUCK_VOICE_ID || 'VOICE_ID';
  const apiKeyDalle: string = process.env.OPENAI_API_KEY || 'API_KEY';

  const httpClient = new HttpClientFetch();

  const t2sService = new TextToSpeechUD(apiKey, apiSecret, voiceId, httpClient);
  const voiceCreator = new VoiceCreator(t2sService);
  const fileReader = new FileReader();
  const narrativeParser = new ScriptParser(fileReader);
  const fileDownloader = new FileDownloader();
  const t2iService = new TextToImageDalle(apiKeyDalle);
  const imageCreator = new ImageCreator(t2iService);
  const narrativeCreator = new NarrativeCreator(narrativeParser, voiceCreator, imageCreator, fileDownloader);
  try {
    await narrativeCreator.create(path);
  } catch (error) {
    console.error(error);
  }
}

const myArgs = process.argv.slice(2);
if (myArgs.length != 1) {
  console.error('should specify path.');
}
run(myArgs[0]);
