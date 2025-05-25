import React from 'react';
import AnimatedExperienceItem from './AnimatedExperienceItem';

function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-12">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <AnimatedExperienceItem key={index}>
            <div className="experience-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-gray-600 mb-1">{exp.company}</p>
                </div>
                <p className="experience-duration text-gray-500">{exp.duration}</p>
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="responsibility-item">
                    {resp}
                  </li>
                ))}
              </ul>
              {exp.techStack && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Tech Stack</h4>
                  <p className="text-gray-600">{exp.techStack}</p>
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
