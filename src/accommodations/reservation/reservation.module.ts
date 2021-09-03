import { Module } from '@nestjs/common';
import { ReservationDatabaseModule } from 'src/database/reservation-database/reservation-database.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [ReservationDatabaseModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
