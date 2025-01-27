import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostCard from "../components/PostCard"
import FilterCategories from "../components/FilterCategories"
import { Grid } from "@mui/material"

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function HomePage({ data }) {
  const [selectedCategories, setSelectedCategories] = React.useState([])

  const posts = data.allMarkdownRemark.nodes

  // Exclude drafts
  const visiblePosts = posts.filter(
    (post) => post.frontmatter.status !== "draft"
  )

  // Gather all unique categories from visible posts
  // ** Switched from "tags" to "categories" **
  const allCategories = Array.from(
    new Set(visiblePosts.flatMap((post) => post.frontmatter.categories || []))
  )

  // Group 1 & 2 the way you already do
  const group1 = shuffleArray(
    visiblePosts.filter(
      (post) => post.frontmatter.featuredImg && post.timeToRead > 0
    )
  )
  const group2 = shuffleArray(
    visiblePosts.filter(
      (post) => !(post.frontmatter.featuredImg && post.timeToRead > 0)
    )
  )
  const groupedPosts = [...group1, ...group2]

  // Filter by selectedCategories (OR logic)
  let filteredPosts = groupedPosts
  if (selectedCategories.length > 0) {
    filteredPosts = groupedPosts.filter((post) => {
      // ** Switched from "tags" to "categories" **
      const postCats = post.frontmatter.categories || []
      return postCats.some((c) => selectedCategories.includes(c))
    })
  }

  // Handler for toggling categories
  const handleChangeCategories = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    )
  }

  return (
    <Layout>
      <Seo title="Home - YbotMan" />

      <FilterCategories
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        onChangeCategories={handleChangeCategories}
      />

      <Grid container spacing={2}>
        {filteredPosts.map((post) => {
          const { slug, title, date, featuredImg } = post.frontmatter
          const excerpt = post.excerpt
          const timeToRead = post.timeToRead

          return (
            <Grid item xs={12} sm={6} md={4} key={slug}>
              <PostCard
                slug={slug}
                title={title}
                excerpt={excerpt}
                date={date}
                featuredImg={featuredImg}
                timeToRead={timeToRead}
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 150)
        timeToRead
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          featuredImg
          categories
          status
        }
      }
    }
  }
`