'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Bell, 
  Shield, 
  Heart, 
  Globe, 
  Moon, 
  Sun, 
  LogOut, 
  HelpCircle, 
  Info,
  User,
  Lock,
  Eye,
  Smartphone
} from 'lucide-react';
import { useDatingStore } from '@/lib/store';

export default function SettingsView() {
  const { userPreferences, updatePreferences } = useDatingStore();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Edit Profile', action: () => console.log('Edit Profile') },
        { label: 'Change Password', action: () => console.log('Change Password') },
        { label: 'Email Settings', action: () => console.log('Email Settings') },
        { label: 'Delete Account', action: () => console.log('Delete Account'), danger: true }
      ]
    },
    {
      title: 'Privacy & Safety',
      icon: Shield,
      items: [
        { label: 'Privacy Settings', action: () => console.log('Privacy Settings') },
        { label: 'Blocked Users', action: () => console.log('Blocked Users') },
        { label: 'Location Services', action: () => console.log('Location Services') },
        { label: 'Data & Privacy', action: () => console.log('Data & Privacy') }
      ]
    },
    {
      title: 'Dating Preferences',
      icon: Heart,
      items: [
        { label: 'Age Range', action: () => console.log('Age Range') },
        { label: 'Distance', action: () => console.log('Distance') },
        { label: 'Interests', action: () => console.log('Interests') },
        { label: 'Looking For', action: () => console.log('Looking For') }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'New Matches', action: () => console.log('New Matches') },
        { label: 'Messages', action: () => console.log('Messages') },
        { label: 'Profile Views', action: () => console.log('Profile Views') },
        { label: 'Likes', action: () => console.log('Likes') }
      ]
    },
    {
      title: 'App Settings',
      icon: Settings,
      items: [
        { label: 'Language', action: () => console.log('Language') },
        { label: 'Theme', action: () => console.log('Theme') },
        { label: 'Sound & Vibration', action: () => console.log('Sound & Vibration') },
        { label: 'Storage & Data', action: () => console.log('Storage & Data') }
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      items: [
        { label: 'Help Center', action: () => console.log('Help Center') },
        { label: 'Contact Support', action: () => console.log('Contact Support') },
        { label: 'Safety Tips', action: () => console.log('Safety Tips') },
        { label: 'About', action: () => console.log('About') }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Settings */}
        <div className="bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Settings</h3>
          
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-500" /> : <Sun className="w-5 h-5 text-gray-500" />}
              <span className="text-gray-800">Dark Mode</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="text-gray-800">Push Notifications</span>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-pink-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-2 mt-2">
          {settingsSections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
                className="bg-white"
              >
                <div className="px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-pink-500" />
                    <h3 className="font-semibold text-gray-800">{section.title}</h3>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, itemIndex) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                      onClick={item.action}
                      className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                        item.danger ? 'text-red-600' : 'text-gray-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{item.label}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium Upgrade */}
        <div className="bg-white mt-2 p-6">
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Upgrade to Premium</h3>
              <div className="bg-white bg-opacity-20 p-2 rounded-full">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <p className="text-pink-100 mb-4">
              Unlock unlimited likes, priority matching, and advanced features
            </p>
            <button className="bg-white text-pink-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white mt-2 p-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Heart className="w-6 h-6 text-pink-500" />
              <span className="text-xl font-bold gradient-text">AsianLove</span>
            </div>
            <p className="text-sm text-gray-500">Version 1.0.0</p>
            <p className="text-xs text-gray-400">© 2024 AsianLove. All rights reserved.</p>
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white mt-2 p-6">
          <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
} 