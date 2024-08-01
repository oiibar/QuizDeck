import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { FlashcardGroup } from 'src/flashcards/entities/flashcards.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password should be at least 6 characters long' })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FlashcardGroup, (flashcardGroup) => flashcardGroup.user)
  flashcardGroups: FlashcardGroup[];
}
