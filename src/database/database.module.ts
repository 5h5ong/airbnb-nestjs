import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  // 다른 module에서 사용할 수 있게 만듬
  exports: [...databaseProviders],
})
export class DatabaseModule {}
