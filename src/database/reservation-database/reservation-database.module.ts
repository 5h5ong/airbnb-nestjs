import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { reservationDatabaseProviders } from './reservation-database.providers';
import { ReservationDatabaseService } from './reservation-database.service';

@Module({
  imports: [DatabaseModule],
  providers: [reservationDatabaseProviders, ReservationDatabaseService],
  exports: [ReservationDatabaseService],
})
export class ReservationDatabaseModule {}
