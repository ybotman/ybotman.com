import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
// or wherever your layout is

export default function SinglePost({ data }) {
  const { frontmatter, html } = data.markdownRemark
  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      {frontmatter.featuredImg && (
        <img
          src={frontmatter.featuredImg}
          alt={frontmatter.title}
          style={{ maxWidth: '100%' }}
        />
      )}
      <p>{frontmatter.excerpt}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

// The $slug variable is passed in from gatsby-node.js via context
export const query = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 100)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImg
      }
    }
  }
`
