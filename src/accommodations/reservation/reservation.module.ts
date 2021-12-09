import { Module } from '@nestjs/common';
import { AccommodationsDatabaseModule } from 'src/database/accommodationsDatabase/accommodationsDatabase.module';
import { ReservationDatabaseModule } from 'src/database/reservation-database/reservation-database.module';
import { UsersDatabaseModule } from 'src/database/users-database/users-database.module';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';

@Module({
  imports: [
    ReservationDatabaseModule,
    UsersDatabaseModule,
    AccommodationsDatabaseModule,
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
