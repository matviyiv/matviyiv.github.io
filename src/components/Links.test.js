import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Links from './Links';

describe('Links Component - User Interaction Tests', () => {
  const mockLinks = [
    { name: 'linkedin', title: 'LinkedIn', url: 'https://linkedin.com/in/test' },
    { name: 'github', title: 'GitHub', url: 'https://github.com/test' },
    { name: 'twitter', title: 'Twitter', url: 'https://twitter.com/test' }
  ];

  test('renders share button', () => {
    render(<Links links={mockLinks} />);
    const shareButton = screen.getByLabelText(/share/i);
    expect(shareButton).toBeInTheDocument();
  });

  test('social links menu is initially hidden', () => {
    render(<Links links={mockLinks} />);

    // Menu should not show links initially
    const linkedinLink = screen.queryByLabelText('LinkedIn');
    expect(linkedinLink).not.toBeInTheDocument();
  });

  test('toggles menu when share button is clicked', () => {
    render(<Links links={mockLinks} />);
    const shareButton = screen.getByLabelText(/share/i);

    // Click to open menu
    fireEvent.click(shareButton);

    // Links should now be visible
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();

    // Click again to close menu
    fireEvent.click(shareButton);

    // Links should be hidden again
    expect(screen.queryByLabelText('LinkedIn')).not.toBeInTheDocument();
  });

  test('renders all social links with correct URLs when menu is open', () => {
    render(<Links links={mockLinks} />);
    const shareButton = screen.getByLabelText(/share/i);

    // Open menu
    fireEvent.click(shareButton);

    // Check each link
    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/test');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');

    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test');

    const twitterLink = screen.getByLabelText('Twitter');
    expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/test');
  });

  test('does not render when links array is empty', () => {
    const { container } = render(<Links links={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('does not render when links prop is undefined', () => {
    const { container } = render(<Links />);
    expect(container.firstChild).toBeNull();
  });

  test('renders correct number of social links', () => {
    render(<Links links={mockLinks} />);
    const shareButton = screen.getByLabelText(/share/i);

    // Open menu
    fireEvent.click(shareButton);

    // Count the links (excluding the share button)
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(mockLinks.length);
  });

  test('social links have appropriate accessibility attributes', () => {
    render(<Links links={mockLinks} />);
    const shareButton = screen.getByLabelText(/share/i);

    // Open menu
    fireEvent.click(shareButton);

    const linkedinLink = screen.getByLabelText('LinkedIn');

    // Check for security attributes on external links
    expect(linkedinLink.getAttribute('rel')).toContain('noopener');
    expect(linkedinLink.getAttribute('rel')).toContain('noreferrer');
  });
});
