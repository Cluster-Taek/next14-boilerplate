/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        hostname: 'scontent-ssn1-1.cdninstagram.com',
      },
      {
        hostname: 'front.yoil.co.kr.s3.ap-northeast-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
