export interface FileReaderInterface {
  fromPath(path: string): Promise<string>;
}
