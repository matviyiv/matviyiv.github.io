import React from 'react';

function About({ text }) {
  if (!text) {
    return null;
  }

  // Split the text into paragraphs based on double line breaks
  const paragraphs = text.split('\n\n');

  return (
    <section id="about" className="about-section">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export default About;
