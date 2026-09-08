import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'JARVIS JP',
  description: 'Personal Operating System de JP',
  applicationName: 'JARVIS JP',
  manifest: '/jarvis-manifest.webmanifest',
  robots: { index: false, follow: false },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'JARVIS',
  },
  icons: {
    icon: '/jarvis-icon.svg',
    apple: '/jarvis-icon.svg',
  },
};

export default function JarvisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
