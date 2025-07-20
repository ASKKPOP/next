import { Chat, Message } from '@/types';

// Generate mock chat data
export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['currentUser', '1'], // Sakura
    messages: [
      {
        id: 'msg1',
        senderId: '1',
        receiverId: 'currentUser',
        content: 'Hi! I saw we matched. I love your profile! 😊',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: true
      },
      {
        id: 'msg2',
        senderId: 'currentUser',
        receiverId: '1',
        content: 'Thank you! I really liked your profile too. I see you love traveling!',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        read: true
      },
      {
        id: 'msg3',
        senderId: '1',
        receiverId: 'currentUser',
        content: 'Yes! I\'ve been to 15 countries so far. What\'s your favorite place you\'ve visited?',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        read: true
      },
      {
        id: 'msg4',
        senderId: 'currentUser',
        receiverId: '1',
        content: 'I loved Japan! The culture and food were amazing. Have you been there?',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        read: false
      }
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: 'chat2',
    participants: ['currentUser', '12'], // Linh
    messages: [
      {
        id: 'msg5',
        senderId: '12',
        receiverId: 'currentUser',
        content: 'Hello! Nice to meet you! 👋',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: true
      },
      {
        id: 'msg6',
        senderId: 'currentUser',
        receiverId: '12',
        content: 'Hi Linh! Nice to meet you too. I see you\'re into technology and hiking!',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
        read: true
      },
      {
        id: 'msg7',
        senderId: '12',
        receiverId: 'currentUser',
        content: 'Yes! I\'m a software engineer and love outdoor activities. Do you hike too?',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1),
        read: true
      }
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 1)
  },
  {
    id: 'chat3',
    participants: ['currentUser', '6'], // Ji-eun
    messages: [
      {
        id: 'msg8',
        senderId: '6',
        receiverId: 'currentUser',
        content: '안녕하세요! (Hello!) I\'m Ji-eun! 💃',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        read: true
      },
      {
        id: 'msg9',
        senderId: 'currentUser',
        receiverId: '6',
        content: '안녕하세요! Nice to meet you Ji-eun! I see you\'re a dance instructor!',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2.5),
        read: true
      },
      {
        id: 'msg10',
        senderId: '6',
        receiverId: 'currentUser',
        content: 'Yes! I teach K-pop dance. Do you like dancing? 🎵',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        read: false
      }
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: 'chat4',
    participants: ['currentUser', '10'], // Pim
    messages: [
      {
        id: 'msg11',
        senderId: '10',
        receiverId: 'currentUser',
        content: 'Hi there! I\'m Pim, a yoga instructor from Chiang Mai. Namaste! 🙏',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        read: true
      },
      {
        id: 'msg12',
        senderId: 'currentUser',
        receiverId: '10',
        content: 'Namaste Pim! I\'ve always wanted to visit Chiang Mai. Do you teach yoga there?',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5),
        read: true
      },
      {
        id: 'msg13',
        senderId: '10',
        receiverId: 'currentUser',
        content: 'Yes! I have a small studio in the old city. You should definitely visit!',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
        read: true
      },
      {
        id: 'msg14',
        senderId: 'currentUser',
        receiverId: '10',
        content: 'That sounds amazing! I\'d love to learn more about your yoga practice.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5),
        read: false
      }
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 3.5)
  },
  {
    id: 'chat5',
    participants: ['currentUser', '17'], // Sari
    messages: [
      {
        id: 'msg15',
        senderId: '17',
        receiverId: 'currentUser',
        content: 'Hello! I\'m Sari from Jakarta. I\'m passionate about environmental conservation! 🌱',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
        read: true
      },
      {
        id: 'msg16',
        senderId: 'currentUser',
        receiverId: '17',
        content: 'Hi Sari! That\'s wonderful. What kind of environmental work do you do?',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7.5),
        read: true
      },
      {
        id: 'msg17',
        senderId: '17',
        receiverId: 'currentUser',
        content: 'I work with local communities to promote sustainable practices and protect forests.',
        type: 'text',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
        read: false
      }
    ],
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 7)
  }
];

// Generate additional mock chats for variety
for (let i = 6; i <= 20; i++) {
  const userId = Math.floor(Math.random() * 100) + 1;
  const messageCount = Math.floor(Math.random() * 10) + 1;
  const messages: Message[] = [];
  
  const greetings = [
    'Hi there! Nice to meet you! 😊',
    'Hello! I saw we matched. How are you?',
    'Hey! Thanks for the match! 👋',
    'Hi! I really liked your profile!',
    'Hello! Nice to connect with you! 💕'
  ];
  
  const responses = [
    'Thanks! I liked yours too. What do you like to do for fun?',
    'Hi! I\'m doing great, thanks! How about you?',
    'Hey! Nice to meet you too. I see you\'re into [interest]!',
    'Hello! I\'m excited to chat with you!',
    'Hi! Thanks for reaching out. I love your interests!'
  ];
  
  const followUps = [
    'What\'s your favorite hobby?',
    'Have you traveled much?',
    'What kind of music do you like?',
    'Do you enjoy outdoor activities?',
    'What\'s your dream vacation destination?'
  ];
  
  // Add initial greeting
  messages.push({
    id: `msg${i * 10 + 1}`,
    senderId: userId.toString(),
    receiverId: 'currentUser',
    content: greetings[Math.floor(Math.random() * greetings.length)],
    type: 'text',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * i),
    read: true
  });
  
  // Add response
  messages.push({
    id: `msg${i * 10 + 2}`,
    senderId: 'currentUser',
    receiverId: userId.toString(),
    content: responses[Math.floor(Math.random() * responses.length)],
    type: 'text',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * i + 1000 * 60 * 5),
    read: true
  });
  
  // Add follow-up question
  messages.push({
    id: `msg${i * 10 + 3}`,
    senderId: userId.toString(),
    receiverId: 'currentUser',
    content: followUps[Math.floor(Math.random() * followUps.length)],
    type: 'text',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * i + 1000 * 60 * 10),
    read: Math.random() > 0.5
  });
  
  mockChats.push({
    id: `chat${i}`,
    participants: ['currentUser', userId.toString()],
    messages,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * i + 1000 * 60 * 10)
  });
} 