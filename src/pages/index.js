import React from "react"
import { graphql } from "gatsby"
import Layout from "@/components/Layout"
import Seo from "@/components/Seo"
import PostCard from "@/components/PostCard"
import FilterMenu from "@/components/FilterMenu"
import { Grid, Box } from "@mui/material"
import { filterPosts } from "@/utils/search"

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

export default function HomePage({ data }) {
  // State for selected categories & search text
  const [selectedCategories, setSelectedCategories] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState("")

  // All posts, excluding drafts
  const posts = data.allMarkdownRemark.nodes
  const visiblePosts = posts.filter((p) => p.frontmatter.status !== "draft")

  // Build a map of category -> usage count
  const categoryCountMap = visiblePosts.reduce((acc, post) => {
    const cats = post.frontmatter.categories || []
    cats.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1
    })
    return acc
  }, {})

  // Sort categories by descending usage
  const allCategories = Object.keys(categoryCountMap).sort(
    (a, b) => categoryCountMap[b] - categoryCountMap[a]
  )

  // Shuffle logic for your grouping approach
  const group1 = shuffleArray(
    visiblePosts.filter((p) => p.frontmatter.featuredImg && p.timeToRead > 0)
  )
  const group2 = shuffleArray(
    visiblePosts.filter((p) => !(p.frontmatter.featuredImg && p.timeToRead > 0))
  )
  const groupedPosts = [...group1, ...group2]

  // Filter by selected categories
  let filtered = groupedPosts
  if (selectedCategories.length > 0) {
    filtered = filtered.filter((post) => {
      const cats = post.frontmatter.categories || []
      return cats.some((c) => selectedCategories.includes(c))
    })
  }

  // Filter by search text
  const fullyFilteredPosts = filterPosts(filtered, searchQuery)

  // Handlers for toggling categories & updating search
  const handleChangeCategories = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }
  const handleSearchChange = (txt) => setSearchQuery(txt)

  return (
    <Layout>
      <Seo title="Home - YbotMan" />

      {/* Two-column layout: left (FilterMenu), right (post cards) */}
      <Box sx={{ display: "flex" }}>
        <FilterMenu
          allCategories={allCategories}
          categoryCountMap={categoryCountMap}
          selectedCategories={selectedCategories}
          onChangeCategories={handleChangeCategories}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />

        {/* Right Column: grid of posts */}
        <Box sx={{ flex: 1, p: 2 }}>
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
      </Box>
    </Layout>
  )
}

// GraphQL query (unchanged)
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