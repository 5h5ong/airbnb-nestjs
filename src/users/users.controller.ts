import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { createUsersDto } from 'src/accommodations/dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() usersData: createUsersDto) {
    return this.usersService.create(usersData);
  }

  @Get(':id')
  getOne(@Param('id') userId: string) {
    return this.usersService.getOne(userId);
  }
}
