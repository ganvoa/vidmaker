import axios from 'axios';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { FileDownloaderInterface } from '../Domain/FileWriterInterface';

export class FileDownloader implements FileDownloaderInterface {
  async dowload(url: string, filepath: string): Promise<void> {
    const res = await axios.get(url, { responseType: 'arraybuffer' });
    await mkdir(path.dirname(filepath), { recursive: true });
    await writeFile(filepath, res.data);
    return Promise.resolve();
  }
}
