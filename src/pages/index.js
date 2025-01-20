import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PostCard from "../components/PostCard";
import { Grid } from "@mui/material";

export default function HomePage({ data }) {
  const posts = data.allMarkdownRemark.nodes;

  // Helper function to sort by `timeToRead` descending
  const sortByTimeToRead = (posts) =>
    posts.sort((a, b) => b.timeToRead - a.timeToRead);

  // Step 1: Separate posts into groups
  const nonAIGenWithImages = posts.filter(
    (post) =>
      !post.frontmatter.tags?.includes("AIGen") &&
      post.frontmatter.featuredImg &&
      post.timeToRead > 0
  );

  const nonAIGenWithoutImages = posts.filter(
    (post) =>
      !post.frontmatter.tags?.includes("AIGen") &&
      !post.frontmatter.featuredImg &&
      post.timeToRead > 0
  );

  const aiGenPosts = posts.filter((post) =>
    post.frontmatter.tags?.includes("AIGen")
  );

  const emptyPosts = posts.filter((post) => post.timeToRead === 0);

  // Step 2: Sort groups
  const sortedNonAIGenWithImages = sortByTimeToRead(nonAIGenWithImages);
  const sortedNonAIGenWithoutImages = sortByTimeToRead(nonAIGenWithoutImages);
  const sortedAIGenPosts = sortByTimeToRead(aiGenPosts);

  // Step 3: Combine groups in desired order
  const groupedPosts = [
    ...sortedNonAIGenWithImages,
    ...sortedNonAIGenWithoutImages,
    ...sortedAIGenPosts,
    ...emptyPosts,
  ];

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
        }
      }
    }
  }
`;
