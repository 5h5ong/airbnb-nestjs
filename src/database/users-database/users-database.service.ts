import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CollectionReference, DocumentData } from '@google-cloud/firestore';
import { createUsersDto } from '../../users/dto/create-users.dto';
import { updateUsersDto } from 'src/users/dto/update-users.dto';

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

  async getOneFromId(userId: string) {
    const userData = await this.usersCollection.doc(userId).get();

    return userData.data();
  }

  async update(userId: string, usersData: updateUsersDto) {
    const doc = await this.usersCollection.doc(userId);

    // Find User
    const snapshot = await doc.get();

    if (!snapshot) {
      throw new NotFoundException(`Users with ID ${userId} is not found.`);
    }

    // User ID가 존재한다면 Update 진행
    return doc.update({ ...usersData });
  }

  /**
   * Accommodation와 연결
   */
  async connectAccommodation(userId: string, accommodationId: string) {
    const doc = await this.usersCollection.doc(userId);

    const snapshot = await doc.get();

    // Check User
    if (!snapshot) {
      throw new NotFoundException(`Users with ID ${userId} is not found.`);
    }

    // Accommodation ID 연결
    const accommodations = snapshot.data().accommodations;
    if (accommodations) {
      return doc.update({
        accommodations: [...accommodations, accommodationId],
      });
    }

    return doc.update({
      accommodations: [accommodationId],
    });
  }
}
