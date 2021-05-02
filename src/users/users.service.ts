import { Injectable } from '@nestjs/common';
import { createUsersDto } from 'src/accommodations/dto/create-users.dto';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersDatabaseService: UsersDatabaseService) {}

  /**
   * Create Hash using the password.
   */
  createPasswordHash(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltOrRounds);
    return hashedPassword;
  }

  create(usersData: createUsersDto) {
    const { password } = usersData;

    // Hashing Password
    const hashedPassword = this.createPasswordHash(password);

    // Create User Document
    return this.usersDatabaseService.create({
      ...usersData,
      password: hashedPassword,
    });
  }

  getOne(userId: string) {
    return this.usersDatabaseService.getOne(userId);
  }
}
