import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserValidation } from './user.validation';

@Module({
  controllers: [UserController],
  providers: [UserService, ...userProviders, UserValidation],
  exports: [...userProviders, UserService, UserValidation],
})
export class UserModule {}
