import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { DocumentData } from '@google-cloud/firestore';

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Post()
  create(@Body() accommodationsData: CreateAccommodationsDto) {
    return this.accommodationsService.create(accommodationsData);
  }

  @Get()
  getAll() {
    return this.accommodationsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.accommodationsService.getOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.accommodationsService.delete(id);
  }
}
