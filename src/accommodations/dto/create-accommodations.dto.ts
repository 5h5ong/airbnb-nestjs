import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAccommodationsDto {
  @IsString()
  /** 집 이름 */
  readonly name: string;
  /** 가격 */
  @IsNumber()
  readonly price: number;
  /** 여러 개의 이미지 */
  @IsString({ each: true })
  readonly image: string[];
  /** 도로명 주소 */
  @IsString()
  readonly address: string;
  /** 간단한 설명 */
  @IsOptional()
  @IsString()
  readonly description: string;
  /** Accommodations을 생성한 User의 ID */
  readonly user: string;
}
