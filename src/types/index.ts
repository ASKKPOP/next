export interface User {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  country: string;
  city: string;
  bio: string;
  photos: string[];
  interests: string[];
  lookingFor: 'serious' | 'casual' | 'friendship';
  verified: boolean;
  online: boolean;
  lastSeen: Date;
  premium: boolean;
  videoIntro?: string;
}

export interface Match {
  id: string;
  users: [string, string]; // User IDs
  matchedAt: Date;
  lastMessage?: Message;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  type: 'text' | 'image' | 'video' | 'audio';
  timestamp: Date;
  read: boolean;
  mediaUrl?: string;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastActivity: Date;
}

export interface ProfileCard {
  user: User;
  distance?: number;
  mutualInterests?: string[];
}

export interface Ad {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  targetAudience: 'men' | 'women' | 'all';
}

export interface MeetingService {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  duration: string;
  features: string[];
}

export interface UserPreferences {
  ageRange: [number, number];
  distance: number;
  countries: string[];
  interests: string[];
  lookingFor: 'serious' | 'casual' | 'friendship';
}

export interface Notification {
  id: string;
  type: 'match' | 'message' | 'like' | 'visit' | 'ad';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  data?: any;
}

export interface AppState {
  currentUser: User | null;
  matches: Match[];
  chats: Chat[];
  notifications: Notification[];
  ads: Ad[];
  meetingServices: MeetingService[];
  userPreferences: UserPreferences;
  adWatchCount: number;
  lastAdWatch: string;
} 