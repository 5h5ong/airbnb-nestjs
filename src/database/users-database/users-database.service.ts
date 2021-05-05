import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { createUsersDto } from '../../users/dto/create-users.dto';

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
    const querySnapshot = await this.usersCollection
      .where('email', '==', email)
      .get();

    /*
     * 유저는 중복된 email이 없음. 그래서 배열의 첫번째를 가져오는 것
     */
    const userDoc = querySnapshot.docChanges()[0];
    const userId = userDoc.doc.id;
    const userData = userDoc.doc.data();

    // User의 id를 포함해 Return하게 함
    const userObject: any = {
      id: userId,
      ...userData,
    };
    return userObject;
  }
}
