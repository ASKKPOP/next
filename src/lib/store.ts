import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Match, Chat, Message, Notification, Ad, MeetingService, UserPreferences } from '@/types';

interface DatingStore {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // Matches and chats
  matches: Match[];
  chats: Chat[];
  addMatch: (match: Match) => void;
  addChat: (chat: Chat) => void;
  addMessage: (chatId: string, message: Message) => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  
  // Ads and meeting services
  ads: Ad[];
  meetingServices: MeetingService[];
  adWatchCount: number;
  lastAdWatch: string | null;
  incrementAdWatch: () => void;
  
  // User preferences
  userPreferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  
  // UI state
  currentView: 'swipe' | 'matches' | 'chat' | 'community' | 'social' | 'profile' | 'settings';
  setCurrentView: (view: 'swipe' | 'matches' | 'chat' | 'community' | 'social' | 'profile' | 'settings') => void;
  
  // Chat state
  activeChatId: string | null;
  setActiveChatId: (chatId: string | null) => void;
  
  // Profile cards for swiping
  profileCards: User[];
  setProfileCards: (cards: User[]) => void;
  removeProfileCard: (userId: string) => void;
}

const defaultPreferences: UserPreferences = {
  ageRange: [18, 50],
  distance: 100,
  countries: [],
  interests: [],
  lookingFor: 'serious'
};

export const useDatingStore = create<DatingStore>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUser: null,
      matches: [],
      chats: [],
      notifications: [],
      ads: [],
      meetingServices: [],
      adWatchCount: 0,
      lastAdWatch: null,
      userPreferences: defaultPreferences,
      currentView: 'swipe',
      activeChatId: null,
      profileCards: [],
      
      // Actions
      setCurrentUser: (user) => set({ currentUser: user }),
      
      addMatch: (match) => set((state) => ({
        matches: [...state.matches, match],
        notifications: [...state.notifications, {
          id: Date.now().toString(),
          type: 'match',
          title: 'New Match!',
          message: `You matched with ${match.users.find(id => id !== state.currentUser?.id)}`,
          timestamp: new Date(),
          read: false,
          data: match
        }]
      })),
      
      addChat: (chat) => set((state) => ({
        chats: [...state.chats, chat]
      })),
      
      addMessage: (chatId, message) => set((state) => ({
        chats: state.chats.map(chat => 
          chat.id === chatId 
            ? { ...chat, messages: [...chat.messages, message], lastActivity: new Date() }
            : chat
        )
      })),
      
      addNotification: (notification) => set((state) => ({
        notifications: [...state.notifications, notification]
      })),
      
      markNotificationAsRead: (id) => set((state) => ({
        notifications: state.notifications.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      })),
      
      incrementAdWatch: () => set((state) => ({
        adWatchCount: state.adWatchCount + 1,
        lastAdWatch: new Date().toISOString()
      })),
      
      updatePreferences: (preferences) => set((state) => ({
        userPreferences: { ...state.userPreferences, ...preferences }
      })),
      
      setCurrentView: (view) => {
        console.log('Setting current view to:', view);
        set({ currentView: view });
      },
      
      setActiveChatId: (chatId) => set({ activeChatId: chatId }),
      
      setProfileCards: (cards) => set({ profileCards: cards }),
      
      removeProfileCard: (userId) => set((state) => ({
        profileCards: state.profileCards.filter(card => card.id !== userId)
      })),
    }),
    {
      name: 'dating-app-storage',
      partialize: (state) => ({
        currentUser: state.currentUser,
        matches: state.matches,
        chats: state.chats,
        notifications: state.notifications,
        userPreferences: state.userPreferences,
        adWatchCount: state.adWatchCount,
        lastAdWatch: state.lastAdWatch,
      }),
    }
  )
); 