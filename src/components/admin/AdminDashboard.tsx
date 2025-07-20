'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, MessageCircle, Heart, Shield, Settings, 
  BarChart3, UserCheck, UserX, Flag, Crown, 
  TrendingUp, Activity, Eye, Star, AlertTriangle
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  totalMatches: number;
  totalMessages: number;
  premiumUsers: number;
  reportedUsers: number;
  dailyActiveUsers: number;
  monthlyRevenue: number;
}

interface RecentActivity {
  id: string;
  type: 'user_registration' | 'match_created' | 'message_sent' | 'user_reported' | 'premium_upgrade';
  description: string;
  timestamp: Date;
  userId?: string;
  userName?: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalMatches: 0,
    totalMessages: 0,
    premiumUsers: 0,
    reportedUsers: 0,
    dailyActiveUsers: 0,
    monthlyRevenue: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading admin data
    setTimeout(() => {
      setStats({
        totalUsers: 15420,
        activeUsers: 8920,
        totalMatches: 45670,
        totalMessages: 234500,
        premiumUsers: 3420,
        reportedUsers: 156,
        dailyActiveUsers: 2340,
        monthlyRevenue: 45600,
      });

      setRecentActivity([
        {
          id: '1',
          type: 'user_registration',
          description: 'New user registered',
          timestamp: new Date(),
          userId: 'user123',
          userName: 'John Doe',
        },
        {
          id: '2',
          type: 'match_created',
          description: 'New match created',
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          userId: 'user456',
          userName: 'Jane Smith',
        },
        {
          id: '3',
          type: 'premium_upgrade',
          description: 'User upgraded to premium',
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          userId: 'user789',
          userName: 'Mike Johnson',
        },
        {
          id: '4',
          type: 'user_reported',
          description: 'User reported for inappropriate behavior',
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          userId: 'user101',
          userName: 'Sarah Wilson',
        },
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'matches', label: 'Matches', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'premium', label: 'Premium', icon: Crown },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Matches</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalMatches.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-pink-100 rounded-lg">
              <Heart className="w-6 h-6 text-pink-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Premium Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.premiumUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Crown className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Revenue and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">${stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-600">+12% from last month</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Active Users</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">{stats.dailyActiveUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-600">+8% from yesterday</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-sm border"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                {activity.type === 'user_registration' && <UserCheck className="w-4 h-4 text-blue-600" />}
                {activity.type === 'match_created' && <Heart className="w-4 h-4 text-pink-600" />}
                {activity.type === 'message_sent' && <MessageCircle className="w-4 h-4 text-green-600" />}
                {activity.type === 'user_reported' && <Flag className="w-4 h-4 text-red-600" />}
                {activity.type === 'premium_upgrade' && <Crown className="w-4 h-4 text-yellow-600" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <p className="text-xs text-gray-600">
                  {activity.userName} • {activity.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-500" />
            <span className="text-gray-700">Total Users</span>
          </div>
          <span className="font-semibold">{stats.totalUsers.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-5 h-5 text-green-500" />
            <span className="text-gray-700">Active Users</span>
          </div>
          <span className="font-semibold text-green-600">{stats.activeUsers.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <UserX className="w-5 h-5 text-red-500" />
            <span className="text-gray-700">Reported Users</span>
          </div>
          <span className="font-semibold text-red-600">{stats.reportedUsers}</span>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUsers();
      case 'matches':
        return <div className="bg-white rounded-xl p-6 shadow-sm border">Matches Management</div>;
      case 'messages':
        return <div className="bg-white rounded-xl p-6 shadow-sm border">Messages Management</div>;
      case 'reports':
        return <div className="bg-white rounded-xl p-6 shadow-sm border">Reports Management</div>;
      case 'premium':
        return <div className="bg-white rounded-xl p-6 shadow-sm border">Premium Management</div>;
      case 'analytics':
        return <div className="bg-white rounded-xl p-6 shadow-sm border">Analytics Dashboard</div>;
      case 'settings':
        return <div className="bg-white rounded-xl p-6 shadow-sm border">Admin Settings</div>;
      default:
        return renderOverview();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-pink-500" />
              <h1 className="text-xl font-semibold text-gray-900">Jupiter Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin Panel</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-pink-100 text-pink-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
} 