module.exports = {
  plugins: [
    {
      resolve: `@cs125/gatsby-source-filesystem-frontmatter`,
      options: {
        // options from gatsby-source-filesystem are supported
        name: `pages`,
        path: `${__dirname}/src/pages/`,
        frontMatter: true, // read frontmatter from files in this directory
      },
    },
    `gatsby-transformer-asciidoc`,
  ],
}
