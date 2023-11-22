/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URL: 'mongodb+srv://hamza7681:hamzadsc7681@cluster0.ttxcq.mongodb.net/phone-fix?retryWrites=true&w=majority',
    JWT_SECRET: 'dontunderestimatethreethingsinyourlifeimeandmyself',
    NODEMAILER_PASS: 'mbgnkfbkikbutgll',
    NODEMAILER_USER: 'hamzambf@gmail.com',
    NEXTAUTH_SECRET: 'asdasdsafsd',
    NEXTAUTH_URL: 'http://localhost:30001',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
}

module.exports = nextConfig
