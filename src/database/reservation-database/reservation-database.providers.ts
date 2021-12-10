import { Firestore } from '@google-cloud/firestore';
import { Provider } from '@nestjs/common';

export const reservationDatabaseProviders: Provider = {
  provide: 'RESERVATION_COLLECTION',
  useFactory: (db: Firestore) => {
    const reservationCollection = db.collection('reservations');
    return reservationCollection;
  },
  inject: ['DATABASE_CONNECTION'],
};
