import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const matchId = params.matchId;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Verify match exists
    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }

    // Get messages for this conversation
    const messages = await prisma.message.findMany({
      where: { matchId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            photos: {
              where: { order: 0 },
              take: 1,
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    // Mark messages as read for the other user
    await prisma.message.updateMany({
      where: {
        matchId,
        senderId: { not: match.userId1 }, // Assuming current user is userId1
        read: false,
      },
      data: { read: true, readAt: new Date() },
    });

    return NextResponse.json({ 
      messages: messages.reverse(), // Return in chronological order
      matchId 
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { matchId: string } }
) {
  try {
    const matchId = params.matchId;
    const body = await request.json();
    const { senderId, content, messageType = 'text' } = body;

    // Validate required fields
    if (!senderId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify match exists and sender is part of the match
    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        OR: [
          { userId1: senderId },
          { userId2: senderId },
        ],
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found or sender not authorized' },
        { status: 404 }
      );
    }

    // Create message
    const message = await prisma.message.create({
      data: {
        matchId,
        senderId,
        content,
        messageType,
        createdAt: new Date(),
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            photos: {
              where: { order: 0 },
              take: 1,
            },
          },
        },
      },
    });

    // Update match last message
    await prisma.match.update({
      where: { id: matchId },
      data: {
        lastMessage: content,
        lastMessageAt: new Date(),
      },
    });

    return NextResponse.json({
      message,
      message: 'Message sent successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 