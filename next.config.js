/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'granderby.io',
      'assets.coingecko.com',
      'alchemy.com',
      'nft-cdn.alchemy.com',
      'ipfs.io',
      'via.placeholder.com',
      'ipfs-2.thirdwebcdn.com',
    ],
  },
}

module.exports = nextConfig


