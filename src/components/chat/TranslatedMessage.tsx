'use client';

import { useState } from 'react';
import { Globe, Eye, EyeOff, Languages } from 'lucide-react';

interface TranslatedMessageProps {
  originalContent: string;
  translatedContent: string;
  targetLanguage: string;
  isOwnMessage: boolean;
  timestamp: string;
  senderName: string;
}

export default function TranslatedMessage({
  originalContent,
  translatedContent,
  targetLanguage,
  isOwnMessage,
  timestamp,
  senderName
}: TranslatedMessageProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  // Only supported languages as requested
  const languageNames: { [key: string]: string } = {
    'en': 'English',
    'ko': '한국어',
    'ja': '日本語',
    'vi': 'Tiếng Việt',
    'id': 'Bahasa Indonesia',
    'lo': 'ພາສາລາວ',
    'km': 'ភាសាខ្មែរ',
    'tl': 'Filipino',
    'de': 'Deutsch',
    'es': 'Español'
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {/* Message Bubble */}
        <div
          className={`rounded-lg px-4 py-2 ${
            isOwnMessage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {/* Translated Content */}
          <div className="mb-2">
            <p className="text-sm">{translatedContent}</p>
          </div>

          {/* Translation Indicator */}
          <div className="flex items-center justify-between text-xs opacity-75">
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>{languageNames[targetLanguage] || targetLanguage}</span>
            </div>
            
            {/* Toggle Original/Translation */}
            <button
              onClick={() => setShowOriginal(!showOriginal)}
              className="flex items-center space-x-1 hover:opacity-100 transition-opacity duration-200"
            >
              {showOriginal ? (
                <>
                  <EyeOff className="w-3 h-3" />
                  <span>Hide Original</span>
                </>
              ) : (
                <>
                  <Eye className="w-3 h-3" />
                  <span>Show Original</span>
                </>
              )}
            </button>
          </div>

          {/* Original Content (Collapsible) */}
          {showOriginal && (
            <div className="mt-2 pt-2 border-t border-opacity-20 border-current">
              <div className="flex items-center space-x-1 mb-1">
                <Languages className="w-3 h-3" />
                <span className="text-xs font-medium">Original</span>
              </div>
              <p className="text-sm opacity-90 italic">{originalContent}</p>
            </div>
          )}
        </div>

        {/* Message Info */}
        <div className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <span>{senderName}</span>
          <span>•</span>
          <span>{timestamp}</span>
        </div>
      </div>
    </div>
  );
} 