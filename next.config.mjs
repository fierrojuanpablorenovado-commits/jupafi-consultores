/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://nextlead-saas.vercel.app",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://image.thum.io https:",
      "media-src 'self' blob:",
      "connect-src 'self' https://nextlead-saas.vercel.app",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.thum.io" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // ── Panel privado: máxima protección ──────────────────────────────────
      {
        source: "/control/:path*",
        headers: [
          // Ningún buscador lo indexa ni lo cachea
          { key: "X-Robots-Tag",    value: "noindex, nofollow, noarchive, nosnippet" },
          { key: "Cache-Control",   value: "no-store, no-cache, must-revalidate, private" },
          { key: "Pragma",          value: "no-cache" },
          { key: "Expires",         value: "0" },
          // No puede abrirse dentro de ningún iframe
          { key: "X-Frame-Options", value: "DENY" },
          // Nunca enviar referer al salir del panel
          { key: "Referrer-Policy", value: "no-referrer" },
          // No se puede embeber via objeto/embed
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        ],
      },
      {
        source: "/api/control/:path*",
        headers: [
          { key: "X-Robots-Tag",  value: "noindex, nofollow" },
          { key: "Cache-Control", value: "no-store, private" },
        ],
      },
    ];
  },
};

export default nextConfig;
