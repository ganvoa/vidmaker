import dotenv from 'dotenv';

dotenv.config();

import { VoiceCreator } from '../src/Application/VoiceCreator';
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
  try {
    const file = await voiceCreator.createForText(text);
    console.log(file.path);
  } catch (error) {
    console.error(error);
  }
}

const myArgs = process.argv.slice(2);
if (myArgs.length != 1) {
  console.error('should specify text.');
}
run(myArgs[0]);
