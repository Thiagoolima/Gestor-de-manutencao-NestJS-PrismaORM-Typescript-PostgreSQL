import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { FileDTO } from 'src/modules/user/dto/file.dto';

@Injectable()
export class ManagerFiles {
  private s3: S3Client;
  constructor() {
    this.s3 = new S3Client({
      endpoint: `https://${process.env.AWS_ENDPOINT}`,
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_KEY_ID,
        secretAccessKey: process.env.AWS_KEY_APP,
      },
    });
  }
  async uploadFile(files: Array<FileDTO>) {
    const { buffer, mimetype } = files[0];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `imagens/${randomUUID()}`,
      Body: buffer,
      ContentType: mimetype,
    };
    await this.s3.send(new PutObjectCommand(params));
    const url = `https://${process.env.AWS_BUCKET_NAME}.${process.env.AWS_ENDPOINT}/${params.Key}`;
    return url;
  }
}
