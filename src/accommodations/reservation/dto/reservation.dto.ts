import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsString,
  ValidateNested,
} from 'class-validator';

class ReservationType {
  @IsDateString()
  start: string;
  @IsDateString()
  end: string;
}

export class ReservationDto {
  /** 발행한 유저의 아이디 */
  @IsString()
  readonly userId: string;
  /** 예약한 숙소의 아이디 */
  @IsString()
  readonly accommodationsId: string;
  /** 예약한 날짜 */
  @ValidateNested()
  @Type(() => ReservationType)
  readonly reservationDate: ReservationType;
  /** 발행 날짜 */
  @IsDateString()
  readonly issuedDate: string;
}
