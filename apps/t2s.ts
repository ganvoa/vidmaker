import { randomUUID } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

import { VoiceCreator } from '../src/Application/VoiceCreator';
import { FileDownloader } from '../src/Infrastructure/FileDownloader';
import { HttpClientFetch } from '../src/Infrastructure/HttpClientFetch';
import { TextToSpeechUD } from '../src/Infrastructure/TextToSpeechUD';

async function run(text: string) {
  console.log(`t2s: ${text}`);

  const apiKey: string = process.env.UBERDUCK_API_KEY || 'API_KEY';
  const apiSecret: string = process.env.UBERDUCK_API_SECRET || 'API_SECRET';
  const voiceId: string = process.env.UBERDUCK_VOICE_ID || 'VOICE_ID';

  const httpClient = new HttpClientFetch();

  const t2sService = new TextToSpeechUD(apiKey, apiSecret, voiceId, httpClient);
  const voiceCreator = new VoiceCreator(t2sService);
  const fileDownloader = new FileDownloader();

  try {
    const basepath = process.cwd();
    const uuid = randomUUID();
    const file = await voiceCreator.create(text);
    const filePath = `${basepath}/output/${uuid}/intro.wav`;
    console.log(file.path);
    await fileDownloader.dowload(file.path, filePath);
    console.log(filePath);
  } catch (error) {
    console.error(error);
  }
}

const myArgs = process.argv.slice(2);
if (myArgs.length != 1) {
  console.error('should specify text.');
}
run(myArgs[0]);
