import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateAccommodationsDto } from '../../accommodations/dto/create-accommodations.dto';

enum USER_ROLE {
  GUEST = 'guest',
  HOST = 'host',
}

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
  // 'guest'와 'host' 둘 중 하나만 넣어지게 만듬
  @IsEnum(USER_ROLE)
  role: USER_ROLE;
  @IsArray({ each: true })
  @IsOptional()
  accommodations: CreateAccommodationsDto[];
}
