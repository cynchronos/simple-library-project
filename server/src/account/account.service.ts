import { Inject, Injectable } from '@nestjs/common';
import { Account } from './account.entity';
import { Op } from 'sequelize';
import { User } from 'src/user/user.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private accountModel: typeof Account,
  ) {}

  public async findAllAccounts(input: string): Promise<object> {
    try {
      const accounts: Account[] = await this.accountModel.findAll<Account>({
        where: {
          username: {
            [Op.like]: `${input}%`,
          },
        },
        include: {
          model: User,
          as: 'user',
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });

      if (accounts.length < 1) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Akun tidak ditemukan';

        throw error;
      }

      return accounts;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load Accounts',
        data: error.errorInfo || error,
      };
    }
  }

  public async findAccountByUsername(username: string): Promise<object> {
    try {
      const account: Account = await this.accountModel.findOne<Account>({
        where: {
          username,
        },
        include: {
          model: User,
          as: 'user',
        },
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      });

      if (!account) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Akun tidak ditemukan';

        throw error;
      }

      return account;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load Account',
        data: error.errorInfo || error,
      };
    }
  }

  public async createAccount(account: any): Promise<object> {
    try {
      await this.accountModel.create<Account>(account);

      return account;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Create Account',
        data: error.errorInfo || error,
      };
    }
  }

  public async updatePassword(account: object): Promise<object> {
    try {
      await this.accountModel.update(account, {
        where: {
          id: account['id'],
        },
      });

      return;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Update Password',
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
