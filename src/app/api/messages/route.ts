import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const matchId = searchParams.get('matchId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 }
      );
    }

    const messages = await prisma.message.findMany({
      where: {
        matchId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            photos: {
              orderBy: { order: 'asc' },
              take: 1,
            },
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { matchId, senderId, receiverId, content, type = 'TEXT', mediaUrl } = body;

    if (!matchId || !senderId || !receiverId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify the match exists and user is part of it
    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        OR: [
          { user1Id: senderId },
          { user2Id: senderId },
        ],
        active: true,
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found or user not authorized' },
        { status: 404 }
      );
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        matchId,
        senderId,
        receiverId,
        content,
        type,
        mediaUrl,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            photos: {
              orderBy: { order: 'asc' },
              take: 1,
            },
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Create notification for receiver
    await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'MESSAGE',
        title: 'New Message',
        message: `You received a message from ${message.sender.name}`,
        data: JSON.stringify({ matchId, messageId: message.id }),
      },
    });

    // Update match last activity
    await prisma.match.update({
      where: { id: matchId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json(
      { message: message, success: 'Message sent successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { messageId, read = true } = body;

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const message = await prisma.message.update({
      where: { id: messageId },
      data: { read },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
} 