# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server at localhost:3000
npm test           # Run tests in watch mode
npm test -- --watchAll=false   # Run tests once (CI mode)
npm test -- --watchAll=false --testPathPattern=Header   # Run a single test file
npm run build      # Production build (also runs ESLint)
npm run deploy     # Build + deploy to GitHub Pages (gh-pages)
```

**Husky hooks:**
- `pre-commit` — runs tests with `--bail` (fast fail)
- `pre-push` — runs tests + full build (lint included)

ESLint runs as part of `react-scripts build`; there is no separate lint script.

## Architecture

Single-page React 19 app with React Router v7. All resume data lives as a plain JS object in `App.js` state and is passed down as props — there is no API, no CMS, no external data source.

### Routing (`App.js`)
| Path | Component |
|---|---|
| `/` | `pages/Resume` |
| `/articles` | `pages/Articles` |
| `/articles/:slug` | `pages/BlogPost` |

### Blog system (3-file pattern)
Adding a post requires touching exactly three files:

1. **`src/data/blogPosts.js`** — metadata array (id, slug, title, subtitle, author, date, readTime, tags, excerpt, coverImage, published). `getAllPosts()` filters to published and sorts newest-first.
2. **`src/posts/<slug>.js`** — content as a React component returning JSX. No frontmatter, no Markdown.
3. **`src/pages/BlogPost.js`** — import the component and add it to the `postContent` slug→component map.

Cover images go in `public/images/blog/` and are referenced as `/images/blog/<filename>`.

### Styling
Tailwind CSS v3 + custom utility classes defined in `src/index.css`. Key custom classes:
- `.glass-card` — frosted-glass card (dark bg + border)
- `.section-title` — gradient text heading

Color palette: `slate-950` background, `cyan-400` primary accent, `blue-400` secondary, `purple-400` tertiary. Blog post content uses these consistently for headings (`text-cyan-400`, `text-blue-400`) and code spans (`text-cyan-300 bg-slate-800`).

### `AnimatedSection`
Wrap any section in `<AnimatedSection>` for scroll-triggered fade-in. Used in Resume sections, Articles list, and blog post headers — do not wrap blog post *body* content (causes visibility bugs).
