import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flashcard } from '../../flashcards/entities/flashcard.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.user)
  flashcards: Flashcard[];
}
