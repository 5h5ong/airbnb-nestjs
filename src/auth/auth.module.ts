import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthLibModule } from './libs/auth-lib.module';

@Module({
  imports: [UsersModule, PassportModule, AuthLibModule],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
