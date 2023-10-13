import { IsNotEmpty } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;
}
