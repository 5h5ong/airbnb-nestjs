import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersDatabaseModule } from 'src/database/users-database/users-database.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthLibModule } from 'src/auth/libs/auth-lib.module';

@Module({
  imports: [
    UsersDatabaseModule,
    AuthLibModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
