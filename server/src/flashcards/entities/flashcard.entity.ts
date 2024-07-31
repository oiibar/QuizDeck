import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('json')
  flashcards: { question: string; answer: string }[]; // Array of objects with question and answer

  @ManyToOne(() => User, (user) => user.flashcards)
  user: User;
}
