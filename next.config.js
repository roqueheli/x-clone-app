/** @type { import('next').NextConfig } */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/messages",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
