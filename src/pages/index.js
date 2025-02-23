// src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import PostCard from "@/components/PostCard"
import FilterDrawer from "@/components/FilterDrawer"
import { Grid, Box } from "@mui/material"
import { filterPosts } from "@/utils/search"

// Helper to shuffle an array
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function HomePage({ data }) {
  // --- State for filters ---
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState("")

  // --- Posts ---
  const posts = data.allMarkdownRemark.nodes
  // Exclude drafts
  const visiblePosts = posts.filter((p) => p.frontmatter.status !== "draft")

  // --- Build category usage map ---
  const categoryCountMap = visiblePosts.reduce((acc, post) => {
    const cats = post.frontmatter.categories || []
    cats.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1
    })
    return acc
  }, {})

  // --- Sort categories by usage descending ---
  const allCategories = Object.keys(categoryCountMap).sort(
    (a, b) => categoryCountMap[b] - categoryCountMap[a]
  )

  // --- Shuffle your featured vs non-featured ---
  const group1 = shuffleArray(
    visiblePosts.filter((p) => p.frontmatter.featuredImg && p.timeToRead > 0)
  )
  const group2 = shuffleArray(
    visiblePosts.filter((p) => !(p.frontmatter.featuredImg && p.timeToRead > 0))
  )
  const groupedPosts = [...group1, ...group2]

  // --- Filter by categories ---
  let filteredPosts = groupedPosts
  if (selectedCategories.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      post.frontmatter.categories?.some((c) => selectedCategories.includes(c))
    )
  }

  // --- Filter by search text ---
  const fullyFilteredPosts = filterPosts(filteredPosts, searchQuery)

  // --- Handlers ---
  const handleChangeCategories = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }
  const handleSearchChange = (txt) => {
    setSearchQuery(txt)
  }

  return (
    <Layout>
      <Seo title="Home - YbotMan" />

      {/* Drawer-based filter UI */}
      <FilterDrawer
        allCategories={allCategories}
        categoryCountMap={categoryCountMap}
        selectedCategories={selectedCategories}
        onChangeCategories={handleChangeCategories}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      {/* Post list (full-width, since there's no permanent sidebar) */}
      <Box sx={{ px: 2 }}>
        <Grid container spacing={2}>
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
      </Box>
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