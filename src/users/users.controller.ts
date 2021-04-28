import { Body, Controller, Post } from '@nestjs/common';
import { createUsersDto } from 'src/accommodations/dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() usersData: createUsersDto) {
    return this.usersService.create(usersData);
  }
}
