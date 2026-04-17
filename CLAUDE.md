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

## Blog post writing style

Posts are written in first-person, personal voice. The author is a practitioner sharing what they actually built and what went wrong — not a teacher presenting a clean tutorial.

### Narrative structure

Every post follows this arc:

1. **Opening paragraph** (`text-xl text-slate-400`) — 2–3 sentences. State what was built, name the constraint or twist that made it interesting ("but taking it fully local", "give teams a third option"). Never start with background theory.
2. **GitHub link card** — immediately after the opening, always.
3. **The Problem** — a real, specific problem the author faced. Concrete, not hypothetical. Show what the bad options are before presenting the solution.
4. **Core concept** — explain the idea in plain terms before any implementation detail.
5. **Implementation / How it works** — specific steps, real config values, actual code. Numbers matter: "50,000 tokens", "512 MB", "6 checks".
6. **The hard part** — a section on obstacles, gotchas, or failure modes encountered. This is not optional. ("The hard way", "⚠️ Overheating Warning!"). Admitting what didn't work is part of the voice.
7. **Takeaways / Lessons Learned** — concrete, opinionated bullet points. Each one names the principle and then justifies it in one sentence.
8. **Closing paragraph** — measured, no hype. Ends with a conditional recommendation ("worth trying", "I highly recommend… if…"), not a sales pitch.

### Voice and language

- Short declarative sentences for emphasis: "No cloud services, no API calls, complete privacy."
- Em-dash for contrast or an aside: "— not just a matter of discipline"
- Specific numbers everywhere — vague claims ("much faster") are avoided
- Honest about trade-offs and failures; never implies everything worked first try
- No marketing adjectives ("powerful", "amazing", "cutting-edge") — let the specifics do the work
- "Here's what X looks like" and "Here's why" are natural transitions; use them

### JSX formatting conventions for post content

| Element | Classes |
|---|---|
| Opening paragraph | `text-xl text-slate-400 leading-relaxed mb-8` |
| H2 section heading | `text-3xl font-bold text-cyan-400 mt-12 mb-6` |
| H3 sub-heading | `text-2xl font-semibold text-blue-400 mt-8 mb-4` |
| Body paragraph | `mb-6` |
| Warning / alert card | `bg-red-900/20 border border-red-500/30 rounded-lg p-6 mb-8` |
| Positive callout / summary card | `bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-6 mb-8` |
| Bullet list card | `bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6 mb-8` |
| Bullet icon | `▹` in `text-cyan-400` |
| Lessons / tips (left-border style) | `border-l-4 border-cyan-500 pl-6 py-2` (rotate accent color per item: cyan → blue → purple → pink) |
| Code block | `bg-slate-900 border border-slate-700 rounded-lg p-6 mb-8 overflow-x-auto` with optional filename label in `text-slate-500 text-xs mb-3` |
| Inline code | `text-cyan-300 bg-slate-800 px-1.5 py-0.5 rounded` |
| ASCII diagram block | `bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-8 mb-8 font-mono text-sm` |
