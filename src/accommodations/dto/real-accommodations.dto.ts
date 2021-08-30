import { IsNumber } from 'class-validator';
import { CreateAccommodationsDto } from './create-accommodations.dto';

/**
 * 전달받은 데이터의 주소에서 Google Map에서 사용할 lag, lat를 추가함.
 */
export class RealAccommodationDto extends CreateAccommodationsDto {
  @IsNumber()
  readonly lat: number;
  @IsNumber()
  readonly lng: number;
}
