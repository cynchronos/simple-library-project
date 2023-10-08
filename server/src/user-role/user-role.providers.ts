import { UserRole } from './user-role.entity';

export const userRoleProviders = [
  {
    provide: 'USER_ROLE_REPOSITORY',
    useValue: UserRole,
  },
];
