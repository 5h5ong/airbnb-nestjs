import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() reservationData: CreateReservationDto) {
    // 들어온 예약 데이터에 유저 id를 추가해 새로운 예약 생성
    return this.reservationService.create({
      ...reservationData,
      userId: req.user.id,
    });
  }
}
