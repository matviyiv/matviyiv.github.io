import React from 'react';

function Technologies({ text }) {
  if (!text) {
    return null;
  }
  return (
    <section id="technologies" className="technologies-section">
      <h2>Technologies</h2>
      <p>{text}</p>
    </section>
  );
}

export default Technologies;
