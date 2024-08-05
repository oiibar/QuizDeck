export interface User {
  id: number;
  email: string;
  username: string;
  token: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Signup {
  email: string;
  username: string;
  password: string;
}

export interface UserProfile {
  id: number;
  email: string;
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
