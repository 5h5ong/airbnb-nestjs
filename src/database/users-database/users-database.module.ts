import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { usersDatabaseProviders } from './users-database.providers';
import { UsersDatabaseService } from './users-database.service';

@Module({
  imports: [DatabaseModule],
  providers: [...usersDatabaseProviders, UsersDatabaseService],
  exports: [UsersDatabaseService],
})
export class UsersDatabaseModule {}
