/** @type { import('next').NextConfig } */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "t1.static.com",
        port: "",
        pathname: "/**"
      },
    ],
  },
};

module.exports = nextConfig;
