/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: isProd ? "/8bit_portfolio" : "",
  assetPrefix: isProd ? "/8bit_portfolio/" : "",
  images: {
    unoptimized: true, // <-- Add this
  },
};

export default nextConfig;
