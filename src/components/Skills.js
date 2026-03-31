import React from 'react';

function Skills({ skills }) {
  if (!skills || skills.length === 0) {
    return <p className="text-slate-400">No skills data available.</p>;
  }
  return (
    <section id="skills" className="py-12">
      <h2 className="section-title">Skills</h2>
      <div className="glass-card p-8">
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="group relative px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg text-cyan-300 font-medium hover:from-blue-500/20 hover:to-purple-500/20 hover:border-cyan-400/50 hover:text-cyan-200 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-default"
            >
              <span className="relative z-10">{skill}</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
