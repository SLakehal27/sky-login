import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/entities/user.create.dto';
import { UserSignInDTO } from 'src/entities/user.signIn.dto';
import { UserSignUpDTO } from 'src/entities/user.signUp.dto';
import { AuthService } from 'src/services/auth.service';
import { Request, Response } from 'express';
import { User } from 'src/entities/user.entity';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(
    @Body() userSignInDTO: UserSignInDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.signIn(userSignInDTO, res);
  }

  @Post('signup')
  signUp(@Body() createUserDTO: CreateUserDTO): Promise<UserSignUpDTO> {
    return this.authService.signUp(createUserDTO);
  }

  @Get('profile')
  async getUser(@Req() req: Request): Promise<User> {
    return await this.authService.getUserFromCookie(req);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response): any {
    res.clearCookie('token');
    return {
      message: 'Session ended!',
    };
  }
}
