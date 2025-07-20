import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    // Get various statistics
    const [
      totalUsers,
      activeUsers,
      totalMatches,
      totalMessages,
      premiumUsers,
      reportedUsers,
      dailyActiveUsers,
      monthlyRevenue,
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      
      // Active users (online in last 24 hours)
      prisma.user.count({
        where: {
          lastSeen: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
          },
          active: true,
        },
      }),
      
      // Total matches
      prisma.match.count({
        where: { mutual: true },
      }),
      
      // Total messages
      prisma.message.count(),
      
      // Premium users
      prisma.user.count({
        where: { premium: true },
      }),
      
      // Reported users
      prisma.user.count({
        where: { reported: true },
      }),
      
      // Daily active users (unique users with activity in last 24 hours)
      prisma.user.count({
        where: {
          OR: [
            {
              lastSeen: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
              },
            },
            {
              messages: {
                some: {
                  createdAt: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  },
                },
              },
            },
            {
              matches: {
                some: {
                  createdAt: {
                    gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
                  },
                },
              },
            },
          ],
        },
      }),
      
      // Monthly revenue (mock calculation)
      Promise.resolve(45600), // This would be calculated from actual payment data
    ]);

    // Get recent activity
    const recentActivity = await prisma.user.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        verified: true,
        premium: true,
      },
    });

    // Get user growth data (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const userGrowth = await prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      _count: {
        id: true,
      },
    });

    // Get match success rate
    const totalLikes = await prisma.match.count({
      where: { action: { in: ['like', 'super_like'] } },
    });
    
    const mutualMatches = await prisma.match.count({
      where: { mutual: true },
    });

    const matchSuccessRate = totalLikes > 0 ? (mutualMatches / totalLikes) * 100 : 0;

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers,
        totalMatches,
        totalMessages,
        premiumUsers,
        reportedUsers,
        dailyActiveUsers,
        monthlyRevenue,
        matchSuccessRate: Math.round(matchSuccessRate * 100) / 100,
      },
      recentActivity,
      userGrowth,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin statistics' },
      { status: 500 }
    );
  }
} 