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
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🌎</text></svg>" />
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
