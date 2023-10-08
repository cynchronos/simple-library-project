import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('api/user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  async fetchAllUserRoles(): Promise<object> {
    try {
      const userRoles = await this.userRoleService.findAllUserRoles();

      return {
        code: 200,
        message: 'User Roles Loaded',
        data: userRoles,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':role_id')
  async fetchUserRoleById(@Param('role_id') role_id: number): Promise<object> {
    try {
      const userRole = await this.userRoleService.findUserRoleById(role_id);

      return {
        code: 200,
        message: 'User Role Loaded',
        data: userRole,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createUserRole(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<object> {
    try {
      await this.userRoleService.createUserRole(createUserRoleDto);

      return {
        code: 200,
        message: 'User Created',
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':role_id')
  async updateUserRole(
    @Param('role_id') role_id: number,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<object> {
    try {
      await this.userRoleService.updateUserRole(role_id, updateUserRoleDto);

      return {
        code: 200,
        message: 'User Updated',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':role_id')
  async deleteUserRole(@Param('role_id') role_id: number): Promise<object> {
    try {
      await this.userRoleService.destroyUserRole(role_id);

      return {
        code: 200,
        message: 'User Deleted',
      };
    } catch (error) {
      return error;
    }
  }
}
