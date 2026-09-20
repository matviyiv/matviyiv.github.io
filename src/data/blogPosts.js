// Blog posts data - add new posts here
const blogPosts = [
  {
    id: 3,
    slug: 'playwright-blue-zone-claude-code',
    title: 'Running Playwright Securely for Blue Zone Claude Code',
    subtitle: 'A dockerized browser in its own sandbox — no blue-zone mounts, no credentials, and a default-deny allowlist between Chromium and the internet',
    author: 'Nazar Matviyiv',
    date: '2026-09-20',
    readTime: 14,
    tags: ['Playwright', 'MCP', 'Docker', 'Security', 'Claude', 'Browser Automation'],
    excerpt: 'The blue zone controls what Claude can see; a browser controls where what it sees can go. How I added Playwright MCP to RedBlue as a second, separate sandbox — two internal networks, a devserver alias, generated stubs for red-zone files so webpack actually builds, and the three failures that all reported themselves as "needs authentication".',
    coverImage: '/images/blog/playwright-blue-zone.jpg',
    published: true
  },
  {
    id: 2,
    slug: 'redblue-secure-ai-code-review',
    title: 'RedBlue: Secure AI Code Review for React Native',
    subtitle: 'Run Claude Code inside a Docker container that can only see what you allow — no secrets, no signing keys, no internal endpoints',
    author: 'Nazar Matviyiv',
    date: '2026-04-17',
    readTime: 10,
    tags: ['Docker', 'Security', 'React Native', 'Claude', 'AI', 'DevOps'],
    excerpt: 'How I built a Red Zone / Blue Zone workflow that lets Claude review a React Native codebase without ever seeing secrets, signing certificates, or internal API endpoints. Includes rsync filtering, secret scanning, Docker isolation, and a full GitLab CI pipeline.',
    coverImage: '/images/blog/redblue-docker-isolation.jpg',
    published: true
  },
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
    coverImage: '/images/blog/mcp-server-cover.jpg',
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
