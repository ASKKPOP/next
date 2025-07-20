import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { country: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status === 'active') {
      where.active = true;
    } else if (status === 'inactive') {
      where.active = false;
    } else if (status === 'premium') {
      where.premium = true;
    } else if (status === 'reported') {
      where.reported = true;
    } else if (status === 'verified') {
      where.verified = true;
    }

    // Get users with pagination
    const [users, totalUsers] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          photos: {
            take: 1,
            orderBy: { order: 'asc' },
          },
          _count: {
            select: {
              matches: true,
              messages: true,
            },
          },
        },
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    // Remove passwords from response
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    return NextResponse.json({
      users: usersWithoutPasswords,
      pagination: {
        page,
        limit,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action, data } = body;

    if (!userId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let updatedUser;

    switch (action) {
      case 'verify':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { verified: true },
        });
        break;

      case 'unverify':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { verified: false },
        });
        break;

      case 'activate':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { active: true },
        });
        break;

      case 'deactivate':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { active: false },
        });
        break;

      case 'upgrade_premium':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { premium: true },
        });
        break;

      case 'downgrade_premium':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { premium: false },
        });
        break;

      case 'ban':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { 
            active: false, 
            banned: true,
            bannedAt: new Date(),
          },
        });
        break;

      case 'unban':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data: { 
            active: true, 
            banned: false,
            bannedAt: null,
          },
        });
        break;

      case 'update':
        updatedUser = await prisma.user.update({
          where: { id: userId },
          data,
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;

    return NextResponse.json({
      user: userWithoutPassword,
      message: `User ${action} successful`,
    });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Soft delete user
    await prisma.user.update({
      where: { id: userId },
      data: {
        active: false,
        deletedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
} 