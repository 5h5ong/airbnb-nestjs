import { CreateAccommodationsDto } from 'src/accommodations/dto/create-accommodations.dto';

export interface AccommodationObjectType extends CreateAccommodationsDto {
  id: string;
}
