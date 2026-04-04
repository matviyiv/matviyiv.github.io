// Blog posts data - add new posts here
const blogPosts = [
  {
    id: 1,
    slug: 'mcp-server-local-llm',
    title: 'MCP server for local LLM',
    subtitle: 'Building a fully offline MCP server with Node.js, Redis, and LMStudio running Qwen 3.5 35B on M2 Mac',
    author: 'Nazar Matviyiv',
    date: '2026-04-01',
    readTime: 12,
    tags: ['MCP', 'LLM', 'Node.js', 'Redis', 'LMStudio', 'Offline'],
    excerpt: 'How I built a Model Context Protocol server running completely offline with Redis storage, LMStudio, and performance tuning for M2 Mac. Includes real configuration details, overheating warnings, and lessons learned from running a 35B model locally.',
    coverImage: '/images/blog/mcp-server-cover.jpg', // Dubai cityscape with fog
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
