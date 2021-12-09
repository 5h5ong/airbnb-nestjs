import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { UpdateAccommodationsDto } from 'src/accommodations/dto/update-accommodations.dto';
import { RealAccommodationDto } from 'src/accommodations/dto/real-accommodations.dto';

@Injectable()
export class AccommodationsDatabaseService {
  constructor(
    @Inject('ACCOMMODATIONS_COLLECTION')
    private readonly accommodationsCollection: CollectionReference<DocumentData>,
  ) {}

  async getAll() {
    const snapshot = await this.accommodationsCollection.get();
    return snapshot.docs.map((doc) => {
      // 숙소 데이터에 id도 추가
      const id = doc.id;
      const data = doc.data();
      return { id: id, ...data };
    });
  }

  async create(accommodationsData: RealAccommodationDto) {
    const newAccommodationDocument = await this.accommodationsCollection.add({
      ...accommodationsData,
    });

    const doc = await newAccommodationDocument.get();
    const accommodationObject = {
      id: doc.id,
      ...doc.data(),
    };

    return accommodationObject;
  }

  async getOne(id: string) {
    const accommodationsDoc = this.accommodationsCollection.doc(id);
    const snapshot = await accommodationsDoc.get();

    const userData = snapshot.data();
    if (!userData) {
      throw new NotFoundException(`Accommodations with ID ${id} is not found.`);
    }

    // Accommodation에 id를 포함해 Return하게 함
    const accommodationId = accommodationsDoc.id;
    const accommodationData: any = {
      id: accommodationId,
      ...userData,
    };
    return accommodationData;
  }

  delete(id: string) {
    return this.accommodationsCollection.doc(id).delete();
  }

  async update(id: string, accommodationsData: UpdateAccommodationsDto) {
    // 해당하는 doc id가 없을 때 에러 발생
    const snapshot = await this.accommodationsCollection.doc(id).get();
    if (!snapshot.data()) {
      throw new NotFoundException(`Accommodations with ID ${id} is not found.`);
    }
    // doc id가 존재한다면 update 진행
    return this.accommodationsCollection
      .doc(id)
      .update({ ...accommodationsData });
  }

  /** Reservation 연결 */
  async connectReservation(accommodationId: string, reservationId: string) {
    const accommodationDoc = await this.accommodationsCollection.doc(
      accommodationId,
    );
    const accommodationSnapshot = await accommodationDoc.get();

    // Check Accommodation
    if (!accommodationSnapshot) {
      throw new NotFoundException(
        `Accommodation with ID ${accommodationId} is not found.`,
      );
    }

    // connect reservation id
    const reservations = accommodationSnapshot.data().reservations;
    return accommodationDoc.update({
      reservations: reservations
        ? [...reservations, reservationId]
        : [reservationId],
    });
  }
}
