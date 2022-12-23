import dotenv from 'dotenv';
import { NarrativeCreator } from '../src/Application/NarrativeCreator';

dotenv.config();

import { VoiceCreator } from '../src/Application/VoiceCreator';
import { ScriptParser } from '../src/Domain/ScriptParser';
import { FileDownloader } from '../src/Infrastructure/FileDownloader';
import { FileReader } from '../src/Infrastructure/FileReader';
import { HttpClientFetch } from '../src/Infrastructure/HttpClientFetch';
import { TextToSpeechUD } from '../src/Infrastructure/TextToSpeechUD';

async function run(path: string) {
  console.log(`narrative file: ${path}`);

  const apiKey: string = process.env.UBERDUCK_API_KEY || 'API_KEY';
  const apiSecret: string = process.env.UBERDUCK_API_SECRET || 'API_SECRET';
  const voiceId: string = process.env.UBERDUCK_VOICE_ID || 'VOICE_ID';

  const httpClient = new HttpClientFetch();

  const t2sService = new TextToSpeechUD(apiKey, apiSecret, voiceId, httpClient);
  const voiceCreator = new VoiceCreator(t2sService);
  const fileReader = new FileReader();
  const narrativeParser = new ScriptParser(fileReader);
  const fileDownloader = new FileDownloader();
  const narrativeCreator = new NarrativeCreator(narrativeParser, voiceCreator, fileDownloader);
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
