export interface Speaker {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
  longBio: string;
  topics: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}