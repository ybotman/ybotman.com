import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostCard from "../components/PostCard"
import { Grid } from "@mui/material"

export default function HomePage({ data }) {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo title="Home - YbotMan" />
      <Grid container spacing={2}>
        {posts.map(post => {
          const { slug, title, date, featuredImg } = post.frontmatter
          const excerpt = post.excerpt
          return (
            <Grid item xs={12} sm={6} md={4} key={slug}>
              <PostCard
                slug={slug}
                title={title}
                excerpt={excerpt}
                date={date}
                featuredImg={featuredImg}
              />
            </Grid>
          )
        })}
      </Grid>
    </Layout>
  )
}

export const pageQuery = graphql`
  query HomePageQuery {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
    nodes {
      excerpt(pruneLength: 150)
      frontmatter {
        slug
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImg
        tags
        }
      }
    }
  }
`
