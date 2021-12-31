import { Bucket, Storage } from '@google-cloud/storage';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class GcsService {
  private storage: Storage;
  private baseBuckets: Bucket;

  constructor() {
    this.storage = new Storage();
    this.baseBuckets = this.storage.bucket('airbnb-clone-288086.appspot.com');
  }

  async uploadFileToGcs(fileToUpload: Express.Multer.File) {
    // 업로드에 필요한 파일 받아오기
    const { originalname, mimetype, buffer } = fileToUpload;

    // GCS 형식에 맞는 파일 생성
    const newFile = this.baseBuckets.file(originalname);
    // GCS에 저장

    try {
      await newFile.save(buffer, {
        contentType: mimetype,
        public: true,
      });
      return originalname;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
