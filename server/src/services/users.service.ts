import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/entities/user.create.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { argon2id, hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findUser(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async createOne(createUserDTO: CreateUserDTO): Promise<User> {
    const hashedPassword = await hash(createUserDTO.password, {
      type: argon2id,
    });
    return await this.usersRepository.save({
      ...createUserDTO,
      password: hashedPassword,
    });
  }

  async removeOne(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
