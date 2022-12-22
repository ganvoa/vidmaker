import { File } from '../Domain/File';
import { HttpClientInterface } from '../Domain/HttpClientInterface';
import { TextToSpeechInterface } from '../Domain/TextToSpeechInterface';
import { sleep } from './Helper';

export class TextToSpeechUD implements TextToSpeechInterface {
  constructor(private apiKey: string, private apiSecret: string, private voiceId: string, private httpClient: HttpClientInterface) {}

  async fromString(text: string): Promise<File> {
    const endpointAsk = 'https://api.uberduck.ai/speak';
    const endpointPoll = 'https://api.uberduck.ai/speak-status';

    const responseAsk = await this.httpClient.post({
      url: endpointAsk,
      body: JSON.stringify({ speech: text, voice: this.voiceId }),
      username: this.apiKey,
      password: this.apiSecret
    });

    if (responseAsk.statusCode != 200) {
      const errorMessage = `responseAsk: An error occurred: ${responseAsk.statusCode}:${responseAsk.body}`;
      throw new Error(errorMessage);
    }

    let responseAskAsObject = JSON.parse(responseAsk.body) as { uuid: string };

    let succeed = false;
    let tries = 0;
    let audioPath: string | null = null;
    do {
      const responsePoll = await this.httpClient.get({
        url: `${endpointPoll}?uuid=${responseAskAsObject.uuid}`,
        username: this.apiKey,
        password: this.apiSecret
      });

      if (responsePoll.statusCode != 200) {
        const errorMessage = `responsePoll - An error occurred: ${responsePoll.statusCode}:${responsePoll.body}`;
        throw new Error(errorMessage);
      }

      let responsePollAsObject = JSON.parse(responsePoll.body) as {
        failed_at: string | null;
        finished_at: string | null;
        path: string | null;
        started_at: string;
      };

      if (responsePollAsObject.failed_at != null) {
        const errorMessage = `An error occurred polling: failed_at ${responsePollAsObject.failed_at}`;
        throw new Error(errorMessage);
      }

      if (responsePollAsObject.path != null) {
        succeed = true;
        audioPath = responsePollAsObject.path;
      }

      tries++;
      if (!succeed) {
        await sleep(1000);
      }
    } while (tries < 15 || !succeed);

    if (audioPath == null) {
      const errorMessage = `audiopath not found for uuid: ${responseAskAsObject.uuid}`;
      throw new Error(errorMessage);
    }

    return Promise.resolve({
      path: audioPath
    });
  }
}
