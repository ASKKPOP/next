import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;

    const photos = await prisma.userPhoto.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching photos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    const { url, order } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Create new photo
    const photo = await prisma.userPhoto.create({
      data: {
        userId,
        url,
        order: order || 0,
      },
    });

    return NextResponse.json({
      photo,
      message: 'Photo uploaded successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error uploading photo:', error);
    return NextResponse.json(
      { error: 'Failed to upload photo' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    const body = await request.json();
    const { photos } = body; // Array of { id, order }

    // Update photo orders
    const updatePromises = photos.map((photo: any) =>
      prisma.userPhoto.update({
        where: { id: photo.id, userId },
        data: { order: photo.order },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      message: 'Photo order updated successfully',
    });
  } catch (error) {
    console.error('Error updating photo order:', error);
    return NextResponse.json(
      { error: 'Failed to update photo order' },
      { status: 500 }
    );
  }
} 