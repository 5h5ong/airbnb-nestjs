import { Body, Controller, Post } from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Post()
  create(@Body() accommodationsData: CreateAccommodationsDto) {
    return this.accommodationsService.create(accommodationsData);
  }
}
