import { Firestore } from '@google-cloud/firestore';
export const accommodationsDatabaseProviders = [
  {
    provide: 'ACCOMMODATIONS_COLLECTION',
    useFactory: (db: Firestore) => {
      const accommodationsCollection = db.collection('accommodations');
      return accommodationsCollection;
    },
    // firestore에 접근할 수 있는 db의 inject를 위해서
    inject: ['DATABASE_CONNECTION'],
  },
];
