'use client';

import { motion } from 'framer-motion';
import { Heart, MessageCircle, Video, Star } from 'lucide-react';
import { useDatingStore } from '@/lib/store';

export default function MatchesView() {
  const { matches, setCurrentView, setActiveChatId } = useDatingStore();

  const handleStartChat = (matchId: string) => {
    setActiveChatId(matchId);
    setCurrentView('chat');
  };

  if (matches.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-white px-4 py-3 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Matches</h1>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No matches yet</h3>
            <p className="text-gray-500 mb-4">Start swiping to find your perfect match!</p>
            <button
              onClick={() => setCurrentView('swipe')}
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              Start Swiping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Matches</h1>
          <span className="text-sm text-gray-500">{matches.length} matches</span>
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                {/* Profile Image */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-600">
                      {match.users[1].charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>

                {/* Match Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">Match #{match.id.slice(-4)}</h3>
                    <span className="text-xs text-gray-500">
                      {new Date(match.matchedAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    You matched {new Date(match.matchedAt).toLocaleDateString()}
                  </p>
                  
                  {match.lastMessage && (
                    <p className="text-xs text-gray-500 truncate">
                      "{match.lastMessage.content}"
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleStartChat(match.id)}
                    className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  
                  <button className="bg-gray-100 text-gray-600 p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <Video className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Unread Indicator */}
              {match.unreadCount > 0 && (
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-pink-500 font-medium">
                    {match.unreadCount} new message{match.unreadCount > 1 ? 's' : ''}
                  </span>
                  <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                    {match.unreadCount}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 