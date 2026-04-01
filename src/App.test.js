import React from 'react';
import { render, screen } from '@testing-library/react';
import Resume from './pages/Resume';
import Header from './components/Header';

// Test resume data
const mockResumeData = {
  name: 'Nazar Matviyiv',
  title: 'Lead Full Stack Developer',
  aboutMe: 'Test about me text',
  experiences: [
    {
      title: 'Full Stack Team Lead',
      company: 'Teletronics, Dubai',
      duration: 'OCTOBER 2016 - PRESENT',
      responsibilities: ['Test responsibility'],
      techStack: 'React, Node.js'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  technologiesOverview: 'Test technologies',
  education: [
    {
      institution: 'National University Lviv Polytechnic, Lviv',
      degree: 'Master Degree',
      duration: 'JANUARY 2006 - JANUARY 2011'
    }
  ],
  languages: [
    { name: 'English', proficiency: 'Proficient' },
    { name: 'Ukrainian', proficiency: 'Native' }
  ]
};

describe('Resume Page - Component Render Tests', () => {
  test('renders without crashing', () => {
    const { container } = render(<Resume resumeData={mockResumeData} />);
    expect(container).toBeTruthy();
  });

  test('renders all main sections', () => {
    render(<Resume resumeData={mockResumeData} />);

    // Check for section headings
    expect(screen.getByRole('heading', { name: /About Me/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Experience$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Skills/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Technologies/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Education/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Languages/i })).toBeInTheDocument();
  });

  test('renders experience data', () => {
    render(<Resume resumeData={mockResumeData} />);

    expect(screen.getByText(/Teletronics, Dubai/i)).toBeInTheDocument();
    expect(screen.getByText(/Full Stack Team Lead/i)).toBeInTheDocument();
  });

  test('renders skills', () => {
    render(<Resume resumeData={mockResumeData} />);

    const javascriptElements = screen.getAllByText(/JavaScript/i);
    expect(javascriptElements.length).toBeGreaterThan(0);

    const reactElements = screen.getAllByText(/React/i);
    expect(reactElements.length).toBeGreaterThan(0);

    const nodeElements = screen.getAllByText(/Node\.js/i);
    expect(nodeElements.length).toBeGreaterThan(0);
  });

  test('renders education', () => {
    render(<Resume resumeData={mockResumeData} />);

    expect(screen.getByText(/National University Lviv Polytechnic/i)).toBeInTheDocument();
    expect(screen.getByText(/Master Degree/i)).toBeInTheDocument();
  });

  test('renders languages', () => {
    render(<Resume resumeData={mockResumeData} />);

    expect(screen.getByText(/English/i)).toBeInTheDocument();
    expect(screen.getByText(/Ukrainian/i)).toBeInTheDocument();
  });
});

describe('Header Component Tests', () => {
  test('renders header with name and title', () => {
    render(<Header name="Nazar Matviyiv" title="Lead Full Stack Developer" />);
    expect(screen.getByText('Nazar Matviyiv')).toBeInTheDocument();
    expect(screen.getByText('Lead Full Stack Developer')).toBeInTheDocument();
  });
});
