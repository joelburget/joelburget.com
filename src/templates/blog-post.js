import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

const noLinkPages = [
  "/",
  "/resume/",
  "/now/",
  "/canon/",
  ];

export default ({ data, pageContext, location }) => {
  let { previous, next } = pageContext;
  const post = data.mdx
  const siteTitle = data.site.siteMetadata.title
  const showLinks = !noLinkPages.includes(location.pathname);

  return (
    <Layout location={location}>
      <Helmet
        title={`${post.frontmatter.title} | ${siteTitle}`}
      >
        <link rel="shortcut icon" type="image/png" href="favicon512.png" sizes="512x512" />
        <link rel="shortcut icon" type="image/png" href="favicon600.png" sizes="600x600" />
      </Helmet>
      <MDXRenderer>{post.body}</MDXRenderer>

      {showLinks && (
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
