import { Module } from '@nestjs/common';
import { GcsService } from 'src/core/gcs/gcs.service';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [],
  controllers: [UploadController],
  providers: [UploadService, GcsService],
})
export class UploadModule {}
