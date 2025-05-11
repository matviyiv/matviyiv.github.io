import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Links from './components/Links';
import Languages from './components/Languages';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [resumeData, setResumeData] = useState({
    name: 'Nazar Matviyiv',
    title: 'Lead JavaScript Developer at Teletronics.ae',
    experiences: [
      {
        title: 'Full Stack Team Lead',
        company: 'Teletronics, Dubai',
        duration: 'OCTOBER 2016 - PRESENT',
        responsibilities: [
          'Leading a team to build a communication platform with iOS/Android/Web/Desktop client and backend supporting up to 2 million users.',
          'Full feature chat app with VoIP, Conference Calls, sharing files and end-to-end encryption.',
          'Auto scalable solution running in AWS K8S setup.'
        ]
      },
      {
        title: 'Lead Engineer',
        company: 'Auctionata, Berlin',
        duration: 'JANUARY 2015 - SEPTEMBER 2016',
        responsibilities: [
          'Isomorphic application on React, Express and using Babel for ES2015 features.',
          'App had totally dynamic content from the CMS system.',
          'Covered with unit tests, acceptance tests on Ruby and automated deployment to AWS with zero deployment downtime.',
          'All apps are mobile friendly.',
          'And some small Angular project.'
        ]
      },
      {
        title: 'Full Stack Engineer',
        company: 'DataMart, Lviv',
        duration: 'AUGUST 2013 - JANUARY 2015',
        responsibilities: [
          'Worked on new layout and refactoring of existing system.',
          'Moved Client side old system form many small libraries to using one common internal library which was based on YUI 3.',
          'Rewrote Java server into NodeJS which included pdf, excel export, user authentication, unit tests and integration tests, complicated routers.'
        ]
      },
      {
        title: 'Software Engineer',
        company: 'Conscensia, Lviv',
        duration: 'SEPTEMBER 2010 - AUGUST 2013',
        responsibilities: [
          'As part of the architecture group took part in building workspace for end users based on Lotus Notes Client and created a JavaScript platform for company developers based on NodeJS.',
          'Working with the help of SAS on database warehouse for the backend and on the front end used jQuery.'
        ]
      }
    ],
    skills: [
      'JavaScript',
      'Node.js',
      'React',
      'React Native',
      'AWS',
      'K8S',
      'Lambda',
      'Opensips',
      'RTPEngine',
      'Freeswitch',
      'XMPP',
      'WebRTC',
      'Sip.js',
      'MongoDB',
      'MySQL',
      'Redis',
      'Postgres',
      'RabbitMQ',
      'Jest',
      'Supertest',
      'Nock',
      'Angular',
      'RnR', 
      'Django'
    ],
    education: [
      {
        institution: 'National University Lviv Polytechnic, Lviv',
        degree: 'Master Degree',
        duration: 'JANUARY 2006 - JANUARY 2011',
        field: 'Applied Linguistics'
      }
    ],
    links: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/nazar-matviyiv-0b15b925' },
      { name: 'GitHub', url: 'https://github.com/matviyiv/' },
      { name: 'Medium', url: 'https://medium.com/@nazarmatviyiv' },
      { name: 'My Blog', url: 'http://jsgags.blogspot.com/' }
    ],
    languages: [
      { name: 'English', proficiency: 'Proficient Working' },
      { name: 'German', proficiency: 'Elementary' },
      { name: 'Polish', proficiency: 'Limited Working' },
      { name: 'Ukrainian', proficiency: 'Native' }
    ]
  });

  return (
    <div className="App">
      <Header name={resumeData.name} title={resumeData.title} />
      <main>
        <Experience experiences={resumeData.experiences} />
        <Skills skills={resumeData.skills} />
        <Education educationItems={resumeData.education} />
        <Links links={resumeData.links} />
        <Languages languages={resumeData.languages} />
      </main>
      <footer>
        <p>Powered by React</p>
      </footer>
    </div>
  );
}

export default App;
