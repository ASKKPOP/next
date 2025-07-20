'use client';

import { useState, useEffect } from 'react';
import { Globe, Languages, Check, X, AlertTriangle } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface TranslationToggleProps {
  onLanguageChange: (language: string) => void;
  currentLanguage: string;
  isTranslating: boolean;
  onToggleTranslation: (enabled: boolean) => void;
  userRegion?: string;
}

// Only supported languages as requested
const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'lo', name: 'Lao', nativeName: 'ພາສາລາວ' },
  { code: 'km', name: 'Khmer', nativeName: 'ភាសាខ្មែរ' },
  { code: 'tl', name: 'Filipino', nativeName: 'Filipino' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' }
];

// Restricted regions (Taiwan and China)
const restrictedRegions = ['TW', 'CN', 'HK', 'MO'];

export default function TranslationToggle({
  onLanguageChange,
  currentLanguage,
  isTranslating,
  onToggleTranslation,
  userRegion
}: TranslationToggleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>(supportedLanguages);
  const [isRegionRestricted, setIsRegionRestricted] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  useEffect(() => {
    // Check if user region is restricted
    if (userRegion && restrictedRegions.includes(userRegion.toUpperCase())) {
      setIsRegionRestricted(true);
    }
  }, [userRegion]);

  const handleLanguageSelect = (languageCode: string) => {
    onLanguageChange(languageCode);
    setIsOpen(false);
  };

  const toggleTranslation = () => {
    if (isRegionRestricted) {
      return; // Don't allow translation in restricted regions
    }
    onToggleTranslation(!isTranslating);
  };

  // If region is restricted, show warning instead of translation toggle
  if (isRegionRestricted) {
    return (
      <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <AlertTriangle className="w-4 h-4 text-yellow-600" />
        <span className="text-sm text-yellow-700">
          Translation service is not available in your region
        </span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Translation Toggle Button */}
      <div className="flex items-center space-x-2">
        <button
          onClick={toggleTranslation}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isTranslating
              ? 'bg-blue-100 text-blue-700 border border-blue-200'
              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>AI Translate</span>
          {isTranslating && <Check className="w-4 h-4" />}
        </button>

        {/* Language Selector */}
        {isTranslating && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <Languages className="w-4 h-4 text-gray-600" />
              <span>{currentLang.nativeName}</span>
            </button>

            {/* Language Dropdown */}
            {isOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 max-h-60 overflow-y-auto">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                      language.code === currentLanguage ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{language.nativeName}</span>
                      <span className="text-xs text-gray-500">{language.name}</span>
                    </div>
                    {language.code === currentLanguage && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Translation Status */}
      {isTranslating && (
        <div className="mt-2 flex items-center space-x-2 text-xs text-gray-500">
          <Globe className="w-3 h-3" />
          <span>Translating to {currentLang.nativeName}</span>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
} 