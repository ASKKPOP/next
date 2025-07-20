'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AdModalProps {
  onComplete: () => void;
}

export default function AdModal({ onComplete }: AdModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds ad
  const [canSkip, setCanSkip] = useState(false);

  const adData = {
    title: "Premium Dating Experience",
    description: "Upgrade to Premium and get unlimited likes, priority matching, and advanced features!",
    image: "/api/placeholder/400/300",
    cta: "Upgrade Now",
    duration: 30
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
        setProgress(((adData.duration - timeLeft + 1) / adData.duration) * 100);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      onComplete();
    }
  }, [isPlaying, timeLeft, onComplete, adData.duration]);

  useEffect(() => {
    // Allow skip after 5 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 5000);

    return () => clearTimeout(skipTimer);
  }, []);

  const handleSkip = () => {
    if (canSkip) {
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl"
        >
          {/* Ad Header */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Advertisement</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">{formatTime(timeLeft)}</span>
                {canSkip && (
                  <button
                    onClick={handleSkip}
                    className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-xs hover:bg-opacity-30 transition-colors"
                  >
                    Skip
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Ad Content */}
          <div className="relative">
            {/* Video/Image Placeholder */}
            <div className="relative h-48 bg-gradient-to-br from-pink-100 to-purple-100">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              
              {/* Play Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="bg-white bg-opacity-80 p-4 rounded-full">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-gray-700" />
                  ) : (
                    <Play className="w-8 h-8 text-gray-700 ml-1" />
                  )}
                </div>
              </button>

              {/* Mute Button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                <motion.div
                  className="h-full bg-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>
            </div>

            {/* Ad Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2">{adData.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{adData.description}</p>
              
              {/* Features */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Unlimited likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Priority matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Advanced filters</span>
                </div>
              </div>

              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                {adData.cta}
              </button>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onComplete}
            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 