import { Injectable } from '@nestjs/common';
import { GcsService } from 'src/core/gcs/gcs.service';

@Injectable()
export class UploadService {
  constructor(private readonly gcsService: GcsService) {}
  /**
   * 파일을 Google Cloud Storage에 업로드함
   * @param file 업로드할 파일
   */
  uploadFileToGcs(file: Express.Multer.File) {
    return this.gcsService.uploadFileToGcs(file);
  }

  /**
   * 파일들을 Google Cloud Storage에 업로드함
   * @param files 업로드할 파일들
   */
  async uploadFilesGcs(files: Array<Express.Multer.File>) {
    const promises = files.map((file) => this.gcsService.uploadFileToGcs(file));
    try {
      const filenames = await Promise.all(promises);
      return filenames;
    } catch (error) {
      throw error;
    }
  }
}
