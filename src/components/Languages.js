import React from 'react';

function Languages({ languages }) {
  if (!languages || languages.length === 0) {
    return null;
  }
  return (
    <section id="languages" className="py-12">
      <h2 className="section-title">Languages</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {languages.map((lang, index) => (
          <div key={index} className="language-card bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-800">{lang.name}</span>
              <span className="text-blue-600 font-medium px-3 py-1 rounded-full text-sm bg-blue-50">
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
