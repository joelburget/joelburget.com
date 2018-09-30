import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Layout from "../components/layout"

export default (props) => {
  const { location, pathContext: { previous, next } } = props;
  const post = props.data.markdownRemark
  const siteTitle = get(props, 'data.site.siteMetadata.title')

  return (
    <Layout location={location}>
      <Helmet
        title={`${post.frontmatter.title} | ${siteTitle}`}
      >
        <link rel="shortcut icon" type="image/png" href="favicon512.png" sizes="512x512" />
        <link rel="shortcut icon" type="image/png" href="favicon600.png" sizes="600x600" />
      </Helmet>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />

      {location.pathname != "/" && location.pathname != "/resume" && (
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
