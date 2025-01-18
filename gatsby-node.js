/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */// gatsby-node.js
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 1) Query all Markdown posts
  const result = await graphql(`
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    console.error(result.errors);
    throw result.errors;
  }

  // 2) For each post, create a page at /blog/<slug>
  const posts = result.data.allMarkdownRemark.nodes;
  posts.forEach((post) => {
    const slug = post.frontmatter.slug;
    if (!slug) return; // skip if no slug

    createPage({
      path: `/blog/${slug}`,
      component: require.resolve(`./src/templates/single-post.js`),
      context: { slug },
    });
  });
};
