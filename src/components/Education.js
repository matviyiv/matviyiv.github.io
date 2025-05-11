import React from 'react';

function Education({ educationItems }) {
  if (!educationItems || educationItems.length === 0) {
    return <p>No education data available.</p>;
  }
  return (
    <section className="education-section">
      <h2>Education</h2>
      {educationItems.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>{edu.degree}</h3>
          <p className="education-institution">{edu.institution}</p>
          <p className="education-duration">{edu.duration}</p>
          {edu.field && <p className="education-field">Field: {edu.field}</p>}
        </div>
      ))}
    </section>
  );
}

export default Education;
