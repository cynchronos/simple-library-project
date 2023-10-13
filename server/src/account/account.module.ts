import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.providers';
import { UserModule } from 'src/user/user.module';
import { AccountValidation } from './account.validation';
import { userProviders } from 'src/user/user.providers';

ConfigModule.forRoot();

@Module({
  imports: [UserModule],
  controllers: [AccountController],
  providers: [AccountService, ...accountProviders, AccountValidation],
  exports: [AccountService, ...accountProviders, AccountValidation],
})
export class AccountModule {}
