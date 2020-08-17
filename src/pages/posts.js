import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import Link from 'gatsby-link'
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

export default function Posts(props) {
  const siteTitle = props.data.site.siteMetadata.title
  const posts = props.data.allMdx.edges

  return (
    <Layout location={props.location}>
      <Helmet title={siteTitle} />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug}>
            <h3>
              <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                {title}
              </Link>
            </h3>
            <small>{node.frontmatter.date}</small>
            <p>{node.excerpt}</p>
          </div>
        )
      })}
    </Layout>
  );
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { listed: { eq: true } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
