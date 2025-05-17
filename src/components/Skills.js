import React from 'react';

function Skills({ skills }) {
  if (!skills || skills.length === 0) {
    return <p>No skills data available.</p>;
  }
  return (
    <section id="skills">
      <h2>Skills</h2>
      <ul className="skills-list">
        {skills.map((skill, index) => <li key={index}>{skill}</li>)}
      </ul>
    </section>
  );
}

export default Skills;
