import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Op } from 'sequelize';
import * as randomstring from 'randomstring';

@Injectable()
export class UserValidation {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userModel: typeof User,
  ) {}

  public async validateCreateUser(
    user: any | PromiseLike<object>,
  ): Promise<object> {
    try {
      const userData = await this.userModel.findOne<User>({
        where: {
          [Op.or]: [{ email: user.email }, { phone_number: user.phone_number }],
        },
      });

      if (userData) {
        const error: any = new Error();
        error.errorCode = 409;
        error.errorInfo = 'Pengguna sudah terdaftar';

        throw error;
      }

      user.user_id = randomstring.generate({
        length: 7,
        charset: 'numeric',
      });

      return user;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Validate Create User',
        data: error.errorInfo || error,
      };
    }
  }

  public async validateUpdateUser(
    user_id: number,
    userInput: any | PromiseLike<object>,
  ): Promise<object> {
    try {
      const user: User = await this.userModel.findOne<User>({
        where: {
          user_id,
        },
      });

      const userEmail: User = await this.userModel.findOne<User>({
        where: {
          email: userInput.email,
        },
      });

      if (!user) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Pengguna tidak ditemukan';

        throw error;
      }

      if (
        userInput.email === userEmail.email &&
        userEmail.user_id !== user_id
      ) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Email Telah Digunakan';

        throw error;
      }

      const inputData = {
        firstname: userInput.firstname || user.firstname,
        lastname: userInput.lastname || user.lastname,
        address: userInput.address || user.address,
        email: userInput.email || user.email,
        phone_number: userInput.phone_number || user.phone_number,
      };

      return inputData;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Validate Update User',
        data: error.errorInfo || error,
      };
    }
  }

  public async validateDestroyUser(user_id: number): Promise<number> {
    try {
      const user: User = await this.userModel.findOne<User>({
        where: {
          user_id,
        },
      });

      if (!user) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Pengguna tidak ditemukan';

        throw error;
      }

      return user_id;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Validate Delete User',
        data: error.errorInfo || error,
      };
    }
  }
}
