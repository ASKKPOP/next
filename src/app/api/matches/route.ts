import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const matches = await prisma.match.findMany({
      where: {
        OR: [
          { user1Id: userId },
          { user2Id: userId },
        ],
        active: true,
      },
      include: {
        user1: {
          include: {
            photos: {
              orderBy: { order: 'asc' },
              take: 1,
            },
          },
        },
        user2: {
          include: {
            photos: {
              orderBy: { order: 'asc' },
              take: 1,
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { matchedAt: 'desc' },
    });

    // Transform matches to include the other user and last message
    const transformedMatches = matches.map((match: any) => {
      const otherUser = match.user1Id === userId ? match.user2 : match.user1;
      const lastMessage = match.messages[0] || null;
      
      return {
        id: match.id,
        matchedAt: match.matchedAt,
        otherUser,
        lastMessage,
        unreadCount: 0, // TODO: Calculate unread count
      };
    });

    return NextResponse.json({ matches: transformedMatches });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user1Id, user2Id } = body;

    if (!user1Id || !user2Id) {
      return NextResponse.json(
        { error: 'Both user IDs are required' },
        { status: 400 }
      );
    }

    // Check if match already exists
    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { user1Id, user2Id },
          { user1Id: user2Id, user2Id: user1Id },
        ],
      },
    });

    if (existingMatch) {
      return NextResponse.json(
        { error: 'Match already exists' },
        { status: 409 }
      );
    }

    // Create new match
    const match = await prisma.match.create({
      data: {
        user1Id,
        user2Id,
      },
      include: {
        user1: {
          include: {
            photos: {
              orderBy: { order: 'asc' },
              take: 1,
            },
          },
        },
        user2: {
          include: {
            photos: {
              orderBy: { order: 'asc' },
              take: 1,
            },
          },
        },
      },
    });

    // Create notification for both users
    await prisma.notification.createMany({
      data: [
        {
          userId: user1Id,
          type: 'MATCH',
          title: 'New Match!',
          message: `You matched with ${match.user2.name}`,
          data: JSON.stringify({ matchId: match.id }),
        },
        {
          userId: user2Id,
          type: 'MATCH',
          title: 'New Match!',
          message: `You matched with ${match.user1.name}`,
          data: JSON.stringify({ matchId: match.id }),
        },
      ],
    });

    return NextResponse.json(
      { match, message: 'Match created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 }
    );
  }
} 