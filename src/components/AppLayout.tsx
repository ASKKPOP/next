'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, User, Settings, Home, Users, Share2, Menu, X } from 'lucide-react';
import { useDatingStore } from '@/lib/store';
import SwipeView from './SwipeView';
import MatchesView from './MatchesView';
import ChatView from './ChatView';
import ProfileView from './ProfileView';
import SettingsView from './SettingsView';
import CommunityView from './CommunityView';
import SocialMediaView from './SocialMediaView';
import AdModal from './AdModal';
import { SidebarAd, MobileAd } from './AdSense';

const navItems = [
  { id: 'swipe', icon: Home, label: 'Discover' },
  { id: 'matches', icon: Heart, label: 'Matches' },
  { id: 'chat', icon: MessageCircle, label: 'Chat' },
  { id: 'community', icon: Users, label: 'Community' },
  { id: 'social', icon: Share2, label: 'Social' },
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'settings', icon: Settings, label: 'Settings' },
] as const;

export default function AppLayout() {
  console.log('AppLayout component rendering');
  const { currentView, setCurrentView, adWatchCount, incrementAdWatch } = useDatingStore();
  const [showAd, setShowAd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Check if user needs to watch ads (3 times per day for men)
  useEffect(() => {
    const checkAdRequirement = () => {
      const today = new Date().toDateString();
      const lastWatch = useDatingStore.getState().lastAdWatch;
      
      if (lastWatch) {
        const lastWatchDate = new Date(lastWatch).toDateString();
        if (lastWatchDate === today) {
          if (adWatchCount < 3) {
            setShowAd(true);
          }
        } else {
          // New day, reset count
          useDatingStore.setState({ adWatchCount: 0, lastAdWatch: null });
          setShowAd(true);
        }
      } else {
        // No previous watch, show ad
        setShowAd(true);
      }
    };

    checkAdRequirement();
  }, [adWatchCount]);

  const handleAdComplete = () => {
    incrementAdWatch();
    setShowAd(false);
  };

  const renderView = () => {
    switch (currentView) {
      case 'swipe':
        return <SwipeView />;
      case 'matches':
        return <MatchesView />;
      case 'chat':
        return <ChatView />;
      case 'community':
        return <CommunityView />;
      case 'social':
        return <SocialMediaView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <SwipeView />;
    }
  };

  // Desktop Layout
  if (!isMobile) {
    return (
      <div className="h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex">
        {/* Desktop Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">AsianLove</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? 'bg-pink-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="w-2 h-2 bg-white rounded-full ml-auto"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* Desktop Sidebar Ad */}
          <div className="p-4 border-t border-gray-200">
            <SidebarAd />
          </div>
        </div>

        {/* Desktop Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Desktop Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 capitalize">
                {currentView === 'swipe' ? 'Discover' : 
                 currentView === 'matches' ? 'Matches' :
                 currentView === 'chat' ? 'Messages' :
                 currentView === 'community' ? 'Community' :
                 currentView === 'social' ? 'Social' :
                 currentView === 'profile' ? 'Profile' :
                 currentView === 'settings' ? 'Settings' : 'AsianLove'}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 font-semibold text-sm">
                    {adWatchCount}/3
                  </span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-700 font-semibold">
                    {useDatingStore.getState().currentUser?.name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Desktop Content Area */}
          <main className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>

        {/* Ad Modal */}
        <AnimatePresence>
          {showAd && (
            <AdModal onComplete={handleAdComplete} />
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Mobile Layout
  return (
    <div className="h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex flex-col">
      {/* Mobile Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-pink-500" />
              <span className="text-lg font-bold text-gray-900">AsianLove</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 font-semibold text-xs">
                {adWatchCount}/3
              </span>
            </div>
            <div className="w-8 h-8 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center">
              <span className="text-gray-700 font-semibold text-sm">
                {useDatingStore.getState().currentUser?.name?.charAt(0) || 'U'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileMenu(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-8 h-8 text-pink-500" />
                    <span className="text-2xl font-bold text-gray-900">AsianLove</span>
                  </div>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <nav className="p-4">
                <div className="space-y-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentView(item.id);
                          setShowMobileMenu(false);
                        }}
                        className={`w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 ${
                          isActive 
                            ? 'bg-pink-500 text-white' 
                            : 'text-gray-600 hover:bg-pink-50 hover:text-pink-500'
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </nav>

              <div className="p-4 border-t border-gray-200">
                <MobileAd />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center">
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentView(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-pink-500 bg-pink-50' 
                    : 'text-gray-500 hover:text-pink-400'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 w-1 h-1 bg-pink-500 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>

      {/* Ad Modal */}
      <AnimatePresence>
        {showAd && (
          <AdModal onComplete={handleAdComplete} />
        )}
      </AnimatePresence>
    </div>
  );
} 