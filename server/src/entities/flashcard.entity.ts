// src/flashcards/flashcard.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Folder } from './folder.entity';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  answer: string;

  @ManyToOne(() => Folder, (folder) => folder.flashcards)
  folder: Folder;
}
