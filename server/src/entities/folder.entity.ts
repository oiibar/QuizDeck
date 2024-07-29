// src/folders/folder.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Library } from './library.entity';
import { Flashcard } from './flashcard.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Library, (library) => library.folders)
  library: Library;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.folder)
  flashcards: Flashcard[];
}
