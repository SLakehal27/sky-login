import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
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
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  addUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.usersService.createOne(createUserDTO);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.usersService.removeOne(id);
  }
}
