'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Facebook, 
  Instagram, 
  Link, 
  Share2, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  Settings,
  Plus,
  ExternalLink,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useDatingStore } from '@/lib/store';
import { SidebarAd } from './AdSense';

interface SocialPost {
  id: string;
  platform: 'FACEBOOK' | 'INSTAGRAM';
  platformPostId: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  postUrl: string;
  postedAt: string;
  createdAt: string;
}

interface SocialConnection {
  id: string;
  platform: 'FACEBOOK' | 'INSTAGRAM';
  platformUserId: string;
  platformUsername: string;
  profileUrl?: string;
  permissions: string[];
  isActive: boolean;
  lastSync?: string;
}

export default function SocialMediaView() {
  const { currentUser } = useDatingStore();
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'FACEBOOK' | 'INSTAGRAM'>('all');
  const [socialPosts, setSocialPosts] = useState<SocialPost[]>([]);
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Mock data for demo
  useEffect(() => {
    const mockConnections: SocialConnection[] = [
      {
        id: '1',
        platform: 'FACEBOOK',
        platformUserId: '123456789',
        platformUsername: 'john.doe',
        profileUrl: 'https://facebook.com/john.doe',
        permissions: ['posts', 'photos', 'profile'],
        isActive: true,
        lastSync: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        platform: 'INSTAGRAM',
        platformUserId: '987654321',
        platformUsername: 'john_doe_photos',
        profileUrl: 'https://instagram.com/john_doe_photos',
        permissions: ['posts', 'photos', 'stories'],
        isActive: true,
        lastSync: '2024-01-15T09:15:00Z'
      }
    ];

    const mockPosts: SocialPost[] = [
      {
        id: '1',
        platform: 'FACEBOOK',
        platformPostId: 'fb_123',
        content: 'Had an amazing date last night! The cultural exchange was incredible. Learning about different traditions makes dating so much more interesting. #Dating #Culture #Love',
        imageUrl: 'https://picsum.photos/400/300?random=fb1',
        likes: 45,
        comments: 12,
        shares: 3,
        postUrl: 'https://facebook.com/post/123',
        postedAt: '2024-01-14T20:00:00Z',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        platform: 'INSTAGRAM',
        platformPostId: 'ig_456',
        content: 'Beautiful sunset dinner with someone special 🌅 #Dating #Sunset #Romance',
        imageUrl: 'https://picsum.photos/400/400?random=ig1',
        likes: 89,
        comments: 8,
        shares: 2,
        postUrl: 'https://instagram.com/p/456',
        postedAt: '2024-01-13T18:30:00Z',
        createdAt: '2024-01-15T09:15:00Z'
      },
      {
        id: '3',
        platform: 'FACEBOOK',
        platformPostId: 'fb_789',
        content: 'Traveling to Japan next month! Excited to meet new people and experience the culture. Anyone have recommendations for dating in Tokyo? #Travel #Japan #Dating',
        likes: 23,
        comments: 15,
        shares: 7,
        postUrl: 'https://facebook.com/post/789',
        postedAt: '2024-01-12T14:20:00Z',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '4',
        platform: 'INSTAGRAM',
        platformPostId: 'ig_101',
        content: 'Coffee date vibes ☕️ #Coffee #Dating #Vibes',
        imageUrl: 'https://picsum.photos/400/400?random=ig2',
        likes: 156,
        comments: 23,
        shares: 5,
        postUrl: 'https://instagram.com/p/101',
        postedAt: '2024-01-11T16:45:00Z',
        createdAt: '2024-01-15T09:15:00Z'
      }
    ];

    setConnections(mockConnections);
    setSocialPosts(mockPosts);
  }, []);

  const handleConnectPlatform = (platform: 'FACEBOOK' | 'INSTAGRAM') => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      const newConnection: SocialConnection = {
        id: Date.now().toString(),
        platform,
        platformUserId: `user_${Date.now()}`,
        platformUsername: platform === 'FACEBOOK' ? 'new_user' : 'new_user_photos',
        permissions: ['posts', 'photos', 'profile'],
        isActive: true,
        lastSync: new Date().toISOString()
      };
      
      setConnections(prev => [...prev, newConnection]);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId));
  };

  const handleSync = (connectionId: string) => {
    setConnections(prev => 
      prev.map(conn => 
        conn.id === connectionId 
          ? { ...conn, lastSync: new Date().toISOString() }
          : conn
      )
    );
  };

  const filteredPosts = socialPosts.filter(post => 
    selectedPlatform === 'all' || post.platform === selectedPlatform
  );

  const getPlatformIcon = (platform: 'FACEBOOK' | 'INSTAGRAM') => {
    return platform === 'FACEBOOK' ? (
      <Facebook className="w-5 h-5 text-blue-600" />
    ) : (
      <Instagram className="w-5 h-5 text-pink-600" />
    );
  };

  const getPlatformColor = (platform: 'FACEBOOK' | 'INSTAGRAM') => {
    return platform === 'FACEBOOK' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700';
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Social Media</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => {/* Refresh posts */}}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Connections */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Connected Accounts</h3>
              
            {/* Sidebar Ad */}
            <SidebarAd />
              <button
                onClick={() => setIsConnecting(true)}
                className="p-2 text-pink-500 hover:text-pink-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Connection Status */}
            {connections.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">
                  <Link className="w-12 h-12 mx-auto" />
                </div>
                <p className="text-gray-500 mb-4">No social media accounts connected</p>
                <p className="text-sm text-gray-400">Connect your accounts to share posts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {connections.map((connection) => (
                  <div
                    key={connection.id}
                    className="bg-gray-50 rounded-lg p-3 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getPlatformIcon(connection.platform)}
                        <span className="font-medium">
                          {connection.platformUsername}
                        </span>
                        {connection.isActive && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <button
                        onClick={() => handleDisconnect(connection.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-2">
                      {connection.platform}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">
                        Last sync: {connection.lastSync ? new Date(connection.lastSync).toLocaleDateString() : 'Never'}
                      </div>
                      <button
                        onClick={() => handleSync(connection.id)}
                        className="text-xs text-blue-500 hover:text-blue-600"
                      >
                        Sync
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Connect New Account */}
            {isConnecting && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <h4 className="font-medium text-blue-800 mb-3">Connect Account</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => handleConnectPlatform('FACEBOOK')}
                    className="w-full flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Connect Facebook</span>
                  </button>
                  <button
                    onClick={() => handleConnectPlatform('INSTAGRAM')}
                    className="w-full flex items-center space-x-3 p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Connect Instagram</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Filter Controls */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedPlatform === 'all' 
                    ? 'bg-pink-100 text-pink-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                All Platforms
              </button>
              <button
                onClick={() => setSelectedPlatform('FACEBOOK')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  selectedPlatform === 'FACEBOOK' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => setSelectedPlatform('INSTAGRAM')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  selectedPlatform === 'INSTAGRAM' 
                    ? 'bg-pink-100 text-pink-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Share2 className="w-16 h-16 mx-auto" />
                  </div>
                  <p className="text-gray-500 mb-2">No posts found</p>
                  <p className="text-sm text-gray-400">Connect your social media accounts to see posts</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <AnimatePresence>
                    {filteredPosts.map((post, index) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                      >
                        {/* Post Header */}
                        <div className="p-4 border-b border-gray-100">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getPlatformIcon(post.platform)}
                              <span className="font-medium">
                                {post.platform === 'FACEBOOK' ? 'Facebook' : 'Instagram'}
                              </span>
                            </div>
                            <a
                              href={post.postUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-gray-700"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(post.postedAt).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Post Content */}
                        <div className="p-4">
                          <p className="text-gray-700 mb-4 line-clamp-3">
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

                        {/* Post Stats */}
                        <div className="px-4 py-3 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Share2 className="w-4 h-4" />
                                <span>{post.shares}</span>
                              </div>
                            </div>
                            
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(post.platform)}`}
                            >
                              {post.platform}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 