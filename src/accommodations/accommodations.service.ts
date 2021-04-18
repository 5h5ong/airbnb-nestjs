import { Inject, Injectable } from '@nestjs/common';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { Firestore } from '@google-cloud/firestore';
import { DocumentData } from '@google-cloud/firestore';

@Injectable()
export class AccommodationsService {
  constructor(
    // "DatabaseModule" 안에서 생성된 firestore db를 가져와 사용
    @Inject('DATABASE_CONNECTION')
    private db: Firestore,
  ) {}

  create(accommodationsData: CreateAccommodationsDto) {
    // doc id은 자동 생성하게 두고 document를 만듬
    return this.db
      .collection('accommodations')
      .doc()
      .set({ ...accommodationsData });
  }

  async getAll() {
    const snapshot = await this.db.collection('accommodations').get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async getOne(id: string) {
    const snapshot = await this.db.collection('accommodations').doc(id).get();
    return snapshot.data();
  }
}
