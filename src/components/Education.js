import React from 'react';

function Education({ education }) {
  if (!education || education.length === 0) {
    return null;
  }

  return (
    <section id="education" className="py-12">
      <h2 className="section-title">Education</h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="education-card bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
            <p className="text-gray-600 mb-1">{edu.institution}</p>
            <p className="text-gray-500 mb-4">{edu.duration}</p>
            {edu.description && (
              <p className="text-gray-700">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Education;
