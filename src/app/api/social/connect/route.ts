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

    const connections = await prisma.socialConnection.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ connections });
  } catch (error) {
    console.error('Error fetching social connections:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, platform, accessToken, refreshToken, platformUserId, platformUsername, profileUrl, permissions } = body;

    if (!userId || !platform || !accessToken || !platformUserId || !platformUsername) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if connection already exists
    const existingConnection = await prisma.socialConnection.findFirst({
      where: {
        userId,
        platform,
      },
    });

    if (existingConnection) {
      // Update existing connection
      const connection = await prisma.socialConnection.update({
        where: { id: existingConnection.id },
        data: {
          accessToken,
          refreshToken,
          platformUserId,
          platformUsername,
          profileUrl,
          permissions: JSON.stringify(permissions || []),
          isActive: true,
          lastSync: new Date(),
        },
      });

      return NextResponse.json({
        connection,
        message: 'Connection updated successfully',
      });
    } else {
      // Create new connection
      const connection = await prisma.socialConnection.create({
        data: {
          userId,
          platform,
          accessToken,
          refreshToken,
          platformUserId,
          platformUsername,
          profileUrl,
          permissions: JSON.stringify(permissions || []),
          isActive: true,
          lastSync: new Date(),
        },
      });

      return NextResponse.json({
        connection,
        message: 'Connection created successfully',
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Error managing social connection:', error);
    return NextResponse.json(
      { error: 'Failed to manage connection' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const connectionId = searchParams.get('connectionId');

    if (!connectionId) {
      return NextResponse.json(
        { error: 'Connection ID is required' },
        { status: 400 }
      );
    }

    await prisma.socialConnection.delete({
      where: { id: connectionId },
    });

    return NextResponse.json({
      message: 'Connection removed successfully',
    });
  } catch (error) {
    console.error('Error removing social connection:', error);
    return NextResponse.json(
      { error: 'Failed to remove connection' },
      { status: 500 }
    );
  }
} 