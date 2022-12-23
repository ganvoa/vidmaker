import dotenv from 'dotenv';
import { ImageCreator } from '../src/Application/ImageCreator';

dotenv.config();

import { TextToImageDalle } from '../src/Infrastructure/TextToImageDalle';

async function run(text: string) {
  console.log(`t2i: ${text}`);

  const apiKey: string = process.env.OPENAI_API_KEY || 'API_KEY';

  const t2iService = new TextToImageDalle(apiKey);
  const imageCreator = new ImageCreator(t2iService);
  try {
    const file = await imageCreator.create(text);
    console.log(file);
  } catch (error) {
    console.error(error);
  }
}

const myArgs = process.argv.slice(2);
if (myArgs.length != 1) {
  console.error('should specify text.');
}
run(myArgs[0]);
