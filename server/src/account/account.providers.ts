import { Account } from './account.entity';

export const accountProviders = [
  {
    provide: 'ACCOUNT_REPOSITORY',
    useValue: Account,
  },
];
