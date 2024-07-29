import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Library } from './library.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany((type) => Library, (library) => library.user)
  libraries: Library[];
}
