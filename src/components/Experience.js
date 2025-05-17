import React from 'react';
import AnimatedExperienceItem from './AnimatedExperienceItem';

function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="experience-section">
      <h2>Experience</h2>
      <div className="experiences-list">
        {experiences.map((exp, index) => (
          <AnimatedExperienceItem key={index}>
            <div className="experience-item">
              <h3>{exp.title}</h3>
              <p className="company">{exp.company}</p>
              <p className="duration">{exp.duration}</p>
              <ul className="responsibilities">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
              {exp.techStack && (
                <div className="tech-stack">
                  <h4>Tech Stack</h4>
                  <p>{exp.techStack}</p>
                </div>
              )}
            </div>
          </AnimatedExperienceItem>
        ))}
      </div>
    </section>
  );
}

export default Experience;
