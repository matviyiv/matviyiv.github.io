import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles';
import BlogPost from './pages/BlogPost';
import Resume from './pages/Resume';

// ----- URL decoder (mirrors the script in public/index.html) -----

function decodeGithubPagesRedirect(search, hash = '') {
  if (search[1] === '/') {
    const path = search
      .slice(1)
      .split('&')
      .map((s) => s.replace(/~and~/g, '&'))
      .join('?');
    return path + hash;
  }
  return null;
}

describe('GitHub Pages 404 redirect — URL decoder', () => {
  test('decodes /articles direct link', () => {
    expect(decodeGithubPagesRedirect('?/articles')).toBe('/articles');
  });

  test('decodes /articles/:slug direct link', () => {
    expect(decodeGithubPagesRedirect('?/articles/redblue-secure-ai-code-review'))
      .toBe('/articles/redblue-secure-ai-code-review');
  });

  test('decodes root path', () => {
    expect(decodeGithubPagesRedirect('?/')).toBe('/');
  });

  test('restores query string encoded with ~and~', () => {
    expect(decodeGithubPagesRedirect('?/search&q=hello~and~world'))
      .toBe('/search?q=hello&world');
  });

  test('appends hash fragment', () => {
    expect(decodeGithubPagesRedirect('?/articles', '#takeaways'))
      .toBe('/articles#takeaways');
  });

  test('returns null for normal query strings (no redirect needed)', () => {
    expect(decodeGithubPagesRedirect('?foo=bar')).toBeNull();
  });

  test('returns null for empty search string', () => {
    expect(decodeGithubPagesRedirect('')).toBeNull();
  });
});

// ----- Route rendering — simulates direct URL access -----

const minimalResumeData = {
  name: 'Nazar Matviyiv',
  title: 'Lead Full Stack Developer',
  aboutMe: 'Test about me',
  experiences: [],
  skills: [],
  technologiesOverview: '',
  education: [],
  languages: [],
};

function renderAtPath(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Resume resumeData={minimalResumeData} />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Direct URL access — route rendering', () => {
  test('/ renders resume page', () => {
    renderAtPath('/');
    expect(screen.getByRole('heading', { name: /about me/i })).toBeInTheDocument();
  });

  test('/articles renders articles list', () => {
    renderAtPath('/articles');
    expect(screen.getByRole('heading', { name: /my articles/i })).toBeInTheDocument();
  });

  test('/articles/redblue-secure-ai-code-review renders RedBlue post', () => {
    renderAtPath('/articles/redblue-secure-ai-code-review');
    expect(screen.getByRole('heading', { name: /redblue/i })).toBeInTheDocument();
  });

  test('/articles/mcp-server-local-llm renders MCP post', () => {
    renderAtPath('/articles/mcp-server-local-llm');
    expect(screen.getByRole('heading', { name: /mcp server for local llm/i, level: 1 })).toBeInTheDocument();
  });

  test('/articles/unknown-slug renders 404 message', () => {
    renderAtPath('/articles/unknown-slug');
    expect(screen.getByRole('heading', { name: /post not found/i })).toBeInTheDocument();
  });
});
