import React from 'react';
import AnimatedExperienceItem from './AnimatedExperienceItem';

function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section id="experience" className="py-12">
      <h2 className="section-title">Experience</h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <AnimatedExperienceItem key={index}>
            <div className="glass-card p-6 border-l-4 border-blue-500 hover:border-cyan-400 transition-colors">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 gap-2">
                <div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2">{exp.title}</h3>
                  <p className="text-blue-300 text-lg mb-1">{exp.company}</p>
                </div>
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {exp.duration}
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex} className="flex items-start text-slate-300">
                    <span className="text-cyan-400 mr-2 mt-1">▹</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
              {exp.techStack && (
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <h4 className="font-semibold text-purple-400 mb-3 text-sm uppercase tracking-wider">Tech Stack</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{exp.techStack}</p>
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
