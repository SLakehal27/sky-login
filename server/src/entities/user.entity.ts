import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;
}
