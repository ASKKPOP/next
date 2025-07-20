// Google AdSense Configuration
export const ADSENSE_CONFIG = {
  // Replace with your actual AdSense client ID
  CLIENT_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  
  // Ad slot IDs - Replace with your actual ad slot IDs
  AD_SLOTS: {
    HEADER: '1234567890',
    SIDEBAR: '0987654321',
    FOOTER: '1122334455',
    IN_CONTENT: '5566778899',
    MOBILE: '9988776655',
    COMMUNITY_SIDEBAR: '1111222233',
    SOCIAL_SIDEBAR: '4444555566',
  },
  
  // Ad formats
  AD_FORMATS: {
    HEADER: 'banner',
    SIDEBAR: 'rectangle',
    FOOTER: 'leaderboard',
    IN_CONTENT: 'rectangle',
    MOBILE: 'mobile',
  },
  
  // Ad display settings
  SETTINGS: {
    // Show ads in development mode (for testing)
    SHOW_IN_DEV: false,
    
    // Responsive ads
    RESPONSIVE: true,
    
    // Ad refresh interval (in seconds) - 0 to disable
    REFRESH_INTERVAL: 0,
    
    // Maximum ads per page
    MAX_ADS_PER_PAGE: 5,
    
    // Ad placement rules
    PLACEMENT_RULES: {
      MIN_DISTANCE_BETWEEN_ADS: 300, // pixels
      MIN_CONTENT_HEIGHT: 500, // pixels before showing ads
    },
  },
  
  // Ad targeting settings
  TARGETING: {
    // Enable demographic targeting
    DEMOGRAPHIC: true,
    
    // Enable interest-based targeting
    INTEREST_BASED: true,
    
    // Enable contextual targeting
    CONTEXTUAL: true,
    
    // Custom targeting parameters
    CUSTOM: {
      'dating_app': 'true',
      'asian_dating': 'true',
      'relationship': 'true',
    },
  },
};

// Ad placement strategies
export const AD_PLACEMENT_STRATEGIES = {
  // Header ad - shown on all pages
  HEADER: {
    enabled: true,
    slot: ADSENSE_CONFIG.AD_SLOTS.HEADER,
    format: ADSENSE_CONFIG.AD_FORMATS.HEADER,
    responsive: true,
  },
  
  // Sidebar ad - shown in community and social views
  SIDEBAR: {
    enabled: true,
    slot: ADSENSE_CONFIG.AD_SLOTS.SIDEBAR,
    format: ADSENSE_CONFIG.AD_FORMATS.SIDEBAR,
    responsive: true,
  },
  
  // Footer ad - shown on landing page
  FOOTER: {
    enabled: true,
    slot: ADSENSE_CONFIG.AD_SLOTS.FOOTER,
    format: ADSENSE_CONFIG.AD_FORMATS.FOOTER,
    responsive: true,
  },
  
  // In-content ad - shown between content sections
  IN_CONTENT: {
    enabled: true,
    slot: ADSENSE_CONFIG.AD_SLOTS.IN_CONTENT,
    format: ADSENSE_CONFIG.AD_FORMATS.IN_CONTENT,
    responsive: true,
  },
  
  // Mobile ad - shown only on mobile devices
  MOBILE: {
    enabled: true,
    slot: ADSENSE_CONFIG.AD_SLOTS.MOBILE,
    format: ADSENSE_CONFIG.AD_FORMATS.MOBILE,
    responsive: true,
  },
};

// Ad loading utilities
export const adUtils = {
  // Check if ads should be shown
  shouldShowAds: (): boolean => {
    if (process.env.NODE_ENV === 'development' && !ADSENSE_CONFIG.SETTINGS.SHOW_IN_DEV) {
      return false;
    }
    return true;
  },
  
  // Get ad slot configuration
  getAdSlot: (placement: keyof typeof AD_PLACEMENT_STRATEGIES) => {
    return AD_PLACEMENT_STRATEGIES[placement];
  },
  
  // Check if user is on mobile
  isMobile: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  },
  
  // Get appropriate ad format for device
  getAdFormat: (placement: keyof typeof AD_PLACEMENT_STRATEGIES): string => {
    const strategy = AD_PLACEMENT_STRATEGIES[placement];
    if (placement === 'MOBILE' || adUtils.isMobile()) {
      return 'mobile';
    }
    return strategy.format;
  },
}; 