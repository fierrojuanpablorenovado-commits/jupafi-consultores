import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    name: 'JARVIS JP',
    short_name: 'JARVIS',
    description: 'Personal Operating System de JP',
    start_url: '/jarvis',
    scope: '/',
    display: 'standalone',
    display_override: ['window-controls-overlay', 'standalone'],
    background_color: '#02070b',
    theme_color: '#02070b',
    orientation: 'any',
    icons: [
      {
        src: '/jarvis-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any maskable',
      },
    ],
  }, {
    headers: {
      'Content-Type': 'application/manifest+json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
