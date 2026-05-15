export interface IImageStorageService {
  uploadImage(file: any): Promise<string>;
}