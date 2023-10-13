import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { UpdatePasswordDto } from './dtos/update-password-dto';
import { UserService } from 'src/user/user.service';
import { CreateAccountDto } from './dtos/create-account-dto';
import { FindAccountDto } from './dtos/find-account.dto';
import { AccountValidation } from './account.validation';

@Controller('api/account')
export class AccountController {
  constructor(
    private readonly accountValidation: AccountValidation,
    private readonly accountService: AccountService,
    private readonly userService: UserService,
  ) {}

  @Get()
  public async fetchAllAccounts(
    @Query() input: FindAccountDto,
  ): Promise<object> {
    try {
      const accounts = await this.accountService.findAllAccounts(input.find);

      return {
        code: 200,
        message: 'accounts Loaded',
        data: accounts,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':username')
  public async fetchAccountByUsername(
    @Param('username') username: string,
  ): Promise<object> {
    try {
      const account: object = await this.accountService.findAccountByUsername(
        username,
      );

      delete account['dataValues']['password'];

      return {
        code: 200,
        message: 'Account Loaded',
        data: account,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAccount(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<object> {
    try {
      const accountResult =
        await this.accountValidation.createAccountValidation(createAccountDto);

      await this.accountService.createAccount(accountResult);

      return {
        code: 200,
        message: 'Account Created',
      };
    } catch (error) {
      return error;
    }
  }

  @Put('password/:id')
  @UsePipes(ValidationPipe)
  async editPassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<object> {
    try {
      const account: object =
        await this.accountValidation.updatePasswordValidation(
          id,
          updatePasswordDto,
        );

      await this.accountService.updatePassword(account['dataValues']);

      return {
        code: 200,
        message: 'Account Updated',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':id')
  async deleteAccount(@Param('id') id: string): Promise<object> {
    try {
      const accountId: string =
        await this.accountValidation.destroyAccountValidation(id);

      const userData: any = await this.accountService.destroyAccount(accountId);

      await this.userService.destroyUser(userData.user_id);

      return {
        code: 200,
        message: 'User Deleted',
      };
    } catch (error) {
      return error;
    }
  }
}
