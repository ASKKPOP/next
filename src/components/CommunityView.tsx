'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  MoreHorizontal,
  TrendingUp,
  Clock,
  Filter,
  Plus,
  Users,
  Hash
} from 'lucide-react';
import { useDatingStore } from '@/lib/store';
import { SidebarAd } from './AdSense';

interface CommunityPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  upvotes: number;
  downvotes: number;
  views: number;
  comments: number;
  tags: string[];
  isAnonymous: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    gender: 'MALE' | 'FEMALE';
    country: string;
  };
  category: {
    id: string;
    name: string;
    color: string;
  };
}

interface CommunityCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  targetAudience: 'MEN' | 'WOMEN' | 'ALL';
  postCount: number;
}

export default function CommunityView() {
  const { currentUser, setCurrentView } = useDatingStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [categories, setCategories] = useState<CommunityCategory[]>([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  // Mock data for demo
  useEffect(() => {
    const mockCategories: CommunityCategory[] = [
      {
        id: '1',
        name: 'Dating Tips',
        description: 'Share and discuss dating advice',
        icon: '💡',
        color: '#FF6B6B',
        targetAudience: 'ALL',
        postCount: 156
      },
      {
        id: '2',
        name: 'Success Stories',
        description: 'Share your dating success stories',
        icon: '💕',
        color: '#4ECDC4',
        targetAudience: 'ALL',
        postCount: 89
      },
      {
        id: '3',
        name: 'Men\'s Corner',
        description: 'Dating advice for men',
        icon: '👨',
        color: '#45B7D1',
        targetAudience: 'MEN',
        postCount: 234
      },
      {
        id: '4',
        name: 'Women\'s Corner',
        description: 'Dating advice for women',
        icon: '👩',
        color: '#FFA07A',
        targetAudience: 'WOMEN',
        postCount: 198
      },
      {
        id: '5',
        name: 'Cultural Exchange',
        description: 'Learn about different cultures',
        icon: '🌍',
        color: '#96CEB4',
        targetAudience: 'ALL',
        postCount: 67
      },
      {
        id: '6',
        name: 'Travel & Dating',
        description: 'Dating while traveling',
        icon: '✈️',
        color: '#FFEAA7',
        targetAudience: 'ALL',
        postCount: 123
      }
    ];

    const mockPosts: CommunityPost[] = [
      {
        id: '1',
        title: 'How I met my soulmate on AsianLove 💕',
        content: 'After 6 months of using the app, I finally found the one! We\'re getting married next year. Here\'s my story...',
        upvotes: 245,
        downvotes: 12,
        views: 1234,
        comments: 89,
        tags: ['success-story', 'marriage', 'love'],
        isAnonymous: false,
        createdAt: '2024-01-15T10:30:00Z',
        user: {
          id: '1',
          name: 'Sakura',
          gender: 'FEMALE',
          country: 'Japan'
        },
        category: {
          id: '2',
          name: 'Success Stories',
          color: '#4ECDC4'
        }
      },
      {
        id: '2',
        title: 'Tips for first date with Asian women',
        content: 'As someone who has been dating Asian women for 3 years, here are my top tips for a successful first date...',
        upvotes: 189,
        downvotes: 23,
        views: 856,
        comments: 45,
        tags: ['dating-tips', 'first-date', 'advice'],
        isAnonymous: true,
        createdAt: '2024-01-14T15:20:00Z',
        user: {
          id: '2',
          name: 'Anonymous',
          gender: 'MALE',
          country: 'USA'
        },
        category: {
          id: '3',
          name: 'Men\'s Corner',
          color: '#45B7D1'
        }
      },
      {
        id: '3',
        title: 'Cultural differences in dating - My experience',
        content: 'Dating someone from a different culture has been eye-opening. Here\'s what I\'ve learned about cultural differences...',
        upvotes: 156,
        downvotes: 8,
        views: 567,
        comments: 32,
        tags: ['culture', 'experience', 'learning'],
        isAnonymous: false,
        createdAt: '2024-01-13T09:15:00Z',
        user: {
          id: '3',
          name: 'Michael',
          gender: 'MALE',
          country: 'Australia'
        },
        category: {
          id: '5',
          name: 'Cultural Exchange',
          color: '#96CEB4'
        }
      }
    ];

    setCategories(mockCategories);
    setPosts(mockPosts);
  }, []);

  const handleVote = (postId: string, voteType: 'upvote' | 'downvote') => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            upvotes: voteType === 'upvote' ? post.upvotes + 1 : post.upvotes,
            downvotes: voteType === 'downvote' ? post.downvotes + 1 : post.downvotes
          };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category.id === selectedCategory
  );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'hot':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      case 'new':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'top':
        return b.upvotes - a.upvotes;
      default:
        return 0;
    }
  });

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Community</h1>
          <button
            onClick={() => setShowCreatePost(true)}
            className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Categories */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
            
            {/* Sidebar Ad */}
            <SidebarAd />
            
            {/* All Posts */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-pink-100 text-pink-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">🏠</span>
                <div>
                  <div className="font-medium">All Posts</div>
                  <div className="text-sm text-gray-500">Everything</div>
                </div>
              </div>
            </button>

            {/* Category List */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-pink-100 text-pink-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{category.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-gray-500">{category.postCount} posts</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Sort Controls */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSortBy('hot')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    sortBy === 'hot' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Hot</span>
                </button>
                <button
                  onClick={() => setSortBy('new')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    sortBy === 'new' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  <span>New</span>
                </button>
                <button
                  onClick={() => setSortBy('top')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    sortBy === 'top' ? 'bg-pink-100 text-pink-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Top</span>
                </button>
              </div>
              
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              <AnimatePresence>
                {sortedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                            style={{ backgroundColor: post.category.color }}
                          >
                            {post.isAnonymous ? 'A' : post.user.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">
                              {post.isAnonymous ? 'Anonymous' : post.user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {post.user.country} • {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <button className="p-2 text-gray-500 hover:text-gray-700">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Category Badge */}
                      <div className="flex items-center space-x-2">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: post.category.color }}
                        >
                          {post.category.name}
                        </span>
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="text-xs text-gray-500">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {post.content}
                      </p>
                      
                      {post.imageUrl && (
                        <div className="mb-4">
                          <img 
                            src={post.imageUrl} 
                            alt="Post" 
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {/* Vote Buttons */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleVote(post.id, 'upvote')}
                              className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors"
                            >
                              <ThumbsUp className="w-4 h-4" />
                              <span className="text-sm">{post.upvotes}</span>
                            </button>
                            <button
                              onClick={() => handleVote(post.id, 'downvote')}
                              className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors"
                            >
                              <ThumbsDown className="w-4 h-4" />
                              <span className="text-sm">{post.downvotes}</span>
                            </button>
                          </div>

                          {/* Comments */}
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm">{post.comments}</span>
                          </button>

                          {/* Share */}
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-sm">Share</span>
                          </button>
                        </div>

                        <div className="text-sm text-gray-500">
                          {post.views} views
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 