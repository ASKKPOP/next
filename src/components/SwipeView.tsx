'use client';

import { useState, useEffect } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { Heart, X, Star, MessageCircle, Video, Filter, Grid, List } from 'lucide-react';
import { useDatingStore } from '@/lib/store';
import { User } from '@/types';
import { mockUsers } from '@/data/mockUsers';

export default function SwipeView() {
  const { profileCards, setProfileCards, removeProfileCard, addMatch, currentUser: loggedInUser } = useDatingStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<'swipe' | 'grid'>('swipe');
  const [showFilters, setShowFilters] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (profileCards.length === 0) {
      setProfileCards(mockUsers);
    }
  }, [profileCards.length, setProfileCards]);

  const handleSwipe = (direction: 'left' | 'right', userId: string) => {
    setDirection(direction);
    
    if (direction === 'right') {
      // Simulate match (50% chance)
      if (Math.random() > 0.5) {
        const match = {
          id: Date.now().toString(),
          users: [loggedInUser?.id || '1', userId] as [string, string],
          matchedAt: new Date(),
          unreadCount: 0
        };
        addMatch(match);
      }
    }
    
    removeProfileCard(userId);
    setCurrentIndex(prev => prev + 1);
    
    // Reset direction after animation
    setTimeout(() => setDirection(null), 300);
  };

  const handleDragEnd = (event: any, info: PanInfo, userId: string) => {
    const swipeThreshold = 100;
    
    if (info.offset.x > swipeThreshold) {
      handleSwipe('right', userId);
    } else if (info.offset.x < -swipeThreshold) {
      handleSwipe('left', userId);
    }
  };

  if (profileCards.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No more profiles</h3>
          <p className="text-gray-500">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  const currentProfile = profileCards[currentIndex];

  // Desktop Layout
  if (!isMobile) {
    return (
      <div className="h-full flex">
        {/* Desktop Left Panel - Profile Cards */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Discover</h1>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('swipe')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'swipe' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="flex-1 p-6">
            {viewMode === 'swipe' ? (
              // Desktop Swipe View
              <div className="flex items-center justify-center h-full">
                <div className="relative w-96">
                  {profileCards.slice(currentIndex, currentIndex + 2).reverse().map((user, index) => {
                    const isTop = index === profileCards.slice(currentIndex, currentIndex + 2).length - 1;
                    
                    return (
                      <motion.div
                        key={user.id}
                        className={`absolute inset-0 bg-white rounded-3xl shadow-lg overflow-hidden ${
                          isTop ? 'z-10' : 'z-0'
                        }`}
                        drag={isTop ? 'x' : false}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(e, info) => isTop && handleDragEnd(e, info, user.id)}
                        animate={{
                          scale: isTop ? 1 : 0.95,
                          y: isTop ? 0 : 10,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Profile Image */}
                        <div className="relative h-96 bg-gradient-to-br from-pink-200 to-purple-200">
                          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                          
                          {/* Online Status */}
                          {user.online && (
                            <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                          )}
                          
                          {/* Verified Badge */}
                          {user.verified && (
                            <div className="absolute top-4 left-4 bg-blue-500 text-white p-1 rounded-full">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          
                          {/* Premium Badge */}
                          {user.premium && (
                            <div className="absolute top-12 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              Premium
                            </div>
                          )}
                          
                          {/* Video Intro Button */}
                          {user.videoIntro && (
                            <button className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded-full">
                              <Video className="w-5 h-5 text-gray-700" />
                            </button>
                          )}
                        </div>

                        {/* Profile Info */}
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-2xl font-bold text-gray-800">
                              {user.name}, {user.age}
                            </h3>
                            <span className="text-gray-500">{user.city}</span>
                          </div>
                          
                          <p className="text-gray-600 mb-4">{user.bio}</p>
                          
                          {/* Interests */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {user.interests.slice(0, 4).map((interest) => (
                              <span
                                key={interest}
                                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                          
                          {/* Last Seen */}
                          {!user.online && (
                            <p className="text-gray-400 text-sm">
                              Last seen {user.lastSeen.toLocaleTimeString()}
                            </p>
                          )}
                        </div>

                        {/* Swipe Direction Indicator */}
                        {isTop && direction && (
                          <motion.div
                            className={`absolute top-4 left-4 right-4 p-4 rounded-lg text-white font-bold text-center ${
                              direction === 'right' ? 'bg-green-500' : 'bg-red-500'
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            {direction === 'right' ? 'LIKE!' : 'NOPE'}
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ) : (
              // Desktop Grid View
              <div className="grid grid-cols-3 gap-6">
                {profileCards.slice(currentIndex, currentIndex + 9).map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    onClick={() => {
                      // Switch to swipe view and set this user as current
                      setViewMode('swipe');
                      const userIndex = profileCards.findIndex(p => p.id === user.id);
                      setCurrentIndex(userIndex);
                    }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-pink-200 to-purple-200">
                      {user.online && (
                        <div className="absolute top-2 right-2 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                      )}
                      {user.verified && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white p-1 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{user.name}, {user.age}</h3>
                      <p className="text-gray-500 text-sm mb-2">{user.city}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{user.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Action Buttons */}
          {viewMode === 'swipe' && (
            <div className="bg-white px-6 py-6 border-t border-gray-200">
              <div className="flex justify-center space-x-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('left', currentProfile.id)}
                  className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <X className="w-8 h-8 text-white" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('right', currentProfile.id)}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Right Panel - Filters & Info */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-6">
          <div className="space-y-6">
            {/* Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
                  <div className="flex items-center space-x-2">
                    <input type="number" placeholder="18" className="w-20 px-3 py-2 border border-gray-300 rounded-lg" />
                    <span className="text-gray-500">to</span>
                    <input type="number" placeholder="50" className="w-20 px-3 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Distance</label>
                  <input type="range" min="1" max="100" className="w-full" />
                  <p className="text-sm text-gray-500">Within 50 km</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Looking For</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Serious Relationship</option>
                    <option>Casual Dating</option>
                    <option>Friendship</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profiles Viewed</span>
                  <span className="font-semibold">{currentIndex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes Given</span>
                  <span className="font-semibold text-green-500">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Matches</span>
                  <span className="font-semibold text-pink-500">3</span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>• Complete your profile to get more matches</p>
                <p>• Add multiple photos to increase your chances</p>
                <p>• Be specific about what you're looking for</p>
                <p>• Respond to messages within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className="h-full flex flex-col">
      {/* Mobile Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Discover</h1>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-pink-500 transition-colors">
              <Star className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-pink-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Profile Cards */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="relative w-full max-w-sm">
          {profileCards.slice(currentIndex, currentIndex + 2).reverse().map((user, index) => {
            const isTop = index === profileCards.slice(currentIndex, currentIndex + 2).length - 1;
            
            return (
              <motion.div
                key={user.id}
                className={`absolute inset-0 bg-white rounded-3xl shadow-lg overflow-hidden ${
                  isTop ? 'z-10' : 'z-0'
                }`}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => isTop && handleDragEnd(e, info, user.id)}
                animate={{
                  scale: isTop ? 1 : 0.95,
                  y: isTop ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Profile Image */}
                <div className="relative h-80 bg-gradient-to-br from-pink-200 to-purple-200">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  
                  {/* Online Status */}
                  {user.online && (
                    <div className="absolute top-4 right-4 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                  )}
                  
                  {/* Verified Badge */}
                  {user.verified && (
                    <div className="absolute top-4 left-4 bg-blue-500 text-white p-1 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  
                  {/* Premium Badge */}
                  {user.premium && (
                    <div className="absolute top-12 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Premium
                    </div>
                  )}
                  
                  {/* Video Intro Button */}
                  {user.videoIntro && (
                    <button className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded-full">
                      <Video className="w-5 h-5 text-gray-700" />
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {user.name}, {user.age}
                    </h3>
                    <span className="text-gray-500 text-sm">{user.city}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{user.bio}</p>
                  
                  {/* Interests */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {user.interests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                  
                  {/* Last Seen */}
                  {!user.online && (
                    <p className="text-gray-400 text-xs">
                      Last seen {user.lastSeen.toLocaleTimeString()}
                    </p>
                  )}
                </div>

                {/* Swipe Direction Indicator */}
                {isTop && direction && (
                  <motion.div
                    className={`absolute top-4 left-4 right-4 p-4 rounded-lg text-white font-bold text-center ${
                      direction === 'right' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    {direction === 'right' ? 'LIKE!' : 'NOPE'}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile Action Buttons */}
      <div className="bg-white px-4 py-6 border-t border-gray-200">
        <div className="flex justify-center space-x-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('left', currentProfile.id)}
            className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSwipe('right', currentProfile.id)}
            className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <Heart className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
} 