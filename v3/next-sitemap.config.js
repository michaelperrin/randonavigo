module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.randonavigo.fr',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', 'disallow': '/*.gpx$/' },
      { userAgent: '*', allow: '/' },
    ],
  },
  changefreq: 'monthly',
}
