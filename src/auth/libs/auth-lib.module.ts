import { Module } from '@nestjs/common';
import { authProviders } from './auth.providers';

@Module({
  providers: [...authProviders],
  exports: [...authProviders],
})
export class AuthLibModule {}
