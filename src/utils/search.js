export function filterPosts(posts, query) {
  if (!query) return posts
  return posts.filter(post => {
    const { title } = post.frontmatter
    const content = post.rawMarkdownBody // or use excerpt
    return (
      title.toLowerCase().includes(query.toLowerCase()) ||
      content.toLowerCase().includes(query.toLowerCase())
    )
  })
}
