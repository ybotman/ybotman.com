// ybotman.com/src/pages/index.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import PostCard from "../components/PostCard"
import FilterCategories from "../components/FilterCategories"
import { Grid } from "@mui/material"

export default function HomePage({ data }) {
  const posts = data.allMarkdownRemark.nodes

  // 1) Gather all unique categories
  const allCategories = Array.from(
    new Set(posts.flatMap(post => post.frontmatter.categories || []))
  )

  // 2) React state for selected categories
  const [selectedCategories, setSelectedCategories] = React.useState([])

  // 3) Handler to add/remove a category from selected
  const handleChangeCategories = (cat) => {
    setSelectedCategories(prev => {
      if (prev.includes(cat)) {
        // remove it
        return prev.filter(c => c !== cat)
      } else {
        // add it
        return [...prev, cat]
      }
    })
  }

  // 4) Filter logic: show post if it has ANY selected category
  const filteredPosts = selectedCategories.length === 0
    ? posts
    : posts.filter(post => {
        const cats = post.frontmatter.categories || []
        return cats.some(c => selectedCategories.includes(c))
      })

  return (
    <Layout>
      <Seo title="Home - YbotMan" />

      {/* Our new FilterCategories component, right below the header */}
      <FilterCategories
        allCategories={allCategories}
        selectedCategories={selectedCategories}
        onChangeCategories={handleChangeCategories}
      />

      {/* Render the filtered posts */}
      <Grid container spacing={2}>
        {filteredPosts.map((post) => {
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
        frontmatter {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
          featuredImg
          categories
        }
      }
    }
  }
`
