import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [resumeData, setResumeData] = useState({
    name: 'Your Name (Sample)',
    title: 'Tech Lead Full-Stack Developer (Sample)',
    experiences: [
      { title: 'Senior Developer', company: 'Tech Solutions Inc.', duration: 'Jan 2020 - Present', responsibilities: ['Led a team of 5 developers.', 'Developed and maintained key features for a SaaS product.', 'Mentored junior engineers.'] },
      { title: 'Full-Stack Developer', company: 'Web Wizards LLC', duration: 'June 2017 - Dec 2019', responsibilities: ['Built responsive web applications using React and Node.js.', 'Collaborated with designers and product managers.', 'Integrated with various third-party APIs.'] }
    ],
    skills: ['React', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'Python', 'Django', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Agile Methodologies', 'Microservices'],
  });

  return (
    <div className="App">
      <Header name={resumeData.name} title={resumeData.title} />
      <main>
        <Experience experiences={resumeData.experiences} />
        <Skills skills={resumeData.skills} />
      </main>
      <footer>
        <p>Powered by React</p>
      </footer>
    </div>
  );
}

export default App;
