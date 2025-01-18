import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import { Typography } from '@mui/material'

export default function SinglePostPage({ data }) {
  const post = data.markdownRemark
  if (!post) {
    return (
      <Layout>
        <h1>Post Not Found</h1>
      </Layout>
    )
  }

  const { frontmatter, html, excerpt } = post
  const { title, date, featuredImg } = frontmatter

  return (
    <Layout>
      <Seo title={title} description={excerpt} />
      <article>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {date}
        </Typography>
        {featuredImg && (
          <img
            src={featuredImg}
            alt={title}
            style={{ maxWidth: '100%', marginBottom: '1rem' }}
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: html }}
          style={{ marginTop: '1rem' }}
        />
      </article>
    </Layout>
  )
}

// Gatsby automatically infers $slug from the file name {MarkdownRemark.frontmatter__slug}.js
export const query = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      excerpt(pruneLength: 180)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImg
      }
    }
  }
`
