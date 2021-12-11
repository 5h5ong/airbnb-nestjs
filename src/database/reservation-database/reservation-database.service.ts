import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

    const newReservationDocument = await this.reservationCollection.add({
      userId: userId,
      accommodationsId: accommodationsId,
      reservationDate: {
        start: reservationDate.start,
        end: reservationDate.end,
      },
      issuedDate: issuedDate,
    });

    // 생성된 Reservation의 id를 가져와 데이터와 같이 반환함
    // User, Accommodations의 연결에 필요하기 때문임
    const doc = await newReservationDocument.get();
    return {
      id: doc.id,
      ...doc.data(),
    };
  }

  async getOneFromId(reservationId: string) {
    const userData = await this.reservationCollection.doc(reservationId).get();
    return userData.data();
  }

  async delete(reservationId: string) {
    const reservationDoc = await this.reservationCollection.doc(reservationId);
    if (!reservationDoc) {
      throw new NotFoundException(
        `Reservation with ID ${reservationId} is not found.`,
      );
    }

    try {
      await reservationDoc.delete();
    } catch (e) {
      throw e;
    }
  }
}
