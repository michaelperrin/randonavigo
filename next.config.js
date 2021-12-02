module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/help/gpx',
        destination: '/aide/gpx',
        permanent: true,
      },
    ]
  },
}
