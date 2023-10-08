import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  protected username: string;

  @IsString()
  @IsNotEmpty()
  protected password: string;

  @IsString()
  @IsNotEmpty()
  protected user_id: string;

  protected role_id: string;
}
