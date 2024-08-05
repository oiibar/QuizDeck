import { FlashcardGroup } from 'src/flashcards/entities/flashcards.entity';

export interface IUser {
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  flashcardGroups: FlashcardGroup[];
}
