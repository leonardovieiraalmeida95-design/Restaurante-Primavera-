import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  ...(process.env.VERCEL === "1" ? {} : { basePath: "/Restaurante-Primavera-" }),
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
