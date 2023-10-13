import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Op } from 'sequelize';

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

  public async createUser(user: any): Promise<null> {
    try {
      await this.userModel.create<User>(user);

      return;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Create User',
        data: error.errorInfo || error,
      };
    }
  }

  public async updateUser(user_id: number, inputData: any): Promise<null> {
    try {
      await this.userModel.update(inputData, {
        where: {
          user_id,
        },
      });

      return;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Update User',
        data: error.errorInfo || error,
      };
    }
  }

  public async destroyUser(user_id: number): Promise<null> {
    try {
      await this.userModel.destroy({
        where: {
          user_id,
        },
      });

      return;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Delete User',
        data: error.errorInfo || error,
      };
    }
  }
}
