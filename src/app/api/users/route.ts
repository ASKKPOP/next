import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const gender = searchParams.get('gender');
    const country = searchParams.get('country');
    const ageMin = searchParams.get('ageMin');
    const ageMax = searchParams.get('ageMax');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {
      verified: true,
      active: true,
    };

    if (gender) where.gender = gender;
    if (country) where.country = country;
    if (ageMin || ageMax) {
      where.age = {};
      if (ageMin) where.age.gte = parseInt(ageMin);
      if (ageMax) where.age.lte = parseInt(ageMax);
    }

    const users = await prisma.user.findMany({
      where,
      include: {
        photos: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        interests: true,
      },
      take: limit,
      skip: offset,
      orderBy: { lastSeen: 'desc' },
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, age, gender, country, city, bio, lookingFor } = body;

    // Validate required fields
    if (!email || !password || !name || !age || !gender || !country || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        age: parseInt(age),
        gender,
        country,
        city,
        bio,
        lookingFor: lookingFor || 'SERIOUS',
      },
      include: {
        photos: true,
        interests: true,
      },
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { user: userWithoutPassword, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 