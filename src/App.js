import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Links from './components/Links';
import Languages from './components/Languages';
import Technologies from './components/Technologies';
import About from './components/About';
import AnimatedSection from './components/AnimatedSection';
import SocialIcons from './components/SocialIcons';

function App() {
  const startYear = 2010;
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - startYear;

  // eslint-disable-next-line no-unused-vars
  const [resumeData, setResumeData] = useState({
    name: 'Nazar Matviyiv',
    title: 'Lead JavaScript Developer at Teletronics',
    aboutMe: `I have over ${yearsOfExperience} years of experience in IT industry. I have considerable knowledge and experience in enterprise software along with understanding all development stages from idea to product delivery. Personal trails: self-directed, results oriented, dependable, problem solver, attention to detail, self-improvement.\n\nI want to make a meaningful impact on the product’s architecture and evolution. I am fond of solving algorithmic problems, writing code, and building products. Web-scale applications that involve operations, research and optimization. I am attracted by the opportunity to earn equity to the business. Using logic and reason to identify the strengths and weaknesses of alternative solutions, conclusions or approaches to problems.`,
    experiences: [
      {
        title: 'Full Stack Team Lead',
        company: 'Teletronics, Dubai',
        duration: 'OCTOBER 2016 - PRESENT',
        responsibilities: [
          'Leading a team to build a communication platform with iOS/Android/Web/Desktop client and backend supporting up to 2 million users.',
          'Full feature chat app with VoIP, Conference Calls, sharing files and end-to-end encryption.',
          'Auto scalable solution running in AWS K8S setup.'
        ],
        teamSize: 10,
        techStack: 'React Native, Node.js, XMPP, WebRTC, OpenSIPS, RTPEngine, FreeSWITCH, Homer, Jitsi, AWS (various services), Terraform, Helm, Kubernetes, PostgreSQL, MongoDB, MySQL, Ejabberd, Electron, ChatGPT, Countly, Prometheus, Loki, PlantUML, K9s, Nest.js, React'
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
        ],
        teamSize: 5,
        techStack: 'Node.js, Express, Angular, React, Babel, Gulp, Karma, Mocha, Contentful, webpack, node-sass, Ruby, Rspec, Cucumber, Redis, Mongodb'
      },
      {
        title: 'Full Stack Engineer',
        company: 'DataMart, Lviv',
        duration: 'AUGUST 2013 - JANUARY 2015',
        responsibilities: [
          'Worked on new layout and refactoring of existing system.',
          'Moved Client side old system form many small libraries to using one common internal library which was based on YUI 3.',
          'Rewrote Java server into NodeJS which included pdf, excel export, user authentication, unit tests and integration tests, complicated routers.'
        ],
        teamSize: 7,
        techStack: 'Node.js, Express, YUI3, Grunt, Sass, Java, MVN, Handlebars'
      },
      {
        title: 'Software Engineer',
        company: 'Conscensia, Lviv',
        duration: 'SEPTEMBER 2010 - AUGUST 2013',
        responsibilities: [
          'As part of the architecture group took part in building workspace for end users based on Lotus Notes Client and created a JavaScript platform for company developers based on NodeJS.',
          'Working with the help of SAS on database warehouse for the backend and on the front end used jQuery.'
        ],
        teamSize: 10,
        techStack: 'Node.js, jQuery, Dojo, Jasmine, Hogan, Lotus Notes 8.5.3, Xpages'
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
    technologiesOverview: 'I have been managing and building with the team high availability, super scalable, priority on security solutions in AWS with the help of dockerized micro services orchestrated by Kubernetes and distributed in multiple availability zones. This architecture is fortified by a continuous delivery setup in GitlabCI running code quality, unit testing, code audit, integration testing, end-to-end testing on real devices and stress testing. Dockerized containers are being pushed to desired environments with zero downtime deployments and after that monitored with sophisticated monitoring setup and alert system to minimize operations overhead. The development process was set up in the way to have multilayered verification - automated and manual code review, to ensure backwards compatibility, feature readiness and gradual rollout, thereby guaranteeing the delivery of the highest quality to end-users.',
    education: [
      {
        institution: 'National University Lviv Polytechnic, Lviv',
        degree: 'Master Degree',
        duration: 'JANUARY 2006 - JANUARY 2011',
        field: 'Applied Linguistics'
      }
    ],
    links: [
      { name: 'linkedin', title: 'LinkedIn', url: 'https://linkedin.com/in/nazarmatviyiv' },
      { name: 'github', title: 'GitHub', url: 'https://github.com/matviyiv' },
      { name: 'twitter', title: 'Twitter', url: 'https://twitter.com/matviyiv' },
      { name: 'website', title: 'Personal Website', url: 'https://matviyiv.github.io' },
      { name: 'medium', title: 'Medium', url: 'https://medium.com/@nazarmatviyiv' },
      { name: 'blog', title: 'My Blog', url: 'http://jsgags.blogspot.com/' }
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
        <AnimatedSection>
          <About text={resumeData.aboutMe} />
        </AnimatedSection>
        <AnimatedSection>
          <Experience experiences={resumeData.experiences} />
        </AnimatedSection>
        <AnimatedSection>
          <Skills skills={resumeData.skills} />
        </AnimatedSection>
        <AnimatedSection>
          <Technologies technologiesOverview={resumeData.technologiesOverview} />
        </AnimatedSection>
        <AnimatedSection>
          <Education education={resumeData.education} />
        </AnimatedSection>
        <AnimatedSection>
          <Languages languages={resumeData.languages} />
        </AnimatedSection>
        <AnimatedSection>
          <Links links={resumeData.links} />
        </AnimatedSection>
      </main>
      <SocialIcons links={resumeData.links} />
    </div>
  );
}

export default App;
