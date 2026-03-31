import React from 'react';

function Technologies({ text }) {
  if (!text) {
    return null;
  }
  return (
    <section id="technologies" className="py-12">
      <h2 className="section-title">Technologies</h2>
      <div className="glass-card p-8 border-l-4 border-purple-500">
        <p className="text-slate-300 leading-relaxed text-lg">{text}</p>
      </div>
    </section>
  );
}

export default Technologies;
