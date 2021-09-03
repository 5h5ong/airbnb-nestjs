import { OmitType } from '@nestjs/mapped-types';
import { ReservationDto } from './reservation.dto';

export class CreateReservationDto extends OmitType(ReservationDto, [
  'userId',
]) {}
