import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  protected role_id: number;

  @IsNotEmpty()
  protected role_name: number;
}
