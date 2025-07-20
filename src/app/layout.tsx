import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { ADSENSE_CONFIG } from '@/config/adsense';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AsianLove - Dating for Western Men & Asian Women",
  description: "Connect with beautiful Asian women from Thailand, Vietnam, Laos, Myanmar, Cambodia, Philippines, and Indonesia. Free chat with premium features.",
  keywords: "dating, asian women, western men, thailand, vietnam, laos, myanmar, cambodia, philippines, indonesia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CONFIG.CLIENT_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
