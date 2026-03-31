import React from 'react';

function Languages({ languages }) {
  if (!languages || languages.length === 0) {
    return null;
  }
  return (
    <section id="languages" className="py-12 mb-16">
      <h2 className="section-title">Languages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {languages.map((lang, index) => (
          <div key={index} className="glass-card p-6 hover:border-cyan-400/50 transition-all">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-cyan-300">{lang.name}</span>
              <span className="text-blue-300 font-medium px-4 py-1.5 rounded-full text-sm bg-blue-500/20 border border-blue-500/30">
                {lang.proficiency}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Languages;
