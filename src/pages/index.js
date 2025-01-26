import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PostCard from "../components/PostCard";
import { Grid } from "@mui/material";

// Utility to shuffle an array
const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

export default function HomePage({ data }) {
  const posts = data.allMarkdownRemark.nodes;

  // Exclude posts with `status: "draft"`
  const visiblePosts = posts.filter(
    (post) => post.frontmatter.status !== "draft"
  );

  // Group 1: Posts with images and `timeToRead > 0`
  const group1 = shuffleArray(
    visiblePosts.filter(
      (post) =>
        post.frontmatter.featuredImg && post.timeToRead > 0
    )
  );

  // Group 2: All other posts
  const group2 = shuffleArray(
    visiblePosts.filter(
      (post) => !(post.frontmatter.featuredImg && post.timeToRead > 0)
    )
  );

  // Combine: Group 1 first, then Group 2
  const groupedPosts = [...group1, ...group2];

  return (
    <Layout>
      <Seo title="Home - YbotMan" />
      <Grid container spacing={2}>
        {groupedPosts.map((post) => {
          const { slug, title, date, featuredImg } = post.frontmatter;
          const excerpt = post.excerpt;
          const timeToRead = post.timeToRead;

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
          );
        })}
      </Grid>
    </Layout>
  );
}

// GraphQL Query
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
          tags
          status
        }
      }
    }
  }
`;