import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserSignInDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
