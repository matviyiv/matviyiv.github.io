import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component - Top Level Render Tests', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  test('renders header with name and title', () => {
    render(<App />);
    expect(screen.getByText('Nazar Matviyiv')).toBeInTheDocument();
    expect(screen.getByText('Lead Full Stack Developer')).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    render(<App />);

    // Check for section headings (using role to be more specific)
    expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Experience$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Technologies/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Education/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Languages/i })).toBeInTheDocument();
  });

  test('renders experience data', () => {
    render(<App />);

    // Check for company names from experience
    expect(screen.getByText(/Teletronics, Dubai/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Team Lead/i)).toBeInTheDocument();
  });

  test('renders skills', () => {
    render(<App />);

    // Check for some skills (may appear multiple times)
    const javascriptElements = screen.getAllByText(/JavaScript/i);
    expect(javascriptElements.length).toBeGreaterThan(0);

    const reactElements = screen.getAllByText(/React/i);
    expect(reactElements.length).toBeGreaterThan(0);

    const nodeElements = screen.getAllByText(/Node\.js/i);
    expect(nodeElements.length).toBeGreaterThan(0);
  });

  test('renders education', () => {
    render(<App />);

    expect(screen.getByText(/National University Lviv Polytechnic/i)).toBeInTheDocument();
    expect(screen.getByText(/Master Degree/i)).toBeInTheDocument();
  });

  test('renders languages', () => {
    render(<App />);

    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/Ukrainian/i)).toBeInTheDocument();
  });
});
