import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class FlashcardGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ManyToOne(() => User, (user) => user.flashcardGroups, { eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('json')
  flashcards: Array<{ question: string; answer: string }>;
}
