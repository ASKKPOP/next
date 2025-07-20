'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Video, Star, Shield, Globe, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { HeaderAd, FooterAd, InContentAd } from '@/components/AdSense';

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentStep, setCurrentStep] = useState<'landing' | 'signup' | 'login'>('landing');
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    age: '',
    gender: 'male',
    country: '',
    lookingFor: 'serious'
  });

  // Check screen size - MUST be before any early returns
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // For demo purposes, show landing page first
  useEffect(() => {
    // Simulate checking authentication
    const timer = setTimeout(() => {
      // You can change this to true to see the app layout
      setIsAuthenticated(false);
      console.log('Initial auth state:', false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleTryDemo = () => {
    console.log('Try Demo button clicked!');
    setIsAuthenticated(true);
    console.log('Setting authenticated to true');
  };

  const handleStartMatching = () => {
    console.log('Start Matching button clicked!');
    setCurrentStep('signup');
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sign up with:', formData);
    // Here you would typically make an API call to register the user
    setIsAuthenticated(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login with:', formData);
    // Here you would typically make an API call to authenticate the user
    setIsAuthenticated(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Free Chat",
      description: "Chat anytime with beautiful Asian women"
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: "Video Introductions",
      description: "Get to know each other through video calls"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy Protected",
      description: "Your personal information is secure"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "AI Matchmaking",
      description: "Smart matching with verified profiles"
    }
  ];

  const countries = {
    men: ['USA', 'Australia', 'Canada', 'England', 'Germany', 'Spain', 'Korea', 'Japan'],
    women: ['Thailand', 'Vietnam', 'Laos', 'Myanmar', 'Cambodia', 'Philippines', 'Indonesia']
  };

  // Show app layout if authenticated
  if (isAuthenticated) {
    return <AppLayout />;
  }

  // Show sign up form
  if (currentStep === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => setCurrentStep('landing')}
              className="absolute top-6 left-6 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-pink-500 animate-heart-beat" />
              <span className="text-2xl font-bold gradient-text">AsianLove</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            <p className="text-gray-600">Join thousands of happy couples</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Age"
                  min="18"
                  max="100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              >
                <option value="">Select your country</option>
                {formData.gender === 'male' 
                  ? countries.men.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))
                  : countries.women.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))
                }
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Looking For</label>
              <select
                value={formData.lookingFor}
                onChange={(e) => handleInputChange('lookingFor', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                required
              >
                <option value="serious">Serious Relationship</option>
                <option value="casual">Casual Dating</option>
                <option value="friendship">Friendship</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
            >
              Create Account
            </motion.button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => setCurrentStep('login')}
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show login form
  if (currentStep === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <button 
              onClick={() => setCurrentStep('landing')}
              className="absolute top-6 left-6 text-gray-600 hover:text-pink-500 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-8 h-8 text-pink-500 animate-heart-beat" />
              <span className="text-2xl font-bold gradient-text">AsianLove</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
            >
              Sign In
            </motion.button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setCurrentStep('signup')}
                className="text-pink-500 hover:text-pink-600 font-medium"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show landing page if not authenticated
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="relative z-10 bg-white border-b border-gray-100">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">AsianLove</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setCurrentStep('login')}
                className="text-gray-600 hover:text-pink-500 transition-colors font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={handleTryDemo}
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors font-medium"
              >
                Try Demo
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Amanda Style */}
      <main className="container mx-auto px-4 py-16">
        {!isMobile ? (
          // Desktop Layout
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Main Headline */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Dating is easier<br />
                  <span className="text-pink-500">with AsianLove</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Now everyone can use AsianLove. Connect with beautiful Asian women and find your perfect match.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStartMatching}
                  className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition-all duration-300 shadow-lg"
                >
                  Start Matching Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-all duration-300"
                >
                  Learn More
                </motion.button>
              </div>

              {/* Download Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Download Mobile App</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-sm">Download App Store</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-sm">Download Play Store</span>
                  </button>
                </div>
                <button className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-pink-500 hover:text-pink-500 transition-colors">
                  <span className="text-sm">Download PC Version</span>
                </button>
              </div>
            </div>

            {/* Right Column - Mobile Mockup */}
            <div className="relative flex justify-center">
              <div className="relative">
                {/* Phone Mockup */}
                <div className="bg-black rounded-[3rem] p-2 shadow-2xl">
                  <div className="bg-white rounded-[2.5rem] overflow-hidden">
                    {/* App Screen */}
                    <div className="h-[600px] bg-gradient-to-b from-pink-50 to-purple-50 relative">
                      {/* Profile Card */}
                      <div className="absolute inset-4 bg-white rounded-3xl shadow-lg overflow-hidden">
                        <div className="h-2/3 bg-gradient-to-br from-pink-200 to-purple-200 relative">
                          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-xl font-bold">Sakura, 25</h3>
                            <p className="text-sm opacity-90">Tokyo, Japan</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-gray-600 text-sm">Loves traveling, cooking, and learning new cultures. Looking for a serious relationship.</p>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <span className="text-white text-xl">✕</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Heart className="w-6 h-6 text-white" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Layout
          <div className="space-y-8">
            {/* Mobile Hero */}
            <div className="text-center space-y-6">
              <h1 className="text-4xl font-bold leading-tight text-gray-900">
                Dating is easier<br />
                <span className="text-pink-500">with AsianLove</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Now everyone can use AsianLove. Connect with beautiful Asian women and find your perfect match.
              </p>
            </div>

            {/* Mobile CTA Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartMatching}
                className="w-full bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-600 transition-all duration-300 shadow-lg"
              >
                Start Matching Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-pink-500 hover:text-pink-500 transition-all duration-300"
              >
                Learn More
              </motion.button>
            </div>

            {/* Mobile Download Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 text-center">Download Mobile App</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <span className="text-sm">Download App Store</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  <span className="text-sm">Download Play Store</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-pink-500 hover:text-pink-500 transition-colors">
                  <span className="text-sm">Download PC Version</span>
                </button>
              </div>
            </div>

            {/* Mobile App Preview */}
            <div className="relative flex justify-center">
              <div className="relative">
                <div className="bg-black rounded-[2rem] p-1 shadow-xl">
                  <div className="bg-white rounded-[1.5rem] overflow-hidden">
                    <div className="h-[400px] bg-gradient-to-b from-pink-50 to-purple-50 relative">
                      <div className="absolute inset-2 bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="h-2/3 bg-gradient-to-br from-pink-200 to-purple-200 relative">
                          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                          <div className="absolute bottom-2 left-2 right-2 text-white">
                            <h3 className="text-lg font-bold">Sakura, 25</h3>
                            <p className="text-xs opacity-90">Tokyo, Japan</p>
                          </div>
                        </div>
                        <div className="p-2">
                          <p className="text-gray-600 text-xs">Loves traveling, cooking, and learning new cultures.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section - Amanda Style */}
        <section className="mt-24 space-y-16">
          {/* Feature 1 */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-16 items-center`}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">No more 3-point cuts!</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Now everyone can use AsianLove. The past of being disqualified with 3 points is BYE. 
                Anyone can make friends just by signing up.
              </p>
              <p className="text-xl font-semibold text-pink-500">Now everyone uses AsianLove!</p>
            </div>
            <div className="bg-gray-100 rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold text-pink-500 mb-2">∞</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Unlimited Profile Views</h3>
              <p className="text-gray-600">Check member profiles unlimited times every 6 hours</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-16 items-center`}>
            <div className={`bg-gray-100 rounded-3xl p-8 text-center ${isMobile ? 'order-1' : 'order-2 lg:order-1'}`}>
              <div className="text-4xl font-bold text-pink-500 mb-2">💕</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ideal Type World Cup</h3>
              <p className="text-gray-600">New ideal type world cup reflecting your interests</p>
            </div>
            <div className={`space-y-6 ${isMobile ? 'order-2' : 'order-1 lg:order-2'}`}>
              <h2 className="text-3xl font-bold text-gray-900">Dating & Lifestyle</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                AsianLove will help you find your ideal type! Discover new connections based on your lifestyle and interests.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-16 items-center`}>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Real-time Local Friends</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Communicate anonymously with the opposite sex in Secret Square. 
                Have more thrilling conversations anonymously.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Become friends with Secret Match with writers you like!
              </p>
            </div>
            <div className="bg-gray-100 rounded-3xl p-8 text-center">
              <div className="text-4xl font-bold text-pink-500 mb-2">🌍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secret Square</h3>
              <p className="text-gray-600">Anonymous communication with local friends</p>
            </div>
          </div>
        </section>

        {/* Background Section */}
        <section className="mt-24 bg-gray-50 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Now everyone can AsianLove</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            When you need a friend to meet lightly after work, when you need a crew to boost your hobbies, 
            AsianLove is reborn as a social connecting app where anyone, anytime can continue more enjoyable meetings.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className={`grid ${isMobile ? 'grid-cols-2' : 'md:grid-cols-4'} gap-8`}>
            <div className={isMobile ? 'col-span-2' : ''}>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6 text-pink-500" />
                <span className="text-xl font-bold">AsianLove</span>
              </div>
              <p className="text-gray-400">
                Connecting hearts across cultures since 2024
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AsianLove. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
