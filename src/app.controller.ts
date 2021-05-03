import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Request() req): string {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('auth/verify')
  async login(@Request() req) {
    return req.user;
  }
}
