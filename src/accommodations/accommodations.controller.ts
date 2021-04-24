import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { UpdateAccommodationsDto } from './dto/update-accommodations.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() accommodationsData: UpdateAccommodationsDto,
  ) {
    return this.accommodationsService.update(id, accommodationsData);
  }
}
