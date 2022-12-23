export interface FileDownloaderInterface {
  dowload(url: string, path: string): Promise<void>;
}
