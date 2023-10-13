import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserFindDto } from './dto/user-find-query.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidation } from './user.validation';

@Controller('api/user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly userValidation: UserValidation,
  ) {}

  @Get()
  public async fetchAllUsers(@Query() input: UserFindDto): Promise<object> {
    try {
      const users = await this.userService.findAllUsers(input.find);

      return {
        code: 200,
        message: 'Users Loaded',
        data: users,
      };
    } catch (error) {
      return error;
    }
  }

  @Get(':user_id')
  public async fetchUserById(
    @Param('user_id') user_id: number,
  ): Promise<object> {
    try {
      const user = await this.userService.findUserById(user_id);

      return {
        code: 200,
        message: 'User Loaded',
        data: user,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<object> {
    try {
      const userData = await this.userValidation.validateCreateUser(
        createUserDto,
      );

      await this.userService.createUser(userData);

      return {
        code: 200,
        message: 'User Created',
      };
    } catch (error) {
      return error;
    }
  }

  @Put(':user_id')
  async updateUser(
    @Param('user_id') user_id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<object> {
    try {
      const userData = await this.userValidation.validateUpdateUser(
        user_id,
        updateUserDto,
      );

      await this.userService.updateUser(user_id, userData);

      return {
        code: 200,
        message: 'User Updated',
      };
    } catch (error) {
      return error;
    }
  }

  @Delete(':user_id')
  async deleteUser(@Param('user_id') user_id: number): Promise<object> {
    try {
      const userId = await this.userValidation.validateDestroyUser(user_id);

      await this.userService.destroyUser(userId);

      return {
        code: 200,
        message: 'User Deleted',
      };
    } catch (error) {
      return error;
    }
  }
}
