import { FlashcardGroup } from 'src/flashcards/entities/flashcards.entity';

export interface IUser {
  id: number;
  username: string;
  password: string;
  createdAt: Date;
  flashcardGroups: FlashcardGroup[];
}
