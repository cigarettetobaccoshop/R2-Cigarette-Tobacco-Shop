/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Domain untuk gambar produk eksternal (misal jika nanti pakai Supabase Storage/CDN)
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
};

// PWA opsional — jalankan `npm install next-pwa` lalu uncomment blok di bawah
// untuk mengaktifkan install-to-homescreen + offline caching.
//
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   disable: process.env.NODE_ENV === 'development',
// });
// module.exports = withPWA(nextConfig);

module.exports = nextConfig;
