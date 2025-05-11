import React from 'react';

function Languages({ languages }) {
  if (!languages || languages.length === 0) {
    return null;
  }
  return (
    <section className="languages-section">
      <h2>Languages</h2>
      <ul className="languages-list">
        {languages.map((lang, index) => (
          <li key={index}>
            <strong>{lang.name}:</strong> {lang.proficiency}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Languages;
