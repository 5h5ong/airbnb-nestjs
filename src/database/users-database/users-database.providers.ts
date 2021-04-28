import { Firestore } from '@google-cloud/firestore';

export const usersDatabaseProviders = [
  {
    provide: 'USERS_COLLECTION',
    useFactory: (db: Firestore) => {
      const usersCollection = db.collection('users');
      return usersCollection;
    },
    inject: ['DATABASE_CONNECTION'],
  },
];
