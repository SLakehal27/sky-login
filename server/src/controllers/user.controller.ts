import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateUserDTO } from 'src/entities/user.create.dto';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param() id: string): Promise<User> {
    return this.usersService.findOne(parseInt(id));
  }

  @Post()
  addUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createOne(createUserDTO);
  }
}
