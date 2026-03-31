import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component - Render Tests', () => {
  test('renders with provided name and title', () => {
    render(<Header name="John Doe" title="Software Engineer" />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  test('renders default values when props are not provided', () => {
    render(<Header />);

    expect(screen.getByText('Your Name')).toBeInTheDocument();
    expect(screen.getByText('Tech Lead Full-Stack Developer')).toBeInTheDocument();
  });

  test('renders with correct semantic HTML structure', () => {
    const { container } = render(<Header name="Jane Smith" title="Tech Lead" />);

    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    expect(h1).toHaveTextContent('Jane Smith');
  });

  test('renders title in paragraph element', () => {
    render(<Header name="Test User" title="Developer" />);

    const titleElement = screen.getByText('Developer');
    expect(titleElement.tagName).toBe('P');
  });

  test('applies correct CSS classes for styling', () => {
    const { container } = render(<Header name="Test" title="Test Title" />);

    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-gradient-to-r');
    expect(header).toHaveClass('text-white');
  });
});
