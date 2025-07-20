import { User } from '@/types';

// Generate 100 diverse mock users
export const mockUsers: User[] = [
  // Japanese Users (20)
  {
    id: '1',
    name: 'Sakura',
    age: 25,
    gender: 'female',
    country: 'Japan',
    city: 'Tokyo',
    bio: 'Loves traveling, cooking, and learning new cultures. Looking for a serious relationship.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Travel', 'Cooking', 'Photography', 'Languages'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true,
    videoIntro: '/api/placeholder/video'
  },
  {
    id: '2',
    name: 'Yuki',
    age: 23,
    gender: 'female',
    country: 'Japan',
    city: 'Osaka',
    bio: 'University student studying international business. Enjoys music and outdoor activities.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Music', 'Business', 'Outdoor Activities', 'Dancing'],
    lookingFor: 'serious',
    verified: true,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    premium: false
  },
  {
    id: '3',
    name: 'Aiko',
    age: 28,
    gender: 'female',
    country: 'Japan',
    city: 'Kyoto',
    bio: 'Traditional arts teacher who loves tea ceremonies and calligraphy.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Traditional Arts', 'Tea Ceremony', 'Calligraphy', 'Meditation'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true
  },
  {
    id: '4',
    name: 'Hana',
    age: 24,
    gender: 'female',
    country: 'Japan',
    city: 'Yokohama',
    bio: 'Fashion designer with a passion for sustainable clothing and vintage styles.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Fashion', 'Sustainability', 'Vintage', 'Art'],
    lookingFor: 'casual',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: false
  },
  {
    id: '5',
    name: 'Mika',
    age: 26,
    gender: 'female',
    country: 'Japan',
    city: 'Nagoya',
    bio: 'Software engineer who enjoys gaming and anime. Looking for someone to share interests with.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Gaming', 'Anime', 'Technology', 'Programming'],
    lookingFor: 'friendship',
    verified: false,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
    premium: false
  },

  // Korean Users (15)
  {
    id: '6',
    name: 'Ji-eun',
    age: 24,
    gender: 'female',
    country: 'Korea',
    city: 'Seoul',
    bio: 'K-pop dance instructor who loves music and fitness. Looking for someone active and fun.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Dance', 'Music', 'Fitness', 'K-pop'],
    lookingFor: 'casual',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true
  },
  {
    id: '7',
    name: 'Min-ji',
    age: 27,
    gender: 'female',
    country: 'Korea',
    city: 'Busan',
    bio: 'Marine biologist who loves the ocean and outdoor adventures.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Marine Biology', 'Ocean', 'Adventure', 'Nature'],
    lookingFor: 'serious',
    verified: true,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 45),
    premium: false
  },
  {
    id: '8',
    name: 'Soo-jin',
    age: 25,
    gender: 'female',
    country: 'Korea',
    city: 'Incheon',
    bio: 'Chef specializing in traditional Korean cuisine. Loves cooking and sharing food culture.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Cooking', 'Korean Cuisine', 'Food Culture', 'Travel'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true
  },

  // Thai Users (15)
  {
    id: '9',
    name: 'Nong',
    age: 23,
    gender: 'female',
    country: 'Thailand',
    city: 'Bangkok',
    bio: 'Tourism student who loves meeting people from different cultures.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Tourism', 'Culture', 'Languages', 'Travel'],
    lookingFor: 'friendship',
    verified: false,
    online: true,
    lastSeen: new Date(),
    premium: false
  },
  {
    id: '10',
    name: 'Pim',
    age: 26,
    gender: 'female',
    country: 'Thailand',
    city: 'Chiang Mai',
    bio: 'Yoga instructor and wellness coach. Passionate about healthy living and mindfulness.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Yoga', 'Wellness', 'Mindfulness', 'Healthy Living'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true
  },
  {
    id: '11',
    name: 'Mai',
    age: 24,
    gender: 'female',
    country: 'Thailand',
    city: 'Phuket',
    bio: 'Beach resort manager who loves the ocean and water sports.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Beach', 'Water Sports', 'Tourism', 'Nature'],
    lookingFor: 'casual',
    verified: true,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 20),
    premium: false
  },

  // Vietnamese Users (15)
  {
    id: '12',
    name: 'Linh',
    age: 25,
    gender: 'female',
    country: 'Vietnam',
    city: 'Ho Chi Minh City',
    bio: 'Software engineer who loves reading and hiking. Seeking someone who shares similar values.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Reading', 'Hiking', 'Technology', 'Coffee'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true
  },
  {
    id: '13',
    name: 'Hoa',
    age: 22,
    gender: 'female',
    country: 'Vietnam',
    city: 'Hanoi',
    bio: 'Art student who loves painting and exploring traditional Vietnamese culture.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Art', 'Painting', 'Vietnamese Culture', 'Museums'],
    lookingFor: 'friendship',
    verified: false,
    online: true,
    lastSeen: new Date(),
    premium: false
  },
  {
    id: '14',
    name: 'Thao',
    age: 28,
    gender: 'female',
    country: 'Vietnam',
    city: 'Da Nang',
    bio: 'Marketing professional who enjoys beach activities and photography.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Marketing', 'Beach', 'Photography', 'Travel'],
    lookingFor: 'casual',
    verified: true,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 90),
    premium: true
  },

  // Filipino Users (10)
  {
    id: '15',
    name: 'Maria',
    age: 24,
    gender: 'female',
    country: 'Philippines',
    city: 'Manila',
    bio: 'Nurse who loves helping others and enjoys karaoke nights with friends.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Nursing', 'Karaoke', 'Helping Others', 'Music'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: false
  },
  {
    id: '16',
    name: 'Isabella',
    age: 26,
    gender: 'female',
    country: 'Philippines',
    city: 'Cebu',
    bio: 'Tour guide who loves sharing Filipino culture and history with visitors.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Tourism', 'Filipino Culture', 'History', 'Languages'],
    lookingFor: 'friendship',
    verified: true,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15),
    premium: false
  },

  // Indonesian Users (10)
  {
    id: '17',
    name: 'Sari',
    age: 25,
    gender: 'female',
    country: 'Indonesia',
    city: 'Jakarta',
    bio: 'Environmental activist who loves nature and sustainable living.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Environment', 'Nature', 'Sustainability', 'Activism'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: true
  },
  {
    id: '18',
    name: 'Dewi',
    age: 23,
    gender: 'female',
    country: 'Indonesia',
    city: 'Bali',
    bio: 'Spa therapist who practices meditation and loves spiritual wellness.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Spa Therapy', 'Meditation', 'Spirituality', 'Wellness'],
    lookingFor: 'casual',
    verified: false,
    online: true,
    lastSeen: new Date(),
    premium: false
  },

  // Cambodian Users (5)
  {
    id: '19',
    name: 'Sophea',
    age: 24,
    gender: 'female',
    country: 'Cambodia',
    city: 'Phnom Penh',
    bio: 'Tourism student who loves learning about different cultures and languages.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Tourism', 'Culture', 'Languages', 'Travel'],
    lookingFor: 'friendship',
    verified: false,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60),
    premium: false
  },

  // Lao Users (5)
  {
    id: '20',
    name: 'Noy',
    age: 26,
    gender: 'female',
    country: 'Laos',
    city: 'Vientiane',
    bio: 'Teacher who loves sharing knowledge and exploring local traditions.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Teaching', 'Education', 'Local Traditions', 'Reading'],
    lookingFor: 'serious',
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: false
  },

  // Myanmar Users (5)
  {
    id: '21',
    name: 'Thiri',
    age: 25,
    gender: 'female',
    country: 'Myanmar',
    city: 'Yangon',
    bio: 'Artist who loves painting traditional Myanmar scenes and modern art.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Art', 'Painting', 'Myanmar Culture', 'Modern Art'],
    lookingFor: 'casual',
    verified: false,
    online: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
    premium: false
  }
];

