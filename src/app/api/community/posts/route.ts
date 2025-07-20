import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const sortBy = searchParams.get('sortBy') || 'hot';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const where: any = {};
    if (categoryId && categoryId !== 'all') {
      where.categoryId = categoryId;
    }

    let orderBy: any = {};
    switch (sortBy) {
      case 'hot':
        orderBy = { upvotes: 'desc' };
        break;
      case 'new':
        orderBy = { createdAt: 'desc' };
        break;
      case 'top':
        orderBy = { upvotes: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    const posts = await prisma.communityPost.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            gender: true,
            country: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        comments: {
          select: {
            id: true,
          },
        },
        votes: {
          select: {
            id: true,
            voteType: true,
          },
        },
      },
      orderBy,
      take: limit,
      skip: offset,
    });

    // Transform posts to include computed fields
    const transformedPosts = posts.map((post: any) => ({
      ...post,
      comments: post.comments.length,
      upvotes: post.votes.filter((vote: any) => vote.voteType === 'UPVOTE').length,
      downvotes: post.votes.filter((vote: any) => vote.voteType === 'DOWNVOTE').length,
      tags: post.tags ? JSON.parse(post.tags) : [],
    }));

    return NextResponse.json({ posts: transformedPosts });
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, categoryId, title, content, imageUrl, videoUrl, tags, isAnonymous } = body;

    if (!userId || !categoryId || !title || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const post = await prisma.communityPost.create({
      data: {
        userId,
        categoryId,
        title,
        content,
        imageUrl,
        videoUrl,
        tags: JSON.stringify(tags || []),
        isAnonymous: isAnonymous || false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            gender: true,
            country: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });

    return NextResponse.json(
      { post, message: 'Post created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating community post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
} 