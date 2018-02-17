module.exports = {
  siteMetadata: {
    title: "kingdaro's website",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-typescript",
    "gatsby-plugin-styled-components",

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content/posts`,
        name: "markdown-pages",
      },
    },
    "gatsby-transformer-remark",

    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-113624798-2",
        head: false,
        anonymize: true,
      },
    },
  ],
}
