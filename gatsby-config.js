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
      options: {},
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/content/blog`,
        ignore: ["**/.ds_store", "**/.gitkeep", "**/.*"],
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@": `${__dirname}/src`,
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },
  ],
};
