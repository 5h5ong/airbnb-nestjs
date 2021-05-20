import { Injectable } from '@nestjs/common';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { AccommodationsDatabaseService } from 'src/database/accommodationsDatabase/accommodationsDatabase.service';
import { UpdateAccommodationsDto } from './dto/update-accommodations.dto';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';

@Injectable()
export class AccommodationsService {
  constructor(
    private accommodationsDatabaseService: AccommodationsDatabaseService,
    private userDatabaseService: UsersDatabaseService,
  ) {}

  async create(accommodationsData: CreateAccommodationsDto, req: any) {
    const accommodationObject: CreateAccommodationsDto = {
      ...accommodationsData,
      user: req.user.id,
    };

    // Accommodation 생성 및 데이터 반환
    const accommodationData = await this.accommodationsDatabaseService.create(
      accommodationObject,
    );

    // User에 생성될 Accommodation ID 등록
    await this.userDatabaseService.connectAccommodation(
      req.user.id,
      accommodationData.id,
    );

    return accommodationObject;
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

  update(id: string, accommodationsData: UpdateAccommodationsDto) {
    return this.accommodationsDatabaseService.update(id, accommodationsData);
  }
}
