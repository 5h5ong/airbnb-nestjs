import { HttpModule, Module } from '@nestjs/common';
import { ReservationDatabaseModule } from 'src/database/reservation-database/reservation-database.module';
import { UsersDatabaseModule } from 'src/database/users-database/users-database.module';
import { UsersService } from 'src/users/users.service';
import { AccommodationsDatabaseModule } from '../database/accommodationsDatabase/accommodationsDatabase.module';
import { AccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';
import { ReservationService } from './reservation/reservation.service';

@Module({
  imports: [
    AccommodationsDatabaseModule,
    UsersDatabaseModule,
    ReservationDatabaseModule,
    HttpModule,
  ],
  controllers: [AccommodationsController],
  providers: [AccommodationsService, ReservationService],
})
export class AccommodationsModule {}
