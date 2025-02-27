module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // 5 days in seconds
    minimumCacheTTL: 432000,
  },
  async redirects() {
    return [
      {
        source: "/help/gpx",
        destination: "/aide/gpx",
        permanent: true,
      },
      {
        source: "/2016/10/09/foret-armainvilliers",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/gpx/2016-07-chevreuse.gpx",
        destination: "/2016/07/28/vallee-de-chevreuse",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/gpx/2017-03-royaumont.gpx",
        destination: "/2017/03/26/abbaye-de-royaumont-foret",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/gpx/2015-11-perray.gpx",
        destination: "/2015/11/01/bois-domanial-cinq-cents-arpents-rambouillet",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/gpx/2017-04-juziers.gpx",
        destination: "/2017/04/08/randonnee-vexin-autour-de-juziers",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/gpx/2016-04-isles-armendieres-congis.gpx",
        destination: "/2016/04/10/isles-congis-montceaux-marne",
        permanent: true,
      },
    ];
  },
};
