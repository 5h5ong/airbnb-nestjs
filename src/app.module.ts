import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ReservationModule } from './accommodations/reservation/reservation.module';
import { UploadModule } from './upload/upload.module';
import { GcsService } from './core/gcs/gcs.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV !== 'develoment' ? true : false,
      isGlobal: true,
      envFilePath: '.env.dev',
    }),
    AccommodationsModule,
    UsersModule,
    AuthModule,
    ReservationModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
