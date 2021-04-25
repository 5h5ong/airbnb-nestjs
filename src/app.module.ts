import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV !== 'develoment' ? true : false,
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    AccommodationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
