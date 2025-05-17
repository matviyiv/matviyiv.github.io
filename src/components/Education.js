import React from 'react';

function Education({ education }) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="education-section">
      <h2>Education</h2>
      <div className="education-list">
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <h3>{edu.degree}</h3>
            <p className="institution">{edu.institution}</p>
            <p className="duration">{edu.duration}</p>
            {edu.description && <p className="description">{edu.description}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
