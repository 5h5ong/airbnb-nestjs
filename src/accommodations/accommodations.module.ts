import { Module } from '@nestjs/common';
import { AccommodationsDatabaseModule } from '../database/accommodationsDatabase/accommodationsDatabase.module';
import { AccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';

@Module({
  imports: [AccommodationsDatabaseModule],
  controllers: [AccommodationsController],
  providers: [AccommodationsService],
})
export class AccommodationsModule {}
