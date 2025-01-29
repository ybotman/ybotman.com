// ybotman.com/src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostCard from "../components/PostCard"
import { Grid } from "@mui/material"
import { filterPosts } from "@/utils/search"

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function HomePage({ data }) {
  // State: categories
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState("")

  // All posts
  const posts = data.allMarkdownRemark.nodes
  // Exclude drafts
  const visiblePosts = posts.filter(
    (post) => post.frontmatter.status !== "draft"
  )

  // Gather all categories
  const allCategories = Array.from(
    new Set(
      visiblePosts.flatMap((post) => post.frontmatter.categories || [])
    )
  )

  // Shuffle logic
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

  // Filter by categories
  let filtered = groupedPosts
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((post) => {
      const cats = post.frontmatter.categories || []
      return cats.some((c) => selectedCategories.includes(c))
    })
  }

  // Filter by search text
  // NOTE: You are storing rawMarkdownBody or excerpt inside each node or subfields?
  // If not, add it to your GraphQL or adapt as needed.
  const fullyFilteredPosts = filterPosts(filtered, searchQuery)

  // Handler for toggling categories
  const handleChangeCategories = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    )
  }

  // Handler for text search
  const handleSearchChange = (txt) => {
    setSearchQuery(txt)
  }

  return (
    <Layout
      siteTitle="YbotMan Blog"
      allCategories={allCategories}
      selectedCategories={selectedCategories}
      onChangeCategories={handleChangeCategories}
      searchQuery={searchQuery}
      onSearchChange={handleSearchChange}
    >
      <Seo title="Home - YbotMan" />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {fullyFilteredPosts.map((post) => {
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
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt(pruneLength: 150)
        rawMarkdownBody
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