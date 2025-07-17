import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // ✅ เพิ่มบรรทัดนี้
  // คุณสามารถเพิ่ม config อื่นได้ตรงนี้ เช่น images, basePath ฯลฯ
};

export default nextConfig;
