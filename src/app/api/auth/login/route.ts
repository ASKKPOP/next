import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        photos: {
          orderBy: { order: 'asc' },
          take: 1,
        },
        interests: true,
        preferences: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Update last seen
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        lastSeen: new Date(),
        online: true,
      },
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: 'Login successful',
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
} 