import { Injectable } from '@nestjs/common';
import { AccommodationsDatabaseService } from 'src/database/accommodationsDatabase/accommodationsDatabase.service';
import { ReservationDatabaseService } from 'src/database/reservation-database/reservation-database.service';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationDatabaseService: ReservationDatabaseService,
    private readonly usersDatabaseService: UsersDatabaseService,
    private readonly accommodationsDatabaseService: AccommodationsDatabaseService,
  ) {}
  async create(reservationData: ReservationDto) {
    const { userId, accommodationsId } = reservationData;
    const newReservationData = await this.reservationDatabaseService.create({
      ...reservationData,
    });

    // Create connection to User
    this.usersDatabaseService.connectReservation(userId, newReservationData.id);
    // Create connection to Accommodations
    this.accommodationsDatabaseService.connectReservation(
      accommodationsId,
      newReservationData.id,
    );
  }
  async delete(reservationId: string) {
    // get user and accommodation id
    const reservationData = await this.reservationDatabaseService.getOneFromId(
      reservationId,
    );
    const { userId, accommodationsId } = reservationData;

    // delete reservation id in User
    this.usersDatabaseService.disconnectReservation(userId, reservationId);
    this.accommodationsDatabaseService.disconnectReservation(
      accommodationsId,
      reservationId,
    );

    // delete reservation
    this.reservationDatabaseService.delete(reservationId);

    return { userId, accommodationsId };
  }
}
