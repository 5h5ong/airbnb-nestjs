import { Injectable } from '@nestjs/common';
import { ReservationDatabaseService } from 'src/database/reservation-database/reservation-database.service';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationDatabaseService: ReservationDatabaseService,
  ) {}
  create(reservationData: ReservationDto) {
    return this.reservationDatabaseService.create({ ...reservationData });
  }
}
