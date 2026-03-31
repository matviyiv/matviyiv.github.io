import React from 'react';

function About({ text }) {
  if (!text) {
    return null;
  }

  // Split the text into paragraphs based on double line breaks
  const paragraphs = text.split('\n\n');

  return (
    <section id="about" className="py-12">
      <h2 className="section-title">About Me</h2>
      <div className="glass-card p-8 border-l-4 border-cyan-500">
        <div className="prose prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-slate-300 leading-relaxed text-lg mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
