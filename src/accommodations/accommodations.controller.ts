import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccommodationsService } from './accommodations.service';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { UpdateAccommodationsDto } from './dto/update-accommodations.dto';

@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Get('test')
  test() {
    return this.accommodationsService.test();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() accommodationsData: CreateAccommodationsDto) {
    return this.accommodationsService.create(accommodationsData, req);
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
