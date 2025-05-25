import React from 'react';

function Skills({ skills }) {
  if (!skills || skills.length === 0) {
    return <p>No skills data available.</p>;
  }
  return (
    <section id="skills" className="py-12">
      <h2 className="section-title">Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {skills.map((skill, index) => (
          <span key={index} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Skills;
