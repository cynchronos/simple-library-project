import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountService } from 'src/account/account.service';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dtos/login.dto';
import { UserValidation } from 'src/user/user.validation';
import { AccountValidation } from 'src/account/account.validation';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateAccountDto } from 'src/account/dtos/create-account-dto';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authservice: AuthService,
    private readonly userValidation: UserValidation,
    private readonly accountValidation: AccountValidation,
    private readonly userService: UserService,
    private readonly accountService: AccountService,
  ) {}

  @Post('login')
  @UsePipes(ValidationPipe)
  public async signIn(@Body() signInDto: SignInDto) {
    try {
      const account: object = await this.accountService.findAccountByUsername(
        signInDto.username,
      );

      await this.authservice.signIn(
        signInDto.password,
        account['dataValues']['password'],
      );

      return {
        code: 200,
        success: true,
        message: 'Logged In',
      };
    } catch (error) {
      return error;
    }
  }

  @Post('register')
  @UsePipes(ValidationPipe)
  public async signUp(
    @Body() createUserDto: CreateUserDto,
    @Body() createAccountDto: CreateAccountDto,
  ) {
    try {
      const userData: object = await this.userValidation.validateCreateUser(
        createUserDto,
      );

      const account = {
        username: createAccountDto['username'],
        password: CreateAccountDto['password'],
        user_id: userData['user_id'],
      };

      const accountData: object =
        await this.accountValidation.createAccountValidation(account, userData);

      await this.userService.createUser(userData);
      await this.accountService.createAccount(accountData);

      return {
        code: 200,
        success: true,
        message: 'Registrasi Sukses',
      };
    } catch (error) {
      return error;
    }
  }
}
