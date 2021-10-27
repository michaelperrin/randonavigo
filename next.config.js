module.exports = {
  reactStrictMode: true,
  swcMinify: true,

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
