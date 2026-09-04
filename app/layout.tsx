import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { MobileNav, SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { PwaRegister } from '@/components/pwa-register';
import { famaPath } from '@/lib/paths';
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
  metadataBase: new URL('https://yhhe.top/fama/'),
  title: 'FAMA｜Flagship AI Accelerator Memory Architectures',
  description:
    'A source-grounded knowledge base for the memory systems, specifications, and technology roadmaps of flagship AI accelerators.',
  manifest: famaPath('/manifest.webmanifest'),
  icons: {
    icon: [
      {
        url: famaPath('/favicon.png'),
        sizes: '64x64',
        type: 'image/png',
      },
      {
        url: famaPath('/fama-icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: famaPath('/fama-icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: famaPath('/apple-touch-icon.png'),
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
    description:
      'Memory systems, specifications, and technology roadmaps of flagship AI accelerators.',
    url: 'https://yhhe.top/fama/',
    siteName: 'FAMA',
    locale: 'zh_CN',
    images: [
      {
        url: famaPath('/og.png'),
        width: 1200,
        height: 630,
        alt: 'FAMA 分享预览',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAMA · Flagship AI Accelerator Memory Architectures',
    description:
      'Memory systems, specifications, and technology roadmaps of flagship AI accelerators.',
    images: [famaPath('/og.png')],
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
