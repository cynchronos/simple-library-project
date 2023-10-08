import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Op } from 'sequelize';
import * as randomstring from 'randomstring';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userModel: typeof User,
  ) {}

  public async findAllUsers(input: string): Promise<object> {
    try {
      const users: User[] = await this.userModel.findAll<User>({
        where: {
          [Op.or]: [
            { firstname: { [Op.like]: `${input}%` } },
            { lastname: { [Op.like]: `${input}%` } },
            { phone_number: { [Op.like]: `${input}%` } },
          ],
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (users.length < 1) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Pengguna tidak ditemukan';

        throw error;
      }

      return users;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load Users',
        data: error.errorInfo || error,
      };
    }
  }

  public async findUserById(user_id: number): Promise<object> {
    try {
      const user: User = await this.userModel.findOne<User>({
        where: {
          user_id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (!user) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Pengguna tidak ditemukan';

        throw error;
      }

      return user;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load User',
        data: error.errorInfo || error,
      };
    }
  }

  public async createUser(user: any): Promise<object> {
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

      await this.userModel.create<User>(user);

      return user;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Create User',
        data: error.errorInfo || error,
      };
    }
  }

  public async updateUser(user_id: number, userInput: any): Promise<object> {
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

      const inputData = {
        firstname: userInput.firstname || user.firstname,
        lastname: userInput.lastname || user.lastname,
        address: userInput.address || user.address,
        email: userInput.email || user.email,
        phone_number: userInput.phone_number || user.phone_number,
      };

      await this.userModel.update(inputData, {
        where: {
          user_id,
        },
      });

      return userInput;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Update User',
        data: error.errorInfo || error,
      };
    }
  }

  public async destroyUser(user_id: number): Promise<object> {
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

      await this.userModel.destroy({
        where: {
          user_id,
        },
      });

      return user;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Delete User',
        data: error.errorInfo || error,
      };
    }
  }
}
