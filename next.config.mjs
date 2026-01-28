/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler 활성화
  reactCompiler: true,

  // Turbopack 설정
  experimental: {
    // 배럴 imports 자동 최적화
    optimizePackageImports: [
      'react-icons',
      'react-icons/fa',
      'react-icons/md',
      'react-icons/io',
      'react-icons/hi',
      'motion',
      'motion/react',
    ],
  },
};

export default nextConfig;
