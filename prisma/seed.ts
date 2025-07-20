import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create interests
  const interests = [
    'Travel', 'Cooking', 'Photography', 'Music', 'Sports', 'Reading',
    'Dancing', 'Hiking', 'Technology', 'Coffee', 'Art', 'Fashion',
    'Movies', 'Gaming', 'Yoga', 'Meditation', 'Languages', 'Business',
    'Science', 'History', 'Nature', 'Food', 'Wine', 'Fitness'
  ];

  console.log('📝 Creating interests...');
  for (const interestName of interests) {
    await prisma.interest.upsert({
      where: { name: interestName },
      update: {},
      create: {
        name: interestName,
        category: 'General',
      },
    });
  }

  // Get created interests
  const createdInterests = await prisma.interest.findMany();

  // Create sample users
  const sampleUsers = [
    {
      email: 'john@example.com',
      password: 'password123',
      name: 'John Doe',
      age: 28,
      gender: 'MALE' as const,
      country: 'USA',
      city: 'New York',
      bio: 'Looking for a meaningful connection with someone special.',
      lookingFor: 'SERIOUS' as const,
      verified: true,
      premium: true,
      interests: ['Travel', 'Music', 'Sports', 'Technology'],
    },
    {
      email: 'sakura@example.com',
      password: 'password123',
      name: 'Sakura Tanaka',
      age: 25,
      gender: 'FEMALE' as const,
      country: 'Japan',
      city: 'Tokyo',
      bio: 'Loves traveling, cooking, and learning new cultures. Looking for a serious relationship.',
      lookingFor: 'SERIOUS' as const,
      verified: true,
      premium: true,
      interests: ['Travel', 'Cooking', 'Photography', 'Languages'],
    },
    {
      email: 'mai@example.com',
      password: 'password123',
      name: 'Mai Srisai',
      age: 23,
      gender: 'FEMALE' as const,
      country: 'Thailand',
      city: 'Bangkok',
      bio: 'University student studying international business. Enjoys music and outdoor activities.',
      lookingFor: 'SERIOUS' as const,
      verified: true,
      premium: false,
      interests: ['Music', 'Business', 'Outdoor Activities', 'Dancing'],
    },
    {
      email: 'linh@example.com',
      password: 'password123',
      name: 'Linh Nguyen',
      age: 26,
      gender: 'FEMALE' as const,
      country: 'Vietnam',
      city: 'Ho Chi Minh City',
      bio: 'Software engineer who loves reading and hiking. Seeking someone who shares similar values.',
      lookingFor: 'SERIOUS' as const,
      verified: true,
      premium: true,
      interests: ['Reading', 'Hiking', 'Technology', 'Coffee'],
    },
    {
      email: 'michael@example.com',
      password: 'password123',
      name: 'Michael Smith',
      age: 30,
      gender: 'MALE' as const,
      country: 'Australia',
      city: 'Sydney',
      bio: 'Adventure seeker and coffee enthusiast. Looking for someone to share life\'s journey with.',
      lookingFor: 'SERIOUS' as const,
      verified: true,
      premium: true,
      interests: ['Travel', 'Coffee', 'Hiking', 'Photography'],
    },
    {
      email: 'yuki@example.com',
      password: 'password123',
      name: 'Yuki Yamamoto',
      age: 24,
      gender: 'FEMALE' as const,
      country: 'Japan',
      city: 'Osaka',
      bio: 'Art lover and foodie. Enjoys exploring new restaurants and museums.',
      lookingFor: 'CASUAL' as const,
      verified: true,
      premium: false,
      interests: ['Art', 'Food', 'Travel', 'Fashion'],
    },
  ];

  console.log('👥 Creating sample users...');
  for (const userData of sampleUsers) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    // Get interest IDs
    const userInterests = createdInterests.filter(interest => 
      userData.interests.includes(interest.name)
    );

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: {
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        age: userData.age,
        gender: userData.gender,
        country: userData.country,
        city: userData.city,
        bio: userData.bio,
        lookingFor: userData.lookingFor,
        verified: userData.verified,
        premium: userData.premium,
        interests: {
          connect: userInterests.map(interest => ({ id: interest.id })),
        },
      },
      include: {
        interests: true,
      },
    });

    // Add profile photos
    await prisma.photo.createMany({
      data: [
        {
          userId: user.id,
          url: `https://picsum.photos/400/600?random=${user.id}`,
          order: 0,
        },
        {
          userId: user.id,
          url: `https://picsum.photos/400/600?random=${user.id}2`,
          order: 1,
        },
      ],
    });

    // Create user preferences
    await prisma.userPreference.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        ageRangeMin: 20,
        ageRangeMax: 35,
        distance: 100,
        countries: JSON.stringify(['Japan', 'Thailand', 'Vietnam', 'USA', 'Australia']),
        interests: JSON.stringify(userInterests.map(interest => interest.id)),
        lookingFor: userData.lookingFor,
      },
    });
  }

  // Create some sample matches
  console.log('💕 Creating sample matches...');
  const users = await prisma.user.findMany();
  const john = users.find((u: any) => u.name === 'John Doe');
  const sakura = users.find((u: any) => u.name === 'Sakura Tanaka');
  const mai = users.find((u: any) => u.name === 'Mai Srisai');
  const michael = users.find((u: any) => u.name === 'Michael Smith');

  if (john && sakura) {
    await prisma.match.upsert({
      where: {
        user1Id_user2Id: {
          user1Id: john.id,
          user2Id: sakura.id,
        },
      },
      update: {},
      create: {
        user1Id: john.id,
        user2Id: sakura.id,
      },
    });
  }

  if (john && mai) {
    await prisma.match.upsert({
      where: {
        user1Id_user2Id: {
          user1Id: john.id,
          user2Id: mai.id,
        },
      },
      update: {},
      create: {
        user1Id: john.id,
        user2Id: mai.id,
      },
    });
  }

  // Create sample ads
  console.log('📺 Creating sample ads...');
  await prisma.ad.createMany({
    data: [
      {
        title: 'Premium Dating Experience',
        description: 'Upgrade to Premium and get unlimited likes, priority matching, and advanced features!',
        imageUrl: 'https://picsum.photos/400/300?random=ad1',
        link: '/premium',
        targetAudience: 'MEN',
        startDate: new Date(),
        active: true,
      },
      {
        title: 'Find Your Perfect Match',
        description: 'Join thousands of successful couples who found love on AsianLove!',
        imageUrl: 'https://picsum.photos/400/300?random=ad2',
        link: '/success-stories',
        targetAudience: 'ALL',
        startDate: new Date(),
        active: true,
      },
    ],
  });

  // Create sample meeting services
  console.log('🤝 Creating sample meeting services...');
  await prisma.meetingService.createMany({
    data: [
      {
        title: 'Romantic Dinner Date',
        description: 'Enjoy a romantic dinner at a premium restaurant with your match.',
        price: 150.00,
        location: 'Tokyo, Japan',
        duration: '3 hours',
        features: JSON.stringify(['Premium restaurant', 'Professional photographer', 'Transportation included']),
        active: true,
      },
      {
        title: 'Cultural Experience Tour',
        description: 'Explore local culture and attractions together.',
        price: 200.00,
        location: 'Bangkok, Thailand',
        duration: '6 hours',
        features: JSON.stringify(['Local guide', 'Cultural activities', 'Lunch included']),
        active: true,
      },
    ],
  });

  // Create community categories
  console.log('🏘️ Creating community categories...');
  const communityCategories = await prisma.communityCategory.createMany({
    data: [
      {
        name: 'Dating Tips',
        description: 'Share and discuss dating advice',
        icon: '💡',
        color: '#FF6B6B',
        targetAudience: 'ALL',
      },
      {
        name: 'Success Stories',
        description: 'Share your dating success stories',
        icon: '💕',
        color: '#4ECDC4',
        targetAudience: 'ALL',
      },
      {
        name: 'Men\'s Corner',
        description: 'Dating advice for men',
        icon: '👨',
        color: '#45B7D1',
        targetAudience: 'MEN',
      },
      {
        name: 'Women\'s Corner',
        description: 'Dating advice for women',
        icon: '👩',
        color: '#FFA07A',
        targetAudience: 'WOMEN',
      },
      {
        name: 'Cultural Exchange',
        description: 'Learn about different cultures',
        icon: '🌍',
        color: '#96CEB4',
        targetAudience: 'ALL',
      },
      {
        name: 'Travel & Dating',
        description: 'Dating while traveling',
        icon: '✈️',
        color: '#FFEAA7',
        targetAudience: 'ALL',
      },
    ],
  });

  // Create sample community posts
  console.log('📝 Creating sample community posts...');
  const categories = await prisma.communityCategory.findMany();
  const successCategory = categories.find((c: any) => c.name === 'Success Stories');
  const mensCategory = categories.find((c: any) => c.name === 'Men\'s Corner');
  const cultureCategory = categories.find((c: any) => c.name === 'Cultural Exchange');

  if (successCategory && john) {
    await prisma.communityPost.create({
      data: {
        userId: john.id,
        categoryId: successCategory.id,
        title: 'How I met my soulmate on AsianLove 💕',
        content: 'After 6 months of using the app, I finally found the one! We\'re getting married next year. Here\'s my story...',
        tags: JSON.stringify(['success-story', 'marriage', 'love']),
        isAnonymous: false,
      },
    });
  }

  if (mensCategory && john) {
    await prisma.communityPost.create({
      data: {
        userId: john.id,
        categoryId: mensCategory.id,
        title: 'Tips for first date with Asian women',
        content: 'As someone who has been dating Asian women for 3 years, here are my top tips for a successful first date...',
        tags: JSON.stringify(['dating-tips', 'first-date', 'advice']),
        isAnonymous: true,
      },
    });
  }

  if (cultureCategory && michael) {
    await prisma.communityPost.create({
      data: {
        userId: michael.id,
        categoryId: cultureCategory.id,
        title: 'Cultural differences in dating - My experience',
        content: 'Dating someone from a different culture has been eye-opening. Here\'s what I\'ve learned about cultural differences...',
        tags: JSON.stringify(['culture', 'experience', 'learning']),
        isAnonymous: false,
      },
    });
  }

  // Create sample social media connections
  console.log('🔗 Creating sample social media connections...');
  if (john) {
    await prisma.socialConnection.create({
      data: {
        userId: john.id,
        platform: 'FACEBOOK',
        accessToken: 'mock_facebook_token',
        platformUserId: '123456789',
        platformUsername: 'john.doe',
        profileUrl: 'https://facebook.com/john.doe',
        permissions: JSON.stringify(['posts', 'photos', 'profile']),
        isActive: true,
        lastSync: new Date(),
      },
    });

    await prisma.socialConnection.create({
      data: {
        userId: john.id,
        platform: 'INSTAGRAM',
        accessToken: 'mock_instagram_token',
        platformUserId: '987654321',
        platformUsername: 'john_doe_photos',
        profileUrl: 'https://instagram.com/john_doe_photos',
        permissions: JSON.stringify(['posts', 'photos', 'stories']),
        isActive: true,
        lastSync: new Date(),
      },
    });
  }

  console.log('✅ Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 