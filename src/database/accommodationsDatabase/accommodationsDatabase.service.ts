import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { CreateAccommodationsDto } from 'src/accommodations/dto/create-accommodations.dto';
import { UpdateAccommodationsDto } from 'src/accommodations/dto/update-accommodations.dto';

@Injectable()
export class AccommodationsDatabaseService {
  constructor(
    @Inject('ACCOMMODATIONS_COLLECTION')
    private readonly accommodationsCollection: CollectionReference<DocumentData>,
  ) {}

  async getAll() {
    const snapshot = await this.accommodationsCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  create(accommodationsData: CreateAccommodationsDto) {
    return this.accommodationsCollection.doc().set({ ...accommodationsData });
  }

  async getOne(id: string) {
    const snapshot = await this.accommodationsCollection.doc(id).get();
    if (!snapshot.data()) {
      throw new NotFoundException(`Accommodations with ID ${id} is not found.`);
    }
    return snapshot.data();
  }

  delete(id: string) {
    return this.accommodationsCollection.doc(id).delete();
  }

  update(id: string, accommodationsData: UpdateAccommodationsDto) {
    return this.accommodationsCollection
      .doc(id)
      .update({ ...accommodationsData });
  }
}
