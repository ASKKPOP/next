'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ADSENSE_CONFIG, adUtils } from '@/config/adsense';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'banner' | 'leaderboard' | 'sidebar' | 'mobile';
  className?: string;
  style?: React.CSSProperties;
  responsive?: boolean;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  className = '',
  style = {},
  responsive = true 
}: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if AdSense is loaded
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, [adSlot]);

  // Don't render ads if disabled
  if (!adUtils.shouldShowAds()) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center ${className}`}
        style={style}
      >
        <div className="text-gray-500 text-sm">
          <div className="font-medium mb-2">📺 AdSense Advertisement</div>
          <div className="text-xs">
            Slot: {adSlot} | Format: {adFormat}
          </div>
          <div className="text-xs mt-1">
            (Development Mode - Real ads will show in production)
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={adRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`ad-container ${className}`}
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CONFIG.CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive}
      />
    </motion.div>
  );
}

// Ad placement components for different locations
export function HeaderAd() {
  return (
    <div className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-2">
        <AdSense 
          adSlot={ADSENSE_CONFIG.AD_SLOTS.HEADER}
          adFormat={ADSENSE_CONFIG.AD_FORMATS.HEADER as any}
          className="w-full"
        />
      </div>
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <AdSense 
        adSlot={ADSENSE_CONFIG.AD_SLOTS.SIDEBAR}
        adFormat={ADSENSE_CONFIG.AD_FORMATS.SIDEBAR as any}
        className="w-full"
      />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <AdSense 
          adSlot={ADSENSE_CONFIG.AD_SLOTS.FOOTER}
          adFormat={ADSENSE_CONFIG.AD_FORMATS.FOOTER as any}
          className="w-full"
        />
      </div>
    </div>
  );
}

export function InContentAd() {
  return (
    <div className="my-6">
      <AdSense 
        adSlot={ADSENSE_CONFIG.AD_SLOTS.IN_CONTENT}
        adFormat={ADSENSE_CONFIG.AD_FORMATS.IN_CONTENT as any}
        className="w-full max-w-md mx-auto"
      />
    </div>
  );
}

export function MobileAd() {
  return (
    <div className="md:hidden">
      <AdSense 
        adSlot={ADSENSE_CONFIG.AD_SLOTS.MOBILE}
        adFormat={ADSENSE_CONFIG.AD_FORMATS.MOBILE as any}
        className="w-full"
      />
    </div>
  );
} 