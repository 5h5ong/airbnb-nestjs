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
}
