import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { authUserDto } from './dto/auth-users.dto';
import { createUsersDto } from './dto/create-users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() usersData: createUsersDto) {
    return this.usersService.create(usersData);
  }

  @Get(':email')
  getOne(@Param('email') email: string) {
    return this.usersService.getOne(email);
  }

  @Post('/signin')
  signIn(@Body() signInData: authUserDto) {
    return this.usersService.signIn(signInData);
  }
}
