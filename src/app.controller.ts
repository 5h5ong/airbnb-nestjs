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
    // 필요한 정보들을 골라 반환
    const userData = {
      id: req.user.id,
      role: req.user.role,
      email: req.user.email,
    };
    return userData;
  }
}
