import { PartialType } from '@nestjs/mapped-types';
import { CreateAccommodationsDto } from './create-accommodations.dto';

export class UpdateAccommodationsDto extends PartialType(
  CreateAccommodationsDto,
) {}
