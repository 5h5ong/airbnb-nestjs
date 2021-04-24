import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { accommodationsDatabaseProviders } from './accommodationsDatabase.providers';
import { AccommodationsDatabaseService } from './accommodationsDatabase.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...accommodationsDatabaseProviders,
    AccommodationsDatabaseService,
  ],
  // 외부 module에서 사용하려면 반드시 exports에 넣어줘야 함.
  exports: [AccommodationsDatabaseService],
})
export class AccommodationsDatabaseModule {}
