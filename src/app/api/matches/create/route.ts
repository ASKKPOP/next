import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId1, userId2, action } = body; // action: 'like', 'super_like', 'pass'

    // Validate required fields
    if (!userId1 || !userId2 || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if users exist
    const [user1, user2] = await Promise.all([
      prisma.user.findUnique({ where: { id: userId1 } }),
      prisma.user.findUnique({ where: { id: userId2 } }),
    ]);

    if (!user1 || !user2) {
      return NextResponse.json(
        { error: 'One or both users not found' },
        { status: 404 }
      );
    }

    // Check if match already exists
    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { userId1, userId2 },
          { userId1: userId2, userId2: userId1 },
        ],
      },
    });

    if (existingMatch) {
      return NextResponse.json(
        { error: 'Match already exists' },
        { status: 409 }
      );
    }

    // Create match record
    const match = await prisma.match.create({
      data: {
        userId1,
        userId2,
        action,
        matched: action === 'like' || action === 'super_like',
        createdAt: new Date(),
      },
      include: {
        user1: {
          select: {
            id: true,
            name: true,
            age: true,
            photos: {
              where: { order: 0 },
              take: 1,
            },
          },
        },
        user2: {
          select: {
            id: true,
            name: true,
            age: true,
            photos: {
              where: { order: 0 },
              take: 1,
            },
          },
        },
      },
    });

    // Check if it's a mutual match
    let isMutualMatch = false;
    if (action === 'like' || action === 'super_like') {
      const reverseMatch = await prisma.match.findFirst({
        where: {
          userId1: userId2,
          userId2: userId1,
          action: { in: ['like', 'super_like'] },
        },
      });

      if (reverseMatch) {
        isMutualMatch = true;
        // Update both matches as mutual
        await Promise.all([
          prisma.match.update({
            where: { id: match.id },
            data: { mutual: true },
          }),
          prisma.match.update({
            where: { id: reverseMatch.id },
            data: { mutual: true },
          }),
        ]);
      }
    }

    return NextResponse.json({
      match: {
        ...match,
        isMutualMatch,
      },
      message: isMutualMatch ? 'It\'s a match!' : 'Action recorded successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 }
    );
  }
} 