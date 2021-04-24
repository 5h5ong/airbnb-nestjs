import { Inject, Injectable } from '@nestjs/common';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { AccommodationsDatabaseService } from 'src/database/accommodationsDatabase/accommodationsDatabase.service';

@Injectable()
export class AccommodationsService {
  constructor(
    private accommodationsDatabaseService: AccommodationsDatabaseService,
  ) {}

  create(accommodationsData: CreateAccommodationsDto) {
    return this.accommodationsDatabaseService.create(accommodationsData);
  }

  async getAll() {
    return this.accommodationsDatabaseService.getAll();
  }

  async getOne(id: string) {
    return this.accommodationsDatabaseService.getOne(id);
  }

  delete(id: string) {
    return this.accommodationsDatabaseService.delete(id);
  }
}
