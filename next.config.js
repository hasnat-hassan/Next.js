/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://bookit-lfg3wcja1-hasnats-projects-49956ffc.vercel.app",
    NEXTAUTH_URL:
      "https://bookit-lfg3wcja1-hasnats-projects-49956ffc.vercel.app",

    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit-v2",
    DB_URI:
      "mongodb+srv://hasnatrevnix:aDfqcMrfKVUAkChH@bookit.cv6h0.mongodb.net/?retryWrites=true&w=majority&appName=bookit",

    STRIPE_WEBHOOK_SECRET: "whsec_eYIAINliU7zzyOeBcWQZD8Zi0JQCDj09",

    STRIPE_SECRET_KEY:
      "sk_test_51Pve9hKaWpnVonxXGwnGXxDBJHukceNJ1LVHj1EuL1qxcClFogXtRm3Yf1B8Xx8sFTRWEu3YQKveElIQrLa0M8ay00Q0sX9oHG",

    CLOUDINARY_CLOUD_NAME: "dbttoqcgr",
    CLOUDINARY_API_KEY: "488347633447596",
    CLOUDINARY_API_SECRET: "djxGsnir-qTwTAP4J36t-QMrSWg",

    SMTP_HOST: "sandbox.smtp.mailtrap.io",
    SMTP_PORT: 2525,
    SMTP_USER: "c854425af872c1",
    SMTP_PASSWORD: "dc29558f45f09f",
    SMTP_FROM_EMAIL: "noreply@bookit.com",
    SMTP_FROM_NAME: "BookIT",

    NEXTAUTH_SECRET: "KSDFJKLSDJFLKSDFJSLDKF934KJLDJGDLKGFJDF",
    REVALIDATE_TOKEN: "JK34J50JSDKFLJSDKF034I5DKFJSDK4IJFKSDJFL",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
