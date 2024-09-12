/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://bookit-lfg3wcja1-hasnats-projects-49956ffc.vercel.app",
    NEXTAUTH_URL:
      "https://bookit-lfg3wcja1-hasnats-projects-49956ffc.vercel.app",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
