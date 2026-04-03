// Blog posts data - add new posts here
const blogPosts = [
  {
    id: 1,
    slug: 'mcp-server-local-llm',
    title: 'MCP server for local LLM',
    subtitle: 'Building a Model Context Protocol server to connect local language models with modern development tools',
    author: 'Nazar Matviyiv',
    date: '2026-04-01',
    readTime: 8,
    tags: ['MCP', 'LLM', 'AI', 'Python', 'Development'],
    excerpt: 'Learn how to build and deploy a Model Context Protocol (MCP) server that enables seamless integration between local LLMs and your development environment. This guide covers architecture, implementation, and best practices.',
    coverImage: null, // optional
    published: true
  }
  // Add more blog posts here
];

// Get all published posts sorted by date (newest first)
export const getAllPosts = () => {
  return blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get a single post by slug
export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};

// Get posts by tag
export const getPostsByTag = (tag) => {
  return blogPosts
    .filter(post => post.published && post.tags.includes(tag))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

export default blogPosts;
