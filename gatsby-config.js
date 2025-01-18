module.exports = {
  siteMetadata: {
    title: "YbotMan Blog",
    description: "A modern blog for YbotMan.com",
    siteUrl: "https://www.ybotman.com",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        /* ...options */
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog", // Any name you like
        path: `${__dirname}/src/content/blog`,
        ignore: [
      "**/.ds_store",
      "**/.gitkeep",
          "**/.*", // ignore hidden files
        ],
      },
    },
    "gatsby-transformer-remark", // Enables allMarkdownRemark
  ],
}
