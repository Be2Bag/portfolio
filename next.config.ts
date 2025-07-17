import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true, // จำเป็นสำหรับ static export
    domains: ['pic.in.th'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pic.in.th',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
};

export default nextConfig;