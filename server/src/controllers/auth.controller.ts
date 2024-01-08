import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/entities/user.create.dto';
import { User } from 'src/entities/user.entity';
import { UserSignInDTO } from 'src/entities/user.signIn.dto';
import { UserSignUpDTO } from 'src/entities/user.signUp.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() userSignInDTO: UserSignInDTO): Promise<any> {
    return this.authService.signIn(userSignInDTO);
  }

  @Post('signup')
  signUp(@Body() createUserDTO: CreateUserDTO): Promise<UserSignUpDTO> {
    return this.authService.signUp(createUserDTO);
  }
}
