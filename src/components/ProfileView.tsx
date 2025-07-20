'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit, Camera, Settings, Heart, Star, Shield, Crown, X, Save, 
  Upload, Trash2, Eye, EyeOff, MapPin, Calendar, Users, Globe,
  Bell, Lock, UserCheck, HelpCircle, LogOut, CreditCard, Download, MessageCircle, Mail, Phone
} from 'lucide-react';
import { useDatingStore } from '@/lib/store';
import { User, UserPreferences } from '@/types';

interface ProfileFormData {
  name: string;
  age: string;
  city: string;
  country: string;
  bio: string;
  lookingFor: 'serious' | 'casual' | 'friendship';
  interests: string[];
}

interface PreferencesFormData {
  ageRange: [number, number];
  distance: number;
  countries: string[];
  interests: string[];
  lookingFor: 'serious' | 'casual' | 'friendship';
}

export default function ProfileView() {
  const { currentUser, setCurrentUser, userPreferences, updatePreferences, setCurrentView } = useDatingStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);
  const [soundVibration, setSoundVibration] = useState(true);
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    profileViews: true,
    likes: true
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock user data if none exists
  const user = currentUser || {
    id: '1',
    name: 'John Doe',
    age: 28,
    gender: 'male' as const,
    country: 'USA',
    city: 'New York',
    bio: 'Looking for a meaningful connection with someone special.',
    photos: ['/api/placeholder/400/600'],
    interests: ['Travel', 'Music', 'Sports', 'Cooking'],
    lookingFor: 'serious' as const,
    verified: true,
    online: true,
    lastSeen: new Date(),
    premium: false
  };

  // Form data
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    name: user.name,
    age: user.age.toString(),
    city: user.city,
    country: user.country,
    bio: user.bio,
    lookingFor: user.lookingFor,
    interests: [...user.interests]
  });

  const [preferencesForm, setPreferencesForm] = useState<PreferencesFormData>({
    ageRange: userPreferences.ageRange,
    distance: userPreferences.distance,
    countries: [...userPreferences.countries],
    interests: [...userPreferences.interests],
    lookingFor: userPreferences.lookingFor
  });

  const availableInterests = [
    'Travel', 'Music', 'Sports', 'Cooking', 'Art', 'Technology', 'Reading',
    'Photography', 'Dancing', 'Gaming', 'Fitness', 'Yoga', 'Nature', 'Fashion',
    'Business', 'Education', 'Wellness', 'Entertainment', 'Social Causes'
  ];

  const availableCountries = {
    men: ['USA', 'Australia', 'Canada', 'England', 'Germany', 'Spain', 'Korea', 'Japan'],
    women: ['Thailand', 'Vietnam', 'Laos', 'Myanmar', 'Cambodia', 'Philippines', 'Indonesia']
  };

  const stats = [
    { label: 'Profile Views', value: '1,234' },
    { label: 'Likes Received', value: '567' },
    { label: 'Matches', value: '89' },
    { label: 'Days Active', value: '45' }
  ];

  const features = [
    { icon: Heart, title: 'Unlimited Likes', description: 'Like as many profiles as you want', premium: true },
    { icon: Star, title: 'Priority Matching', description: 'Get seen by more people', premium: true },
    { icon: Shield, title: 'Privacy Control', description: 'Control who sees your profile', premium: false },
    { icon: Crown, title: 'Premium Features', description: 'Access to advanced features', premium: true }
  ];

  // Handlers
  const handleProfileSave = () => {
    console.log('Saving profile:', profileForm);
    const updatedUser: User = {
      ...user,
      name: profileForm.name,
      age: parseInt(profileForm.age),
      city: profileForm.city,
      country: profileForm.country,
      bio: profileForm.bio,
      lookingFor: profileForm.lookingFor,
      interests: profileForm.interests
    };
    setCurrentUser(updatedUser);
    setIsEditing(false);
    console.log('Profile saved successfully');
  };

  const handlePreferencesSave = () => {
    console.log('Saving preferences:', preferencesForm);
    updatePreferences(preferencesForm);
    setIsEditingPreferences(false);
    console.log('Preferences saved successfully');
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Photo upload triggered');
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      // In a real app, you would upload to a server
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedUser = {
          ...user,
          photos: [...user.photos, e.target?.result as string]
        };
        setCurrentUser(updatedUser);
        console.log('Photo uploaded successfully');
      };
      reader.readAsDataURL(file);
    }
    setShowPhotoUpload(false);
  };

  const handleInterestToggle = (interest: string) => {
    console.log('Toggling interest:', interest);
    if (profileForm.interests.includes(interest)) {
      setProfileForm(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    } else {
      setProfileForm(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const handlePreferenceInterestToggle = (interest: string) => {
    console.log('Toggling preference interest:', interest);
    if (preferencesForm.interests.includes(interest)) {
      setPreferencesForm(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }));
    } else {
      setPreferencesForm(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }));
    }
  };

  const handleCountryToggle = (country: string) => {
    console.log('Toggling country:', country);
    if (preferencesForm.countries.includes(country)) {
      setPreferencesForm(prev => ({
        ...prev,
        countries: prev.countries.filter(c => c !== country)
      }));
    } else {
      setPreferencesForm(prev => ({
        ...prev,
        countries: [...prev.countries, country]
      }));
    }
  };

  const handleLogout = () => {
    console.log('Logging out user');
    setCurrentUser(null);
    setCurrentView('swipe');
    console.log('User logged out successfully');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Profile</h1>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    console.log('Save profile button clicked');
                    handleProfileSave();
                  }}
                  className="p-2 text-green-500 hover:text-green-600"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    console.log('Cancel edit button clicked');
                    setIsEditing(false);
                  }}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  console.log('Edit profile button clicked');
                  setIsEditing(true);
                }}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="bg-white p-6">
          <div className="flex items-center space-x-4">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full flex items-center justify-center overflow-hidden">
                {user.photos[0] && user.photos[0] !== '/api/placeholder/400/600' ? (
                  <img src={user.photos[0]} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-gray-600">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <button 
                onClick={() => {
                  console.log('Photo upload button clicked');
                  setShowPhotoUpload(true);
                }}
                className="absolute bottom-0 right-0 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => {
                      console.log('Name changed to:', e.target.value);
                      setProfileForm(prev => ({ ...prev, name: e.target.value }));
                    }}
                    className="text-2xl font-bold text-gray-800 bg-transparent border-b border-gray-300 focus:border-pink-500 outline-none"
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={profileForm.age}
                      onChange={(e) => {
                        console.log('Age changed to:', e.target.value);
                        setProfileForm(prev => ({ ...prev, age: e.target.value }));
                      }}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-pink-500 outline-none w-16"
                      min="18"
                      max="100"
                    />
                    <span className="text-gray-600">years old</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={profileForm.city}
                      onChange={(e) => {
                        console.log('City changed to:', e.target.value);
                        setProfileForm(prev => ({ ...prev, city: e.target.value }));
                      }}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-pink-500 outline-none"
                      placeholder="City"
                    />
                    <span className="text-gray-600">,</span>
                    <input
                      type="text"
                      value={profileForm.country}
                      onChange={(e) => {
                        console.log('Country changed to:', e.target.value);
                        setProfileForm(prev => ({ ...prev, country: e.target.value }));
                      }}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-pink-500 outline-none"
                      placeholder="Country"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-2xl font-bold text-gray-800">{user.name}, {user.age}</h2>
                    {user.verified && (
                      <div className="bg-blue-500 text-white p-1 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                    {user.premium && (
                      <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Premium
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{user.city}, {user.country}</p>
                </>
              )}
              
              {isEditing ? (
                <textarea
                  value={profileForm.bio}
                  onChange={(e) => {
                    console.log('Bio changed to:', e.target.value);
                    setProfileForm(prev => ({ ...prev, bio: e.target.value }));
                  }}
                  className="text-sm text-gray-500 bg-transparent border border-gray-300 rounded-lg p-2 focus:border-pink-500 outline-none w-full"
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              ) : (
                <p className="text-sm text-gray-500">{user.bio}</p>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white mt-2 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Profile Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 bg-gray-50 rounded-lg"
              >
                <div className="text-2xl font-bold text-pink-500 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-white mt-2 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Interests</h3>
            {isEditing && (
              <button
                onClick={() => setProfileForm(prev => ({ ...prev, interests: [] }))}
                className="text-sm text-red-500 hover:text-red-600"
              >
                Clear All
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                {availableInterests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => {
                      console.log('Interest toggle clicked:', interest);
                      handleInterestToggle(interest);
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      profileForm.interests.includes(interest)
                        ? 'bg-pink-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Selected: {profileForm.interests.length} interests
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Looking For */}
        <div className="bg-white mt-2 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Looking For</h3>
          {isEditing ? (
            <div className="space-y-2">
              {(['serious', 'casual', 'friendship'] as const).map((type) => (
                <label key={type} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="lookingFor"
                    value={type}
                    checked={profileForm.lookingFor === type}
                    onChange={(e) => {
                      console.log('Looking for changed to:', e.target.value);
                      setProfileForm(prev => ({ ...prev, lookingFor: e.target.value as any }));
                    }}
                    className="text-pink-500 focus:ring-pink-500"
                  />
                  <span className="text-gray-800 capitalize">{type} relationship</span>
                </label>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 capitalize">{user.lookingFor} relationship</p>
          )}
        </div>

        {/* Premium Features */}
        {!user.premium && (
          <div className="bg-white mt-2 p-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Upgrade to Premium</h3>
                <Crown className="w-8 h-8" />
              </div>
              <p className="text-pink-100 mb-4">
                Unlock all features and get more matches
              </p>
              <button 
                onClick={() => {
                  console.log('Premium upgrade button clicked');
                  setShowPremiumModal(true);
                }}
                className="bg-white text-pink-500 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Upgrade Now
              </button>
            </div>
          </div>
        )}

        {/* Features List */}
        <div className="bg-white mt-2 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center space-x-4 p-3 rounded-lg transition-colors ${
                    feature.premium && !user.premium ? 'opacity-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`${feature.premium && !user.premium ? 'text-gray-400' : 'text-pink-500'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                      {feature.premium && !user.premium && (
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white mt-2 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
          
          {/* Quick Settings */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">Quick Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-gray-200 rounded"></div>
                  <span className="text-gray-800">Dark Mode</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={(e) => {
                    console.log('Dark mode toggled:', e.target.checked);
                    setDarkMode(e.target.checked);
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-800">Push Notifications</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={pushNotifications}
                  onChange={(e) => {
                    console.log('Push notifications toggled:', e.target.checked);
                    setPushNotifications(e.target.checked);
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
            </div>
          </div>

          {/* Account Settings */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">Account</h4>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  console.log('Edit Profile clicked');
                  setIsEditing(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Edit className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Edit Profile</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Change Password clicked');
                  setShowPasswordModal(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Change Password</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Email Settings clicked');
                  setShowEmailModal(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Email Settings</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Delete Account clicked');
                  setShowDeleteAccountModal(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-red-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Trash2 className="w-5 h-5 text-red-500" />
                    <span className="text-red-500">Delete Account</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Privacy & Safety */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">Privacy & Safety</h4>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  console.log('Privacy Settings clicked');
                  setShowPrivacy(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Privacy Settings</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Blocked Users clicked');
                  setShowPrivacy(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserCheck className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Blocked Users</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-800">Location Services</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={locationServices}
                  onChange={(e) => {
                    console.log('Location services toggled:', e.target.checked);
                    setLocationServices(e.target.checked);
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
              <button 
                onClick={() => {
                  console.log('Data & Privacy clicked');
                  setShowPrivacy(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Data & Privacy</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Dating Preferences */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">Dating Preferences</h4>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  console.log('Preferences clicked');
                  setIsEditingPreferences(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Heart className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Age Range</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Distance clicked');
                  setIsEditingPreferences(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Distance</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Interests clicked');
                  setIsEditingPreferences(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Interests</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Looking For clicked');
                  setIsEditingPreferences(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Looking For</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-800">New Matches</span>
                <input 
                  type="checkbox" 
                  checked={notifications.newMatches}
                  onChange={(e) => {
                    console.log('New matches notifications toggled:', e.target.checked);
                    setNotifications(prev => ({ ...prev, newMatches: e.target.checked }));
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-800">Messages</span>
                <input 
                  type="checkbox" 
                  checked={notifications.messages}
                  onChange={(e) => {
                    console.log('Messages notifications toggled:', e.target.checked);
                    setNotifications(prev => ({ ...prev, messages: e.target.checked }));
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-800">Profile Views</span>
                <input 
                  type="checkbox" 
                  checked={notifications.profileViews}
                  onChange={(e) => {
                    console.log('Profile views notifications toggled:', e.target.checked);
                    setNotifications(prev => ({ ...prev, profileViews: e.target.checked }));
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-800">Likes</span>
                <input 
                  type="checkbox" 
                  checked={notifications.likes}
                  onChange={(e) => {
                    console.log('Likes notifications toggled:', e.target.checked);
                    setNotifications(prev => ({ ...prev, likes: e.target.checked }));
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
            </div>
          </div>

          {/* App Settings */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">App Settings</h4>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  console.log('Language clicked');
                  setShowLanguageModal(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Language</span>
                  </div>
                  <span className="text-gray-400">English →</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Theme clicked');
                  setShowThemeModal(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <span className="text-gray-800">Theme</span>
                  </div>
                  <span className="text-gray-400">Light →</span>
                </div>
              </button>
              <label className="flex items-center justify-between">
                <span className="text-gray-800">Sound & Vibration</span>
                <input 
                  type="checkbox" 
                  checked={soundVibration}
                  onChange={(e) => {
                    console.log('Sound & vibration toggled:', e.target.checked);
                    setSoundVibration(e.target.checked);
                  }}
                  className="text-pink-500 focus:ring-pink-500" 
                />
              </label>
              <button 
                onClick={() => {
                  console.log('Storage & Data clicked');
                  setShowStorageModal(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Storage & Data</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4 mb-6">
            <h4 className="font-medium text-gray-700">Support</h4>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  console.log('Help Center clicked');
                  setShowHelp(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Help Center</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Contact Support clicked');
                  setShowHelp(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Contact Support</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('Safety Tips clicked');
                  setShowHelp(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">Safety Tips</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
              <button 
                onClick={() => {
                  console.log('About clicked');
                  setShowHelp(true);
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-800">About</span>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Premium Upgrade */}
          {!user.premium && (
            <div className="space-y-4 mb-6">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Upgrade to Premium</h4>
                  <Crown className="w-6 h-6" />
                </div>
                <p className="text-sm text-pink-100 mb-3">
                  Unlock unlimited likes, priority matching, and advanced features
                </p>
                <button 
                  onClick={() => {
                    console.log('Upgrade Now clicked');
                    setShowPremiumModal(true);
                  }}
                  className="w-full bg-white text-pink-500 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          )}

          {/* App Info */}
          <div className="space-y-4 mb-6">
            <div className="text-center text-sm text-gray-500">
              <p className="font-semibold">AsianLove</p>
              <p>Version 1.0.0</p>
              <p>© 2024 AsianLove. All rights reserved.</p>
            </div>
          </div>

          {/* Logout */}
          <div className="space-y-3">
            <button 
              onClick={() => {
                console.log('Log Out clicked');
                setShowLogout(true);
              }}
              className="w-full text-left p-3 rounded-lg hover:bg-red-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5 text-red-500" />
                <span className="text-red-500">Log Out</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Upload Modal */}
      <AnimatePresence>
        {showPhotoUpload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upload Photo</h3>
                <button
                  onClick={() => setShowPhotoUpload(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload a photo</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Choose Photo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal */}
      <AnimatePresence>
        {isEditingPreferences && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Preferences</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePreferencesSave}
                    className="text-green-500 hover:text-green-600"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setIsEditingPreferences(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                {/* Age Range */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Age Range</h4>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      value={preferencesForm.ageRange[0]}
                      onChange={(e) => {
                        console.log('Min age changed to:', e.target.value);
                        setPreferencesForm(prev => ({
                          ...prev,
                          ageRange: [parseInt(e.target.value), prev.ageRange[1]]
                        }));
                      }}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      min="18"
                      max={preferencesForm.ageRange[1]}
                    />
                    <span className="text-gray-600">to</span>
                    <input
                      type="number"
                      value={preferencesForm.ageRange[1]}
                      onChange={(e) => {
                        console.log('Max age changed to:', e.target.value);
                        setPreferencesForm(prev => ({
                          ...prev,
                          ageRange: [prev.ageRange[0], parseInt(e.target.value)]
                        }));
                      }}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                      min={preferencesForm.ageRange[0]}
                      max="100"
                    />
                  </div>
                </div>

                {/* Distance */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Maximum Distance</h4>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={preferencesForm.distance}
                    onChange={(e) => {
                      console.log('Distance changed to:', e.target.value);
                      setPreferencesForm(prev => ({
                        ...prev,
                        distance: parseInt(e.target.value)
                      }));
                    }}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600">{preferencesForm.distance} km</p>
                </div>

                {/* Countries */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Preferred Countries</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableCountries.men.map((country) => (
                      <button
                        key={country}
                        onClick={() => {
                          console.log('Country toggle clicked:', country);
                          handleCountryToggle(country);
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          preferencesForm.countries.includes(country)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => {
                          console.log('Preference interest toggle clicked:', interest);
                          handlePreferenceInterestToggle(interest);
                        }}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          preferencesForm.interests.includes(interest)
                            ? 'bg-pink-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Looking For */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Looking For</h4>
                  <div className="space-y-2">
                    {(['serious', 'casual', 'friendship'] as const).map((type) => (
                      <label key={type} className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="prefLookingFor"
                          value={type}
                          checked={preferencesForm.lookingFor === type}
                          onChange={(e) => {
                            console.log('Preference looking for changed to:', e.target.value);
                            setPreferencesForm(prev => ({ 
                              ...prev, 
                              lookingFor: e.target.value as any 
                            }));
                          }}
                          className="text-pink-500 focus:ring-pink-500"
                        />
                        <span className="text-gray-800 capitalize">{type} relationship</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Upgrade to Premium</h3>
                <button
                  onClick={() => setShowPremiumModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-4 text-white">
                  <h4 className="font-semibold mb-2">Premium Features:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Unlimited likes</li>
                    <li>• See who liked you</li>
                    <li>• Priority matching</li>
                    <li>• Advanced filters</li>
                    <li>• No ads</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors font-semibold">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    $9.99/month
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
                    <CreditCard className="w-4 h-4 inline mr-2" />
                    $49.99/year (Save 58%)
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation */}
      <AnimatePresence>
        {showLogout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Logout</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowLogout(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Account Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {/* Email Settings */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Email & Password</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={'john.doe@example.com'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter new password"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        console.log('Password changed successfully');
                        setShowPasswordModal(false);
                      }}
                      className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">New Matches</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Messages</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Profile Views</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Promotional Emails</span>
                      <input type="checkbox" className="text-pink-500 focus:ring-pink-500" />
                    </label>
                  </div>
                </div>

                {/* Account Actions */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Account Actions</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-red-500">
                      <div className="flex items-center space-x-3">
                        <Trash2 className="w-5 h-5" />
                        <span>Delete Account</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
                      <div className="flex items-center space-x-3">
                        <Download className="w-5 h-5" />
                        <span>Download My Data</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Privacy & Safety Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Privacy & Safety</h3>
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {/* Profile Visibility */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Profile Visibility</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Show my profile to everyone</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Show my age</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Show my location</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Show my online status</span>
                      <input type="checkbox" defaultChecked className="text-pink-500 focus:ring-pink-500" />
                    </label>
                  </div>
                </div>

                {/* Blocked Users */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Blocked Users</h4>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">You haven't blocked anyone yet.</p>
                  </div>
                </div>

                {/* Safety Features */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Safety Features</h4>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Two-factor authentication</span>
                      <input type="checkbox" className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Location sharing</span>
                      <input type="checkbox" className="text-pink-500 focus:ring-pink-500" />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-gray-700">Emergency contacts</span>
                      <input type="checkbox" className="text-pink-500 focus:ring-pink-500" />
                    </label>
                  </div>
                </div>

                {/* Report Issues */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Report Issues</h4>
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
                    Report a Problem
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help & Support Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-6">
                {/* FAQ */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Frequently Asked Questions</h4>
                  <div className="space-y-3">
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="text-gray-700">How do I change my profile?</span>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-3 text-sm text-gray-600">
                        Go to your profile and tap the edit button to modify your information, photos, and preferences.
                      </div>
                    </details>
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="text-gray-700">How do I block someone?</span>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-3 text-sm text-gray-600">
                        Go to their profile, tap the three dots menu, and select "Block User" to prevent them from contacting you.
                      </div>
                    </details>
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <span className="text-gray-700">How do I upgrade to Premium?</span>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-3 text-sm text-gray-600">
                                                 Tap the Premium banner on your profile or go to Settings {'>'} Premium to upgrade your account.
                      </div>
                    </details>
                  </div>
                </div>

                {/* Contact Support */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Contact Support</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Live Chat</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Email Support</span>
                      </div>
                    </button>
                    <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-700">Call Support</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* App Info */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">App Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Version: 1.0.0</p>
                    <p>Build: 2024.1.1</p>
                    <p>© 2024 AsianLove. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Password Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Change Password</h3>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Confirm new password"
                  />
                </div>
                <button 
                  onClick={() => {
                    console.log('Password changed successfully');
                    setShowPasswordModal(false);
                  }}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Change Password
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Email Settings</h3>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Email</label>
                  <input
                    type="email"
                    value={'john.doe@example.com'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter current email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Enter new email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Confirm new email"
                  />
                </div>
                <button 
                  onClick={() => {
                    console.log('Email changed successfully');
                    setShowEmailModal(false);
                  }}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Change Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteAccountModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Delete Account</h3>
                <p className="text-gray-600 mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowDeleteAccountModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log('Account deleted');
                      setCurrentUser(null);
                      setCurrentView('swipe');
                      setShowDeleteAccountModal(false);
                    }}
                    className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Modal */}
      <AnimatePresence>
        {showLanguageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Language Settings</h3>
                <button
                  onClick={() => setShowLanguageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App Language</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="en">English</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    console.log('Language settings saved');
                    setShowLanguageModal(false);
                  }}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save Language Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Theme Modal */}
      <AnimatePresence>
        {showThemeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Theme Settings</h3>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App Theme</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Text Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <button 
                  onClick={() => {
                    console.log('Theme settings saved');
                    setShowThemeModal(false);
                  }}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save Theme Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storage & Data Modal */}
      <AnimatePresence>
        {showStorageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Storage & Data Settings</h3>
                <button
                  onClick={() => setShowStorageModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App Cache</label>
                  <p className="text-sm text-gray-600">Clear app cache to free up storage.</p>
                  <button 
                    onClick={() => {
                      console.log('Cache cleared');
                    }}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors mt-2"
                  >
                    Clear Cache
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">App Data</label>
                  <p className="text-sm text-gray-600">Export or delete all app data.</p>
                  <button 
                    onClick={() => {
                      console.log('Data deleted');
                    }}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors mt-2"
                  >
                    Delete Data
                  </button>
                </div>
                <button 
                  onClick={() => {
                    console.log('Storage settings saved');
                    setShowStorageModal(false);
                  }}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
                >
                  Save Storage Settings
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhotoUpload}
        className="hidden"
      />
    </div>
  );
} 