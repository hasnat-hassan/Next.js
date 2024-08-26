/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit",
    DB_URI: "",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "JGFHJDFDJDKWNXZXM1324NIOO5WHEDNXS6JWURY93QTELSX",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
