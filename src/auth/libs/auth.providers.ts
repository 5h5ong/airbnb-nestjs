import { AuthLibs } from './auth.lib';

export const authProviders = [
  {
    provide: 'AUTH',
    useClass: AuthLibs,
  },
];
