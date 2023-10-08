import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as cryptojs from 'crypto-js';
import { Account } from './account.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class AccountValidation {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountModel: typeof Account,
    @Inject('USER_REPOSITORY')
    private userModel: typeof User,
  ) {}

  public async createAccountValidation(account: any): Promise<object> {
    try {
      const usernameData = await this.accountModel.findOne<Account>({
        where: {
          username: account.username,
        },
      });

      const userIdAccount = await this.accountModel.findOne<Account>({
        where: {
          user_id: account.user_id,
        },
      });

      const userData = await this.userModel.findOne<User>({
        where: {
          user_id: account.user_id,
        },
      });

      if (usernameData) {
        const error: any = new Error();
        error.errorCode = 409;
        error.errorInfo = 'Akun sudah terdaftar';

        throw error;
      }

      if (userIdAccount) {
        const error: any = new Error();
        error.errorCode = 409;
        error.errorInfo = 'User sudah terdaftar dalam akun lain';

        throw error;
      }

      if (!userData) {
        const error: any = new Error();
        error.errorCode = 409;
        error.errorInfo = 'User tidak ditemukan';

        throw error;
      }

      account.id = uuidv4();
      account.role_id ? account.role_id : null;

      account.password = cryptojs.AES.encrypt(
        account.password,
        process.env.ACCOUNT_SECRET_KEY,
      ).toString();

      return account;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Validate Account',
        data: error.errorInfo || error,
      };
    }
  }

  public async updatePasswordValidation(
    id: string,
    data: any,
  ): Promise<object> {
    try {
      const account: Account = await this.accountModel.findOne<Account>({
        where: {
          id,
        },
      });

      if (!account) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Akun tidak ditemukan';

        throw error;
      }

      const bytes = cryptojs.AES.decrypt(
        account.password,
        process.env.ACCOUNT_SECRET_KEY,
      );

      const oldPassword = bytes.toString(cryptojs.enc.Utf8);

      if (data.oldPassword !== oldPassword) {
        const error: any = new Error();
        error.errorCode = 400;
        error.errorInfo = 'Password tidak valid';

        throw error;
      }

      if (data.newPassword === oldPassword) {
        const error: any = new Error();
        error.errorCode = 400;
        error.errorInfo = 'Password baru sama dengan password lama';

        throw error;
      }

      const newPassword = cryptojs.AES.encrypt(
        data.newPassword,
        process.env.ACCOUNT_SECRET_KEY,
      ).toString();

      account.password = newPassword;

      return account;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Validate Update Password',
        data: error.errorInfo || error,
      };
    }
  }

  public async destroyAccount(id: string): Promise<object> {
    try {
      const account: Account = await this.accountModel.findOne<Account>({
        where: {
          id,
        },
      });

      if (!account) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Pengguna tidak ditemukan';

        throw error;
      }

      await account.destroy();

      return {
        user_id: account.user_id,
      };
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Delete Account',
        data: error.errorInfo || error,
      };
    }
  }
}
