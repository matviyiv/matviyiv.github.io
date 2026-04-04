import React from 'react';
import { render, screen } from '@testing-library/react';
import McpServerLocalLlm from '../posts/mcp-server-local-llm';

describe('BlogPost Content Rendering', () => {
  test('CRITICAL: MCP article content renders - prevents invisible content bug', () => {
    render(<McpServerLocalLlm />);

    // Verify main introduction paragraph is rendered
    expect(screen.getByText(/I recently built my first Model Context Protocol/i)).toBeInTheDocument();

    // Verify key headings are rendered
    const whatIsMcpHeading = screen.getByText('What is MCP?');
    expect(whatIsMcpHeading).toBeInTheDocument();
    expect(whatIsMcpHeading.tagName).toBe('H2');

    const setupJourneyHeading = screen.getByText('The Local Setup Journey');
    expect(setupJourneyHeading).toBeInTheDocument();
    expect(setupJourneyHeading.tagName).toBe('H2');

    // Verify subheadings are rendered
    expect(screen.getByText('Following the Workshop (But Offline)')).toBeInTheDocument();
    expect(screen.getByText('Setting Up Redis Storage')).toBeInTheDocument();
    expect(screen.getByText('Node.js MCP Server')).toBeInTheDocument();

    // Verify important content sections
    expect(screen.getByText(/Anthropic's open protocol that standardizes/i)).toBeInTheDocument();
    expect(screen.getByText(/everything had to run locally/i)).toBeInTheDocument();
    expect(screen.getByText(/No cloud services, no API calls, complete privacy/i)).toBeInTheDocument();
  });

  test('renders GitHub repository link', () => {
    render(<McpServerLocalLlm />);

    const githubLinks = screen.getAllByText(/github.com\/matviyiv\/my-first-mcp-server/i);
    expect(githubLinks.length).toBeGreaterThan(0);

    const firstLink = githubLinks[0].closest('a');
    expect(firstLink).toHaveAttribute('href', 'https://github.com/matviyiv/my-first-mcp-server');
    expect(firstLink).toHaveAttribute('target', '_blank');
    expect(firstLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders technical stack information', () => {
    render(<McpServerLocalLlm />);

    expect(screen.getAllByText(/JavaScript\/Node.js/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Redis in Docker/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Qwen 3.5 35B/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/LMStudio/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/M2 Mac, 64GB RAM/i).length).toBeGreaterThan(0);
  });

  test('renders performance tuning sections', () => {
    render(<McpServerLocalLlm />);

    expect(screen.getByText('Performance Tuning (The Hard Way)')).toBeInTheDocument();
    expect(screen.getByText(/Overheating Warning/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Limited to 50,000 tokens/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/KV Cache: Disabled/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/GPU Offload: 100%/i).length).toBeGreaterThan(0);
  });

  test('renders code examples', () => {
    render(<McpServerLocalLlm />);

    // Check for Docker command
    expect(screen.getByText(/docker run -d/i)).toBeInTheDocument();

    // Check for architecture diagram
    expect(screen.getByText(/VS Code \+ OpenCode/i)).toBeInTheDocument();
    expect(screen.getByText(/MCP Server \(Node\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Redis \(Docker\)/i)).toBeInTheDocument();
  });

  test('renders conclusion and benefits sections', () => {
    render(<McpServerLocalLlm />);

    expect(screen.getByText('Why Fully Local?')).toBeInTheDocument();
    expect(screen.getByText('Privacy First')).toBeInTheDocument();
    expect(screen.getByText('Zero Cost')).toBeInTheDocument();
    expect(screen.getByText('Offline Capability')).toBeInTheDocument();
    expect(screen.getByText('Learning Experience')).toBeInTheDocument();
  });

  test('renders lessons learned section', () => {
    render(<McpServerLocalLlm />);

    expect(screen.getByText('Lessons Learned')).toBeInTheDocument();
    expect(screen.getByText('Start Small')).toBeInTheDocument();
    expect(screen.getByText('Monitor Everything')).toBeInTheDocument();
    expect(screen.getByText('Redis is Your Friend')).toBeInTheDocument();
  });

  test('has proper semantic HTML structure', () => {
    const { container } = render(<McpServerLocalLlm />);

    // Check for proper heading hierarchy
    const h2Elements = container.querySelectorAll('h2');
    const h3Elements = container.querySelectorAll('h3');

    expect(h2Elements.length).toBeGreaterThan(0);
    expect(h3Elements.length).toBeGreaterThan(0);

    // Check for paragraphs
    const paragraphs = container.querySelectorAll('p');
    expect(paragraphs.length).toBeGreaterThan(10); // Should have many paragraphs

    // Check for lists
    const lists = container.querySelectorAll('ul');
    expect(lists.length).toBeGreaterThan(0);
  });
});
