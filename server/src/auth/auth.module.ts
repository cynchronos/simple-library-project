import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AccountModule } from 'src/account/account.module';

@Module({
  imports: [UserModule, AccountModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
