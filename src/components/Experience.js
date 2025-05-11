import React from 'react';

function Experience({ experiences }) {
  if (!experiences || experiences.length === 0) {
    return <p>No experience data available.</p>;
  }
  return (
    <section>
      <h2>Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="experience-item">
          <h3>{exp.title} at {exp.company}</h3>
          <p>{exp.duration}</p>
          <ul>
            {exp.responsibilities && exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
          </ul>
        </div>
      ))}
    </section>
  );
}

export default Experience;
