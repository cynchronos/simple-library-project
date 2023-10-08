import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  protected username: string;

  @IsNotEmpty()
  protected password: string;
}
