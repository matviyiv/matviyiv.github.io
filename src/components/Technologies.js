import React from 'react';

function Technologies({ text }) {
  if (!text) {
    return null;
  }
  return (
    <section id="technologies" className="py-12">
      <h2 className="section-title">Technologies</h2>
      <div className="education-card bg-white rounded-lg shadow-md p-6">
        {text}
      </div>
    </section>
  );
}

export default Technologies;
