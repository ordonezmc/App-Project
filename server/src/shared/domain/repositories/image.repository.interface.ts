export interface IImageStorageService {
  uploadImage(file: any): Promise<string>;
  deleteImage(url: string): Promise<void>;
}