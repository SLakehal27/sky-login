import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/services/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
