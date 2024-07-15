import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';

@Injectable()
export class AppService {

  public client;

  constructor() {
    this.initMinio()
  }

  private initMinio() {
    const defaultClientOptions = {
      endPoint: 'localhost',
      useSSL: false,
      accessKey: 'OUS6ly9dGlSbtpczk7mN',
      secretKey: 'wFc5lMmCNzFZw2tB52vQawCkl519i5Xl9c3ER2oP',
      port: 9000,
    };

    const minioClient = new Minio.Client(defaultClientOptions);

    this.client = minioClient;
  }

  async uploadFile(file, data) {
    try {
      await this.client.putObject(data.bucket, file.originalname, file.buffer, file.size);
      return `http://localhost:9000/${data.bucket}/${file.originalname}`;
    } catch (error) {
      console.log(error)
    }
  }
}
