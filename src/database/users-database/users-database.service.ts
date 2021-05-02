import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { createUsersDto } from 'src/accommodations/dto/create-users.dto';

@Injectable()
export class UsersDatabaseService {
  constructor(
    @Inject('USERS_COLLECTION')
    private readonly usersCollection: CollectionReference<DocumentData>,
  ) {}

  create(usersData: createUsersDto) {
    this.usersCollection.doc().set({ ...usersData });
    return usersData;
  }

  async getOne(email: string) {
    const userData = await this.usersCollection
      .where('email', '==', email)
      .get();
    // 같은 email은 하나밖에 존재할 수 없으니
    return userData.docs[0].data();
  }
}
