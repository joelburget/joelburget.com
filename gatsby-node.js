const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve('./src/templates/blog-post.js')
  const result = await graphql(
    `
      {
        allMdx(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                listed
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    console.log(result.errors)
    reject(result.errors)
  }

  // Create blog posts pages.
  const posts = result.data.allMdx.edges;

  posts.forEach((post, index) => {
    const next = findListed(posts, index, i => i + 1);
    const prev = findListed(posts, index, i => i - 1);

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        prev,
        next,
      },
    })
  })
}

function findListed(posts, start, next) {
  const len = posts.length;
  let i = start;
  while (i >= 0 && i < len) {
    const post = posts[i];
    if (post.node.frontmatter.listed) {
      return post.node;
    }
    i = next(i);
  }
  return null
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
