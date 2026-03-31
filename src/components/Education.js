import React from 'react';

function Education({ education }) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-12">
      <h2 className="section-title">Education</h2>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="glass-card p-6 border-l-4 border-cyan-500">
            <h3 className="text-2xl font-bold text-cyan-400 mb-3">{edu.degree}</h3>
            <p className="text-blue-300 text-lg mb-2">{edu.institution}</p>
            <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {edu.duration}
            </span>
            {edu.description && (
              <p className="text-slate-300 mt-4">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