// Generate additional 79 users with varied profiles
for (let i = 22; i <= 100; i++) {
  const countries = ['Japan', 'Korea', 'Thailand', 'Vietnam', 'Philippines', 'Indonesia', 'Cambodia', 'Laos', 'Myanmar'];
  const cities = {
    'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama', 'Nagoya', 'Sapporo', 'Kobe', 'Fukuoka'],
    'Korea': ['Seoul', 'Busan', 'Incheon', 'Daegu', 'Daejeon', 'Gwangju', 'Suwon'],
    'Thailand': ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Krabi', 'Koh Samui'],
    'Vietnam': ['Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Hue', 'Nha Trang', 'Can Tho'],
    'Philippines': ['Manila', 'Cebu', 'Davao', 'Quezon City', 'Makati', 'Baguio'],
    'Indonesia': ['Jakarta', 'Bali', 'Surabaya', 'Bandung', 'Medan', 'Yogyakarta'],
    'Cambodia': ['Phnom Penh', 'Siem Reap', 'Battambang', 'Sihanoukville'],
    'Laos': ['Vientiane', 'Luang Prabang', 'Vang Vieng', 'Pakse'],
    'Myanmar': ['Yangon', 'Mandalay', 'Naypyidaw', 'Bagan', 'Inle Lake']
  };
  
  const interests = [
    ['Travel', 'Photography', 'Languages', 'Culture'],
    ['Music', 'Dancing', 'Concerts', 'Karaoke'],
    ['Cooking', 'Food', 'Restaurants', 'Cuisine'],
    ['Fitness', 'Yoga', 'Sports', 'Outdoor Activities'],
    ['Art', 'Painting', 'Museums', 'Design'],
    ['Technology', 'Gaming', 'Programming', 'AI'],
    ['Reading', 'Writing', 'Poetry', 'Books'],
    ['Nature', 'Hiking', 'Beach', 'Adventure'],
    ['Fashion', 'Shopping', 'Beauty', 'Style'],
    ['Business', 'Entrepreneurship', 'Finance', 'Marketing'],
    ['Education', 'Teaching', 'Learning', 'Languages'],
    ['Wellness', 'Meditation', 'Health', 'Mindfulness'],
    ['Entertainment', 'Movies', 'TV Shows', 'Anime'],
    ['Social Causes', 'Volunteering', 'Activism', 'Community']
  ];

  const bios = [
    'Loves exploring new places and meeting people from different cultures.',
    'Passionate about music and enjoys attending live concerts.',
    'Food enthusiast who loves trying new cuisines and cooking.',
    'Fitness lover who enjoys staying active and healthy.',
    'Creative soul who finds joy in art and self-expression.',
    'Tech-savvy individual who loves innovation and gaming.',
    'Bookworm who enjoys reading and intellectual conversations.',
    'Nature lover who finds peace in outdoor activities.',
    'Fashion-forward person who loves style and trends.',
    'Ambitious professional who values growth and success.',
    'Educator who loves sharing knowledge and learning.',
    'Wellness advocate who prioritizes mental and physical health.',
    'Entertainment lover who enjoys movies and pop culture.',
    'Community-minded person who cares about making a difference.'
  ];

  const country = countries[Math.floor(Math.random() * countries.length)];
  const city = cities[country][Math.floor(Math.random() * cities[country].length)];
  const age = Math.floor(Math.random() * 12) + 20; // 20-31 years old
  const interestSet = interests[Math.floor(Math.random() * interests.length)];
  const bio = bios[Math.floor(Math.random() * bios.length)];
  const lookingFor = ['serious', 'casual', 'friendship'][Math.floor(Math.random() * 3)];
  const verified = Math.random() > 0.3; // 70% verified
  const online = Math.random() > 0.4; // 60% online
  const premium = Math.random() > 0.6; // 40% premium

  mockUsers.push({
    id: i.toString(),
    name: `User${i}`,
    age,
    gender: 'female',
    country,
    city,
    bio,
    photos: ['/api/placeholder/400/600'],
    interests: interestSet,
    lookingFor: lookingFor as 'serious' | 'casual' | 'friendship',
    verified,
    online,
    lastSeen: online ? new Date() : new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24),
    premium,
    videoIntro: premium ? '/api/placeholder/video' : undefined
  });
} 