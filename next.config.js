module.exports = {
  reactStrictMode: true,

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
