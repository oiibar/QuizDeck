export interface User {
  id: number;
  username: string;
  token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface UserProfile {
  id: number;
  username: string;
  createdAt: Date;
  flashcardGroups: FlashcardGroup[];
}

export interface FlashcardGroup {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  flashcards: Array<{ question: string; answer: string }>;
}
