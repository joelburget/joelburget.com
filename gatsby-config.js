module.exports = {
  siteMetadata: {
    title: "Joel Burget's Blog",
    author: 'Joel Burget',
    description: '...',
    siteUrl: 'https://joelburget.com',
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
        defaultLayouts: {
          default: require.resolve("./src/components/layout.js"),
        },
      }
    },

    `@pauliescanlon/gatsby-mdx-embed`,

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed-mdx`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
