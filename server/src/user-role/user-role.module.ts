import { Module } from '@nestjs/common';
import { UserRoleController } from './user-role.controller';
import { UserRoleService } from './user-role.service';
import { userRoleProviders } from './user-role.providers';

@Module({
  controllers: [UserRoleController],
  providers: [UserRoleService, ...userRoleProviders],
})
export class UserRoleModule {}
