import { useState, useEffect, useCallback } from 'react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
}

interface TranslationResult {
  original: string;
  translated: string;
  targetLanguage: string;
  confidence: number;
}

interface UseTranslationOptions {
  apiUrl?: string;
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

export function useTranslation(options: UseTranslationOptions = {}) {
  const { apiUrl = '/api', userRegion } = options;
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRegionRestricted, setIsRegionRestricted] = useState(false);

  // Check if region is restricted
  useEffect(() => {
    if (userRegion && restrictedRegions.includes(userRegion.toUpperCase())) {
      setIsRegionRestricted(true);
    }
  }, [userRegion]);

  // Get supported languages
  const getSupportedLanguages = useCallback(() => {
    return supportedLanguages;
  }, []);

  // Check if language is supported
  const isLanguageSupported = useCallback((languageCode: string) => {
    return supportedLanguages.some(lang => lang.code === languageCode);
  }, []);

  // Translate text
  const translateText = useCallback(async (
    text: string, 
    targetLanguage: string = currentLanguage
  ): Promise<TranslationResult | null> => {
    if (!text || isRegionRestricted) {
      return null;
    }

    if (!isLanguageSupported(targetLanguage)) {
      setError(`Language ${targetLanguage} is not supported`);
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/translation/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-region': userRegion || '',
        },
        body: JSON.stringify({
          text,
          targetLanguage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.restricted) {
          setIsRegionRestricted(true);
          setError('Translation service is not available in your region');
          return null;
        }
        throw new Error(errorData.error || 'Translation failed');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Translation failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, currentLanguage, isRegionRestricted, isLanguageSupported, userRegion]);

  // Translate multiple texts
  const translateMultiple = useCallback(async (
    texts: string[], 
    targetLanguage: string = currentLanguage
  ): Promise<TranslationResult[]> => {
    if (isRegionRestricted) {
      return texts.map(text => ({
        original: text,
        translated: text,
        targetLanguage,
        confidence: 1.0
      }));
    }

    const results = await Promise.all(
      texts.map(text => translateText(text, targetLanguage))
    );

    return results.filter((result): result is TranslationResult => result !== null);
  }, [translateText, currentLanguage, isRegionRestricted]);

  // Detect language
  const detectLanguage = useCallback(async (text: string): Promise<{ detectedLanguage: string; confidence: number } | null> => {
    if (!text || isRegionRestricted) {
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/translation/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-region': userRegion || '',
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.restricted) {
          setIsRegionRestricted(true);
          return null;
        }
        throw new Error('Language detection failed');
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Language detection failed';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, isRegionRestricted, userRegion]);

  // Change current language
  const changeLanguage = useCallback((languageCode: string) => {
    if (isLanguageSupported(languageCode)) {
      setCurrentLanguage(languageCode);
    }
  }, [isLanguageSupported]);

  // Get current language info
  const getCurrentLanguage = useCallback(() => {
    return supportedLanguages.find(lang => lang.code === currentLanguage) || supportedLanguages[0];
  }, [currentLanguage]);

  return {
    // State
    isLoading,
    error,
    currentLanguage,
    isRegionRestricted,
    
    // Methods
    translateText,
    translateMultiple,
    detectLanguage,
    changeLanguage,
    getCurrentLanguage,
    getSupportedLanguages,
    isLanguageSupported,
    
    // Constants
    supportedLanguages,
    restrictedRegions
  };
} 