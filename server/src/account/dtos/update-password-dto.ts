import { IsNotEmpty } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  protected oldPassword: string;

  @IsNotEmpty()
  protected newPassword: string;
}
