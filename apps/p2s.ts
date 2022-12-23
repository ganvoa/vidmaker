import dotenv from 'dotenv';
import { ScriptCreator } from '../src/Application/ScriptCreator';
import { PrompToScriptDalle } from '../src/Infrastructure/PrompToScriptDalle';

dotenv.config();

async function run(topic: string) {
  const prompt = `write something i probably dont know about ${topic} with this format. Title: "quoted title" Explanation: "quoted explanation"`;
  console.log(`p2s: ${prompt}`);

  const apiKey: string = process.env.OPENAI_API_KEY || 'API_KEY';

  const p2sService = new PrompToScriptDalle(apiKey);
  const scriptCreator = new ScriptCreator(p2sService);
  try {
    const script = await scriptCreator.create(prompt);
    console.log(script);
  } catch (error) {
    console.error(error);
  }
}

const myArgs = process.argv.slice(2);
if (myArgs.length != 1) {
  console.error('should specify topic.');
}
run(myArgs[0]);
