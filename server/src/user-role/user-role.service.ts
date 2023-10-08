import { Inject, Injectable } from '@nestjs/common';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject('USER_ROLE_REPOSITORY')
    private readonly userRoleModel: typeof UserRole,
  ) {}

  public async findAllUserRoles(): Promise<object> {
    try {
      const userRoles: UserRole[] = await this.userRoleModel.findAll<UserRole>({
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (!userRoles) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'User role tidak ditemukan';

        throw error;
      }

      return userRoles;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load User Roles',
        data: error.errorInfo || error,
      };
    }
  }

  public async findUserRoleById(role_id: number): Promise<object> {
    try {
      const userRole: UserRole = await this.userRoleModel.findOne<UserRole>({
        where: {
          role_id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (!userRole) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'User role tidak ditemukan';

        throw error;
      }

      return userRole;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Load User Roles',
        data: error.errorInfo || error,
      };
    }
  }

  public async createUserRole(userRoleData: any): Promise<object> {
    try {
      const userRole: UserRole = await this.userRoleModel.findOne<UserRole>({
        where: {
          role_id: userRoleData.role_id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      });

      if (userRole) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'User role sudah terdaftar';

        throw error;
      }

      await this.userRoleModel.create(userRoleData);

      return userRoleData;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error Create User Roles',
        data: error.errorInfo || error,
      };
    }
  }

  public async updateUserRole(
    role_id: number,
    userRoleData: any,
  ): Promise<object> {
    try {
      const userRole: UserRole = await this.userRoleModel.findOne<UserRole>({
        where: {
          role_id,
        },
      });

      if (!userRole) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'User role tidak ditemukan';

        throw error;
      }

      const userRoleInputData: UserRole =
        await this.userRoleModel.findOne<UserRole>({
          where: {
            role_id: userRoleData.role_id,
          },
        });

      if (userRoleInputData) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'User role sudah terdaftar';

        throw error;
      }

      const data = {
        role_id: userRoleData.role_id || userRole.role_id,
        role_name: userRoleData.role_name || userRole.role_name,
      };

      await this.userRoleModel.update(data, {
        where: {
          id: userRole.id,
        },
      });

      return data;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error update User Roles',
        data: error.errorInfo || error,
      };
    }
  }

  public async destroyUserRole(role_id: number): Promise<object> {
    try {
      const userRole: UserRole = await this.userRoleModel.findOne({
        where: {
          role_id,
        },
      });

      if (!userRole) {
        const error: any = new Error();
        error.errorCode = 404;
        error.errorInfo = 'Pengguna tidak ditemukan';

        throw error;
      }

      await this.userRoleModel.destroy({
        where: {
          id: userRole.id,
        },
      });

      return userRole;
    } catch (error) {
      throw {
        code: error.errorCode || 400,
        message: 'Error delete User Roles',
        data: error.errorInfo || error,
      };
    }
  }
}
