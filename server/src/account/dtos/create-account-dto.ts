import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  protected username: string;

  @IsString()
  @IsNotEmpty()
  protected password: string;

  protected user_id: number;
  protected role_id: string;
}
