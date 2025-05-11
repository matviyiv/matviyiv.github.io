import React from 'react';

function About({ text }) {
  if (!text) {
    return null;
  }

  // Split the text into paragraphs based on double line breaks
  const paragraphs = text.split(/\n\s*\n/);

  return (
    <section className="about-section">
      <h2>About Me</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export default About;
