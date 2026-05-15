import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { IImageStorageService } from '../../domain/repositories/image.repository.interface';
import 'dotenv/config';

@Injectable()
export class CloudinaryStorageService implements IImageStorageService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET, // Usa variables de entorno
    });
  }

  async uploadImage(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'bitacoras' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!.secure_url);
        },
      );

      upload.end(file.buffer);
    });
  }
}
