import { IsEmail, IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsEmail()
  email: string;
}
