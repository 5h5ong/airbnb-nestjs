import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';

@Module({
  // firestore에 접근할 수 있는 db의 inject를 위해서
  imports: [DatabaseModule],
  controllers: [AccommodationsController],
  providers: [AccommodationsService],
})
export class AccommodationsModule {}
