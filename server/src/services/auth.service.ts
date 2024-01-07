import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignInDTO } from 'src/entities/user.signIn.dto';
import { verify } from 'argon2';
import { CreateUserDTO } from 'src/entities/user.create.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async getUser(username: string): Promise<User> {
    return await this.usersService.findUser(username);
  }
  async signIn(userSignInDTO: UserSignInDTO): Promise<any> {
    const user = await this.getUser(userSignInDTO.username);
    if (!user || !(await verify(user.password, userSignInDTO.password))) {
      throw new UnauthorizedException('User does not exist');
    }
    return user;
  }

  async signUp(createUserDTO: CreateUserDTO): Promise<User> {
    const user = await this.getUser(createUserDTO.username);
    if (user) {
      throw new UnauthorizedException('This user already exists');
    }
    return this.usersService.createOne(createUserDTO);
  }
}
