module.exports = {
  siteMetadata: {
    title: `Gatsby`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-andy`,
      options: {
        hideDoubleBrackets: true,
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
