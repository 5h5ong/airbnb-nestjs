import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateAccommodationsDto } from './create-accommodations.dto';

/**
 * User Collection DTO 정의
 *
 * role : 에어비엔비 게스트, 호스트 역할 관리
 */
export class createUsersDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  role: 'guest' | 'host';
  @IsArray({ each: true })
  @IsOptional()
  accommodations: CreateAccommodationsDto[];
}
