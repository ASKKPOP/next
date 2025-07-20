'use client';

import { useState } from 'react';
import { Globe, Eye, EyeOff, Languages, MessageCircle, Heart, Share } from 'lucide-react';

interface TranslatedPostProps {
  id: number;
  title: string;
  content: string;
  titleTranslation?: string;
  contentTranslation?: string;
  targetLanguage?: string;
  author: {
    id: number;
    name: string;
    avatar?: string;
  };
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  commentCount: number;
  voteCount: number;
  isTranslated: boolean;
  onVote: (postId: number, voteType: 'up' | 'down') => void;
  onComment: (postId: number) => void;
}

export default function TranslatedPost({
  id,
  title,
  content,
  titleTranslation,
  contentTranslation,
  targetLanguage,
  author,
  category,
  createdAt,
  commentCount,
  voteCount,
  isTranslated,
  onVote,
  onComment
}: TranslatedPostProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

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

  const displayTitle = isTranslated && titleTranslation ? titleTranslation : title;
  const displayContent = isTranslated && contentTranslation ? contentTranslation : content;
  const truncatedContent = showFullContent ? displayContent : displayContent.slice(0, 200);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-4">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {author.avatar ? '' : author.name.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{author.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>{createdAt}</span>
              <span>•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {category.name}
              </span>
            </div>
          </div>
        </div>

        {/* Translation Toggle */}
        {isTranslated && (
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            {showOriginal ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Hide Original</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Show Original</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Translation Indicator */}
      {isTranslated && (
        <div className="flex items-center space-x-2 mb-3 p-2 bg-blue-50 rounded-lg">
          <Globe className="w-4 h-4 text-blue-600" />
          <span className="text-sm text-blue-700">
            Translated to {languageNames[targetLanguage || 'en']}
          </span>
        </div>
      )}

      {/* Post Title */}
      <h2 className="text-xl font-bold text-gray-900 mb-3">
        {displayTitle}
      </h2>

      {/* Original Title (if translated) */}
      {isTranslated && showOriginal && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Original Title</span>
          </div>
          <p className="text-gray-800 italic">{title}</p>
        </div>
      )}

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">
          {truncatedContent}
          {displayContent.length > 200 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="ml-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              {showFullContent ? 'Show less' : 'Read more'}
            </button>
          )}
        </p>
      </div>

      {/* Original Content (if translated) */}
      {isTranslated && showOriginal && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Languages className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Original Content</span>
          </div>
          <p className="text-gray-800 italic leading-relaxed">{content}</p>
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Vote Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onVote(id, 'up')}
              className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors duration-200"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">{voteCount}</span>
            </button>
          </div>

          {/* Comment Button */}
          <button
            onClick={() => onComment(id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{commentCount} comments</span>
          </button>

          {/* Share Button */}
          <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors duration-200">
            <Share className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
        </div>

        {/* Translation Quality Indicator */}
        {isTranslated && (
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Globe className="w-3 h-3" />
            <span>AI Translation</span>
          </div>
        )}
      </div>
    </div>
  );
} 