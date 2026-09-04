import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MobileNav, SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PwaRegister } from '@/components/pwa-register';
import { atlasPath } from '@/lib/paths';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yhhe.top/chipatlas/'),
  title: 'FAMA｜Flagship AI Accelerator Memory Architectures',
  description: '面向 AI 芯片研究者的存储架构、参数、技术路线与来源追踪知识库。',
  manifest: atlasPath('/manifest.webmanifest'),
  icons: {
    icon: [
      {
        url: atlasPath('/chipatlas-icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: atlasPath('/chipatlas-icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: atlasPath('/apple-touch-icon.png'),
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FAMA',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    title: 'FAMA · Flagship AI Accelerator Memory Architectures',
    description: '从 Memory 看懂 AI 芯片',
    url: 'https://yhhe.top/chipatlas/',
    siteName: 'FAMA',
    locale: 'zh_CN',
    images: [
      {
        url: atlasPath('/og.png'),
        width: 1200,
        height: 630,
        alt: 'FAMA 分享预览',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAMA · Flagship AI Accelerator Memory Architectures',
    description: '从 Memory 看懂 AI 芯片',
    images: [atlasPath('/og.png')],
  },
};

export const viewport: Viewport = {
  themeColor: '#071318',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <MobileNav />
        <PwaRegister />
      </body>
    </html>
  );
}
