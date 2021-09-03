import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { ReservationDto } from 'src/accommodations/reservation/dto/reservation.dto';

@Injectable()
export class ReservationDatabaseService {
  constructor(
    @Inject('RESERVATION_COLLECTION')
    private readonly reservationCollection: CollectionReference<DocumentData>,
  ) {}
  async create(reservationData: ReservationDto) {
    // reservationData를 그대로 넣으면 prototype을 해석할 수 없어서 에러 뜸
    // 하나하나 분리해서 넣어줌으로 에러 해결
    const {
      userId,
      accommodationsId,
      reservationDate,
      issuedDate,
    } = reservationData;
    await this.reservationCollection.add({
      userId: userId,
      accommodationsId: accommodationsId,
      reservationData: {
        start: reservationDate.start,
        end: reservationDate.end,
      },
      issuedDate: issuedDate,
    });
    return reservationData;
  }
}
