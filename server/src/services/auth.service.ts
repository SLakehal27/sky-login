import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignInDTO } from 'src/entities/user.signIn.dto';
import { verify } from 'argon2';
import { CreateUserDTO } from 'src/entities/user.create.dto';
import { User } from 'src/entities/user.entity';
import { plainToClass } from 'class-transformer';
import { UserSignUpDTO } from 'src/entities/user.signUp.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async getUserFromCookie(req: Request): Promise<User> {
    const cookie = req.cookies['token'];
    const data = await this.jwtService.verifyAsync(cookie);
    if (!data) {
      throw new UnauthorizedException('Invalid cookie');
    }
    return this.usersService.findUser(data.username);
  }
  async getUser(username: string): Promise<User> {
    return await this.usersService.findUser(username);
  }
  async signIn(userSignInDTO: UserSignInDTO, res: Response): Promise<any> {
    const user = await this.getUser(userSignInDTO.username);
    if (!user || !(await verify(user.password, userSignInDTO.password))) {
      throw new UnauthorizedException('User does not exist');
    }
    const payload = { username: user.username, email: user.email };
    const jwt = await this.jwtService.signAsync(payload);
    const cookieAge = 30 * 60 * 1000;
    res.cookie('token', jwt, { httpOnly: true, maxAge: cookieAge });
    return {
      message: 'Logged in successfully!',
    };
  }

  async signUp(createUserDTO: CreateUserDTO): Promise<UserSignUpDTO> {
    const user = await this.getUser(createUserDTO.username);
    if (user) {
      throw new UnauthorizedException('This user already exists');
    }
    const recentUser = await this.usersService.createOne(createUserDTO);
    return plainToClass(UserSignUpDTO, recentUser);
  }
}
