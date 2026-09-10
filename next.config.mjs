/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization — prefer modern formats (AVIF then WebP)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        // Allow images from any HTTPS source (portfolio uploads, Supabase storage, etc.)
        // Narrow this down to specific hostnames once you know your image sources.
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Reasonable device sizes to avoid unnecessarily large images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compress responses
  compress: true,

  // Power-user logging in production
  logging: {
    fetches: { fullUrl: false },
  },
};

export default nextConfig;
