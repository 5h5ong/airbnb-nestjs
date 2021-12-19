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
  getOneFromEmail(@Param('email') email: string) {
    return this.usersService.getOneFromEmail(email);
  }

  @Get('id/:id')
  getOneFromId(@Param('id') id: string) {
    return this.usersService.getOneFromId(id);
  }

  @Post('/signin')
  signIn(@Body() signInData: authUserDto) {
    return this.usersService.signIn(signInData);
  }
}
