import * as admin from 'firebase-admin';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: () => {
      /*
       * google firestore 사용 설정
       *
       * 기존에 다운받은 ServiceAccountKey를 `credential.cert()`의 타입에 맞게 수정함
       */
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.PROJECT_ID,
          privateKey: process.env.PRIVATE_KEY,
          clientEmail: process.env.CLIENT_EMAIL
        }),
      });
      const db = admin.firestore();
      return db;
    },
  },
];
