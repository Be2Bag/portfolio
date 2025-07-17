import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ เพิ่มบรรทัดนี้
  trailingSlash: true,
  images: {
    unoptimized: true, // ✅ จำเป็นสำหรับ static export
  },
  // คุณสามารถเพิ่ม config อื่นได้ตรงนี้ เช่น basePath ฯลฯ
};

export default nextConfig;