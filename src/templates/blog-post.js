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
  let { older, newer } = pageContext;
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
          {newer && (
            <li>
              <Link to={newer.fields.slug} rel="next">
                Newer: {newer.frontmatter.title}
              </Link>
            </li>
          )}

          {older && (
            <li>
              <Link to={older.fields.slug} rel="prev">
                Older: {older.frontmatter.title}
              </Link>
            </li>
          )}
        </ul>
      )}
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
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
