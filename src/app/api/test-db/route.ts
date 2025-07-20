import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Test database connection
    await prisma.$connect();
    
    // Get basic stats
    const userCount = await prisma.user.count();
    const matchCount = await prisma.match.count();
    const messageCount = await prisma.message.count();
    const interestCount = await prisma.interest.count();
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      stats: {
        users: userCount,
        matches: matchCount,
        messages: messageCount,
        interests: interestCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 