import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
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
  metadataBase: new URL('https://chipatlas-ai-silicon.bold-jam-7235.chatgpt.site'),
  title: '芯图谱 ChipAtlas｜AI 芯片参数与技术路线',
  description: '面向 AI 芯片研究者的加速器参数、技术路线与公开来源追踪工具。',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/chipatlas-icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/chipatlas-icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: '芯图谱',
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    title: '芯图谱 ChipAtlas',
    description: 'AI 芯片参数与技术路线',
    url: '/',
    siteName: '芯图谱 ChipAtlas',
    locale: 'zh_CN',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: '芯图谱 ChipAtlas 分享预览' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '芯图谱 ChipAtlas',
    description: 'AI 芯片参数与技术路线',
    images: ['/og.png'],
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
        {children}
      </body>
    </html>
  );
}
