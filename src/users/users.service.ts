import { Injectable } from '@nestjs/common';
import { createUsersDto } from 'src/accommodations/dto/create-users.dto';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';

@Injectable()
export class UsersService {
  constructor(private readonly usersDatabaseService: UsersDatabaseService) {}

  create(usersData: createUsersDto) {
    return this.usersDatabaseService.create(usersData);
  }
}
