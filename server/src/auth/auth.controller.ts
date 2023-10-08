import { Body, Controller, Get } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly accountService: AccountService
  );

  @Post('login')
  async signIn(@Body() signInDto: SignInDto)
}
