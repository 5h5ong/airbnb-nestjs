import { Module } from '@nestjs/common';
import { authProviders } from './auth-lib.providers';

@Module({
  providers: [...authProviders],
  exports: [...authProviders],
})
export class AuthLibModule {}
